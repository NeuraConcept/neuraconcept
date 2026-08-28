# Concept Graph Visualisation — Review Round 1

Reviewer: graph-reviewer. Build under review: `components/KnowledgeGraph.tsx` +
`pages/Technology.tsx` + i18n as landed by codex-graph (process exited before this
review started; confirmed via `ps` and the build log's final codex-graph line).

Verdict: **NOT investor-ready yet.** One root-cause bug inverts the entire "why is my
child stuck" story — the single most important thing this feature exists to demonstrate.
Everything else (build health, visual design, i18n, mobile, cycle-safety-against-hangs,
honest counts) passed clean.

## Finding 1 — BLOCKER: prerequisite direction is inverted throughout the component

**Root cause of the root cause:** codex-graph's original brief (visible verbatim in its
process command line) stated *"from_id is the PREREQUISITE, to_id is the DEPENDENT."*
That was wrong and was corrected mid-flight (05:50, see
`docs/plans/2026-08-25-kg-quality-audit.md` top banner) to the actual convention, proven
by `kg-pipeline/src/kg_pipeline/stages/connect.py:48-51` (the literal LLM prompt: *"from_id
= the TARGET (dependent), to_id = the prerequisite"*) and
`kg-pipeline/src/kg_pipeline/stages/commit.py:210-228` (`MERGE (from_c)-[:REQUIRES]->(to_c)`
— from_c REQUIRES to_c, so to_c is required first). codex-graph built the whole component
faithfully against the *original wrong* instruction and had no way to see the correction
after it started.

**Code (`components/KnowledgeGraph.tsx`):**
- `incoming` (lines 58-69) is keyed by `edge.t`. Given `t`=to_id=PREREQUISITE, this map
  actually answers "which edges have this node as their prerequisite" (i.e. who depends
  on this node), not "what are this node's own prerequisites."
- `trace` (lines 81-97) starts at the selected node and repeatedly calls
  `incoming.get(dependent)`, then treats `edge.s` as the next node in the chain. Since
  `incoming` is keyed wrong, this walks to nodes that DEPEND ON the selection, not to its
  prerequisites.
- `primaryEdge` (line 130) and the "Primary prerequisite" label (line 190) surface
  `graph.n[graph.e[primaryEdge].s].n` — labelling a downstream dependent as if it were
  the prerequisite.

**Live repro #1 (search flow):** search "Composing Fractions from Fractional Units" ->
select. Raw data (`kg-pipeline/output/*/edges/*.json`) has an edge
`from_id=Composing..., to_id=Unit Fractions`, reason: *"Understanding what a single unit
fraction is represents the necessary building block for composing larger fractions..."*
— Unit Fractions is unambiguously the prerequisite. The live UI instead shows
**"Primary prerequisite: Representing fractions on a number line"** — a concept that
actually *depends on* Composing Fractions, not a prerequisite of it.
Screenshot: `.playwright-mcp/round1-composing-fractions-trace.png` (or wherever you copy
it — the repo's is gitignored, regenerate if needed).

**Live repro #2 (direct canvas click, not search):** clicking a node resolves to "Unit
Consistency in Proportions" -> shown as **"Primary prerequisite: Representative Fraction
(Map Scale)"**. The reason text displayed for that very edge reads *"Understanding a
unitless representative fraction strictly requires recognizing that a ratio without units
implies both quantities must be measured in the exact same units"* — which says the
opposite: Representative Fraction requires Unit Consistency, not the reverse. Screenshot:
`round1-direct-canvas-click.png`.

**Fix:** In `components/KnowledgeGraph.tsx`, key `incoming` by `edge.s` instead of
`edge.t` (line ~63: `index.get(edge.s)`, pushing into that bucket), and in `trace`
(line ~88-94) read `edge.t` as the next upstream node (`nodes.set(edge.t, depth);
dependent = edge.t;`), guard-checking `nodes.has(edge.t)` instead of `nodes.has(edge.s)`.
`primaryEdge`'s label at line 190 should then read `graph.e[primaryEdge].t`, not `.s`.
Also re-decide the arrowhead: the intent per `CONCEPT_GRAPH_NOTES.md` was "arrowheads
from prerequisite to dependent" — with the corrected key, decide whether `markerEnd`
should now sit at `x1,y1` (source=dependent) or `x2,y2` (target=prerequisite) end, and
make sure it matches whichever verbal convention you keep in the UI copy
(`tech.graph_subtitle`: "see the knowledge a learner needs before it" — the arrow should
read as pointing toward what's needed).

## Finding 2 — BLOCKER, same root cause: "Foundational concept" state fires on the wrong ~313 nodes

`primaryEdge === null` (foundational/no-prerequisite empty state) currently means "never
appears as `edge.t`" — i.e. "nothing else lists this as a prerequisite," which is a
completely different property from "this concept has no prerequisites of its own." The
TRUE no-prerequisite set (never appears as `edge.s`) is only **~20 of 653 nodes** (hard
edges; ~7 if you also count soft edges) — the actual axioms like "Whole Numbers", "Point
(Geometry)", "Regular Polygons" — not 313 (48%).

Note: 313/653 (48%) is also the number currently written in
`docs/plans/2026-08-25-kg-quality-audit.md` ("313 of 653 concepts have no prerequisites")
— that audit line was computed under the same now-corrected-wrong direction assumption
and needs fixing independently of this component (flagged to team-lead separately; not
something codex-graph should edit, it's outside `projects/neuraconcept/`).

**Live repro:** search "Unit Fractions" (autocompletes to "Comparing Unit Fractions" as
top match) -> select. UI labels it **"FOUNDATIONAL CONCEPT"**, but raw data shows it has
two real hard-edge prerequisites (Unit Fractions, Numerator and Denominator Roles).
Screenshot: `round1-unit-fractions-cycle-trace.png`.

**Fix:** falls out for free once Finding 1's key is corrected — `incoming.get(node)`
under the `edge.s` key will then correctly be empty only for true roots.

## Finding 3 — Real, moderate: stale/unrelated edge reason after search-select

After selecting a node via the search dropdown (not direct canvas click), the "Why this
link exists" panel sometimes shows a reason string for a completely unrelated edge —
observed the exact same stray text (about HCF of multi-term ratios) surviving across two
different, unrelated search selections. Direct canvas clicks on a node do NOT show this
— reason text correctly matched the primary-prerequisite pair there. Likely cause: the
mouse pointer is left resting where the (now-removed) search-result button was; when the
dropdown collapses and the SVG re-renders under the cursor, a stray `pointerenter` fires
on whatever edge-hitbox line ends up there, setting `activeEdge` — and this happens
*after* `selectNode()`'s own `setActiveEdge(null)`, so it isn't guarded against.

**Repro:** search any concept -> select the top result -> read "Why this link exists" ->
compare against the "Primary prerequisite" concept named just above it. They don't match.

**Suggested fix:** after `selectNode()` runs, briefly ignore/short-circuit
`onPointerEnter`-driven `activeEdge` changes (e.g. a `justSelectedRef` cleared on the next
real pointer move), or don't let hover override `primaryEdge` within the same tick as a
fresh selection.

## Finding 4 — Non-blocking, carried over from Round 0

Node descriptions (`s` field) clip at 220 chars mid-word, not at a word boundary — e.g.
"...distin…". 453/653 nodes hit this. It's now user-facing (shows in the selected-node
info panel), so worth a quick `clip()` fix in `scripts/export-concept-graph.mjs` (trim to
the last whitespace before the limit) if there's time in this pass, but it doesn't block
sign-off on its own.

## What passed clean — do not re-litigate these

- `npx tsc --noEmit`: clean, zero errors.
- No lint script exists in this project's `package.json` (pre-existing, not a regression
  — confirmed via git history, this project has never had one).
- i18n parity: EN/HI/KN all 330/330/330 keys. Spot-checked all `tech.graph_*` strings —
  Hindi reads as genuine, idiomatic (not machine-mangled or placeholder English); Kannada
  structurally correct as far as I can verify (lower confidence than Hindi, but no
  red flags — no leftover English, no garbled/truncated script).
- `npm run build`: succeeds. `KnowledgeGraph` is its own lazy-loaded 10.9KB (3.84KB gzip)
  chunk via `React.lazy()` + `Suspense` in `Technology.tsx`, matching the existing
  `AnalyticsDemo` pattern. D3 rides the pre-existing `charts` manualChunk.
- Honest counts render exactly as specified: "653 concepts", "1,427 extracted
  prerequisite links", "NCERT Mathematics · Classes 6–8" — no overclaim of Science or
  other classes.
- Cycle safety against hangs: clicking into the known cycle region (Unit Fractions /
  Fraction as Equal Sharing / Numerator and Denominator Roles) does not hang — the
  visited-set + 2-hop depth cap in `trace()` work as coded, independent of the direction
  bug above.
- No console errors on any interaction tested (one pre-existing, unrelated warning about
  an unused image preload).
- Visual quality: genuinely good, not a default D3 example — dark glass panel, topic-hued
  node cloud, glow on the traced chain, honest metric chips, legible hover/click reason
  panel. A real step up from the old hardcoded toy graph.
- Mobile @390px: usable. Metric chips wrap to two rows, search bar full width, graph
  visible and tappable below the fold, legend text readable, no horizontal overflow.

## Screenshots (gitignored, regenerate via Playwright if needed)

- `.playwright-mcp/round1-desktop-overview.png`
- `.playwright-mcp/round1-composing-fractions-trace.png` (Finding 1, repro #1)
- `.playwright-mcp/round1-direct-canvas-click.png` (Finding 1, repro #2)
- `.playwright-mcp/round1-unit-fractions-cycle-trace.png` (Finding 2 + cycle-safety proof)
- `.playwright-mcp/round1-mobile-390.png`, `round1-mobile-390-graph.png`,
  `round1-mobile-390-node-selected.png`

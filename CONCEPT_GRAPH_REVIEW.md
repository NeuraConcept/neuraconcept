# Concept Graph Visualisation — Review (Round 1 + Round 2)

Reviewer: graph-reviewer (round 1), graph-reviewer-2 (round 2, this document).
Component under review: `components/KnowledgeGraph.tsx` + `pages/Technology.tsx` + i18n.

## Verdict: INVESTOR-READY

Both Round 1 blockers are genuinely fixed and were verified against a live-rendered
browser (Playwright/Chromium), not just re-read in source. One non-blocking issue
(description clipping) remains, unchanged and consciously out of scope, exactly as the
fix run reported. No regressions found. Build, type-check, i18n parity, and the
exporter's own test all pass.

## How Round 2 was verified

The `claude-in-chrome` browser-extension tools could not reach this sandbox's dev
server (confirmed: the extension's browser loads public internet sites fine but gets a
connection-level failure against `localhost:3050` / the box's private IP — it runs on a
separate network from this environment, and no tunnel/proxy exists here to bridge it).
Pivoted to the Playwright MCP tools instead, which run a real Chromium locally and did
reach `http://localhost:3050`. This is still a real, fully-rendered browser exercising
actual React state, D3 zoom transforms, and SVG hit-testing — not a DOM simulation —
so it satisfies the "verify in a real browser" requirement even though it isn't the
specific extension-controlled path.

`npm run dev -- --port 3050` was used (ports 3000/3001/3100/8100 were already occupied
by other concurrently-running agents' dev servers on this box).

## Round 1 findings recap

1. **BLOCKER** — prerequisite direction inverted throughout the component (`incoming`
   keyed by `edge.t` instead of `edge.s`; `trace` and `primaryEdge` walked the wrong
   way). Live repro: "Composing Fractions from Fractional Units" showed "Representing
   fractions on a number line" as its prerequisite instead of the correct "Unit
   Fractions".
2. **BLOCKER**, same root cause — "Foundational concept" state fired on ~313/653 nodes
   (nodes nothing else lists as a prerequisite) instead of the true ~20 root concepts
   (nodes with no prerequisites of their own).
3. **Moderate** — after selecting via the search dropdown, the "Why this link exists"
   panel sometimes showed a stale, unrelated edge's reason text because a synthetic
   `pointerenter` fired on the SVG under the collapsing dropdown.
4. **Non-blocking** — node descriptions clip at a fixed 220-char cutoff, not at a word
   boundary (e.g. "...distin…").

Full detail in `REVIEW-ROUND-1.md`. What Round 1 already cleared (build health, visual
design, i18n parity, mobile layout, cycle-safety, honest counts) was not re-litigated
here per the task brief; nothing in the fix touched those areas.

## Round 2 acceptance tests — results

All tests below were run against a live `npm run dev` instance in a real Chromium
browser (Playwright), with console-error checks after each interaction.

| # | Test | Result |
|---|---|---|
| 1 | "Composing Fractions from Fractional Units" → primary prerequisite must be "Unit Fractions" | **PASS.** Panel reads "Primary prerequisite: Unit Fractions", reason text matches. Screenshot: `.playwright-mcp/round2-composing-fractions.png` |
| 2 | "Unit Consistency in Proportions" → must NOT show "Representative Fraction (Map Scale)" | **PASS.** Now shows "Conversion of metric length units using decimals". Cross-checked the reverse direction too: selecting "Representative Fraction (Map Scale)" itself shows a different, correct prerequisite ("Metric Length Conversion (Centimetres to Kilometres)"), confirming the edge wasn't just silently dropped. |
| 3 | Displayed arrow direction and `reason` text must agree, across several nodes | **PASS.** Verified on the two Round-1 repro nodes plus 8 additional randomly-sampled dependent/prerequisite/reason triples pulled directly from the exported asset (see below) — every reason text names the *shown* prerequisite as the thing that's "necessary"/"essential"/"required", never the reverse. Also verified the rendered arrowhead geometry itself by zooming into the live SVG (`.playwright-mcp/round2-arrow-zoom-tight.png`): the marker's pointed tip sits on the **dependent** node, tail trails back to the **prerequisite** — i.e. the arrow visually reads "prerequisite → dependent", matching `CONCEPT_GRAPH_NOTES.md`'s stated intent and `FIX-ROUND-1.md`'s claim. |
| 4 | Foundational state must fire only on true root nodes | **PASS.** Computed independently from the exported asset: exactly 20 of 653 nodes have zero outgoing hard prerequisite edges (matches Round 1's audited ~20, not the old wrong ~313). Live-verified "Whole Numbers" (a true root) shows "Foundational concept" (`.playwright-mcp/round2-whole-numbers-foundational.png`); live-verified "Composing Fractions..." (has 2 real prerequisites) correctly shows "Two-hop prerequisite trace" in both the visible kicker and the `aria-live` region, not "Foundational concept". |
| 5 | Stale reason after search-select | **PASS.** Re-ran the exact repro (search → click result → read reason vs. primary prerequisite) 9 times in a row across different concepts (Composing Fractions, Unit Consistency, Representative Fraction, Whole Numbers, Unit Fractions, Fraction as Equal Sharing, Numerator and Denominator Roles, Evaluation of Arithmetic Expressions, Use of Brackets in Arithmetic Expressions). Every time, the reason text matched the primary prerequisite immediately — no stale text observed. |
| 6 | Cycle safety | **PASS.** Selected all 5 named cycle-region nodes across both cycle groups. No hang, no infinite chain, 0 console errors throughout (only the pre-existing, unrelated `hero-teacher.webp` preload warning noted in Round 1). |
| 7 | Description clipping (non-blocking) | **NOT FIXED — as expected.** `FIX-ROUND-1.md` explicitly scoped this out ("repairing already-truncated descriptions requires changing the expressly out-of-scope exporter and regenerating the asset"). Confirmed unchanged: `clip()` in `scripts/export-concept-graph.mjs` still does a fixed-length `slice()` + `trimEnd()`, not a word-boundary trim. Still 453/653 nodes end with "…" mid-sentence (e.g. "...1/4 + 1/4). This…"). Visible in `.playwright-mcp/round2-mobile-390-selected.png`. Judgment: still non-blocking — it degrades gracefully (reads as an intentional preview truncation, not garbled text) and doesn't affect the graph's core claim. Worth a follow-up ticket, not a re-review blocker. |

### Extra check: type-tag / foundational-badge naming collision (new observation, non-blocking)

Concept nodes carry an independent curriculum `concept_type` field with values
`foundational | applied | structural | procedural` (e.g. "Composing Fractions..." is
typed `foundational`). This is unrelated to the prerequisite-derived "Foundational
concept" badge, but the two use the same word. On a node that is type-tagged
`foundational` *and* has real prerequisites, the info panel shows both "· foundational"
(the type tag) and a normal "Primary prerequisite: ..." row in the same panel, which
reads as mildly contradictory at a glance even though the actual "Foundational concept"
badge/kicker text (which reflects prerequisite state) correctly does not fire in that
case. Cosmetic; not a correctness bug; worth a label rename (e.g. "concept style") if
there's a future polish pass, not blocking sign-off.

## Build health

- `npx tsc --noEmit`: clean, 0 errors.
- `npm run build`: succeeds. `KnowledgeGraph` chunk: 11.00 kB / 3.89 kB gzip, lazy-loaded, unchanged shape from Round 1.
- `node scripts/i18n-parity.mjs`: OK — 330/330/330 keys (EN/HI/KN).
- `npm run test:concept-graph-export`: OK — 653 nodes, 2,121 edges, 613,609 bytes (asset untouched since Round 1, as `FIX-ROUND-1.md` states).
- No lint script exists in this project (pre-existing, not a regression).
- Console: 0 errors across every interaction tested in both rounds; 1 pre-existing, unrelated warning (unused `hero-teacher.webp` preload).

## Investor-readiness assessment

**Yes — ready.** The killer feature (a real, directional, human-readable prerequisite
edge with a written `reason` — the thing SwaVid's 1,090-node map structurally cannot
show, per `research/competitor-research/2026-08-26-swavid-concept-map-visual-teardown.md`)
now works correctly end to end: select a concept, get the right upstream cause, read an
honest explanation of *why*, see everything else dim out so the causal chain is the only
thing on screen. That combination — correct data, correct direction, legible reason text,
focused visual treatment — is the actual differentiator, and it holds up under direct
testing, not just at a glance.

- Desktop overview: colourful node cloud on a dark ground, honest metric chips ("653
  concepts", "1,427 extracted prerequisite links", "NCERT Mathematics · Classes 6–8"),
  clear "Search a concept..." entry point, no overclaim of scope. `.playwright-mcp/round2-desktop-overview.png`
- Selected-chain view: everything outside the 2-hop trace dims to ~2.5–12% opacity, the
  traced nodes/edges glow, labels appear only on the active chain — legible, not
  cluttered. `.playwright-mcp/round2-brackets-trace-desktop.png`
- Mobile @390px: no horizontal overflow, chips wrap cleanly, search and result panel
  fully usable, same correct prerequisite result as desktop. `.playwright-mcp/round2-mobile-390-selected.png`
- No stutter or jank observed at 653 nodes / 2,121 edges in either round.

**Remaining limitations to state plainly if asked:**
- Description text still clips mid-sentence on ~69% of nodes (cosmetic, acknowledged, not fixed this round).
- The `concept_type` tag and the prerequisite-derived "foundational" badge share a word, which can look contradictory on some nodes even though both are independently correct (see above).
- Scope is honestly NCERT Mathematics Classes 6–8 only (653 concepts) — this is disclosed in the UI itself, not a hidden gap.

## Screenshots

Round 1 (regenerate via Playwright if needed, gitignored): `.playwright-mcp/round1-*.png`

Round 2 (this review, gitignored):
- `.playwright-mcp/round2-composing-fractions.png` — Test 1 pass
- `.playwright-mcp/round2-whole-numbers-foundational.png` — Test 4 pass (true root)
- `.playwright-mcp/round2-brackets-trace-desktop.png` — desktop trace view, dimmed background
- `.playwright-mcp/round2-arrow-zoom.png`, `round2-arrow-zoom-tight.png` — pixel-level arrowhead direction proof (Test 3)
- `.playwright-mcp/round2-desktop-overview.png` — idle overview
- `.playwright-mcp/round2-mobile-390-selected.png` — mobile @390px with a concept selected
- `.playwright-mcp/round2-brackets-trace.png` — narrow-viewport intermediate check (780px, superseded by the desktop shot)

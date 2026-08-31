# Handoff: Improve the NeuraConcept Curriculum Graph

You are picking up an interactive knowledge-graph visualisation on the NeuraConcept marketing site. It works and is on an open PR — your job is to make it **better**, primarily visually and interactively. The founder will talk to you directly about what they want.

---

## 1. Where things are

- **Repo:** `/home/ubuntu/Desktop/Projects/edtech-research` (parent workspace)
- **Project:** `projects/neuraconcept/` — its own git repo (submodule), React 19 + Vite 6 + D3 7.9 + Tailwind + Talkr i18n
- **The component:** `components/KnowledgeGraph.tsx`
- **Where it renders:** `pages/Technology.tsx` → live at `/technology`
- **Data asset:** `public/concept-graph.json` (613KB, generated — do not hand-edit)
- **Exporter:** `scripts/export-concept-graph.mjs` + `scripts/test-export-concept-graph.mjs`
- **Source data:** `projects/kg-pipeline/output/` — **READ-ONLY, never modify**

**Current branch:** `feature/curriculum-graph`, based cleanly off `origin/main`.
**Open PR:** https://github.com/NeuraConcept/neuraconcept/pull/16

**READ FIRST:** `projects/neuraconcept/CLAUDE.md`. It has hard conventions and CI gates. Non-negotiables from it:
- Brand blue is `#0071E3` (NOT `#007AFF` — fails WCAG AA)
- Body text `text-gray-500` (NOT `text-gray-400` — fails AA). `text-gray-300` only on dark panels.
- Never add an `external` array to `vite.config.ts`
- All `<img>` need explicit width/height (CLS)
- Heading order h1→h2→h3, no skipping

Also useful: `CONCEPT_GRAPH_NOTES.md` (original author notes), `REVIEW-ROUND-1.md` and `CONCEPT_GRAPH_REVIEW.md` (what two reviewers found and how it was fixed).

---

## 2. What it currently does

- Renders 653 concepts / 2,121 edges (1,316 hard) as a 2D D3 force-directed graph in a full-width dark panel.
- Nodes colour-coded by topic; header states honest counts: *653 concepts · 1,427 extracted prerequisite links · NCERT Mathematics Classes 6–8*.
- Search box to find and focus a concept.
- Selecting a concept traces its prerequisite chain **up to 2 hops upstream** and shows the extracted `reason` text for each link.
- Caption: *"The lines are the learning model."* Controls: drag to pan, scroll to zoom, "Reset view".
- Lazy-loaded via `React.lazy` + `Suspense` so D3 doesn't block first paint.
- Tri-lingual (en/hi/kn).

---

## 3. VERIFIED DATA FACTS — do not re-derive, do not get backwards

**Edge direction (this already caused one shipped bug):**
> **`from_id` = the DEPENDENT (target concept). `to_id` = the PREREQUISITE.**
> In `public/concept-graph.json` these are **`s` (dependent)** and **`t` (prerequisite)**.

Proof: `projects/kg-pipeline/src/kg_pipeline/stages/connect.py:48-51` — the literal LLM prompt that generated the edges says *"from_id = the TARGET (dependent), to_id = the prerequisite"*. And `stages/commit.py:210-228` writes `MERGE (from_c)-[:REQUIRES]->(to_c)` — from_c *requires* to_c.

An earlier version of the component had this inverted: `incoming` was keyed by `edge.t` and `trace` walked `edge.s`. The UI showed an arrow pointing one way and a reason sentence saying the opposite. **If you touch traversal, keep `incoming` keyed by `edge.s` and `trace` walking `edge.t`.**

**Graph defects (all real, all handled — keep them handled):**
- **13 CYCLES — the graph is NOT a DAG.** Traversal MUST carry a visited-set and a depth cap or it hangs the browser. Real cycles: `Unit Fractions ↔ Fraction as Equal Sharing ↔ Numerator and Denominator Roles`; `Evaluation of Arithmetic Expressions ↔ Use of Brackets`. These aren't extraction errors — they're genuinely co-taught concepts.
- 101 dangling edges (4.4%) reference missing concepts — dropped at export.
- 78 duplicate `(from_id,to_id)` pairs — deduped at export.
- 11 mutually-prerequisite pairs — tiebreak on higher `confidence` for determinism.
- **Only ~20 concepts (3.1%) are TRUE roots** with no prerequisites. **313 (47.9%) are leaves** (nothing depends on them). An earlier note wrongly said "48% have no prerequisites" — that was the leaf count. The "foundational concept" empty state is a RARE path.
- Coverage is **NCERT Mathematics Classes 6–8 only**. No Science. Never imply otherwise in copy.

Full detail: `docs/plans/2026-08-25-kg-quality-audit.md`.

---

## 4. Why the edges matter (the competitive point)

The closest competitor, SwaVid, has a beautiful 3D Three.js concept map — and **its own on-screen copy says "0 tested prerequisite edges."** Their prerequisite graph is empty.

We have **1,427 real hard edges, each carrying a written `reason`** explaining why one concept depends on another. Hovering an edge and reading that reason is something they structurally cannot show.

**So: they have the better picture, we have the better graph.** Any visual work should make the *edges and the reason text* more prominent, not less. See `research/competitor-research/2026-08-26-swavid-concept-map-visual-teardown.md` for what's worth borrowing (dark ground with additive glow, depth falloff, no labels at rest, an honest legend) and what to avoid.

Use that as intelligence about them — not as the authority for product decisions. Product reasoning should cite `research/core/startup_idea.md`.

---

## 5. Known remaining issues (good starting points)

1. **The graph sits below the fold.** On 1440×900 you land on the "Neuro-Symbolic AI" hero and a Knowledge Graphs card; you must scroll to reach the graph. The strongest asset isn't the first thing seen.
2. **Description clipping** — node descriptions clip mid-word at 220 chars on 453/653 nodes, producing things like `"...distin…"`. Should trim on a word boundary.
3. **Static first impression** — the value is in *clicking* a node and watching the chain light up. Consider an idle/auto-demo state, or a pre-selected example chain on load, so the payoff is visible without interaction.
4. **Mobile** — verify at ~390px; it was tightened once but deserves another look.
5. The exporter's test script is a thin smoke test (counts/bounds). It does **not** assert the audit defects (dangling-drop, dedup, no-embeddings), so a regression there wouldn't alarm.

---

## 6. How to run and verify (exact commands, including gotchas)

```bash
cd /home/ubuntu/Desktop/Projects/edtech-research/projects/neuraconcept
npm install                      # express is needed by prerender; node_modules may be stale
npm run dev                      # Vite dev server
npm run build                    # vite build + prerender (must write 12/12 HTML)
npx tsc --noEmit                 # CI gate
node scripts/i18n-parity.mjs     # CI gate — en/hi/kn must match
node scripts/test-export-concept-graph.mjs
npm run export:concept-graph     # regenerate the asset from kg-pipeline output
```

**Screenshots — important gotchas:**
- **The `claude-in-chrome` extension CANNOT reach this sandbox's localhost** (separate network). Don't waste time on it. It works fine for public URLs.
- If you do use `claude-in-chrome` on a public site and screenshots fail with `params.clip.scale`, the browser window is 0×0 — call `resize_window` to 1440×900 first.
- **Playwright is not installed; `puppeteer` is.** And the script must be run **from inside `projects/neuraconcept/`** or module resolution fails.

Working recipe:
```bash
cd projects/neuraconcept
npx --yes serve -s dist -l 4321 &     # or use npm run dev
cat > ./shot.mjs <<'EOF'
import puppeteer from 'puppeteer';
const b = await puppeteer.launch({ args: ['--no-sandbox','--disable-dev-shm-usage'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 1000 });
await p.goto('http://127.0.0.1:4321/technology', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 5000));   // let D3 settle
await p.screenshot({ path: '/tmp/graph.png' });
await b.close();
EOF
node ./shot.mjs && rm ./shot.mjs
```
Ports 3000/3001/3050/3100/8000/8001/8100 may be occupied by other agents — pick a free one.

---

## 7. Regression tests — these MUST still pass after any change

Verify in a real browser, not by reading code:

1. Select **"Composing Fractions from Fractional Units"** → primary prerequisite MUST be **"Unit Fractions"**.
2. Select **"Unit Consistency in Proportions"** → must NOT show "Representative Fraction (Map Scale)" as its prerequisite.
3. The displayed `reason` must agree with the arrow direction. If the reason says "X requires Y", Y must be shown as the prerequisite.
4. **Cycle safety:** select the cycle concepts listed in §3 — no hang, no infinite chain.
5. Foundational state appears only for true roots (~20 nodes, not 313).
6. Honest counts still displayed.

---

## 8. Constraints

- **NEVER `git push` without checking the remote first.** This bit us badly: an earlier branch was 2 commits *behind* `main` and contained a fix already merged upstream as PR #15; a PR from it would have deleted `scripts/prerender.mjs` and reverted merged SEO work. **Always `git fetch` and compare against `origin/main` before committing or opening a PR.**
- Work only in `projects/neuraconcept/`. Other agents may be active in `projects/gradeowl/`, `projects/gradeowl-web/`, `student-app/`.
- `projects/kg-pipeline/` is **read-only**.
- Never commit `.playwright-cli/`, `output/`, or `dist/` (first two are now gitignored).
- Don't regenerate `public/concept-graph.json` unless you mean to — and if you do, re-run the exporter test and check the size stays ~613KB with no `embedding` fields.
- Lighthouse CI gates exist. `/technology` already caps at ~73–85 mobile perf because it ships the full bundle — **keep the D3 chunk lazy** and don't make perf worse.
- i18n parity is a **hard CI gate**. Any new visible string needs en + hi + kn. If you can't produce good Hindi/Kannada, keep copy minimal rather than shipping bad translations.

---

## 9. Suggested first move

Run the build, screenshot `/technology` at 1440px and 390px, look at your own screenshots, and form your own opinion before changing anything. Then talk to the founder — they have specific ideas about how they want it to look, and they've already rejected one version as "too small and cramped in a sidebar" (since fixed).

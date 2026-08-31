# Concept Graph Fix — Round 1

## Scope

Only `components/KnowledgeGraph.tsx` was changed for the graph behavior. The
exporter and `public/concept-graph.json` were not changed or regenerated.

## Findings and resolution

1. **Blocker: prerequisite traversal was reversed.**
   - Hard prerequisite edges are now indexed by `edge.s` (the dependent), then
     traversed through `edge.t` (the prerequisite).
   - The primary-prerequisite label also reads `edge.t`.
   - Focused arrowheads now render at the dependent end using
     `markerStart` with `auto-start-reverse`, visually reading from the
     prerequisite toward the dependent.

2. **Blocker: foundational-state detection was reversed.**
   - It now follows the corrected prerequisite index. A selected node is
     foundational only when it has no hard outgoing prerequisite edge as
     `edge.s`.

3. **Moderate: search selection could show a stale edge reason.**
   - Search selection suppresses the synthetic edge-hover event caused by the
     dropdown disappearing under the pointer. The next actual SVG pointer move
     restores normal hover behavior.

4. **Non-blocking: mid-word description clipping.**
   - Not changed: repairing already-truncated descriptions requires changing
     the expressly out-of-scope exporter and regenerating the asset.

## Browser acceptance evidence

Fresh Chromium walkthrough at `http://127.0.0.1:3001/technology`:

1. **Composing Fractions from Fractional Units** displays **Primary
   prerequisite: Unit Fractions**. Its displayed explanation says that
   understanding a unit fraction is needed before composing larger fractions.
   - Before: `output/playwright/before-composing-fractions.png`
   - After: `output/playwright/after-composing-fractions.png`

2. **Unit Consistency in Proportions** displays **Conversion of metric length
   units using decimals**, not **Representative Fraction (Map Scale)**.
   - Evidence: `output/playwright/after-unit-consistency.png`

3. The selected-edge reason stayed paired with the selected prerequisite after
   a search selection. For Unit Consistency, it explains conversion to identical
   units before forming a valid proportion, matching its displayed primary
   prerequisite.

4. The live search flow remained responsive with no console errors while
   selecting every required cyclic concept: **Unit Fractions**, **Fraction as
   Equal Sharing**, **Numerator and Denominator Roles**, **Evaluation of
   Arithmetic Expressions**, and **Use of Brackets in Arithmetic Expressions**.
   The two-hop cap and visited-node guard prevented an infinite chain.
   - Evidence: `output/playwright/after-unit-fractions-cycle.png`,
     `output/playwright/after-fraction-cycle.png`, and
     `output/playwright/after-arithmetic-cycle.png`

5. **Whole Numbers** correctly displays the **Foundational concept** state with
   no primary-prerequisite row.
   - Evidence: `output/playwright/after-foundational-whole-numbers.png`

## Static verification

- `git diff --check` — passed
- `npx tsc --noEmit` — passed
- `node scripts/i18n-parity.mjs` — passed (330 keys in EN, HI, and KN)
- `npm run build` — passed
- `npm run lint` — unavailable: this package has no `lint` script; no lint
  configuration was added because it is outside this focused repair.

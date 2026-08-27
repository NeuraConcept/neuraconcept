# Concept Graph Visualisation

## What shipped

`components/KnowledgeGraph.tsx` now replaces the previous hard-coded demo on the
Technology page. It fetches a compact public asset, renders an SVG D3 zoomable graph,
and keeps prerequisite links visually prominent:

- Selecting a concept follows its deterministic, highest-confidence prerequisite chain
  for up to two upstream hops. The traversal tracks visited concepts, so data cycles
  cannot hang the browser.
- Selecting or hovering an edge exposes its real extracted explanation. Focused links
  have arrowheads from prerequisite to dependent.
- Search focuses a concept; reset and clear-trace controls restore the overview.
- The visual is lazy-loaded on `/technology`, has no runtime force simulation, uses
  responsive touch controls, and keeps all added UI text in EN/HI/KN.

## Data export

`scripts/export-concept-graph.mjs` reads the sibling `../kg-pipeline/output/` tree
without modifying it. Run:

    npm run export:concept-graph
    npm run test:concept-graph-export

It writes `public/concept-graph.json`, currently **613,609 bytes** (about 600 KB).
The compact v1 asset has:

- 653 de-duplicated concept nodes with short name, topic, grade, difficulty,
  precomputed `x`/`y`, short description, and concept type.
- 2,121 valid de-duplicated links: 1,316 hard and 805 soft.
- A provenance header retaining the truthful source total of 1,427 extracted hard
  prerequisite links. The marketing UI deliberately says “extracted prerequisite
  links”, because invalid/duplicate source links are not rendered.

Embeddings, full raw descriptions, mastery records, misconceptions, aliases, and
other unused pipeline data are excluded.

## Where it is wired

`pages/Technology.tsx` lazy-loads the component in the existing Knowledge Graph section.
No Home or Vision-page content changed.

## Screenshots

- `/tmp/neuraconcept-graph-screens/desktop-final.png` — desktop overview
- `/tmp/neuraconcept-graph-screens/whole-numbers-trace-refined.png` — two-hop trace
- `/tmp/neuraconcept-graph-screens/mobile-final.png` — mobile overview

## Deliberate limits

The scope is honestly limited to NCERT Mathematics Classes 6–8. Soft links are retained
as low-emphasis context; the visible headline and trace use hard prerequisite links.
The exporter must be rerun when the KG output changes; it is intentionally not part of
the regular Vite build because the pipeline output lives outside this repository.

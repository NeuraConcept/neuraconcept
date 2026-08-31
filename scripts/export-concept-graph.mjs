import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as d3 from 'd3';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.resolve(projectRoot, '..', 'kg-pipeline', 'output');
const destination = path.join(projectRoot, 'public', 'concept-graph.json');
const LAYOUT = { width: 1200, height: 760, padding: 70 };

const readJsonArrays = (kind) => fs.readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(sourceRoot, entry.name, kind))
  .filter((directory) => fs.existsSync(directory))
  .flatMap((directory) => fs.readdirSync(directory)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.join(directory, file)))
  .sort()
  .flatMap((file) => JSON.parse(fs.readFileSync(file, 'utf8')));

const clip = (value, limit) => {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  return text.length <= limit ? text : `${text.slice(0, limit - 1).trimEnd()}…`;
};

const compareEdges = (left, right) => {
  const confidence = Number(right.confidence ?? 0) - Number(left.confidence ?? 0);
  if (confidence !== 0) return confidence;
  if (left.type !== right.type) return left.type === 'hard' ? -1 : 1;
  return JSON.stringify(left).localeCompare(JSON.stringify(right));
};

const conceptsById = new Map();
for (const concept of readJsonArrays('resolved')) {
  if (concept.id && !conceptsById.has(concept.id)) conceptsById.set(concept.id, concept);
}

const rawEdges = readJsonArrays('edges');
const rawHardEdges = rawEdges.filter((edge) => edge.type === 'hard').length;
const validByPair = new Map();
let danglingEdges = 0;

for (const edge of rawEdges) {
  if (!conceptsById.has(edge.from_id) || !conceptsById.has(edge.to_id)) {
    danglingEdges += 1;
    continue;
  }

  const key = `${edge.from_id}\u0000${edge.to_id}`;
  const current = validByPair.get(key);
  if (!current || compareEdges(edge, current) < 0) validByPair.set(key, edge);
}

const concepts = [...conceptsById.values()];
const indexById = new Map(concepts.map((concept, index) => [concept.id, index]));
const topics = [...new Set(concepts.map((concept) => concept.topic || 'Mathematics'))].sort();
const topicIndex = new Map(topics.map((topic, index) => [topic, index]));
const cleanEdges = [...validByPair.values()].sort((left, right) => (
  indexById.get(left.from_id) - indexById.get(right.from_id)
  || indexById.get(left.to_id) - indexById.get(right.to_id)
  || compareEdges(left, right)
));

// Grade cohorts settle into their own horizontal region (x only — y is left free so each
// cohort spreads into an organic blob rather than a rigid strip) while link/charge still
// drive the finer topic-level clustering within a cohort.
const GRADE_CENTER_X = { 6: -320, 7: 0, 8: 320 };
const GRADE_CLUSTER_STRENGTH = 0.8;

const layoutNodes = concepts.map((concept, index) => ({ id: index, grade: Number(concept.grade_introduced) || 0 }));
const layoutLinks = cleanEdges.map((edge) => ({
  source: indexById.get(edge.from_id),
  target: indexById.get(edge.to_id),
  hard: edge.type === 'hard',
}));

const simulation = d3.forceSimulation(layoutNodes)
  .randomSource(d3.randomLcg(0.42))
  .force('link', d3.forceLink(layoutLinks).id((node) => node.id).distance((link) => (
    link.hard ? 38 : 24
  )).strength((link) => (link.hard ? 0.18 : 0.05)))
  .force('charge', d3.forceManyBody().strength(-34))
  .force('collide', d3.forceCollide().radius(4))
  .force('center', d3.forceCenter(0, 0))
  .force('gradeX', d3.forceX((node) => GRADE_CENTER_X[node.grade] ?? 0)
    .strength((node) => (node.grade in GRADE_CENTER_X ? GRADE_CLUSTER_STRENGTH : 0)))
  // Constraining x per cohort pushes mutual repulsion into y instead, stretching each cloud
  // into a tall sliver. A weak pull back toward the shared centerline keeps each cohort round.
  .force('gradeY', d3.forceY(0).strength(0.16))
  .stop();

for (let tick = 0; tick < 600; tick += 1) simulation.tick();
const xExtent = d3.extent(layoutNodes, (node) => node.x ?? 0);
const yExtent = d3.extent(layoutNodes, (node) => node.y ?? 0);
const scaleX = d3.scaleLinear().domain(xExtent).range([LAYOUT.padding, LAYOUT.width - LAYOUT.padding]);
const scaleY = d3.scaleLinear().domain(yExtent).range([LAYOUT.padding, LAYOUT.height - LAYOUT.padding]);

// X stays on one shared scale so the three grade cohorts keep their left-to-right separation.
// Y is normalised PER GRADE instead: grade 6 has 375 concepts vs grade 8's 110, so sharing one
// vertical scale let the biggest cohort's repulsion dominate and left the others looking
// squashed. Scaling each cohort's own y-extent to the same target height gives three
// comparably-sized clouds regardless of how many concepts each grade has.
const yScaleByGrade = new Map(Object.keys(GRADE_CENTER_X).map(Number).map((grade) => {
  const gradeYExtent = d3.extent(layoutNodes.filter((node) => node.grade === grade), (node) => node.y ?? 0);
  return [grade, d3.scaleLinear().domain(gradeYExtent).range([LAYOUT.padding, LAYOUT.height - LAYOUT.padding])];
}));
const resolveY = (node) => (yScaleByGrade.get(node.grade) ?? scaleY)(node.y ?? 0);

// A soft "cloud" outline per grade cohort: convex hull of its final node positions, inflated
// outward from the centroid for breathing room, then smoothed into a closed spline so it reads
// as an organic blob instead of a polygon or a bounding box.
const CLOUD_PADDING = 34;
const cloudLine = d3.line().curve(d3.curveCatmullRomClosed);
const gradeZones = Object.keys(GRADE_CENTER_X).map(Number).sort((a, b) => a - b).map((grade) => {
  const points = layoutNodes
    .filter((node) => node.grade === grade)
    .map((node) => [scaleX(node.x ?? 0), resolveY(node)]);
  const hull = d3.polygonHull(points);
  if (!hull) return null;
  const [cx, cy] = d3.polygonCentroid(hull);
  const padded = hull.map(([x, y]) => {
    const dx = x - cx; const dy = y - cy; const length = Math.hypot(dx, dy) || 1;
    return [x + (dx / length) * CLOUD_PADDING, y + (dy / length) * CLOUD_PADDING];
  });
  const labelX = cx;
  const labelY = Math.min(...padded.map(([, y]) => y)) - 12;
  return { grade, path: cloudLine(padded), labelX: Math.round(labelX), labelY: Math.round(labelY) };
}).filter(Boolean);

const graph = {
  v: 1,
  m: {
    sourceConcepts: concepts.length,
    sourceHardEdges: rawHardEdges,
    renderedEdges: cleanEdges.length,
    renderedHardEdges: cleanEdges.filter((edge) => edge.type === 'hard').length,
    danglingEdges,
    topics,
    gradeZones,
  },
  n: concepts.map((concept, index) => ({
    n: clip(concept.name, 92),
    t: topicIndex.get(concept.topic || 'Mathematics'),
    g: Number(concept.grade_introduced) || 0,
    d: Number(concept.estimated_difficulty) || 1,
    x: Math.round(scaleX(layoutNodes[index].x ?? 0)),
    y: Math.round(resolveY(layoutNodes[index])),
    s: clip(concept.description, 220),
    c: clip(concept.concept_type, 42),
  })),
  e: cleanEdges.map((edge) => ({
    s: indexById.get(edge.from_id),
    t: indexById.get(edge.to_id),
    c: Math.round(Number(edge.confidence ?? 0) * 100) / 100,
    k: edge.type === 'hard' ? 1 : 0,
    r: clip(edge.reason, 240),
  })),
};

fs.writeFileSync(destination, `${JSON.stringify(graph)}\n`);
const size = fs.statSync(destination).size;
console.log(`Exported ${graph.n.length} concepts and ${graph.e.length} valid edges to ${path.relative(projectRoot, destination)} (${size.toLocaleString()} bytes).`);

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

const layoutNodes = concepts.map((_concept, index) => ({ id: index }));
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
  .stop();

for (let tick = 0; tick < 520; tick += 1) simulation.tick();
const xExtent = d3.extent(layoutNodes, (node) => node.x ?? 0);
const yExtent = d3.extent(layoutNodes, (node) => node.y ?? 0);
const scaleX = d3.scaleLinear().domain(xExtent).range([LAYOUT.padding, LAYOUT.width - LAYOUT.padding]);
const scaleY = d3.scaleLinear().domain(yExtent).range([LAYOUT.padding, LAYOUT.height - LAYOUT.padding]);

const graph = {
  v: 1,
  m: {
    sourceConcepts: concepts.length,
    sourceHardEdges: rawHardEdges,
    renderedEdges: cleanEdges.length,
    renderedHardEdges: cleanEdges.filter((edge) => edge.type === 'hard').length,
    danglingEdges,
    topics,
  },
  n: concepts.map((concept, index) => ({
    n: clip(concept.name, 92),
    t: topicIndex.get(concept.topic || 'Mathematics'),
    g: Number(concept.grade_introduced) || 0,
    d: Number(concept.estimated_difficulty) || 1,
    x: Math.round(scaleX(layoutNodes[index].x ?? 0)),
    y: Math.round(scaleY(layoutNodes[index].y ?? 0)),
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

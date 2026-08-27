import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetPath = path.join(projectRoot, 'public', 'concept-graph.json');

assert.ok(fs.existsSync(assetPath), 'Expected the generated concept graph asset to exist. Run npm run export:concept-graph.');

const graph = JSON.parse(fs.readFileSync(assetPath, 'utf8'));
assert.equal(graph.v, 1);
assert.equal(graph.m.sourceConcepts, 653);
assert.equal(graph.m.sourceHardEdges, 1427);
assert.equal(graph.n.length, 653);
assert.equal(graph.e.length, graph.m.renderedEdges);
assert.ok(graph.e.every((edge) => Number.isInteger(edge.s) && Number.isInteger(edge.t) && edge.s >= 0 && edge.t >= 0));
assert.ok(graph.e.every((edge) => edge.s < graph.n.length && edge.t < graph.n.length));
assert.ok(graph.e.every((edge) => typeof edge.r === 'string' && edge.r.length > 0));
assert.ok(graph.e.every((edge) => edge.s !== edge.t));
assert.ok(graph.n.every((node) => Number.isFinite(node.x) && Number.isFinite(node.y)));
assert.ok(fs.statSync(assetPath).size < 1_500_000, 'Concept graph asset must remain below 1.5 MB.');

console.log(`Concept graph asset is valid: ${graph.n.length} nodes, ${graph.e.length} edges, ${fs.statSync(assetPath).size} bytes.`);

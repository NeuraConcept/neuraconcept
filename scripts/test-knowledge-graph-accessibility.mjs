import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(new URL('..', import.meta.url).pathname);
const component = fs.readFileSync(path.join(projectRoot, 'components', 'KnowledgeGraph.tsx'), 'utf8');
const graph = JSON.parse(fs.readFileSync(path.join(projectRoot, 'public', 'concept-graph.json'), 'utf8'));

assert.match(component, /role="presentation" aria-hidden="true"/);
assert.match(component, /data-accessibility-route="concept-relationships"/);
assert.match(component, /id="accessible-concept-select"/);
assert.match(component, /id={`accessible-\$\{relationship\}-title`}/);
assert.match(component, /relatedEdges/);
assert.match(component, /prerequisites: graph\.e\.filter\(\(edge\) => edge\.s === nodeIndex\)/);
assert.match(component, /dependents: graph\.e\.filter\(\(edge\) => edge\.t === nodeIndex\)/);
assert.match(component, /graph_relationship_prerequisite/);
assert.match(component, /graph_relationship_related/);
assert.doesNotMatch(component, /tabIndex=\{?\s*0/);

const hardEdges = graph.e.filter((edge) => edge.k === 1);
const softEdges = graph.e.filter((edge) => edge.k === 0);
assert.equal(hardEdges.length + softEdges.length, graph.e.length, 'Every visual edge must have a semantic relationship kind.');
assert.ok(hardEdges.length > 0 && softEdges.length > 0, 'Expected both hard prerequisite and soft related edges.');
assert.ok(graph.e.every((edge) => typeof edge.r === 'string' && edge.r.length > 0), 'Every relationship must expose a reason.');
assert.ok(graph.e.every((edge) => edge.s !== edge.t), 'Relationships must not self-link.');

for (const locale of ['en', 'hi', 'kn']) {
  const translations = JSON.parse(fs.readFileSync(path.join(projectRoot, 'i18n', `${locale}.json`), 'utf8'));
  for (const key of ['graph_accessible_label', 'graph_accessible_help', 'graph_choose_concept', 'graph_prerequisites', 'graph_dependents', 'graph_no_prerequisites', 'graph_no_dependents', 'graph_relationship_prerequisite', 'graph_relationship_related']) {
    assert.ok(translations.tech?.[key], `${locale} is missing tech.${key}`);
  }
}

console.log('Knowledge graph accessibility contract is valid.');

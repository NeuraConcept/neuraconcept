#!/usr/bin/env node
/**
 * i18n parity check.
 * Loads i18n/{en,hi,kn}.json, flattens to dotted-key sets,
 * fails if any locale is missing keys vs. English (the source).
 *
 * Run: node scripts/i18n-parity.mjs
 * CI: see .github/workflows/quality-checks.yml
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const locales = ['en', 'hi', 'kn'];

const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    return v && typeof v === 'object' && !Array.isArray(v)
      ? flatten(v, key)
      : [key];
  });

const trees = Object.fromEntries(
  locales.map((l) => [
    l,
    JSON.parse(readFileSync(resolve(root, 'i18n', `${l}.json`), 'utf8')),
  ])
);

const enKeys = new Set(flatten(trees.en));
let failed = false;

console.log(`English (source): ${enKeys.size} keys\n`);

for (const l of locales) {
  if (l === 'en') continue;
  const localeKeys = new Set(flatten(trees[l]));
  const missing = [...enKeys].filter((k) => !localeKeys.has(k));
  const extra = [...localeKeys].filter((k) => !enKeys.has(k));

  console.log(`${l.toUpperCase()}: ${localeKeys.size} keys`);
  if (missing.length) {
    failed = true;
    console.log(`  MISSING (${missing.length}):`);
    missing.slice(0, 20).forEach((k) => console.log(`    - ${k}`));
    if (missing.length > 20) console.log(`    ... and ${missing.length - 20} more`);
  }
  if (extra.length) {
    failed = true;
    console.log(`  EXTRA  (${extra.length}, not in en — likely typos or stale):`);
    extra.slice(0, 10).forEach((k) => console.log(`    - ${k}`));
    if (extra.length > 10) console.log(`    ... and ${extra.length - 10} more`);
  }
  if (!missing.length && !extra.length) console.log('  parity: OK');
  console.log('');
}

if (failed) {
  console.error('i18n parity check FAILED — fix missing/extra keys before merging.');
  process.exit(1);
}
console.log('i18n parity: OK');

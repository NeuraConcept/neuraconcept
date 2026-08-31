#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const netlify = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const buildCommand = netlify.match(/^\s*command\s*=\s*"([^"]+)"\s*$/m)?.[1];

if (!buildCommand?.includes('puppeteer browsers install chrome')) {
  throw new Error('Netlify build command must install the Puppeteer-matched Chrome before building.');
}

if (!buildCommand.includes('npm run build')) {
  throw new Error('Netlify build command must run the repository build after installing Chrome.');
}

if (!packageJson.devDependencies?.puppeteer) {
  throw new Error('Puppeteer must remain a local dev dependency for the Netlify build.');
}

console.log('Netlify build command installs local Puppeteer Chrome before npm run build.');

#!/usr/bin/env node
/**
 * Static prerendering for the NeuraConcept marketing SPA.
 *
 * Why: the site ships a single dist/index.html for every route. Googlebot
 * sees the home page <title>/<meta description> on /pricing, /gradeowl,
 * etc., and can't discover or correctly rank subpages. Result: GSC reports
 * only 1 of 12 sitemap URLs as "discovered."
 *
 * What this does:
 *   1. Reads public/sitemap.xml to derive the route list (path-only).
 *   2. Spins up a tiny Express static-file server on dist/ with SPA
 *      fallback (every unknown path returns index.html — same behaviour as
 *      Netlify's _redirects).
 *   3. Launches Puppeteer (headless), navigates to each route, waits for
 *      the SEO React effect to flush the per-page <title>/<meta>/<link
 *      rel="canonical"> updates, then captures the rendered HTML.
 *   4. Writes dist/<route>/index.html for every non-root route, and
 *      overwrites dist/index.html with the rendered home snapshot.
 *
 * The site continues to behave as a SPA after first paint: BrowserRouter
 * picks up where the prerendered HTML leaves off (React 19 hydrates the
 * existing markup; Talkr's defaultLanguage='en' matches what we render).
 *
 * Why not @prerenderer/renderer-puppeteer? Its 1.2.4 release hard-codes
 * `headless: 'new'`, which breaks against chrome-headless-shell — the
 * default binary puppeteer 24+ ships — with `Network.enable timed out`.
 * Driving puppeteer directly is ~50 LOC and dodges that bug.
 *
 * Run after `vite build` (see "build" script in package.json).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import express from 'express';
import puppeteer from 'puppeteer';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const distDir = join(root, 'dist');
const sitemapPath = join(root, 'public', 'sitemap.xml');

const PORT = process.env.PRERENDER_PORT
  ? Number(process.env.PRERENDER_PORT)
  : 13010;
const HOST = process.env.PRERENDER_HOST || '127.0.0.1';

/**
 * Walk a puppeteer cache subtree looking for an executable. Returns the
 * first match we can stat, or null if nothing usable is present.
 *
 * Tree layout (puppeteer 22+):
 *   <cache>/<browser>/<platform>-<version>/<unpack-dir>/<binPath>
 * Example:
 *   ~/.cache/puppeteer/chrome/mac_arm-147.0.7727.57/chrome-mac-arm64/
 *     Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing
 */
function findCachedBrowserBinary(browserDir, binPathParts) {
  const cacheRoot = process.env.PUPPETEER_CACHE_DIR
    || join(homedir(), '.cache', 'puppeteer');
  const root = join(cacheRoot, browserDir);
  if (!existsSync(root)) return null;
  const platforms = readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  for (const p of platforms) {
    const dir = join(root, p);
    const inner = readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    for (const i of inner) {
      const bin = join(dir, i, ...binPathParts);
      if (existsSync(bin)) return bin;
    }
  }
  return null;
}

/**
 * Prefer the full Chrome for Testing binary over chrome-headless-shell.
 *
 * In testing on this codebase, chrome-headless-shell + puppeteer 24
 * consistently fails with `Network.enable timed out` on every page —
 * `headless: 'shell'` doesn't fully repair the CDP handshake against the
 * shell binary in this version. Full Chrome works in both classic
 * (`headless: true`) and "new" headless modes.
 *
 * Returns null if neither is found, in which case puppeteer.launch will
 * auto-resolve and (on a fresh CI cache) fail loud with a clear error.
 */
function findChromeBinary() {
  const platform = process.platform;
  if (platform === 'darwin') {
    const chrome = findCachedBrowserBinary('chrome', [
      'Google Chrome for Testing.app',
      'Contents',
      'MacOS',
      'Google Chrome for Testing',
    ]);
    if (chrome) return chrome;
  }
  // Linux puppeteer cache layout
  const linuxChrome = findCachedBrowserBinary('chrome', ['chrome-linux64', 'chrome']);
  if (linuxChrome) return linuxChrome;
  return null;
}

/**
 * Parse routes (path-only) from public/sitemap.xml.
 * Strips the production origin so puppeteer can hit the local renderer.
 */
function loadRoutesFromSitemap() {
  const xml = readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return locs
    .map((u) => {
      try {
        const url = new URL(u);
        const p = url.pathname.replace(/\/+$/, '') || '/';
        return p;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

/**
 * Map a route path to its dist/ output path.
 *   '/'         -> dist/index.html
 *   '/pricing'  -> dist/pricing/index.html
 */
function outputPathFor(route) {
  if (route === '/') return join(distDir, 'index.html');
  return join(distDir, route.replace(/^\//, ''), 'index.html');
}

/**
 * Spin up an Express server pointed at dist/ with SPA fallback. Resolves
 * once the server is listening. Returns a stop() callback.
 */
function startStaticServer() {
  const app = express();
  app.use(express.static(distDir, { extensions: ['html'], dotfiles: 'allow' }));
  // SPA fallback — any path not resolved by static() returns index.html.
  app.get(/.*/, (_req, res) => {
    res.sendFile(join(distDir, 'index.html'));
  });
  return new Promise((resolveServer, rejectServer) => {
    const server = app.listen(PORT, HOST, (err) => {
      if (err) return rejectServer(err);
      resolveServer({
        url: `http://${HOST}:${PORT}`,
        stop: () => new Promise((r) => server.close(() => r())),
      });
    });
    server.on('error', rejectServer);
  });
}

/**
 * Render one route to HTML by visiting it in headless Chrome and reading
 * the live DOM after the SEO effect has updated <title>/<meta>/<link
 * rel="canonical">. Throws on render failure.
 */
async function renderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60_000);
  // Surface in-page console errors so we don't silently ship broken HTML.
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.warn(`[prerender:${route}] console.error: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => {
    console.warn(`[prerender:${route}] pageerror: ${err.message}`);
  });

  const url = `${baseUrl}${route}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 });

  // Wait for the React tree to mount and the SEO effect to flush. <main>
  // exists on every page (App.tsx wraps every route in <main>); we then
  // give effects an extra tick so document.title and meta tags update.
  await page.waitForSelector('main', { timeout: 30_000 });
  await new Promise((r) => setTimeout(r, 800));

  const html = await page.content();
  await page.close();
  return html;
}

async function main() {
  if (!existsSync(distDir)) {
    console.error(`[prerender] dist/ does not exist at ${distDir}. Run \`vite build\` first.`);
    process.exit(1);
  }
  if (!existsSync(sitemapPath)) {
    console.error(`[prerender] sitemap not found at ${sitemapPath}.`);
    process.exit(1);
  }

  const routes = loadRoutesFromSitemap();
  console.log(`[prerender] sitemap routes (${routes.length}): ${routes.join(', ')}`);

  const server = await startStaticServer();
  console.log(`[prerender] serving dist/ on ${server.url}`);

  const executablePath = findChromeBinary();
  if (executablePath) {
    console.log(`[prerender] using cached Chrome: ${executablePath}`);
  } else {
    console.log(`[prerender] no cached Chrome found — letting puppeteer resolve`);
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath || undefined,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    protocolTimeout: 120_000,
  });

  let wrote = 0;
  let failed = 0;
  try {
    for (const route of routes) {
      try {
        const html = await renderRoute(browser, server.url, route);
        const out = outputPathFor(route);
        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, html);
        console.log(`[prerender] wrote ${out} (${html.length} bytes)`);
        wrote++;
      } catch (err) {
        failed++;
        console.error(`[prerender:${route}] render FAILED:`, err.message);
      }
    }
    console.log(`[prerender] OK — wrote ${wrote}/${routes.length} HTML files (${failed} failed).`);
    if (failed > 0) process.exitCode = 1;
  } finally {
    await browser.close();
    await server.stop();
  }
}

main().catch((err) => {
  console.error('[prerender] FATAL:', err);
  process.exit(1);
});

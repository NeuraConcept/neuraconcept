# CLAUDE.md

Marketing site for NeuraConcept (`neuraconcept.com`). React 19 + Vite 6 SPA, hosted on Netlify. **This is a marketing site — perf and SEO matter more than feature breadth.**

*Last updated: 2026-08-31*

## Stack

- React 19, Vite 6, TypeScript ~5.8 — production dependencies are bundled locally; Vite uses explicit `manualChunks` for cacheable vendor groups
- Tailwind CSS 3.4 (PostCSS build, NOT the CDN script — see `tailwind.config.js` + `index.css` for theme + components)
- Talkr i18n: `en` / `hi` / `kn` (340 flattened keys each, parity enforced in CI)
- React Router v7 (BrowserRouter + SPA fallback via Netlify `_redirects`)
- D3 + Recharts (in `charts` chunk via `manualChunks`); `lucide-react` in `icons` chunk
- Lighthouse CI audits a local production preview (five routes); category thresholds are warn-only while hard accessibility/SEO/CLS assertions block the workflow

## Dev Commands

```bash
npm install                    # first time
npm run dev                    # Vite dev server on :3000
npx tsc --noEmit               # type check (CI step)
node scripts/i18n-parity.mjs   # check en/hi/kn parity (CI step)
npm run build                  # full build: vite build + per-route prerender
npm run build:client           # vite build only (skip prerender — fast smoke test)
npm run prerender              # run prerender on existing dist/ (after build:client)
npm run preview                # serve dist/ on :4173 to spot-check
```

`npm run build` runs **vite build then `node scripts/prerender.mjs`** — Puppeteer (full Chrome from `~/.cache/puppeteer/chrome/`) loads each route from `public/sitemap.xml`, waits for the `<SEO>` effect to flush per-page `<title>` / `<meta description>` / `<link rel="canonical">`, and writes `dist/<route>/index.html` for each. The site continues to behave as a SPA after first paint (BrowserRouter takes over). On CI Puppeteer downloads ~250 MB of Chrome on first run; cached on subsequent runs.

## Architecture

```
index.tsx → App.tsx (BrowserRouter, Talkr provider, Routes for 12 pages)
  ↓
components/{Hero, Features, AnalyticsDemo (lazy), KnowledgeGraph, Navbar, Footer, SEO}
pages/{Home, GradeOwl, Technology, Schools, CoachingInstitutes, Pricing, Waitlist,
       About, Vision, Faq, Privacy, Terms, NotFound, Login}
i18n/{en,hi,kn}.json (340 keys flat with dotted paths)
```

`AnalyticsDemo` is `React.lazy()` so recharts (378KB) doesn't block first paint.

### Curriculum Graph Asset

`components/KnowledgeGraph.tsx` powers the interactive graph on `/technology` and
fetches `public/concept-graph.json` at runtime. The asset is generated locally from
the read-only sibling `../kg-pipeline/output/` with:

    npm run export:concept-graph
    npm run test:concept-graph-export

Run the export whenever the source curriculum output changes. It de-duplicates concepts
and edges, removes dangling links, precomputes node positions, and deliberately excludes
embeddings and other raw pipeline fields; do not replace it with a raw pipeline export or
import it into the JavaScript bundle.

## Conventions

- **Color palette** in `tailwind.config.js`. **Brand blue is `#0071E3`** (Apple macOS link blue, 4.74:1 vs white). Do NOT regress to `#007AFF` (4.06, fails WCAG AA).
- **Body text uses `text-gray-500`** (#6E6E73, 5.32:1) — never `text-gray-400` (#86868B, 3.62:1, fails AA). `text-gray-300` only acceptable on dark `.glass-panel` backgrounds.
- **All `<img>` need explicit `width`/`height`** (CLS protection). Hero images max 1200px wide, resized via ImageMagick before commit.
- **Heading order h1 → h2 → h3**, no skipping levels. Lighthouse `heading-order` lint catches violations.
- **SEO component** (`components/SEO.tsx`) — pass `url` prop on every page so canonicals are correct. Page meta is injected via React effects after JS executes (SPA limitation).

## Quality Gates (CI)

Every PR runs:
- `quality-checks.yml` — tsc + i18n parity + build + bundle summary
- `lighthouse-ci.yml` — builds and serves a local production preview, audits 5 routes (`/`, `/gradeowl`, `/technology`, `/pricing`, `/waitlist`), comments scores
- `claude-code-review.yml` — Claude Code PR review

Hard fails (block PR): color-contrast, image-alt, html-has-lang, meta-description, document-title, CLS > 0.1.
Warn-only: category scores, heading-order, LCP, render-blocking, resource budgets.

Thresholds + assertions: see `lighthouserc.json`. Tightening criteria documented in `CHECKS.md`.

## Deployment

- Netlify auto-deploys `main` to `neuraconcept.com` (Cloudflare Workers proxy)
- Every PR gets a deploy preview at `deploy-preview-N--neuraconcept.netlify.app`
- `public/_redirects` handles SPA fallback
- `public/manifest.webmanifest` makes the site installable as a PWA
- `public/robots.txt` is the source of truth — Cloudflare's "Managed robots.txt" toggle MUST stay off (otherwise it injects a non-standard `Content-Signal:` directive that Lighthouse flags)

## Known Tradeoffs / Tech Debt

See `FOLLOWUPS.md` for the full list. Summary:
- `/faq` and `/coaching-institutes` are English-only (not yet i18n-extracted)
- `/gradeowl` and `/technology` cap at perf ~73–85 mobile because they ship the full bundle to render — needs route-based code splitting
- Privacy/Terms English-only (DPDPA Section 5 may require translations — legal review)

## Key Patterns

- **Bundle dependencies locally** — `vite.config.ts` has explicit `manualChunks` for `react-vendor`, `charts`, and `icons`; there is no production `external` dependency list or CDN import map.
- **Tailwind `purge` requires explicit `content`** — `tailwind.config.js` lists `App.tsx`, `index.tsx`, `components/**`, `pages/**`. New top-level dirs need entries.
- **Brand color in 4 places**: `tailwind.config.js` (apple.blue), `index.css` (`.btn-primary` background), `index.html` (theme-color meta), `public/manifest.webmanifest` (theme_color). Update all four together.
- **LCP image preload** in `index.html` — `<link rel="preload" as="image" href="/assets/hero-teacher.webp" fetchpriority="high">`. Update if hero swaps.
- **Prerender route source = `public/sitemap.xml`** — adding a new route means: (a) add it to `App.tsx` `<Routes>`, (b) add it to `public/sitemap.xml`, (c) ensure the page passes `url=` to `<SEO>`. The prerender script picks it up automatically.
- **Prerender requires the full Chrome binary**, not `chrome-headless-shell`. Puppeteer 24 + chrome-headless-shell hit `Network.enable timed out` on every page; full Chrome works in classic headless mode. The script auto-locates the cached binary in `~/.cache/puppeteer/chrome/`.

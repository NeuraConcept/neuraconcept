# CLAUDE.md

Marketing site for NeuraConcept (`neuraconcept.com`). React 19 + Vite 6 SPA, hosted on Netlify. **This is a marketing site — perf and SEO matter more than feature breadth.**

*Last updated: 2026-04-28*

## Stack

- React 19, Vite 6, TypeScript ~5.8 — bundled locally (do NOT bring back the `external` array in `vite.config.ts`; that was the 49/100 perf disaster from PR #7)
- Tailwind CSS 3.4 (PostCSS build, NOT the CDN script — see `tailwind.config.js` + `index.css` for theme + components)
- Talkr i18n: `en` / `hi` / `kn` (300 keys each, parity enforced in CI)
- React Router v7 (BrowserRouter + SPA fallback via Netlify `_redirects`)
- D3 + Recharts (in `charts` chunk via `manualChunks`); `lucide-react` in `icons` chunk
- Lighthouse-CI baseline: Perf 80–90, A11y 99, BP 100, SEO 100, PWA installable

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
i18n/{en,hi,kn}.json (300 keys flat with dotted paths)
```

`AnalyticsDemo` is `React.lazy()` so recharts (378KB) doesn't block first paint.

## Conventions

- **Color palette** in `tailwind.config.js`. **Brand blue is `#0071E3`** (Apple macOS link blue, 4.74:1 vs white). Do NOT regress to `#007AFF` (4.06, fails WCAG AA).
- **Body text uses `text-gray-500`** (#6E6E73, 5.32:1) — never `text-gray-400` (#86868B, 3.62:1, fails AA). `text-gray-300` only acceptable on dark `.glass-panel` backgrounds.
- **All `<img>` need explicit `width`/`height`** (CLS protection). Hero images max 1200px wide, resized via ImageMagick before commit.
- **Heading order h1 → h2 → h3**, no skipping levels. Lighthouse `heading-order` lint catches violations.
- **SEO component** (`components/SEO.tsx`) — pass `url` prop on every page so canonicals are correct. Page meta is injected via React effects after JS executes (SPA limitation).

## Quality Gates (CI)

Every PR runs:
- `quality-checks.yml` — tsc + i18n parity + build + bundle summary
- `lighthouse-ci.yml` — waits for Netlify preview, audits 5 routes (`/`, `/gradeowl`, `/technology`, `/pricing`, `/waitlist`), comments scores
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
- `pages/Privacy.tsx` and `pages/Terms.tsx` pass `T("nav.privacy")` / `T("nav.terms")` to `<SEO title={...}>` but those keys live under `footer.*`, not `nav.*` — the prerendered HTML has empty `<title>` text. Fix: switch to `footer.privacy` / `footer.terms`.
- `/faq` and `/coaching-institutes` are English-only (not yet i18n-extracted)
- Hindi/Kannada SEO descriptions drifted vs English after PR #6 (parity is keys-only, not values)
- `/gradeowl` and `/technology` cap at perf ~73–85 mobile because they ship the full bundle to render — needs route-based code splitting
- Privacy/Terms English-only (DPDPA Section 5 may require translations — legal review)

## Key Patterns

- **Bundle deps locally, never externalize** — `vite.config.ts` has explicit `manualChunks` for `react-vendor`, `charts`, `icons`. Do not add `external: [...]`.
- **Tailwind `purge` requires explicit `content`** — `tailwind.config.js` lists `App.tsx`, `index.tsx`, `components/**`, `pages/**`. New top-level dirs need entries.
- **Brand color in 4 places**: `tailwind.config.js` (apple.blue), `index.css` (`.btn-primary` background), `index.html` (theme-color meta), `public/manifest.webmanifest` (theme_color). Update all four together.
- **LCP image preload** in `index.html` — `<link rel="preload" as="image" href="/assets/hero-teacher.webp" fetchpriority="high">`. Update if hero swaps.
- **Prerender route source = `public/sitemap.xml`** — adding a new route means: (a) add it to `App.tsx` `<Routes>`, (b) add it to `public/sitemap.xml`, (c) ensure the page passes `url=` to `<SEO>`. The prerender script picks it up automatically.
- **Prerender requires the full Chrome binary**, not `chrome-headless-shell`. Puppeteer 24 + chrome-headless-shell hit `Network.enable timed out` on every page; full Chrome works in classic headless mode. The script auto-locates the cached binary in `~/.cache/puppeteer/chrome/`.

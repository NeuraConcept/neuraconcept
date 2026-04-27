# Quality Checks

What runs automatically vs. what needs human review when shipping marketing-site changes.

## Automated (every PR)

| Check | Workflow | Catches |
|---|---|---|
| TypeScript | `quality-checks.yml` | Type errors before they reach review |
| i18n parity | `quality-checks.yml` -> `scripts/i18n-parity.mjs` | Missing/extra keys across `en` / `hi` / `kn` |
| Bundle size diff | `quality-checks.yml` | JS/CSS regressions vs. base branch |
| Lighthouse CI | `lighthouse-ci.yml` | Perf, a11y, best-practices, SEO, PWA — runs against the Netlify deploy preview, asserts thresholds |
| Claude review | `claude-code-review.yml` | Logic bugs, accessibility regressions, undefined classes |
| Dependabot | GitHub-native | Security alerts on dev/prod deps |

### Lighthouse thresholds

`lighthouserc.json` enforces (per route, on the deployed preview):

- Performance >= 0.85
- Accessibility >= 0.95
- Best Practices >= 0.95
- SEO >= 0.95
- PWA >= 0.60 (warning)

Plus specific assertions: color-contrast, heading-order, image-alt, LCP <= 3s, CLS <= 0.1, total request count <= 30, JS budget 600 KB, CSS 50 KB, image budget 250 KB.

Routes audited: `/`, `/gradeowl`, `/technology`, `/pricing`, `/waitlist`. Add new conversion-critical routes to `lighthouse-ci.yml` as the site grows.

## Manual (before any major overhaul)

Things automation either can't catch reliably, or that drift slowly. Run through these when planning a content/design refresh:

### Content audit
- [ ] **Vision balance**: read `research/2026-03-14-neuraconcept-website-product-visibility-analysis.md` (the original product-visibility analysis). The site should not skew >70% toward any single product. Re-score after the overhaul.
- [ ] **i18n value drift**: parity check only verifies key presence. Translated *content* drifts when English copy is updated alone. Spot-check 5-10 high-traffic keys per locale.
- [ ] **Pricing tier numbers** and **stats** (e.g., "X teachers waitlisted"): grep for hardcoded numbers in JSX, confirm they are still accurate.
- [ ] **Effective dates** in `pages/Privacy.tsx` and `pages/Terms.tsx`: still hardcoded; bump if the policy text changed.

### Visual regression
- [ ] Brand color contrast: any new `bg-*` + `text-white` combinations? Run through https://webaim.org/resources/contrastchecker — minimum 4.5:1 for normal text. The site uses `apple-blue: #0071E3` (4.74:1) — don't drop back to #007AFF (4.06, fails).
- [ ] Dark-bg components (KnowledgeGraph, anything inside `.glass-panel`): Lighthouse audits one DOM state. If you add a dark-mode component, manually verify its contrast — find-and-replace sweeps will get it wrong.
- [ ] Run `npm run dev` and walk through `/`, `/gradeowl`, `/technology`, `/schools`, `/coaching-institutes`, `/pricing`, `/waitlist`, `/about`, `/vision`, `/faq`, `/privacy`, `/terms` on mobile (375px) and desktop (1440px).

### Compliance
- [ ] **DPDPA Section 5**: Privacy/Terms must be available in user's preferred 22nd-Schedule language. Currently English-only — flag with legal before any India launch.
- [ ] **Gemini training claim** in Privacy: only true on the paid Gemini API tier. Reverify which tier `ai-service` is using.
- [ ] **Email accounts** referenced (`privacy@`, `support@`): provisioned and monitored?

### Perf
- [ ] LCP image still under 50 KB and dimensioned for 1200x slot at 2x DPI. Add new hero images to the resize step (1200px max width).
- [ ] No new render-blocking external scripts/styles (Lighthouse warns at 2 — exceeded means rethink).
- [ ] No new dependencies pulled from `esm.sh` or other CDNs in markup; bundle locally.
- [ ] `vite.config.ts` does NOT bring back the `external` array — that was the root cause of the 49/100 score we fixed in PR #7.

## Lessons from PRs #5/#6/#7

The audits above came directly from what we caught (or missed) on the marketing-site overhaul:

| Issue | Caught by | Now caught earlier by |
|---|---|---|
| Vite externals + esm.sh importmap (216 requests) | Manual Lighthouse | `lighthouserc.json` request-count budget |
| Tailwind from CDN | Manual Lighthouse | Lighthouse "render-blocking" + manual checklist |
| `text-gray-400` body (3.62:1) | Lighthouse contrast audit | Lighthouse `color-contrast` assertion |
| Heading order h1 -> h4 | Lighthouse | Lighthouse `heading-order` assertion |
| `apple-blue` button (4.06:1) | Lighthouse | Lighthouse `color-contrast` assertion |
| `glass-panel` class undefined | Claude review | Manual checklist (no good auto-detector for unused/undefined Tailwind classes) |
| Dark-bg `text-gray-300 -> 500` regression from blind sed | Claude review | Manual checklist (Lighthouse only audits one DOM state) |
| Maskable PWA icon | Lighthouse | Lighthouse `pwa` category assertion |
| Hindi/Kannada SEO content drift | Manual diff | i18n parity check (keys only — values still need eyes) |
| Rollup/Vite/picomatch security alerts | Dependabot | Dependabot (already automated) |

## Running checks locally

```bash
# i18n parity
node scripts/i18n-parity.mjs

# Bundle size + perf preview
npm run build
ls -la dist/assets/   # JS+CSS sizes
npm run preview       # then run Lighthouse via Chrome DevTools

# Lighthouse CI locally (mirrors what runs on PRs)
npx -y @lhci/cli@0.13.x autorun \
  --collect.staticDistDir=dist \
  --collect.url=/ \
  --collect.url=/gradeowl \
  --collect.url=/pricing
```

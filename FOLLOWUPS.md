# Follow-ups

Open work surfaced during the 2026-04-26 marketing-site overhaul (commits `0114c78` + `4746e90`). Items grouped by category, not strict priority — pick what matters when.

## Backend / infra

- **CORS for production waitlist** — `projects/gradeowl/backend/main.py:53` defaults `ALLOWED_ORIGINS` to localhost-only. Production needs `https://neuraconcept.com,https://www.neuraconcept.com` so the new `/waitlist` POST works in browsers. Deferred per `for now, just merge to main in whatever order ... will anyways migrate it to aws later`. Re-evaluate during AWS migration.
- **Production build verification** — `vite.config.ts` `build.rollupOptions.external` lists `react`, `react-dom`, `lucide-react`, `d3`, `recharts`, `talkr` as externals. This means `npm run build` produces a bundle assuming these come from a CDN/import-map. Verify the Netlify deployment actually has the import map / CDN setup, otherwise prod is broken.

## Content / copy follow-ups

- **`/faq` and `/coaching-institutes` are English-only.** Both pages hardcode their copy in JSX rather than going through Talkr `T()`. To translate: extract strings into `faq.*` and `coachingInstitutes.*` namespaces in `i18n/en.json`, then add Hindi + Kannada translations.
- **Hindi / Kannada content drift across multiple keys.** Key parity holds (291 each in en/hi/kn), but the VALUES of these keys in `hi.json` and `kn.json` still describe the pre-rewrite messaging while `en.json` has been updated:
  - `tech.cognitive_*`, `tech.vector_*`, `tech.irt_*`, `tech.privacy_*` (en is now Curriculum Mapping / Multi-Language OCR / Answer Clustering / Prerequisite Discovery; hi/kn still describe Cognitive Modeling / IRT etc.)
  - `home.quote`, `home.quote_attr`, `home.cta_subheading`, `home.seo_desc`
  - `schools.time_title`, `schools.time_desc`, `schools.love_heading`
  - `waitlist.teachers_count` (en moved from "127+ teachers" to "Join teachers across India"; hi/kn still claim 127+)
  - SEO descriptions across `home.seo_desc`, `gradeowl.seo_desc`, `schools.seo_desc`, `tech.seo_desc`, `pricing.seo_desc`, `waitlist.seo_desc`, `seo.app_desc` — now ATP-keyword-flavored in English, untouched in hi/kn.
- **Pricing page has no actual numbers** — all three tiers say "Contact us". Add even rough INR ranges (e.g., "₹50–200/student/year") so visitors can self-qualify. Investors definitely will ask.

## Legal / compliance (founder + legal review needed)

- **Privacy DPDPA consent delegation** (`pages/Privacy.tsx:147-152`) — "schools obtain parental consent" wording delegates the legal duty in a way DPDPA doesn't allow. Tighten data-processing-agreement language with each school OR rephrase. Not a code fix; needs counsel.
- **Gemini training-opt-out claim** (`pages/Privacy.tsx:228`) — "We do not opt in to programs that allow Google to use this data for training AI models" is only true on the **paid** Gemini API tier. Free tier (which `MEMORY.md` says the KG pipeline currently uses) does allow Google to use prompts for training. Verify which tier `ai-service` actually calls and adjust the policy if needed.
- **Privacy / Terms English-only legal text** (~700 lines) — DPDPA Section 5 lets Indian Data Principals demand notice in any 22nd-Schedule language. Hindi and Kannada are both audience languages. Either translate (with lawyer review per language) or add a clear banner offering translations on request.
- **Email accounts** referenced in Privacy/Terms but not yet provisioned (as far as I can tell): `privacy@neuraconcept.com`, `support@neuraconcept.com`. Privacy commits to a 7-day grievance SLA against `privacy@`. Verify these inboxes exist and are monitored before public launch.
- **Privacy "Effective Date: April 2026"** (`pages/Privacy.tsx:20`) is hardcoded. Will go stale. Consider a constant or build-time-injected date.

## UX / nice-to-have

- ~~**Top navbar reorganization**~~ DONE — switched to always-burger drawer with grouped sections (Product / Company / Legal). All 11 pages now reachable from the nav drawer; Waitlist CTA + language switcher remain always-visible in the top bar. Trade-off: one extra click vs. inline links, in exchange for chrome that scales as more pages get added.
- **Privacy / Terms section IDs are numeric (`section-1` … `section-N`)** — fragile if you reorder sections. Refactor to slug-based IDs (`#data-collection`, `#user-rights`) when there's time.
- **404 page localization** — `pages/NotFound.tsx` does use Talkr keys (good), but the page is bare. Could add suggested links ("Back to Home, Pricing, FAQ") for better UX.
- **OG image** uses `/assets/digital-brain.webp` (existing). Worth a custom 1200×630 social-share image with the GradeOwl wordmark for better link previews on LinkedIn/Twitter/WhatsApp.

## Process / git

- **Branch `chore/claude-workflows` carries 4 commits of unrelated scope** (CI workflows + 3 marketing-site overhaul commits). Future overhauls should rename the branch first or split. Not blocking.
- **Submodule pointer in parent `edtech-research`** is bumped on `chore/seo-research-and-neuraconcept-bump`. Same branch also adds `research/seo/`. Single commit `ce7b927`.

## What was deliberately NOT done

- **Smoke testing of `npm run build`** — only `tsc --noEmit` was run (clean). Visual smoke in dev (`npm run dev` on localhost:3001) was confirmed working. Production build has not been validated against the externalized-deps Vite config.
- **Hindi/Kannada translations of new SEO content** — deferred (English-only on the new pages and the updated SEO descriptions).
- **Pricing tier numbers** — deferred (founder business call).
- **Top navbar reorganization** — deferred (UX layout judgment call).

## Where this is from

Source: AnswerThePublic keyword research at `research/seo/` in the parent `edtech-research` repo. README there explains the 10 keyword clusters and which were used in this overhaul.

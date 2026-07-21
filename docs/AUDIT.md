# Sunad OTT — Engineering Audit
*Audited: 2026-07-21 · Repo: `HardikBhaskar2010/OTT` @ `main` (HEAD `b127aa3`)*

This audit is based on a full clone, dependency install, `tsc --noEmit`, `eslint`, and `next build` run against the actual codebase — not the docs. Where the docs (`docs/app_status.md`, `docs/10_Technical_Notes.md`) already say something accurate, this file cross-references it instead of repeating it, and adds what those docs don't cover: concrete bugs, file/line references, and a build-verified status.

---

## 1. Project Overview

Two things live in this repo, and they are at very different maturity levels:

1. **`docs/`** — 12 planning documents (PRD, design system, IA, technical notes, etc.) for **Sunad OTT**, a bilingual (Hindi/English) Indian civilizational-content streaming platform for Sunad Broadcast Pvt. Ltd. This layer is genuinely complete and well cross-referenced.
2. **`sunad-ott/`** — a Next.js 16 / React 19 frontend implementing a subset of that spec. **There is no backend in this repository at all.** Everything — content catalog, auth, cart, search — runs against a single static file, `lib/mockData.ts`.

If you're picking this up to "move forward," the honest framing is: **you have a documented product and a UI shell. You do not have an application yet.** No API, no database, no auth, no payments, no video delivery exist anywhere in this codebase.

---

## 2. Current Architecture Snapshot

```
OTT/
├── docs/                    12 planning docs — complete, not code
└── sunad-ott/                Next.js 16.2.10 (Turbopack) App Router, TS, React 19.2.4
    ├── app/(main)/...        13 routes, all client-rendered against mock data
    ├── components/           15 shared components (nav, footer, hero, cards, providers)
    ├── lib/mockData.ts        1,621 lines — the ENTIRE data layer (programs, products,
    │                          plans, content items, genres, languages)
    ├── lib/analytics.ts       GA4 event wrapper
    ├── messages/*.json        22 language files (used by a hand-rolled i18n system —
    │                          NOT by the next-intl package that's also installed)
    ├── i18n/                  next-intl config — wired into next.config.ts but
    │                          UNUSED anywhere in app code (see §5.1)
    └── styles/                globals.css (4,595 lines) + tokens.css (263 lines)
```

**There is no `app/api/*`, no server actions, no database client, no ORM, no auth library, no payment SDK, no `.env.example`, and no fetch/axios call anywhere in the codebase.** I grepped for all of these; zero hits outside `node_modules`.

---

## 3. Frontend Status

### What's actually there and working
- 13 routes render: `/`, `/browse/[id]`, `/live`, `/search`, `/watch/[id]`, `/originals`, `/store`, `/plans`, `/signin`, `/my-list`, `/privacy`, `/terms`, `/cookies`, `/dpdp`, `/info/[id]`.
- `tsc --noEmit` passes clean — no type errors.
- Design system tokens (`styles/tokens.css`) and a large hand-written component CSS library (`styles/globals.css`) are in place and consistently referenced via CSS custom properties.
- 22-language string files exist and are structurally identical (133 lines each) — good, no missing-key drift between locales at the file level.
- Bilingual `t(enString, hiString)` pattern (`components/LangContext.tsx`) is used consistently across most pages.

### What's cosmetic/simulated, not functional
- **Sign-in (`app/(main)/signin/page.tsx`)**: full OTP UI (request → verify → onboarding), but `handleRequestOtp`/`handleVerifyOtp` do zero network calls. Any 6-digit input passes verification (line 113-121: only checks `joinedOtp.length < 6`, no actual OTP is sent or checked). Success path is `alert(...)` + `router.push('/')` (line 148-149). No session, no cookie, no persisted identity.
- **Store cart (`app/(main)/store/page.tsx`)**: `cart` is `useState` only — refresh and it's gone. No checkout call anywhere.
- **Plans (`app/(main)/plans/page.tsx`)**: plan selection is local UI state (`selectedPlan`); there's no submit/checkout action at all, just a "Plan Selected" button that changes color.
- **Video player (`app/(main)/watch/[id]/page.tsx`)**: no `<video>` element, no HLS.js/Shaka/Video.js. It's a gradient div with a play/pause icon toggle and a hardcoded `progress` state initialized to `35` (line 61). Chapters and transcript content are inline hardcoded arrays (lines 78-89), not tied to `program.id` at all — every title shows the identical fake chapter/transcript list.
- **Watch history / My List**: `app/(main)/my-list/page.tsx` hardcodes `[MOVIES[0], SHOWS[0], DOCUMENTARIES[0], MOVIES[1]]` (lines 15-18) as "your list" — it is not a real list, it's the same 4 items for every user, every time.

### Confirmed bugs (not style nits — actual broken behavior)

1. **`/info/[id]` is a dead page.** I grepped the entire `app/` and `components/` tree for `/info` — nothing links to it. `ContentCard.tsx` (the component used everywhere for movies/shows/docs) uses `item.watchHref`, and every `ContentItem` in `lib/mockData.ts` sets `watchHref: '/watch/{program-id}'`. Nothing ever navigates using a `ContentItem.id` (e.g. `'mystic-bharat-m'`), which is the only key `/info/[id]/page.tsx` looks up against (`MOVIES.find(m => m.id === id)`). Net effect: this page can only be reached by hand-typing a URL, and only works if you happen to type the internal `-m`/`-s` suffixed id, which is never exposed in any UI. **This is either finished work that was never wired up, or a page that should be deleted.**
2. **`/info/[id]/page.tsx` breaks the bilingual pattern.** Every other page uses `useLang()`'s `t()`. This page hardcodes English-only strings — "Back", "Watch Now", "Add to Watchlist", "Share", "Culture Commerce", "More Like This" fallback labels, etc. (lines 69, 127-134, 146, 183). If this page is ever wired up as-is, it will silently break the "Hindi is designed, not translated" brand mandate from `docs/03_Design.md`.
3. **`app/(main)/watch/[id]/page.tsx` only resolves `PROGRAMS` ids, never `MOVIES`/`SHOWS`/`DOCUMENTARIES` ids** (line 48: `PROGRAMS.find((p) => p.id === id)`). This currently works only because every `ContentItem.watchHref` in mock data was manually pre-aliased to a matching `PROGRAMS.id` (e.g. `mystic-bharat-m` → `/watch/mystic-bharat`, which is a real `PROGRAMS` entry). This is a hidden coupling: **the moment someone adds a new movie/show that isn't also a scheduled FPC program, its `watchHref` will 404**, because there's no fallback lookup against `MOVIES`/`SHOWS`/`DOCUMENTARIES`/`MUSIC_CONTENT` in the watch page. This will bite the next content author immediately.
4. **`app/(main)/search/page.tsx:44`** — ESLint's `react-hooks/set-state-in-effect` flags a real anti-pattern: `handleSearch(urlQuery)` is called directly inside a `useEffect` body, which calls `setResults`/`setQuery` synchronously during the effect. Same pattern repeats in `components/OnboardingWizard.tsx:61` and `components/TopNav.tsx:100,121`. Not currently crashing, but it's the "cascading render" pattern React's own linter is explicitly warning against — fix before it compounds with more state.
5. **`app/(main)/my-list/page.tsx:59`** — unescaped `"` characters in JSX text (`react/no-unescaped-entities`), will render literal `"` in some environments instead of proper quotes.
6. **`components/CulturePanel.tsx:18`** — `let mm` should be `const` (`prefer-const`); trivial but indicates the lint config isn't part of anyone's pre-commit workflow.

### Full lint output (17 errors, 40 warnings)
Ran `npx eslint .` — full breakdown:
- **`no-explicit-any` (7 occurrences)**: `components/LangContext.tsx:33,66,131`, `components/LenisProvider.tsx:35`, `components/OnboardingWizard.tsx:83,85,141,143,274`. These aren't just style — `LangContext.tsx`'s `MESSAGES: Record<Lang, any>` (line 33) means the 22 translation dictionaries have **zero compile-time shape checking**. A typo'd or missing key in `ta.json` vs `en.json` will not be caught by TypeScript; it'll silently fall through to `t()`'s runtime fallback logic (`LangContext.tsx` lines 124-162) and just display the raw English string or key name in production.
- **Unused imports/vars (~20 occurrences)** across `app/page.tsx`, `app/(main)/watch/[id]/page.tsx`, `app/(main)/store/page.tsx`, `app/(main)/plans/page.tsx`, `components/TopNav.tsx`, `components/ThemeContext.tsx` — dead code from iterative editing, harmless but worth a `--fix` pass.
- **`@next/next/no-img-element` (4 occurrences)**: `app/(main)/signin/page.tsx:174`, `app/loading.tsx:41`, `components/LandingModal.tsx:125`, `components/TopNav.tsx:250` — raw `<img>` instead of `next/image`, meaning no automatic responsive sizing/compression. Directly contradicts `docs/10_Technical_Notes.md §10`'s own stated requirement for a "responsive image pipeline."
- **`jsx-a11y/role-supports-aria-props` (2)** in `OnboardingWizard.tsx:241,406` — `aria-pressed` on a `role="listitem"` is invalid ARIA and will confuse screen readers.

### Build status — currently fails in a clean sandbox
`npx next build` fails with 4 errors, all `next/font/google` fetch failures (Fraunces, Mukta, Noto Sans/Serif Devanagari — all return HTTP 403 from `fonts.googleapis.com` when built from this network). This is very likely a **sandbox network-restriction artifact, not a code bug** — but it's worth flagging because Turbopack (Next 16's default bundler) treats a Google Fonts fetch failure as a **hard build error**, not a warning. If your CI/CD runner or Vercel build environment has any transient network restriction to `fonts.googleapis.com`, production builds will fail outright. Recommend confirming this doesn't reproduce on your actual deploy target (Vercel's own infra almost certainly allowlists Google Fonts, so this is likely a non-issue there — but verify, don't assume).

---

## 4. Backend Status

**There is no backend.** Full stop. This section exists mainly to establish the honest starting line, since `docs/10_Technical_Notes.md` describes an intended architecture in prose but zero of it is implemented.

### What exists
- Nothing server-side beyond Next.js's own App Router SSR (a few pages, like `browse/[id]` and `info/[id]`, are `async` Server Components that read from the in-memory `mockData.ts` array — this is not a backend, it's synchronous in-process data).
- `lib/analytics.ts` — a thin GA4 wrapper (client-side `gtag` calls). Not a backend either.

### What's missing (everything)
| Layer | Status | Notes |
|---|---|---|
| Auth / identity | **0%** | No session, no JWT, no OTP provider, no user table. Sign-in page is pure UI theater. |
| Content catalog API | **0%** | `lib/mockData.ts` is a static TS file, not a queryable data source. |
| Video delivery (HLS/DASH + DRM) | **0%** | No player library installed (`package.json` has no video.js/hls.js/shaka-player/dashjs dependency at all). |
| Search index | **0%** | `Array.filter()` over 8 hardcoded programs (`search/page.tsx` lines 26-36) — fine as a placeholder, not remotely what `docs/07_Information_Architecture.md §7`'s transliteration-tolerant multi-language index describes. |
| Payments / entitlements | **0%** | No Razorpay/Stripe/PayU SDK in `package.json`. Plans page has no submit action. |
| CMS | **0%** | Not connected; content is edited by hand in a `.ts` file. |
| Database | **0%** | No Prisma/Drizzle/Mongoose/pg client in dependencies. |

### How to start building the backend cleanly

Given the current state, the pragmatic — not theoretical — path is:

1. **Do not try to retrofit a backend into `sunad-ott/`'s existing structure by bolting `app/api/*` routes onto it piecemeal.** The frontend's data shapes (`Program`, `ContentItem`, `Product`, `Plan` interfaces in `lib/mockData.ts`) were designed as UI-convenience shapes (they mix English/Hindi fields inline, bake in presentation data like `thumbnailGradient` and `posterColor`). Treat these as **view models**, not your database schema. Design your actual data model (users, titles, episodes, entitlements, orders) independently, then write a thin mapping layer that shapes API responses into something close to these existing interfaces — this lets you keep the current UI working while you build the real thing underneath, instead of a big-bang rewrite.
2. **Start with identity + entitlements, not video delivery.** Everything else (My List, Continue Watching, Store cart, Plans) is meaningless without a real user. Stand up: a users table, OTP delivery via any SMS/WhatsApp API provider (MSG91, Twilio Verify, etc.), and session issuance (NextAuth/Auth.js v5 is the path of least resistance in a Next.js 16 App Router project, or a custom JWT-in-httpOnly-cookie flow if you want full control). Wire `app/(main)/signin/page.tsx`'s two handlers to real endpoints — the UI state machine (`request` → `verify` → `onboarding`) is actually well-structured and barely needs to change, only the two handlers need real calls.
3. **Stand up the catalog as a real API next**, even before touching video streaming. Move `PROGRAMS`/`MOVIES`/`SHOWS`/`DOCUMENTARIES`/`MUSIC_CONTENT`/`PRODUCTS`/`PLANS` out of `lib/mockData.ts` and into whatever DB you choose (Postgres via Prisma/Drizzle is the boring, correct choice for this shape of relational catalog data). Build `GET /api/catalog/programs`, `/api/catalog/movies`, etc., or a single GraphQL/tRPC endpoint if you want typed end-to-end contracts. This unblocks: real search (swap the `Array.filter` for a proper query, or bolt on Meilisearch/Typesense once the catalog is DB-backed), and a real "My List"/"Continue Watching" (both need a user_id + content_id join table, which needs identity from step 2 first).
4. **Video delivery is the highest-cost, lowest-urgency item for a "move forward" plan.** It requires an actual encoding pipeline, CDN, and DRM vendor relationship — this is infrastructure procurement as much as code. Don't block earlier milestones on it. Get the rest of the product working end-to-end against short unprotected MP4s or even YouTube-unlisted embeds as a placeholder, and swap in HLS.js/Shaka + a real CDN once a vendor is chosen.
5. **Payments last, and only once plans/entitlements are real.** Razorpay is the standard choice for an India-first product (UPI support out of the box) — integrate it against real plan records, not the current hardcoded `PLANS` array.

---

## 5. Tech Stack Assessment

| Piece | Verdict |
|---|---|
| Next.js 16.2.10 + Turbopack | **Very recent** — `sunad-ott/AGENTS.md` itself warns "This is NOT the Next.js you know... breaking changes." This is a real risk: less Stack Overflow/community coverage, more chance of hitting undocumented behavior (the Google Fonts build failure above is a taste of that). Confirm this version was chosen deliberately and not just "whatever `create-next-app` gave me on the day," since App Router conventions have shifted meaningfully across Next 13→16. |
| React 19.2.4 | Current, fine, matches Next 16's peer requirement. |
| TypeScript | Configured and passing (`tsc --noEmit` clean), but weakened by 7 `any` usages in exactly the places that matter most (i18n dictionary typing, see §3). |
| Styling: hand-rolled CSS custom properties (no Tailwind, no CSS-in-JS) | Legitimate, deliberate choice per `docs/09_Design_System.md`, and it's executed consistently. Tradeoff: 4,595-line `globals.css` is going to be a growing maintenance burden without component-scoped styles; consider CSS Modules per-component before this file doubles again. |
| next-intl (`^4.13.2`) | **Installed and wired into `next.config.ts` (`withNextIntl` plugin) and `i18n/request.ts` — but never imported by a single component.** This is dead machinery: it adds a build-time plugin wrapping the entire Next config for zero runtime benefit, since `components/LangContext.tsx` independently reimplements i18n by directly importing all 22 `messages/*.json` files and hand-rolling a `t()` function. Worse, `i18n/request.ts` hardcodes `const locale = 'hi'` with a comment admitting it can't read the client's actual language preference server-side. **Decision needed: either commit to next-intl properly (requires `NextIntlClientProvider`, `useTranslations`, and — since Server Components can't read `localStorage` — a cookie-based locale strategy) and delete `LangContext.tsx`, or rip out next-intl entirely and keep the hand-rolled system.** Right now you're paying the complexity cost of both and the benefit of neither. |
| GSAP + `@gsap/react`, Lenis (smooth scroll), `ogl` (WebGL) | Present and apparently used (`GSAPProvider.tsx`, `LenisProvider.tsx`, `CulturePanel.tsx` scroll animations) — reasonable choices for the "cinematic" design goal, no issues found in the code reviewed. |
| Vercel Analytics + Speed Insights + custom GA4 | Three analytics systems running simultaneously (`Analytics`, `SpeedInsights`, `GoogleAnalytics` all mounted in `app/layout.tsx`). Not broken, but worth a deliberate decision on which is canonical before this becomes three inconsistent sources of truth in a dashboard somewhere. |
| No test runner at all | No Jest/Vitest/Playwright/Cypress in `package.json`. Zero test files anywhere in `sunad-ott/`. Not unusual at this stage, but worth naming as a gap explicitly. |
| No `.env.example`, no env var documentation | `next.config.ts` references `NEXT_PUBLIC_CDN_BASE_URL` with an empty-string fallback — the only env var referenced anywhere — but nothing documents that it exists or what it should be set to for local dev vs. production. |

---

## 6. Missing Pieces (Consolidated)

Beyond what's in `docs/app_status.md` §6 (which is accurate and worth keeping as-is), specifically:

- **No environment/config documentation** — a new contributor has no `.env.example` to copy.
- **No CI** — no `.github/workflows/`, so lint/typecheck/build aren't enforced on PRs. The 17 lint errors currently in `main` would have been caught pre-merge.
- **No error boundaries** — `notFound()` is used correctly in a couple of places (`watch/[id]`, `browse/[id]`, `info/[id]`), but there's no custom `error.tsx`/`not-found.tsx` at the app or route-group level, so Next's default (unstyled) error UI will show for anything the code doesn't explicitly handle.
- **No accessibility audit** — beyond the two ARIA-role lint errors already flagged, there's no evidence of a systematic a11y pass (keyboard nav through the carousel/dropdowns, focus trapping in the sign-in modal steps, etc.).
- **`/info/[id]` route** — either finish wiring it up (link it from `ContentCard`/`HeroCarousel`, fix the lookup to also match on `watchHref`-style ids, add `t()` calls) or delete it. Right now it's neither.

---

## 7. Security / Scalability Concerns

Nothing in the current codebase is a live security vulnerability, precisely because there's no backend yet to attack — but these are the concerns that will become real the moment a backend goes in:

- **The sign-in flow's current "any 6 digits passes" logic must never ship as-is.** It's fine as a UI placeholder; flag it explicitly so nobody accidentally deploys it thinking OTP verification is real.
- **`metadataBase: new URL('https://sunadbroadcast.vercel.app')`** in `app/layout.tsx:58` is a Vercel preview-style domain, not what's referenced elsewhere (`sunad.in` in `docs/`, `sunadbroadcast.com` in `next.config.ts`'s image `remotePatterns`). Pick one canonical domain before launch — inconsistent `metadataBase`/OG tags will produce wrong social preview cards.
- **No CSP or security headers configured** in `next.config.ts` — worth adding once real user data (auth tokens, payment redirects) exists.
- **Scalability**: current architecture is a single static array (`lib/mockData.ts`, 1,621 lines) shipped in every server render. This is fine at current content volume; it will not scale past a few hundred titles without becoming a real bottleneck in bundle size and server-render cost. This reinforces §3's recommendation to move catalog data to a real DB before content volume grows, not after.

---

## 8. Prioritized Roadmap

**Phase 0 — Hygiene (days, not weeks)**
1. Fix the 17 ESLint errors (start with the `set-state-in-effect` ones — they're the only ones with real runtime implications; the rest are quick).
2. Add `.github/workflows/ci.yml` running `tsc --noEmit`, `eslint .`, and `next build` on every PR.
3. Decide next-intl's fate (§5) — implement it properly or delete it. Don't leave both.
4. Add `.env.example` with `NEXT_PUBLIC_CDN_BASE_URL` documented.
5. Either wire up or delete `app/(main)/info/[id]/page.tsx`.

**Phase 1 — Identity (the actual unlock for everything else)**
6. Stand up a real user/session model + OTP provider. Wire `signin/page.tsx`'s two handlers to it.
7. Add an entitlements/plan table, even before payments — lets you gate content by plan tier in code paths, with a manual "grant" admin action standing in for real payment for now.

**Phase 2 — Real catalog**
8. Move `PROGRAMS`/`MOVIES`/`SHOWS`/`DOCUMENTARIES`/`MUSIC_CONTENT`/`PRODUCTS`/`PLANS` into a real database (Postgres + Prisma/Drizzle).
9. Build catalog read APIs; swap `lib/mockData.ts` imports for fetch calls incrementally, route by route (start with `/browse` and `/search`, since they're purely read paths).
10. Rebuild search against the DB (or Meilisearch/Typesense once catalog is DB-backed) — retire the `Array.filter` implementation.
11. Make "My List" and "Continue Watching" real (needs step 6 + 8 done first — this is a join table, not a UI change).

**Phase 3 — Commerce**
12. Wire the Store cart to persistent storage (server-side cart tied to user, or at minimum `localStorage` as an honest interim step — currently it's neither, it's just React state that vanishes on refresh).
13. Integrate Razorpay against real `Plan` records for subscriptions, and against `Product` records for the store.

**Phase 4 — Video**
14. Choose a CDN + encoding pipeline + DRM vendor.
15. Replace the fake player in `watch/[id]/page.tsx` with HLS.js/Shaka against real manifests. Fix the id-resolution gap (§3, bug #3) as part of this — the player needs to resolve `MOVIES`/`SHOWS`/`DOCUMENTARIES` ids too, not just `PROGRAMS`.

---

## 9. Final Verdict — What to Fix First

If you do exactly one thing before writing more feature code: **fix the ESLint errors and turn on CI.** Right now `main` has 17 real lint errors including a React anti-pattern (`set-state-in-effect`) repeated in three files — that's a sign nothing is gating merges, and every future PR will make the same mistake unchecked. That's a 30-minute fix with compounding payoff.

If you do exactly one architectural thing next: **pick next-intl or LangContext, not both** — you're currently maintaining two competing i18n systems, one of which (next-intl) is fully configured and completely inert. This is exactly the kind of thing that looks like "someone else's half-finished migration" to the next person who touches this code, and it'll cost real time to untangle later if left alone.

Everything else — real auth, real catalog, real payments, real video — is not "broken," it's simply **not built yet**, and the frontend shell you have is a genuinely reasonable UI to build the real thing underneath, provided you follow the "view model, not data model" guidance in §4 rather than trying to make `lib/mockData.ts`'s shapes do double duty as your database schema.

# Sunad OTT — Web (Desktop) Experience

**Companion document to:** `03_Design.md`, `07_Information_Architecture.md`
**Scope:** Desktop and large-viewport browser experience (≥1024px)

---

## 1. Desktop UX Philosophy

Desktop is where the **Rooted Professional** and **Heritage Scholar** personas (`02_PRD.md` §4) do their deepest engagement — longer sessions, research-adjacent browsing, larger screens for cinematic content. Desktop should feel less like a "shrunk-down app" and more like a **considered editorial website with streaming built in** — closer in spirit to a beautifully art-directed digital magazine than to a dashboard.

Guiding rule: **desktop earns extra whitespace and typographic ambition that mobile cannot afford.** Where mobile must compress, desktop should breathe — larger display type, more generous imagery, multi-column editorial layouts for collections.

## 2. Navigation Philosophy

- **Persistent top navigation bar**, transparent-over-hero on the home screen, solidifying to Deep Black on scroll (an Apple/Netflix-standard pattern users already trust).
- Primary nav items (illustrative): **Home / होम · Browse / ब्राउज़ करें · Documentaries / वृत्तचित्र · Spiritual / आध्यात्मिक · History / इतिहास · Live / लाइव · Search / खोजें**
- A single, always-visible **language toggle** (EN / हिं) in the top-right, next to profile — never buried in a settings menu. Since bilingual is a first-class brand promise, the control for it must be first-class in placement too (see `03_Design.md` §5).
- Profile, notifications, and search are grouped top-right, consistent with global streaming conventions (familiarity reduces friction; see `03_Design.md` §10 principle 5).
- No mega-menu with deep nested flyouts — categories are broad and few (`07_Information_Architecture.md`), so navigation stays flat and confident rather than exhaustive.

## 3. Homepage Structure

Top to bottom:

1. **Hero moment** — one full-bleed featured title/collection (editorially chosen, not algorithmically rotated ad-hoc), title set in Display typography, minimal copy, a single primary CTA ("Watch Now / अभी देखें") and a secondary ("More Info / अधिक जानकारी").
2. **Continue Watching** row (only shown to returning users with in-progress content).
3. **Editorial collections** (human-curated, e.g., "This Month in Sunad," "Festival Spotlight") — explicitly labeled as curated, not algorithmic, reinforcing editorial trust (`01_Report.md` §6.1 differentiation).
4. **Category rails** (Documentaries, Spiritual Teaching, History & Heritage, Journalism & Long-Form, Tourism, Literature) — each rail a horizontally scrollable row of cards.
5. **"Because you watched…"** personalized row — algorithmic, clearly but subtly labeled, positioned *after* editorial content, not before it (signals editorial-first, algorithm-second — a deliberate brand choice).
6. **Footer** — sitemap-style links, language toggle repeated, links to sibling Sunad products (News, Commerce) once those exist, legal/accessibility statement.

## 4. Discovery

- Discovery is a blend of **editorial curation (primary)** and **personalization (secondary)** — see `08_Content_Strategy.md` for the editorial operating model.
- A dedicated **"Explore by Theme"** page organizes content non-chronologically: by region of India, by historical era, by festival/season, by teacher/scholar, by language — giving the Heritage Scholar and Diaspora Custodian personas multiple non-obvious entry points beyond "genre."
- Seasonal/festival-aware surfacing (e.g., Diwali-related documentaries surfaced automatically around Diwali) tied to the Hindu calendar overlay described in `02_PRD.md` §8.

## 5. Browsing

- Category pages use a consistent grid (poster-style cards, 16:9 or 2:3 depending on content type — documentaries/discourse content reads better in 16:9 "cinematic" ratio than the 2:3 "movie poster" ratio common to entertainment platforms; see `09_Design_System.md` for card specs).
- Filtering by language (Hindi/English/dual-audio), duration, and content type (documentary/discourse/interview/reading) — filters are visible inline, not hidden behind a modal, on desktop's available width.
- Hover-to-preview on cards (silent, muted micro-preview or key art zoom — no unsolicited audio, per `03_Design.md` §9).

## 6. Search

- Persistent, prominent search accessible from any screen (icon in nav expands to full-width search overlay, an Apple/Netflix-standard pattern).
- Bilingual, transliteration-tolerant search (per `02_PRD.md` FR-4) — typing in either script or in romanized Hindi returns relevant results.
- Search results grouped by type (Titles, People/Scholars, Topics/Collections) rather than a flat list — supports the Scholar persona's research-style queries ("Adi Shankaracharya" should surface both a documentary *and* a scholar profile *and* a related collection).
- Empty/zero-result states offer editorial fallback ("No matches — explore Spiritual Teaching instead") rather than a dead end.

## 7. Recommendations

- Recommendations are visually distinct (subtle label, not a differently colored row) from editorial rails — maintaining the "editorial first" trust signal from §3.
- Recommendation logic considers language-mix behavior (a user who watches Hindi-audio content should not be pushed exclusively toward English content or vice versa — respects the bilingual-parity brand promise from `02_PRD.md` NFR-3).

## 8. Watch Experience

- **Cinema-first player:** minimal chrome, auto-hiding controls, Deep Black letterboxing, no branded overlays during playback beyond a small unobtrusive logo mark.
- Chapter markers for long-form content (documentary segments, discourse Q&A sections) — see `02_PRD.md` FR-8.
- Dual-subtitle/dual-audio switch accessible from the player without leaving full-screen (critical for the Diaspora Custodian persona watching with Hindi-learning children).
- Companion panel (collapsible side panel) for transcripts/glossary terms — desktop's width uniquely supports this "watch and read" pattern that mobile cannot replicate well (see `05_Mobile_Experience.md` for the mobile equivalent).
- Post-play: calm "Up Next" card, not an aggressive autoplay countdown — consistent with the "unhurried" brand personality (`03_Design.md` §12).

## 9. Profile

- Multiple profiles per household account, each with its own language preference, watch history, and watchlist — critical for multi-generational household use (Meera + her children, per persona §4.2 in `02_PRD.md`).
- Kids/Family profile: visually distinct (a warmer, slightly more playful but still on-brand treatment — never garish), restricted catalog, no autoplay of unrated content.
- Profile settings include: preferred audio/subtitle language, playback quality, download quality, notification preferences — all bilingual.

## 10. Subscription

- Dedicated, editorially written (not legalese-heavy) plans page — tier comparison table styled consistently with `02_PRD.md` §9 tiers, gold used to mark the recommended tier (a rare, intentional use of gold as emphasis).
- Self-serve upgrade/downgrade/pause/cancel — no retention dark patterns (no forced phone calls or hidden cancel flows); consistent with the "trust" brand pillar — a platform built on trust cannot undermine that trust at the moment of cancellation.
- Regional pricing displayed automatically based on detected region, editable manually (important for diaspora users whose billing region and cultural "home" region differ).

## 11. Account

- Account settings, billing history, connected devices, and privacy/data controls consolidated into a single, clearly organized settings area — bilingual throughout.
- Clear, plain-language (not legal-jargon-only) explanations of data use, consistent with `02_PRD.md` §10 security/privacy requirements.

## 12. Responsive Behavior (Desktop Breakpoints)

| Breakpoint | Behavior |
|---|---|
| ≥1440px | Full editorial layout, multi-column collection grids, generous hero typography at Display XL scale |
| 1024–1439px | Standard layout, hero typography steps down to Display L, rails remain full-width scroll |
| 768–1023px (tablet, treated as a bridge state) | Navigation collapses secondary items into an overflow menu; rails and grids reduce column count but retain desktop-style hover interactions where touch is not the primary input |

Below 768px, the experience hands off entirely to the patterns defined in `05_Mobile_Experience.md`.

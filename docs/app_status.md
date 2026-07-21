# Sunad OTT — Current App Status
*As of 2026-07-21*

---

## TL;DR

The project is in a **strong "Documentation-First" Phase 1 completion** state. All 12 planning/design documents are complete and internally consistent. A **Next.js web application** has been bootstrapped and partially built, covering the homepage, navigation, and several key pages — but large sections of the product spec remain unbuilt.

---

## 1. Documentation Layer — ✅ Complete

All 12 documents are written, cross-linked, and internally consistent:

| Doc | Title | Status |
|---|---|---|
| 01_Report.md | Research & Discovery | ✅ Complete |
| 02_PRD.md | Product Requirements | ✅ Complete (25 FRs, 6 NFRs) |
| 03_Design.md | Design Philosophy | ✅ Complete |
| 04_Web_Experience.md | Web/Desktop Experience | ✅ Complete |
| 05_Mobile_Experience.md | Mobile Experience | ✅ Complete |
| 06_User_Flows.md | User Flows (16 flows) | ✅ Complete |
| 07_Information_Architecture.md | IA & Navigation Tree | ✅ Complete |
| 08_Content_Strategy.md | Content Strategy | ✅ Complete |
| 09_Design_System.md | Design System Tokens | ✅ Complete |
| 10_Technical_Notes.md | Technical Architecture | ✅ Complete |
| 11_Future_Ideas.md | Future Roadmap Ideas | ✅ Complete |
| 12_Program_Chart.md | 24-hr FPC Schedule | ✅ Complete |

---

## 2. Technical Stack — Confirmed

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Custom CSS (design tokens in `tokens.css`, full system in `globals.css` — 106KB)
- **i18n:** `next-intl` — **22 languages** already configured (EN, HI + 20 regional Indian languages — far ahead of the Phase 1 spec which only required Hindi & English)
- **Data:** Mock data layer (`lib/mockData.ts`, 61KB) — no backend/API connected yet
- **Analytics:** GA4 setup (`components/GoogleAnalytics.tsx`, `lib/analytics.ts`)
- **Smooth scroll:** Lenis (`LenisProvider.tsx`)

---

## 3. Pages Built — Route Inventory

| Route | Page | Status |
|---|---|---|
| `/` | Homepage (landing) | ✅ Built (`page.tsx` — 9KB) |
| `/(main)/browse` | Browse/Catalog | ✅ Built |
| `/(main)/live` | Live TV + EPG | ✅ Built |
| `/(main)/search` | Search | ✅ Built |
| `/(main)/watch` | Video Player | ✅ Built |
| `/(main)/originals` | Sunad Originals | ✅ Built |
| `/(main)/store` | Sunad Store (Commerce) | ✅ Built |
| `/(main)/plans` | Subscription Plans | ✅ Built |
| `/(main)/signin` | Sign In / Register | ✅ Built |
| `/(main)/privacy` | Privacy Policy | ✅ Built |
| `/(main)/terms` | Terms of Service | ✅ Built |
| `/(main)/cookies` | Cookie Policy | ✅ Built |
| `/(main)/dpdp` | DPDP Act Compliance | ✅ Built |

---

## 4. Shared Components Built

| Component | Purpose | Status |
|---|---|---|
| `TopNav.tsx` | Persistent navigation bar + language toggle | ✅ Built (18KB) |
| `Footer.tsx` | Site footer with sitemap links | ✅ Built (22KB) |
| `HeroCarousel.tsx` | Full-bleed homepage hero | ✅ Built (Mandap Glass Layout, dynamic live badges) |
| `ContentCard.tsx` | Reusable title/content card | ✅ Built |
| `MobileBottomNav.tsx`| Thumb-zone mobile tab bar | ✅ Built (Bilingual labels, responsive hide) |
| `CulturePanel.tsx` | Parallax commerce section | ✅ Built (GSAP Scrub & Stagger animations) |
| `OnboardingWizard.tsx` | Language picker + interest onboarding | ✅ Built |
| `LandingModal.tsx` | Guest landing modal/CTA | ✅ Built |
| `LangContext.tsx` | Language state management (22 langs) | ✅ Built |
| `ThemeContext.tsx` | Theme context | ✅ Built |
| `CookieBanner.tsx` | GDPR/DPDP cookie consent | ✅ Built |
| `ScrollReveal.tsx` | Scroll animation wrapper | ✅ Built |
| `LenisProvider.tsx` | Smooth scroll provider | ✅ Built |
| `GoogleAnalytics.tsx` | GA4 event tracking | ✅ Built |

---

## 5. Design System Implementation

- ✅ `styles/tokens.css` — color tokens, typography scale, spacing, motion tokens (matching `09_Design_System.md`)
- ✅ `styles/globals.css` — full component CSS library (extensive mobile optimizations)
- ✅ Font system: Fraunces + General Sans (Latin), Tiro Devanagari + Mukta (Devanagari) — per `03_Design.md §5.2`
- ✅ Dark theme: warm near-black `#0E0D0C` base with antique gold `#BFA05B` accent
- ✅ Mobile UI constraints: Thumb-zone native Bottom Tab bar added, heavy TopNav collapsed.
- ✅ Advanced Animations: GSAP `ScrollTrigger` parallax and stagger patterns implemented via `gsap-master` MCP.

---

## 6. What's NOT Yet Built (Gap Analysis)

### Missing Pages / Features
| Gap | PRD Reference | Priority |
|---|---|---|
| Individual title detail page (synopsis, cast, watch CTA) | FR-1 to FR-5 | **High** |
| User profile management page | FR-10 | High |
| Account settings page | §5.3 | High |
| Downloads management tab/page | `05_Mobile_Experience §10` | Medium |
| My List / Watchlist page | FR-13 | Medium |
| Explore by Theme page | `04_Web_Experience §4` | Medium |
| Creator/Partner portal | `08_Content_Strategy §2.3` | Phase 2 |
| Event ticketing flow | FR-21 | Phase 2 |
| Course sales flow | FR-21 | Phase 2 |

### Missing Backend / API
| Gap | Notes |
|---|---|
| Real auth (OTP/passwordless) | Currently UI-only (`10_Technical_Notes §6`) |
| Real video streaming (HLS/DASH) | Mock data only (`10_Technical_Notes §3`) |
| Real CMS integration | Headless CMS not connected (`10_Technical_Notes §4`) |
| Real search index | Client-side mock only (`10_Technical_Notes §7`) |
| Payment processing | UI flow exists but no payment gateway |
| DRM implementation | Needed for licensed content (NFR-5) |

### Missing Tech Features
| Gap | PRD Ref |
|---|---|
| Real cross-device sync | FR-5, FR-25 |
| Offline download logic | FR-6, `05_Mobile_Experience §10` |
| Voice search (speech-to-text) | FR-23 |
| Panchang/Hindu calendar overlay | `02_PRD §8` |
| AI subtitle pipeline | FR-22, `10_Technical_Notes §11` |

---

## 7. Phase Completion Summary

```
Phase 1 (Platform Launch)
├── Documentation          ████████████ 100%
├── Design System          ████████████ 100%
├── Web Pages (shell)      ████████░░░░  70%  ← pages exist, some content thin
├── Shared Components      ████████████ 100%
├── i18n Infrastructure    ████████████ 100%  ← exceeded spec (22 langs vs 2)
├── Mock Data Layer        ████████████ 100%
├── Backend / APIs         ░░░░░░░░░░░░   0%  ← not started
├── Real Video Delivery    ░░░░░░░░░░░░   0%  ← not started
└── Auth / Payments        ░░░░░░░░░░░░   0%  ← not started
```

**Overall estimate: ~45% of Phase 1 complete** (frontend shell strong; backend/real services not started).

---

## 8. Key Strengths of What's Built

1. **Documentation quality is excellent** — arguably the best-prepared greenfield spec for an Indian OTT platform, with clear competitive differentiation, explicit non-goals, and deeply considered bilingual design philosophy.
2. **i18n is ahead of schedule** — 22 languages already wired up when Phase 1 only required 2; this is a significant foundation for Phase 2 regional expansion.
3. **Design system is solid** — tokens, typography (dual-script), and component CSS are done; UI will be consistent.
4. **All major page routes exist** — the structural skeleton of the web app is in place.

## 9. Biggest Open Risks

1. **No backend at all** — the app runs entirely on mock data; connecting real CMS, auth, and video delivery is the largest remaining work block.
2. **Video player is a shell** — needs a real HLS player (Video.js / Shaka / HLS.js) with DRM, dual-audio, chapter markers per `02_PRD FR-6 to FR-9`.
3. **Payment + subscription flow** — UI for plans page exists but no payment gateway is wired.
4. **Title detail page** — a critical missing page; users can browse cards but can't land on a dedicated page for any individual title.

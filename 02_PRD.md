# Sunad OTT — Product Requirements Document (PRD)

**Companion document to:** `01_Report.md`
**Audience:** Product, design, and engineering leadership

---

## 1. Product Vision

Sunad OTT is a premium, bilingual (Hindi/English) streaming platform dedicated to Indian civilizational storytelling — documentaries, spiritual teaching, history, journalism, tourism, and literature — designed with the visual discipline of Apple, the discovery mechanics of Netflix, and the sense of considered hospitality of Aman Resorts. It is explicitly **not** a devotional broadcast app, a mythology-drama entertainment app, or an ideologically framed platform. It is a trust-first cultural media brand.

## 2. Objectives

| Objective | Why it matters |
|---|---|
| Establish the category-defining premium visual standard for Indian cultural media | No incumbent currently owns this position (see `01_Report.md` §6) |
| Make Hindi and English equally first-class throughout the product | Core, non-negotiable brand mandate |
| Build a content taxonomy broad enough for documentary, journalism, spirituality, tourism, and literature — not narrowly religious | Differentiates from Aastha/Sanskar/Hari Om/Prachyam |
| Launch with a lean, high-quality content library rather than a large, uneven one | Protects premium positioning; premium brands are curated, not exhaustive |
| Build the data, identity, and design foundations that OTT's sibling products (News, Commerce) can later plug into | Avoids the "bolted-on" feeling of disconnected sub-products |

## 3. Success Metrics

**North-star metric:** Weekly Active Premium Viewing Hours per subscriber (depth of engagement over raw signups — protects against vanity-metric growth that dilutes premium positioning).

**Supporting metrics**
- Trial-to-paid conversion rate
- Month-3 subscriber retention
- % of sessions where the user engages with both Hindi and English content/UI in the same week (bilingual adoption health)
- Average content completion rate per title/category (editorial quality signal)
- Net Promoter Score, segmented by persona (see §4)
- Diaspora vs. domestic subscriber mix and ARPU by region
- Search success rate and zero-result-query rate (discovery health)
- Accessibility conformance score (automated + manual audit, see §7)

## 4. User Personas

### 4.1 Aarav — The Rooted Professional
- 34, product manager in Bengaluru, grew up culturally engaged but time-poor as an adult.
- Wants short, well-produced documentary or discourse content he can watch on weekday evenings without it feeling like "religious TV."
- Values: production quality, English-first but comfortable code-switching to Hindi, mobile-first usage.
- Primary jobs-to-be-done: "Help me stay connected to my roots without lowering my standards for what I watch."

### 4.2 Meera — The Diaspora Custodian
- 45, based in New Jersey, USA; two children born abroad.
- Wants to pass on language, festivals, and stories to her kids; currently relies on YouTube and WhatsApp forwards of inconsistent quality.
- Values: Hindi-audio/English-subtitle flexibility, family-safe curated content, offline downloads for long-haul flights to India.
- Primary jobs-to-be-done: "Give my children an authentic, high-quality window into where we're from."

### 4.3 Dr. Kavita Rao — The Heritage Scholar / Seeker
- 58, retired academic, deeply knowledgeable, skeptical of shallow or sensationalized content.
- Wants depth: sourced documentaries, credible scholars and teachers, transcripts/readings alongside video.
- Values: editorial credibility, ability to save/annotate, minimal ads/interruption.
- Primary jobs-to-be-done: "Give me content I can trust and go deep with, not entertainment dressed as history."

### 4.4 Jack — The Curious Global Viewer
- 29, London, discovered Indian cuisine and yoga, now curious about the culture behind them.
- Wants approachable, well-subtitled English-first entry points; easily overwhelmed by unexplained religious terminology.
- Values: context and explanation, not assumed prior knowledge; universal design tropes (Netflix-like UI he already understands).
- Primary jobs-to-be-done: "Let me explore Indian culture without feeling lost or like a religious outsider."

### 4.5 Secondary persona — Riya, 11 (co-viewer, not account holder)
- Represents the family co-viewing use case that drives Meera's and Aarav's household engagement; needs age-appropriate profile and content controls.

## 5. Functional Requirements

### 5.1 Discovery & Browsing
- FR-1: Home feed personalized by viewing history, saved content, and declared interests (onboarding interest picker).
- FR-2: Editorial, human-curated collections (e.g., "This Month's Documentaries," "Festival Spotlight") alongside algorithmic rows — premium platforms are curated, not purely algorithmic.
- FR-3: Full content browse by category, region, language, era/time-period (for history content), and speaker/author (for discourse content).
- FR-4: Unified bilingual search supporting Devanagari and Latin script input, transliteration-tolerant (e.g., typing "krishna" or "कृष्ण" returns the same results).
- FR-5: "Continue Watching" and cross-device resume.

### 5.2 Watch Experience
- FR-6: Adaptive-bitrate streaming with support for offline downloads on mobile.
- FR-7: Dual-audio and subtitle support (Hindi audio/English subtitles and vice versa, plus additional regional languages as a roadmap item).
- FR-8: Chapter markers for long-form documentary/discourse content (distinct from entertainment "skip intro" patterns).
- FR-9: Companion reading material (transcripts, glossaries of Sanskrit/cultural terms) linked to video where applicable — directly serves Jack and Dr. Rao personas.

### 5.3 Account, Profile & Membership
- FR-10: Multi-profile household accounts with a Kids/Family profile mode.
- FR-11: Bilingual onboarding flow where language preference is chosen explicitly, not inferred only from device locale (important for diaspora users whose devices may be set to English but who prefer Hindi content).
- FR-12: Subscription management (upgrade/downgrade/pause/cancel) self-serve.
- FR-13: Favorites/Watchlist ("मेरी सूची" / "My List").

### 5.4 Cross-Ecosystem Hooks (forward-looking, not built in Phase 1)
- FR-14: Shared identity/auth layer designed so News and Commerce products can federate login later without a redesign.
- FR-15: Editorial cross-linking capability (e.g., a documentary about a temple links to a related News long-read or a Commerce product) — data model only in Phase 1, UI deferred.

## 6. Non-Functional Requirements

- NFR-1: **Performance** — Home screen interactive within 2.5s on a mid-tier Android device on 4G (India's dominant device/network profile).
- NFR-2: **Availability** — 99.9% uptime target for playback services.
- NFR-3: **Bilingual parity** — No feature may ship in only one language; Hindi and English release simultaneously, always.
- NFR-4: **Design consistency** — All UI text must fit the design system's bilingual typography scale without truncation or layout breakage in either script (see `09_Design_System.md`).
- NFR-5: **Content protection** — DRM (Widevine/FairPlay/PlayReady equivalent) for licensed content.
- NFR-6: **Observability** — Full funnel analytics from impression → play → completion, segmented by language and persona.

## 7. Accessibility

- Conform to **WCAG 2.2 AA** as the minimum bar, both for Latin and Devanagari text (contrast ratios, focus states, and touch-target sizes must be independently verified for Devanagari, which has different visual density and diacritic stacking than Latin script).
- Full screen-reader support in both languages; ARIA/label content must be authored, not auto-translated.
- Captions mandatory on all long-form video (also serves noisy-environment and sound-off mobile viewing, a large real-world use case).
- Motion-reduction setting respected throughout (ties to `03_Design.md` motion philosophy — this platform's default motion is already restrained, so this is a light lift).
- Minimum touch target size 44×44pt on mobile, with generous spacing given Devanagari's visual complexity at small sizes.

## 8. Localization

- Hindi and English are both **Tier 1** languages at launch — not a base language plus a translation layer. All copywriting is authored natively in both, not machine-translated (see `03_Design.md` and `07_Information_Architecture.md`).
- Regional Indian languages (Tamil, Telugu, Bengali, Marathi, etc.) are an explicit **Phase 2+ roadmap item** (§11), architected for from day one at the data-model level (content metadata, subtitle tracks, and UI string tables all designed as multi-language-ready) even though only two languages ship initially.
- Devanagari numerals vs. Hindi content using Arabic numerals: **[Assumption]** recommend Arabic numerals within Hindi UI copy for broad legibility and consistency with contemporary Hindi digital publishing convention, reserving Devanagari numerals for stylistic/editorial contexts only.
- Date, time, and calendar handling must support the Gregorian calendar as primary with Hindu calendar (Panchang) overlays for festival/spiritual content scheduling — a functional requirement, not just a display nicety, since festival-dated content is core to the catalog.

## 9. Monetization & Membership Model

**[Assumption — commercial specifics require stakeholder confirmation]**

Proposed tiered structure, modeled on premium global SVOD norms adapted to Indian price sensitivity and the diaspora ARPU opportunity identified in `01_Report.md`:

| Tier | Positioning | Illustrative features |
|---|---|---|
| **Free / Sunad Sample** | Discovery and trust-building | Ad-supported, limited catalog, SD quality, one profile |
| **Sunad Premium** | Core paid tier | Full catalog, HD/4K where available, downloads, multi-profile, ad-free |
| **Sunad Family/Household** | Higher ARPU tier | Everything in Premium + more simultaneous streams + Kids profiles + priority access to new originals |
| **Sunad Patron** (optional, high-end) | Brand-building tier, not primarily revenue | Early access, behind-the-scenes/making-of content, invitations to live events/satsangs — a "patron of heritage" framing that fits the premium brand better than generic "Gold/Platinum" tier naming |

Regional pricing recommended: India domestic pricing calibrated to local SVOD norms; diaspora pricing (US/UK/Gulf/Australia) calibrated closer to premium global SVOD pricing, consistent with the higher willingness-to-pay identified in `01_Report.md` §8 (Opportunities).

## 10. Security

- Standard OWASP-aligned application security practices for authentication, payments, and account management.
- Payment processing via PCI-DSS-compliant third-party processors; Sunad should not handle raw card data directly.
- DRM-protected video delivery for licensed/premium content (see NFR-5).
- Clear, bilingual privacy policy and consent flows compliant with India's Digital Personal Data Protection (DPDP) Act, and GDPR-aware for EU-based diaspora users. **[Assumption: exact compliance scope pending legal review.]**
- Kids/Family profile mode must restrict data collection appropriately for any users who may be minors.

## 11. Scalability & Future Roadmap

**Phase 1 (Launch):** OTT platform, English + Hindi, documentary/spiritual/history/literature verticals, core web + mobile apps.

**Phase 2 (6–12 months, illustrative):**
- Additional regional Indian languages (content + UI)
- Smart TV apps (Android TV, Apple TV, Fire TV, Samsung/LG) — large-screen "living room ritual" viewing fits this content category naturally
- Live streaming for festivals/events, satsangs, and premieres
- Deeper cross-linking with News platform

**Phase 3 (12–24 months, illustrative):**
- Commerce integration (curated heritage goods tied to editorial content, e.g., "shop the craftsmanship featured in this documentary")
- Creator/scholar partner program with revenue share
- International markets beyond core diaspora geographies (Southeast Asia, wider global "curious viewer" markets)

All roadmap items are **[Assumption / illustrative]** pending stakeholder prioritization, and are explored further in `11_Future_Ideas.md`.

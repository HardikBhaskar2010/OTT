# Sunad OTT — Product Requirements Document (PRD)

**Companion document to:** `01_Report.md`
**Audience:** Product, design, and engineering leadership

---

## 1. Product Vision

Sunad OTT is a premium, bilingual (Hindi/English) streaming platform dedicated to Indian civilizational storytelling — documentaries, spiritual teaching, history, journalism, tourism, and literature — designed with the visual discipline of Apple, the discovery mechanics of Netflix, and the sense of considered hospitality of Aman Resorts. It is a hybrid platform that seamlessly integrates a 24-hour linear Live TV channel (broadcasting a Fixed Programming Chart/FPC) with a rich on-demand catalog. 

The platform operates under the core tagline **"WATCH. LEARN. EXPERIENCE. CONNECT."** and the slogan **"REAL STORIES. REAL BHARAT. REAL IMPACT."** It is built as a unified ecosystem linking **Content, Community, Commerce, and Culture** to connect India's heritage with the digital future. It is explicitly **not** a devotional broadcast app, a mythology-drama entertainment app, or an ideologically framed platform. It is a trust-first cultural media brand.

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

## 4. Target Audience

In accordance with Slide 12 of `sunad OTT ppt.pdf`, the platform serves a diverse spectrum of viewers across generations with the slogan **"CONTENT FOR EVERYONE. INSPIRATION FOR GENERATIONS."** The target audiences consist of:

- **Families (परिवार):** Widespread demand for clean, values-based family and children's content.
- **Students (विद्यार्थी):** Curated educational videos, historical timelines, and civilizational insights.
- **Youth (युवा):** Inspiring documentaries, podcasts, and startup/innovation showcases.
- **Teachers (शिक्षक):** High-quality, verified historical and cultural content for classroom support.
- **Researchers (शोधकर्ता):** Deep-dive scientific analyses, shastric texts, and historical documents.
- **Artists (कलाकार):** Traditional handicrafts, folk arts, and local heritage stories.
- **Entrepreneurs (उद्यमी):** Inspiring success stories, rural innovations, and leadership development.
- **Farmers (किसान):** Agricultural techniques, rural innovation, and sustainable organic farming.
- **Indian Diaspora (प्रवासी भारतीय):** Trusted access to language, culture, and values for families born abroad.
- **Spiritual Seekers (आध्यात्मिक साधक):** Authentic teachings, meditation, yoga, and shastric wisdom.
- **Culture Enthusiasts (संस्कृति प्रेमी):** Tourism, heritage walks, sacred architecture, and local traditions.
- **Educational Institutions (शैक्षणिक संस्थान):** Partnerships for schools, colleges, and universities.

### 4.1 User Personas (Representative Profiles)

#### 4.1.1 Aarav — The Rooted Professional
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

### 5.5 Live TV Channel Experience
- FR-16: 24-hour Linear Streaming — Playback of the Sunad linear broadcast stream mapped to the FPC schedule.
- FR-17: Interactive EPG (Electronic Program Guide) — Desktop and mobile interfaces displaying the daily/weekly schedule, current program runtime progress, and upcoming shows.
- FR-18: One-tap On-Demand Catch-up — Ability to jump directly from an upcoming or past EPG show listing to its on-demand stream page (for pre-recorded content).

### 5.6 Commerce Integration (Content + Commerce)
To support the unique, commerce-driven OTT ecosystem described in Slide 9 of `sunad OTT ppt.pdf`, the platform integrates the following functional capabilities:
- FR-19: Product-to-Content Mapping — An administrative metadata mapping system that associates relevant e-commerce items (from the Sunad Store) with specific video content (e.g., matching a pottery documentary with *Artisan Products*, a farming documentary with *Organic Products*, a yoga show with *Wellness Products*, and a temple travelogue with *Spiritual Accessories*).
- FR-20: Interactive Store Rails & Cards — Widescreen and mobile detail pages display a horizontally scrollable rail of associated products ("Shop the Story / कहानी से खरीदें") while a video is paused or during detail browsing.
- FR-21: One-Tap Commerce Entitlements — Capability to purchase and access *Event Tickets* (for live/virtual cultural events) and *Online Courses* (for educational program content) directly within the media player interface.

### 5.7 Technology Platform Capabilities
In accordance with the technological vision in Slide 8 of the PPT, the client player and search backend implement the following features:
- FR-22: AI-Powered Subtitles & Dubbing — AI translation pipelines that automatically generate high-accuracy Devanagari and Latin subtitles and synthetic voice dubbing tracks to enable bilingual and regional scaling.
- FR-23: Voice Search Integration — Speech-to-text API support in the search bar, enabling users to speak queries in English, Hindi, or mixed code-switched phrases (Hinglish).
- FR-24: 4K Ultra HD Streaming — Dynamic profile detection supporting 4K Ultra HD playback for users on high-bandwidth networks who are subscribed to premium plans.
- FR-25: Multi-Platform Sync — Real-time synchronization of continue-watching progress, watchlist, and user profile state across web, iOS, Android, and Smart TV platforms (Android TV, Apple TV, Fire TV, Tizen, WebOS).

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

To build a sustainable, scalable cultural ecosystem, the platform implements a diverse revenue strategy encompassing 13 distinct revenue streams (aligned with Slide 11 of `sunad OTT ppt.pdf`):

### 9.1 Subscription & Membership
1. **OTT Subscription:** Standard monthly and annual recurring plans (e.g., Free, Premium, Family/Household tiers).
2. **Premium Membership:** Exclusive premium benefits, early access, and "Patron of Heritage" membership tiers.
3. **Creator Subscription:** Premium creator tools, dashboard analytics, and platform subscription services for creators.

### 9.2 Advertising & Sponsorship
4. **Advertising:** Targeted, contextually safe, non-intrusive advertisements across the platform (primarily for the Free tier).
5. **Brand Sponsorship:** Dedicated sponsorships for specific shows, content categories, and cultural campaigns.
6. **Live Streaming Sponsorship:** Real-time brand integration and sponsorships for high-profile live events and festivals.

### 9.3 Content Commerce & Transactional
7. **E-Commerce Commission:** Referral and transaction commissions from physical products sold through the integrated "Sunad Store" (artisan crafts, organic farm produce, wellness items, spiritual products).
8. **Marketplace Revenue:** Listing and platform fees collected from verified third-party vendors and artisans in the marketplace.
9. **Event Ticketing:** Sales of digital and physical tickets for exclusive live events, concerts, virtual darshans, and cultural tours.
10. **Course Sales:** Online courses, certification programs, and educational modules sold directly on the platform.
11. **Digital Downloads:** Purchases of premium downloadable content (eBooks, historical documents, traditional music files, art prints, wallpapers).

### 9.4 Distribution & Licensing
12. **Licensing:** Syndication and content licensing of Sunad Originals to global media outlets and educational institutions.
13. **Content Distribution:** Strategic distribution partnerships with international television networks, IPTV providers, and airlines.

---

### 9.5 Subscription Tiers (Illustrative Structure)

| Tier | Positioning | Illustrative Features |
|---|---|---|
| **Free / Sunad Sample** | Discovery and trust-building | Ad-supported, limited catalog, SD quality, one profile |
| **Sunad Premium** | Core paid tier | Full catalog, HD/4K, offline downloads, multi-profile, ad-free |
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

In accordance with Slide 14 of `sunad OTT ppt.pdf`, the expansion roadmap is divided into three distinct strategic growth phases:

**Phase 1 (Platform Launch):** 
- **Content Production:** Focus on high-quality documentaries, spiritual knowledge, history, and literature core library.
- **Creator Onboarding:** Onboard initial historians, scholars, independent filmmakers, and subject experts.
- **Client Interfaces:** Launch responsive Web and native Mobile (iOS/Android) client platforms.
- **Linear TV:** Launch the 24-hour Linear FPC Channel and Electronic Program Guide (EPG).

**Phase 2 (6–12 months, Regional Expansion):**
- **Live Channels:** Launch specialized local and regional live streaming options (festival broadcasts, live satsangs).
- **AI Features:** Activate automated AI subtitles and AI voice dubbing pipelines for regional accessibility.
- **Commerce Integration:** Launch the "Sunad Store" e-commerce integrations, course sales, and event ticketing.
- **Language Scaling:** Expand regional Indian language localization (Tamil, Telugu, Bengali, Marathi, etc.).

**Phase 3 (12–24 months, International Expansion):**
- **Smart TV Apps:** Launch dedicated applications on Android TV, Apple TV, Fire TV, Samsung Tizen, and LG WebOS.
- **Global Indian Audience:** Optimize marketing and delivery networks for international diaspora regions (US, UK, Gulf, Australia).
- **Multi-language Platform:** Scale platform interfaces to include major international languages for global seekings.
- **Global Creator Network:** Enable international creator onboarding and syndication portals.

All roadmap items are **[Assumption / illustrative]** pending stakeholder prioritization, and are explored further in `11_Future_Ideas.md`.

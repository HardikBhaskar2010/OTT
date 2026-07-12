# Sunad OTT — Technical Notes

**Companion document to:** `02_PRD.md`, `07_Information_Architecture.md`
**Scope:** High-level engineering recommendations only. No implementation code, no vendor-specific configuration — this is a brief for an engineering team to plan against, not a build spec.

---

## 1. Architecture Suggestions

- **Composable/headless architecture:** decouple content (CMS), identity (auth), catalog/search, and playback (video delivery) as distinct services communicating over well-defined APIs — this lets the OTT platform's identity and content layers be reused by the future News and Commerce products (`01_Report.md` §4) without a rebuild, directly supporting `02_PRD.md` FR-14/FR-15.
- **Client architecture:** shared design-token and component layer across Web, iOS, and Android (e.g., a token-driven design system consumed by native and web clients alike) so the color/typography system in `09_Design_System.md` stays a single source of truth rather than drifting across platforms.
- **Server-rendering for discoverability-critical surfaces:** marketing pages, title detail pages, and category pages should be server-rendered or statically generated (not pure client-side-rendered SPA), directly addressing the discoverability weakness identified in `01_Report.md` §7 on the current `sunad.in`/`mysticpower.in` properties.

## 2. Scalability

- Design for **read-heavy, bursty traffic** — festival/seasonal content spikes (per `08_Content_Strategy.md` §3) will create predictable but significant load peaks; caching and CDN strategy should be load-tested against a simulated festival-day traffic pattern before launch, not just average-day load.
- Stateless application services behind autoscaling groups; session/profile state externalized (not held in-memory per instance) so scaling out doesn't disrupt active sessions.
- Plan data models (catalog, identity, entitlements) to support multi-region deployment from day one, given the diaspora audience identified in `01_Report.md` §5 — reduces latency for US/UK/Gulf/Australia users without a later re-architecture.

## 3. Streaming / Video Delivery Considerations

- **Adaptive bitrate streaming (HLS/DASH)** with multiple renditions tuned for the India network profile identified in `02_PRD.md` NFR-1 (mid-tier Android, variable 4G) — lower starting bitrate and faster step-down than a Western-market-tuned default configuration.
- **DRM:** license-based protection (Widevine/FairPlay/PlayReady-equivalent) for licensed and premium-tier content, per `02_PRD.md` NFR-5.
- **CDN strategy:** a CDN with strong Indian and diaspora-market POP coverage; evaluate multi-CDN failover given the reliability expectations implied by the "premium" brand promise — buffering and downtime are brand-safety issues, not just technical ones, in a product whose differentiation is craftsmanship.
- **Encoding pipeline:** support for dual-audio and multi-subtitle tracks as first-class encoding outputs (not bolted-on later), per `02_PRD.md` FR-7 — retrofitting multi-track support after launch is significantly more expensive than building it in from the start.
- **4K Ultra HD Renditions (Slide 8):** The transcoding pipeline must support HEVC/H.265 encoding profiles for 4K Ultra HD playback, delivering high-resolution streams dynamically to smart TVs and high-bandwidth clients on premium tiers.
- **Offline/download packaging:** encrypted, time-limited download packages for mobile offline viewing (`06_User_Flows.md` §10), with expiry enforcement handled gracefully client-side (clear messaging, not silent failure).

## 4. CMS Recommendations

- A **headless CMS** capable of managing the bilingual metadata schema defined in `07_Information_Architecture.md` §5 as first-class structured fields (not a single "translated copy" text blob) — the CMS's data model is where the "Hindi is not a translated afterthought" brand mandate either succeeds or quietly fails at the infrastructure level.
- Editorial workflow support (draft/review/publish states, scheduled publishing tied to the festival content calendar in `08_Content_Strategy.md` §3) so non-technical editorial staff can manage collections and featured content without engineering involvement.
- Support for the controlled-vocabulary taxonomy (People, Regions, Eras) described in `07_Information_Architecture.md` §6, ideally with entity-relationship modeling (not flat tags) so that, e.g., a "Region" entity can carry its own canonical bilingual name, aliases, and associated imagery.

## 5. Localization (Technical)

- Full Unicode support throughout the stack (database, search index, CDN edge caching keys) — verify no legacy systems assume ASCII/Latin-1 encoding, a common silent failure point for Devanagari content.
- String/content management architected for **N languages from day one** even though only English and Hindi ship at launch (per `02_PRD.md` §8), avoiding a costly re-architecture when regional languages are added in Phase 2.
- Font-loading strategy for the dual-script typography system (`09_Design_System.md` §2) — subset and preload the Devanagari fonts with the same performance discipline as the Latin fonts, so Hindi-preferring users don't experience a "flash of unstyled/fallback Devanagari text" that Latin-preferring users don't also experience. This is a concrete, testable expression of "equally native."

## 6. Authentication

- Passwordless/OTP-first authentication recommended as the primary path (phone-number-led), with email/password as a secondary option — consistent with dominant India mobile-auth UX patterns and lower friction for the mobile-first majority audience (`05_Mobile_Experience.md` §1).
- Shared identity/entitlement service designed to later federate with News and Commerce products (`02_PRD.md` FR-14) without requiring users to re-register per product.
- Session handling supports multi-device concurrent sessions per household plan tier, enforced server-side against the plan's simultaneous-stream limit (`02_PRD.md` §9).

## 7. Search

- Dedicated search infrastructure (e.g., a managed search/indexing service) supporting the transliteration-tolerant, multi-field, multi-language index described in `07_Information_Architecture.md` §7 — this is materially harder than a default full-text search on the primary database and should be budgeted/planned as its own workstream, not a checkbox.
- Editorial pin/boost capability for query results (§7 of the IA doc) needs an admin-facing tool, not just a backend flag — content ops must be able to manage this without an engineering ticket during a live festival moment.

## 8. Analytics

- Event tracking should capture the full funnel (impression → detail-view → play-start → completion) **segmented by language** as a first-class dimension, per `02_PRD.md` §3 (bilingual adoption health metric) — most off-the-shelf analytics setups treat language as an afterthought property rather than a core segmentation axis; this needs to be a deliberate schema decision.
- Respect the privacy/consent framework defined in `02_PRD.md` §10 in the analytics implementation itself (consent-gated tracking, especially for Kids/Family profiles).

## 9. SEO

- Directly addresses the weakness found in `01_Report.md` §7: title detail pages, category pages, and collection pages must be crawlable, with proper structured data (schema.org VideoObject/TVSeries equivalents) so search engines and social-share previews can represent Sunad content properly — critical for the News platform's future success and for the "curious global viewer" persona's discovery path (`02_PRD.md` §4.4), who is more likely to arrive via search than via app-store browsing.
- Bilingual SEO: separate, properly `hreflang`-tagged English and Hindi URLs/metadata for shared content, not a single URL with client-side language switching invisible to search engines.

## 10. Performance

- Performance budget tied directly to `02_PRD.md` NFR-1 (interactive home screen within 2.5s on mid-tier Android/4G) — this should be a CI-enforced budget (automated Lighthouse/WebPageTest-style checks blocking regressions), not an aspirational target checked manually before launch.
- Image/video thumbnail delivery via a responsive image pipeline (correctly sized/compressed per device) — thumbnail-heavy browsing screens are typically the largest real-world data cost for users on limited data plans, a meaningful concern for the India-primary NFR target audience.
- Font-loading performance (§5) is treated as a performance requirement, not just a typography nicety, given the dual-script system's added font-weight footprint versus a Latin-only product.

## 11. Artificial Intelligence Pipelines

To support the smart technology platform requirements outlined in Slide 8 of `sunad OTT ppt.pdf`, the system architecture integrates the following AI pipelines:

1. **AI Subtitle Pipeline:**
   - Integrated into the CMS content ingestion workflow.
   - Automatically processes video audio files through automated speech recognition (ASR) to generate source transcripts, followed by neural machine translation (NMT) to output high-accuracy Devanagari and Latin translation files (VTT/SRT).
   - Includes a human-in-the-loop review interface in the CMS editor to verify terminal terminology and diacritics before publishing.

2. **AI Dubbing Pipeline:**
   - Leverages text-to-speech (TTS) and voice-cloning synthesis to generate translated audio tracks in Hindi or English, maintaining the original speaker's pitch, emotional register, and pacing.
   - Tracks are packaged as separate audio channels inside the HLS master playlist, satisfying `02_PRD.md` FR-7.

3. **Voice Search & Speech-to-Text:**
   - Search input utilizes client-side speech capture APIs, streaming audio packets to a cloud-based speech-to-text translator.
   - Supports multilingual speech models (English, Devanagari, and code-switched Hinglish), converting spoken inputs into canonical text strings to query the search index (`07_Information_Architecture.md` §7).

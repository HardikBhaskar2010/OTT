# Sunad OTT — Design Philosophy

**Companion document to:** `01_Report.md`, `02_PRD.md`
**Purpose:** Define the complete design philosophy before any screen is drawn. Every visual decision made later (`09_Design_System.md` onward) must trace back to a principle in this document.

---

## 1. Brand Personality

If Sunad OTT were a person, they would be:

- **A respected documentary curator**, not a temple priest or a news anchor.
- **Unhurried** — never chasing virality, never using urgency tactics ("Only 2 seats left!") that belong to e-commerce, not culture.
- **Quietly confident** — trusts the content to speak for itself; does not over-decorate or over-explain.
- **Bilingual by nature, not by translation** — moves between Hindi and English the way a well-read Indian professional actually speaks, without one language feeling like the "real" one and the other a courtesy copy.
- **Warm, not ornate** — warmth comes from craftsmanship (typography, pacing, imagery) rather than decoration (borders, motifs, filigree).

**Anti-personality (explicit non-goals):** Sunad OTT is not devotional-broadcast (Aastha/Sanskar), not mythology-entertainment (Hari Om/Epic On), not polemical (Prachyam), and not generically mass-market (Sun NXT). See `01_Report.md` §6 for the full competitive reasoning behind these exclusions.

## 2. Emotional Design Principles

1. **Calm before spectacle.** The interface should lower the viewer's heart rate, not raise it. Reserve visual intensity for the content itself (video, photography), not the chrome around it.
2. **Reverence without religiosity.** Design should communicate that the content matters — through spacing, pacing, and material quality — without relying on religious iconography (no om symbols, lotus motifs, or temple-arch framing as default UI decoration). Cultural imagery belongs in curated photography/content, not in navigation chrome.
3. **Earned luxury.** Gold is a reward for attention (used at moments of emphasis — a title reveal, a premium badge, a selected state) rather than ambient wallpaper.
4. **Trust through restraint.** Every removed element increases the credibility of the elements that remain. This is the single most important governing instinct for this brand.
5. **Belonging in two languages at once.** A Hindi-first user and an English-first user should each feel Sunad was built for them specifically — not for "the other" user with a translation added.

## 3. Visual Direction

**Reference triangulation (as specified in the brief):**
- From **Apple**: restraint, generous negative space, materials-led design (glass, depth, light), typography as the primary decorative device.
- From **Netflix**: confident full-bleed imagery, strong content-first hierarchy, frictionless browsing and resume patterns.
- From **Aman Resorts**: material warmth, quiet luxury, dim ambient lighting cues, a sense that every detail was considered and nothing is accidental.

**Visual mood:** dim, cinematic, editorial. Think of a well-lit museum gallery after hours, or a first-class airline lounge with Indian craftsmanship in its details — not a temple hall, not a TV studio set.

## 4. Color Philosophy

**Mandatory system (non-negotiable, per brief):** Deep Black and Rich Royal Gold as primary colors, with charcoal, ivory, warm white, and stone as supporting neutrals. Gold is a **luxury accent**, never a dominant fill. No bright saffron, no neon gold, no gradients used decoratively.

| Role | Direction | Reasoning |
|---|---|---|
| **Base surface — Deep Black** | A *warm* near-black (slightly brown/ink undertone rather than a cold digital `#000000`) | Pure black can feel clinical/digital; a warm black feels like ink, teakwood, and old photographs — more aligned with heritage and material warmth |
| **Accent — Rich Royal Gold** | A muted, antique gold — closer to brushed brass or old temple metalwork than to bright "influencer gold" or saffron-yellow | Explicitly avoids the "devotional channel" visual cliché (bright saffron/marigold) called out as a non-goal in the brief |
| **Ivory / Warm White** | Used for primary reading text on dark surfaces instead of pure white | Pure white on near-black can feel harsh/high-contrast in a cinematic, dim environment; warm white is gentler on extended viewing sessions |
| **Charcoal** | Secondary surfaces (cards, modals, elevated panels) | Creates depth/hierarchy without introducing new hues |
| **Stone** | Borders, dividers, disabled states, secondary text | Keeps the neutral palette from feeling flat; evokes natural material (marble, sandstone) consistent with heritage architecture references, used abstractly rather than literally |

Full token values (hex, states, elevation mapping) are formalized in `09_Design_System.md`. This section defines *why*, not the final *what*.

**Explicit avoidances:** decorative gradients, neon/bright gold, bright saffron/marigold orange as a UI color (reserve those hues for actual festival-content photography, never for chrome), drop-shadow-heavy skeuomorphism, red/green traffic-light color coding as the *only* signal (pair with icon/text for accessibility).

## 5. Typography Philosophy — Highest Priority

Typography is the primary expression of "premium" in this product, more than color, more than imagery. The mandate is explicit: **English and Hindi must feel equally native — Hindi is not a translated afterthought.**

### 5.1 The core problem
Most Indian digital products treat Devanagari as a fallback: a default system font bolted onto a carefully chosen Latin type system. The visible result — mismatched weight, mismatched size, mismatched warmth — is precisely the "translated afterthought" feeling the brief instructs us to avoid. Solving this properly requires treating Latin and Devanagari as **two typographic systems designed in parallel, with matching roles and matching emotional registers**, not one system with a translation patch.

**Reference point:** Apple's own iOS system pairs San Francisco (Latin) with Kohinoor Devanagari — a custom-commissioned, humanist Devanagari family designed specifically to sit comfortably alongside Apple's Latin system type. That pairing is the correct *model* to follow (parallel, purpose-matched systems), even though Kohinoor itself is Apple's proprietary system font and not available for licensing. Sunad's long-term ambition (§5.5) should be a similarly bespoke pairing; the recommendation below is the best available equivalent for launch.

### 5.2 Recommended type system

A parallel two-role system in each script — a **Display/Editorial** face for moments that need warmth and craft, and a **Text/UI** face for everything that needs to work hard at small sizes.

| Role | Latin | Devanagari | Reasoning |
|---|---|---|---|
| **Display / Editorial** (hero titles, collection titles, brand lockups) | **Fraunces** (variable serif) | **Tiro Devanagari Hindi** (serif) | Both are serif families with warm, ink-influenced terminal details rather than cold geometric strokes — they share an emotional register (literary, crafted, unhurried) even though they come from unrelated type families. This is the "equally premium" pairing logic: matched *feeling*, not matched letterforms. |
| **Heading / Body / UI** (navigation, metadata, body copy, buttons, labels) | **General Sans** | **Mukta** | Both are humanist sans faces with excellent legibility at small sizes and multiple weight steps. Mukta was developed with exactly this brief's problem in mind — a clean, modern, highly legible Devanagari UI face — making it a proven, low-risk choice for interface text rather than an experimental pairing. |

**Why not one "universal" font family for both scripts?** Very few fonts render both Latin and Devanagari at genuinely premium quality — most multi-script "universal" fonts compromise one script to serve the other. Two purpose-built systems, structurally mirrored (a serif Display role + a sans Text role, in both scripts), delivers a more genuinely "equally native" result than a single compromise typeface would.

**Licensing note:** Fraunces, Tiro Devanagari Hindi, General Sans, and Mukta are all available under open licenses (SIL Open Font License / free-commercial-use), making this system implementable immediately without licensing risk, while remaining a genuinely considered, non-default choice — not `Noto Sans` used as a placeholder forever.

### 5.3 Typography scale (proposed, refined in `09_Design_System.md`)

| Token | Latin size / line-height | Devanagari size / line-height | Usage |
|---|---|---|---|
| Display XL | 56–72px / 1.1 | 60–78px / 1.25 | Hero title, splash moments |
| Display L | 40–48px / 1.15 | 44–52px / 1.3 | Collection/section titles |
| Heading 1 | 28–32px / 1.25 | 30–34px / 1.4 | Page/section headers |
| Heading 2 | 20–24px / 1.3 | 22–26px / 1.45 | Card titles, subheaders |
| Body L | 17–18px / 1.5 | 18–19px / 1.65 | Primary reading text |
| Body M | 15px / 1.5 | 16px / 1.65 | Secondary/UI text |
| Caption / Label | 12–13px / 1.4 | 13–14px / 1.55 | Metadata, timestamps, badges |

**Why Devanagari runs slightly larger with taller line-height:** Devanagari's matras (vowel signs) and conjunct consonants extend above and below the baseline more than Latin's x-height-centric design. Setting Devanagari at Latin-equivalent pixel sizes and line-heights routinely clips or crowds these marks. A ~5–10% size increase and ~10–15% line-height increase is standard professional practice for premium Devanagari typesetting and is *not* optional polish — it is what makes Hindi text feel as considered as English text, directly serving the brief's core mandate.

### 5.4 Weights, spacing, and responsive behavior
- **Weights:** Both systems should expose at minimum Regular/Medium/Semibold/Bold; avoid Devanagari "Bold" faces that were mechanically emboldened rather than hand-drawn — verify true bold masters exist for the chosen family before committing.
- **Letter-spacing:** Slightly negative tracking (−1% to −2%) on large Latin display sizes is acceptable and common in premium editorial type; **never apply negative tracking to Devanagari** — tightened tracking causes conjuncts and matras to collide. Devanagari should generally use neutral-to-slightly-positive tracking.
- **Line-length:** Cap body text measure at ~60–75 characters for Latin; Devanagari's visual density means a slightly shorter measure (~50–65 characters) reads more comfortably at equivalent point size.
- **Responsive typography:** Use fluid/clamp-based scaling tied to viewport, with independent scale curves for Latin and Devanagari blocks so that Hindi text never gets mechanically scaled using Latin's clamp values (this is the most common cause of clipped matras on mobile viewports in Indian apps today).

### 5.5 Long-term typography roadmap
**[Assumption / recommendation, not required for launch]** As the brand matures and budget allows, commissioning a bespoke Devanagari display family (in the spirit of Apple's Kohinoor commission) would become durable, hard-to-copy brand IP — directly serving the "timeless" and "premium" brand pillars in a way no licensed font can fully replicate. This should be evaluated post-launch, once the interim system (§5.2) has been validated with real users.

## 6. Iconography

- A single-weight, thin-stroke line-icon system (not filled/glyph-heavy) — consistent with Apple-influenced restraint.
- Icons should be culturally neutral by default (play, pause, search, profile use universal streaming-app conventions users already know from Netflix/Prime/Hotstar) — do not reinvent standard interaction icons for the sake of "cultural flavor"; familiarity here reduces cognitive load and lets cultural expression live in content and typography instead.
- A small, optional set of custom icons for content-specific categories (e.g., a temple-bell glyph for a "Spiritual" category chip) is acceptable **only** as a subtle, single-color line icon at the same stroke weight as the rest of the system — never a filled, colorful, or literal illustration in navigation chrome.

## 7. Illustration Direction

- Illustration is a **light-touch, secondary** device — used for empty states, onboarding moments, and error states — never for primary content presentation (photography and video own that role).
- Where illustration is used, it should follow a single-line or minimal-linework style with gold used sparingly as a single accent stroke, avoiding busy, multi-color, "flat design" illustration clichés.
- Avoid literal religious iconography (deity figures, temple architecture) in illustration; if heritage motifs are used (e.g., a subtle jali/lattice pattern, a manuscript border), they should be abstracted into geometric pattern language, not reproduced literally — this keeps the brand civilizational rather than devotional.

## 8. Photography Direction

Photography and video thumbnails are the platform's primary emotional carriers — more than any other single design element.

- **Lighting:** low-key, warm, directional lighting — golden-hour exteriors, candlelit or lamp-lit interiors — consistent with the black/gold palette and the Aman-Resorts-quiet-luxury reference.
- **Composition:** documentary-grade, observational, never staged/stock-photo-stiff. Favor genuine texture (hands, craft, weathered stone, water, fabric) over posed portraiture.
- **Color grading:** desaturated, warm-neutral grade with gold/amber highlights preserved — thumbnails should look like stills from a single coherent "Sunad film," not a mixed bag of licensed stock footage.
- **People:** shown with dignity and specificity (real practitioners, artisans, scholars, pilgrims) rather than generic stock-photo "spiritual" imagery (silhouetted yoga poses at sunset, generic incense-and-candle close-ups).

## 9. Motion Philosophy

- Motion should feel like **weight and light**, not bounce and playfulness — slow, physically-plausible easing curves (ease-out, 250–400ms for most UI transitions) rather than springy/elastic effects.
- Page and modal transitions favor cross-fades and gentle vertical/depth movement over slides and wipes.
- Hover/focus states use subtle scale (1.02–1.04×) and shadow-depth changes rather than color-flash feedback, reinforcing the "materials and light" visual language.
- No autoplay sound, ever, by default — a small but important trust signal that separates this from noisy entertainment apps.
- Loading states use calm, content-shaped skeleton placeholders (never spinning mandalas, om symbols, or other literal cultural motifs used as decoration — this is a common, avoidable cliché in this category).

## 10. Design Principles (summary heuristics for every future decision)

1. **Restraint reads as trust.** When in doubt, remove.
2. **Parallel, not translated.** Every Hindi surface is designed as its own first-class artifact, not a string-swap of an English layout.
3. **Gold is a verb, not a wallpaper.** It marks emphasis and reward; it does not fill backgrounds or borders by default.
4. **Content is the hero.** Chrome recedes; photography, video, and typography carry the emotional weight.
5. **Familiar mechanics, unfamiliar craft.** Interaction patterns should feel instantly familiar (Netflix-grade usability); the *quality* of execution is where Sunad differentiates, not novelty of interaction.
6. **Civilizational, not devotional.** Every visual decision is checked against the brief's explicit non-goals (not religious, not temple, not mythology) before it ships.

## 11. Accessibility Principles

- Minimum WCAG 2.2 AA contrast for both Deep Black/Ivory and Charcoal/Gold combinations — gold-on-black text combinations must be checked carefully, as muted golds can fail contrast at body-text sizes; reserve gold-on-black for large display type or icon/accent use, and use ivory/warm-white for body text on dark surfaces.
- All motion has a reduced-motion equivalent.
- All meaning conveyed by color (e.g., "new," "premium") must also be conveyed by text or icon.
- Devanagari accessibility is treated as equally important as Latin accessibility (screen reader support, contrast, touch targets) — not an edge case. See `02_PRD.md` §7.

## 12. Premium Interaction Philosophy

- **Frictionless but never rushed:** onboarding, browsing, and checkout flows should have zero unnecessary steps, but should never use dark-pattern urgency (countdown timers, "X people watching now") — those tactics contradict the "unhurried, trustworthy" brand personality.
- **Considered defaults:** every default setting (autoplay, audio language, subtitle language) should be the choice a thoughtful host would make for a first-time guest, not the choice that maximizes a metric.
- **Micro-craft as macro-signal:** small details — the easing curve on a hover state, the kerning on a title card, the warmth of a loading skeleton — accumulate into the platform's overall premium credibility. In a category with no existing premium benchmark (`01_Report.md` §6.1), these details *are* the differentiation.

# Sunad OTT — Content Strategy

**Companion document to:** `07_Information_Architecture.md`, `01_Report.md` §6 and §9
**Purpose:** Define how content is organized, sourced, and editorially governed — the substance that fills the IA's structure.

---

## 1. Content Format Types (mapped to IA categories)

The brief asks for coverage of Movies, Documentaries, Podcasts, Spiritual Series, Culture, History, Journalism, Tourism, Live TV, Events, Collections, and Featured content. Rather than making each of these a top-level navigation item (which would violate the "flat, shallow navigation" principle in `07_Information_Architecture.md` §1), most are treated as **content types** that live inside the seven IA categories:

| Content format | Primary IA category | Notes |
|---|---|---|
| **Documentary films** | Documentaries | Core format; single-sitting nonfiction films |
| **Documentary series** | Documentaries / History & Heritage | Multi-episode nonfiction |
| **Movies** | New sub-shelf within Documentaries/History, *not* a general entertainment movies category | **[Strategic recommendation]** Sunad should not attempt to become a general Bollywood/regional-cinema movie library — that both dilutes the premium-documentary positioning and competes directly with far larger incumbents (Sun NXT, JioHotstar, etc.) on a budget it cannot win. If "Movies" means licensed heritage/art-house cinema and restored classic films relevant to Indian cultural history, that fits; if it means mainstream commercial cinema, that should be explicitly out of scope for Phase 1. **[Assumption — requires stakeholder confirmation of intended scope]** |
| **Podcasts / audio discourse** | Spiritual Teaching, Journalism & Long-Form | Audio-first versions of discourse and interview content — supports the "listen while commuting" use case identified for the Rooted Professional persona; should be a first-class audio-only playback mode, not just a video file with the screen off |
| **Spiritual series** | Spiritual Teaching | Multi-part teacher-led content, presented in the scholarly/calm register defined in `07_Information_Architecture.md` §3 — explicitly not liturgical broadcast |
| **Culture** | Distributed across Documentaries, History & Heritage, Tourism, Literature | Not a separate category — "culture" is the umbrella the whole platform serves, not one shelf among others |
| **History** | History & Heritage | See IA definition |
| **Journalism** | Journalism & Long-Form | Explanatory/investigative long-form, distinct from the sibling News platform's daily-news function (`07_Information_Architecture.md` §3) |
| **Tourism** | Tourism & Pilgrimage | Travelogue format |
| **Live TV** | Dedicated `Live TV` top-level section, Phase 1 | The 24-hour linear broadcast channel feed powered by the Fixed Programming Chart (FPC) schedule (per `12_Program_Chart.md`). Kept visually separate from on-demand items. |
| **Events** | Live (when streamed) + a dedicated Events/calendar surface | Both virtual (streamed) and physical (in-person, promoted in-app) events tied to festivals/premieres |
| **Collections** | Cross-cutting editorial layer | See `07_Information_Architecture.md` §4 |
| **Featured content** | Home hero + editorial collections | See `04_Web_Experience.md` §3 |

## 2. Editorial Strategy

### 2.1 Editorial voice
Calm, curious, well-sourced, and specific — the register of a respected documentary narrator or museum wall text, never a sermon, a sales pitch, or a polemic. This voice must be consistently trained into every synopsis, title, push notification, and marketing line (see `03_Design.md` §1 brand personality).

### 2.2 Editorial governance model
- A small editorial board (content strategy + at least one subject-matter/cultural advisor) owns category and collection curation — protects against the single largest risk identified in `01_Report.md` §12 (category drift toward devotional-broadcast defaults).
- Every piece of spiritual/religious content is reviewed for **framing discipline**: presented as teaching, history, or philosophy — not liturgy — consistent with the brief's explicit "not a religious website" instruction.
- A lightweight sensitivity/context review process for content touching contested history or theology, ensuring balanced, well-sourced framing rather than a single sectarian viewpoint — directly protects the brand-safety risk identified in `01_Report.md` §8 (avoiding the ideologically-loud positioning of some competitors).

### 2.3 Sourcing model
- **Original productions ("Sunad Originals"):** highest editorial control, highest production-value investment, primary vehicle for brand differentiation.
- **Licensed archival/documentary content:** efficient way to build catalog depth early without full production cost; requires careful curation to maintain the visual/tonal consistency described in `03_Design.md` §8 (photography direction) — licensed content that doesn't match Sunad's visual register should be re-packaged (new key art, new synopsis voice) rather than presented as-is.
- **Scholar/creator partnerships:** interviews, lecture series, and reading content produced *with* Sunad's production standard rather than simply hosting externally-produced YouTube-grade video — a critical distinction for maintaining premium positioning.
- **Migrated content from `mysticpower.in`:** where usable, existing spiritual-video assets could seed the Spiritual Knowledge category, but **only** after re-editing/re-framing to match the calmer, non-liturgical editorial voice defined above — a direct port would reintroduce the "devotional channel" tone the brand is explicitly moving away from. **[Assumption — actual migration decision is a stakeholder call]**
- **Creator Ecosystem (Slide 7 Creator Platform):** A structured partner portal providing hosting, production support, and monetization tools for:
  - Independent Filmmakers, Documentary Creators, and Researchers.
  - Universities, Educational Institutions, and Historians.
  - Cultural Organisations, NGOs, Artists, Musicians, Performers, and Subject Experts.
- **Creator Community Network (Slide 10 Hub):** To scale content production across every district of India, Sunad establishes a decentralized network including:
  - District Ambassadors, Farmer Networks, and Women SHGs.
  - Influencers, Youth Leaders, and local volunteers capturing regional stories, folk arts, and local innovations.

## 3. Content Calendar & Seasonality

Sunad's programming calendar utilizes a three-tier content development model designed to maximize viewer acquisition, retain daily engagement, and create anticipated seasonal spikes:

1. **Daily Shows (Routine Retention):** Structured around the 24-hour Fixed Programming Chart (FPC) schedule to anchor daily viewing habits (e.g., *प्रभात भारत* at 5:00 AM, *आरोग्य भारत* at 6:00 AM, and peak Prime Time slots *तंत्र रहस्य* and *Mystic Bharat* at 7:00 PM and 8:00 PM). See [12_Program_Chart.md](file:///c:/Users/sesa457837/Music/Sunad%20Broadcast/OTT/12_Program_Chart.md).
2. **Weekly Flagship Programs (Weekly Specials):** High-production-value weekly themes to build scheduled viewing routines, culminating in a premium 2-hour Mega Documentary on Sundays:
   - **सोमवार (Monday):** शिव विशेष (Shiva Special)
   - **मंगलवार (Tuesday):** हनुमान एवं भैरव (Hanuman & Bhairav Special)
   - **बुधवार (Wednesday):** वेद विज्ञान (Vedic Science Special)
   - **गुरुवार (Thursday):** गुरु परंपरा (Guru Parampara Special)
   - **शुक्रवार (Friday):** शक्ति साधना (Shakti Sadhana Special)
   - **शनिवार (Saturday):** तंत्र एवं नाथ परंपरा (Tantra & Nath Parampara Special)
   - **रविवार (Sunday):** Mega Documentary — 2-Hour Feature (Mega Documentary - 2 घंटे)
3. **Mega Event Programming (Seasonal Spikes):** Deep programming blocks (4–8 hours of live feeds, special darshan access, and dedicated documentary series) built around major civilizational festivals and milestones (Mahashivratri, Navratri, Kumbh Mela, Char Dham Yatra, Ram Navami, Guru Purnima) anchored to the Hindu calendar cycle (per `02_PRD.md` §8).

## 4. Featured Content Strategy

- The Home hero slot (per `04_Web_Experience.md` §3) is a **human editorial decision**, refreshed on a defined cadence (e.g., weekly), never purely algorithmic — this is one of the platform's clearest, most visible expressions of "curated, not just aggregated."
- Featured content selection criteria (illustrative): production quality bar, seasonal relevance, representation of civilizational breadth over time (ensuring the platform doesn't over-index on Spiritual content simply because it may be the deepest catalog early on, given the `mysticpower.in` legacy).

## 5. Content Quality Bar (Editorial Checklist)

Before any title publishes, it should pass:
1. **Category-fit check** — does it belong in the taxonomy as defined in `07_Information_Architecture.md` §3, or does it quietly reintroduce devotional-broadcast or mythology-drama framing?
2. **Bilingual completeness check** — title, synopsis, and subtitles/audio exist natively in both English and Hindi, not machine-translated placeholders (`02_PRD.md` NFR-3).
3. **Visual/tonal consistency check** — key art and framing match `03_Design.md` §8 photography direction.
4. **Sourcing/credibility check** — for History and Journalism content in particular, sources are identifiable and defensible.
5. **Metadata completeness check** — all fields in `07_Information_Architecture.md` §5 populated, enabling discovery and search.

## 6. Content Roadmap Sequencing (Illustrative)

**[Assumption — actual sequencing is a stakeholder/production-capacity decision]**

- **Launch catalog & Live TV:** A deliberately lean, high-quality set spanning all seven categories (per `02_PRD.md` §2 objectives), launched concurrently with the 24-hour Live TV channel broadcasting the FPC schedule.
- **Month 1–3:** Deepen Spiritual Teaching and History (likely fastest to produce/license given existing `mysticpower.in` relationships and archival availability) while original Documentaries and Tourism content is in production.
- **Month 3–6:** Journalism & Long-Form and Literature categories mature; Family & Children category launches with purpose-built content (not adult content simply re-labeled, per `07_Information_Architecture.md` §3).
- **6+ months:** Interactive Live Event layer activates for major festival moments (outside the standard FPC schedule), timed for maximum cultural relevance and cross-platform promotion with the News and E-Commerce products (per `01_Report.md` §4).

# Sunad OTT — Information Architecture

**Companion document to:** `06_User_Flows.md`, `08_Content_Strategy.md`
**Purpose:** Define the structural skeleton — navigation, taxonomy, metadata — that all screens and flows are built on.

---

## 1. Navigation Tree

```
Sunad OTT
├── Home / होम
├── Browse / ब्राउज़ करें
│   ├── Documentaries / वृत्तचित्र
│   ├── Spiritual Teaching / आध्यात्मिक शिक्षा
│   ├── History & Heritage / इतिहास और विरासत
│   ├── Journalism & Long-Form / पत्रकारिता और दीर्घ-रूप
│   ├── Tourism & Pilgrimage / पर्यटन और तीर्थयात्रा
│   ├── Literature / साहित्य
│   └── Family & Children / परिवार और बच्चे
├── Live / लाइव                      (Phase 2, per `02_PRD.md` §11)
├── Search / खोजें
├── My List / मेरी सूची
├── Downloads / डाउनलोड               (mobile-primary)
└── Profile / प्रोफ़ाइल
    ├── Manage Profiles
    ├── Settings
    ├── Subscription
    └── Help & Support
```

**Design rule:** the top-level tree stays flat and shallow (maximum 2 levels from Home to any category page) — consistent with `03_Design.md` §2's "restraint reads as trust" principle. Depth and richness live inside categories (via collections and metadata filtering), not in an expanding navigation tree.

## 2. Content Hierarchy

```
Platform
 └── Category (e.g., Documentaries)
      └── Collection (editorial, e.g., "Temples of the South")   [optional grouping layer]
           └── Series (optional, for multi-part content)
                └── Title / Episode
                     └── Segment / Chapter (for long-form navigation within a single title)
```

Not all content requires every layer — a standalone documentary film sits directly under a Category (optionally also tagged into one or more Collections), while a discourse series sits under Category → Series → Episode.

## 3. Categories (Top-Level Taxonomy)

Rationale for each category traces directly to `01_Report.md` §9 (Content Strategy Implications) and the brief's explicit civilizational breadth mandate:

| Category | Definition | Explicitly excludes |
|---|---|---|
| **Documentaries** | Nonfiction long-form on culture, craftsmanship, arts, regional identity | Scripted drama, reenactment-heavy "mythology serial" content |
| **Spiritual Teaching** | Discourse, philosophy, scripture-context, teacher-led content, presented in a scholarly/calm register | Liturgical live-broadcast (aarti feeds, temple darshan livestreams) — those belong to `Live` (Phase 2), kept visually/tonally separate from on-demand editorial content |
| **History & Heritage** | Documented history, archaeology, architecture, biography of historical (not mythological) figures | Unsourced or purely legendary content presented as history |
| **Journalism & Long-Form** | Explanatory/investigative long-form video journalism, distinct from the sibling News platform's daily-news function | Breaking news, daily bulletins (owned by the News product) |
| **Tourism & Pilgrimage** | Travelogue-style content on places, routes, seasonal pilgrimage | Advertorial/sponsored place promotion without editorial standards |
| **Literature** | Author interviews, readings, adaptations, contextualized classic texts | Uncredited or uncontextualized text reproduction (copyright discipline applies here as much as anywhere) |
| **Family & Children** | Age-appropriate heritage storytelling, produced to full Sunad production standard | Content that is simply "adult content with a kids' label" — this category requires purpose-built production, not filtering |

## 4. Collections (Editorial Grouping Layer)

Collections are the primary lever for the "editorial-first" brand promise (`04_Web_Experience.md` §3–4). Examples of collection *types* (not specific titles, since actual programming is a content-ops decision):

- **Seasonal/Festival collections** (tied to the Hindu calendar overlay in `02_PRD.md` §8)
- **Regional collections** (e.g., a state or region's craft/history/cuisine/architecture, cutting across Documentaries/Tourism/History categories)
- **Teacher/Scholar collections** (all content featuring a given teacher or historian, cutting across Spiritual Teaching/History)
- **"New This Month"** and **"Sunad Originals"** (production-provenance collections)
- **Thematic collections** (e.g., "Craftsmanship," "Sacred Architecture," "Women in Indian History") — this is where curatorial point-of-view and taste become visible, and is a key differentiator vs. purely algorithmic competitors

## 5. Metadata Schema (per Title)

| Field | Notes |
|---|---|
| Title (EN) / Title (HI) | Both authored natively, not machine-translated (per `03_Design.md` mandate) |
| Synopsis (EN) / Synopsis (HI) | Same |
| Category (one primary) | From §3 taxonomy |
| Collections (many-to-many) | From §4 |
| Content type | Documentary / Discourse / Interview / Reading / Travelogue / Series-Episode |
| Region | Geographic tag (state/region of India, or "Diaspora"/"Global" where relevant) |
| Era/Period | For History content — enables chronological browsing |
| Featured people | Scholars, teachers, artisans, historians featured — links to a People/Profiles data type |
| Language(s) available | Audio track languages, subtitle track languages |
| Duration | Runtime |
| Content rating | Age-appropriateness, especially for Family & Children category |
| Sensitivity/context flags | Internal editorial flag for content requiring careful framing (see `08_Content_Strategy.md` editorial governance) |
| Rights/licensing window | For licensed vs. owned/original content, ties to Downloads expiry (`06_User_Flows.md` §10) |
| Related titles | Manually curated + algorithmically suggested, kept as separate fields so editorial can always override |

## 6. Taxonomy Governance

- Category and Collection taxonomy is **owned by an editorial function**, not auto-generated from tags — protects against category drift back toward devotional-broadcast defaults, the single largest risk identified in `01_Report.md` §12.
- A controlled vocabulary for People, Regions, and Eras prevents fragmented/duplicate tags (e.g., "Varanasi" vs. "Banaras" vs. "Kashi" should resolve to one canonical entity with aliases for search).
- Bilingual taxonomy: every category, collection, and tag has both an English and Hindi canonical label from the start — not a UI string swap applied later.

## 7. Search Architecture

- **Index fields:** title (both languages), synopsis (both languages), transliterated/romanized variants, featured people, region, era, category/collection membership, spoken language in content.
- **Transliteration tolerance:** search should normalize common Hindi-to-Latin transliteration variants (e.g., "Krishna"/"Krishn"/"कृष्ण" resolve to the same entity) — a functional requirement, not a nice-to-have, per `02_PRD.md` FR-4.
- **Result grouping:** Titles / People / Topics & Collections (per `06_User_Flows.md` Flow 6) rather than a single flat relevance-ranked list.
- **Editorial override:** ability for content ops to pin/boost specific results for high-traffic queries (e.g., ensure a festival-relevant collection surfaces prominently during that festival's search spike) — technical requirement documented further in `10_Technical_Notes.md`.
- **Zero-result handling:** always resolves to an editorial fallback rather than a dead end (per `06_User_Flows.md` §6).

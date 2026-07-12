# Sunad OTT — Information Architecture

**Companion document to:** `06_User_Flows.md`, `08_Content_Strategy.md`
**Purpose:** Define the structural skeleton — navigation, taxonomy, metadata — that all screens and flows are built on.

---

## 1. Navigation Tree

```
Sunad OTT
├── Home / होम
├── Live TV / लाइव टीवी
├── Browse / ब्राउज़ करें
│   ├── Documentaries / वृत्तचित्र
│   ├── Culture & Heritage / संस्कृति और विरासत
│   ├── History & Civilization / इतिहास और सभ्यता
│   ├── Spiritual Knowledge / आध्यात्मिक ज्ञान
│   ├── Yoga & Ayurveda / योग और आयुर्वेद
│   ├── Art & Crafts / कला और शिल्प
│   ├── Agriculture & Rural Innovation / कृषि और ग्रामीण नवाचार
│   ├── Education & Skill Development / शिक्षा और कौशल विकास
│   ├── Entrepreneurship / उद्यमिता
│   ├── Tourism & Heritage Walks / पर्यटन और विरासत यात्रा
│   └── Family & Children / परिवार और बच्चे
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

In accordance with Slide 5 of `sunad OTT ppt.pdf`, the content taxonomy is organized into 11 main topics to reflect the civilizational breadth of Bharat:

| Category | Definition | Key Themes / Formats Included |
|---|---|---|
| **Documentaries** | Nonfiction long-form films on culture, regional identity, and craftsmanship | Single-sitting films, docuseries, investigations |
| **Culture & Heritage** | Festivals, rituals, regional customs, and traditional lifestyles | Festival broadcasts, cultural web series, folk heritage |
| **History & Civilization** | Documented history, archaeology, ancient architecture, and biographies | Historical timelines, archaeological studies, dynasties |
| **Spiritual Knowledge** | Discourse, Upanishads, Vedas, Gita philosophy, and teacher-led series | Scholar lectures, podcasts, guru-disciple Q&A |
| **Yoga & Ayurveda** | Traditional Indian medicine, yoga postures, and mental health | Asanas, Ayurvedic nutrition, wellness tips |
| **Art & Crafts** | Documentation of traditional crafts, pottery, weaving, and local artists | Artisan stories, craft workshops, handloom preservation |
| **Agriculture & Rural Innovation** | Stories of farmers, organic farming techniques, and rural technology | Organic farming docuseries, rural innovation stories |
| **Education & Skill Development** | Civilizational science, linguistics, learning series, and universities | Ancient technology, language learning, course series |
| **Entrepreneurship** | Leadership interviews, local business successes, and startups | Success India, startup profiles, leader podcasts |
| **Tourism & Heritage Walks** | Travelogues, sacred routes, historic temples, and tourism | Temple walks, pilgrim travel logs, heritage city walks |
| **Family & Children** | Clean, animated civilizational stories and moral values for kids | Kids Dharma, Panchatantra animations, Ramayana/Mahabharata |

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

## 8. Live TV & EPG Content Mapping

To ensure a seamless transition between the linear Live TV broadcast and the on-demand library, shows broadcasted on the FPC are mapped directly to primary on-demand categories and tagged accordingly:

| FPC Show Name | Primary On-Demand Category | Key Metadata Tags |
|---|---|---|
| **प्रभात भारत** (*Prabhat Bharat*) | Spiritual Knowledge | Devotion, Yoga, Meditation, Morning Rituals |
| **आरोग्य भारत** (*Arogya Bharat*) | Yoga & Ayurveda | Wellness, Ayurveda, Naturopathy, Health |
| **भारत समाचार** (*Bharat Samachar*) | Culture & Heritage | Positive News, Science, Agriculture, Technology |
| **सनातन ज्ञान** (*Sanatan Gyan*) | Spiritual Knowledge | Vedic Wisdom, Gita, Upanishads, Philosophy |
| **Mystic Files** | Documentaries | Mysteries, Sacred Science, Shiva, Shakti, Nath |
| **भारत यात्रा** (*Bharat Yatra*) | Tourism & Heritage Walks | Pilgrimage, Travelogue, Heritage Tourism |
| **Indian Heritage** | History & Civilization | Archaeology, Ancient Civilizations, History |
| **Success India** | Entrepreneurship | Motivation, Startups, Youth, Innovation |
| **Food & Culture** | Culture & Heritage | Cuisine, Prasad, Temple Kitchens, Rural Cooking |
| **Village India** | Culture & Heritage | Rural Arts, Folk Culture, Tribal Heritage |
| **Kids Dharma** | Family & Children | Panchatantra, Animation, Moral Values |
| **Women of India** | Entrepreneurship | Inspiration, Women Empowerment, Health |
| **Live Temple Connect** | Culture & Heritage (Live TV Special) | Live Broadcast, Pilgrimage, Aarti, Temples |
| **भारत संवाद** (*Bharat Samvad*) | Education & Skill Development | Discourse, Education, Panel, National Issues |
| **तंत्र रहस्य** (*Tantra Rahasya*) | Spiritual Knowledge | Esoteric, Tantra Shastra, Kundalini, Yoga |
| **Mystic Bharat** | Documentaries | Mysteries, Energy Sites, History, Scientific Analysis |
| **Real Bharat Documentary** | Documentaries | Investigation, Ancient Technology, Exclusives |
| **Spiritual Podcast** | Spiritual Knowledge | Podcast, Interview, Gurus, Scientific Discourse |
| **दिवस का सार** (*Divas Ka Saar*) | Culture & Heritage | Summary, Daily Highlights, News |

## 9. Commerce Product Metadata Schema

To support the e-commerce store integration ("Content + Commerce") defined in Slide 9 of `sunad OTT ppt.pdf`, products are linked to media titles using the following database schema:

| Metadata Field | Type | Description / Notes |
|---|---|---|
| **Product ID** | UUID | Unique product SKU identifier |
| **Bilingual Name** | String (EN / HI) | Product title in both English and Devanagari |
| **Product Type** | Enum | `Artisan` (crafts), `Organic` (food), `Wellness` (health), `Spiritual` (sadhana/ritual), `Ticket` (live events), `Course` (educational modules) |
| **Linked Media IDs** | List of UUIDs | Content titles where this product overlay is active |
| **Price** | Decimal | Local and diaspora currencies (INR / USD / GBP etc.) |
| **Stock Status** | Boolean | Inventory availability check |
| **Artisan ID / Vendor ID** | UUID | Connects to the local creator/artisan profile, supporting Slide 7's Partner Platform |

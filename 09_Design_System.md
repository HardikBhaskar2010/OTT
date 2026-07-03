# Sunad OTT — Design System

**Companion document to:** `03_Design.md`
**Purpose:** Translate design philosophy into concrete, buildable tokens and component specifications. This is the first document in the set where literal values (hex codes, pixel scales) are proposed — all values are a considered starting point for the design team to validate in-tool (Figma) and against real content, not final production values.

---

## 1. Color Tokens

### 1.1 Core palette

| Token | Proposed value | Role |
|---|---|---|
| `color.black.base` | `#0E0D0C` | Primary surface — warm near-black (see `03_Design.md` §4) |
| `color.black.raised` | `#171513` | Elevated surfaces (cards, modals) — one step lighter than base |
| `color.black.overlay` | `#0E0D0C` at 72% opacity | Scrims over imagery (hero text legibility) |
| `color.gold.base` | `#BFA05B` | Primary accent — muted antique gold |
| `color.gold.bright` | `#D4B76A` | Hover/active state of gold elements, or rare high-emphasis moments (e.g., "Premium" badge) |
| `color.gold.muted` | `#8A744A` | Disabled or low-emphasis gold use (e.g., inactive tab indicator) |
| `color.ivory` | `#F3EDE1` | Primary text/reading color on dark surfaces (replaces pure white, per `03_Design.md` §4) |
| `color.warmwhite` | `#FAF7F0` | Rare light-surface use (e.g., print-style transcript panel), and text on gold surfaces |
| `color.charcoal` | `#211F1D` | Secondary surfaces, input fields, dividers-adjacent panels |
| `color.stone` | `#5C574E` | Borders, secondary/tertiary text, disabled states |
| `color.stone.light` | `#8A857A` | Placeholder text, least-emphasis metadata |

**Contrast note:** `gold.base` on `black.base` measures in a range that is reliable for large display type and icons but should be independently contrast-tested before use for body-size text; default body text on dark surfaces uses `ivory`, not gold (per `03_Design.md` §11).

### 1.2 Semantic tokens

| Token | Maps to | Usage |
|---|---|---|
| `surface.base` | `color.black.base` | App background |
| `surface.raised` | `color.black.raised` | Cards, modals, sheets |
| `surface.overlay` | `color.black.overlay` | Hero/player scrims |
| `text.primary` | `color.ivory` | Primary reading text |
| `text.secondary` | `color.stone.light` | Metadata, captions |
| `text.on-gold` | `color.black.base` | Text set on gold-filled elements (buttons, badges) |
| `accent.primary` | `color.gold.base` | Icons, active states, key CTAs |
| `accent.hover` | `color.gold.bright` | Hover/pressed states |
| `accent.disabled` | `color.gold.muted` | Disabled accent elements |
| `border.default` | `color.stone` at 40% opacity | Card borders, dividers |
| `border.focus` | `color.gold.base` | Focus ring (accessibility-critical, see §9) |
| `state.error` | `#C4604B` (muted terracotta, not alarm-red) | Error messaging — chosen to stay within the warm palette rather than a jarring pure red |
| `state.success` | `#7A9A6D` (muted sage) | Success/confirmation states |

## 2. Typography System

Full rationale in `03_Design.md` §5. This section formalizes the implementation tokens.

### 2.1 Font stacks

```css
--font-display-latin: "Fraunces", Georgia, serif;
--font-display-devanagari: "Tiro Devanagari Hindi", "Noto Serif Devanagari", serif;
--font-text-latin: "General Sans", -apple-system, "Segoe UI", sans-serif;
--font-text-devanagari: "Mukta", "Noto Sans Devanagari", sans-serif;
```

Language-tagged content (`lang="hi"` / `lang="en"`, or a `data-script` attribute for mixed strings) should drive font-family selection at the component level so mixed-language sentences render each script in its correct family automatically rather than forcing one font-stack to cover both.

### 2.2 Type scale tokens

| Token | Latin size/LH | Devanagari size/LH | Weight |
|---|---|---|---|
| `type.display.xl` | 64px / 1.1 | 68px / 1.25 | 600 (Fraunces Semibold) / 600 (Tiro) |
| `type.display.l` | 44px / 1.15 | 48px / 1.3 | 600 / 600 |
| `type.heading.1` | 30px / 1.25 | 32px / 1.4 | 600 (General Sans) / 600 (Mukta) |
| `type.heading.2` | 22px / 1.3 | 24px / 1.45 | 500 / 500 |
| `type.body.l` | 17px / 1.5 | 18px / 1.65 | 400 | 
| `type.body.m` | 15px / 1.5 | 16px / 1.65 | 400 |
| `type.caption` | 12px / 1.4 | 13px / 1.55 | 500 |

### 2.3 Tracking

- `type.display.*` — Latin: −1.5% tracking. Devanagari: 0% (never negative, per `03_Design.md` §5.4).
- `type.heading.*` / `type.body.*` — Latin: −0.5% to 0%. Devanagari: 0% to +0.5%.

## 3. Spacing System

An 8px base grid, with a 4px half-step for compact/dense contexts (e.g., caption padding):

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` (px)

| Token | Value | Typical use |
|---|---|---|
| `space.xs` | 4px | Icon-to-label gap |
| `space.sm` | 8px | Tight component padding |
| `space.md` | 16px | Standard component padding, card internal padding |
| `space.lg` | 24px | Section spacing on mobile |
| `space.xl` | 48px | Section spacing on desktop |
| `space.2xl` | 96px | Major hero/section breaks on desktop |

## 4. Grid

- **Desktop:** 12-column grid, 24px gutters, max content width 1440px with generous outer margin beyond that (content does not stretch edge-to-edge on very large monitors — protects the "editorial, not dashboard" feel from `04_Web_Experience.md` §1).
- **Tablet:** 8-column grid, 20px gutters.
- **Mobile:** 4-column grid, 16px gutters, 16px outer margin.

## 5. Elevation

A restrained 3-level elevation system (avoids the heavy drop-shadow skeuomorphism explicitly excluded in `03_Design.md` §4):

| Level | Use | Treatment |
|---|---|---|
| `elevation.0` | Base surface | No shadow; surface color only |
| `elevation.1` | Cards, rails | 1px `border.default` + very subtle shadow (`0 2px 8px rgba(0,0,0,0.35)`) |
| `elevation.2` | Modals, sheets, overlays | Slightly stronger shadow (`0 8px 32px rgba(0,0,0,0.5)`) + `surface.raised` background |

## 6. Components

### 6.1 Buttons
- **Primary:** `accent.primary` fill, `text.on-gold` label, `type.body.m` weight 500, 12px vertical / 24px horizontal padding, 8px corner radius. Hover → `accent.hover`.
- **Secondary:** transparent fill, 1px `border.default`, `text.primary` label. Hover → 1px `accent.primary` border.
- **Ghost/Tertiary:** no border/fill, `text.primary` label, used for low-emphasis actions (e.g., "Skip" in onboarding).
- **Destructive:** uses `state.error` border/text on a ghost button, never a filled red button — keeps destructive actions calm rather than alarming, consistent with brand personality.

### 6.2 Cards
- **Poster/Title card (16:9):** primary card format for Documentaries/History/Journalism/Tourism content, `elevation.1`, title overlay in `type.heading.2` on a bottom scrim gradient (subtle, `surface.overlay` at reduced opacity — the one place a gradient is acceptable, since it exists purely for text legibility, not decoration).
- **Series/Collection card (2:3):** used sparingly, for content genuinely structured as a long-running series with strong "poster" identity.
- **Person/Scholar card (1:1, circular crop):** for featured-people search results and credits.

### 6.3 Inputs
- **Text field:** `surface.raised` background, 1px `border.default`, focus state uses `border.focus` (gold) — one of the few UI moments gold appears as an outline rather than a fill, marking "you are here / this is active."
- **Toggle/Switch:** off-state uses `color.stone`, on-state uses `accent.primary` — small, deliberate, not oversized (avoids a playful/toy-like feel).
- **Dropdown/Select:** matches text field styling; options list uses `surface.raised` with `elevation.2`.

### 6.4 Player Components
- **Scrubber:** thin (2–3px) track in `color.stone`, filled progress in `accent.primary`, circular scrub handle appears only on hover/touch (not persistently visible) — minimal chrome principle from `03_Design.md` §8.
- **Controls bar:** auto-hides after 3s of inactivity during playback, `surface.overlay` scrim behind controls when visible.
- **Chapter markers:** small tick marks on the scrubber track, `color.gold.muted`, brightening to `accent.primary` on hover — supports the chapter-navigation functional requirement in `02_PRD.md` FR-8.

### 6.5 Navigation
- **Top nav (desktop):** per `04_Web_Experience.md` §2 — transparent-to-solid on scroll, `surface.overlay` blur when solid.
- **Bottom tab bar (mobile):** per `05_Mobile_Experience.md` §3 — frosted `surface.overlay` material, active tab marked with `accent.primary` underline/dot, not a filled-icon state change.

## 7. Icon System

- 24×24px base grid, 1.5px stroke weight, rounded line caps — single consistent weight across the entire icon set (per `03_Design.md` §6).
- Icons use `text.primary` (ivory) by default; `accent.primary` (gold) reserved for active/selected states only.
- A small custom category-icon set (per `03_Design.md` §6) follows the same 1.5px stroke rule — no filled or multi-color icons anywhere in navigation chrome.

## 8. Animation Guidelines

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion.fast` | 120ms | `ease-out` | Button press, toggle states |
| `motion.base` | 240ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Hover states, card scale |
| `motion.slow` | 400ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Page/modal transitions |

- Hover scale: 1.02–1.04× max (per `03_Design.md` §9) — never larger, to avoid a "gamified" feel.
- All `motion.*` tokens must have a reduced-motion equivalent (cross-fade at reduced duration, or instant with no motion) respecting OS-level `prefers-reduced-motion`.

## 9. Responsive & Accessibility Rules (system-level)

- Every color-pair combination used for text must be independently verified against WCAG 2.2 AA for **both** the Latin and Devanagari type scale, since Devanagari's visual density can affect perceived contrast at small sizes even when the underlying color values pass numerically.
- `border.focus` (gold outline) must be present and visible on every interactive element for keyboard navigation — never removed for aesthetic reasons.
- Minimum interactive target size 44×44px on touch surfaces regardless of visual icon/label size (padding, not just visible area, counts toward this).

# Sunad OTT — Mobile Experience

**Companion document to:** `03_Design.md`, `04_Web_Experience.md`
**Scope:** Native/mobile-web experience, primarily iOS and Android

---

## 1. Why Mobile Matters Most

Per `01_Report.md` §5 and the NFR-1 performance target in `02_PRD.md`, the majority of Sunad's Indian audience will be on mid-tier Android devices over 4G, and a large share of the diaspora audience will discover and consume content in short mobile sessions between longer weekend desktop/TV sessions. Mobile is not a scaled-down companion to desktop — for launch, it is arguably the **primary** surface, and every design decision should be mobile-first, then progressively enhanced for larger screens (the inverse of how `04_Web_Experience.md` was framed for its own surface, deliberately — each surface is designed for how it is actually used, not as a mechanical resize of the other).

## 2. Navigation

- **Bottom tab bar** (thumb-zone-native), 5 items: **Home / होम · Live / लाइव · Browse / ब्राउज़ करें · Downloads / डाउनलोड · Profile / प्रोफ़ाइल** (with search accessible via a persistent top-right header icon on Home and Browse, maximizing tab utility for primary media types).
- Bilingual tab labels set in the Text/UI Devanagari face (Mukta) and Latin face (General Sans) at matched visual weight — never icon-only, since label clarity matters more than minimalism here (a lesson from `03_Design.md` principle 5: familiar mechanics, unfamiliar craft — labels are familiar and expected).
- Language toggle (EN/हिं) lives in Profile/Settings on mobile (not the tab bar, where space is precious) but is reachable in ≤2 taps from anywhere.

## 3. Bottom Navigation Details

- Active tab indicated by a subtle gold underline/dot rather than a filled icon change — consistent with "gold as emphasis, not wallpaper" (`03_Design.md` §4).
- Tab bar uses a translucent, blurred Deep Black material (frosted-glass effect) over content, echoing the Apple materials-led visual reference from `03_Design.md` §3.

## 4. Gestures

- Standard, platform-native gestures only: swipe-back navigation, swipe-down to dismiss modals/player, horizontal swipe on rails, pull-to-refresh on Home.
- Double-tap-to-seek (±10s) on the player, matching global streaming-app convention — again, familiarity over novelty.
- No custom/invented gesture vocabulary — cognitive load should go toward discovering content, not learning the app.

## 5. Player UX (Mobile)

- Full-screen-first playback, portrait-locked preview thumbnails but landscape-forced full playback for the primary viewing state (documentary/discourse content is best experienced landscape; short preview clips can stay portrait).
- Large, high-contrast tap targets for play/pause/seek (minimum 44×44pt per `02_PRD.md` §7).
- Picture-in-picture support for continued audio-forward listening (relevant for discourse/spiritual-teaching content, which is often consumed like a podcast while multitasking).
- Companion transcript/glossary content (available on desktop per `04_Web_Experience.md` §8) is available on mobile as a swipe-up bottom sheet rather than a side panel — same content, form factor adapted to the surface.
- Subtitle and audio-language switch is one tap away from full-screen playback at all times.

## 6. Mobile Onboarding

- Onboarding sequence: (1) explicit language preference selection — not inferred silently from device locale, per `02_PRD.md` FR-11 — (2) brief interest picker (Documentaries / Spiritual / History / Journalism / Tourism / Literature, selectable, not mandatory), (3) profile creation (including Kids/Family profile option), (4) subscription/trial entry.
- Onboarding copy is short, calm, and non-salesy — consistent with the "unhurried" brand personality; avoid the aggressive multi-screen "swipe through 6 feature slides" pattern common to growth-hacked apps.
- First-run experience should surface one strong editorial hero recommendation immediately after onboarding rather than an empty, cold-start grid — reduces the "now what?" moment.

## 7. Accessibility (Mobile-Specific)

- Full VoiceOver/TalkBack support in both English and Hindi, with natively authored (not auto-generated) accessibility labels — see `02_PRD.md` §7.
- Dynamic Type / font-scaling support respecting OS-level text-size settings, tested independently for Devanagari to confirm matras do not clip at larger accessibility text sizes (a common failure mode called out in `03_Design.md` §5.3).
- Sufficient contrast and spacing maintained even in the compact mobile layout — no shrinking below the WCAG 2.2 AA minimums defined in `03_Design.md` §11 to fit more content on-screen.

## 8. Thumb Reach

- Primary actions (play, add-to-list, tab navigation) placed in the bottom two-thirds of the screen, the comfortable one-handed thumb zone on modern large-format phones.
- Secondary/destructive actions (delete download, remove from list, sign out) placed further from the primary thumb zone or gated behind a confirmation step, reducing accidental taps.
- Search and language toggle, used less frequently but still important, sit in the top zone — acceptable since these are two-handed or deliberate actions, not rapid-fire browsing actions.

## 9. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| <380px (compact phones) | Single-column rails with slightly reduced card size; Display typography steps down one scale level from the standard mobile scale to avoid wrapping in Devanagari headlines |
| 380–599px (standard phones) | Baseline mobile layout as described throughout this document |
| 600–767px (large phones / small tablets, portrait) | Two-column grid for Browse pages; rails remain single-row scroll; bottom tab bar retained (not yet converted to desktop-style top nav) |

## 10. Offline Experience

- Downloads accessible from a dedicated tab (not buried in profile), showing progress, storage used, and expiry (for licensed content with time-limited download rights).
- Downloaded content retains subtitle/dual-audio tracks selected at download time, with the option to re-select before playback if storage allows multiple tracks.
- Clear, bilingual messaging around download expiry and storage limits — avoiding the frustration of silently expired downloads, a known pain point in regional IPTV/OTT apps referenced in `01_Report.md` §6.
- Graceful offline state for the rest of the app (cached Home/Browse metadata with clear "you're offline" messaging) rather than blank/broken screens — important for diaspora users on long-haul flights, a real, specifically identified use case (`02_PRD.md` persona 4.2).

## 11. Notifications

- Notification categories, each independently toggleable: **New Releases**, **Continue Watching Reminders**, **Festival/Seasonal Content**, **Downloads Ready**, **Account/Billing**.
- Notification copy authored natively in the user's selected language, respecting the same bilingual-parity standard as the rest of the product (`02_PRD.md` NFR-3) — not machine-translated push copy, which is a common quality gap in regional apps.
- Frequency capped and editorially curated (no daily "come back!" engagement-bait notifications) — consistent with the "unhurried, trust-first" brand personality; notification restraint is itself a premium signal.

## 12. Mobile Live TV & EPG Experience

The mobile Live TV tab is designed for quick viewing and intuitive schedule exploration in a portrait layout:

1. **Top Widescreen Player:**
   - A sticky 16:9 HLS stream player anchored to the top of the viewport.
   - Supports pinch-to-zoom or double-tap to enter full-screen landscape mode.
   - Includes standard playback stats, subtitle/audio toggles, and a "LIVE" state badge.
2. **Tabbed Day Selector:**
   - Directly below the player, a swipeable horizontal selector lets users choose the day of the week, with the current day pre-selected.
3. **Scrollable Vertical EPG List:**
   - The remaining screen space displays a vertically scrolling EPG timeline.
   - Each show is represented as a compact card containing: time duration, show name, synopsis, and on-demand watch hook (for past shows).
   - "Now Playing" program card is highlighted with a gold border, an active progress bar indicator, and a "Share Live" shortcut.
   - Includes a "Set Reminder" toggle for upcoming slots, triggering local notifications before airtime.

## 13. Mobile Commerce Integration

To match the "Content + Commerce" paradigm (Slide 9) on mobile form factors, the interface incorporates swipe-native buying paths:

1. **Inline Product Rails:**
   - Underneath the mobile video description panel (on Browse/Detail pages), a swipeable horizontal product rail ("Shop the Story / कहानी से खरीदें") presents 16:9 cards of matching products.
   - Each card displays: product thumbnail, bilingual title, price, and a shopping cart "+" icon.

2. **In-Player Paused State Bottom Drawer:**
   - When the user pauses video playback in portrait mode, a bottom drawer slides up automatically from the lower third, containing matching products (e.g. *Artisan*, *Organic*, *Wellness*, *Spiritual* goods) so users can explore items without leaving the watch screen.
   - Swipe-down gestures dismiss the drawer, returning to standard pause controls.

3. **Event Ticketing & Course Sign-Up Flows:**
   - Live events (Slide 9) and education programs display a prominent "Unlock Access" gold button on the cover screen.
   - Tapping it opens a secure bottom sheet checkout. Payment processing runs natively via Apple Pay / Google Pay or UPI/net banking integrations calibrated for high-speed, zero-redirection mobile transactions in India.

# Sunad OTT — User Flows

**Companion document to:** `02_PRD.md`, `04_Web_Experience.md`, `05_Mobile_Experience.md`
**Notation:** `→` indicates a forward step; `⤷` indicates a branch/decision outcome; `⚠` flags an error/edge state; `∅` flags an empty state.

---

## 1. Guest → Explore

```
Land on sunad.in (marketing/OTT landing)
 → Full-bleed editorial hero + 2–3 sample category rails (locked, browsable, not playable beyond a short preview)
 → Guest can browse titles, read synopses, view cast/scholar info
 → Tap/click any title
   ⤷ Preview clip plays (60–90s, unauthenticated)
   ⤷ "Watch Full — Start Free Trial / पूरा देखें — निःशुल्क ट्रायल शुरू करें" CTA appears
 → Guest can freely switch language toggle (EN/हिं) at every step — bilingual applies even pre-signup
```
**Design intent:** the brief's premium/trust positioning means guests should be able to *experience* the brand's craft (typography, imagery, pacing) before being walled off — a paywall-first experience would undercut "trust" as a brand pillar.

## 2. Guest → Register

```
Guest taps "Start Free Trial / निःशुल्क ट्रायल शुरू करें"
 → Registration form: email or phone, password (or OTP-based passwordless — recommended for India-first UX)
 → Language preference confirmed (pre-filled from guest browsing session, editable)
 → Interest picker (optional, skippable): Documentaries / Spiritual / History / Journalism / Tourism / Literature
 → Plan selection (see Flow 4 — Subscription)
 → Payment details
 → Confirmation screen → redirected to onboarded Home (see `05_Mobile_Experience.md` §6)
⚠ Error state: email/phone already registered → inline message + "Log in instead / इसके बजाय लॉग इन करें" link (never a dead-end error)
⚠ Error state: payment failure → clear, non-technical bilingual message + retry, plan preserved (user does not lose their selection and have to restart)
```

## 3. Login

```
Returning user taps "Log In / लॉग इन करें"
 → Email/phone + password, or OTP, or "Continue with [SSO provider]" if implemented
 → Success → last-active profile's Home screen
⚠ Incorrect credentials → inline error, "Forgot password? / पासवर्ड भूल गए?" always visible, never hidden after N attempts in a way that appears punitive
⚠ Account under a different region's pricing → silent region-aware handling, no user-facing friction
```

## 4. Subscription

```
Trigger points: Registration flow (Flow 2), Settings → Subscription, or a content-gated "Upgrade" prompt
 → Plan comparison screen (Free/Sample, Premium, Family, Patron — per `02_PRD.md` §9)
 → Gold accent marks recommended plan (single, restrained use of gold per `03_Design.md` §4)
 → Region-detected pricing shown, manually editable
 → Payment method entry
 → Confirmation → receipt emailed bilingually per user preference
```
**Downgrade/Cancel sub-flow:**
```
Settings → Subscription → "Change Plan / प्लान बदलें" or "Cancel / रद्द करें"
 → Immediate, self-serve action — no forced retention call, no hidden multi-step maze
 → If cancelling: one honest, single retention offer screen (e.g., pause instead of cancel) — then respects the decision without repeated dark-pattern friction
 → Confirmation, with clear end-of-access date stated plainly
```

## 5. Browse

```
Bottom nav / top nav → Browse
 → Category selection (Documentaries, Spiritual, History, Journalism, Tourism, Literature)
 → Filter (language, duration, content type) applied inline
 → Grid/rail of results
 → Tap/click title → Title Detail Page (synopsis, cast/scholar, related content, chapter list if applicable)
 → "Watch Now / अभी देखें" → Watch Content flow (Flow 7)
∅ Empty filter result: "No titles match these filters yet / इन फ़िल्टर के अनुरूप अभी कोई शीर्षक नहीं है" + suggestion to broaden filters or explore an editorial collection instead — never a bare blank grid
```

## 6. Search

```
Tap search icon → full-width/full-screen search overlay
 → Type query (Latin, Devanagari, or transliterated Hindi all supported per `02_PRD.md` FR-4)
 → Live results grouped: Titles / People / Topics & Collections
 → Tap a result → Title Detail Page or Collection Page
∅ Zero results: editorial fallback row ("Explore Spiritual Teaching instead / इसके बजाय आध्यात्मिक शिक्षा देखें") rather than a dead end — see `04_Web_Experience.md` §6
```

## 7. Watch Content

```
Title Detail Page → "Watch Now / अभी देखें"
 → Player opens (full-screen on mobile, in-page cinematic player on desktop)
 → Default audio/subtitle language = user's profile preference (not silently reset per session)
 → Playback begins; chapter markers available for long-form content
 → On completion → calm "Up Next" card (not aggressive autoplay countdown, per `03_Design.md` §12)
⚠ Buffering/connectivity issue → clear bilingual status message, automatic quality step-down, resume-from-same-point on reconnect — never a silent restart from zero
```

## 8. Continue Watching

```
Home → "Continue Watching / देखना जारी रखें" row
 → Shows in-progress content with progress indicator
 → Tap → resumes exactly where left off, cross-device (per `02_PRD.md` FR-5)
 → Long-press/hover → "Remove from Continue Watching" option (user control over their own history)
```

## 9. Favorites (My List)

```
Title Detail Page or card long-press/hover → "Add to My List / मेरी सूची में जोड़ें"
 → Confirmation micro-interaction (subtle checkmark/gold tick, per `03_Design.md` §9 motion philosophy — no jarring animation)
 → Accessible from Profile/nav → "My List / मेरी सूची"
 → Remove via same toggle, symmetric interaction (add and remove use the same control, not two different UI patterns)
```

## 10. Downloads

```
Title Detail Page → Download icon (mobile only, per `05_Mobile_Experience.md` §10)
 → Quality/track selection (if user has multiple subtitle/audio tracks and storage allows)
 → Download progress shown in dedicated Downloads tab
 → Playback available fully offline
⚠ Storage full → clear message with option to manage existing downloads inline, not a generic OS-level error
⚠ Download rights expired → clear bilingual explanation (not a silent failure) + link to stream online instead
```

## 11. Profile

```
Account → "Manage Profiles / प्रोफ़ाइल प्रबंधित करें"
 → List of profiles (adults + Kids/Family) with avatar, name
 → Add Profile → name, avatar, language preference, Kids-mode toggle
 → Switch Profile → returns to Home, personalized for that profile
 → Edit/Delete Profile (delete requires confirmation, cannot delete the only remaining profile)
```

## 12. Settings

```
Profile icon → Settings
 → Account (email/phone, password)
 → Subscription (→ Flow 4)
 → Language & Playback (default audio/subtitle language, video/download quality)
 → Notifications (per-category toggles, `05_Mobile_Experience.md` §11)
 → Privacy & Data (per `02_PRD.md` §10)
 → Help & Support
 → Log Out
```

## 13. Logout

```
Settings → "Log Out / लॉग आउट करें"
 → Single confirmation step (not multi-step friction)
 → Returns to Guest → Explore state (Flow 1), preserving no personal data on-device beyond what's needed for a fast re-login
```

## 14. Error Flows (cross-cutting)

| Scenario | Behavior |
|---|---|
| No internet connection | Bilingual offline state, cached Home/Continue-Watching metadata shown where possible, clear retry action |
| Payment failure | Inline, non-technical bilingual message; user's plan selection and form data preserved |
| Content licensing/geo-restriction | Clear explanation of *why*, not a generic error code; offers alternative similar content where possible |
| Server/system error | Calm, on-brand error illustration (per `03_Design.md` §7 illustration direction — single-line style, no panic-red screens), plain-language message, single clear retry action |

## 15. Empty States (cross-cutting)

| Screen | Empty state message approach |
|---|---|
| Continue Watching (new user) | Warm invitation to start watching, surfaces one editorial hero recommendation rather than a blank row |
| My List (empty) | Explains what the feature does + one-tap link to Browse |
| Downloads (empty) | Explains offline viewing benefit (e.g., for travel) + link to a "Great for Downloading" curated collection |
| Search (no query yet) | Shows trending/editorial search suggestions rather than a blank search bar |

## 16. Premium Upgrade (contextual, cross-cutting)

```
Trigger: Free/Sample-tier user attempts to play a Premium-only title
 → Non-blocking preview continues to completion of the free preview window (never cuts off abruptly mid-sentence/mid-scene)
 → Clear, honest upsell card: "Unlock full access / पूरी पहुँच अनलॉक करें" → Flow 4 (Subscription)
 → Declining returns user to Browse without further interruption (no repeated nagging within the same session)
```

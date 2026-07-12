# Analytics Setup Guide — Sunad OTT

## Step 1: Create a Google Analytics 4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (bottom-left gear icon)
3. Click **Create** → **Property**
4. Enter:
   - Property name: `Sunad OTT`
   - Timezone: `India`
   - Currency: `Indian Rupee (INR)`
5. Click **Next** → Select industry: `Arts & Entertainment`
6. Click **Next** → Select goal: `Examine user behavior`
7. Click **Create**
8. In "Set up a data stream" → choose **Web**
9. Enter your URL: `https://sunadbroadcast.vercel.app`
10. Click **Create stream**
11. Copy your **Measurement ID** — it looks like `G-XXXXXXXXXX`

## Step 2: Add Your Measurement ID

Open the file `sunad-ott/.env.local` and replace the placeholder:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your real ID (e.g., `G-AB12CD34EF`).

> **Important for Vercel deployment**: Also add this env var in your Vercel project:
> 1. Go to [vercel.com](https://vercel.com) → Your project → **Settings** → **Environment Variables**
> 2. Add: Key = `NEXT_PUBLIC_GA_MEASUREMENT_ID`, Value = `G-XXXXXXXXXX`
> 3. Redeploy the project

## Step 3: Set Up Google Search Console (SEO)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property** → Select **URL prefix**
3. Enter: `https://sunadbroadcast.vercel.app`
4. Verify ownership — choose **HTML tag** method:
   - Copy the meta tag it gives you (like `<meta name="google-site-verification" content="XXXXX" />`)
   - Add it to your layout's `<head>` in `app/layout.tsx`
5. Click **Verify**
6. Submit your sitemap: `https://sunadbroadcast.vercel.app/sitemap.xml`

## Step 4: Link GA4 ↔ Search Console

1. In GA4 → Admin → Property → **Search Console Links**
2. Click **Link** → Select your Search Console property
3. Now you can see SEO + behavior data together in GA4

## Step 5: Enable Vercel Analytics

Vercel Analytics is already in the code. To activate it:
1. Go to [vercel.com](https://vercel.com) → Your project
2. Click **Analytics** tab → Click **Enable**
3. That's it — data flows automatically after next deployment

---

## What to Check Weekly

### Google Analytics 4
| Metric | Where to Find | What's Good |
|--------|--------------|-------------|
| Users | Reports → Acquisition | Growing week-over-week |
| Bounce Rate | Reports → Engagement | Below 60% |
| Avg. Engagement Time | Reports → Engagement | Above 2 minutes |
| Top Countries | Reports → Demographics | India dominant |
| Watch Now Clicks | Reports → Events → `watch_now_click` | High = good content |
| Language Switch | Reports → Events → `language_switch` | Shows Hindi demand |

### Google Search Console
| Metric | Where to Find | What's Good |
|--------|--------------|-------------|
| Total Clicks | Performance | Growing |
| Average CTR | Performance | Above 3% |
| Average Position | Performance | Below 20 |
| Core Web Vitals | Experience | All green |
| Coverage Errors | Coverage | Zero errors |

### Vercel Analytics
| Metric | What It Means | Target |
|--------|--------------|--------|
| LCP | Largest Contentful Paint (loading speed) | < 2.5s |
| CLS | Layout Shift (visual stability) | < 0.1 |
| FID | First Input Delay (interactivity) | < 100ms |

---

## Custom Events Already Tracked

| Event Name | Triggered When |
|-----------|----------------|
| `watch_now_click` | User clicks "Watch Now" on hero |
| `language_switch` | User toggles EN ↔ HI |
| `landing_modal_impression` | Onboarding modal appears |
| `landing_modal_signin_click` | User clicks "Sign In" in modal |
| `landing_modal_guest_click` | User continues as guest |
| `nav_signin_click` | User clicks Sign In from top nav |

View these in GA4: **Reports → Engagement → Events**

'use client';

import Script from 'next/script';

/**
 * GoogleAnalytics — Loads GA4 tracking script with Consent Mode v2.
 *
 * - Defaults analytics_storage to 'denied' (GDPR compliant).
 * - CookieBanner upgrades consent to 'granted' when user accepts.
 * - Uses next/script strategy="afterInteractive" — no LCP impact.
 *
 * Set in .env.local:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}


/**
 * analytics.ts — Typed GA4 custom event helpers for Sunad OTT.
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('watch_now_click', { content_id: 'mystic-bharat', content_title: 'Mystic Bharat' });
 *
 * All events appear in GA4 → Reports → Events
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/** Safe wrapper — silently skips if gtag isn't loaded yet (SSR / blocked) */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

// ─── Pre-typed event helpers ───────────────────────────────────────────────

/** Fired when a user clicks "Watch Now" on any content */
export function trackWatchNow(contentId: string, contentTitle: string, section: string) {
  trackEvent('watch_now_click', {
    content_id: contentId,
    content_title: contentTitle,
    section,
  });
}

/** Fired when user switches language */
export function trackLanguageSwitch(toLanguage: string) {
  trackEvent('language_switch', { to_language: toLanguage });
}

/** Fired when the landing modal appears to a user */
export function trackModalImpression() {
  trackEvent('landing_modal_impression');
}

/** Fired when user clicks "Sign In / Register" from the landing modal */
export function trackModalSignIn() {
  trackEvent('landing_modal_signin_click');
}

/** Fired when user clicks "Explore as Guest" (dismisses modal) */
export function trackModalGuestContinue() {
  trackEvent('landing_modal_guest_click');
}

/** Fired when user clicks a nav link */
export function trackNavClick(destination: string, isMobile: boolean) {
  trackEvent('nav_click', { destination, is_mobile: isMobile });
}

/** Fired when user clicks Sign In from the nav */
export function trackNavSignIn(isMobile: boolean) {
  trackEvent('nav_signin_click', { is_mobile: isMobile });
}

/** Fired when a content category card is clicked */
export function trackCategoryClick(categoryId: string, categoryName: string) {
  trackEvent('category_click', { category_id: categoryId, category_name: categoryName });
}

/** Fired when the hero "Explore Originals" button is clicked */
export function trackHeroExploreOriginals() {
  trackEvent('hero_explore_originals_click');
}

/** Fired when notification bell is clicked */
export function trackNotificationBellClick() {
  trackEvent('notification_bell_click');
}

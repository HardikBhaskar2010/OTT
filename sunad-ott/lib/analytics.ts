import { getAnalytics, isSupported } from 'firebase/analytics';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';

/**
 * analytics.ts — Typed GA4 and Firestore custom event helpers for Sunad OTT.
 *
 * Requirements (R7):
 * - Firebase Analytics initialization client-side (checking typeof window !== 'undefined').
 * - Non-blocking fire-and-forget Firestore logging to `analyticsEvents` collection.
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/** Initialize Firebase Analytics client-side if supported */
export function initFirebaseAnalytics() {
  if (typeof window !== 'undefined') {
    if (app.options.apiKey === 'demo-api-key') {
      console.warn('Analytics disabled: using demo-api-key');
      return;
    }
    isSupported()
      .then((supported) => {
        if (supported) {
          getAnalytics(app);
        }
      })
      .catch(() => {
        // Silently ignore analytics init failures
      });
  }
}

/** Safe GA4 wrapper — silently skips if gtag isn't loaded yet (SSR / blocked) */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

// ─── Firestore Analytics Event Tracking (R7) ──────────────────────────────────

/**
 * 1. content_watched
 * Triggered when video play starts -> fields: { event: "content_watched", contentId, uid: uid || null, timestamp: serverTimestamp() }
 */
export function trackContentWatched(contentId: string, uid?: string | null) {
  if (typeof window === 'undefined') return;
  try {
    addDoc(collection(db, 'analyticsEvents'), {
      event: 'content_watched',
      contentId,
      uid: uid || null,
      timestamp: serverTimestamp(),
    }).catch(() => {});
  } catch {
    // Fire-and-forget catch silently
  }
}

/**
 * 2. watch_progress
 * Triggered every 30s while playing -> fields: { event: "watch_progress", contentId, uid, progressSeconds, timestamp: serverTimestamp() }
 */
export function trackWatchProgress(contentId: string, uid: string | null | undefined, progressSeconds: number) {
  if (typeof window === 'undefined') return;
  try {
    addDoc(collection(db, 'analyticsEvents'), {
      event: 'watch_progress',
      contentId,
      uid: uid || null,
      progressSeconds,
      timestamp: serverTimestamp(),
    }).catch(() => {});
  } catch {
    // Fire-and-forget catch silently
  }
}

/**
 * 3. search_query
 * Triggered on search submit -> fields: { event: "search_query", query, resultCount, uid: uid || null, timestamp: serverTimestamp() }
 */
export function trackSearchQuery(query: string, resultCount: number, uid?: string | null) {
  if (typeof window === 'undefined') return;
  try {
    addDoc(collection(db, 'analyticsEvents'), {
      event: 'search_query',
      query,
      resultCount,
      uid: uid || null,
      timestamp: serverTimestamp(),
    }).catch(() => {});
  } catch {
    // Fire-and-forget catch silently
  }
}

/**
 * 4. mylist_add
 * Triggered on add to My List -> fields: { event: "mylist_add", contentId, uid, timestamp: serverTimestamp() }
 */
export function trackMyListAdd(contentId: string, uid?: string | null) {
  if (typeof window === 'undefined') return;
  try {
    addDoc(collection(db, 'analyticsEvents'), {
      event: 'mylist_add',
      contentId,
      uid: uid || null,
      timestamp: serverTimestamp(),
    }).catch(() => {});
  } catch {
    // Fire-and-forget catch silently
  }
}

/**
 * 5. mylist_remove
 * Triggered on remove from My List -> fields: { event: "mylist_remove", contentId, uid, timestamp: serverTimestamp() }
 */
export function trackMyListRemove(contentId: string, uid?: string | null) {
  if (typeof window === 'undefined') return;
  try {
    addDoc(collection(db, 'analyticsEvents'), {
      event: 'mylist_remove',
      contentId,
      uid: uid || null,
      timestamp: serverTimestamp(),
    }).catch(() => {});
  } catch {
    // Fire-and-forget catch silently
  }
}

// ─── Custom Firestore Event Tracking Hook ─────────────────────────────────────

export function useAnalytics() {
  return {
    trackContentWatched,
    trackWatchProgress,
    trackSearchQuery,
    trackMyListAdd,
    trackMyListRemove,
    trackEvent,
  };
}

// ─── Pre-typed GA4 event helpers ───────────────────────────────────────────────

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

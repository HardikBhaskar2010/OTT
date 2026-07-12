'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollReveal — IntersectionObserver fallback for browsers that don't
 * support CSS Scroll-Driven Animations (Firefox, older Safari).
 *
 * Observes all `.reveal` and `.reveal-fade` elements on the page.
 * Adds `.is-visible` class when the element crosses the 15% threshold.
 * Respects `prefers-reduced-motion` — skips animation entirely if set.
 *
 * Mount this component once in the root layout; it auto-discovers elements.
 */
export default function ScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Add active class to root element to enable scroll reveal transitions
    document.documentElement.classList.add('js-reveal-active');

    // Respect reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      // Make all reveal elements visible immediately
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-fade').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    // IntersectionObserver runs for all browsers to fade in page elements reliably

    // Create observer for the fallback animation
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve after visible — no need to re-animate
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: '0px 0px 200px 0px',
      }
    );

    // Observe all existing reveal elements
    const observe = () => {
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-fade').forEach((el) => {
        observerRef.current?.observe(el);
      });
    };

    // Run initial observation with a slight delay to ensure client-side hydration has completed
    const timer = setTimeout(observe, 100);

    // Also observe elements added dynamically (e.g., after data fetch)
    const mutationObserver = new MutationObserver(() => observe());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove('js-reveal-active');
      clearTimeout(timer);
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // This component renders nothing — pure behavior
  return null;
}

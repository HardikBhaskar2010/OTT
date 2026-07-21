'use client';

/**
 * GSAPProvider — registers GSAP plugins once at app level.
 * Per gsap-react skill: all plugin registration must happen client-side only.
 * Per gsap-scrolltrigger skill: ScrollTrigger.scrollerProxy() wired to Lenis.
 */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register all plugins once — safe to call multiple times (GSAP deduplicates)
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Set GSAP defaults aligned with Premium motion personality
gsap.defaults({
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  duration: 0.35,
});

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Wire Lenis smooth scroll into ScrollTrigger so they stay in sync
    // Lenis dispatches a custom 'lenis' event on window with scroll data
    const onLenisScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) ScrollTrigger.update();
    };
    window.addEventListener('lenis', onLenisScroll);

    // Refresh ScrollTrigger after fonts/images load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('lenis', onLenisScroll);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return <>{children}</>;
}

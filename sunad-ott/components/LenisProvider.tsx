'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

/**
 * LenisProvider — Initializes Lenis smooth scroll.
 * Runs a requestAnimationFrame loop to drive the scroll animation.
 * Cleanup on unmount stops the RAF loop and destroys the Lenis instance.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis with premium, unhurried easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose lenis instance globally for CSS scroll-driven animation compatibility
    // (Lenis intercepts native scroll events; scroll-driven animations need an update)
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      lenis.destroy();
      lenisRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.destroy();
        lenisRef.current = null;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }
    };
    mediaQuery.addEventListener('change', handleReducedMotion);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      mediaQuery.removeEventListener('change', handleReducedMotion);
    };
  }, []);

  return <>{children}</>;
}

export default LenisProvider;

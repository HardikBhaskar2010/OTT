'use client';

/**
 * ScrollReveal — GSAP ScrollTrigger.batch() implementation.
 * Per gsap-scrolltrigger skill: batch coordinates all reveal elements that fire
 * their callbacks around the same time — animates them together with stagger.
 * Per motion-design skill: stagger budgets <400ms for cards/panels.
 * Per gsap-react skill: useGSAP() handles cleanup automatically on unmount.
 */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollReveal() {
  useEffect(() => {
    // Ensure ScrollTrigger is registered (also done in GSAPProvider, idempotent)
    gsap.registerPlugin(ScrollTrigger);

    // ── Batch: standard .reveal elements ───────────────────────────────────
    // Cards, panels, rails — stagger cascade
    const batchReveal = ScrollTrigger.batch('.reveal', {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 28,
            willChange: 'transform, opacity',
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
            stagger: 0.07,          // 70ms between each — stays under 400ms budget
            overwrite: true,
            onComplete: () => {
              // Remove will-change after animation to free GPU memory
              gsap.set(elements, { willChange: 'auto' });
            },
          }
        );
      },
      onLeaveBack: (elements) => {
        gsap.set(elements, { opacity: 0, y: 28 });
      },
      start: 'top 90%',
      once: false,
    });

    // ── Batch: .reveal-fast — above-fold / lighter elements ────────────────
    const batchFast = ScrollTrigger.batch('.reveal-fast', {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
            stagger: 0.04,
            overwrite: true,
          }
        );
      },
      start: 'top 95%',
      once: true,
    });

    // ── Batch: .reveal-card grid items — micro cascade ─────────────────────
    const batchCards = ScrollTrigger.batch('.reveal-card', {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
            stagger: { each: 0.06, from: 'start' },
            overwrite: true,
          }
        );
      },
      start: 'top 88%',
      once: false,
    });

    // ── Section header word reveals ─────────────────────────────────────────
    // Gold kicker line width animation
    const kickers = document.querySelectorAll('.section-kicker');
    kickers.forEach((kicker) => {
      gsap.fromTo(
        kicker,
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
          scrollTrigger: {
            trigger: kicker,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });

    // ── prefers-reduced-motion: skip all animations ─────────────────────────
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      gsap.set('.reveal, .reveal-fast, .reveal-card, .section-kicker', {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        clearProps: 'all',
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    }

    return () => {
      // Cleanup all ScrollTriggers on component unmount
      batchReveal.forEach((t) => t.kill());
      batchFast.forEach((t) => t.kill());
      batchCards.forEach((t) => t.kill());
    };
  }, []);

  // No DOM output — pure side-effect component
  return null;
}

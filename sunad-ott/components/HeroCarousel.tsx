'use client';

/**
 * HeroCarousel — Cinematic hero with GSAP timeline transitions.
 * Per gsap-react skill: useGSAP hook with scope + cleanup.
 * Per gsap-timeline skill: sequenced title/tagline/CTA entrance.
 * Per motion-design skill: Dramatic reveal pattern (600–1200ms theatrical build).
 * Per motion-design skill: Primary (title) → Secondary (meta/CTA) → Ambient (bg parallax).
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Radio, Bell, Play, Info } from 'lucide-react';
import { HERO_SLIDES_V2 } from '@/lib/mockData';
import type { HeroSlideV2 } from '@/lib/mockData';

gsap.registerPlugin(useGSAP);

const CDN = process.env.NEXT_PUBLIC_CDN_BASE_URL ?? '';
const AUTO_ADVANCE_MS = 6000;
const TEASER_DELAY_MS = 3000;

interface HeroCarouselProps {
  slides?: HeroSlideV2[];
}

export default function HeroCarousel({ slides = HERO_SLIDES_V2 }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [teaserActive, setTeaserActive] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  // ── GSAP slide content entrance animation ──────────────────────────────────
  // Per gsap-timeline skill: sequence badge → title → tagline → meta → CTA
  // Per motion-design skill: dramatic reveal, stagger 100–200ms per element
  const playEntranceAnimation = useCallback(() => {
    if (!contentRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(contentRef.current, { opacity: 1 });
      gsap.set(contentRef.current.querySelectorAll('.hero-badges, .hero-carousel__title, .hero-carousel__tagline, .hero-carousel__meta, .hero-carousel__actions'), {
        opacity: 1, y: 0,
      });
      return;
    }

    const tl = gsap.timeline();

    // Kill any existing animation on content
    gsap.killTweensOf(contentRef.current.querySelectorAll('*'));

    tl.fromTo('.hero-badges',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)' }
    )
    .fromTo('.hero-carousel__title',
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
      '-=0.15'
    )
    .fromTo('.hero-carousel__tagline',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
      '-=0.3'
    )
    .fromTo('.hero-carousel__meta',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
      '-=0.25'
    )
    .fromTo('.hero-carousel__actions',
      { opacity: 0, y: 14, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
      '-=0.2'
    );
  }, []);

  // ── Progress bar animation per slide ──────────────────────────────────────
  const startProgressBar = useCallback(() => {
    if (!progressRef.current) return;
    if (progressTweenRef.current) progressTweenRef.current.kill();

    progressTweenRef.current = gsap.fromTo(
      progressRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: AUTO_ADVANCE_MS / 1000,
        ease: 'none', // linear — progress should track time exactly
        transformOrigin: 'left center',
      }
    );
  }, []);

  const resetProgressBar = useCallback(() => {
    if (progressTweenRef.current) progressTweenRef.current.kill();
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });
    }
  }, []);

  // ── Slide transition with GSAP background crossfade ───────────────────────
  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === current) return;
    setTransitioning(true);
    setTeaserActive(false);
    resetProgressBar();

    // Fade out current content elements instead of the whole card
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.hero-badges, .hero-carousel__title, .hero-carousel__tagline, .hero-carousel__meta, .hero-carousel__actions');
      gsap.to(elements, {
        opacity: 0,
        y: -8,
        duration: 0.25,
        ease: 'cubic-bezier(0.3, 0, 1, 1)',
        onComplete: () => {
          setCurrent(idx);
          setTransitioning(false);
          // Wait for React to render the new state, then play entrance
          requestAnimationFrame(() => {
            playEntranceAnimation();
            if (!isHovering) startProgressBar();
          });
        },
      });
    } else {
      setCurrent(idx);
      setTransitioning(false);
    }
  }, [transitioning, current, isHovering, resetProgressBar, playEntranceAnimation, startProgressBar]);

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, slides.length, goTo]);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);

  // ── Initial entrance + progress bar ──────────────────────────────────────
  useGSAP(() => {
    // Initial entrance
    playEntranceAnimation();
    startProgressBar();
  }, { scope: containerRef, dependencies: [] });

  // ── Auto-advance ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isHovering) {
      if (autoRef.current) clearInterval(autoRef.current);
      if (progressTweenRef.current) progressTweenRef.current.pause();
      return;
    }
    progressTweenRef.current?.resume();
    autoRef.current = setInterval(next, AUTO_ADVANCE_MS);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isHovering, next]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // ── Hover: teaser ─────────────────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    hoverTimerRef.current = setTimeout(() => setTeaserActive(true), TEASER_DELAY_MS);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTeaserActive(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  // ── Play teaser video ─────────────────────────────────────────────────────
  useEffect(() => {
    if (teaserActive && videoRef.current) {
      videoRef.current.play().catch(() => { /* autoplay blocked — silently fail */ });
    }
  }, [teaserActive, current]);

  const slide = slides[current];
  const teaserSrc = CDN + slide.teaserUrl;

  return (
    <section
      ref={containerRef}
      className="hero-carousel"
      aria-label="Featured content carousel"
      aria-roledescription="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background slides ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`hero-carousel__bg${i === current ? ' is-active' : ''}`}
          aria-hidden={i !== current}
          style={{ background: s.posterGradient }}
        />
      ))}

      {/* ── Rich gradient overlay (three layers for depth) ── */}
      {/* Layer 1: top vignette */}
      <div
        className="hero-carousel__overlay hero-overlay--top"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, rgba(11,9,7,0.55) 0%, transparent 35%)' }}
      />
      {/* Layer 2: left text scrim */}
      <div
        className="hero-carousel__overlay hero-overlay--left"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to right, rgba(11,9,7,0.9) 0%, rgba(11,9,7,0.6) 45%, transparent 75%)' }}
      />
      {/* Layer 3: bottom fade to body */}
      <div
        className="hero-carousel__overlay hero-overlay--bottom"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to top, var(--color-bg) 0%, rgba(11,9,7,0.7) 30%, transparent 65%)' }}
      />

      {/* ── Slide-specific gradient ── */}
      <div
        className="hero-carousel__overlay"
        style={{ background: slide.gradientOverlay, opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* ── Teaser video ── */}
      <video
        ref={videoRef}
        key={`teaser-${current}`}
        className={`hero-carousel__teaser-video${teaserActive ? ' is-playing' : ''}`}
        src={teaserSrc}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* ── Slide content inside Mandap Glass Card ── */}
      <div className="hero-carousel__mandap-wrapper">
        <div ref={contentRef} className="hero-carousel__mandap-card">
          {/* Badges */}
          <div className="hero-badges" style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-3)' }}>
            {slide.liveStatus === 'live' ? (
              <div className="hero-badge hero-badge--live">
                <Radio size={14} className="hero-badge__icon animate-pulse" />
                <span>LIVE NOW</span>
              </div>
            ) : (
              <div className="hero-badge">
                <span className="hero-badge__dot" aria-hidden="true" />
                <span>{slide.badge}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 
            className="hero-carousel__title"
            style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden',
              fontSize: slide.titleEn.length > 30 ? 'clamp(1.2rem, 2.5vw, 2rem)' : undefined
            }}
          >
            {slide.titleEn}
            {slide.titleHi && slide.titleHi !== slide.titleEn && (
              <span className="hero-carousel__title-hi" lang="hi">{slide.titleHi}</span>
            )}
          </h1>

          {/* Tagline */}
          <p className="hero-carousel__tagline">{slide.tagline}</p>

          {/* Meta */}
          <div className="hero-carousel__meta" aria-label="Content metadata">
            {slide.liveStatus === 'live' && slide.airTime ? (
              <span className="hero-meta__highlight">Live Since {slide.airTime}</span>
            ) : slide.liveStatus === 'upcoming' && slide.airTime ? (
              <span className="hero-meta__highlight">Airs Today at {slide.airTime}</span>
            ) : (
              <span>{slide.duration}</span>
            )}
            <span className="hero-meta__dot" aria-hidden="true">·</span>
            <span>{slide.schedule || slide.year}</span>
            <span className="hero-meta__dot" aria-hidden="true">·</span>
            <span className="hero-meta__rating">{slide.rating}</span>
            <span className="hero-meta__dot" aria-hidden="true">·</span>
            {slide.genres.slice(0, 2).map(g => (
              <span key={g} className="hero-meta__genre">{g}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="hero-carousel__actions">
            {slide.liveStatus === 'live' ? (
              <Link href={slide.watchHref} className="btn-primary btn-primary--high-contrast hero-cta-watch" id={`hero-watch-${slide.id}`}>
                <Radio size={18} aria-hidden="true" />
                <span className="lang-en-only">Join Live</span>
                <span className="lang-hi-only" lang="hi">लाइव जुड़ें</span>
              </Link>
            ) : slide.liveStatus === 'upcoming' ? (
              <button className="btn-primary btn-primary--high-contrast hero-cta-watch" id={`hero-remind-${slide.id}`} type="button">
                <Bell size={18} aria-hidden="true" />
                <span className="lang-en-only">Remind Me</span>
                <span className="lang-hi-only" lang="hi">याद दिलाएं</span>
              </button>
            ) : (
              <Link href={slide.watchHref} className="btn-primary btn-primary--high-contrast hero-cta-watch" id={`hero-watch-${slide.id}`}>
                <Play size={18} fill="currentColor" aria-hidden="true" />
                <span className="lang-en-only">Watch Now</span>
                <span className="lang-hi-only" lang="hi">अभी देखें</span>
              </Link>
            )}

            <Link href={slide.infoHref} className="btn-glass hero-cta-info" id={`hero-info-${slide.id}`}>
              <Info size={18} aria-hidden="true" />
              <span className="lang-en-only">More Info</span>
              <span className="lang-hi-only" lang="hi">और जानें</span>
            </Link>
          </div>
        </div>
        
        {/* ── Slide dots (moved inside wrapper to avoid conflict) ── */}
        <div className="hero-dots" role="tablist" aria-label="Slide navigation">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`hero-dot${i === current ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}: ${s.titleEn}`}
              id={`hero-dot-${i}`}
              type="button"
            />
          ))}
        </div>
      </div>

      {/* ── Teaser status ── */}
      <div className="hero-carousel__teaser-status" aria-live="polite" aria-atomic="true">
        {isHovering && !teaserActive && (
          <div className="teaser-indicator" aria-label="Teaser preview loading">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ opacity: 0.7 }}>
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            </svg>
            <div className="teaser-indicator__bar">
              <div className="teaser-indicator__fill" style={{ animationDuration: `${TEASER_DELAY_MS}ms` }} />
            </div>
          </div>
        )}
        {teaserActive && (
          <div className="teaser-playing" aria-label="Teaser preview playing">
            <span className="teaser-playing__dot" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* ── GSAP progress bar ── */}
      <div className="hero-progress-track" aria-hidden="true">
        <div ref={progressRef} className="hero-progress-fill" />
      </div>

      {/* ── Prev / Next arrows ── */}
      <button className="hero-arrow hero-arrow--prev" onClick={prev} aria-label="Previous slide" id="hero-prev" type="button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button className="hero-arrow hero-arrow--next" onClick={next} aria-label="Next slide" id="hero-next" type="button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

    </section>
  );
}

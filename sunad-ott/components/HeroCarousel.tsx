'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { HERO_SLIDES_V2 } from '@/lib/mockData';
import type { HeroSlideV2 } from '@/lib/mockData';

const CDN = process.env.NEXT_PUBLIC_CDN_BASE_URL ?? '';
const AUTO_ADVANCE_MS = 6000;  // 6 seconds auto-advance
const TEASER_DELAY_MS = 3000;  // 3 seconds hover → teaser plays

interface HeroCarouselProps {
  slides?: HeroSlideV2[];
}

export default function HeroCarousel({ slides = HERO_SLIDES_V2 }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [teaserActive, setTeaserActive] = useState(false);
  const [animating, setAnimating] = useState(false);

  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTeaserActive(false);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  // Auto-advance carousel
  useEffect(() => {
    if (isHovering) {
      if (autoRef.current) clearInterval(autoRef.current);
      return;
    }
    autoRef.current = setInterval(next, AUTO_ADVANCE_MS);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isHovering, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Hover: 3-second delay → trigger teaser
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    hoverTimerRef.current = setTimeout(() => {
      setTeaserActive(true);
    }, TEASER_DELAY_MS);
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

  // Play video when teaser activates
  useEffect(() => {
    if (teaserActive && videoRef.current) {
      videoRef.current.play().catch(() => { /* autoplay blocked — silently fail */ });
    }
  }, [teaserActive, current]);

  const slide = slides[current];
  const teaserSrc = CDN + slide.teaserUrl;

  return (
    <section
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

      {/* ── Gradient overlay ── */}
      <div
        className="hero-carousel__overlay"
        style={{ background: slide.gradientOverlay }}
        aria-hidden="true"
      />

      {/* ── Teaser video (appears on 3s hover) ── */}
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

      {/* ── Teaser overlay gradient (keeps text readable even when video plays) ── */}
      <div className="hero-carousel__teaser-overlay" aria-hidden="true" />

      {/* ── Bottom gradient overlay to blend into body black ── */}
      <div className="hero-carousel__bottom-overlay" aria-hidden="true" />

      {/* ── Slide content ── */}
      <div className={`hero-carousel__content${animating ? ' is-animating' : ''}`}>
        {/* Badges (Split Category and Type to avoid tag pill overload) */}
        <div className="hero-badges" style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-3)' }}>
          <div className="hero-badge">
            <span className="hero-badge__dot" aria-hidden="true" />
            <span>{slide.badge}</span>
          </div>
          <div className="hero-badge hero-badge--secondary" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.2)', color: 'rgba(255, 255, 255, 0.9)' }}>
            <span>{slide.type.toUpperCase()}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-carousel__title">
          {slide.titleEn}
          {slide.titleHi && (
            <span className="hero-carousel__title-hi lang-hi-only" lang="hi">{slide.titleHi}</span>
          )}
        </h1>

        {/* Tagline */}
        <p className="hero-carousel__tagline">{slide.tagline}</p>

        {/* Meta: Year · Rating · Duration · Genres */}
        <div className="hero-carousel__meta" aria-label="Content metadata">
          <span>{slide.year}</span>
          <span className="hero-meta__dot" aria-hidden="true">·</span>
          <span className="hero-meta__rating">{slide.rating}</span>
          <span className="hero-meta__dot" aria-hidden="true">·</span>
          <span>{slide.duration}</span>
          {slide.genres.slice(0, 3).map(g => (
            <span key={g} className="hero-meta__genre">{g}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="hero-carousel__actions">
          <Link
            href={slide.watchHref}
            className="btn-primary hero-cta-watch"
            id={`hero-watch-${slide.id}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span className="lang-en-only">Watch Now</span>
            <span className="lang-hi-only" lang="hi">अभी देखें</span>
          </Link>
          <Link
            href={slide.infoHref}
            className="btn-glass hero-cta-info"
            id={`hero-info-${slide.id}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span className="lang-en-only">More Info</span>
            <span className="lang-hi-only" lang="hi">और जानें</span>
          </Link>
        </div>

        {/* Teaser status lane — icon-only, no visible text labels */}
        {(isHovering || teaserActive) && (
          <div className="hero-carousel__teaser-status">
            {isHovering && !teaserActive && (
              <div className="teaser-indicator" aria-live="polite" aria-atomic="true" aria-label="Teaser preview loading">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ opacity: 0.7 }}>
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                </svg>
                <div className="teaser-indicator__bar">
                  <div className="teaser-indicator__fill" style={{ animationDuration: `${TEASER_DELAY_MS}ms` }} />
                </div>
              </div>
            )}
            {teaserActive && (
              <div className="teaser-playing" aria-live="polite" aria-label="Teaser preview playing">
                <span className="teaser-playing__dot" aria-hidden="true" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        className="hero-arrow hero-arrow--prev"
        onClick={prev}
        aria-label="Previous slide"
        id="hero-prev"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button
        className="hero-arrow hero-arrow--next"
        onClick={next}
        aria-label="Next slide"
        id="hero-next"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* ── Scroll cue chevron ── */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* ── Slide dots ── */}
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
    </section>
  );
}

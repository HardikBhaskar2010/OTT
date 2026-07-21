'use client';

import { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import type { ContentItem } from '@/lib/mockData';

const CDN = process.env.NEXT_PUBLIC_CDN_BASE_URL ?? '';

interface ContentCardProps {
  item: ContentItem;
  variant?: 'portrait' | 'wide';
  rank?: number;
}

/**
 * ContentCard — OTT-style card with hover teaser
 * - portrait (2:3): for Movies, Trending
 * - wide (16:9): for Continue Watching (with progress bar)
 */
export function ContentCard({ item, variant = 'portrait', rank }: ContentCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = useCallback(() => {
    hoverRef.current = setTimeout(() => {
      if (videoRef.current) {
        setIsPlaying(true);
        videoRef.current.play().catch((err) => {
          console.warn('Video playback failed:', err);
          setIsPlaying(false);
        });
      }
    }, 600); // 600ms responsive delay like premium platforms
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverRef.current) clearTimeout(hoverRef.current);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const teaserSrc = CDN + item.teaserUrl;

  return (
    <Link
      href={item.watchHref}
      className={`content-card-v2 content-card-v2--${variant} reveal-card`}
      aria-label={`${item.titleEn} — ${item.year} · ${item.rating} · ${item.duration}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Poster / thumbnail */}
      <div
        className="content-card-v2__poster"
        style={{ background: item.posterGradient }}
        aria-hidden="true"
      >
        {/* Teaser video on hover */}
        <video
          ref={videoRef}
          className={`content-card-v2__teaser${isPlaying ? ' is-playing' : ''}`}
          src={teaserSrc}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* Badges */}
        {rank && (
          <span className="card-badge card-badge--rank" aria-label={`Trending #${rank}`}>
            #{rank}
          </span>
        )}
        {item.isNew && !rank && (
          <span className="card-badge card-badge--new">NEW</span>
        )}
        {item.type === 'show' && (
          <span className="card-badge card-badge--type">SERIES</span>
        )}

        {/* Glassmorphism play overlay — fade+scale on hover (micro-interaction skill) */}
        <div className="content-card-v2__play-overlay" aria-hidden="true">
          <div className="content-card-v2__play" style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(230, 154, 36, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(230, 154, 36, 0.4)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0B0907" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>

        {/* Original hover overlay — title/meta on hover */}
        <div className="content-card-v2__overlay" aria-hidden="true">
          <div className="content-card-v2__info">
            <p className="content-card-v2__title">{item.titleEn}</p>
            <div className="content-card-v2__meta">
              <span>{item.year}</span>
              <span>·</span>
              <span className="content-card-v2__rating">{item.rating}</span>
              {item.genres.slice(0, 2).map(g => (
                <span key={g} className="content-card-v2__genre">{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar (Continue Watching) */}
        {variant === 'wide' && typeof item.watchProgress === 'number' && (
          <div
            className="content-card-v2__progress"
            role="progressbar"
            aria-valuenow={item.watchProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${item.watchProgress}% watched`}
          >
            <div
              className="content-card-v2__progress-fill"
              style={{ width: `${item.watchProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Card body (visible below poster) */}
      <div className="content-card-v2__body">
        <p className="content-card-v2__name">{item.titleEn}</p>
        <p className="content-card-v2__sub">
          {item.year}
          {variant === 'wide' && typeof item.watchProgress === 'number' && (
            <span className="content-card-v2__watched"> · {item.watchProgress}% watched</span>
          )}
        </p>
      </div>
    </Link>
  );
}

interface ContentRailProps {
  title: string;
  titleHi?: string;
  kicker?: string;
  kickerIcon?: React.ReactNode;
  items: ContentItem[];
  variant?: 'portrait' | 'wide';
  viewAllHref?: string;
  showRank?: boolean;
}

/**
 * ContentRail — A horizontal scroll row of ContentCards
 */
export function ContentRail({
  title,
  titleHi,
  kicker,
  kickerIcon,
  items,
  variant = 'portrait',
  viewAllHref,
  showRank = false,
}: ContentRailProps) {
  if (items.length === 0) return null;

  return (
    <section className="content-rail-section" aria-labelledby={`rail-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="section-header">
        <div>
          {kicker && (
            <span className="section-kicker">
              {kickerIcon}
              {kicker}
            </span>
          )}
          <h2
            className="section-header__title"
            id={`rail-${title.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <span className="lang-en-only">{title}</span>
            {titleHi && <span className="lang-hi-only" lang="hi">{titleHi}</span>}
          </h2>
        </div>
        {viewAllHref && (
          <Link href={viewAllHref} className="section-header__link">
            <span className="lang-en-only">View All</span>
            <span className="lang-hi-only" lang="hi">सभी देखें</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        )}
      </div>
      <div
        className={`content-rail content-rail--${variant}`}
        role="list"
        aria-label={`${title} content list`}
      >
        {items.map((item, idx) => (
          <div key={item.id} role="listitem">
            <ContentCard
              item={item}
              variant={variant}
              rank={showRank ? (item.trendingRank ?? idx + 1) : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

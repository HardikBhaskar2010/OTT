import type { Metadata } from 'next';
import { PROGRAMS, CATEGORIES, HERO_SLIDES, getProgramThumbnail } from '@/lib/mockData';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  documentaries: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
      <line x1="7" x2="7" y1="2" y2="22" />
      <line x1="17" x2="17" y1="2" y2="22" />
      <line x1="2" x2="22" y1="7" y2="7" />
      <line x1="2" x2="22" y1="17" y2="17" />
    </svg>
  ),
  spiritual: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  ),
  history: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  culture: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 6v12" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
    </svg>
  ),
  tourism: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  yoga: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v8" />
      <path d="M5 10c3 1 4 2 7 2s4-1 7-2" />
      <path d="M9 22c1-2 2-3 3-5s2 3 3 5" />
    </svg>
  ),
  arts: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.45-.18-.85-.46-1.17-.29-.3-.46-.72-.46-1.18 0-.92.77-1.63 1.7-1.63h1.8c5.44 0 9.79-4.35 9.79-9.79C26.21 6.5 22 2 12 2Z" />
    </svg>
  ),
  agriculture: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 .5 6-3.8 9.8A7 7 0 0 1 11 20Z" />
      <path d="M9 22V12" />
    </svg>
  ),
  education: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  entrepreneurship: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  family: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
};

export const metadata: Metadata = {
  title: 'Home — Sunad OTT | Real Stories. Real Bharat.',
  description:
    'Discover premium Indian civilizational storytelling — documentaries, spiritual wisdom, history, culture, yoga, tourism and more. Watch live TV and on-demand content in Hindi and English.',
};

export default function HomePage() {
  const primeTimeShows = PROGRAMS.filter((p) => p.isPrimeTime);
  const liveShow = PROGRAMS.find((p) => p.isLive);

  return (
    <>
      {/* ── Hero Section ── */}
      <section
        aria-label="Featured content"
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(400px, 60vh, 680px)',
          overflow: 'hidden',
          marginBottom: '0',
        }}
      >
        {/* Hero background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/mystic_bharat.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
          }}
          aria-hidden="true"
        />
        {/* Hero gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #0E0D0C 0%, #0E0D0C 35%, rgba(14,13,12,0.7) 60%, transparent 100%), linear-gradient(0deg, #0E0D0C 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        {/* Hero text content */}
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--space-12)',
            left: 'var(--space-8)',
            maxWidth: '560px',
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <div className="badge badge--gold-outline" style={{ marginBottom: 'var(--space-3)' }}>
            <span className="lang-en-only">NEW ORIGINAL SERIES</span>
            <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>नई ओरिजिनल सीरीज़</span>
          </div>

          {/* Title */}
          <h1
            className="type-display-l"
            style={{ color: 'var(--primitive-white)', marginBottom: 'var(--space-3)' }}
          >
            <span className="lang-en-only">{HERO_SLIDES[0].titleEn}</span>
            <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-display-hi)', fontSize: 'var(--type-hi-display-l)', lineHeight: 'var(--lh-hi-display)' }}>{HERO_SLIDES[0].titleHi}</span>
          </h1>

          {/* Subtitle / Description (High contrast + text shadow for AAA readability) */}
          <p
            style={{
              fontSize: 'var(--type-body-l)',
              color: 'var(--primitive-white)',
              lineHeight: 'var(--lh-body)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
              marginBottom: 'var(--space-4)',
              maxWidth: '460px',
            }}
          >
            <span className="lang-en-only">{HERO_SLIDES[0].subtitleEn}</span>
            <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>{HERO_SLIDES[0].subtitleHi}</span>
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <a href={HERO_SLIDES[0].href} className="btn-primary" id="hero-watch-now">
              ▶ <span className="lang-en-only">Watch Now</span>
              <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>अभी देखें</span>
            </a>
            <button className="btn-glass" id="hero-more-info" style={{ color: 'var(--primitive-white)' }}>
              <span className="lang-en-only">More Info</span>
              <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>अधिक जानकारी</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div
        style={{
          maxWidth: 'var(--grid-max-width)',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-12)',
        }}
      >

        {/* ── Live TV Banner (Floated to overlap Hero seamlessly) ── */}
        {liveShow && (
          <div style={{ marginTop: '-48px', position: 'relative', zIndex: 20 }}>
            <section
              className="reveal"
              aria-label="Live TV — Now Playing"
              style={{
                background: 'var(--glass-bg-strong)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: 'var(--glass-border-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
              }}
            >
              <span className="badge badge--live">LIVE</span>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ fontSize: 'var(--type-label)', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  <span className="lang-en-only">Now Playing</span>
                  <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>अभी चल रहा है</span>
                </p>
                <p style={{ fontSize: 'var(--type-body-l)', fontWeight: 600, color: 'var(--color-text)' }}>
                  <span className="lang-en-only">{liveShow.nameEn}</span>
                  <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-body-l)' }}>{liveShow.nameHi}</span>
                </p>
                <p style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)' }}>
                  {liveShow.startTime} – {liveShow.endTime} ·{' '}
                  <span className="lang-en-only">{liveShow.category}</span>
                  <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>
                    {liveShow.category === 'Spiritual Knowledge' ? 'आध्यात्मिक ज्ञान' : liveShow.category}
                  </span>
                </p>
              </div>
              <a href="/live" className="btn-glass" style={{ flexShrink: 0, color: 'var(--primitive-white)', borderColor: 'var(--color-border-gold)' }}>
                ▶ <span className="lang-en-only">Tune In</span>
                <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>लाइव देखें</span>
              </a>
            </section>
          </div>
        )}

        {/* ── Prime Time Rail ── */}
        <section className="reveal" aria-labelledby="prime-time-heading">
          <div className="section-header">
            <h2 className="section-header__title" id="prime-time-heading">
              <span className="lang-en-only">Prime Time</span>
              <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>प्राइम टाइम</span>
            </h2>
            <a href="/browse" className="section-header__link">
              <span className="lang-en-only">View All ›</span>
              <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: '0.85rem' }}>सभी देखें ›</span>
            </a>
          </div>
          <div className="rail" role="list">
            {primeTimeShows.map((show) => (
              <article
                key={show.id}
                role="listitem"
                className="content-card"
                style={{ width: 'clamp(200px, 24vw, 320px)' }}
                aria-label={`${show.nameEn} — ${show.startTime} to ${show.endTime}`}
              >
                <div
                  className="content-card__thumbnail"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(14,13,12,0.1), rgba(14,13,12,0.85)), url(${getProgramThumbnail(show.categoryId)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  aria-hidden="true"
                />
                <div className="content-card__overlay" aria-hidden="true" />
                 <div className="content-card__body">
                  {show.isPrimeTime && (
                    <div className="badge badge--gold-outline" style={{ marginBottom: '6px', fontSize: '0.65rem' }}>
                      PRIME TIME
                    </div>
                  )}
                  <p className="content-card__title">
                    <span className="lang-en-only">{show.nameEn}</span>
                    <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>{show.nameHi}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── All Programs Rail ── */}
        <section className="reveal" aria-labelledby="trending-heading">
          <div className="section-header">
            <h2 className="section-header__title" id="trending-heading">
              <span className="lang-en-only">Trending Now</span>
              <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>ट्रेंडिंग</span>
            </h2>
            <a href="/browse" className="section-header__link">
              <span className="lang-en-only">View All ›</span>
              <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: '0.85rem' }}>सभी देखें ›</span>
            </a>
          </div>
          <div className="rail" role="list">
            {PROGRAMS.slice(0, 8).map((show, idx) => (
              <article
                key={show.id}
                role="listitem"
                className="content-card"
                style={{ width: 'clamp(180px, 20vw, 280px)' }}
                aria-label={show.nameEn}
              >
                <div
                  className="content-card__thumbnail"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(14,13,12,0.1), rgba(14,13,12,0.85)), url(${getProgramThumbnail(show.categoryId)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  aria-hidden="true"
                />
                <div className="content-card__overlay" aria-hidden="true" />
                 {/* TOP N badge */}
                <div style={{ position: 'absolute', top: 'var(--space-1)', left: 'var(--space-1)' }}>
                  <span className="badge badge--gold-outline" style={{ fontSize: '0.6rem' }}>TOP {idx + 1}</span>
                </div>
                 <div className="content-card__body">
                  <p className="content-card__title">
                    <span className="lang-en-only">{show.nameEn}</span>
                    <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>{show.nameHi}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Category Mini Grid ── */}
        <section className="reveal" aria-labelledby="categories-heading">
          <div className="section-header">
            <h2 className="section-header__title" id="categories-heading">
              <span className="lang-en-only">Browse by Category</span>
              <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>श्रेणी के अनुसार</span>
            </h2>
          </div>
          <div className="mini-category-grid" role="list">
            {CATEGORIES.map((cat) => (
               <a
                key={cat.id}
                href={`/browse/${cat.id}`}
                className="mini-category-tile"
                role="listitem"
                aria-label={`${cat.nameEn}`}
                style={{ background: cat.gradient }}
              >
                <span className="mini-category-tile__icon" aria-hidden="true">
                  {CATEGORY_ICONS[cat.id] || cat.icon}
                </span>
                <div className="mini-category-tile__label">
                  <span className="lang-en-only">{cat.nameEn}</span>
                  <span className="lang-hi-only" lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', display: 'block', fontSize: '0.85rem' }}>{cat.nameHi}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Radio, Tv, ShoppingBag, Compass, IndianRupee, Languages } from 'lucide-react';
import { PROGRAMS, CATEGORIES, MOVIES, SHOWS, MUSIC_CONTENT, DOCUMENTARIES, CONTINUE_WATCHING } from '@/lib/mockData';
import HeroCarousel from '@/components/HeroCarousel';
import { ContentRail } from '@/components/ContentCard';

export const metadata: Metadata = {
  title: 'Home — CultureFlix | Real Stories. Real Bharat.',
  description:
    'Discover premium Indian civilizational storytelling — documentaries, spiritual wisdom, history, culture, yoga, tourism and more. Watch live TV and on-demand content across 22 Indian languages.',
};

export default function HomePage() {
  const liveShow = PROGRAMS.find((p) => p.isLive);
  const trendingMovies = MOVIES.filter(m => m.isTrending).sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99));
  const newMovies = MOVIES.filter(m => m.isNew);
  const trendingShows = SHOWS.filter(s => s.isTrending);
  const newMusic = MUSIC_CONTENT.filter(m => m.isNew);
  const featuredDocs = DOCUMENTARIES.filter(d => d.isTrending);

  return (
    <div className="home-experience">

      {/* ── HERO CAROUSEL ── */}
      <HeroCarousel />

      {/* ── LIVE NOW BANNER ── */}
      {liveShow && (
        <section className="live-now-card reveal" aria-label="Live TV now playing">
          <div className="live-signal" aria-hidden="true">
            <Radio size={23} />
          </div>
          <div>
            <p className="live-now-card__eyebrow">
              <span className="lang-en-only">Live now from the CultureFlix mandap</span>
              <span className="lang-hi-only" lang="hi">कल्चरफ्लिक्स मंडप से लाइव</span>
            </p>
            <p className="live-now-card__title">
              <span className="lang-en-only">{liveShow.nameEn}</span>
              <span className="lang-hi-only" lang="hi">{liveShow.nameHi}</span>
            </p>
          </div>
          <div className="live-actions">
            <Link href="/live" className="btn-primary">
              <Tv size={18} aria-hidden="true" />
              <span className="lang-en-only">Tune In</span>
              <span className="lang-hi-only" lang="hi">लाइव देखें</span>
            </Link>
            <Link href={`/watch/${liveShow.id}`} className="btn-glass">
              <span className="lang-en-only">Details</span>
              <span className="lang-hi-only" lang="hi">विवरण</span>
            </Link>
          </div>
        </section>
      )}

      {/* ── HOME CONTENT RAILS ── */}
      <div className="home-content">

        {/* Continue Watching */}
        {CONTINUE_WATCHING.length > 0 && (
          <div className="reveal">
            <ContentRail
              title="Continue Watching"
              titleHi="जहाँ छोड़ा था"
              kicker="Resume"
              items={CONTINUE_WATCHING}
              variant="wide"
              viewAllHref="/history"
            />
          </div>
        )}

        {/* Trending Movies */}
        <div className="reveal">
          <ContentRail
            title="Trending Now"
            titleHi="ट्रेंडिंग"
            kicker="🔥 Most Watched"
            items={trendingMovies}
            variant="portrait"
            viewAllHref="/browse/movies"
            showRank
          />
        </div>

        {/* New Releases */}
        {newMovies.length > 0 && (
          <div className="reveal">
            <ContentRail
              title="New Releases"
              titleHi="नई रिलीज़"
              kicker="⭐ Just Added"
              items={newMovies}
              variant="portrait"
              viewAllHref="/browse/movies"
            />
          </div>
        )}

        {/* Top Shows */}
        <div className="reveal">
          <ContentRail
            title="Top Shows"
            titleHi="टॉप शोज़"
            kicker="📺 Binge-Worthy"
            items={trendingShows}
            variant="portrait"
            viewAllHref="/browse/shows"
          />
        </div>

        {/* Culture Commerce panel (kept from original) */}
        <section className="culture-panel reveal" aria-labelledby="culture-commerce-heading">
          <div className="culture-panel__copy">
            <span className="section-kicker">
              <IndianRupee size={15} aria-hidden="true" /> Culture Commerce
            </span>
            <h2 className="type-display-m" id="culture-commerce-heading" style={{ color: 'var(--primitive-white)', margin: 'var(--space-2) 0' }}>
              <span className="lang-en-only">Watch the story, support the hands behind it.</span>
              <span className="lang-hi-only" lang="hi">कहानी देखें, कारीगरों का साथ दें।</span>
            </h2>
            <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)', lineHeight: 1.65 }}>
              <span className="lang-en-only">
                CultureFlix connects movies, field reporting, and a Bharat-first store so viewers can discover crafts, wellness goods, and regional producers from the same story world.
              </span>
              <span className="lang-hi-only" lang="hi">
                कल्चरफ्लिक्स फिल्मों, फील्ड रिपोर्टिंग और भारत-प्रथम स्टोर को जोड़ता है।
              </span>
            </p>
            <div className="culture-chips">
              <span className="culture-chip"><ShoppingBag size={14} aria-hidden="true" /> Artisan Store</span>
              <span className="culture-chip"><Compass size={14} aria-hidden="true" /> Heritage Trails</span>
              <span className="culture-chip"><Languages size={14} aria-hidden="true" /> 22 Languages</span>
            </div>
            <div className="card-actions" style={{ marginTop: 'var(--space-4)' }}>
              <Link href="/store" className="btn-primary">
                <ShoppingBag size={18} aria-hidden="true" />
                <span className="lang-en-only">Visit Store</span>
                <span className="lang-hi-only" lang="hi">स्टोर देखें</span>
              </Link>
            </div>
          </div>
          <div className="culture-panel__media" aria-hidden="true"
            style={{ background: 'linear-gradient(135deg, #1a0800 0%, #3d1500 50%, #6b2500 100%)' }}
          />
        </section>

        {/* Music Highlights */}
        {newMusic.length > 0 && (
          <div className="reveal">
            <ContentRail
              title="Music & Ragas"
              titleHi="संगीत और राग"
              kicker="🎵 Now Playing"
              items={MUSIC_CONTENT}
              variant="portrait"
              viewAllHref="/browse/music"
            />
          </div>
        )}

        {/* Featured Documentaries */}
        {featuredDocs.length > 0 && (
          <div className="reveal">
            <ContentRail
              title="Documentaries"
              titleHi="वृत्तचित्र"
              kicker="🎥 Deep Dives"
              items={DOCUMENTARIES}
              variant="portrait"
              viewAllHref="/browse/documentaries"
            />
          </div>
        )}

        {/* Browse Categories */}
        <section className="reveal" aria-labelledby="categories-heading">
          <div className="section-header">
            <div>
              <span className="section-kicker">
                <Compass size={15} aria-hidden="true" /> Explore
              </span>
              <h2 className="section-header__title" id="categories-heading">
                <span className="lang-en-only">Browse by cultural path</span>
                <span className="lang-hi-only" lang="hi">सांस्कृतिक मार्ग से ब्राउज़ करें</span>
              </h2>
            </div>
          </div>
          <div className="mini-category-grid" role="list">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/browse/${cat.id}`}
                className="mini-category-tile category-tile"
                role="listitem"
                aria-label={cat.nameEn}
                style={{ background: `linear-gradient(135deg, rgba(230,154,36,0.16), rgba(0,109,119,0.12)), ${cat.gradient}` }}
              >
                <span className="mini-category-tile__icon" aria-hidden="true">{cat.icon}</span>
                <span className="mini-category-tile__label">
                  <span className="lang-en-only">{cat.nameEn}</span>
                  <span className="lang-hi-only" lang="hi">{cat.nameHi}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

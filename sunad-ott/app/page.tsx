import type { Metadata } from 'next';
import Link from 'next/link';
import { Radio, Tv, ShoppingBag, Compass, IndianRupee, Languages } from 'lucide-react';
import { PROGRAMS, CATEGORIES, MOVIES, SHOWS, MUSIC_CONTENT, DOCUMENTARIES, CONTINUE_WATCHING } from '@/lib/mockData';
import HeroCarousel from '@/components/HeroCarousel';
import { ContentRail } from '@/components/ContentCard';
import CulturePanel from '@/components/CulturePanel';

export const metadata: Metadata = {
  title: 'Home — Sunad TV | Real Stories. Real Bharat.',
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

        {/* Culture Commerce panel (animated with GSAP) */}
        <CulturePanel />

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
                <span className="lang-en-only">Browse by Category</span>
                <span className="lang-hi-only" lang="hi">श्रेणी के अनुसार ब्राउज़ करें</span>
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

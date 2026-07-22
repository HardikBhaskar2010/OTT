import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import { CATEGORIES, MOVIES, SHOWS, MUSIC_CONTENT, DOCUMENTARIES, CONTINUE_WATCHING, type HeroSlideV2 } from '@/lib/mockData';
import { getAllContentFromFirestore } from '@/lib/firestoreCatalog';
import HeroCarousel from '@/components/HeroCarousel';
import { ContentRail } from '@/components/ContentCard';
import CulturePanel from '@/components/CulturePanel';
import ContinueWatchingRail from '@/components/ContinueWatchingRail';

export const metadata: Metadata = {
  title: 'Home — Sunad TV | Real Stories. Real Bharat.',
  description:
    'Discover premium Indian civilizational storytelling — documentaries, spiritual wisdom, history, culture, yoga, tourism and more. Watch live TV and on-demand content across 22 Indian languages.',
};

export default async function HomePage() {
  const catalog = await getAllContentFromFirestore();

  const movies = catalog.filter((c) => c.type === 'movie' || c.categoryId === 'movies');
  const shows = catalog.filter((c) => c.type === 'show' || c.categoryId === 'shows');
  const music = catalog.filter((c) => c.type === 'music' || c.categoryId === 'music');
  const docs = catalog.filter((c) => c.type === 'documentary' || c.categoryId === 'documentaries');

  const effectiveMovies = movies.length > 0 ? movies : MOVIES;
  const effectiveShows = shows.length > 0 ? shows : SHOWS;
  const effectiveMusic = music.length > 0 ? music : MUSIC_CONTENT;
  const effectiveDocs = docs.length > 0 ? docs : DOCUMENTARIES;

  const trendingMovies = effectiveMovies
    .filter((m) => m.isTrending)
    .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99));
  const newMovies = effectiveMovies.filter((m) => m.isNew);
  const trendingShows = effectiveShows.filter((s) => s.isTrending);
  const featuredDocs = effectiveDocs.filter((d) => d.isTrending);

  const heroSlides: HeroSlideV2[] = [...trendingMovies, ...trendingShows].slice(0, 4).map((c) => ({
    id: c.id,
    type: c.type === 'movie' || c.type === 'show' || c.type === 'documentary' ? c.type : 'original',
    badge: c.isNew ? 'NEW RELEASE' : 'MUST WATCH',
    titleEn: c.titleEn,
    titleHi: c.titleHi,
    tagline: c.description,
    year: c.year,
    rating: c.rating,
    duration: c.duration,
    genres: c.genres,
    gradientOverlay: 'linear-gradient(135deg, rgba(30,15,5,0.8) 0%, rgba(11,9,7,0.95) 100%)',
    posterGradient: c.posterUrl ? `url(${c.posterUrl}) center/cover no-repeat` : c.posterGradient,
    posterColor: c.posterColor,
    watchHref: c.watchHref || `/watch/${c.id}`,
    infoHref: `/info/${c.id}`,
    teaserUrl: c.teaserUrl || '',
  }));

  return (
    <div className="home-experience">

      {/* ── HERO CAROUSEL ── */}
      <HeroCarousel slides={heroSlides.length > 0 ? heroSlides : undefined} />

      {/* ── HOME CONTENT RAILS ── */}
      <div className="home-content">

        {/* Continue Watching */}
        <ContinueWatchingRail fallbackItems={CONTINUE_WATCHING} />

        {/* Trending Movies */}
        <div className="reveal">
          <ContentRail
            title="Trending Now"
            titleHi="ट्रेंडिंग"
            kicker="🔥 Most Watched"
            items={trendingMovies.length > 0 ? trendingMovies : effectiveMovies}
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
            items={trendingShows.length > 0 ? trendingShows : effectiveShows}
            variant="portrait"
            viewAllHref="/browse/shows"
          />
        </div>

        {/* Culture Commerce panel (animated with GSAP) */}
        <CulturePanel />

        {/* Music Highlights */}
        {effectiveMusic.length > 0 && (
          <div className="reveal">
            <ContentRail
              title="Music & Ragas"
              titleHi="संगीत और राग"
              kicker="🎵 Now Playing"
              items={effectiveMusic}
              variant="portrait"
              viewAllHref="/browse/music"
            />
          </div>
        )}

        {/* Featured Documentaries */}
        {effectiveDocs.length > 0 && (
          <div className="reveal">
            <ContentRail
              title="Documentaries"
              titleHi="वृत्तचित्र"
              kicker="🎥 Deep Dives"
              items={featuredDocs.length > 0 ? featuredDocs : effectiveDocs}
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

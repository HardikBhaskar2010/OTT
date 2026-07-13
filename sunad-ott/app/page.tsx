import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  ChevronRight,
  Clock3,
  Compass,
  Film,
  Flame,
  Flower2,
  Hand,
  IndianRupee,
  Info,
  Landmark,
  Languages,
  Lightbulb,
  MapPinned,
  Palette,
  Play,
  Radio,
  ShoppingBag,
  Sparkles,
  Star,
  Tv,
  Users,
  Wheat,
} from 'lucide-react';
import { PROGRAMS, CATEGORIES, HERO_SLIDES, getProgramThumbnail } from '@/lib/mockData';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  documentaries: Film,
  spiritual: Sparkles,
  history: Landmark,
  culture: Hand,
  tourism: MapPinned,
  yoga: Flower2,
  arts: Palette,
  agriculture: Wheat,
  education: BookOpen,
  entrepreneurship: Lightbulb,
  family: Users,
};

export const metadata: Metadata = {
  title: 'Home — Sunad OTT | Real Stories. Real Bharat.',
  description:
    'Discover premium Indian civilizational storytelling — documentaries, spiritual wisdom, history, culture, yoga, tourism and more. Watch live TV and on-demand content in Hindi and English.',
};

function ProgramCard({
  show,
  rank,
  wide = false,
}: {
  show: (typeof PROGRAMS)[number];
  rank?: number;
  wide?: boolean;
}) {
  return (
    <Link
      href={`/watch/${show.id}`}
      className={`content-card program-card${wide ? ' program-card--wide' : ''}`}
      aria-label={`${show.nameEn} — ${show.startTime} to ${show.endTime}`}
    >
      <div
        className="content-card__thumbnail"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(11,9,7,0.05), rgba(11,9,7,0.9)), url(${getProgramThumbnail(show.categoryId)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div className="content-card__overlay" aria-hidden="true" />
      {rank && (
        <span className="badge badge--gold-outline rank-badge">
          TOP {rank}
        </span>
      )}
      {show.isPrimeTime && !rank && (
        <span className="badge badge--gold-outline rank-badge">
          <Flame size={12} aria-hidden="true" /> Prime
        </span>
      )}
      <div className="content-card__body">
        <p className="content-card__title">
          <span className="lang-en-only">{show.nameEn}</span>
          <span className="lang-hi-only" lang="hi">{show.nameHi}</span>
        </p>
        <div className="content-card__meta">
          <Clock3 size={13} aria-hidden="true" />
          <span>{show.startTime} - {show.endTime}</span>
          {show.trpScore && <span>TRP {show.trpScore}%</span>}
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const hero = HERO_SLIDES[0];
  const heroProgram = PROGRAMS.find((p) => p.id === 'mystic-bharat') ?? PROGRAMS[0];
  const liveShow = PROGRAMS.find((p) => p.isLive);
  const primeTimeShows = PROGRAMS.filter((p) => p.isPrimeTime);
  const trendingShows = [...PROGRAMS]
    .sort((a, b) => (b.trpScore ?? 0) - (a.trpScore ?? 0))
    .slice(0, 8);
  const nextUpShows = PROGRAMS.slice(3, 7);
  const cultureShows = PROGRAMS.filter((p) => ['culture', 'arts', 'tourism'].includes(p.categoryId)).slice(0, 3);

  return (
    <div className="home-experience">
      <section className="home-hero" aria-label="Featured Sunad original">
        <div className="home-hero__media" aria-hidden="true">
          <Image
            src="/mystic_bharat.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="home-hero__image"
          />
        </div>
        <div className="home-hero__shade" aria-hidden="true" />
        <div className="home-hero__pattern" aria-hidden="true" />

        <div className="home-hero__inner">
          <div className="hero-copy reveal">
            <div className="hero-eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              <span className="lang-en-only">{hero.badge}</span>
              <span className="lang-hi-only" lang="hi">{hero.badgeHi}</span>
            </div>

            <h1 className="type-display-xl hero-title">
              <span className="lang-en-only">
                Stories of Bharat, streamed with <span className="hero-title__accent">shraddha</span> and cinema.
              </span>
              <span className="lang-hi-only" lang="hi">
                भारत की कहानियां, श्रद्धा और सिनेमा के साथ।
              </span>
            </h1>

            <p className="hero-description">
              <span className="lang-en-only">
                {hero.subtitleEn} Watch documentaries, live temple broadcasts, heritage journeys, and artisan-led stories in a premium bilingual experience.
              </span>
              <span className="lang-hi-only" lang="hi">
                {hero.subtitleHi} वृत्तचित्र, लाइव मंदिर प्रसारण, विरासत यात्राएं और कारीगरों की कहानियां एक प्रीमियम द्विभाषी अनुभव में देखें।
              </span>
            </p>

            <div className="hero-actions">
              <Link href={hero.href} className="btn-primary" id="hero-watch-now">
                <Play size={18} fill="currentColor" aria-hidden="true" />
                <span className="lang-en-only">Watch Now</span>
                <span className="lang-hi-only" lang="hi">अभी देखें</span>
              </Link>
              <Link href="/originals" className="btn-glass" id="hero-more-info">
                <Info size={18} aria-hidden="true" />
                <span className="lang-en-only">Explore Originals</span>
                <span className="lang-hi-only" lang="hi">ओरिजिनल देखें</span>
              </Link>
            </div>

            <div className="hero-meta" aria-label="Platform highlights">
              <div className="hero-meta__item">
                <strong>19</strong>
                <span className="lang-en-only">Daily shows</span>
                <span className="lang-hi-only" lang="hi">दैनिक कार्यक्रम</span>
              </div>
              <div className="hero-meta__item">
                <strong>2</strong>
                <span className="lang-en-only">Languages</span>
                <span className="lang-hi-only" lang="hi">भाषाएं</span>
              </div>
              <div className="hero-meta__item">
                <strong>4K</strong>
                <span className="lang-en-only">Premium plans</span>
                <span className="lang-hi-only" lang="hi">प्रीमियम अनुभव</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel reveal" aria-label="Tonight spotlight">
            <p className="hero-panel__label">
              <span className="lang-en-only">Tonight at {heroProgram.startTime}</span>
              <span className="lang-hi-only" lang="hi">आज रात {heroProgram.startTime}</span>
            </p>
            <h2 className="type-display-m hero-panel__title">
              <span className="lang-en-only">{heroProgram.nameEn}</span>
              <span className="lang-hi-only" lang="hi">{heroProgram.nameHi}</span>
            </h2>
            <p className="hero-panel__text">
              <span className="lang-en-only">{heroProgram.description}</span>
              <span className="lang-hi-only" lang="hi">{heroProgram.descriptionHi}</span>
            </p>
            <div className="culture-chips" aria-label="Content tags">
              {heroProgram.tags.slice(0, 4).map((tag) => (
                <span className="culture-chip" key={tag}>
                  <Star size={13} aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="card-actions" style={{ marginTop: 'var(--space-4)' }}>
              <Link href={`/watch/${heroProgram.id}`} className="btn-ghost">
                <span className="lang-en-only">Open Feature</span>
                <span className="lang-hi-only" lang="hi">फीचर खोलें</span>
                <ChevronRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {liveShow && (
        <section className="live-now-card reveal" aria-label="Live TV now playing">
          <div className="live-signal" aria-hidden="true">
            <Radio size={23} />
          </div>
          <div>
            <p className="live-now-card__eyebrow">
              <span className="lang-en-only">Live now from the Sunad mandap</span>
              <span className="lang-hi-only" lang="hi">सुनाद मंडप से लाइव</span>
            </p>
            <p className="live-now-card__title">
              <span className="lang-en-only">{liveShow.nameEn}</span>
              <span className="lang-hi-only" lang="hi">{liveShow.nameHi}</span>
            </p>
            <div className="live-progress" aria-hidden="true">
              <span />
            </div>
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

      <div className="home-content">
        <section className="content-row reveal" aria-labelledby="prime-time-heading">
          <div>
            <div className="section-header">
              <div>
                <span className="section-kicker">
                  <Flame size={15} aria-hidden="true" /> Prime Time
                </span>
                <h2 className="section-header__title" id="prime-time-heading">
                  <span className="lang-en-only">Tonight&apos;s cultural premieres</span>
                  <span className="lang-hi-only" lang="hi">आज रात की प्रमुख प्रस्तुतियां</span>
                </h2>
              </div>
              <Link href="/search" className="section-header__link">
                <span className="lang-en-only">Search all</span>
                <span className="lang-hi-only" lang="hi">सभी खोजें</span>
                <ChevronRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="rail rail--snap" role="list">
              {primeTimeShows.map((show) => (
                <ProgramCard key={show.id} show={show} wide />
              ))}
            </div>
          </div>

          <aside className="story-panel" aria-labelledby="next-up-heading">
            <span className="section-kicker">
              <Clock3 size={15} aria-hidden="true" /> Schedule
            </span>
            <h2 className="type-heading-2" id="next-up-heading" style={{ color: 'var(--primitive-white)', marginTop: 'var(--space-1)' }}>
              <span className="lang-en-only">Next on Sunad</span>
              <span className="lang-hi-only" lang="hi">आगे सुनाद पर</span>
            </h2>
            <div className="story-panel__grid">
              {nextUpShows.map((show) => (
                <Link href={`/watch/${show.id}`} className="story-mini" key={show.id}>
                  <div
                    className="story-mini__thumb"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(11,9,7,0.05), rgba(11,9,7,0.6)), url(${getProgramThumbnail(show.categoryId)})`,
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="story-mini__title">
                      <span className="lang-en-only">{show.nameEn}</span>
                      <span className="lang-hi-only" lang="hi">{show.nameHi}</span>
                    </p>
                    <p className="story-mini__meta">{show.startTime} - {show.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>

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
                Sunad connects films, field reporting, and a Bharat-first store so viewers can discover crafts, wellness goods, and regional producers from the same story world.
              </span>
              <span className="lang-hi-only" lang="hi">
                सुनाद फिल्मों, फील्ड रिपोर्टिंग और भारत-प्रथम स्टोर को जोड़ता है, ताकि दर्शक कहानी के साथ शिल्प, स्वास्थ्य सामग्री और स्थानीय उत्पाद भी खोज सकें।
              </span>
            </p>
            <div className="culture-chips">
              <span className="culture-chip"><ShoppingBag size={14} aria-hidden="true" /> Artisan Store</span>
              <span className="culture-chip"><Compass size={14} aria-hidden="true" /> Heritage Trails</span>
              <span className="culture-chip"><Languages size={14} aria-hidden="true" /> Hindi + English</span>
            </div>
            <div className="card-actions" style={{ marginTop: 'var(--space-4)' }}>
              <Link href="/store" className="btn-primary">
                <ShoppingBag size={18} aria-hidden="true" />
                <span className="lang-en-only">Visit Store</span>
                <span className="lang-hi-only" lang="hi">स्टोर देखें</span>
              </Link>
            </div>
          </div>
          <div className="culture-panel__media" aria-hidden="true">
            <Image
              src="/the_craftsmen.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        <section className="reveal" aria-labelledby="trending-heading">
          <div className="section-header">
            <div>
              <span className="section-kicker">
                <Star size={15} aria-hidden="true" /> Trending
              </span>
              <h2 className="section-header__title" id="trending-heading">
                <span className="lang-en-only">Most watched across Bharat</span>
                <span className="lang-hi-only" lang="hi">भारत में सबसे अधिक देखे गए</span>
              </h2>
            </div>
            <Link href="/search" className="section-header__link">
              <span className="lang-en-only">Find more</span>
              <span className="lang-hi-only" lang="hi">और खोजें</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="rail rail--snap" role="list">
            {trendingShows.map((show, idx) => (
              <ProgramCard key={show.id} show={show} rank={idx + 1} />
            ))}
          </div>
        </section>

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
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] ?? Sparkles;

              return (
                <Link
                  key={cat.id}
                  href={`/browse/${cat.id}`}
                  className="mini-category-tile category-tile"
                  role="listitem"
                  aria-label={cat.nameEn}
                  style={{ background: `linear-gradient(135deg, rgba(230,154,36,0.16), rgba(0,109,119,0.12)), ${cat.gradient}` }}
                >
                  <span className="mini-category-tile__icon" aria-hidden="true">
                    <Icon size={30} strokeWidth={1.5} />
                  </span>
                  <span className="mini-category-tile__label">
                    <span className="lang-en-only">{cat.nameEn}</span>
                    <span className="lang-hi-only" lang="hi">{cat.nameHi}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="story-panel reveal" aria-labelledby="editorial-heading">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div>
              <span className="section-kicker">
                <BookOpen size={15} aria-hidden="true" /> Editorial Picks
              </span>
              <h2 className="section-header__title" id="editorial-heading">
                <span className="lang-en-only">Journeys that feel rooted</span>
                <span className="lang-hi-only" lang="hi">जड़ से जुड़ी यात्राएं</span>
              </h2>
            </div>
          </div>
          <div className="story-panel__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {cultureShows.map((show) => (
              <Link href={`/watch/${show.id}`} className="story-mini" key={show.id}>
                <div
                  className="story-mini__thumb"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(11,9,7,0.05), rgba(11,9,7,0.55)), url(${getProgramThumbnail(show.categoryId)})`,
                  }}
                  aria-hidden="true"
                />
                <div>
                  <p className="story-mini__title">
                    <span className="lang-en-only">{show.nameEn}</span>
                    <span className="lang-hi-only" lang="hi">{show.nameHi}</span>
                  </p>
                  <p className="story-mini__meta">{show.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

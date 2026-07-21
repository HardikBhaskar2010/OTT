import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Play, Plus, Check, Share2, Star, Clock, Calendar, ShieldAlert, Sparkles, ShoppingBag, ArrowLeft, Tv, Film } from 'lucide-react';
import { HERO_SLIDES_V2, MOVIES, SHOWS, DOCUMENTARIES, MUSIC_CONTENT, PRODUCTS, ContentItem } from '@/lib/mockData';
import { ContentRail } from '@/components/ContentCard';

interface TitleInfoPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TitleInfoPageProps): Promise<Metadata> {
  const { id } = await params;
  const slide = HERO_SLIDES_V2.find((s) => s.id === id);
  const movie = MOVIES.find((m) => m.id === id);
  const show = SHOWS.find((s) => s.id === id);
  const doc = DOCUMENTARIES.find((d) => d.id === id);
  const music = MUSIC_CONTENT.find((m) => m.id === id);
  const item = slide || movie || show || doc || music;

  if (!item) {
    return { title: 'Title Not Found — Sunad TV' };
  }

  const title = 'titleEn' in item ? item.titleEn : (item as any).nameEn;
  const desc = 'tagline' in item ? item.tagline : ('description' in item ? item.description : 'Watch on Sunad TV');

  return {
    title: `${title} — Sunad TV`,
    description: desc,
  };
}

export default async function TitleInfoPage({ params }: TitleInfoPageProps) {
  const { id } = await params;

  // Search all mock data collections for matching item
  const heroSlide = HERO_SLIDES_V2.find((s) => s.id === id);
  const movie = MOVIES.find((m) => m.id === id);
  const show = SHOWS.find((s) => s.id === id);
  const doc = DOCUMENTARIES.find((d) => d.id === id);
  const music = MUSIC_CONTENT.find((m) => m.id === id);

  const titleEn = heroSlide?.titleEn || movie?.titleEn || show?.titleEn || doc?.titleEn || music?.titleEn;
  const titleHi = heroSlide?.titleHi || movie?.titleHi || show?.titleHi || doc?.titleHi || music?.titleHi;
  const tagline = heroSlide?.tagline || movie?.description || show?.description || doc?.description || music?.description || 'Experience authentic civilizational storytelling.';
  const year = heroSlide?.year || movie?.year || show?.year || doc?.year || music?.year || 2024;
  const rating = heroSlide?.rating || movie?.rating || show?.rating || doc?.rating || 'U';
  const duration = heroSlide?.duration || movie?.duration || show?.duration || doc?.duration || music?.duration || '1h 45m';
  const genres = heroSlide?.genres || movie?.genres || show?.genres || doc?.genres || music?.genres || ['Culture', 'Heritage'];
  const posterGradient = heroSlide?.posterGradient || movie?.posterGradient || show?.posterGradient || doc?.posterGradient || music?.posterGradient || 'linear-gradient(135deg, #1a0800 0%, #3d1500 100%)';
  const watchHref = heroSlide?.watchHref || movie?.watchHref || show?.watchHref || doc?.watchHref || music?.watchHref || `/watch/${id}`;

  if (!titleEn) {
    notFound();
  }

  // Linked culture store products
  const linkedProducts = PRODUCTS.slice(0, 3);
  
  // Similar recommended content
  const relatedItems: ContentItem[] = MOVIES.filter(m => m.id !== id).slice(0, 5);

  return (
    <div className="title-info-page" style={{ minHeight: '100vh', background: 'var(--primitive-black)', color: 'var(--primitive-ivory)' }}>
      {/* ── BACK BUTTON ── */}
      <div style={{ position: 'fixed', top: '90px', left: '24px', zIndex: 30 }}>
        <Link href="/" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      {/* ── HERO BANNER ── */}
      <section style={{
        position: 'relative',
        minHeight: '72vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 var(--space-6) var(--space-8)',
        background: `${posterGradient}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Gradients */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--primitive-black) 0%, rgba(11,9,7,0.7) 40%, rgba(11,9,7,0.3) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,9,7,0.9) 0%, rgba(11,9,7,0.5) 50%, transparent 100%)', pointerEvents: 'none' }} />

        {/* Content */}
        <div className="title-info-content reveal-fast" style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <span style={{ background: 'rgba(230,154,36,0.2)', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              SUNAD EXCLUSIVE
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500 }}>
              {rating}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.1, margin: 'var(--space-2) 0' }}>
            {titleEn}
            {titleHi && <span style={{ display: 'block', fontSize: '0.5em', opacity: 0.8, marginTop: '4px' }} lang="hi">{titleHi}</span>}
          </h1>

          {/* Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-dim)', fontSize: '0.95rem', margin: 'var(--space-2) 0 var(--space-4)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={15} /> {year}</span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={15} /> {duration}</span>
            <span>·</span>
            <span style={{ display: 'flex', gap: '6px' }}>
              {genres.map(g => (
                <span key={g} style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>{g}</span>
              ))}
            </span>
          </div>

          {/* Tagline / Synopsis */}
          <p style={{ fontSize: '1.15rem', color: 'var(--primitive-ivory)', lineHeight: 1.6, marginBottom: 'var(--space-6)', maxWidth: '680px' }}>
            {tagline}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <Link href={watchHref} className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <Play size={20} fill="currentColor" /> Watch Now
            </Link>
            <button className="btn-glass" style={{ padding: '14px 24px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={18} /> Add to Watchlist
            </button>
            <button className="btn-glass" style={{ padding: '14px 20px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>
      </section>

      {/* ── DETAILS & EPISODES / CULTURE COMMERCE SECTION ── */}
      <div style={{ padding: 'var(--space-8) var(--space-6)', maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Culture Commerce Linked Products */}
        <section className="reveal" style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
            <ShoppingBag size={18} style={{ color: 'var(--color-gold)' }} />
            <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Culture Commerce</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
            Crafts & Goods Featured in this World
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {linkedProducts.map((prod) => (
              <div key={prod.id} className="reveal-card" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>{prod.type}</span>
                  <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px', fontWeight: 600 }}>{prod.nameEn}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', lineHeight: 1.5, marginBottom: '16px' }}>{prod.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gold)' }}>₹{prod.price}</span>
                  <Link href={`/store`} className="btn-glass" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    View in Store
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Similar Titles */}
        <div className="reveal">
          <ContentRail
            title="More Like This"
            titleHi="इस जैसा और"
            items={relatedItems}
            variant="portrait"
          />
        </div>
      </div>
    </div>
  );
}

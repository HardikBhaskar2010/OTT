import type { Metadata } from 'next';
import Link from 'next/link';
import { Bookmark, Play, Trash2, Compass, Sparkles } from 'lucide-react';
import { MOVIES, SHOWS, DOCUMENTARIES } from '@/lib/mockData';
import { ContentCard } from '@/components/ContentCard';

export const metadata: Metadata = {
  title: 'My List — Sunad TV',
  description: 'Your saved documentaries, shows, and movies on Sunad TV.',
};

export default function MyListPage() {
  // Combine sample items to demonstrate My List
  const myListItems = [
    MOVIES[0],
    SHOWS[0],
    DOCUMENTARIES[0],
    MOVIES[1],
  ].filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', padding: '120px var(--space-6) var(--space-12)', background: 'var(--primitive-black)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="reveal-fast" style={{ marginBottom: 'var(--space-8)' }}>
          <span className="section-kicker">
            <Bookmark size={15} /> Saved Content
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display)', margin: 'var(--space-2) 0' }}>
            <span className="lang-en-only">My List</span>
            <span className="lang-hi-only" lang="hi">मेरी सूची</span>
          </h1>
          <p style={{ color: 'var(--color-text-dim)', fontSize: '1.05rem' }}>
            <span className="lang-en-only">Keep track of all the documentaries, series, and cultural shows you want to watch.</span>
            <span className="lang-hi-only" lang="hi">अपने पसंदीदा वृत्तचित्रों और शो को बाद में देखने के लिए सहेजें।</span>
          </p>
        </div>

        {/* Content Grid */}
        {myListItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
            {myListItems.map((item) => (
              <div key={item.id} className="reveal-card">
                <ContentCard item={item} variant="portrait" />
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <Bookmark size={48} style={{ color: 'var(--primitive-stone)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Your Watchlist is Empty</h2>
            <p style={{ color: 'var(--color-text-dim)', marginBottom: '24px' }}>Browse Sunad TV and click "+ Add to Watchlist" on any title.</p>
            <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
              <Compass size={18} /> Explore Catalog
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

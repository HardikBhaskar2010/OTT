'use client';

import { useState, useTransition, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LangContext';
import { useAuth } from '@/components/AuthContext';
import { CATEGORIES, ContentItem, getProgramThumbnail } from '@/lib/mockData';
import { getAllContentFromFirestore } from '@/lib/firestoreCatalog';
import { useSearchParams } from 'next/navigation';
import { trackSearchQuery } from '@/lib/analytics';

function SearchResults() {
  const { t } = useLang();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(urlQuery);
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<ContentItem[]>([]);
  const [contentList, setContentList] = useState<ContentItem[]>([]);

  // Load Firestore collection content on mount
  useEffect(() => {
    getAllContentFromFirestore()
      .then((items) => {
        if (items && items.length > 0) {
          setContentList(items);
        }
      })
      .catch((err) => {
        console.warn('Failed to load search catalog from Firestore:', err);
      });
  }, []);

  // Title and genre search match logic against Firestore content collection
  const performSearch = (val: string, catalog: ContentItem[]): ContentItem[] => {
    const q = val.trim().toLowerCase();
    if (!q) return [];

    return catalog.filter((item) => {
      const matchTitleEn = item.titleEn ? item.titleEn.toLowerCase().includes(q) : false;
      const matchTitleHi = item.titleHi ? item.titleHi.toLowerCase().includes(q) : false;
      const matchGenre = item.genres ? item.genres.some((g) => g.toLowerCase().includes(q)) : false;
      const matchCategory = item.categoryId ? item.categoryId.toLowerCase().includes(q) : false;
      const matchDesc = item.description ? item.description.toLowerCase().includes(q) : false;

      return matchTitleEn || matchTitleHi || matchGenre || matchCategory || matchDesc;
    });
  };

  const handleSearch = (val: string) => {
    setQuery(val);
    startTransition(() => {
      const filtered = performSearch(val, contentList);
      setResults(filtered);
      if (val.trim()) {
        trackSearchQuery(val.trim(), filtered.length, user?.uid);
      }
    });
  };

  // Sync URL query param → local state on mount / navigation
  useEffect(() => {
    if (urlQuery) {
      startTransition(() => {
        setQuery(urlQuery);
        const filtered = performSearch(urlQuery, contentList);
        setResults(filtered);
        trackSearchQuery(urlQuery.trim(), filtered.length, user?.uid);
      });
    }
  }, [urlQuery, contentList, user?.uid]);

  const trendingSearches = [
    { en: 'Mystic Bharat', hi: 'मिस्टिक भारत' },
    { en: 'Vedas', hi: 'वेद' },
    { en: 'Ayurveda', hi: 'आयुर्वेद' },
    { en: 'Civilization', hi: 'सभ्यता' },
  ];

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
      {/* ─── SEARCH INPUT ─── */}
      <section style={{ maxWidth: '800px', margin: '0 auto var(--space-8) auto', paddingTop: 'var(--space-4)' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('Search in English or हिंदी में खोजें...', 'अंग्रेजी या हिंदी में खोजें...')}
            style={{
              width: '100%',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '16px 24px 16px 56px',
              color: 'var(--primitive-white)',
              fontSize: 'var(--type-body-l)',
              outline: 'none',
              transition: 'border-color var(--motion-fast) var(--motion-easing)',
              boxShadow: 'var(--shadow-1)',
            }}
            className="search-input-focus"
          />
          {/* Search Icon */}
          <span
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-dim)',
              fontSize: '1.25rem',
            }}
          >
            🔍
          </span>

          {/* Clear Button */}
          {query && (
            <button
              onClick={() => handleSearch('')}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-dim)',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* ─── RESULTS OR EMPTY STATE ─── */}
      <section style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {query.trim() === '' ? (
          /* Empty state / Trending Searches */
          <div className="reveal-fade">
            <h2 className="type-heading-2" style={{ color: 'var(--primitive-white)', marginBottom: 'var(--space-3)' }}>
              {t('Trending Searches', 'लोकप्रिय खोजें')}
            </h2>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
              {trendingSearches.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(s.en)}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    color: 'var(--primitive-ivory)',
                    cursor: 'pointer',
                    fontSize: 'var(--type-label)',
                    transition: 'all var(--motion-fast) var(--motion-easing)',
                  }}
                  className="chip-hover"
                >
                  {t(s.en, s.hi)}
                </button>
              ))}
            </div>

            <h2 className="type-heading-2" style={{ color: 'var(--primitive-white)', marginBottom: 'var(--space-3)' }}>
              {t('Explore Categories', 'श्रेणियां देखें')}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 'var(--space-2)',
              }}
            >
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/browse/${c.id}`}
                  className="glass-subtle"
                  style={{
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textAlign: 'center',
                    transition: 'all var(--motion-fast) var(--motion-easing)',
                    minHeight: '100px',
                  }}
                >
                  <span style={{ fontSize: '1.75rem' }}>{c.icon}</span>
                  <span style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--primitive-white)' }}>
                    {t(c.nameEn, c.nameHi)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : isPending ? (
          /* Loading State */
          <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
            <span style={{ display: 'inline-block', fontSize: '2rem', animation: 'spin 1.5s linear infinite' }}>⏳</span>
            <p style={{ color: 'var(--color-text-dim)', marginTop: 'var(--space-2)' }}>{t('Searching...', 'खोज रहे हैं...')}</p>
          </div>
        ) : results.length > 0 ? (
          /* Matches list */
          <div className="reveal-fade">
            <h2 className="type-heading-2" style={{ color: 'var(--primitive-white)', marginBottom: 'var(--space-4)' }}>
              {t(`Found ${results.length} results`, `${results.length} परिणाम मिले`)}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={p.watchHref || `/watch/${p.id}`}
                  className="glass"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-2)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    alignItems: 'center',
                    transition: 'all var(--motion-fast) var(--motion-easing)',
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '16/9',
                      backgroundImage: p.posterUrl
                        ? `url(${p.posterUrl})`
                        : (p.posterGradient || `url(${getProgramThumbnail(p.categoryId)})`),
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ opacity: 0.1, fontSize: '1.5rem' }}>◈</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 600 }}>
                      {t(p.categoryId || 'Content', p.categoryId || 'सामग्री')}
                    </span>
                    <h3 style={{ fontSize: 'var(--type-body-l)', fontWeight: 600, color: 'var(--primitive-white)', margin: '2px 0 0 0' }}>
                      {p.titleEn} {p.titleHi ? `/ ${p.titleHi}` : ''}
                    </h3>
                    <p style={{ fontSize: 'var(--type-label)', color: 'var(--color-text-dim)', margin: '2px 0 0 0' }} className="truncate-2">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Zero results state */
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--space-12) 0',
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)',
            }}
            className="reveal-fade"
          >
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-2)' }}>🔍</span>
            <h2 className="type-display-m" style={{ color: 'var(--primitive-ivory)' }}>
              No matches found for &quot;{query}&quot; / कोई मेल नहीं मिला
            </h2>
            <p style={{ color: 'var(--color-text-dim)', marginBottom: 'var(--space-4)', maxWidth: '400px', marginInline: 'auto' }}>
              Check spelling or try searching for another term. Alternatively, explore our latest original documentaries below.
            </p>
            <Link href="/browse/documentaries" className="btn-primary" style={{ textDecoration: 'none' }}>
              Explore Documentaries / वृत्तचित्र देखें
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--color-text-dim)' }}>
          Loading Search...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}

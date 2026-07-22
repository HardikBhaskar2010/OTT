'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bookmark, Compass } from 'lucide-react';
import { ContentCard } from '@/components/ContentCard';
import type { ContentItem } from '@/lib/mockData';
import { getAllContentFromFirestore } from '@/lib/firestoreCatalog';
import { useAuth } from '@/components/AuthContext';
import { getUserMyList, removeFromMyList } from '@/lib/firestoreUserData';
import { trackMyListRemove } from '@/lib/analytics';

export default function MyListClient() {
  const { user, loading: authLoading } = useAuth();
  const [savedItems, setSavedItems] = useState<ContentItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || authLoading) return;

    let active = true;
    async function loadList() {
      setLoadingItems(true);
      if (user?.uid) {
        // Authenticated user: fetch from Firestore users/{uid}/myList
        const items = await getUserMyList(user.uid);
        if (active) {
          setSavedItems(items);
          setLoadingItems(false);
        }
      } else {
        // Guest user: fall back to localStorage list
        const storedIds = localStorage.getItem('sunad-my-list');
        if (storedIds) {
          try {
            const ids = JSON.parse(storedIds) as string[];
            const allItems = await getAllContentFromFirestore();
            const itemMap = new Map<string, ContentItem>();
            allItems.forEach((item) => itemMap.set(item.id, item));
            const items = ids
              .map((id) => itemMap.get(id))
              .filter((item): item is ContentItem => Boolean(item));
            if (active) setSavedItems(items);
          } catch (e) {
            console.error('Failed to parse my-list from localStorage', e);
          }
        }
        if (active) setLoadingItems(false);
      }
    }

    loadList();
    return () => {
      active = false;
    };
  }, [mounted, authLoading, user]);

  const handleRemove = async (id: string) => {
    const updatedItems = savedItems.filter((item) => item.id !== id);
    setSavedItems(updatedItems);
    trackMyListRemove(id, user?.uid);

    if (user?.uid) {
      await removeFromMyList(user.uid, id);
    } else {
      localStorage.setItem('sunad-my-list', JSON.stringify(updatedItems.map((i) => i.id)));
    }
  };

  // Wait for client mount to avoid hydration mismatch
  if (!mounted) return null;

  if (loadingItems || authLoading) {
    return (
      <div style={{ minHeight: '100vh', padding: '120px var(--space-6) var(--space-12)', background: 'var(--primitive-black)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', color: 'var(--color-text-dim)', textAlign: 'center', paddingTop: '60px' }}>
          Loading saved items...
        </div>
      </div>
    );
  }

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
          {savedItems.length > 0 && (
            <p style={{ color: 'var(--color-gold)', marginTop: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
              {savedItems.length} {savedItems.length === 1 ? 'title' : 'titles'} saved
            </p>
          )}
        </div>

        {/* Content Grid or Empty State */}
        {savedItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
            {savedItems.map((item) => (
              <div key={item.id} className="reveal-card" style={{ position: 'relative' }}>
                <ContentCard item={item} variant="portrait" />
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  aria-label={`Remove ${item.titleEn} from My List`}
                  title="Remove from My List"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <Bookmark size={48} style={{ color: 'var(--primitive-stone)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Your Watchlist is Empty</h2>
            <p style={{ color: 'var(--color-text-dim)', marginBottom: '24px' }}>
              Browse Sunad TV and click &ldquo;+ Add to Watchlist&rdquo; on any title.
            </p>
            <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
              <Compass size={18} /> Explore Catalog
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

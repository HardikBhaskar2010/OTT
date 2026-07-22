'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Plus, Check, Share2, Calendar, Clock, ShoppingBag, ArrowLeft } from 'lucide-react';
import { ContentItem, Product } from '@/lib/mockData';
import { ContentRail } from '@/components/ContentCard';
import { useLang } from '@/components/LangContext';
import { useAuth } from '@/components/AuthContext';
import { addToMyList, removeFromMyList, isInMyList } from '@/lib/firestoreUserData';
import { trackMyListAdd, trackMyListRemove } from '@/lib/analytics';

interface TitleInfoContentProps {
  id: string;
  titleEn: string;
  titleHi?: string;
  tagline: string;
  year: number | string;
  rating: string;
  duration: string;
  genres: string[];
  posterGradient: string;
  watchHref: string;
  linkedProducts: Product[];
  relatedItems: ContentItem[];
}

export function TitleInfoContent({
  id,
  titleEn,
  titleHi,
  tagline,
  year,
  rating,
  duration,
  genres,
  posterGradient,
  watchHref,
  linkedProducts,
  relatedItems,
}: TitleInfoContentProps) {
  const { t } = useLang();
  const { user } = useAuth();
  const [isInList, setIsInList] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    async function checkMyList() {
      if (user?.uid) {
        const inMyList = await isInMyList(user.uid, id);
        if (active) setIsInList(inMyList);
      } else {
        try {
          const stored = localStorage.getItem('sunad-my-list');
          if (stored) {
            const ids = JSON.parse(stored) as string[];
            if (active) setIsInList(ids.includes(id));
          } else {
            if (active) setIsInList(false);
          }
        } catch {
          if (active) setIsInList(false);
        }
      }
    }
    checkMyList();
    return () => {
      active = false;
    };
  }, [user, id]);

  const handleToggleMyList = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    const nextState = !isInList;
    setIsInList(nextState);

    if (nextState) {
      trackMyListAdd(id, user?.uid);
    } else {
      trackMyListRemove(id, user?.uid);
    }

    if (user?.uid) {
      if (nextState) {
        await addToMyList(user.uid, id);
      } else {
        await removeFromMyList(user.uid, id);
      }
    } else {
      try {
        const stored = localStorage.getItem('sunad-my-list');
        let ids: string[] = stored ? JSON.parse(stored) : [];
        if (nextState) {
          if (!ids.includes(id)) ids.push(id);
        } else {
          ids = ids.filter((item) => item !== id);
        }
        localStorage.setItem('sunad-my-list', JSON.stringify(ids));
      } catch (err) {
        console.error('Failed to update local storage my list:', err);
      }
    }
    setIsSyncing(false);
  };

  return (
    <div className="title-info-page" style={{ minHeight: '100vh', background: 'var(--primitive-black)', color: 'var(--primitive-ivory)' }}>
      {/* ── BACK BUTTON ── */}
      <div style={{ position: 'fixed', top: '90px', left: '24px', zIndex: 30 }}>
        <Link href="/" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> {t('Back', 'वापस')}
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
              {t('SUNAD EXCLUSIVE', 'सुनाद विशेष')}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500 }}>
              {rating}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ 
            fontSize: titleEn.length > 30 ? 'clamp(1.5rem, 3vw, 2.2rem)' : 'clamp(2.5rem, 5vw, 4rem)', 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700, 
            lineHeight: 1.1, 
            margin: 'var(--space-2) 0',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {titleEn}
            {titleHi && titleHi !== titleEn && <span style={{ display: 'block', fontSize: '0.5em', opacity: 0.8, marginTop: '4px' }} lang="hi">{titleHi}</span>}
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
              <Play size={20} fill="currentColor" /> {t('Watch Now', 'अभी देखें')}
            </Link>
            <button
              onClick={handleToggleMyList}
              disabled={isSyncing}
              className="btn-glass"
              style={{
                padding: '14px 24px',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: isInList ? '1px solid var(--color-gold)' : undefined,
                color: isInList ? 'var(--color-gold)' : undefined,
              }}
            >
              {isInList ? (
                <>
                  <Check size={18} /> {t('Remove from Watchlist', 'वॉचलिस्ट से हटाएं')}
                </>
              ) : (
                <>
                  <Plus size={18} /> {t('Add to Watchlist', 'वॉचलिस्ट में जोड़ें')}
                </>
              )}
            </button>
            <button className="btn-glass" style={{ padding: '14px 20px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Share2 size={18} /> {t('Share', 'साझा करें')}
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
            <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('Culture Commerce', 'संस्कृति वाणिज्य')}</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
            {t('Crafts & Goods Featured in this World', 'इस दुनिया में दिखाई गई शिल्पकला और वस्तुएं')}
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
                    {t('View in Store', 'स्टोर में देखें')}
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

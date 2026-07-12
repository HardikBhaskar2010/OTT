'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLang } from '@/components/LangContext';
import { PROGRAMS, PRODUCTS, Program, Product, getProgramThumbnail } from '@/lib/mockData';

const CartIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const VolumeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const GearIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const FullscreenIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { t } = useLang();
  const { id } = React.use(params);
  const [isPending, startTransition] = useTransition();

  // Find the program
  const program = PROGRAMS.find((p) => p.id === id);

  if (!program) {
    notFound();
  }

  // Find products linked to this program
  const linkedProducts = PRODUCTS.filter((prod) =>
    prod.linkedContentIds.includes(program.id)
  );

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // simulated initial progress at 35%
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'chapters' | 'transcript'>('chapters');
  const [showShopPanel, setShowShopPanel] = useState(false);

  // Auto-pause triggers the "Shop the Story" panel
  const handlePlayPause = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    if (!nextPlaying && linkedProducts.length > 0) {
      // Pause triggers "Shop the Story" panel
      setShowShopPanel(true);
    } else {
      setShowShopPanel(false);
    }
  };

  const chapters = [
    { time: '00:00', titleEn: 'Introduction & Context', titleHi: 'भूमिका और संदर्भ' },
    { time: '12:15', titleEn: 'Historical Evidences', titleHi: 'ऐतिहासिक प्रमाण' },
    { time: '28:40', titleEn: 'Architectural Analysis', titleHi: 'वास्तुशिल्प विश्लेषण' },
    { time: '45:10', titleEn: 'Civilizational Relevance', titleHi: 'सांस्कृतिक प्रासंगिकता' },
  ];

  const transcript = [
    { time: '01:10', speaker: 'Narrator', textEn: 'Welcome to this epic journey across Bharat\'s sacred geography...', textHi: 'भारत के पवित्र भूगोल की इस ऐतिहासिक यात्रा में आपका स्वागत है...' },
    { time: '14:20', speaker: 'Prof. Shastri', textEn: 'The architectural precision we see in these temples is not merely artistic...', textHi: 'इन मंदिरों में जो स्थापत्य कला की सूक्ष्मता हम देखते हैं, वह केवल कलात्मक नहीं है...' },
    { time: '30:45', speaker: 'Dr. Nair', textEn: 'By applying wave acoustics, we discovered a clear resonant frequency of 108Hz...', textHi: 'ध्वनि तरंगों का विश्लेषण करने पर, हमें 108Hz की एक स्पष्ट प्रतिध्वनि आवृत्ति मिली...' }
  ];

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
      {/* ─── BREADCRUMB ─── */}
      <nav style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--type-label)' }}>
        <Link href="/" style={{ color: 'var(--color-text-dim)', textDecoration: 'none' }}>
          {t('Home', 'होम')}
        </Link>
        <span style={{ color: 'var(--color-text-muted)', marginInline: 'var(--space-1)' }}>/</span>
        <Link href={`/browse/${program.categoryId}`} style={{ color: 'var(--color-text-dim)', textDecoration: 'none' }}>
          {t(program.category, program.category)}
        </Link>
        <span style={{ color: 'var(--color-text-muted)', marginInline: 'var(--space-1)' }}>/</span>
        <span style={{ color: 'var(--color-gold)' }}>
          {t(program.nameEn, program.nameHi)}
        </span>
      </nav>

      {/* ─── VIDEO SCREEN & DRAWER PANEL SECTION ─── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: showShopPanel ? '1fr 320px' : '1fr',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
        transition: 'grid-template-columns var(--motion-slow) var(--motion-easing)',
        alignItems: 'start'
      }}>
        {/* Main Mock Video Player Canvas */}
        <div style={{
          position: 'relative',
          aspectRatio: '16/9',
          background: '#040404',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-2)'
        }}>
          {/* Ambient card color mock background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to bottom, rgba(14,13,12,0.15), rgba(14,13,12,0.85)), url(${getProgramThumbnail(program.categoryId)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isPlaying ? 0.05 : 0.25,
            transition: 'opacity var(--motion-slow) var(--motion-easing)'
          }} />

          {/* Centered big status icon */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            {!isPlaying && (
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--color-border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-1)'
              }}>
                <span style={{ color: 'var(--color-gold)', fontSize: '2rem', marginLeft: '4px' }}>▶</span>
              </div>
            )}
          </div>

          {/* Interactive Player click overlay */}
          <div
            onClick={handlePlayPause}
            style={{ position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 2 }}
          />

          {/* Custom Skinned Control Bar */}
          <div className="glass" style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            padding: 'var(--space-3) var(--space-4)',
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            borderTop: '1px solid var(--color-glass-border)'
          }}>
            {/* Scrubber track */}
            <div style={{ position: 'relative', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-full)', cursor: 'pointer' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-gold)', borderRadius: 'var(--radius-full)' }} />
              
              {/* Chapter markers (Tick lines) */}
              {chapters.map((ch, idx) => {
                const percent = (idx / (chapters.length - 1)) * 100;
                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${percent}%`,
                      top: 0,
                      width: '2px',
                      height: '100%',
                      background: 'rgba(0,0,0,0.5)',
                      zIndex: 3
                    }}
                    title={t(ch.titleEn, ch.titleHi)}
                  />
                );
              })}
            </div>

            {/* Play controls row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--primitive-ivory)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <button
                  onClick={handlePlayPause}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '1.25rem' }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)' }}>
                  {isPlaying ? '21:15' : '00:00'} / 60:00
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                {linkedProducts.length > 0 && (
                  <button
                    onClick={() => setShowShopPanel(!showShopPanel)}
                    style={{
                      background: showShopPanel ? 'var(--color-gold)' : 'transparent',
                      color: showShopPanel ? 'var(--primitive-black)' : 'var(--color-gold)',
                      border: '1px solid var(--color-gold)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--type-caption)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CartIcon size={14} /> {t('Shop the Story', 'कहानी से खरीदें')}
                  </button>
                )}
                <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} title="Volume"><VolumeIcon size={16} /></span>
                <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} title="Settings"><GearIcon size={16} /></span>
                <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} title="Fullscreen"><FullscreenIcon size={16} /></span>
              </div>
            </div>
          </div>
        </div>

        {/* pause-triggered "Shop the Story" glassmorphic sidebar */}
        {showShopPanel && linkedProducts.length > 0 && (
          <aside className="glass-strong" style={{
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-gold)',
            height: '100%',
            aspectRatio: '16/27',
            maxHeight: '100%',
            overflowY: 'auto',
            padding: 'var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            animation: 'fadeIn var(--motion-base) var(--motion-easing)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-1)' }}>
              <h3 style={{ fontSize: 'var(--type-label)', fontWeight: 700, color: 'var(--color-gold)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CartIcon size={16} /> {t('Shop the Story', 'कहानी से खरीदें')}
              </h3>
              <button
                onClick={() => setShowShopPanel(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-text-dim)', cursor: 'pointer', fontSize: '0.875rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)', margin: 0 }}>
              {t('Handcrafted goods featured in this program:', 'इस कार्यक्रम में दिखाए गए हस्तनिर्मित उत्पाद:')}
            </p>

            {linkedProducts.map((prod) => (
              <div
                key={prod.id}
                className="glass-subtle"
                style={{
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius-md)',
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: 'var(--space-2)',
                  alignItems: 'center'
                }}
              >
                <div style={{ aspectRatio: '1/1', background: prod.thumbnail, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                  <span style={{ fontSize: '1rem', opacity: 0.1, margin: 'auto' }}>◈</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h4 style={{ fontSize: 'var(--type-caption)', fontWeight: 600, color: 'var(--primitive-white)', margin: 0 }}>
                    {t(prod.nameEn, prod.nameHi)}
                  </h4>
                  <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 700 }}>
                    ₹{prod.price}
                  </span>
                  <button
                    onClick={() => alert(t(`Added ${prod.nameEn} to bag`, `${prod.nameHi} झोले में डाला गया`))}
                    style={{
                      background: 'var(--color-gold)',
                      color: 'var(--primitive-black)',
                      border: 'none',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '4px',
                      alignSelf: 'flex-start'
                    }}
                  >
                    {t('Add to Cart', 'झोले में डालें')}
                  </button>
                </div>
              </div>
            ))}
          </aside>
        )}
      </section>

      {/* ─── DETAIL & CHAPTERS ROW ─── */}
      <section style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'var(--space-4)', alignItems: 'start' }}>
        {/* Title metadata */}
        <div>
          <h1 className="type-display-m" style={{ color: 'var(--primitive-white)', marginBottom: 'var(--space-1)' }}>
            {t(program.nameEn, program.nameHi)}
          </h1>
          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--type-caption)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
              {program.startTime} - {program.endTime}
            </span>
            <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 600 }}>
              {t(program.category, program.category)}
            </span>
            {program.trpScore && (
              <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)' }}>
                TRP {program.trpScore}%
              </span>
            )}
          </div>

          <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)', lineHeight: '1.6', marginBottom: 'var(--space-4)' }}>
            {t(program.description, program.descriptionHi)}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button
              onClick={() => setIsLiked(!isLiked)}
              style={{
                background: isLiked ? 'var(--color-gold)' : 'var(--color-surface)',
                color: isLiked ? 'var(--primitive-black)' : 'var(--primitive-white)',
                border: '1px solid var(--color-border)',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--motion-fast) var(--motion-easing)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isLiked ? '✓' : '＋'} {t('My List', 'मेरी सूची')}
            </button>
          </div>
        </div>

        {/* Interactive Chapters / Transcripts Sidebar Tabs */}
        <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setActiveTab('chapters')}
              style={{
                flex: 1,
                padding: '12px 0',
                background: activeTab === 'chapters' ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === 'chapters' ? 'var(--color-gold)' : 'var(--color-text-dim)',
                border: 'none',
                borderBottom: activeTab === 'chapters' ? '2px solid var(--color-gold)' : 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 'var(--type-label)'
              }}
            >
              {t('Chapters', 'अध्याय')}
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              style={{
                flex: 1,
                padding: '12px 0',
                background: activeTab === 'transcript' ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === 'transcript' ? 'var(--color-gold)' : 'var(--color-text-dim)',
                border: 'none',
                borderBottom: activeTab === 'transcript' ? '2px solid var(--color-gold)' : 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 'var(--type-label)'
              }}
            >
              {t('Transcript', 'ट्रांसक्रिप्ट')}
            </button>
          </div>

          <div style={{ padding: 'var(--space-3)', maxHeight: '300px', overflowY: 'auto' }}>
            {activeTab === 'chapters' ? (
              /* Chapters list */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {chapters.map((ch, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.01)',
                      cursor: 'pointer',
                      transition: 'background var(--motion-fast) var(--motion-easing)'
                    }}
                    className="hover-card-bg"
                  >
                    <span style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--primitive-white)' }}>
                      {t(ch.titleEn, ch.titleHi)}
                    </span>
                    <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)' }}>
                      {ch.time}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              /* Transcripts */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {transcript.map((line, idx) => (
                  <div key={idx} style={{ fontSize: 'var(--type-label)', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <strong style={{ color: 'var(--color-gold)', fontSize: 'var(--type-caption)' }}>
                        {line.speaker}
                      </strong>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--type-caption)' }}>
                        {line.time}
                      </span>
                    </div>
                    <p style={{ color: 'var(--color-text-dim)', margin: 0 }}>
                      {t(line.textEn, line.textHi)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

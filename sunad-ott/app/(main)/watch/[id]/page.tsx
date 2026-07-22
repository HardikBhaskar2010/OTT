'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { useLang } from '@/components/LangContext';
import { useAuth } from '@/components/AuthContext';
import { PROGRAMS, MOVIES, SHOWS, DOCUMENTARIES, MUSIC_CONTENT, ContentItem, PRODUCTS, Program } from '@/lib/mockData';
import { getContentByIdFromFirestore } from '@/lib/firestoreCatalog';
import { addToMyList, removeFromMyList, isInMyList, saveWatchProgress, getWatchProgressItem } from '@/lib/firestoreUserData';
import { trackContentWatched, trackWatchProgress, trackMyListAdd, trackMyListRemove } from '@/lib/analytics';
import seededCatalog from '@/lib/seeded-catalog.json';

const CartIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { t } = useLang();
  const { id } = React.use(params);

  // Helper to extract youtubeVideoId from seeded catalog or item
  const getInitialYoutubeId = (itemId: string): string | undefined => {
    if (seededCatalog && typeof seededCatalog === 'object' && itemId in seededCatalog) {
      const seededItem = (seededCatalog as Record<string, ContentItem>)[itemId];
      if (seededItem?.youtubeVideoId) return seededItem.youtubeVideoId;
    }
    const allContent: ContentItem[] = [...MOVIES, ...SHOWS, ...DOCUMENTARIES, ...MUSIC_CONTENT];
    const cItem = allContent.find((c) => c.id === itemId);
    return cItem?.youtubeVideoId;
  };

  // Find the program (initial state from mock, then sync from Firestore)
  const [program, setProgram] = useState<Program | null>(() => {
    const p = PROGRAMS.find((item) => item.id === id);
    if (p) {
      const ytId = p.youtubeVideoId || getInitialYoutubeId(id);
      return { ...p, youtubeVideoId: ytId };
    }
    const allContent: ContentItem[] = [...MOVIES, ...SHOWS, ...DOCUMENTARIES, ...MUSIC_CONTENT];
    const contentItem = allContent.find((c) => c.id === id);
    if (contentItem) {
      return {
        id: contentItem.id,
        nameEn: contentItem.titleEn,
        nameHi: contentItem.titleHi,
        description: contentItem.description ?? '',
        descriptionHi: contentItem.description ?? '',
        category: contentItem.type ?? 'Content',
        categoryId: contentItem.categoryId ?? 'movies',
        tags: contentItem.genres ?? [],
        startTime: '',
        endTime: '',
        trpScore: undefined,
        isLive: false,
        thumbnailGradient: contentItem.posterUrl ? `url(${contentItem.posterUrl}) center/cover no-repeat` : (contentItem.posterGradient ?? 'linear-gradient(135deg, #1a0800, #3d1500)'),
        posterColor: '#1a0800',
        youtubeVideoId: contentItem.youtubeVideoId || getInitialYoutubeId(id),
      } as Program;
    }
    return null;
  });

  useEffect(() => {
    getContentByIdFromFirestore(id).then((contentItem) => {
      if (contentItem) {
        setProgram((prev) => ({
          id: contentItem.id,
          nameEn: contentItem.titleEn || prev?.nameEn || '',
          nameHi: contentItem.titleHi || prev?.nameHi || '',
          description: contentItem.description ?? prev?.description ?? '',
          descriptionHi: contentItem.description ?? prev?.descriptionHi ?? '',
          category: contentItem.categoryId ?? prev?.category ?? 'Content',
          categoryId: contentItem.categoryId ?? prev?.categoryId ?? 'movies',
          tags: contentItem.genres ?? prev?.tags ?? [],
          startTime: prev?.startTime || '',
          endTime: prev?.endTime || '',
          trpScore: prev?.trpScore,
          isLive: prev?.isLive ?? false,
          thumbnailGradient: contentItem.posterUrl ? `url(${contentItem.posterUrl}) center/cover no-repeat` : (contentItem.posterGradient ?? prev?.thumbnailGradient ?? 'linear-gradient(135deg, #1a0800, #3d1500)'),
          posterColor: '#1a0800',
          youtubeVideoId: contentItem.youtubeVideoId || prev?.youtubeVideoId || getInitialYoutubeId(id),
        } as Program));
      }
    });
  }, [id]);

  if (!program) {
    notFound();
  }

  // Find products linked to this program
  const linkedProducts = PRODUCTS.filter((prod) =>
    prod.linkedContentIds.includes(program.id)
  );

  // States
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerRef, setPlayerRef] = useState<YouTubePlayer | null>(null);
  const [isInList, setIsInList] = useState(false);
  const [isSyncingList, setIsSyncingList] = useState(false);
  const [_progressSeconds, setProgressSeconds] = useState(0);
  const hasTrackedWatchedRef = React.useRef(false);

  const [durationSeconds, setDurationSeconds] = useState(3600);
  const [activeTab, setActiveTab] = useState<'chapters' | 'transcript'>('chapters');
  const [showShopPanel, setShowShopPanel] = useState(false);

  // Check My List status in Firestore / localStorage
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
    if (isSyncingList) return;
    setIsSyncingList(true);
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
    setIsSyncingList(false);
  };

  // Fetch existing watch progress for authenticated user
  useEffect(() => {
    let active = true;
    if (user?.uid) {
      getWatchProgressItem(user.uid, id).then((item) => {
        if (active && item && item.progressSeconds > 0) {
          setProgressSeconds(item.progressSeconds);
          if (item.durationSeconds > 0) {
            setDurationSeconds(item.durationSeconds);
          }
        }
      });
    }
    return () => {
      active = false;
    };
  }, [user, id]);

  // YouTube player handlers
  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    setPlayerRef(event.target);
    try {
      const dur = event.target.getDuration();
      if (dur > 0) setDurationSeconds(dur);
    } catch {
      // Ignore if unavailable
    }
  };

  const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
    // 1: PLAYING, 2: PAUSED, 0: ENDED
    if (event.data === 1) {
      setIsPlaying(true);
      setShowShopPanel(false);
      if (!hasTrackedWatchedRef.current) {
        hasTrackedWatchedRef.current = true;
        trackContentWatched(id, user?.uid);
      }
    } else {
      setIsPlaying(false);
      if (event.data === 2 && linkedProducts.length > 0) {
        setShowShopPanel(true);
      }
    }
  };

  // Poll player's getCurrentTime() every 30 seconds while playing
  useEffect(() => {
    if (!isPlaying || !playerRef || !id) return;

    const recordProgress = () => {
      try {
        if (typeof playerRef.getCurrentTime === 'function' && typeof playerRef.getDuration === 'function') {
          const current = playerRef.getCurrentTime() || 0;
          const dur = playerRef.getDuration() || durationSeconds;
          if (dur > 0) setDurationSeconds(dur);
          if (current > 0) {
            const currentFloor = Math.floor(current);
            const durFloor = Math.floor(dur);
            setProgressSeconds(currentFloor);
            if (user?.uid) {
              saveWatchProgress(user.uid, id, currentFloor, durFloor);
            }
            trackWatchProgress(id, user?.uid || null, currentFloor);
          }
        }
      } catch (err) {
        console.warn('Failed to record watch progress:', err);
      }
    };

    // Immediate update on start/resume
    recordProgress();

    // Interval every 30 seconds
    const intervalId = setInterval(recordProgress, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user, isPlaying, playerRef, id, durationSeconds]);

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

  const youtubeVideoId = program.youtubeVideoId;

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
        {/* Main Video Player Canvas */}
        <div style={{
          position: 'relative',
          aspectRatio: '16/9',
          background: '#040404',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-2)'
        }}>
          {youtubeVideoId ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <YouTube
                videoId={youtubeVideoId}
                opts={{
                  height: '100%',
                  width: '100%',
                  playerVars: {
                    autoplay: 0,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
                onReady={handlePlayerReady}
                onStateChange={handleStateChange}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                iframeClassName="youtube-iframe"
              />
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              background: 'linear-gradient(135deg, rgba(20, 15, 10, 0.95), rgba(10, 8, 5, 0.98))',
              color: 'var(--primitive-ivory)',
              textAlign: 'center',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-2)', filter: 'drop-shadow(0 0 12px rgba(217, 119, 6, 0.4))' }}>
                🎬
              </div>
              <h2 style={{ fontSize: 'var(--type-heading-2)', fontWeight: 700, color: 'var(--color-gold)', marginBottom: 'var(--space-1)' }}>
                {t('Video Coming Soon', 'वीडियो जल्द आ रहा है')}
              </h2>
              <p style={{ fontSize: 'var(--type-body-m)', color: 'var(--color-text-dim)', maxWidth: '420px', margin: 0 }}>
                {t(
                  'This title is currently being prepared for streaming. Check back soon for the full program.',
                  'यह कार्यक्रम जल्द ही स्ट्रीमिंग के लिए उपलब्ध होगा। कृपया शीघ्र ही पुनः देखें।'
                )}
              </p>
            </div>
          )}
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
              onClick={handleToggleMyList}
              disabled={isSyncingList}
              style={{
                background: isInList ? 'var(--color-gold)' : 'var(--color-surface)',
                color: isInList ? 'var(--primitive-black)' : 'var(--primitive-white)',
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
              {isInList ? '✓' : '＋'} {isInList ? t('In My List', 'मेरी सूची में') : t('Add to My List', 'मेरी सूची में जोड़ें')}
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

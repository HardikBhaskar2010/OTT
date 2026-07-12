'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LangContext';
import { PROGRAMS, WEEKLY_SPECIALS, getProgramThumbnail } from '@/lib/mockData';

// Format time strings (e.g. "05:00" to minutes) for comparisons
function parseTimeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

const BellIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const SparklesIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', color: 'var(--color-gold)' }} aria-hidden="true">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" opacity="0.6" />
    <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" opacity="0.6" />
  </svg>
);

export default function LivePage() {
  const { t } = useLang();
  const [, startTransition] = useTransition();

  // Active day selection (Monday to Sunday)
  const days = [
    { key: 'Monday', labelEn: 'Mon', labelHi: 'सोम' },
    { key: 'Tuesday', labelEn: 'Tue', labelHi: 'मंगल' },
    { key: 'Wednesday', labelEn: 'Wed', labelHi: 'बुध' },
    { key: 'Thursday', labelEn: 'Thu', labelHi: 'गुरु' },
    { key: 'Friday', labelEn: 'Fri', labelHi: 'शुक्र' },
    { key: 'Saturday', labelEn: 'Sat', labelHi: 'शनि' },
    { key: 'Sunday', labelEn: 'Sun', labelHi: 'रवि' },
  ];

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(0);

  // Sync current time of day in minutes (local time simulator)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Simulate real local hours & minutes or default to a standard FPC prime time slot (e.g., 20:15)
      // so it is easily testable on load. We'll default to 20:15 (8:15 PM, Mystic Bharat).
      const simulatedHours = now.getHours();
      const simulatedMinutes = now.getMinutes();
      const totalMinutes = simulatedHours * 60 + simulatedMinutes;
      setCurrentTimeMinutes(totalMinutes);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const activeLiveProgram = PROGRAMS.find((p) => {
    const start = parseTimeToMinutes(p.startTime);
    const end = parseTimeToMinutes(p.endTime);
    if (end < start) {
      return currentTimeMinutes >= start || currentTimeMinutes < end;
    }
    return currentTimeMinutes >= start && currentTimeMinutes < end;
  }) || PROGRAMS[0];

  const activeTheme = WEEKLY_SPECIALS[selectedDay as keyof typeof WEEKLY_SPECIALS];

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
      {/* ─── TITLE SECTION ─── */}
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="type-display-l" style={{ color: 'var(--primitive-ivory)', marginBottom: 'var(--space-1)' }}>
          {t('Live TV & EPG', 'लाइव टीवी और कार्यक्रम गाइड')}
        </h1>
        <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)' }}>
          {t('Broadcast Schedule based on Fixed Programming Chart', 'निर्धारित प्रसारण समय सारणी और लाइव टीवी')}
        </p>
      </header>

      {/* ─── LIVE STREAM SIMULATION PLAYER ─── */}
      {activeLiveProgram && (
        <section style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          {/* Simulated 16:9 Video Canvas */}
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            background: '#050505',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-2)'
          }}>
            {/* Ambient background glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(to bottom, rgba(14,13,12,0.15), rgba(14,13,12,0.85)), url(${getProgramThumbnail(activeLiveProgram.categoryId)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.25,
            }} />

            {/* Simulated Live Ticker Badge overlay */}
            <div style={{
              position: 'absolute',
              top: 'var(--space-2)',
              left: 'var(--space-2)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              background: 'var(--color-live)',
              color: 'var(--primitive-white)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--type-caption)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              zIndex: 10
            }}>
              <span style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#FFF',
                animation: 'pulse 1.5s infinite'
              }} />
              {t('LIVE', 'लाइव')}
            </div>

            <div style={{
              position: 'absolute',
              top: 'var(--space-2)',
              right: 'var(--space-2)',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'var(--glass-blur-subtle)',
              color: 'var(--primitive-ivory)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--type-caption)',
              zIndex: 10
            }}>
              {t('12.5K Viewers', '12.5K दर्शक')}
            </div>

            {/* Play Button Mock Icon */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 5,
              boxShadow: 'var(--shadow-gold)',
              transition: 'transform var(--motion-fast) var(--motion-easing)'
            }}
            className="btn-play-hover"
            >
              <span style={{ color: 'var(--primitive-black)', fontSize: '1.75rem', marginLeft: '4px' }}>▶</span>
            </div>

            {/* Bottom Scrubber Mock overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'rgba(255,255,255,0.1)'
            }}>
              <div style={{
                width: '75%',
                height: '100%',
                background: 'var(--color-gold)'
              }} />
            </div>
          </div>

          {/* Current Program Details */}
          <div className="glass-strong" style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--space-2)'
          }}>
            <span style={{
              color: 'var(--color-gold)',
              fontSize: 'var(--type-caption)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              {t('ON AIR NOW / लाइव प्रसारण', 'लाइव प्रसारण')}
            </span>
            <h2 className="type-display-m" style={{ color: 'var(--primitive-white)', margin: 0 }}>
              {t(activeLiveProgram.nameEn, activeLiveProgram.nameHi)}
            </h2>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'var(--type-caption)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                {activeLiveProgram.startTime} - {activeLiveProgram.endTime}
              </span>
              <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 600 }}>
                {t(activeLiveProgram.category, activeLiveProgram.category)}
              </span>
            </div>
            <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)', lineHeight: '1.6' }}>
              {t(activeLiveProgram.description, activeLiveProgram.descriptionHi)}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              <Link href={`/watch/${activeLiveProgram.id}`} className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {t('Enter Theater / थियेटर में जाएं', 'थियेटर में जाएं')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── WEEKDAY SELECTOR & THEME BANNER ─── */}
      <section style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => {
                startTransition(() => {
                  setSelectedDay(day.key);
                });
              }}
              style={{
                background: selectedDay === day.key ? 'var(--color-gold)' : 'var(--color-surface)',
                color: selectedDay === day.key ? 'var(--primitive-black)' : 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all var(--motion-fast) var(--motion-easing)',
                minWidth: '72px'
              }}
            >
              {t(day.labelEn, day.labelHi)}
            </button>
          ))}
        </div>

        {/* Weekly Theme Banner */}
        {activeTheme && (
          <div className="glass" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '4px solid var(--color-gold)',
            marginBottom: 'var(--space-4)'
          }}>
            <SparklesIcon size={20} />
            <div>
              <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                {t('Today\'s Special theme', 'आज का विशेष विषय')}
              </span>
              <h3 style={{ margin: 0, fontSize: 'var(--type-body-l)', color: 'var(--primitive-white)' }}>
                {t(activeTheme.nameEn, activeTheme.nameHi)}
              </h3>
            </div>
          </div>
        )}
      </section>

      {/* ─── EPG SCHEDULE LIST ─── */}
      <section className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr 180px',
          padding: 'var(--space-2) var(--space-4)',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid var(--color-border)',
          fontWeight: 600,
          color: 'var(--color-text-dim)',
          fontSize: 'var(--type-label)'
        }}>
          <div>{t('Time', 'समय')}</div>
          <div>{t('Program Description', 'कार्यक्रम विवरण')}</div>
          <div style={{ textAlign: 'right' }}>{t('Action', 'कार्रवाई')}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PROGRAMS.map((p) => {
            const isLiveNow = activeLiveProgram?.id === p.id;
            // Determine if past or future
            const startMins = parseTimeToMinutes(p.startTime);
            const currentMins = currentTimeMinutes;
            const isPast = startMins < currentMins && !isLiveNow;
            const isFuture = startMins > currentMins;

            return (
              <div
                key={p.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 180px',
                  padding: 'var(--space-3) var(--space-4)',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--color-border)',
                  background: isLiveNow ? 'color-mix(in oklch, var(--color-gold) 6%, transparent)' : 'transparent',
                  borderLeft: isLiveNow ? '3px solid var(--color-gold)' : '3px solid transparent',
                  opacity: isPast ? 0.5 : 1,
                  transition: 'background var(--motion-fast) var(--motion-easing)'
                }}
              >
                {/* Time Slot */}
                <div style={{ fontWeight: 700, fontSize: 'var(--type-body-l)', color: isLiveNow ? 'var(--color-gold)' : 'var(--color-text)' }}>
                  {p.startTime}
                </div>

                {/* Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                    <h3 style={{
                      fontSize: 'var(--type-body-l)',
                      fontWeight: 600,
                      color: isLiveNow ? 'var(--color-gold)' : 'var(--primitive-white)',
                      margin: 0
                    }}>
                      {t(p.nameEn, p.nameHi)}
                    </h3>
                    <span style={{
                      fontSize: '0.7rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--color-border)',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text-dim)'
                    }}>
                      {t(p.category, p.category)}
                    </span>
                    {isLiveNow && (
                      <span className="pulse-dot" style={{
                        background: 'var(--color-live)',
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-sm)',
                        letterSpacing: '0.04em'
                      }}>
                        {t('ON AIR', 'लाइव')}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: 'var(--type-label)',
                    color: 'var(--color-text-dim)',
                    margin: 0,
                    lineHeight: 1.5
                  }}>
                    {t(p.description, p.descriptionHi)}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-1)' }}>
                  {isLiveNow && (
                    <Link
                      href={`/watch/${p.id}`}
                      className="btn-primary"
                      style={{
                        padding: '8px 16px',
                        fontSize: 'var(--type-caption)',
                        textDecoration: 'none',
                        minHeight: '36px',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {t('Tune In', 'लाइव देखें')}
                    </Link>
                  )}
                  {isPast && (
                    <Link
                      href={`/watch/${p.id}`}
                      style={{
                        background: 'var(--color-surface)',
                        color: 'var(--primitive-ivory)',
                        border: '1px solid var(--color-border)',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--type-caption)',
                        textDecoration: 'none',
                        minHeight: '36px',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {t('Watch Catch-up', 'पुनः देखें')}
                    </Link>
                  )}
                  {isFuture && (
                    <button
                      onClick={() => alert(t(`Reminder set for ${p.nameEn}`, `${p.nameHi} के लिए अनुस्मारक सेट किया गया`))}
                      style={{
                        background: 'transparent',
                        color: 'var(--color-gold)',
                        border: '1px solid var(--color-gold-dim)',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--type-caption)',
                        cursor: 'pointer',
                        minHeight: '36px',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6.5px' }}>
                        <BellIcon size={13} />
                        {t('Remind Me', 'याद दिलाएं')}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

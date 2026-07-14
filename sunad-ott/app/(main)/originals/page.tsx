'use client';

import Link from 'next/link';
import { useLang } from '@/components/LangContext';
import { PROGRAMS, getProgramThumbnail } from '@/lib/mockData';

export default function OriginalsPage() {
  const { t } = useLang();

  // Selected original shows (high TRP/premium productions)
  const originalIds = ['mystic-files', 'sanatan-gyan', 'indian-heritage', 'success-india', 'women-of-india'];
  const originalPrograms = PROGRAMS.filter((p) => originalIds.includes(p.id));

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
      {/* ─── ORIGINALS HEADER ─── */}
      <header style={{
        marginBottom: 'var(--space-6)',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: 'var(--space-4)'
      }}>
        <span style={{
          color: 'var(--color-gold)',
          fontSize: 'var(--type-caption)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: 'var(--space-1)'
        }}>
          CultureFlix Originals / कल्चरफ्लिक्स ओरिजिनल
        </span>
        <h1 className="type-display-l" style={{ color: 'var(--primitive-white)', margin: 0 }}>
          {t('Premium Civilizational Productions', 'उत्कृष्ट सांस्कृतिक प्रस्तुतियां')}
        </h1>
        <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)', marginTop: '4px' }}>
          {t('Prestige original documentary series, discourses and narrative journeys.', 'कल्चरफ्लिक्स द्वारा विशेष रूप से निर्मित मूल वृत्तचित्र और ज्ञान श्रृंखलाएं।')}
        </p>
      </header>

      {/* ─── FEATURED BANNER ─── */}
      <section className="glass-strong" style={{
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-8)',
        border: '1px solid var(--color-border-gold)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-6)',
        alignItems: 'center'
      }}>
        <div>
          <span style={{
            background: 'var(--color-gold)',
            color: 'var(--primitive-black)',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            letterSpacing: '0.06em',
            display: 'inline-block',
            marginBottom: 'var(--space-2)'
          }}>
            {t('PREMIER SERIES', 'प्रमुख सीरीज़')}
          </span>
          <h2 className="type-display-m" style={{ color: 'var(--primitive-white)', marginBottom: 'var(--space-2)' }}>
            Mystic Bharat / <span lang="hi" style={{ fontFamily: 'var(--font-display-hi)' }}>मिस्टिक भारत</span>
          </h2>
          <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            {t(
              'A journey through the timeless civilization, culture, wisdom and resilience of Bharat. Uncover the mathematical precision behind temple acoustics and lost civilizational technologies.',
              'भारत की शाश्वत सभ्यता, संस्कृति, ज्ञान और जुझारूपन की एक यात्रा। मंदिर ध्वनिकी और खोई हुई सभ्यताओं के पीछे की तकनीकी समझ का अनावरण।'
            )}
          </p>
          <Link href="/watch/mystic-files" className="btn-primary" style={{ textDecoration: 'none' }}>
            {t('Watch Now / अभी देखें', 'अभी देखें')}
          </Link>
        </div>
        <div style={{
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #2d1a00 0%, #1a0a00 100%)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--color-border)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <span style={{ fontSize: '3rem', opacity: 0.15 }}>◈</span>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 30%, rgba(14,13,12,0.8) 100%)'
          }} />
        </div>
      </section>

      {/* ─── ORIGINALS GRID ─── */}
      <section>
        <h2 className="type-heading-2" style={{ color: 'var(--primitive-white)', marginBottom: 'var(--space-3)' }}>
          {t('Browse All Originals', 'सभी ओरिजिनल ब्राउज़ करें')}
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-3)'
        }}>
          {originalPrograms.map((p) => (
            <Link
              key={p.id}
              href={`/watch/${p.id}`}
              className="content-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                transition: 'all var(--motion-base) var(--motion-easing)',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                backgroundImage: `linear-gradient(to bottom, rgba(14,13,12,0.15), rgba(14,13,12,0.85)), url(${getProgramThumbnail(p.categoryId)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <span style={{
                  position: 'absolute',
                  top: 'var(--space-1)',
                  left: 'var(--space-1)',
                  background: 'rgba(0,0,0,0.8)',
                  border: '1px solid var(--color-border-gold)',
                  color: 'var(--color-gold)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  letterSpacing: '0.04em'
                }}>
                  ORIGINAL
                </span>
                
                <span style={{ opacity: 0.15, fontSize: '3rem', color: 'var(--primitive-gold)' }}>◈</span>
              </div>

              <div style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flexGrow: 1 }}>
                <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 600 }}>
                  {p.category}
                </span>
                <h3 style={{
                  fontSize: 'var(--type-body-l)',
                  fontWeight: 600,
                  color: 'var(--primitive-white)',
                  margin: '4px 0 0 0',
                  lineHeight: '1.4'
                }}>
                  {p.nameEn} / <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>{p.nameHi}</span>
                </h3>
                <p style={{
                  fontSize: 'var(--type-label)',
                  color: 'var(--color-text-dim)',
                  margin: '4px 0 0 0',
                  lineHeight: '1.5',
                  flexGrow: 1
                }} className="truncate-2">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

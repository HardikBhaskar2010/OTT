'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LangContext';
import { PLANS } from '@/lib/mockData';

export default function PlansPage() {
  const { t } = useLang();

  // Highlight recommended plan
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const comparisonFeatures = [
    { key: 'catalog', nameEn: 'Access to standard catalog', nameHi: 'सामान्य कैटलॉग तक पहुंच', free: true, premium: true, family: true, patron: true },
    { key: 'premium', nameEn: 'Premium originals (e.g. Mystic Bharat)', nameHi: 'प्रीमियम ओरिजिनल्स तक पूर्ण पहुंच', free: false, premium: true, family: true, patron: true },
    { key: 'screens', nameEn: 'Simultaneous screens', nameHi: 'एक साथ स्क्रीन संख्या', free: '1 Screen (SD)', premium: '2 Screens (Full HD)', family: '4 Screens (4K Ultra HD)', patron: '4 Screens (4K Ultra HD + Atmos)' },
    { key: 'downloads', nameEn: 'Offline downloads', nameHi: 'ऑफ़लाइन डाउनलोड', free: false, premium: true, family: true, patron: true },
    { key: 'store', nameEn: 'Artisan Store discounts', nameHi: 'कारीगर स्टोर पर विशेष छूट', free: 'None', premium: '5% Discount', family: '10% Discount', patron: '15% Discount + Early Access' },
    { key: 'support', nameEn: 'Civilizational support contribution', nameHi: 'सांस्कृतिक संरक्षण दान योगदान', free: 'None', premium: 'None', family: 'None', patron: '₹200/mo direct to Rural Art Academies' }
  ];

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
      {/* ─── PLANS HEADER ─── */}
      <header style={{
        textAlign: 'center',
        marginBottom: 'var(--space-8)',
        paddingTop: 'var(--space-4)'
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
          Subscription Plans / सदस्यता योजनाएं
        </span>
        <h1 className="type-display-l" style={{ color: 'var(--primitive-white)', margin: '0 0 var(--space-2) 0' }}>
          {t('Choose Your Path to Wisdom', 'ज्ञान की अपनी यात्रा चुनें')}
        </h1>
        <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-body-l)', maxWidth: '600px', marginInline: 'auto' }}>
          {t('Unlock commercial-free premium civilizational content, support regional artisans, and empower Indian heritage.', 'विज्ञापन-मुक्त प्रीमियम सामग्री अनलॉक करें, कारीगरों का समर्थन करें और भारतीय विरासत को सशक्त बनाएं।')}
        </p>
      </header>

      {/* ─── CARDS CONTAINER ─── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-12)'
      }}>
        {PLANS.map((p) => {
          const isRecommended = p.id === 'premium';
          const isPatron = p.id === 'patron';
          const isSelected = selectedPlan === p.id;

          return (
            <div
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              className="glass"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                border: isSelected
                  ? '2px solid var(--color-gold)'
                  : '1px solid var(--color-border)',
                background: isSelected
                  ? 'color-mix(in oklch, var(--color-gold) 4%, var(--color-surface))'
                  : 'var(--color-surface)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                position: 'relative',
                transition: 'all var(--motion-fast) var(--motion-easing)',
                boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-1)'
              }}
            >
              {/* Recommended Badge */}
              {isRecommended && (
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-gold)',
                  color: 'var(--primitive-black)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}>
                  {t('MOST POPULAR / सर्वाधिक लोकप्रिय', 'सर्वाधिक लोकप्रिय')}
                </span>
              )}

              {/* Patron Badge */}
              {isPatron && (
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--primitive-white)',
                  color: 'var(--primitive-black)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}>
                  {t('HERITAGE PATRON / संरक्षक', 'संरक्षक')}
                </span>
              )}

              <h2 className="type-heading-2" style={{ color: 'var(--primitive-white)', margin: 'var(--space-2) 0 0 0' }}>
                {t(p.nameEn, p.nameHi)}
              </h2>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: 'var(--space-2) 0' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                  ₹{p.price}
                </span>
                <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)' }}>
                  {p.price > 0 ? t('/ month', '/ माह') : ''}
                </span>
              </div>

              <p style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)', margin: 0, minHeight: '36px' }}>
                {p.id === 'free' && t('Explore a limited collection of civilizational stories.', 'सीमित निःशुल्क सामग्री का आनंद लें।')}
                {p.id === 'premium' && t('Full access to all documentaries, courses, and streaming files.', 'सभी वृत्तचित्रों और पाठ्यक्रमों तक पूर्ण पहुंच।')}
                {p.id === 'family' && t('Share civilizational wisdom with your entire household.', 'अपने पूरे परिवार के साथ सांस्कृतिक ज्ञान साझा करें।')}
                {p.id === 'patron' && t('Directly sponsor traditional Indian artisans and folk institutes.', 'पारंपरिक भारतीय कारीगरों और लोक संस्थाओं का सीधे समर्थन करें।')}
              </p>

              {/* Selection Indicator */}
              <button
                style={{
                  width: '100%',
                  background: isSelected ? 'var(--color-gold)' : 'transparent',
                  color: isSelected ? 'var(--primitive-black)' : 'var(--primitive-white)',
                  border: isSelected ? 'none' : '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 0',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: 'var(--space-2)',
                  fontSize: 'var(--type-label)',
                  transition: 'all var(--motion-fast) var(--motion-easing)'
                }}
              >
                {isSelected ? t('Plan Selected', 'योजना चयनित') : t('Select Plan', 'योजना चुनें')}
              </button>
            </div>
          );
        })}
      </section>

      {/* ─── DETAILED FEATURE COMPARISON MATRIX ─── */}
      <section className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <h2 className="type-heading-2" style={{ color: 'var(--primitive-white)', padding: 'var(--space-3) var(--space-4) var(--space-1) var(--space-4)' }}>
          {t('Detailed Comparison / विस्तृत तुलना', 'विस्तृत तुलना')}
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.01)' }}>
                <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-dim)' }}>{t('Features / सुविधाएं', 'सुविधाएं')}</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-dim)' }}>{t('Sample', 'सैंपल')}</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-gold)' }}>{t('Premium', 'प्रीमियम')}</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-dim)' }}>{t('Family', 'परिवार')}</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-dim)' }}>{t('Patron', 'संरक्षक')}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((f, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background var(--motion-fast)' }} className="hover-table-row">
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500, fontSize: 'var(--type-label)' }}>
                    {t(f.nameEn, f.nameHi)}
                  </td>
                  
                  {/* Free */}
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--type-caption)' }}>
                    {typeof f.free === 'boolean' ? (f.free ? '✓' : '—') : f.free}
                  </td>
                  
                  {/* Premium */}
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--type-caption)', fontWeight: 600, color: 'color-mix(in oklch, var(--color-gold) 85%, var(--primitive-white))' }}>
                    {typeof f.premium === 'boolean' ? (f.premium ? '✓' : '—') : f.premium}
                  </td>
                  
                  {/* Family */}
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--type-caption)' }}>
                    {typeof f.family === 'boolean' ? (f.family ? '✓' : '—') : f.family}
                  </td>
                  
                  {/* Patron */}
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--type-caption)' }}>
                    {typeof f.patron === 'boolean' ? (f.patron ? '✓' : '—') : f.patron}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

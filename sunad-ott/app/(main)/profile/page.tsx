'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { useLang, SUPPORTED_LANGUAGES } from '@/components/LangContext';

export default function ProfilePage() {
  const { user, signOutUser, loading } = useAuth();
  const { lang, setLang, t } = useLang();
  const router = useRouter();

  const [signingOut, setSigningOut] = useState(false);
  const [qualityPref, setQualityPref] = useState('4k');

  if (loading) {
    return (
      <main className="main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '65vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="onboarding-spinner" style={{ width: '40px', height: '40px', borderWidth: '3px', marginBottom: '12px' }} />
          <p style={{ color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: 600 }}>
            {t('Loading profile…', 'प्रोफ़ाइल लोड हो रही है…')}
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '70vh', padding: 'var(--space-6)' }}>
        <div
          className="glass-strong"
          style={{
            maxWidth: '460px',
            width: '100%',
            padding: '40px 32px',
            textAlign: 'center',
            borderRadius: '24px',
            border: '1px solid rgba(230, 154, 36, 0.3)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7)',
            background: 'radial-gradient(circle at top, rgba(230, 154, 36, 0.12), rgba(14, 11, 7, 0.95))'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎭</div>
          <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', marginBottom: '8px' }}>
            {t('Sign In to Sunad TV', 'सुनाद टीवी में साइन इन करें')}
          </h1>
          <p style={{ color: 'var(--color-text-dim)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {t('Unlock your personalized watchlist, 4K streaming preferences, and cultural recommendations.', 'अपनी पसंदीदा वॉचलिस्ट, 4K स्ट्रीमिंग और व्यक्तिगत अनुशंसाएं अनलॉक करें।')}
          </p>
          <Link href="/signin?redirect=/profile" className="onboarding-action" style={{ textDecoration: 'none' }}>
            {t('Sign In Now ✨', 'अभी साइन इन करें ✨')}
          </Link>
        </div>
      </main>
    );
  }

  const isGoogleUser = user.providerData.some((p) => p.providerId === 'google.com');

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOutUser();
      router.push('/');
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <main className="main-content reveal" style={{ paddingInline: 'var(--space-6)', paddingBottom: 'var(--space-12)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* ─── Top Ambient Banner Card ─── */}
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            border: '1px solid rgba(230, 154, 36, 0.3)',
            background: 'linear-gradient(135deg, rgba(30, 20, 10, 0.9) 0%, rgba(14, 11, 7, 0.98) 60%, rgba(5, 5, 12, 0.95) 100%)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 220, 120, 0.15)',
            marginBottom: 'var(--space-6)',
            padding: '36px var(--space-8)',
          }}
        >
          {/* Background Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40%',
              right: '-10%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(230, 154, 36, 0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(50px)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
            
            {/* Avatar with Dual Gold Aura */}
            <div
              style={{
                position: 'relative',
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                border: '2.5px solid #E69A24',
                boxShadow: '0 0 30px rgba(230, 154, 36, 0.45), inset 0 0 15px rgba(230, 154, 36, 0.2)',
                overflow: 'hidden',
                flexShrink: 0,
                background: 'linear-gradient(135deg, #2a1b08 0%, #140c07 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Account Avatar'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                  {(user.displayName || user.email || 'U')[0]}
                </span>
              )}
            </div>

            {/* Account Info */}
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h1 style={{ fontFamily: 'var(--font-display-en)', fontSize: '1.65rem', fontWeight: 700, color: 'var(--primitive-white)', margin: 0, letterSpacing: '-0.01em' }}>
                  {user.displayName || t('Sunad TV Member', 'सुनाद टीवी सदस्य')}
                </h1>
                
                {isGoogleUser && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: 'rgba(66, 133, 244, 0.12)',
                      border: '1px solid rgba(66, 133, 244, 0.35)',
                      color: '#93B7F8',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google Account
                  </span>
                )}
              </div>

              <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.92rem', fontWeight: 500 }}>
                {user.email || t('No email linked', 'कोई ईमेल नहीं')}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px', fontSize: '0.78rem', color: 'var(--color-text-dim)' }}>
                <span>
                  Status: <strong style={{ color: '#34D399' }}>Active</strong>
                </span>
                <span>•</span>
                <span>
                  Member ID: <code style={{ color: 'var(--color-gold)', fontFamily: 'monospace' }}>{user.uid.slice(0, 10)}</code>
                </span>
              </div>
            </div>

            {/* VIP Pass Badge Card */}
            <div
              style={{
                padding: '16px 22px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(230, 154, 36, 0.18) 0%, rgba(200, 134, 10, 0.08) 100%)',
                border: '1px solid rgba(230, 154, 36, 0.4)',
                boxShadow: '0 8px 24px rgba(230, 154, 36, 0.15)',
                textAlign: 'center',
                minWidth: '170px'
              }}
            >
              <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontWeight: 800, display: 'block' }}>
                {t('Membership Tier', 'सदस्यता स्तर')}
              </span>
              <strong style={{ fontSize: '1.25rem', color: '#FFF', display: 'block', marginTop: '4px', fontFamily: 'var(--font-display-en)' }}>
                Bharat Pass ✨
              </strong>
              <Link
                href="/plans"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gold)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginTop: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {t('Upgrade Tier →', 'स्तर बढ़ाएं →')}
              </Link>
            </div>

          </div>
        </div>

        {/* ─── Quick Stats Bar ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)'
          }}
        >
          <div className="glass" style={{ padding: '16px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', display: 'block' }}>{t('Watch Time', 'देखने का समय')}</span>
            <strong style={{ fontSize: '1.3rem', color: 'var(--primitive-white)', marginTop: '2px', display: 'block' }}>142 Hours</strong>
          </div>

          <div className="glass" style={{ padding: '16px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', display: 'block' }}>{t('Saved Shows', 'सहेजे गए शो')}</span>
            <strong style={{ fontSize: '1.3rem', color: 'var(--primitive-white)', marginTop: '2px', display: 'block' }}>18 Titles</strong>
          </div>

          <div className="glass" style={{ padding: '16px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', display: 'block' }}>{t('Streaming Quality', 'स्ट्रीमिंग गुणवत्ता')}</span>
            <strong style={{ fontSize: '1.3rem', color: 'var(--color-gold)', marginTop: '2px', display: 'block' }}>4K Ultra HD</strong>
          </div>

          <div className="glass" style={{ padding: '16px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', display: 'block' }}>{t('Audio Language', 'ऑडियो भाषा')}</span>
            <strong style={{ fontSize: '1.3rem', color: 'var(--primitive-white)', marginTop: '2px', display: 'block' }}>Hindi / Original</strong>
          </div>
        </div>

        {/* ─── Preference & Content Management Grid ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          
          {/* App Language Selector */}
          <div className="glass-strong" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(230, 154, 36, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>🌐</span>
              <div>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--primitive-white)', margin: 0 }}>
                  {t('Interface Language', 'इंटरफ़ेस भाषा')}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)' }}>
                  {t('22 Indian languages supported', '22 भारतीय भाषाएं समर्थित')}
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.84rem', marginBottom: '16px', lineHeight: 1.4 }}>
              {t('Select your preferred language for navigation, titles, and subtitles across Sunad TV.', 'सुनाद टीवी पर नेविगेशन, शीर्षक और उपशीर्षक के लिए अपनी पसंदीदा भाषा चुनें।')}
            </p>

            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(230, 154, 36, 0.35)',
                color: 'var(--primitive-white)',
                fontSize: '0.92rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} style={{ background: '#140c07', color: '#fff' }}>
                  {l.nativeName} ({l.englishName})
                </option>
              ))}
            </select>
          </div>

          {/* Streaming & Playback Preferences */}
          <div className="glass-strong" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(230, 154, 36, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>⚡</span>
              <div>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--primitive-white)', margin: 0 }}>
                  {t('Playback Quality', 'प्लेबैक गुणवत्ता')}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)' }}>
                  {t('Adaptive Bitrate Control', 'अनुकूलनशील बिटरेट')}
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.84rem', marginBottom: '16px', lineHeight: 1.4 }}>
              {t('Set default video resolution for home & cellular networks.', 'वीडियो रिज़ॉल्यूशन और डेटा उपयोग प्राथमिकताएं निर्धारित करें।')}
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: '4k', label: '4K Ultra HD' },
                { id: '1080p', label: 'Full HD 1080p' },
                { id: 'auto', label: 'Auto (Data Saver)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQualityPref(opt.id)}
                  style={{
                    flex: 1,
                    padding: '10px 8px',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: qualityPref === opt.id ? 'rgba(230, 154, 36, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: qualityPref === opt.id ? '1px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: qualityPref === opt.id ? 'var(--color-gold)' : 'var(--color-text-dim)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── My Content Hub Section ─── */}
        <div
          className="glass-strong"
          style={{
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: 'var(--space-6)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', color: 'var(--primitive-white)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🍿</span> {t('My Content & Watchlist', 'मेरी सामग्री और वॉचलिस्ट')}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
            <Link
              href="/my-list"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textDecoration: 'none',
                color: 'var(--primitive-white)',
                fontWeight: 600,
                fontSize: '0.92rem',
                transition: 'all 0.2s ease'
              }}
              className="hover-card-bg"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📌</span>
                <span>{t('Saved Watchlist', 'सहेजी गई वॉचलिस्ट')}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', background: 'rgba(230, 154, 36, 0.15)', padding: '2px 8px', borderRadius: '10px' }}>
                18 Items
              </span>
            </Link>

            <Link
              href="/history"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textDecoration: 'none',
                color: 'var(--primitive-white)',
                fontWeight: 600,
                fontSize: '0.92rem',
                transition: 'all 0.2s ease'
              }}
              className="hover-card-bg"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>⏱️</span>
                <span>{t('Watch History', 'देखने का इतिहास')}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '10px' }}>
                View All →
              </span>
            </Link>
          </div>
        </div>

        {/* ─── Security & Sign Out Section ─── */}
        <div
          style={{
            padding: '24px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(196, 96, 75, 0.08) 0%, rgba(14, 11, 7, 0.9) 100%)',
            border: '1px solid rgba(196, 96, 75, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primitive-white)', margin: 0, fontWeight: 700 }}>
              {t('Sign Out of Sunad TV', 'सुनाद टीवी से साइन आउट करें')}
            </h3>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.84rem', margin: '4px 0 0 0', lineHeight: 1.4 }}>
              {t('Securely log out of your session on this device. You can sign back in anytime with Google.', 'इस डिवाइस पर अपना सत्र सुरक्षित रूप से समाप्त करें।')}
            </p>
          </div>

          <button
            type="button"
            disabled={signingOut}
            onClick={handleSignOut}
            style={{
              padding: '12px 28px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(196, 96, 75, 0.25) 0%, rgba(196, 96, 75, 0.1) 100%)',
              border: '1px solid rgba(196, 96, 75, 0.5)',
              color: '#F87171',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: signingOut ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 16px rgba(196, 96, 75, 0.2)',
            }}
          >
            {signingOut ? (
              <>
                <span className="onboarding-spinner" style={{ width: '16px', height: '16px' }} />
                {t('Signing out…', 'साइन आउट हो रहा है…')}
              </>
            ) : (
              <>
                <span>🚪</span>
                {t('Sign Out', 'साइन आउट')}
              </>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}

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

  if (loading) {
    return (
      <main className="main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <div className="onboarding-spinner" style={{ width: '36px', height: '36px', borderWidth: '3px' }} />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', padding: 'var(--space-6)' }}>
        <div className="glass-strong" style={{ maxWidth: '440px', width: '100%', padding: 'var(--space-8)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
          <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', marginBottom: '8px' }}>
            {t('Sign In Required', 'साइन इन आवश्यक है')}
          </h1>
          <p style={{ color: 'var(--color-text-dim)', marginBottom: 'var(--space-6)', fontSize: '0.9rem' }}>
            {t('Please sign in to manage your account and profile settings.', 'अपने खाते और प्रोफ़ाइल प्राथमिकताओं को प्रबंधित करने के लिए साइन इन करें।')}
          </p>
          <Link href="/signin?redirect=/profile" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {t('Sign In Now', 'अभी साइन इन करें')}
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
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {t('Account & Preferences', 'खाता और प्राथमिकताएं')}
          </span>
          <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', margin: '4px 0 0 0' }}>
            {t('Profile Management', 'प्रोफ़ाइल प्रबंधन')}
          </h1>
        </div>

        {/* User Card */}
        <div
          className="glass-strong"
          style={{
            padding: 'var(--space-6)',
            borderRadius: '24px',
            border: '1px solid rgba(230, 154, 36, 0.25)',
            marginBottom: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-6)',
            flexWrap: 'wrap',
            background: 'linear-gradient(135deg, rgba(26, 18, 10, 0.8) 0%, rgba(14, 11, 7, 0.95) 100%)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Avatar */}
          <div
            style={{
              position: 'relative',
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              border: '2.5px solid var(--color-gold)',
              boxShadow: '0 0 20px rgba(230, 154, 36, 0.3)',
              overflow: 'hidden',
              flexShrink: 0,
              background: 'rgba(230, 154, 36, 0.15)',
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
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                {(user.displayName || user.email || 'U')[0]}
              </span>
            )}
          </div>

          {/* Identity details */}
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primitive-white)', margin: 0 }}>
                {user.displayName || t('Sunad TV Member', 'सुनाद टीवी सदस्य')}
              </h2>
              {isGoogleUser && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'rgba(66, 133, 244, 0.15)',
                    border: '1px solid rgba(66, 133, 244, 0.3)',
                    color: '#8AB4F8',
                    fontSize: '0.72rem',
                    fontWeight: 600
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Connected
                </span>
              )}
            </div>

            <p style={{ color: 'var(--color-text-dim)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
              {user.email || t('No email address linked', 'कोई ईमेल लिंक नहीं')}
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '6px' }}>
              UID: <code style={{ color: 'var(--color-gold)', fontFamily: 'monospace' }}>{user.uid.slice(0, 14)}…</code>
            </p>
          </div>

          {/* Subscription Badge */}
          <div
            style={{
              padding: '12px 18px',
              borderRadius: '16px',
              background: 'rgba(230, 154, 36, 0.1)',
              border: '1px solid rgba(230, 154, 36, 0.3)',
              textAlign: 'center',
              minWidth: '150px'
            }}
          >
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gold)', fontWeight: 700, display: 'block' }}>
              {t('Plan Tier', 'योजना स्तर')}
            </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primitive-white)', display: 'block', marginTop: '2px' }}>
              Bharat Pass ✨
            </strong>
            <Link href="/plans" style={{ fontSize: '0.72rem', color: 'var(--color-gold)', textDecoration: 'underline', marginTop: '4px', display: 'inline-block' }}>
              {t('Manage Plan', 'योजना बदलें')}
            </Link>
          </div>
        </div>

        {/* Profile Settings Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          
          {/* Preferred Language */}
          <div className="glass" style={{ padding: 'var(--space-5)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--primitive-white)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🌐</span> {t('App Language', 'ऐप भाषा')}
            </h3>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.82rem', marginBottom: '12px' }}>
              {t('Choose your default language for interface & subtitles.', 'अपनी पसंदीदा ऐप भाषा चुनें।')}
            </p>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--primitive-white)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} style={{ background: '#140c07', color: '#fff' }}>
                  {l.nativeName} ({l.englishName})
                </option>
              ))}
            </select>
          </div>

          {/* Watch History & Saved Content */}
          <div className="glass" style={{ padding: 'var(--space-5)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--primitive-white)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎬</span> {t('My Content', 'मेरी सामग्री')}
            </h3>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.82rem', marginBottom: '12px' }}>
              {t('Access your saved watchlist and playback history.', 'अपनी सहेजी गई वॉचलिस्ट और इतिहास देखें।')}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/my-list" className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem', height: '40px', padding: '0 12px' }}>
                {t('My List', 'मेरी सूची')}
              </Link>
              <Link href="/history" className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem', height: '40px', padding: '0 12px' }}>
                {t('History', 'इतिहास')}
              </Link>
            </div>
          </div>
        </div>

        {/* Sign Out Card */}
        <div
          className="glass"
          style={{
            padding: 'var(--space-5)',
            borderRadius: '16px',
            border: '1px solid rgba(196, 96, 75, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            background: 'rgba(196, 96, 75, 0.05)'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--primitive-white)', margin: 0 }}>
              {t('Sign Out of Sunad TV', 'सुनाद टीवी से साइन आउट करें')}
            </h3>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.82rem', margin: '2px 0 0 0' }}>
              {t('You can sign back in anytime with Google or Email magic link.', 'आप कभी भी गूगल या ईमेल लिंक से पुनः साइन इन कर सकते हैं।')}
            </p>
          </div>

          <button
            type="button"
            disabled={signingOut}
            onClick={handleSignOut}
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              background: 'rgba(196, 96, 75, 0.18)',
              border: '1px solid rgba(196, 96, 75, 0.5)',
              color: '#f4a69a',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: signingOut ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            {signingOut ? (
              <>
                <span className="onboarding-spinner" style={{ width: '14px', height: '14px' }} />
                {t('Signing out…', 'साइन आउट हो रहा है…')}
              </>
            ) : (
              t('Sign Out', 'साइन आउट')
            )}
          </button>
        </div>

      </div>
    </main>
  );
}

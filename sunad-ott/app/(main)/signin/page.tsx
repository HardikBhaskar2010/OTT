'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLang } from '@/components/LangContext';
import { useAuth } from '@/components/AuthContext';
import { CATEGORIES } from '@/lib/mockData';
import {
  auth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
} from '@/lib/firebase/client';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  documentaries: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
      <line x1="7" x2="7" y1="2" y2="22" />
      <line x1="17" x2="17" y1="2" y2="22" />
      <line x1="2" x2="22" y1="7" y2="7" />
      <line x1="2" x2="22" y1="17" y2="17" />
    </svg>
  ),
  spiritual: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  ),
  history: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  culture: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 6v12" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
    </svg>
  ),
  tourism: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  yoga: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v8" />
      <path d="M5 10c3 1 4 2 7 2s4-1 7-2" />
      <path d="M9 22c1-2 2-3 3-5s2 3 3 5" />
    </svg>
  ),
  arts: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.45-.18-.85-.46-1.17-.29-.3-.46-.72-.46-1.18 0-.92.77-1.63 1.7-1.63h1.8c5.44 0 9.79-4.35 9.79-9.79C26.21 6.5 22 2 12 2Z" />
    </svg>
  ),
  agriculture: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 .5 6-3.8 9.8A7 7 0 0 1 11 20Z" />
      <path d="M9 22V12" />
    </svg>
  ),
  education: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  entrepreneurship: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  family: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
};

function SignInContent() {
  const { t } = useLang();
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  // Authentication states: 'request' | 'link-sent' | 'onboarding'
  const [step, setStep] = useState<'request' | 'link-sent' | 'onboarding'>('request');
  const [identifier, setIdentifier] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Process passwordless magic link landing
  useEffect(() => {
    async function checkMagicLink() {
      if (typeof window === 'undefined') return;

      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt(t('Please enter your email for verification:', 'सत्यापन के लिए कृपया अपना ईमेल दर्ज करें:'));
        }

        if (!email) {
          setError(t('Email is required to complete magic link sign in.', 'मैजिक लिंक साइन इन पूरा करने के लिए ईमेल आवश्यक है।'));
          return;
        }

        try {
          setLoading(true);
          const result = await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');

          if (result.user) {
            const idToken = await result.user.getIdToken();
            await fetch('/api/auth/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken }),
            });
            setStep('onboarding');
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Sign in with magic link failed';
          setError(msg);
        } finally {
          setLoading(false);
        }
      }
    }

    checkMagicLink();
  }, [t]);

  // Request passwordless magic link email
  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError(t('Please enter a valid email address.', 'कृपया एक वैध ईमेल पता दर्ज करें।'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier.trim())) {
      setError(t('Please enter a valid email address (e.g. user@domain.com).', 'कृपया एक वैध ईमेल दर्ज करें।'));
      return;
    }

    try {
      setLoading(true);
      setError('');
      const email = identifier.trim();
      const actionCodeSettings = {
        url: window.location.origin + '/signin?redirect=' + encodeURIComponent(redirectUrl),
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setInfoMessage(
        t(
          `Magic sign-in link has been sent to ${email}. Check your inbox!`,
          `मैजिक साइन-इन लिंक ${email} पर भेज दिया गया है। अपना इनबॉक्स जांचें!`
        )
      );
      setStep('link-sent');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send magic link';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth sign-in
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const user = await signInWithGoogle();
      if (user) {
        setStep('onboarding');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed';
      setError(msg.replace('Firebase: ', '').replace(/\s*\(auth\/[^)]+\)/, ''));
    } finally {
      setLoading(false);
    }
  };

  const handleToggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCompleteOnboarding = () => {
    if (selectedInterests.length < 2) {
      setError(t('Please select at least 2 interests to personalize your feed.', 'अपना फ़ीड निजीकृत करने के लिए कम से कम 2 श्रेणियां चुनें।'));
      return;
    }
    router.push(redirectUrl);
  };

  return (
    <main className="main-content reveal" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 180px)',
      paddingInline: 'var(--space-6)',
      paddingBottom: 'var(--space-12)'
    }}>
      <div className="glass-strong" style={{
        width: '100%',
        maxWidth: step === 'onboarding' ? '800px' : '440px',
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-gold)',
        boxShadow: 'var(--shadow-2)',
        animation: 'fadeIn var(--motion-base) var(--motion-easing)'
      }}>
        {/* ─── STEP 1: REQUEST MAGIC LINK / GOOGLE OAUTH ─── */}
        {step === 'request' && (
          <form onSubmit={handleSendMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
              <Image src="/sunad_logo.jpg" alt="" width={56} height={56} style={{ borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-gold)', display: 'block', margin: '0 auto' }} aria-hidden="true" priority={false} />
              <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', marginTop: 'var(--space-1)', marginBottom: '4px' }}>
                {t('Sign In / Register', 'साइन इन / पंजीकरण')}
              </h1>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-label)' }}>
                {t('Sign in with a passwordless magic link or your Google account.', 'पासवर्ड रहित मैजिक लिंक या गूगल खाते से साइन इन करें।')}
              </p>
            </div>

            {error && (
              <div style={{ color: 'var(--color-error)', fontSize: 'var(--type-label)', padding: 'var(--space-1) var(--space-2)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-sm)', background: 'rgba(196,96,75,0.05)' }}>
                {error}
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--primitive-white)',
                fontSize: 'var(--type-body-m)',
                fontWeight: 600,
                opacity: loading ? 0.7 : 1
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              {t('Continue with Google', 'गूगल के साथ आगे बढ़ें')}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: 'var(--space-1) 0' }}>
              <div style={{ flex: 1, borderBottom: '1px solid var(--color-border)' }} />
              <span style={{ padding: '0 10px', fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)' }}>
                {t('OR', 'या')}
              </span>
              <div style={{ flex: 1, borderBottom: '1px solid var(--color-border)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="identifier" style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--primitive-ivory)' }}>
                {t('Email Address / ईमेल पता', 'ईमेल पता')}
              </label>
              <input
                type="email"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="email@domain.com"
                required
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px var(--space-2)',
                  color: 'var(--primitive-white)',
                  outline: 'none',
                  fontSize: 'var(--type-body-m)'
                }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
              {loading ? t('Sending...', 'भेजा जा रहा है...') : t('Send Magic Link', 'मैजिक लिंक भेजें')}
            </button>
          </form>
        )}

        {/* ─── STEP 2: LINK SENT ─── */}
        {step === 'link-sent' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', textAlign: 'center' }}>
            <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', margin: 0 }}>
              {t('Check Your Email', 'अपना ईमेल जांचें')}
            </h1>
            <p style={{ color: 'var(--color-gold)', fontSize: 'var(--type-body-m)', margin: 'var(--space-2) 0' }}>
              {infoMessage}
            </p>
            <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-label)' }}>
              {t('Click the link in the email to automatically sign in. You can close this window after clicking.', 'साइन इन करने के लिए ईमेल में दिए गए लिंक पर क्लिक करें।')}
            </p>
            <button
              type="button"
              onClick={() => {
                setStep('request');
                setInfoMessage('');
              }}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', marginTop: 'var(--space-2)' }}
            >
              ← {t('Use a different email', 'दूसरे ईमेल का प्रयोग करें')}
            </button>
          </div>
        )}

        {/* ─── STEP 3: INTERACTIVE ONBOARDING INTEREST PICKER ─── */}
        {step === 'onboarding' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--type-caption)', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {t('Personalize Your Experience', 'अपने अनुभव को निजीकृत करें')}
              </span>
              <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', margin: '4px 0 0 0' }}>
                {t('Select Your Areas of Interest', 'अपनी रुचि के क्षेत्रों का चयन करें')}
              </h1>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-label)', marginTop: '4px' }}>
                {t('Pick at least 2 categories to help us customize your home feed.', 'कम से कम २ श्रेणियों का चयन करें ताकि हम आपके अनुसार फ़ीड तैयार कर सकें।')}
              </p>
            </div>

            {error && (
              <div style={{ color: 'var(--color-error)', fontSize: 'var(--type-label)', padding: 'var(--space-1) var(--space-2)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-sm)', background: 'rgba(196,96,75,0.05)', textAlign: 'center' }}>
                {error}
              </div>
            )}

            {/* Interest Card Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-2)',
              margin: 'var(--space-2) 0'
            }}>
              {CATEGORIES.slice(0, 6).map((c) => {
                const isSelected = selectedInterests.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => handleToggleInterest(c.id)}
                    className="glass"
                    style={{
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                      background: isSelected ? 'rgba(212,133,26,0.1)' : 'var(--color-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      transition: 'all var(--motion-fast) var(--motion-easing)'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      {CATEGORY_ICONS[c.id] || c.icon}
                    </span>
                    <span style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--primitive-white)' }}>
                      {t(c.nameEn, c.nameHi)}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleCompleteOnboarding}
              className="btn-primary"
              style={{
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'center',
                minWidth: '200px'
              }}
            >
              {t('Complete Onboarding', 'प्रक्रिया पूर्ण करें')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px', color: 'var(--color-gold)' }}>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}

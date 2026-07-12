'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/components/LangContext';
import { CATEGORIES } from '@/lib/mockData';

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

export default function SignInPage() {
  const { t } = useLang();
  const router = useRouter();

  // Authentication states: 'request' | 'verify' | 'onboarding'
  const [step, setStep] = useState<'request' | 'verify' | 'onboarding'>('request');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Request OTP validation
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError(t('Please enter a valid mobile number or email.', 'कृपया एक वैध मोबाइल नंबर या ईमेल दर्ज करें।'));
      return;
    }
    setError('');
    setStep('verify');
  };

  // OTP verify handler
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const joinedOtp = otp.join('');
    if (joinedOtp.length < 6) {
      setError(t('Please enter a complete 6-digit code.', 'कृपया पूरा 6-अंकीय कोड दर्ज करें।'));
      return;
    }
    setError('');
    // Proceed to onboarding interest picker
    setStep('onboarding');
  };

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const nextOtp = [...otp];
    nextOtp[index] = val;
    setOtp(nextOtp);

    // Auto-focus next field
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
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
    // Complete login, redirect to homepage
    alert(t('Account verified successfully!', 'खाता सफलतापूर्वक सत्यापित किया गया!'));
    router.push('/');
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
        {/* ─── STEP 1: REQUEST OTP ─── */}
        {step === 'request' && (
          <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
              <img src="/sunad_logo.jpg" alt="" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-gold)', display: 'block', margin: '0 auto' }} />
              <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', marginTop: 'var(--space-1)', marginBottom: '4px' }}>
                {t('Sign In / Register', 'साइन इन / पंजीकरण')}
              </h1>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-label)' }}>
                {t('Enter your credentials to receive a secure OTP code.', 'सुरक्षित ओटीपी प्राप्त करने के लिए अपना विवरण दर्ज करें।')}
              </p>
            </div>

            {error && (
              <div style={{ color: 'var(--color-error)', fontSize: 'var(--type-label)', padding: 'var(--space-1) var(--space-2)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-sm)', background: 'rgba(196,96,75,0.05)' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="identifier" style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--primitive-ivory)' }}>
                {t('Mobile Number or Email / मोबाइल नंबर या ईमेल', 'मोबाइल नंबर या ईमेल')}
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+91 98765 43210 or email@domain.com"
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

            <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
              {t('Send OTP', 'ओटीपी भेजें')}
            </button>
          </form>
        )}

        {/* ─── STEP 2: VERIFY OTP ─── */}
        {step === 'verify' && (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
              <h1 className="type-heading-1" style={{ color: 'var(--primitive-white)', margin: 0 }}>
                {t('Verification', 'सत्यापन')}
              </h1>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--type-label)', marginTop: '4px' }}>
                {t(`Enter the 6-digit code sent to ${identifier}`, `विवरण ${identifier} पर भेजे गए ६-अंकीय कोड को दर्ज करें`)}
              </p>
            </div>

            {error && (
              <div style={{ color: 'var(--color-error)', fontSize: 'var(--type-label)', padding: 'var(--space-1) var(--space-2)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-sm)', background: 'rgba(196,96,75,0.05)' }}>
                {error}
              </div>
            )}

            {/* Verification Inputs */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: 'var(--space-2) 0' }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  style={{
                    width: '44px',
                    height: '44px',
                    textAlign: 'center',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--primitive-white)',
                    fontSize: 'var(--type-body-l)',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              ))}
            </div>

            <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
              {t('Verify & Proceed', 'सत्यापित करें और आगे बढ़ें')}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)' }}>
              <button type="button" onClick={() => setStep('request')} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-dim)', cursor: 'pointer' }}>
                ← {t('Change details', 'विवरण बदलें')}
              </button>
              <button type="button" onClick={() => alert(t('New OTP sent!', 'नया ओटीपी भेजा गया!'))} style={{ background: 'transparent', border: 'none', color: 'var(--color-gold)', cursor: 'pointer' }}>
                {t('Resend OTP', 'ओटीपी पुनः भेजें')}
              </button>
            </div>
          </form>
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

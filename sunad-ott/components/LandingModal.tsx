'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from './LangContext';
import { useTheme } from './ThemeContext';
import {
  trackModalImpression,
  trackModalSignIn,
  trackModalGuestContinue,
} from '@/lib/analytics';

/**
 * LandingModal — Premium onboarding gate popup.
 *
 * Appears when a visitor lands on the site.
 * Prompts them to login/register or proceed as a guest.
 * Persists dismissal to sessionStorage so it doesn't disrupt their browsing session.
 */
export default function LandingModal() {
  const { t } = useLang();
  const router = useRouter();
  const { isLight } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the gate in this session
    const dismissed = sessionStorage.getItem('sunad-gate-dismissed');
    if (!dismissed) {
      // Delay presentation slightly for a premium, non-jarring entrance
      const timer = setTimeout(() => {
        setIsOpen(true);
        trackModalImpression();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('sunad-gate-dismissed', 'true');
    setIsOpen(false);
    trackModalGuestContinue();
  };

  const handleSignIn = () => {
    trackModalSignIn();
    handleClose();
    router.push('/signin');
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(14, 13, 12, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--space-4)',
        animation: 'fadeIn var(--motion-base) var(--motion-easing) both',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="landing-gate-title"
    >
      <div
        className="glass-strong"
        style={{
          width: '100%',
          maxWidth: '460px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-gold)',
          padding: 'var(--space-6)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          animation: 'slideUp var(--motion-slow) var(--motion-easing) both',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 'var(--space-3)',
            right: 'var(--space-3)',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-dim)',
            cursor: 'pointer',
            fontSize: '1.25rem',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color var(--motion-fast)',
          }}
          aria-label={t('Close popup', 'पॉपअप बंद करें')}
        >
          ✕
        </button>

        {/* Brand Emblem */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: isLight ? '2px solid var(--color-gold)' : '2px solid var(--color-gold)',
            boxShadow: isLight ? '0 0 16px rgba(200, 134, 10, 0.25)' : '0 0 16px var(--color-gold-dim)',
            marginBottom: 'var(--space-4)',
            background: 'var(--color-bg)',
          }}
        >
          <img
            src={isLight ? '/sunad_logo_light.png' : '/sunad_logo.jpg'}
            alt="Sunad OTT Brand Emblem"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Headings */}
        <h2
          id="landing-gate-title"
          className="type-heading-2"
          style={{ color: 'var(--primitive-white)', margin: 0, fontSize: '1.5rem' }}
        >
          {t('Welcome to Sunad OTT', 'कल्चरफ्लिक्स में आपका स्वागत है')}
        </h2>
        <p
          lang="hi"
          style={{
            fontFamily: 'var(--font-display-hi)',
            fontSize: '1.25rem',
            color: 'var(--color-gold)',
            margin: '4px 0 12px 0',
          }}
        >
          सांस्कृतिक यात्रा की शुरुआत
        </p>

        {/* Tagline / Message */}
        <p
          style={{
            fontSize: 'var(--type-label)',
            color: 'var(--color-text-dim)',
            lineHeight: 1.6,
            margin: '0 0 var(--space-6) 0',
          }}
        >
          {t(
            'Unlock premium documentaries, civilization archives, local artisan commerce, and personalized feeds.',
            'अद्वितीय वृत्तचित्र, भारत का अनसुना इतिहास, कलाकृतियां और विशेष फ़ीड का अनुभव करने के लिए साइन इन करें।'
          )}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            width: '100%',
          }}
        >
          <button
            onClick={handleSignIn}
            className="btn-primary"
            style={{
              border: 'none',
              cursor: 'pointer',
              justifyContent: 'center',
              width: '100%',
              padding: '14px',
            }}
          >
            {t('Sign In / Register', 'साइन इन / पंजीकरण करें')}
          </button>
          
          <button
            onClick={handleClose}
            className="btn-glass"
            style={{
              cursor: 'pointer',
              justifyContent: 'center',
              width: '100%',
              padding: '14px',
            }}
          >
            {t('Explore as Guest', 'अतिथि के रूप में ब्राउज़ करें')}
          </button>
        </div>
      </div>
    </div>
  );
}

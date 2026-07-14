'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

/**
 * CookieBanner — Informational notice for Sunad OTT.
 *
 * Analytics always run. This banner just informs users that
 * cookies are used to improve their experience.
 * Dismissed via localStorage so it only shows once.
 */

const STORAGE_KEY = 'sunad-cookie-notice';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const { isLight } = useTheme();

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      setLeaving(false);
    }, 350);
    localStorage.setItem(STORAGE_KEY, 'seen');
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      style={{
        position: 'fixed',
        bottom: 'var(--space-3)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - var(--space-4))',
        maxWidth: '680px',
        zIndex: 9000,
        animation: leaving
          ? 'cookieOut 350ms var(--motion-easing) forwards'
          : 'cookieIn 420ms var(--motion-easing) both',
      }}
    >
      <div
        style={{
          background: isLight ? 'rgba(255, 248, 234, 0.96)' : 'rgba(21, 16, 13, 0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '14px var(--space-3)',
          boxShadow: isLight
            ? '0 8px 32px rgba(180, 130, 10, 0.12), 0 0 0 1px rgba(200, 134, 10, 0.08)'
            : '0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          flexWrap: 'wrap',
        }}
      >
        {/* Icon */}
        <span aria-hidden="true" style={{ fontSize: '1.2rem', flexShrink: 0 }}>🍪</span>

        {/* Text */}
        <p
          style={{
            flex: 1,
            margin: 0,
            fontSize: 'var(--type-label)',
            color: 'var(--color-text)',
            lineHeight: 1.5,
            fontFamily: 'var(--font-ui-en)',
            minWidth: '180px',
          }}
        >
          We use cookies to improve your experience on CultureFlix.{' '}
          <span
            lang="hi"
            style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-caption)' }}
          >
            हम कुकीज़ का उपयोग करते हैं।
          </span>
        </p>

        {/* Single dismiss button */}
        <button
          id="cookie-got-it-btn"
          onClick={dismiss}
          style={{
            flexShrink: 0,
            background: 'var(--color-gold)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-text-on-gold)',
            fontFamily: 'var(--font-ui-en)',
            fontSize: 'var(--type-label)',
            fontWeight: 700,
            padding: '8px 22px',
            cursor: 'pointer',
            transition: 'background var(--motion-fast), transform var(--motion-fast)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-gold-hover)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-gold)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          Got it
        </button>
      </div>

      <style>{`
        @keyframes cookieIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes cookieOut {
          from { opacity: 1; transform: translateX(-50%) translateY(0); }
          to   { opacity: 0; transform: translateX(-50%) translateY(20px); }
        }
      `}</style>
    </div>
  );
}

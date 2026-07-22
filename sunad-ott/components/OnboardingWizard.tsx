'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Film, Sparkles, Check } from 'lucide-react';
import { useLang, Lang } from './LangContext';
import { useAuth } from './AuthContext';
import { INDIAN_LANGUAGES, MOVIE_GENRES, MUSIC_GENRES, SHOW_GENRES } from '@/lib/mockData';
import type { IndianLanguage, GenreDef } from '@/lib/mockData';

declare global {
  interface Window {
    __sunadLenis: import('lenis').default | null;
  }
}

const ONBOARDING_KEY = 'cf_onboarded';
const LANG_PREF_KEY = 'cf_lang_prefs';
const GENRE_PREF_KEY = 'cf_genre_prefs';

const ALL_GENRES_RAW: GenreDef[] = [
  ...MOVIE_GENRES.slice(0, 6),
  ...MUSIC_GENRES.slice(0, 3),
  ...SHOW_GENRES.slice(0, 5),
];

const ALL_GENRES: GenreDef[] = [];
const seenIds = new Set<string>();
ALL_GENRES_RAW.forEach((g) => {
  if (!seenIds.has(g.id)) {
    seenIds.add(g.id);
    ALL_GENRES.push(g);
  }
});

/** Selectors for focusable elements inside the modal */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function OnboardingWizard() {
  const { setLang } = useLang();
  const { signInWithGoogle } = useAuth();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // ── Complete / close ────────────────────────────────────────────────────────
  const complete = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    if (selectedLangs.length > 0) localStorage.setItem(LANG_PREF_KEY, JSON.stringify(selectedLangs));
    if (selectedGenres.length > 0) localStorage.setItem(GENRE_PREF_KEY, JSON.stringify(selectedGenres));
    setVisible(false);
  }, [selectedLangs, selectedGenres]);

  // ── Initial mount: check localStorage ──────────────────────────────────────
  useEffect(() => {
    // Standard SSR hydration guard — setMounted prevents localStorage access on server
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const onboarded = localStorage.getItem(ONBOARDING_KEY);
    if (!onboarded) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  // ── Body scroll lock + focus management ────────────────────────────────────
  useEffect(() => {
    if (!visible) return;

    // 1. Lock background scroll (CSS + HTML/Body style)
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarW}px`; // prevent layout shift

    // 2. Pause Lenis smooth scroll if active
    if (typeof window !== 'undefined' && window.__sunadLenis) {
      try {
        window.__sunadLenis.stop();
      } catch (err) {
        console.warn('Failed to stop Lenis:', err);
      }
    }

    // 3. Move focus into the modal
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      modalRef.current?.focus();
    }

    // 4. Focus trap — intercept Tab / Shift+Tab
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes the wizard (from step 2+)
      if (e.key === 'Escape' && step >= 2) {
        complete();
        return;
      }

      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;
      const focusables = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if focus is on first, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if focus is on last, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = prevPaddingRight;

      // Resume Lenis smooth scroll
      if (typeof window !== 'undefined' && window.__sunadLenis) {
        try {
          window.__sunadLenis.start();
        } catch (err) {
          console.warn('Failed to start Lenis:', err);
        }
      }
    };
  }, [visible, step, complete]);

  const toggleLang = useCallback((code: string) => {
    setSelectedLangs(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  }, []);

  const toggleGenre = useCallback((id: string) => {
    setSelectedGenres(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      ref={overlayRef}
      className="onboarding-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Sunad TV"
      aria-live="polite"
      // Clicking the dark backdrop does NOT close Step 1 (language must be chosen)
      // From step 2+ clicking backdrop is allowed to dismiss
      onClick={(e) => {
        if (step >= 2 && e.target === overlayRef.current) complete();
      }}
    >
      {/* ── Dark blurred backdrop — blocks ALL background interaction ── */}
      <div className="onboarding-bg" aria-hidden="true">
        <div className="onboarding-bg__pattern" />
        <div className="onboarding-bg__radial" />
      </div>

      {/* ── Modal box ── */}
      <div
        ref={modalRef}
        className="onboarding-modal"
        key={step}
        tabIndex={-1}  /* receives programmatic focus */
        aria-label={`Step ${step} of 4`}
        data-lenis-prevent="true"
      >

        {/* ── Step indicators ── */}
        <div className="onboarding-steps" aria-label="Step indicator">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`onboarding-step-dot${s === step ? ' active' : s < step ? ' done' : ''}`}
              aria-current={s === step ? 'step' : undefined}
            />
          ))}
        </div>

        {/* ── Skip button (visible from step 2+) ── */}
        {step >= 2 && step < 4 && (
          <button
            className="onboarding-skip"
            onClick={() => step < 3 ? setStep(3) : complete()}
            aria-label="Skip this step"
          >
            Skip
          </button>
        )}

        {/* ══════════════════════════════════════ */}
        {/* STEP 1 — Language Selection           */}
        {/* ══════════════════════════════════════ */}
        {step === 1 && (
          <div className="onboarding-step">
            {/* Logo */}
            <div className="onboarding-logo" aria-hidden="true">
              <Image src="/sunad_logo.jpg" alt="" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }} aria-hidden="true" priority={false} />
              <span>Sunad OTT</span>
            </div>

            <h1 className="onboarding-title">
              Choose Your Language
              <span className="onboarding-title__hi" lang="hi">अपनी भाषा चुनें</span>
            </h1>
            <p className="onboarding-subtitle">
              Select the language(s) you&apos;re most comfortable with. You can change this anytime.
            </p>

            {/* Language grid */}
            <div className="lang-grid" role="list" aria-label="Language selection">
              {INDIAN_LANGUAGES.map((lang: IndianLanguage) => {
                const isSelected = selectedLangs.includes(lang.code);
                return (
                  <button
                    key={lang.code}
                    className={`lang-btn${isSelected ? ' selected' : ''}${lang.rtl ? ' lang-tile--rtl' : ''}`}
                    onClick={() => toggleLang(lang.code)}
                    aria-pressed={isSelected}
                    aria-label={`${lang.englishName} - ${lang.nativeName}`}
                    style={{
                      fontFamily: lang.fontFamily,
                      direction: lang.rtl ? 'rtl' : 'ltr',
                    }}
                  >
                    <span className="lang-btn__native">{lang.nativeName}</span>
                    <span className="lang-tile__script">{lang.scriptName}</span>
                    <span className="lang-btn__en">{lang.englishName}</span>
                    {isSelected && (
                      <span className="lang-tile__check" aria-hidden="true">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="onboarding-footer">
              <p className="onboarding-hint">
                {selectedLangs.length === 0
                  ? 'Select one or more languages'
                  : `${selectedLangs.length} language${selectedLangs.length > 1 ? 's' : ''} selected`}
              </p>
              <button
                className={`onboarding-action${selectedLangs.length === 0 ? ' btn-disabled' : ''}`}
                onClick={() => {
                  if (selectedLangs.length > 0) {
                    setLang(selectedLangs[0] as Lang);
                    setStep(2);
                  }
                }}
                disabled={selectedLangs.length === 0}
                aria-disabled={selectedLangs.length === 0}
                id="onboarding-lang-continue"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════ */}
        {/* STEP 2 — Account / Registration       */}
        {/* ══════════════════════════════════════ */}
        {step === 2 && (
          <div className="onboarding-step onboarding-step--two-col">
            {/* Left: Cinematic panel */}
            <div className="onboarding-cinema" aria-hidden="true">
              <div
                className="onboarding-cinema__image"
                style={{
                  backgroundImage: 'url(/mystic_bharat.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="onboarding-cinema__overlay" />
              <div className="onboarding-cinema__text">
                <p className="onboarding-cinema__quote">
                  &ldquo;Connecting voices, Building Communities, Serving Humanities&rdquo;
                </p>
                <p className="onboarding-cinema__tagline">REAL STORIES · REAL BHARAT · REAL IMPACT</p>
              </div>
            </div>

            {/* Right: Registration form */}
            <div className="onboarding-form">
              <h2 className="onboarding-title">Create Your Account</h2>
              <p className="onboarding-subtitle">Join Sunad OTT to save your watchlist and get personalized recommendations.</p>

              {/* Social sign-in */}
              {authError && (
                <div className="onboarding-auth-error" role="alert">
                  ⚠ {authError}
                </div>
              )}
              <div className="onboarding-social">
                <button
                  className="social-btn social-btn--google"
                  id="onboarding-google"
                  type="button"
                  disabled={authLoading}
                  onClick={async () => {
                    setAuthError(null);
                    setAuthLoading(true);
                    try {
                      const user = await signInWithGoogle();
                      if (user) {
                        complete();
                      }
                    } catch (err: unknown) {
                      const msg = err instanceof Error ? err.message : 'Google sign-in failed. Please try again.';
                      setAuthError(msg.replace('Firebase: ', '').replace(/\s*\(auth\/[^)]+\)/, ''));
                    } finally {
                      setAuthLoading(false);
                    }
                  }}
                >
                  {authLoading ? (
                    <span className="onboarding-spinner" aria-hidden="true" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  {authLoading ? 'Signing in…' : 'Continue with Google'}
                </button>
                <button className="social-btn social-btn--apple" id="onboarding-apple" type="button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.29.07 2.18.74 2.94.8.94-.19 1.84-.86 2.84-.79 1.21.09 2.13.54 2.73 1.35-2.45 1.47-1.87 4.7.48 5.61-.57 1.55-1.32 3.07-2.99 3.89zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <div className="onboarding-divider" aria-hidden="true"><span>or</span></div>

              {/* Email/password form */}
              <div className="onboarding-field-group">
                <div className="onboarding-field">
                  <label htmlFor="ob-email" className="onboarding-label">Email or Phone</label>
                  <input
                    id="ob-email"
                    type="text"
                    className="onboarding-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="onboarding-field">
                  <label htmlFor="ob-password" className="onboarding-label">Password</label>
                  <input
                    id="ob-password"
                    type="password"
                    className="onboarding-input"
                    placeholder="Create a password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button
                className="onboarding-action"
                onClick={() => setStep(3)}
                id="onboarding-register-continue"
                type="button"
              >
                Create Account &amp; Continue →
              </button>

              <p className="onboarding-terms">
                By continuing, you agree to our{' '}
                <Link href="/terms" onClick={complete} className="onboarding-link">Terms</Link>
                {' '}&amp;{' '}
                <Link href="/privacy" onClick={complete} className="onboarding-link">Privacy Policy</Link>
              </p>

              <button
                className="onboarding-guest"
                onClick={() => setStep(3)}
                id="onboarding-guest"
                type="button"
              >
                Continue as Guest →
              </button>

              <p className="onboarding-signin-hint">
                Already have an account?{' '}
                <Link href="/signin" onClick={complete} className="onboarding-link">Sign In</Link>
              </p>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════ */}
        {/* STEP 3 — Genre Preferences            */}
        {/* ══════════════════════════════════════ */}
        {step === 3 && (
          <div className="onboarding-step">
            <h2 className="onboarding-title">What do you love to watch?</h2>
            <p className="onboarding-subtitle">
              Pick at least 3 genres to personalize your Sunad OTT experience.
            </p>

            <div className="genre-grid" role="list" aria-label="Genre selection">
              {ALL_GENRES.map((genre: GenreDef) => {
                const isSelected = selectedGenres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    className={`genre-btn${isSelected ? ' selected' : ''}`}
                    onClick={() => toggleGenre(genre.id)}
                    aria-pressed={isSelected}
                    style={isSelected ? { borderColor: genre.color, background: `${genre.color}22` } : {}}
                  >
                    <span className="genre-tile__icon" aria-hidden="true">{genre.icon}</span>
                    <span className="lang-btn__en">{genre.nameEn}</span>
                    <span className="lang-btn__native" lang="hi">{genre.nameHi}</span>
                    {isSelected && <span className="genre-tile__check" aria-hidden="true">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="onboarding-footer">
              <p className="onboarding-hint">
                {selectedGenres.length < 3
                  ? `Pick ${3 - selectedGenres.length} more to continue`
                  : `${selectedGenres.length} genres selected — great taste!`}
              </p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button className="btn-ghost" onClick={() => setStep(2)} type="button">← Back</button>
                <button
                  className={`onboarding-action${selectedGenres.length < 3 ? ' btn-disabled' : ''}`}
                  onClick={() => selectedGenres.length >= 3 && setStep(4)}
                  disabled={selectedGenres.length < 3}
                  aria-disabled={selectedGenres.length < 3}
                  id="onboarding-genre-continue"
                  type="button"
                >
                  Start Watching →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════ */}
        {/* STEP 4 — Welcome / Done               */}
        {/* ══════════════════════════════════════ */}
        {step === 4 && (
          <div className="onboarding-step onboarding-step--welcome">
            <div className="onboarding-welcome-icon" aria-hidden="true" style={{ display: 'flex', justifyContent: 'center' }}>
              <Film size={56} style={{ color: 'var(--color-gold)' }} />
            </div>
            <h2 className="onboarding-title">You&apos;re all set!</h2>
            <p className="onboarding-subtitle">
              Welcome to Sunad OTT. Your personalized experience awaits — in your language, your genres, your stories.
            </p>

            <div className="onboarding-welcome-stats" aria-label="Platform highlights">
              <div className="onboarding-stat">
                <strong>22</strong>
                <span>Indian Languages</span>
              </div>
              <div className="onboarding-stat">
                <strong>19+</strong>
                <span>Daily Shows</span>
              </div>
              <div className="onboarding-stat">
                <strong>4K</strong>
                <span>Premium Streaming</span>
              </div>
            </div>

            <button
              className="btn-primary onboarding-cta onboarding-cta--large"
              onClick={complete}
              id="onboarding-enter"
              type="button"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>Enter Sunad OTT</span>
              <Sparkles size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

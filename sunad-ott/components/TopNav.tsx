'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from './LangContext';
import { useTheme } from './ThemeContext';
import { NAV_ITEMS } from '@/lib/mockData';
import { trackLanguageSwitch, trackNavSignIn } from '@/lib/analytics';

const ICONS: Record<string, React.ReactNode> = {
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'live-tv': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
      <polygon points="10 11 15 14 10 17" fill="currentColor" />
    </svg>
  ),
  originals: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  culture: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 6v12" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
    </svg>
  ),
  documentaries: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
      <line x1="7" x2="7" y1="2" y2="22" />
      <line x1="17" x2="17" y1="2" y2="22" />
      <line x1="2" x2="22" y1="7" y2="7" />
      <line x1="2" x2="22" y1="17" y2="17" />
    </svg>
  ),
  podcasts: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  news: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  ),
  kids: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  ),
  store: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
};

/**
 * TopNav — Floating dock navigation bar.
 *
 * Behavior:
 * - At page top: full-width, transparent, 72px tall
 * - On scroll (>80px): contracts to a centered glassmorphic pill (~52px tall)
 * - CSS Scroll-Driven Animation handles morph in Chromium/Safari
 * - JS scroll listener fallback for Firefox (no scroll-driven anim support)
 * - Mobile: compact pill + hamburger opens full-screen glass overlay
 */
export default function TopNav() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { lang, toggle, t } = useLang();
  const { toggleTheme, isLight } = useTheme();
  const pathname = usePathname();

  // JS fallback for Firefox — CSS scroll-driven animation not supported
  useEffect(() => {
    // Only activate fallback if browser lacks scroll-driven animation support
    if (CSS.supports('animation-timeline', 'scroll()')) return;

    const onScroll = () => {
      if (!navRef.current) return;
      const docked = window.scrollY > 80;
      navRef.current.classList.toggle('is-docked', docked);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount to set initial state
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu toggle
  const openMenu = useCallback(() => {
    mobileMenuRef.current?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }, []);

  const closeMenu = useCallback(() => {
    mobileMenuRef.current?.classList.remove('is-open');
    document.body.style.overflow = '';
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeMenu]);

  // Visible nav items (first 6 for desktop center links)
  const mainNavItems = NAV_ITEMS.slice(0, 6);

  return (
    <>
      <nav
        ref={navRef}
        className="site-nav"
        role="navigation"
        aria-label={t('Main navigation', 'मुख्य नेविगेशन')}
      >
        {/* ── Left: Logo ── */}
        <Link href="/" className="nav-logo" aria-label={t('Sunad OTT — Home', 'सुनाद OTT — होम')}>
          <img src="/sunad_logo.jpg" alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-gold)' }} aria-hidden="true" />
          <span className="nav-logo__text">Sunad</span>
          <span className="nav-logo__badge">OTT</span>
        </Link>

        {/* ── Center: Nav Links ── */}
        <ul className="nav-links" role="list">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`nav-item${isActive ? ' active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {ICONS[item.id] || item.icon}
                  </span>
                  <span className="nav-label">{t(item.nameEn, item.nameHi)}</span>
                  {item.isLive && (
                    <span className="badge badge--live" aria-label={t('Live', 'लाइव')}>
                      {t('LIVE', 'लाइव')}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Right: Controls ── */}
        <div className="nav-controls">
          {/* Search */}
          <Link
            href="/search"
            className="nav-icon-btn"
            aria-label={t('Search', 'खोजें')}
            title={t('Search', 'खोजें')}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Link>

          {/* Bell / Notifications */}
          <button
            className="nav-icon-btn nav-bell"
            aria-label={t('Notifications', 'सूचनाएं')}
            title={t('Notifications', 'सूचनाएं')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          {/* Theme Toggle */}
          <button
            className="nav-icon-btn nav-theme-toggle"
            onClick={toggleTheme}
            aria-label={isLight ? t('Switch to Dark theme', 'डार्क थीम पर जाएं') : t('Switch to White & Gold theme', 'व्हाइट & गोल्ड थीम पर जाएं')}
            title={isLight ? t('Switch to Dark theme', 'डार्क थीम') : t('White & Gold theme', 'व्हाइट & गोल्ड थीम')}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <span
              style={{
                display: 'inline-flex',
                transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
                transform: isLight ? 'rotate(0deg) scale(1)' : 'rotate(-30deg) scale(0.8)',
                opacity: isLight ? 1 : 0,
                position: isLight ? 'static' : 'absolute',
              }}
              aria-hidden="true"
            >
              {/* Moon icon — shown in light mode to switch back to dark */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
            <span
              style={{
                display: 'inline-flex',
                transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
                transform: isLight ? 'rotate(30deg) scale(0.8)' : 'rotate(0deg) scale(1)',
                opacity: isLight ? 0 : 1,
                position: isLight ? 'absolute' : 'static',
              }}
              aria-hidden="true"
            >
              {/* Sun icon — shown in dark mode to switch to light */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </span>
          </button>

          {/* Language Toggle */}
          <button
            className="lang-toggle nav-lang-toggle"
            onClick={() => {
              const next = lang === 'en' ? 'hi' : 'en';
              trackLanguageSwitch(next);
              toggle();
            }}
            aria-label={lang === 'en'
              ? 'Switch to Hindi — हिंदी में देखें'
              : 'Switch to English — Switch to English'
            }
            aria-pressed={lang === 'hi'}
          >
            {lang === 'en' ? (
              <>EN <span aria-hidden="true">▾</span></>
            ) : (
              <>हिं <span aria-hidden="true">▾</span></>
            )}
          </button>

          {/* Sign In */}
          <Link href="/signin" className="nav-sign-in" onClick={() => trackNavSignIn(false)}>
            {t('Sign In', 'साइन इन')}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="nav-hamburger"
            aria-label={t('Open navigation menu', 'नेविगेशन मेनू खोलें')}
            aria-expanded="false"
            onClick={openMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <div
        ref={mobileMenuRef}
        className="mobile-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={t('Navigation menu', 'नेविगेशन मेनू')}
      >
        {/* Close button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            <span className="nav-logo__icon">◈</span>
            <span className="nav-logo__text">Sunad</span>
            <span className="nav-logo__badge">OTT</span>
          </Link>
          <button
            className="nav-icon-btn"
            onClick={closeMenu}
            aria-label={t('Close menu', 'मेनू बंद करें')}
            style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}
          >
            ✕
          </button>
        </div>

        {/* Mobile nav links */}
        <nav aria-label={t('Mobile navigation', 'मोबाइल नेविगेशन')}>
          <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`nav-item${isActive ? ' active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeMenu}
                    style={{ fontSize: 'var(--type-body-l)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', display: 'flex' }}
                  >
                    <span className="nav-icon" style={{ fontSize: '1.25rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      {ICONS[item.id] || item.icon}
                    </span>
                    <span>{t(item.nameEn, item.nameHi)}</span>
                    {item.isLive && (
                      <span className="badge badge--live" style={{ marginLeft: 'auto' }}>LIVE</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile lang toggle + sign in */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {/* Mobile Theme Toggle */}
          <button
            className="lang-toggle"
            onClick={toggleTheme}
            style={{ width: '100%', justifyContent: 'center', gap: 'var(--space-1)' }}
          >
            {isLight ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                {t('Switch to Dark Theme', 'डार्क थीम पर जाएं')}
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                {t('White & Gold Theme', 'व्हाइट & गोल्ड थीम')}
              </>
            )}
          </button>
          <button className="lang-toggle" onClick={toggle} style={{ width: '100%', justifyContent: 'center' }}>
            {lang === 'en' ? 'Switch to हिंदी' : 'Switch to English'}
          </button>
          <Link href="/signin" className="btn-primary" style={{ justifyContent: 'center' }} onClick={closeMenu}>
            {t('Sign In', 'साइन इन')}
          </Link>
        </div>
      </div>
    </>
  );
}

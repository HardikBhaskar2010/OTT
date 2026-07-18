'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLang, SUPPORTED_LANGUAGES } from './LangContext';

import { NAV_ITEMS } from '@/lib/mockData';
import { trackLanguageSwitch, trackNavSignIn } from '@/lib/analytics';
import FloatingMenu from './FloatingMenu';

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
 */
export default function TopNav() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLang();

  const pathname = usePathname();
  const router = useRouter();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLLIElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close categories dropdown on navigation
  useEffect(() => {
    setCategoriesOpen(false);
    setLangDropdownOpen(false);
  }, [pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Clear search query if navigating away from search page
  useEffect(() => {
    if (!pathname.startsWith('/search')) {
      setSearchQuery('');
    }
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // JS fallback for Firefox — CSS scroll-driven animation not supported
  useEffect(() => {
    if (CSS.supports('animation-timeline', 'scroll()')) return;

    const onScroll = () => {
      if (!navRef.current) return;
      const docked = window.scrollY > 80;
      navRef.current.classList.toggle('is-docked', docked);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
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
      if (e.key === 'Escape') {
        closeMenu();
        setLangDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeMenu]);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <nav
        ref={navRef}
        className="site-nav"
        role="navigation"
        aria-label={t('Main navigation', 'मुख्य नेविगेशन')}
      >
        {/* ── Left: Logo ── */}
        <Link href="/" className="nav-logo" aria-label={t('Sunad TV — Home', 'सुनाद टीवी — होम')}>
          <img src="/sunad_logo.jpg" alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-gold)' }} aria-hidden="true" />
          <span className="nav-logo__text">Sunad</span>
          <span className="nav-logo__badge">TV</span>
        </Link>

        {/* ── Center: Nav Links, Categories Dropdown & Search Bar ── */}
        <div className="nav-center-group">
          <ul className="nav-links" role="list">
            <li>
              <Link href="/" className={`nav-item${pathname === '/' ? ' active' : ''}`}>
                <span className="nav-label">{t('Home', 'होम')}</span>
              </Link>
            </li>
            <li>
              <Link href="/live" className={`nav-item${pathname === '/live' ? ' active' : ''}`}>
                <span className="nav-label">{t('Live TV', 'लाइव टीवी')}</span>
              </Link>
            </li>
            <li>
              <Link href="/originals" className={`nav-item${pathname === '/originals' ? ' active' : ''}`}>
                <span className="nav-label">{t('Originals', 'ओरिजिनल')}</span>
              </Link>
            </li>

            {/* Collapsible Categories Dropdown */}
            <li className="nav-item-dropdown" ref={dropdownRef}>
              <button
                className={`nav-item nav-dropdown-trigger${categoriesOpen ? ' active' : ''}`}
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                type="button"
              >
                <span className="nav-label">{t('Browse ▾', 'श्रेणियां ▾')}</span>
              </button>
              {categoriesOpen && (
                <ul className="categories-dropdown-menu" role="menu">
                  <li role="none">
                    <Link href="/browse/movies" role="menuitem" className="dropdown-link">
                      <span>{t('Movies', 'फ़िल्में')}</span>
                    </Link>
                  </li>
                  <li role="none">
                    <Link href="/browse/music" role="menuitem" className="dropdown-link">
                      <span>{t('Music', 'संगीत')}</span>
                    </Link>
                  </li>
                  <li role="none">
                    <Link href="/browse/shows" role="menuitem" className="dropdown-link">
                      <span>{t('Shows', 'शोज़')}</span>
                    </Link>
                  </li>
                  <li role="none">
                    <Link href="/browse/documentaries" role="menuitem" className="dropdown-link">
                      <span>{t('Documentaries', 'वृत्तचित्र')}</span>
                    </Link>
                  </li>
                  <li role="none" className="dropdown-divider" />
                  <li role="none">
                    <Link href="/history" role="menuitem" className="dropdown-link">
                      <span>{t('Watch History', 'देखने का इतिहास')}</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Centered Search Bar */}
          <form onSubmit={handleSearchSubmit} className="nav-search-form">
            <div className="nav-search-input-wrapper">
              <span className="nav-search-icon-inside" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Search movies, shows...', 'फ़िल्में, शो खोजें...')}
                className="nav-search-input"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="nav-search-clear" aria-label={t('Clear search', 'खोज साफ़ करें')}>
                  ✕
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── Right: Controls ── */}
        <div className="nav-controls">
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

          {/* 22-Language Selector Dropdown */}
          <div className="lang-dropdown-wrapper" ref={langDropdownRef}>
            <button
              className={`lang-toggle nav-lang-toggle${langDropdownOpen ? ' active' : ''}`}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
              aria-expanded={langDropdownOpen}
              type="button"
            >
              <span>{currentLangObj.nativeName}</span>
              <span aria-hidden="true" style={{ fontSize: '0.7rem' }}>▾</span>
            </button>

            {langDropdownOpen && (
              <div className="lang-dropdown-menu" role="menu">
                <div className="lang-dropdown-header">
                  <span>{t('Select Language', 'अपनी भाषा चुनें')}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>22 Languages</span>
                </div>
                <div className="lang-dropdown-grid">
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      className={`lang-dropdown-item${lang === l.code ? ' active' : ''}`}
                      onClick={() => {
                        setLang(l.code);
                        trackLanguageSwitch(l.code);
                        setLangDropdownOpen(false);
                      }}
                      role="menuitem"
                    >
                      <span className="lang-dropdown-native">{l.nativeName}</span>
                      <span className="lang-dropdown-english">{l.englishName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Floating Morphed Framer Hamburger Menu */}
          <FloatingMenu className="nav-floating-menu" />
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

        {/* Mobile 22-language grid selection */}
        <div className="mobile-lang-section">
          <p className="mobile-lang-title">{t('Select Platform Language', 'अपनी भाषा चुनें')}</p>
          <div className="mobile-lang-grid">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                className={`mobile-lang-btn${lang === l.code ? ' active' : ''}`}
                onClick={() => {
                  setLang(l.code);
                  trackLanguageSwitch(l.code);
                  closeMenu();
                }}
              >
                <span className="native">{l.nativeName}</span>
                <span className="eng">{l.englishName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile sign in */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Link href="/signin" className="btn-primary" style={{ justifyContent: 'center' }} onClick={closeMenu}>
            {t('Sign In', 'साइन इन')}
          </Link>
        </div>
      </div>
    </>
  );
}


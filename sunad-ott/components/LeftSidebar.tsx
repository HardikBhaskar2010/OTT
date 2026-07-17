'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SIDEBAR_ITEMS = [
  {
    id: 'movies',
    href: '/browse/movies',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/>
        <line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/>
        <line x1="2" x2="22" y1="7" y2="7"/><line x1="2" x2="22" y1="17" y2="17"/>
      </svg>
    ),
    labelEn: 'Movies',
    labelHi: 'फ़िल्में',
  },
  {
    id: 'music',
    href: '/browse/music',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    labelEn: 'Music',
    labelHi: 'संगीत',
  },
  {
    id: 'shows',
    href: '/browse/shows',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="15" x="2" y="7" rx="2" ry="2"/>
        <polyline points="17 2 12 7 7 2"/>
        <polygon points="10 11 15 14 10 17" fill="currentColor"/>
      </svg>
    ),
    labelEn: 'Shows',
    labelHi: 'शोज़',
  },
  {
    id: 'documentaries',
    href: '/browse/documentaries',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
      </svg>
    ),
    labelEn: 'Documentaries',
    labelHi: 'वृत्तचित्र',
  },
  {
    id: 'history',
    href: '/history',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    labelEn: 'Watch History',
    labelHi: 'देखने का इतिहास',
  },
];

/**
 * LeftSidebar — Collapsible vertical nav sidebar
 * - Collapsed: 68px wide (icons only)
 * - Expanded on hover (desktop): 220px wide (icon + label)
 * - Hidden on mobile (collapsed to hamburger in TopNav)
 */
export default function LeftSidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const pathname = usePathname();

  const expand = useCallback(() => {
    setIsHovered(true);
  }, []);

  const collapse = useCallback(() => {
    setIsHovered(false);
  }, []);

  const togglePin = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(prev => !prev);
  }, []);

  // Reset/collapse on route change
  useEffect(() => {
    setIsHovered(false);
    setIsPinned(false);
  }, [pathname]);

  const isExpanded = isHovered || isPinned;

  return (
    <aside
      className={`left-sidebar${isExpanded ? ' is-expanded' : ''}`}
      aria-label="Content categories navigation"
      onMouseEnter={expand}
      onMouseLeave={collapse}
    >
      {/* Pull Tab Handle (sleek vertical pull button on the right edge) */}
      <button
        className={`left-sidebar__pull-tab${isExpanded ? ' is-active' : ''}`}
        onClick={togglePin}
        aria-label={isExpanded ? 'Collapse category sidebar' : 'Browse content categories'}
        title={isExpanded ? 'Collapse sidebar' : 'Browse categories'}
        aria-expanded={isExpanded}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pull-tab-chevron"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Nav items */}
      <nav aria-label="Category navigation">
        <ul role="list" className="left-sidebar__list">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={item.labelEn}
                >
                  <span className="sidebar-item__icon">{item.icon}</span>
                  <span className="sidebar-item__label">
                    <span className="lang-en-only">{item.labelEn}</span>
                    <span className="lang-hi-only" lang="hi">{item.labelHi}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom watermark */}
      <div className="left-sidebar__watermark" aria-hidden="true">
        <span>SUNAD</span>
      </div>
    </aside>
  );
}

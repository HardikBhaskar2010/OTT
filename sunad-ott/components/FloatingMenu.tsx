'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from './LangContext';
import { NAV_ITEMS } from '@/lib/mockData';
import { trackNavClick } from '@/lib/analytics';

interface FloatingMenuProps {
  /** Optional custom position style (e.g. embedded in nav or floating dock) */
  className?: string;
  onLinkClick?: () => void;
}

export default function FloatingMenu({ className = '', onLinkClick }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pingKey, setPingKey] = useState(0);
  const { t } = useLang();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // ── 2-Second Animated Interactivity Signal Indicator ───────────────────────
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setPingKey((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // ── Click outside to close ────────────────────────────────────────────────
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // ── Close on route change or Escape ───────────────────────────────────────
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navLinks = NAV_ITEMS.slice(0, 7); // Pre-configured links

  return (
    <div ref={menuRef} className={`floating-menu-container ${className}`}>
      {/* ── Main Morphing Trigger Button ── */}
      <button
        onClick={toggleMenu}
        className={`floating-menu-trigger ${isOpen ? 'is-open' : ''}`}
        aria-label={isOpen ? t('Close menu', 'मेनू बंद करें') : t('Open navigation menu', 'नेविगेशन मेनू खोलें')}
        aria-expanded={isOpen}
        type="button"
      >
        {/* Animated Interactivity Pulse Ping Ring (Triggers every 2 seconds when closed) */}
        {!isOpen && (
          <motion.span
            key={pingKey}
            className="floating-menu-ping"
            initial={{ scale: 0.9, opacity: 0.75 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}

        {/* Pulsing Interactivity Center Dot */}
        {!isOpen && <span className="floating-menu-dot" aria-hidden="true" />}

        {/* Morphing Hamburger / Close Icon */}
        <div className="morph-icon" aria-hidden="true">
          <motion.span
            className="morph-bar morph-bar--top"
            animate={
              isOpen
                ? { rotate: 45, y: 6, backgroundColor: '#FFFFFF' }
                : { rotate: 0, y: 0, backgroundColor: 'var(--color-gold, #D97706)' }
            }
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
          <motion.span
            className="morph-bar morph-bar--mid"
            animate={
              isOpen
                ? { opacity: 0, scaleX: 0 }
                : { opacity: 1, scaleX: 1, backgroundColor: 'var(--color-gold, #D97706)' }
            }
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="morph-bar morph-bar--bot"
            animate={
              isOpen
                ? { rotate: -45, y: -6, backgroundColor: '#FFFFFF' }
                : { rotate: 0, y: 0, backgroundColor: 'var(--color-gold, #D97706)' }
            }
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        </div>
        
        <span className="floating-menu-label">
          {isOpen ? t('Close', 'बंद करें') : t('Menu', 'मेनू')}
        </span>
      </button>

      {/* ── Morphed Navigation Menu Dropdown ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-menu-dropdown"
            initial={{ opacity: 0, scale: 0.88, y: -12, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.92, y: -8, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            role="menu"
          >
            {/* Header Badge */}
            <div className="floating-menu-header">
              <span className="floating-menu-title">Sunad TV Navigation</span>
              <span className="floating-menu-badge">OTT</span>
            </div>

            {/* Links List with Stagger Animation */}
            <motion.ul
              className="floating-menu-list"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
              }}
            >
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <motion.li
                    key={item.id}
                    variants={{
                      open: { opacity: 1, y: 0, scale: 1 },
                      closed: { opacity: 0, y: -8, scale: 0.95 },
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Link
                      href={item.href}
                      className={`floating-menu-link ${isActive ? 'is-active' : ''}`}
                      onClick={() => {
                        trackNavClick(item.href, true);
                        if (onLinkClick) onLinkClick();
                        setIsOpen(false);
                      }}
                      role="menuitem"
                    >
                      <span className="floating-menu-link-icon">{item.icon}</span>
                      <span className="floating-menu-link-text">
                        {t(item.nameEn, item.nameHi)}
                      </span>
                      {item.isLive && (
                        <span className="floating-menu-live-badge">LIVE</span>
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="floating-menu-active-pill"
                          className="floating-menu-active-indicator"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Footer quick links */}
            <div className="floating-menu-footer">
              <Link
                href="/signin"
                className="floating-menu-signin-btn"
                onClick={() => setIsOpen(false)}
              >
                {t('Sign In', 'साइन इन')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeContext';
import { CATEGORIES } from '@/lib/mockData';

/* ── Theme-aware footer images ───────────────────────────────────────────── */
const FOOTER_IMAGES = [
  {
    src: '/thumb_spiritual.jpg',
    alt: 'Spiritual knowledge — CultureFlix',
    label: 'Spiritual',
    labelHi: 'आध्यात्म',
  },
  {
    src: '/mystic_bharat.jpg',
    alt: 'Mystic Bharat documentary — CultureFlix',
    label: 'Mystic Bharat',
    labelHi: 'मिस्टिक भारत',
  },
  {
    src: '/thumb_history.jpg',
    alt: 'History & Civilisation — CultureFlix',
    label: 'History',
    labelHi: 'इतिहास',
  },
  {
    src: '/the_craftsmen.jpg',
    alt: 'Indian craftsmen — CultureFlix Store',
    label: 'Crafts',
    labelHi: 'शिल्पकला',
  },
  {
    src: '/thumb_agriculture.jpg',
    alt: 'Agriculture & rural India — CultureFlix',
    label: 'Agriculture',
    labelHi: 'कृषि',
  },
];

/**
 * Footer — Client component (needs useTheme for image mosaic).
 * Full sitemap footer with bilingual columns, social links, legal,
 * and a theme-responsive image mosaic strip.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isLight } = useTheme();

  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'var(--space-12)',
      }}
      role="contentinfo"
      aria-label="CultureFlix Footer"
    >

      {/* ══ THEME-RESPONSIVE IMAGE MOSAIC STRIP ══════════════════════════════ */}
      <div
        className="footer-mosaic-height"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          height: '220px',
        }}
        aria-hidden="true"
      >
        {/* Mosaic grid of images */}
        <div
          className="footer-mosaic-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 2fr 1fr 1.6fr 1fr',
            height: '100%',
            gap: '3px',
          }}
        >
          {FOOTER_IMAGES.map((img, idx) => (
            <div
              key={img.src}
              className="footer-mosaic-tile"
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* The image itself */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="20vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  /* Smooth brightness/saturation transition on theme change */
                  filter: isLight
                    ? 'brightness(1.18) saturate(0.82) contrast(0.96)'
                    : 'brightness(0.72) saturate(1.05) contrast(1.02)',
                  transition: 'filter 0.5s ease',
                }}
              />

              {/* Dark-mode overlay: deep cinematic gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: isLight
                    ? 'linear-gradient(to top, rgba(255,248,234,0.72) 0%, rgba(255,248,234,0.18) 55%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(11,9,7,0.88) 0%, rgba(11,9,7,0.42) 50%, rgba(11,9,7,0.10) 100%)',
                  transition: 'background 0.5s ease',
                }}
              />

              {/* Category label at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: isLight ? '#6B5010' : 'rgba(247,235,213,0.75)',
                    background: isLight
                      ? 'rgba(255,248,230,0.80)'
                      : 'rgba(11,9,7,0.55)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    padding: '3px 7px',
                    borderRadius: '3px',
                    border: isLight
                      ? '1px solid rgba(200,134,10,0.30)'
                      : '1px solid rgba(247,235,213,0.14)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  {img.label}
                </span>
              </div>

              {/* Thin gold accent line at very bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: isLight
                    ? 'linear-gradient(90deg, transparent, rgba(200,134,10,0.60), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(230,154,36,0.45), transparent)',
                  opacity: idx % 2 === 0 ? 1 : 0.5,
                  transition: 'background 0.5s ease',
                }}
              />
            </div>
          ))}
        </div>

        {/* Full-width fade-to-surface at the bottom, blending mosaic into footer body */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            background: `linear-gradient(to top, var(--color-surface) 0%, transparent 100%)`,
            pointerEvents: 'none',
            transition: 'background 0.5s ease',
          }}
        />

        {/* Sunad watermark + tagline — single centred column */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            pointerEvents: 'none',
          }}
        >
          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src={isLight ? '/sunad_logo_light.png' : '/sunad_logo.jpg'}
              alt="CultureFlix"
              width={38}
              height={38}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid rgba(200,134,10,0.55)',
                boxShadow: isLight
                  ? '0 2px 12px rgba(160,100,0,0.25)'
                  : '0 2px 14px rgba(0,0,0,0.70)',
                transition: 'box-shadow 0.4s ease',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display-en)',
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: isLight ? '#1A1208' : '#F7EBD5',
                textShadow: isLight
                  ? '0 2px 12px rgba(255,248,230,0.9)'
                  : '0 2px 16px rgba(0,0,0,0.8)',
                transition: 'all 0.4s ease',
              }}
            >
              CultureFlix
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                color: 'var(--color-gold)',
                background: isLight
                  ? 'rgba(255,248,230,0.85)'
                  : 'rgba(11,9,7,0.55)',
                border: '1px solid rgba(200,134,10,0.40)',
                backdropFilter: 'blur(6px)',
                padding: '2px 7px',
                borderRadius: '3px',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                transition: 'all 0.4s ease',
              }}
            >
              OTT
            </span>
          </div>

          {/* Tagline — sits cleanly below logo row */}
          <div
            style={{
              whiteSpace: 'nowrap',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: isLight ? 'rgba(106,80,16,0.80)' : 'rgba(247,235,213,0.52)',
              textShadow: isLight
                ? '0 1px 6px rgba(255,255,255,0.8)'
                : '0 1px 8px rgba(0,0,0,0.9)',
              transition: 'all 0.4s ease',
            }}
          >
          Real Stories · Real Bharat · Real Impact
          </div>
        </div>
      </div>
      {/* end mosaic strip */}

      {/* ══ MAIN FOOTER BODY ════════════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 'var(--grid-max-width)',
          margin: '0 auto',
          padding: 'var(--space-8) var(--space-6) var(--space-6)',
        }}
      >
        {/* ── Top: Logo + Tagline | 4-Column Links ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <Link
              href="/"
              aria-label="CultureFlix — Home"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                marginBottom: 'var(--space-3)',
                textDecoration: 'none',
              }}
            >
              <Image
                src={isLight ? '/sunad_logo_light.png' : '/sunad_logo.jpg'}
                alt=""
                width={32}
                height={32}
                aria-hidden
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid var(--color-border-gold)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display-en)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.02em',
                }}
              >
                CultureFlix
              </span>
              <span
                style={{
                  fontSize: 'var(--type-caption)',
                  fontWeight: 700,
                  color: 'var(--color-gold)',
                  background: 'color-mix(in oklch, var(--primitive-gold) 12%, transparent)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                OTT
              </span>
            </Link>
            
            {/* Sub-label under logo */}
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)', fontStyle: 'italic' }}>
              under Sunad Broadcast Pvt. Ltd.
            </div>

            {/* Tagline in English */}
            <p
              style={{
                fontSize: 'var(--type-label)',
                color: 'var(--color-text-dim)',
                lineHeight: 1.6,
                marginBottom: 'var(--space-1)',
              }}
            >
              Real Stories. Real Bharat. Real Impact.
            </p>
            {/* Tagline in Hindi */}
            <p
              lang="hi"
              style={{
                fontFamily: 'var(--font-ui-hi)',
                fontSize: 'var(--type-hi-caption)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--lh-hi-body)',
                marginBottom: 'var(--space-3)',
              }}
            >
              एक भारत श्रेष्ठ भारत — सशक्त कहानियाँ, जीवन से जोड़ती हैं।
            </p>

            {/* WATCH. LEARN. EXPERIENCE. CONNECT. */}
            <p
              style={{
                fontSize: 'var(--type-caption)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1.6,
                marginBottom: 'var(--space-4)',
              }}
            >
              WATCH · LEARN · EXPERIENCE · CONNECT
            </p>

            {/* Contact Details */}
            <div
              style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)', lineHeight: 1.6 }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                }}
              >
                Corporate Office
              </p>
              <p style={{ margin: '0 0 var(--space-3) 0', color: 'var(--color-text-muted)' }}>
                505, C-Tower, I-Thum Building,
                <br />
                Sector 62, Noida, Uttar Pradesh - 201301
              </p>
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                }}
              >
                Customer Care
              </p>
              <p style={{ margin: 0, color: 'var(--color-gold)', fontWeight: 600 }}>
                <a href="tel:+918810322236" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +91 88103 22236
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3
              style={{
                fontSize: 'var(--type-label)',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Explore /{' '}
              <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>
                ब्राउज़ करें
              </span>
            </h3>
            <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/browse/${cat.id}`} className="footer-link">
                    {cat.nameEn} /{' '}
                    <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-caption)' }}>
                      {cat.nameHi}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h3
              style={{
                fontSize: 'var(--type-label)',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Platform /{' '}
              <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>
                प्लेटफ़ॉर्म
              </span>
            </h3>
            <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {[
                { nameEn: 'Live TV', nameHi: 'लाइव टीवी', href: '/live' },
                { nameEn: 'CultureFlix Store', nameHi: 'कल्चरफ्लिक्स स्टोर', href: '/store' },
                { nameEn: 'Subscription Plans', nameHi: 'सदस्यता योजनाएं', href: '/plans' },
                { nameEn: 'Download App', nameHi: 'ऐप डाउनलोड करें', href: '/download' },
                { nameEn: 'Become a Creator', nameHi: 'क्रिएटर बनें', href: '/creators' },
                { nameEn: 'Gift a Subscription', nameHi: 'सदस्यता उपहार दें', href: '/gift' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.nameEn} /{' '}
                    <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-caption)' }}>
                      {item.nameHi}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support + Social */}
          <div>
            <h3
              style={{
                fontSize: 'var(--type-label)',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Support /{' '}
              <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>
                सहायता
              </span>
            </h3>
            <ul
              role="list"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-4)' }}
            >
              {[
                { nameEn: 'Help Center', nameHi: 'सहायता केंद्र', href: '/help' },
                { nameEn: 'Contact Us', nameHi: 'संपर्क करें', href: '/contact' },
                { nameEn: 'Accessibility', nameHi: 'सुलभता', href: '/accessibility' },
                { nameEn: 'Advertise With Us', nameHi: 'विज्ञापन दें', href: '/advertise' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.nameEn} /{' '}
                    <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-caption)' }}>
                      {item.nameHi}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
              {[
                { label: 'YouTube', href: 'https://youtube.com', icon: '▶' },
                { label: 'Instagram', href: 'https://instagram.com', icon: '◎' },
                { label: 'Twitter/X', href: 'https://x.com', icon: '✗' },
                { label: 'Facebook', href: 'https://facebook.com', icon: 'f' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow CultureFlix on ${social.label}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-dim)',
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    transition: 'all var(--motion-fast) var(--motion-easing)',
                    minHeight: '44px',
                    minWidth: '44px',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider + Legal ── */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
          }}
        >
          {/* Copyright */}
          <p style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)' }}>
            © {currentYear} CultureFlix by Sunad Broadcast Pvt. Ltd. All rights reserved. /
            <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', marginLeft: '4px' }}>
              सर्वाधिकार सुरक्षित।
            </span>
          </p>

          {/* Legal links */}
          <ul
            role="list"
            style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', listStyle: 'none' }}
          >
            {[
              { nameEn: 'Privacy Policy', href: '/privacy' },
              { nameEn: 'Terms of Service', href: '/terms' },
              { nameEn: 'Cookie Policy', href: '/cookies' },
              { nameEn: 'DPDP Notice', href: '/dpdp' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link-legal">
                  {link.nameEn}
                </Link>
              </li>
            ))}
          </ul>

          {/* Rooted in Bharat tagline */}
          <p style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            Rooted in Bharat. Reaching the World.
          </p>
        </div>
      </div>
    </footer>
  );
}

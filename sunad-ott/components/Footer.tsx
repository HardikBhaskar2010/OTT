import Link from 'next/link';
import { CATEGORIES, NAV_ITEMS } from '@/lib/mockData';

/**
 * Footer — Server component.
 * Full sitemap footer with bilingual columns, social links, legal.
 * Background: var(--color-surface) with top border.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-12) var(--space-6) var(--space-6)',
        marginTop: 'var(--space-12)',
      }}
      role="contentinfo"
      aria-label="Sunad OTT Footer"
    >
      <div style={{ maxWidth: 'var(--grid-max-width)', margin: '0 auto' }}>

        {/* ── Top: Logo + Tagline | 4-Column Links ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-8)',
        }}>

          {/* Column 1: Brand */}
          <div>
            <Link href="/" aria-label="Sunad OTT — Home" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-3)', textDecoration: 'none' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--color-gold)', lineHeight: 1 }} aria-hidden="true">◈</span>
              <span style={{ fontFamily: 'var(--font-display-en)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--primitive-ivory)', letterSpacing: '-0.02em' }}>Sunad</span>
              <span style={{ fontSize: 'var(--type-caption)', fontWeight: 700, color: 'var(--color-gold)', background: 'color-mix(in oklch, var(--primitive-gold) 12%, transparent)', padding: '2px 6px', borderRadius: 'var(--radius-sm)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>OTT</span>
            </Link>

            {/* Tagline in English */}
            <p style={{ fontSize: 'var(--type-label)', color: 'var(--color-text-dim)', lineHeight: 1.6, marginBottom: 'var(--space-1)' }}>
              Real Stories. Real Bharat. Real Impact.
            </p>
            {/* Tagline in Hindi */}
            <p lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-caption)', color: 'var(--color-text-muted)', lineHeight: 'var(--lh-hi-body)', marginBottom: 'var(--space-3)' }}>
              एक भारत श्रेष्ठ भारत — सशक्त कहानियाँ, जीवन से जोड़ती हैं।
            </p>

            {/* WATCH. LEARN. EXPERIENCE. CONNECT. */}
            <p style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
              WATCH · LEARN · EXPERIENCE · CONNECT
            </p>

            {/* Contact Details */}
            <div style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--primitive-white)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Corporate Office</p>
              <p style={{ margin: '0 0 var(--space-3) 0', color: 'var(--color-text-muted)' }}>
                505, C-Tower, I-Thum Building,<br />
                Sector 62, Noida, Uttar Pradesh - 201301
              </p>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--primitive-white)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Customer Care</p>
              <p style={{ margin: 0, color: 'var(--color-gold)', fontWeight: 600 }}>
                <a href="tel:+918810322236" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88103 22236</a>
              </p>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Explore / <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>ब्राउज़ करें</span>
            </h3>
            <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/browse/${cat.id}`}
                    className="footer-link"
                  >
                    {cat.nameEn} / <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-caption)' }}>{cat.nameHi}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h3 style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Platform / <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>प्लेटफ़ॉर्म</span>
            </h3>
            <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {[
                { nameEn: 'Live TV', nameHi: 'लाइव टीवी', href: '/live' },
                { nameEn: 'Sunad Store', nameHi: 'सुनाद स्टोर', href: '/store' },
                { nameEn: 'Subscription Plans', nameHi: 'सदस्यता योजनाएं', href: '/plans' },
                { nameEn: 'Download App', nameHi: 'ऐप डाउनलोड करें', href: '/download' },
                { nameEn: 'Become a Creator', nameHi: 'क्रिएटर बनें', href: '/creators' },
                { nameEn: 'Gift a Subscription', nameHi: 'सदस्यता उपहार दें', href: '/gift' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="footer-link"
                  >
                    {item.nameEn} / <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-caption)' }}>{item.nameHi}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support + Social */}
          <div>
            <h3 style={{ fontSize: 'var(--type-label)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Support / <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)' }}>सहायता</span>
            </h3>
            <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
              {[
                { nameEn: 'Help Center', nameHi: 'सहायता केंद्र', href: '/help' },
                { nameEn: 'Contact Us', nameHi: 'संपर्क करें', href: '/contact' },
                { nameEn: 'Accessibility', nameHi: 'सुलभता', href: '/accessibility' },
                { nameEn: 'Advertise With Us', nameHi: 'विज्ञापन दें', href: '/advertise' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="footer-link"
                  >
                    {item.nameEn} / <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', fontSize: 'var(--type-hi-caption)' }}>{item.nameHi}</span>
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
                  aria-label={`Follow Sunad OTT on ${social.label}`}
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

        {/* ── Divider ── */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>

          {/* Copyright */}
          <p style={{ fontSize: 'var(--type-caption)', color: 'var(--color-text-muted)' }}>
            © {currentYear} Sunad OTT. All rights reserved. /
            <span lang="hi" style={{ fontFamily: 'var(--font-ui-hi)', marginLeft: '4px' }}>
              सर्वाधिकार सुरक्षित।
            </span>
          </p>

          {/* Legal links */}
          <ul role="list" style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', listStyle: 'none' }}>
            {[
              { nameEn: 'Privacy Policy', href: '/privacy' },
              { nameEn: 'Terms of Service', href: '/terms' },
              { nameEn: 'Cookie Policy', href: '/cookies' },
              { nameEn: 'DPDP Notice', href: '/dpdp' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="footer-link-legal"
                >
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

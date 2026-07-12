import type { Metadata, Viewport } from 'next';
import { Fraunces, Mukta, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from 'next/font/google';
import '@/styles/globals.css';
import { LangProvider } from '@/components/LangContext';
import { LenisProvider } from '@/components/LenisProvider';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import LandingModal from '@/components/LandingModal';

/* ─── FONTS via next/font/google ──────────────────────────────────────────── */
/* Fraunces — Display/Editorial, Latin */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--next-font-fraunces',
  display: 'swap',
  preload: true,
});

/* Mukta — UI/Body, Devanagari */
const mukta = Mukta({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--next-font-mukta',
  display: 'swap',
  preload: false, // lazy — only loaded when Hindi active
});

/* Noto Sans Devanagari — UI fallback, Devanagari */
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--next-font-noto-sans-dev',
  display: 'swap',
  preload: false,
});

/* Noto Serif Devanagari — Display fallback, Devanagari */
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600'],
  variable: '--next-font-noto-serif-dev',
  display: 'swap',
  preload: false,
});

/* ─── METADATA ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://sunadbroadcast.vercel.app'),
  title: {
    template: '%s | Sunad OTT',
    default: 'Sunad OTT — Real Stories. Real Bharat. Real Impact.',
  },
  description:
    'Sunad OTT is a premium bilingual streaming platform celebrating Indian civilizational storytelling — documentaries, spiritual knowledge, history, culture, tourism, and more. Watch. Learn. Experience. Connect.',
  keywords: [
    'Indian streaming', 'Sunad OTT', 'Indian documentaries', 'spiritual knowledge',
    'Indian history', 'culture heritage', 'yoga ayurveda', 'Hindi streaming',
    'bilingual OTT', 'Indian civilization', 'भारतीय स्ट्रीमिंग', 'सुनाद OTT',
  ],
  authors: [{ name: 'Sunad OTT' }],
  creator: 'Sunad OTT',
  publisher: 'Sunad OTT',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: 'hi_IN',
    siteName: 'Sunad OTT',
    title: 'Sunad OTT — Real Stories. Real Bharat. Real Impact.',
    description:
      'Premium bilingual streaming platform celebrating Indian civilizational storytelling.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunad OTT — Rooted in Bharat. Reaching the World.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunad OTT',
    description: 'Real Stories. Real Bharat. Real Impact.',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E0D0C',
};

/* ─── ROOT LAYOUT ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        fraunces.variable,
        mukta.variable,
        notoSansDevanagari.variable,
        notoSerifDevanagari.variable,
      ].join(' ')}
    >
      <head>
        {/*
          Tiro Devanagari Hindi — loaded via <link> as it's not available
          through next/font/google's standard subset list.
          Loaded with display=swap and media=print trick for non-blocking.
        */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/*
          General Sans — available via Fontshare CDN (open license)
          Falls back to Inter from Google Fonts if CDN unavailable.
        */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>
          <LenisProvider>
            {/* Scroll reveal observer — no DOM output */}
            <ScrollReveal />

            {/* Landing onboarding modal gate */}
            <LandingModal />

            {/* Fixed floating dock nav */}
            <TopNav />

            {/* Main content — padded below fixed nav */}
            <main className="main-content" id="main-content">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </LenisProvider>
        </LangProvider>
      </body>
    </html>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found — Sunad TV',
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: 'var(--primitive-black, #0E0D0C)',
      color: 'var(--color-ivory, #F5F5F0)'
    }}>
      <h1 style={{
        fontSize: 'clamp(6rem, 15vw, 12rem)',
        lineHeight: 1,
        fontFamily: 'var(--next-font-fraunces), serif',
        color: 'var(--color-gold, #D4AF37)',
        margin: 0
      }}>404</h1>
      <h2 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontFamily: 'var(--next-font-mukta), sans-serif',
        marginBottom: '1rem',
        marginTop: '1rem'
      }}>
        Page Not Found <span style={{ opacity: 0.5 }}>|</span> पृष्ठ नहीं मिला
      </h2>
      <p style={{
        fontSize: '1.125rem',
        opacity: 0.8,
        maxWidth: '400px',
        marginBottom: '3rem'
      }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
        <Link href="/browse/documentaries" className="btn-glass">
          Browse Content
        </Link>
      </div>
    </div>
  );
}

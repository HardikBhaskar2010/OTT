'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
      <h2 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontFamily: 'var(--next-font-mukta), sans-serif',
        color: 'var(--color-gold, #D4AF37)',
        marginBottom: '1rem'
      }}>
        Something went wrong <span style={{ opacity: 0.5 }}>|</span> कुछ गलत हुआ
      </h2>
      <p style={{
        fontSize: '1.125rem',
        opacity: 0.8,
        maxWidth: '400px',
        marginBottom: '3rem'
      }}>
        We apologize for the inconvenience. Our team has been notified.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          className="btn-primary"
          onClick={() => reset()}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          Try Again
        </button>
        <Link href="/" className="btn-glass" style={{ textDecoration: 'none' }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

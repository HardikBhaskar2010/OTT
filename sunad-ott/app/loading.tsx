/**
 * Loading skeleton for the Sunad OTT platform.
 * Cinematic dark skeleton with shimmer animation.
 * Gold pulsing wordmark centered.
 * Used by Next.js App Router as the Suspense loading UI.
 */
export default function Loading() {
  return (
    <div
      aria-label="Loading CultureFlix…"
      aria-busy="true"
      role="status"
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        paddingTop: '80px', /* clear fixed nav */
        overflow: 'hidden',
      }}
    >
      {/* Centered wordmark */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-3)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <img
            src="/sunad_logo.jpg"
            alt=""
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid var(--color-gold)',
              animation: 'wordmark-pulse 2s ease-in-out infinite',
            }}
            aria-hidden="true"
          />
          <span
            lang="hi"
            style={{
              fontFamily: 'var(--font-display-hi), var(--font-display-en)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-gold)',
              letterSpacing: '0.02em',
              lineHeight: 1,
              animation: 'wordmark-pulse 2s ease-in-out infinite',
            }}
          >
            कल्चरफ्लिक्स
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-ui-en)',
            fontSize: 'var(--type-caption)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            animation: 'wordmark-pulse 2s ease-in-out infinite 0.3s',
          }}
        >
          Loading…
        </p>
      </div>

      {/* Background shimmer skeleton */}
      <div style={{ opacity: 0.3 }}>
        {/* Hero skeleton */}
        <div
          className="skeleton"
          style={{
            width: '100%',
            height: 'clamp(300px, 55vh, 600px)',
            borderRadius: 0,
            marginBottom: 'var(--space-8)',
          }}
        />

        {/* Section skeleton */}
        <div style={{ padding: '0 var(--space-6)', maxWidth: 'var(--grid-max-width)', margin: '0 auto' }}>
          {/* Rail header */}
          <div
            className="skeleton"
            style={{ width: '200px', height: '24px', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-3)' }}
          />
          {/* Rail cards */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', overflow: 'hidden', marginBottom: 'var(--space-8)' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{
                  flexShrink: 0,
                  width: 'clamp(180px, 22vw, 280px)',
                  aspectRatio: '16/9',
                  borderRadius: 'var(--radius-md)',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Second rail */}
          <div
            className="skeleton"
            style={{ width: '180px', height: '24px', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-3)' }}
          />
          <div style={{ display: 'flex', gap: 'var(--space-2)', overflow: 'hidden' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{
                  flexShrink: 0,
                  width: 'clamp(180px, 22vw, 280px)',
                  aspectRatio: '16/9',
                  borderRadius: 'var(--radius-md)',
                  animationDelay: `${i * 0.1 + 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wordmark-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--color-surface)   0%,
            color-mix(in oklch, var(--primitive-stone) 30%, var(--color-surface)) 50%,
            var(--color-surface)   100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton {
            animation: none;
            background: var(--color-surface);
          }
          @keyframes wordmark-pulse {
            0%, 100% { opacity: 1; }
          }
        }
      `}</style>
    </div>
  );
}

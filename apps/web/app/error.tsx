'use client';

import { useEffect } from 'react';
import ZingLottie from '../components/scrollytelling/ZingLottie';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('ZING Error:', error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <ZingLottie src="/animations/states/error.json" width={100} height={100} fallback="⚠️" ariaLabel="Error animation" />
      <h1
        style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #f87171, #ef4444, #dc2626)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.75rem',
        }}
      >
        Something Went Wrong
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}
      >
        The ZING universe hit a turbulence. Don&apos;t worry — let&apos;s get you back on track.
      </p>
      <button
        onClick={reset}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(248, 113, 113, 0.2)',
          border: '1px solid rgba(248, 113, 113, 0.3)',
          borderRadius: '2rem',
          padding: '0.75rem 1.75rem',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#fff',
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.2s',
        }}
      >
        ⚡ Try Again
      </button>
    </main>
  );
}

'use client';

import ZingLottie from '../components/scrollytelling/ZingLottie';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#0a0a0a',
          color: '#fff',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <ZingLottie src="/animations/states/error.json" width={80} height={80} fallback="⚡" ariaLabel="Error animation" />
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡ ZING</h1>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.5rem' }}>
          Something went wrong
        </h2>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>
          We hit an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            background: '#3B82F6',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}

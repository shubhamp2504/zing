import Link from 'next/link';
import ZingLottie from '../components/scrollytelling/ZingLottie';

export default function NotFound() {
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
      <ZingLottie src="/animations/states/empty-search.json" width={100} height={100} fallback="🌌" ariaLabel="Lost in universe animation" />
      <h1
        style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #a78bfa, #818cf8, #6366f1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.75rem',
        }}
      >
        Lost in the Universe
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
        This page doesn&apos;t exist — yet. The ZING universe is ever-expanding.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(167, 139, 250, 0.2)',
          border: '1px solid rgba(167, 139, 250, 0.3)',
          borderRadius: '2rem',
          padding: '0.75rem 1.75rem',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#fff',
          textDecoration: 'none',
          transition: 'background 0.2s, transform 0.2s',
        }}
      >
        ⚡ Back to ZING
      </Link>
    </main>
  );
}

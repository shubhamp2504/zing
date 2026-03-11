/**
 * ⚡ ContentModeSelector — Prominent mode switcher for Read, Snap, and Cinematic
 * 
 * NOTE: Story & Swipe modes removed - they showed same content as Read but less impactful
 * Future: Cinematic mode will be truly visual with character animations, graphics, movie-like storytelling
 */

import Link from 'next/link';

const MODES = [
  { id: 'read', icon: '📖', label: 'Read', desc: 'Full article' },
  { id: 'snap', icon: '⚡', label: 'Snap', desc: 'Quick summary' },
  { id: 'cinematic', icon: '🎬', label: 'Cinematic', desc: 'Movie-like' },
] as const;

interface ContentModeSelectorProps {
  currentMode: string;
  topicSlug: string;
  universe: string;
  subWorld: string;
}

export default function ContentModeSelector({
  currentMode,
  topicSlug,
  universe,
  subWorld,
}: ContentModeSelectorProps) {
  return (
    <nav
      aria-label="Content mode"
      className="content-width scroll-reveal"
      style={{
        display: 'flex',
        gap: '0.625rem',
        padding: '1rem',
        margin: '0 auto 2rem',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {MODES.map((mode) => {
        const isActive = currentMode === mode.id;
        const href =
          mode.id === 'read'
            ? `/${universe}/${subWorld}/${topicSlug}`
            : `/${universe}/${subWorld}/${topicSlug}?mode=${mode.id}`;

        return (
          <Link
            key={mode.id}
            href={href}
            className={isActive ? 'glass-card-glow' : 'glass-card'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '0.75rem',
              fontSize: '0.8125rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? 'var(--universe-primary)' : 'rgba(255,255,255,0.7)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              transition: 'all var(--transition-normal)',
              minWidth: '5rem',
              textAlign: 'center',
              border: isActive
                ? '1.5px solid var(--universe-primary)'
                : '1px solid rgba(255,255,255,0.08)',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <span style={{ fontSize: '1.375rem', lineHeight: 1 }}>{mode.icon}</span>
            <span style={{ lineHeight: 1.2 }}>{mode.label}</span>
            <span
              style={{
                fontSize: '0.625rem',
                opacity: isActive ? 0.9 : 0.5,
                fontWeight: 400,
              }}
            >
              {mode.desc}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

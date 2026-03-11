/**
 * ⚡ ZING — Global Navigation Header
 * Persistent glassmorphic header with logo, search shortcut, and ZING Guide hint
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Search } from 'lucide-react';

const UNIVERSE_NAV = [
  { slug: 'scholar', icon: '📚', label: 'Scholar' },
  { slug: 'code-cosmos', icon: '💻', label: 'Code' },
  { slug: 'battle-ground', icon: '⚔️', label: 'Battle' },
  { slug: 'career', icon: '💼', label: 'Career' },
  { slug: 'civilization', icon: '🏺', label: 'Civilization' },
  { slug: 'knowledge', icon: '🔭', label: 'Knowledge' },
  { slug: 'curiosity', icon: '🤔', label: 'Curiosity' },
] as const;

export default function GlobalHeader() {
  const pathname = usePathname();
  const activeUniverse = pathname.split('/')[1] || '';
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        background: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Left: Logo */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.25rem',
          letterSpacing: '-0.04em',
          color: 'var(--color-electric-yellow)',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        <Zap size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> ZING
      </Link>

      {/* Center: Universe quick nav (hidden on small screens) */}
      <nav
        aria-label="Universe navigation"
        style={{
          display: 'flex',
          gap: '0.125rem',
          overflow: 'hidden',
        }}
        className="universe-nav-strip"
      >
        {UNIVERSE_NAV.map((u) => {
          const isActive = activeUniverse === u.slug;
          return (
            <Link
              key={u.slug}
              href={`/${u.slug}`}
              title={u.label}
              style={{
                padding: '0.375rem 0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                color: isActive ? 'var(--universe-primary)' : 'rgba(255,255,255,0.4)',
                fontWeight: isActive ? 600 : 400,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'color var(--transition-fast)',
              }}
            >
              <span style={{ marginRight: '0.25rem' }}>{u.icon}</span>
              <span className="universe-nav-label">{u.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Lens button (mobile CTA) */}
      <Link
        href="/lens"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.375rem 0.625rem',
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.4)',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.04)',
          textDecoration: 'none',
          flexShrink: 0,
          transition: 'all var(--transition-fast)',
        }}
        aria-label="Open ZING Lens camera scanner"
      >
        <span>📷</span>
        <span className="search-hint-text">Lens</span>
      </Link>

      {/* Right: Search shortcut */}
      <button
        onClick={() => {
          // Trigger the SearchPalette via Cmd+K keyboard event
          const event = new KeyboardEvent('keydown', {
            key: 'k',
            code: 'KeyK',
            metaKey: true,
            ctrlKey: true,
            bubbles: true,
          });
          document.dispatchEvent(event);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.75rem',
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.4)',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.04)',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all var(--transition-fast)',
        }}
        aria-label={`Open search (${isMac ? '⌘K' : 'Ctrl+K'})`}
      >
        <span>🔍</span>
        <span className="search-hint-text">Search</span>
        <kbd
          style={{
            fontSize: '0.625rem',
            padding: '0.125rem 0.375rem',
            borderRadius: '0.25rem',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {isMac ? '⌘K' : 'Ctrl+K'}
        </kbd>
      </button>
    </header>
  );
}

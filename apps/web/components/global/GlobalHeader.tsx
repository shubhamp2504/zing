/**
 * ⚡ ZING — Global Navigation Header (Simplified)
 * Clean header with logo and always-visible search bar
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GlobalHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or trigger search
      // For now, trigger the SearchPalette modal with pre-filled query
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        code: 'KeyK',
        metaKey: true,
        ctrlKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);
    }
  };

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
        gap: '1rem',
        padding: '0 1.25rem',
        background: 'rgba(10, 10, 10, 0.9)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontWeight: 800,
          fontSize: '1.25rem',
          letterSpacing: '-0.04em',
          color: '#FFD700',
          textDecoration: 'none',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        <Zap size={18} /> ZING
      </Link>

      {/* Search Bar */}
      <form 
        onSubmit={handleSearch}
        style={{
          flex: 1,
          maxWidth: '32rem',
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics, concepts, questions..."
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            outline: 'none',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        />
      </form>

      {/* Browse Universes Link */}
      <Link
        href="/scholar"
        style={{
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = 'rgba(255, 215, 0, 0.9)';
          e.currentTarget.style.background = 'rgba(255, 215, 0, 0.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
          e.currentTarget.style.background = 'transparent';
        }}
      >
        Browse
      </Link>
    </header>
  );
}

'use client';

import { useState, useCallback } from 'react';

interface ShareButtonProps {
  shareText: string;
  slug?: string;
}

export default function ShareButton({ shareText, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const trackShare = useCallback(() => {
    if (!slug) return;
    fetch('/api/topics/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      trackShare();
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const tweetText = `${shareText}\n${typeof window !== 'undefined' ? window.location.href : ''}`;

  return (
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
        onClick={trackShare}
        style={{
          padding: '0.3rem 0.65rem',
          borderRadius: '0.5rem',
          fontSize: '0.7rem',
          background: 'rgba(37, 211, 102, 0.15)',
          color: '#25D366',
          border: '1px solid rgba(37, 211, 102, 0.3)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        💬 WhatsApp
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X"
        onClick={trackShare}
        style={{
          padding: '0.3rem 0.65rem',
          borderRadius: '0.5rem',
          fontSize: '0.7rem',
          background: 'rgba(255,255,255,0.05)',
          color: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        𝕏 Post
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        title="Copy link"
        style={{
          padding: '0.3rem 0.65rem',
          borderRadius: '0.5rem',
          fontSize: '0.7rem',
          background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.1)',
          color: copied ? '#22c55e' : '#3B82F6',
          border: copied
            ? '1px solid rgba(34,197,94,0.3)'
            : '1px solid rgba(59,130,246,0.25)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          transition: 'all 0.2s',
        }}
      >
        {copied ? '✓ Copied' : '🔗 Copy'}
      </button>
    </div>
  );
}

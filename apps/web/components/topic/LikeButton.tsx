'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  slug: string;
  initialCount: number;
}

const STORAGE_PREFIX = 'zing-liked-';

export default function LikeButton({ slug, initialCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(STORAGE_PREFIX + slug) === '1');
  }, [slug]);

  const toggle = async () => {
    const nowLiked = !liked;
    // Optimistic UI
    setLiked(nowLiked);
    setCount((c) => c + (nowLiked ? 1 : -1));

    if (nowLiked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }

    try {
      localStorage.setItem(STORAGE_PREFIX + slug, nowLiked ? '1' : '0');
    } catch {}

    try {
      await fetch('/api/topics/like', {
        method: nowLiked ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
    } catch {
      // Revert on failure
      setLiked(!nowLiked);
      setCount((c) => c + (nowLiked ? -1 : 1));
      try {
        localStorage.setItem(STORAGE_PREFIX + slug, !nowLiked ? '1' : '0');
      } catch {}
    }
  };

  return (
    <>
      <button
        onClick={toggle}
        aria-label={liked ? 'Unlike this topic' : 'Like this topic'}
        aria-pressed={liked}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.4rem 0.85rem',
          borderRadius: '2rem',
          border: liked
            ? '1px solid rgba(239, 68, 68, 0.4)'
            : '1px solid rgba(255,255,255,0.12)',
          background: liked
            ? 'rgba(239, 68, 68, 0.12)'
            : 'rgba(255,255,255,0.04)',
          color: liked ? '#EF4444' : 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          fontSize: '0.8rem',
          fontWeight: 600,
          transition: 'all 0.25s ease',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: '1rem',
            transition: 'transform 0.3s ease',
            transform: animating ? 'scale(1.4)' : 'scale(1)',
          }}
        >
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
        </span>
        <span>{count > 0 ? count : 'Like'}</span>
      </button>

      <style>{`
        @keyframes likeParticle {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-1.5rem) scale(0.5); }
        }
      `}</style>
    </>
  );
}

/**
 * ⚡ SwipeMode — Tinder-style flashcards for quick learning
 *
 * Swipe right = "Got it!", Swipe left = "Review later"
 * Stack-based card interface with gesture handling.
 *
 * Client Component
 */
'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface FlashCard {
  id: string;
  front: string;
  back: string;
  category?: string;
}

interface SwipeModeProps {
  cards: FlashCard[];
  topicTitle: string;
  universe: string;
  exitHref: string;
}

export default function SwipeMode({
  cards,
  topicTitle,
  universe,
  exitHref,
}: SwipeModeProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [gotIt, setGotIt] = useState<string[]>([]);
  const [reviewLater, setReviewLater] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const card = cards[currentIndex];
  const isComplete = currentIndex >= cards.length;

  const advance = useCallback(
    (direction: 'left' | 'right') => {
      if (!card) return;
      setSwipeDirection(direction);
      if (direction === 'right') {
        setGotIt((p) => [...p, card.id]);
      } else {
        setReviewLater((p) => [...p, card.id]);
      }
      setTimeout(() => {
        setSwipeDirection(null);
        setFlipped(false);
        setCurrentIndex((p) => p + 1);
      }, 300);
    },
    [card]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
      if (Math.abs(delta) > 80) {
        advance(delta > 0 ? 'right' : 'left');
      }
    },
    [advance]
  );

  if (isComplete) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'var(--color-deep-black)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Session Complete!
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
          ✅ Got it: {gotIt.length} &nbsp;|&nbsp; 🔄 Review: {reviewLater.length}
        </p>
        <button
          onClick={() => router.push(exitHref)}
          className="glass-card"
          style={{
            padding: '0.75rem 2rem',
            color: 'var(--universe-primary)',
            fontWeight: 600,
          }}
        >
          Back to Topic
        </button>
      </div>
    );
  }

  if (!card) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--color-deep-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={() => router.push(exitHref)}
          style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}
        >
          ✕ Exit
        </button>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => setFlipped(!flipped)}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '20rem',
          minHeight: '16rem',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'pointer',
          transform: swipeDirection === 'right'
            ? 'translateX(120%) rotate(15deg)'
            : swipeDirection === 'left'
            ? 'translateX(-120%) rotate(-15deg)'
            : 'none',
          transition: swipeDirection ? 'transform 0.3s ease' : 'none',
          animation: !swipeDirection ? 'cardAppear 0.3s ease' : undefined,
        }}
      >
        {card.category && (
          <span
            style={{
              fontSize: '0.6875rem',
              color: 'var(--universe-primary)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            {card.category}
          </span>
        )}

        <p
          style={{
            fontSize: flipped ? '1rem' : '1.25rem',
            fontWeight: flipped ? 400 : 600,
            lineHeight: 1.6,
            color: flipped ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.9)',
          }}
        >
          {flipped ? card.back : card.front}
        </p>

        <span
          style={{
            marginTop: '1.5rem',
            fontSize: '0.6875rem',
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          {flipped ? 'Tap to see question' : 'Tap to reveal answer'}
        </span>
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        <button
          onClick={() => advance('left')}
          className="glass-card"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            color: '#EF4444',
          }}
          aria-label="Review later"
        >
          🔄 Review
        </button>
        <button
          onClick={() => advance('right')}
          className="glass-card"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            color: '#10B981',
          }}
          aria-label="Got it"
        >
          ✅ Got it
        </button>
      </div>

      <style>{`
        @keyframes cardAppear {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}

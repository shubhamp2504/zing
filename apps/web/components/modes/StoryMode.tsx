/**
 * ⚡ StoryMode — Instagram-like vertical stories for knowledge
 *
 * Auto-advancing panels with progress indicators.
 * Touch: tap sides to advance/go back.
 * Character narrator visible at bottom-left.
 *
 * Client Component
 */
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface StorySlide {
  id: string;
  title: string;
  body: string;
  emoji?: string;
}

interface StoryModeProps {
  slides: StorySlide[];
  topicTitle: string;
  universe: string;
  exitHref: string;
  characterName?: string;
}

const AUTO_ADVANCE_MS = 8000;

export default function StoryMode({
  slides,
  topicTitle,
  universe,
  exitHref,
  characterName,
}: StoryModeProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;
  const slide = slides[current];

  const goNext = useCallback(() => {
    if (current < total - 1) {
      setCurrent((p) => p + 1);
      setProgress(0);
    } else {
      router.push(exitHref);
    }
  }, [current, total, router, exitHref]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setCurrent((p) => p - 1);
      setProgress(0);
    }
  }, [current]);

  /* Auto-advance */
  useEffect(() => {
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          goNext();
          return 0;
        }
        return p + (100 / (AUTO_ADVANCE_MS / 50));
      });
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, goNext]);

  if (!slide) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--color-deep-black)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Progress indicators */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          padding: '0.75rem 1rem 0',
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '2px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'var(--universe-primary)',
                width:
                  i < current ? '100%' :
                  i === current ? `${progress}%` :
                  '0%',
                transition: i === current ? 'none' : 'width 0.3s ease',
              }}
            />
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={() => router.push(exitHref)}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '1rem',
          padding: '0.5rem',
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.5)',
          zIndex: 10,
        }}
        aria-label="Close story"
      >
        ✕
      </button>

      {/* Tap zones */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Left tap zone - go back */}
        <button
          onClick={goPrev}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '30%',
            height: '100%',
            zIndex: 5,
            background: 'transparent',
          }}
          aria-label="Previous slide"
        />

        {/* Right tap zone - go next */}
        <button
          onClick={goNext}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '70%',
            height: '100%',
            zIndex: 5,
            background: 'transparent',
          }}
          aria-label="Next slide"
        />

        {/* Content */}
        <div
          key={current}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 2rem',
            textAlign: 'center',
            animation: 'storySlideIn 0.3s ease',
          }}
        >
          {slide.emoji && (
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
              {slide.emoji}
            </div>
          )}

          <h2
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 800,
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}
          >
            {slide.title}
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              maxWidth: '24rem',
            }}
          >
            {slide.body}
          </p>
        </div>
      </div>

      {/* Character narrator */}
      {characterName && (
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          <span>🧑‍🏫</span>
          <span>{characterName}</span>
        </div>
      )}

      <style>{`
        @keyframes storySlideIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

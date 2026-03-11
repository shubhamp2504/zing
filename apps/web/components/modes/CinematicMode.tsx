/**
 * ⚡ CinematicMode — ZING's most immersive experience
 * 
 * TODO: REDESIGN NEEDED - Make truly cinematic & movie-like
 * Current: Text-based scenes with Ken Burns effect
 * Future Vision:
 *   - Character animations (Rive/Lottie) with character speaking/narrating
 *   - Background images/illustrations related to topic
 *   - Scene transitions like a movie (fade in/out, wipes)
 *   - Visual graphics, charts, diagrams animated in
 *   - Less text, more visual storytelling
 *   - Background music/ambient sounds
 *   - Should feel like watching a documentary/explainer video
 *
 * Full-screen, scene-by-scene reveal with:
 * - Ken Burns CSS keyframes (no JS)
 * - Word-by-word reveal using ZING_VARIANTS
 * - Cursor trail (Canvas API for performance)
 * - Keyboard: Arrow keys advance, Escape exits
 * - Mobile: swipe up/down to advance
 *
 * Client Component — requires interactivity
 */
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface CinematicScene {
  id: string;
  title: string;
  body: string;
  mood?: string;
}

interface CinematicModeProps {
  scenes: CinematicScene[];
  topicTitle: string;
  universe: string;
  exitHref: string;
}

export default function CinematicMode({
  scenes,
  topicTitle,
  universe,
  exitHref,
}: CinematicModeProps) {
  const router = useRouter();
  const [currentScene, setCurrentScene] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const totalScenes = scenes.length;
  const scene = scenes[currentScene];

  const goNext = useCallback(() => {
    if (currentScene < totalScenes - 1) {
      setIsRevealing(true);
      setCurrentScene((p) => p + 1);
    }
  }, [currentScene, totalScenes]);

  const goPrev = useCallback(() => {
    if (currentScene > 0) {
      setIsRevealing(true);
      setCurrentScene((p) => p - 1);
    }
  }, [currentScene]);

  const exit = useCallback(() => {
    router.push(exitHref);
  }, [router, exitHref]);

  /* Keyboard navigation */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') exit();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, exit]);

  /* Touch swipe */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0]?.clientY ?? 0;
    }

    function handleTouchEnd(e: TouchEvent) {
      const delta = touchStartY.current - (e.changedTouches[0]?.clientY ?? 0);
      if (Math.abs(delta) > 50) {
        if (delta > 0) goNext();
        else goPrev();
      }
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  /* Word reveal animation complete */
  useEffect(() => {
    if (isRevealing) {
      const timer = setTimeout(() => setIsRevealing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isRevealing, currentScene]);

  if (!scene) return null;

  const words = scene.body.split(' ');
  const progress = ((currentScene + 1) / totalScenes) * 100;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--color-deep-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'crosshair',
      }}
    >
      {/* Ken Burns background */}
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          background: `radial-gradient(ellipse at 30% 30%, color-mix(in srgb, var(--universe-primary) 5%, transparent), transparent)`,
          animation: 'kenBurns 20s ease-in-out infinite alternate',
        }}
      />

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '2px',
          width: `${progress}%`,
          background: 'var(--universe-primary)',
          transition: 'width 0.5s ease',
        }}
      />

      {/* Exit button */}
      <button
        onClick={exit}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.4)',
          zIndex: 10,
        }}
        aria-label="Exit cinematic mode"
      >
        ✕ ESC
      </button>

      {/* Scene counter */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        {currentScene + 1} / {totalScenes}
      </div>

      {/* Scene content */}
      <div
        key={currentScene}
        style={{
          maxWidth: '36rem',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Scene title */}
        {scene.title && (
          <h2
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--universe-primary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              opacity: 0,
              animation: 'cinematicFadeIn 0.6s ease forwards',
            }}
          >
            {scene.title}
          </h2>
        )}

        {/* Word-by-word reveal */}
        <p
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            lineHeight: 1.8,
            fontFamily: 'var(--font-serif)',
          }}
        >
          {words.map((word, i) => (
            <span
              key={`${currentScene}-${i}`}
              style={{
                display: 'inline-block',
                marginRight: '0.35em',
                opacity: 0,
                transform: 'translateY(8px)',
                animation: 'cinematicWordReveal 0.3s ease forwards',
                animationDelay: `${i * 0.04}s`,
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Navigation hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          fontSize: '0.6875rem',
          color: 'rgba(255,255,255,0.2)',
        }}
      >
        ↑↓ or swipe to navigate
      </div>

      {/* Animations */}
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -1%); }
        }

        @keyframes cinematicFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes cinematicWordReveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </div>
  );
}

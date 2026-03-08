/**
 * ⚡ ZingLottie — Lazy-loaded Lottie animation with viewport-based playback
 *
 * Uses lottie-web for proper Lottie JSON rendering. Plays only when visible
 * (IntersectionObserver). Pauses when tab is hidden (visibilitychange).
 * Shows static fallback for prefers-reduced-motion.
 *
 * SPEC: Chapter 25 → Lottie Integration Guide
 * SIZE BUDGET: Individual file < 30KB, all combined < 200KB gzipped
 */
'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { AnimationItem } from 'lottie-web';

interface ZingLottieProps {
  /** Path to the Lottie JSON file relative to /public (e.g. "/animations/loaders/scholar.json") */
  src: string;
  /** Fallback emoji/text shown when animation can't load or reduced motion */
  fallback?: string;
  /** Whether to loop the animation (default: true) */
  loop?: boolean;
  /** Whether to autoplay when visible (default: true) */
  autoplay?: boolean;
  /** Width of the animation container */
  width?: number | string;
  /** Height of the animation container */
  height?: number | string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Additional CSS class */
  className?: string;
  /** aria-label for accessibility */
  ariaLabel?: string;
}

export default function ZingLottie({
  src,
  fallback = '⚡',
  loop = true,
  autoplay = true,
  width = 120,
  height = 120,
  style,
  className = '',
  ariaLabel,
}: ZingLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Detect reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // IntersectionObserver for viewport-based playback
  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!!entry?.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Pause/resume on tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      if (!animRef.current) return;
      if (document.hidden) {
        animRef.current.pause();
      } else if (isVisible) {
        animRef.current.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isVisible]);

  // Load lottie-web dynamically and create animation
  useEffect(() => {
    if (reducedMotion || hasError) return;
    const el = containerRef.current;
    if (!el) return;

    let anim: AnimationItem | null = null;

    import('lottie-web').then((lottie) => {
      // Clean up any existing animation in the container
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }

      anim = lottie.default.loadAnimation({
        container: el,
        renderer: 'svg',
        loop,
        autoplay: false, // We control playback via IntersectionObserver
        path: src,
      });

      anim.addEventListener('DOMLoaded', () => {
        animRef.current = anim;
        if (isVisible && autoplay) anim?.play();
      });

      anim.addEventListener('data_failed', () => setHasError(true));
    }).catch(() => setHasError(true));

    return () => {
      if (anim) {
        anim.destroy();
      }
      animRef.current = null;
    };
  }, [src, reducedMotion, hasError, loop, autoplay, isVisible]);

  // Play/pause based on visibility
  useEffect(() => {
    if (!animRef.current) return;
    if (isVisible && autoplay) {
      animRef.current.play();
    } else {
      animRef.current.pause();
    }
  }, [isVisible, autoplay]);

  // Show fallback if reduced motion or error
  if (reducedMotion || hasError) {
    return (
      <div
        ref={containerRef}
        className={className}
        role="img"
        aria-label={ariaLabel ?? 'Animation'}
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          ...style,
        }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label={ariaLabel ?? 'Animation'}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
}

/**
 * ⚡ ScrollReveal — CSS scroll-driven reveal with IntersectionObserver fallback
 *
 * Wraps children in a container that fades + slides up as it enters viewport.
 * Uses CSS `animation-timeline: view()` on Chrome 115+ / Firefox 110+.
 * Falls back to IntersectionObserver for Safari and older browsers.
 *
 * SPEC: Chapter 25 → Moment 1 — Paragraph Fade-In
 */
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  /** Delay before animation starts (ms) for stagger effect */
  delay?: number;
  /** Direction to reveal from */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Additional CSS class */
  className?: string;
}

const DIRECTION_TRANSFORMS: Record<string, string> = {
  up: 'translateY(24px)',
  down: 'translateY(-24px)',
  left: 'translateX(24px)',
  right: 'translateX(-24px)',
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.15,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(false);

  useEffect(() => {
    // Feature-detect CSS scroll-driven animations
    setSupportsScrollTimeline(CSS.supports('animation-timeline', 'view()'));
  }, []);

  // IntersectionObserver fallback for browsers without scroll-timeline
  useEffect(() => {
    if (supportsScrollTimeline) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [supportsScrollTimeline, threshold]);

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // CSS scroll-driven path
  if (supportsScrollTimeline) {
    return (
      <div
        ref={ref}
        className={`scroll-reveal-native ${className}`}
        style={{
          animationDelay: `${delay}ms`,
          animationTimeline: 'view()',
          animationRange: 'entry 0% entry 40%',
        }}
      >
        {children}
      </div>
    );
  }

  // IntersectionObserver fallback path
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : DIRECTION_TRANSFORMS[direction],
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

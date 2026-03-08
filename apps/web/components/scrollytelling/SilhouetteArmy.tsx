/**
 * ⚡ SilhouetteArmy — SVG silhouettes with progressive lighting
 *
 * 100 tiny human silhouettes appear staggered as section scrolls into view.
 * Each figure delays by index × 10ms for a wave effect.
 * Used for heavy topics like Kalinga/Ashoka to convey scale of life.
 *
 * SPEC: Chapter 25 → Moment 4 — Silhouette Army
 */
'use client';

import { useEffect, useRef, useState } from 'react';

interface SilhouetteArmyProps {
  /** Number of silhouettes to render (default: 100) */
  count?: number;
  /** Color of the silhouettes */
  color?: string;
  /** Heading text shown above the silhouettes */
  caption?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Simple human silhouette SVG path (standing figure)
 */
const SILHOUETTE_PATH =
  'M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1 8H7l2 14h2V14h2v10h2l2-14h-6z';

export default function SilhouetteArmy({
  count = 100,
  color = 'var(--color-text-secondary, #a0a0a0)',
  caption,
  className = '',
}: SilhouetteArmyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className={className}
      style={{
        padding: '2rem 1rem',
        textAlign: 'center',
      }}
    >
      {caption && (
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted, #666)',
            marginBottom: '1rem',
            fontStyle: 'italic',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          {caption}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2px',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {Array.from({ length: count }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            width={14}
            height={14}
            aria-hidden="true"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.3)',
              transition: `opacity 0.4s ease ${i * 10}ms, transform 0.4s ease ${i * 10}ms`,
              willChange: i < 20 ? 'opacity, transform' : undefined,
            }}
          >
            <path d={SILHOUETTE_PATH} fill={color} />
          </svg>
        ))}
      </div>
    </section>
  );
}

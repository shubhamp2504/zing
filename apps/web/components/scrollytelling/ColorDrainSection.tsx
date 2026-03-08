/**
 * ⚡ ColorDrainSection — CSS filter saturate() U-curve
 *
 * Section transitions: colorful → desaturated (monochrome) → colorful
 * based on scroll position within the viewport.
 * Used for emotionally heavy content (Partition 1947, Kalinga, etc.)
 *
 * SPEC: Chapter 25 → Moment 5 — Color Drain/Restore
 * Optional: Elements with class "preserve-color" remain vivid (e.g., tricolor elements).
 */
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ColorDrainSectionProps {
  children: ReactNode;
  /** Minimum saturation at peak drain (0 = full grayscale, default: 0.05) */
  minSaturation?: number;
  /** Additional CSS class */
  className?: string;
}

export default function ColorDrainSection({
  children,
  minSaturation = 0.05,
  className = '',
}: ColorDrainSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [saturation, setSaturation] = useState(1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect reduced motion — skip drain effect entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;

        // Calculate how far through the section we've scrolled (0 → 1)
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // progress: 0 when section top enters bottom of viewport,
        //          1 when section bottom leaves top of viewport
        const progress = Math.max(
          0,
          Math.min(1, (viewH - sectionTop) / (viewH + sectionHeight))
        );

        // U-curve: saturate(1) → saturate(min) → saturate(1)
        // Use a sine curve: sat = min + (1-min) * |cos(π * progress)|
        // But we want the minimum at progress=0.5 (middle of scroll)
        const curve = Math.abs(Math.cos(Math.PI * progress));
        const sat = minSaturation + (1 - minSaturation) * curve;

        setSaturation(sat);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [minSaturation]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        filter: `saturate(${saturation})`,
        transition: 'filter 0.1s linear',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}

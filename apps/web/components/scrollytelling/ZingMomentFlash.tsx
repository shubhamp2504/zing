/**
 * ⚡ ZingMomentFlash — THE signature animation of ZING
 *
 * When the climax sentence of a topic scrolls into view:
 * 1. Screen dims (overlay 0 → 0.25 opacity, 0.15s)
 * 2. Sentence scales 1 → 1.15 (spring, 0.3s)
 * 3. 30 canvas particles burst from sentence center
 * 4. Electric yellow text-shadow pulses
 * 5. Everything returns to normal (0.7s total)
 *
 * Trigger: IntersectionObserver, ONCE per topic session.
 * RULE: Maximum ONE per topic page.
 *
 * SPEC: Chapter 25 → Moment 8 — The Zing Moment Flash
 */
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ZingMomentFlashProps {
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Particle for the burst effect */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

const PARTICLE_COLORS = ['#FFD700', '#FFA500', '#FFEC44', '#FFF4B8', '#FFB700'];
const PARTICLE_COUNT = 30;
const TOTAL_DURATION = 700; // ms

export default function ZingMomentFlash({
  children,
  className = '',
}: ZingMomentFlashProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  // Observe and fire once
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || hasTriggered) return;

    // Respect reduced motion — show static highlight instead
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasTriggered(true);
          setIsFlashing(true);
          observer.unobserve(el);
          fireParticles();

          // Reset flash after animation completes
          setTimeout(() => setIsFlashing(false), TOTAL_DURATION);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  /** Canvas particle burst */
  function fireParticles() {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width + 80;
    canvas.height = rect.height + 80;
    canvas.style.left = `${-40}px`;
    canvas.style.top = `${-40}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Create particles
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: 2 + Math.random() * 3,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]!,
      };
    });

    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      if (elapsed > TOTAL_DURATION || !ctx) return;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.life -= 0.015;

        if (p.life <= 0) continue;

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: 'relative',
        display: 'inline',
      }}
    >
      {/* Dim overlay */}
      {isFlashing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.25)',
            zIndex: 90,
            animation: 'zing-flash-overlay 0.7s ease forwards',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 92,
        }}
      />

      {/* The highlighted sentence */}
      <span
        style={{
          position: 'relative',
          zIndex: 91,
          display: 'inline',
          transform: isFlashing ? 'scale(1.15)' : 'scale(1)',
          textShadow: isFlashing
            ? '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.4)'
            : 'none',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), text-shadow 0.3s ease',
        }}
      >
        {children}
      </span>

      <style>{`
        @keyframes zing-flash-overlay {
          0% { opacity: 0; }
          20% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

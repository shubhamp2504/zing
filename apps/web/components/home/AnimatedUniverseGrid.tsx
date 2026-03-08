/**
 * ⚡ AnimatedUniverseGrid — Staggered card animation using framer-motion
 * Uses @repo/ui variants (cardEnter, staggerContainer) for consistent motion design.
 */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, cardEnter } from '@repo/ui/variants';
import { useDeviceCapability } from '@repo/ui/DeviceCapability';

interface UniverseData {
  id: string;
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  colors: { primary: string };
  subWorlds: { slug: string }[];
}

export default function AnimatedUniverseGrid({ universes }: { universes: UniverseData[] }) {
  const { reducedMotion } = useDeviceCapability();

  // If reduced motion, render without animation
  if (reducedMotion) {
    return (
      <div
        className="zing-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {universes.map((universe) => (
          <div key={universe.id}>
            <Link
              href={`/${universe.slug}`}
              className="glass-card glass-card-hover"
              data-universe={universe.slug}
              style={{ padding: '1.5rem', display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{universe.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{universe.name}</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>{universe.tagline}</p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: universe.colors.primary, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {universe.subWorlds.length} sub-worlds →
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="zing-grid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
      }}
    >
      {universes.map((universe) => (
        <motion.div key={universe.id} variants={cardEnter}>
          <Link
            href={`/${universe.slug}`}
            className="glass-card glass-card-hover"
            data-universe={universe.slug}
            style={{
              padding: '1.5rem',
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              {universe.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {universe.name}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
              {universe.tagline}
            </p>
            <div
              style={{
                marginTop: '0.75rem',
                fontSize: '0.75rem',
                color: universe.colors.primary,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              {universe.subWorlds.length} sub-worlds →
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, cardEnter } from '@repo/ui/variants';

interface FeaturedTopic {
  slug: string;
  title: string;
  quickShotSummary: string | null;
  universe: string;
  subWorld: string;
  readTimeMinutes: number;
  viewCount: number;
  difficulty: string;
  tags: string[];
}

const UNIVERSE_SLUG_MAP: Record<string, string> = {
  SCHOLAR: 'scholar',
  CODE_COSMOS: 'code-cosmos',
  BATTLE_GROUND: 'battle-ground',
  CAREER: 'career',
  CIVILIZATION: 'civilization',
  KNOWLEDGE: 'knowledge',
  CURIOSITY: 'curiosity',
};

const UNIVERSE_GRADIENTS: Record<string, string> = {
  SCHOLAR: 'linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(30,58,138,0.4) 100%)',
  CODE_COSMOS: 'linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(6,95,70,0.4) 100%)',
  BATTLE_GROUND: 'linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(153,27,27,0.4) 100%)',
  CAREER: 'linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(146,64,14,0.4) 100%)',
  CIVILIZATION: 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(91,33,182,0.4) 100%)',
  KNOWLEDGE: 'linear-gradient(135deg, rgba(6,182,212,0.25) 0%, rgba(22,78,99,0.4) 100%)',
  CURIOSITY: 'linear-gradient(135deg, rgba(236,72,153,0.25) 0%, rgba(159,18,57,0.4) 100%)',
};

const UNIVERSE_COLORS: Record<string, string> = {
  SCHOLAR: '#3B82F6',
  CODE_COSMOS: '#10B981',
  BATTLE_GROUND: '#EF4444',
  CAREER: '#F59E0B',
  CIVILIZATION: '#8B5CF6',
  KNOWLEDGE: '#06B6D4',
  CURIOSITY: '#EC4899',
};

const UNIVERSE_ICONS: Record<string, string> = {
  SCHOLAR: '📖',
  CODE_COSMOS: '💻',
  BATTLE_GROUND: '⚔️',
  CAREER: '💼',
  CIVILIZATION: '🏛️',
  KNOWLEDGE: '🔬',
  CURIOSITY: '🧩',
};

export default function FeaturedTopics() {
  const [topics, setTopics] = useState<FeaturedTopic[]>([]);

  useEffect(() => {
    fetch('/api/featured')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTopics(data.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  if (topics.length === 0) return null;

  return (
    <section className="zing-section" style={{ padding: '0 1.5rem 3rem', maxWidth: '72rem', marginInline: 'auto', width: '100%' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
        🔥 Trending Topics
      </h2>
      <motion.div className="featured-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
        {topics.map((t) => {
          const universeSlug = UNIVERSE_SLUG_MAP[t.universe] ?? t.universe.toLowerCase();
          const gradient = UNIVERSE_GRADIENTS[t.universe] ?? UNIVERSE_GRADIENTS.SCHOLAR;
          const color = UNIVERSE_COLORS[t.universe] ?? '#3B82F6';
          const icon = UNIVERSE_ICONS[t.universe] ?? '📚';
          return (
            <motion.div key={t.slug} variants={cardEnter}>
            <Link
              href={`/${universeSlug}/${t.subWorld}/${t.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                background: gradient,
                border: `1px solid ${color}22`,
                borderRadius: '1rem',
                padding: '1.5rem 1.25rem 1.25rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 30px ${color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Universe badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '1rem',
                background: `${color}20`,
                border: `1px solid ${color}30`,
                fontSize: '0.65rem',
                fontWeight: 600,
                color,
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}>
                <span>{icon}</span>
                {universeSlug.replace('-', ' ')}
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3 }}>
                {t.title}
              </h3>

              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '0.75rem',
              }}>
                {t.quickShotSummary}
              </p>

              {/* Footer row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.35)',
              }}>
                <span>{t.readTimeMinutes} min</span>
                <span>·</span>
                <span>{t.difficulty}</span>
                {t.viewCount > 0 && (
                  <>
                    <span>·</span>
                    <span>👁 {t.viewCount}</span>
                  </>
                )}
              </div>

              {/* Decorative glow */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-30%',
                width: '60%',
                height: '120%',
                background: `radial-gradient(ellipse at center, ${color}08 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />
            </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

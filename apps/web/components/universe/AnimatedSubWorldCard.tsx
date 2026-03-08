/**
 * ⚡ AnimatedSubWorldCard — framer-motion stagger for sub-world topic lists
 * Used on the Universe landing page.
 */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, cardEnter } from '@repo/ui/variants';

interface Topic {
  slug: string;
  title: string;
  quickShotSummary: string | null;
  difficulty: string | null;
  readTimeMinutes: number | null;
}

interface SubWorldCardProps {
  subWorldSlug: string;
  subWorldName: string;
  subWorldIcon: string;
  subWorldDescription: string;
  universeSlug: string;
  universeColor: string;
  topics: Topic[];
}

export default function AnimatedSubWorldCard({
  subWorldSlug,
  subWorldName,
  subWorldIcon,
  subWorldDescription,
  universeSlug,
  universeColor,
  topics,
}: SubWorldCardProps) {
  return (
    <motion.section
      className="glass-card"
      style={{ padding: '1.5rem' }}
      variants={cardEnter}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{subWorldIcon}</span>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{subWorldName}</h2>
      </div>
      <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1rem' }}>
        {subWorldDescription}
      </p>

      <motion.ul
        style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {topics.map((topic) => (
          <motion.li key={topic.slug} variants={cardEnter}>
            <Link
              href={`/${universeSlug}/${subWorldSlug}/${topic.slug}`}
              className="glass-card-hover"
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{topic.title}</span>
              {topic.quickShotSummary && (
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '0.25rem',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {topic.quickShotSummary}
                </p>
              )}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                {topic.difficulty && (
                  <span style={{ fontSize: '0.75rem', color: universeColor }}>
                    {String(topic.difficulty).toLowerCase()}
                  </span>
                )}
                {topic.readTimeMinutes && (
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                    {topic.readTimeMinutes} min read
                  </span>
                )}
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}

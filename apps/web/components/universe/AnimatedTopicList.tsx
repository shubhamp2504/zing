/**
 * ⚡ AnimatedTopicList — framer-motion stagger for topic cards on SubWorld page
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

interface AnimatedTopicListProps {
  topics: Topic[];
  universe: string;
  subworld: string;
  universeColor: string;
}

export default function AnimatedTopicList({ topics, universe, subworld, universeColor }: AnimatedTopicListProps) {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {topics.map((topic) => (
        <motion.div key={topic.slug} variants={cardEnter}>
          <Link
            href={`/${universe}/${subworld}/${topic.slug}`}
            className="glass-card glass-card-hover"
            style={{
              padding: '1.25rem 1.5rem',
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.375rem' }}>
              {topic.title}
            </h2>
            {topic.quickShotSummary && (
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                {topic.quickShotSummary.slice(0, 150)}{topic.quickShotSummary.length > 150 ? '...' : ''}
              </p>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
              {topic.difficulty && (
                <span style={{ color: universeColor }}>
                  {String(topic.difficulty).toLowerCase()}
                </span>
              )}
              {topic.readTimeMinutes && (
                <span style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {topic.readTimeMinutes} min read
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

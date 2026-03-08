/**
 * ⚡ RelatedTopics — Knowledge graph connections shown as cards
 */

import Link from 'next/link';

interface RelatedTopic {
  id: string;
  slug: string;
  title: string;
  universe: string;
  subWorld: string;
  difficulty: string;
  readTimeMinutes: number;
  relationType: string;
  strength: number;
}

interface RelatedTopicsProps {
  topics: RelatedTopic[];
  currentUniverse: string;
}

export default function RelatedTopics({ topics, currentUniverse }: RelatedTopicsProps) {
  if (topics.length === 0) {
    return (
      <section
        className="content-width scroll-reveal"
        style={{ padding: '0 1rem', marginBottom: '2rem' }}
        aria-label="Related topics"
      >
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔗</p>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Related Topics
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Connections will appear as the knowledge graph grows.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="content-width scroll-reveal"
      style={{ padding: '0 1rem', marginBottom: '2rem' }}
      aria-label="Related topics"
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
        🔗 Related Topics
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {topics.map((topic) => {
          const universeSlug = topic.universe.toLowerCase().replace(/_/g, '-');
          const href = `/${universeSlug}/${topic.subWorld}/${topic.slug}`;
          const isSameUniverse = universeSlug === currentUniverse;

          return (
            <Link
              key={topic.id}
              href={href}
              className="glass-card glass-card-hover"
              style={{
                padding: '1rem',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                {topic.title}
              </h4>
              <div
                style={{
                  display: 'flex',
                  gap: '0.375rem',
                  flexWrap: 'wrap',
                  fontSize: '0.6875rem',
                }}
              >
                <span className="topic-tag">{topic.difficulty.toLowerCase()}</span>
                <span className="topic-tag">⏱️ {topic.readTimeMinutes}m</span>
                {!isSameUniverse && (
                  <span className="topic-tag" style={{ color: 'var(--universe-primary)' }}>
                    ↗ {universeSlug}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/**
 * ⚡ TopicVisualization — "Topic at a Glance" visual dashboard
 */

interface TopicVisualizationProps {
  universe: string;
  content: Record<string, unknown> | null;
  difficulty: string;
  tags: string[];
  readTimeMinutes: number;
  relatedCount: number;
  sourcesCount: number;
  qualityBadge: string | null;
}

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string; level: number }> = {
  BEGINNER: { label: 'Beginner', color: '#4ade80', level: 1 },
  INTERMEDIATE: { label: 'Intermediate', color: '#facc15', level: 2 },
  ADVANCED: { label: 'Advanced', color: '#f97316', level: 3 },
  EXPERT: { label: 'Expert', color: '#ef4444', level: 4 },
};

export default function TopicVisualization({
  universe,
  content,
  difficulty,
  tags,
  readTimeMinutes,
  relatedCount,
  sourcesCount,
  qualityBadge,
}: TopicVisualizationProps) {
  const keyFacts = Array.isArray((content as any)?.keyFacts) ? (content as any).keyFacts as string[] : [];
  const diffConfig = DIFFICULTY_CONFIG[difficulty] ?? { label: 'Beginner', color: '#4ade80', level: 1 };

  return (
    <section
      className="content-width scroll-reveal"
      style={{ padding: '0 1rem', marginBottom: '2rem' }}
      aria-label="Topic at a glance"
    >
      <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📊</span> Topic at a Glance
        </h3>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Difficulty */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>Difficulty</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '0.35rem' }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '18px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i <= diffConfig.level ? diffConfig.color : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: diffConfig.color }}>{diffConfig.label}</div>
          </div>

          {/* Read Time */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>Read Time</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>⏱ {readTimeMinutes}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>minutes</div>
          </div>

          {/* Connections */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>Connections</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>🔗 {relatedCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>related topics</div>
          </div>

          {/* Sources */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>Sources</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>📚 {sourcesCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{qualityBadge ?? 'verified'}</div>
          </div>
        </div>

        {/* Key Facts */}
        {keyFacts.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>⚡ Key Facts</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {keyFacts.map((fact: string, i: number) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.625rem',
                    padding: '0.75rem 1rem',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--accent, #a78bfa)', fontWeight: 700, flexShrink: 0 }}>#{i + 1}</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Tags */}
        {tags.length > 0 && (
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>🎯 Exam Relevance</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  style={{
                    background: 'rgba(167, 139, 250, 0.15)',
                    border: '1px solid rgba(167, 139, 250, 0.25)',
                    borderRadius: '2rem',
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

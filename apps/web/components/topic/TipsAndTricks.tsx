/**
 * ⚡ TipsAndTricks — Exam tips, memory tricks, shortcuts
 */

interface TipsAndTricksProps {
  content: Record<string, unknown> | null;
}

function getTips(content: Record<string, unknown> | null): Array<{
  id: string;
  tip: string;
  category: string;
}> {
  if (!content) return [];
  const tips = (content as any).tipsAndTricks;
  if (!Array.isArray(tips)) return [];
  return tips;
}

export default function TipsAndTricks({ content }: TipsAndTricksProps) {
  const tips = getTips(content);

  if (tips.length === 0) {
    return (
      <section
        className="content-width scroll-reveal"
        style={{ padding: '0 1rem', marginBottom: '2rem' }}
        aria-label="Tips and tricks"
      >
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</p>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Tips & Tricks
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Expert tips will appear here for exam preparation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="content-width scroll-reveal"
      style={{ padding: '0 1rem', marginBottom: '2rem' }}
      aria-label="Tips and tricks"
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
        💡 Tips & Tricks
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="glass-card"
            style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--universe-primary)',
                whiteSpace: 'nowrap',
                marginTop: '0.125rem',
              }}
            >
              {tip.category}
            </span>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>{tip.tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

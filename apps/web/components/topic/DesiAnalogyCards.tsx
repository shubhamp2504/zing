/**
 * ⚡ DesiAnalogyCards — Indian-context analogies that make concepts click
 */

interface DesiAnalogyCardsProps {
  content: Record<string, unknown> | null;
  universe: string;
}

function getAnalogies(content: Record<string, unknown> | null): Array<{
  id: string;
  analogy: string;
  explanation: string;
  emoji: string;
}> {
  if (!content) return [];
  const analogies = (content as any).desiAnalogies;
  if (!Array.isArray(analogies)) return [];
  return analogies;
}

export default function DesiAnalogyCards({ content, universe }: DesiAnalogyCardsProps) {
  const analogies = getAnalogies(content);

  if (analogies.length === 0) {
    return (
      <section
        className="content-width scroll-reveal"
        style={{ padding: '0 1rem', marginBottom: '2rem' }}
        aria-label="Desi analogies"
      >
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🇮🇳</p>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Desi Analogies
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Indian analogies coming soon — making complex ideas simple with everyday examples!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="content-width scroll-reveal"
      style={{ padding: '0 1rem', marginBottom: '2rem' }}
      aria-label="Desi analogies"
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
        🇮🇳 Desi Analogies
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {analogies.map((a) => (
          <div
            key={a.id}
            className="glass-card glass-card-hover"
            style={{
              padding: '1.25rem',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{a.emoji}</div>
            <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              {a.analogy}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              {a.explanation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

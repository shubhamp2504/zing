/**
 * ⚡ ZingConnection — "Real Zing" — surprising cross-topic connections
 */

interface ZingConnectionProps {
  content: Record<string, unknown> | null;
  universe: string;
}

function getConnections(content: Record<string, unknown> | null): Array<{
  id: string;
  from: string;
  to: string;
  insight: string;
}> {
  if (!content) return [];
  const connections = (content as any).zingConnections;
  if (!Array.isArray(connections)) return [];
  return connections;
}

export default function ZingConnection({ content, universe }: ZingConnectionProps) {
  const connections = getConnections(content);

  if (connections.length === 0) {
    return (
      <section
        className="content-width scroll-reveal"
        style={{ padding: '0 1rem', marginBottom: '2rem' }}
        aria-label="ZING connections"
      >
        <div className="glass-card-glow" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</p>
          <h3
            className="text-gradient-gold"
            style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            ZING Connection
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Cross-topic connections will appear here — knowledge is all connected!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="content-width scroll-reveal"
      style={{ padding: '0 1rem', marginBottom: '2rem' }}
      aria-label="ZING connections"
    >
      <h3
        className="text-gradient-gold"
        style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}
      >
        ⚡ ZING Connection
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {connections.map((c) => (
          <div
            key={c.id}
            className="glass-card-glow"
            style={{ padding: '1.25rem' }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                marginBottom: '0.5rem',
                fontSize: '0.8125rem',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <span>{c.from}</span>
              <span>⚡</span>
              <span>{c.to}</span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{c.insight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

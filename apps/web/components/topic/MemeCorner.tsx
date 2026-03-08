/**
 * ⚡ MemeCorner — Fun, relatable memes for the topic (Hinglish)
 */

interface MemeCornerProps {
  content: Record<string, unknown> | null;
}

function getMemes(content: Record<string, unknown> | null): Array<{
  id: string;
  text: string;
  context: string;
}> {
  if (!content) return [];
  const memes = (content as any).memes;
  if (!Array.isArray(memes)) return [];
  return memes;
}

export default function MemeCorner({ content }: MemeCornerProps) {
  const memes = getMemes(content);

  if (memes.length === 0) {
    return (
      <section
        className="content-width scroll-reveal"
        style={{ padding: '0 1rem', marginBottom: '2rem' }}
        aria-label="Meme corner"
      >
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>😂</p>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Meme Corner
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Fun visual explanations coming soon — learning is better with a smile!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="content-width scroll-reveal"
      style={{ padding: '0 1rem', marginBottom: '2rem' }}
      aria-label="Meme corner"
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
        😂 Meme Corner
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {memes.map((meme) => (
          <div
            key={meme.id}
            className="glass-card glass-card-hover"
            style={{ padding: '1.25rem' }}
          >
            <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              {meme.text}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              {meme.context}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * ⚡ SourcesAndReferences — Credibility section at the bottom
 */

interface SourcesAndReferencesProps {
  content: Record<string, unknown> | null;
  sources?: string[];
  qualityBadge?: string | null;
}

export default function SourcesAndReferences({ content, sources: topicSources, qualityBadge }: SourcesAndReferencesProps) {
  // Prefer top-level sources (string URLs), fall back to content.sources (structured objects)
  const urlSources = topicSources && topicSources.length > 0 ? topicSources : [];
  const contentSources = !urlSources.length && content ? ((content as any).sources ?? []) : [];

  return (
    <section
      className="reading-width scroll-reveal"
      style={{ padding: '0 1rem 4rem', marginBottom: '2rem' }}
      aria-label="Sources and references"
    >
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '2rem',
        }}
      >
        <h3
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1rem',
          }}
        >
          Sources & References
        </h3>

        {urlSources.length > 0 ? (
          <ol
            style={{
              listStylePosition: 'inside',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {urlSources.map((url, i) => {
              let displayName: string;
              try {
                displayName = new URL(url).hostname.replace('www.', '');
              } catch {
                displayName = url;
              }
              return (
                <li
                  key={i}
                  style={{
                    fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.5,
                  }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--universe-primary)', textDecoration: 'underline' }}
                  >
                    {displayName}
                  </a>
                </li>
              );
            })}
          </ol>
        ) : contentSources.length > 0 ? (
          <ol
            style={{
              listStylePosition: 'inside',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {contentSources.map((source: any) => (
              <li
                key={source.id}
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.5,
                }}
              >
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--universe-primary)', textDecoration: 'underline' }}
                  >
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}</span>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
            References are being curated by our editorial team.
          </p>
        )}

        {/* ZING quality stamp */}
        {qualityBadge && (
          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span className="quality-badge" data-badge={qualityBadge}>
              ✓ {qualityBadge === 'verified' ? 'Verified' : qualityBadge === 'expert-reviewed' ? 'Expert Reviewed' : 'ZING Quality'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

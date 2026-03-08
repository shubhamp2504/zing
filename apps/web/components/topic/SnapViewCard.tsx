/**
 * ⚡ SnapViewCard — Shareable, quick-summary knowledge card
 * WhatsApp deep link + clipboard + native share
 */

import ShareButton from '@/components/topic/ShareButton';

interface SnapViewCardProps {
  title: string;
  summary: string | null;
  readTime: number;
  difficulty: string;
  universe: string;
  tags: string[];
  slug?: string;
}

export default function SnapViewCard({
  title,
  summary,
  readTime,
  difficulty,
  universe,
  tags,
  slug,
}: SnapViewCardProps) {
  const shareText = `⚡ ${title}\n${summary ?? ''}\n\nRead on ZING →`;

  return (
    <section
      className="content-width scroll-reveal"
      role="article"
      aria-label="Quick summary"
      style={{ padding: '0 1rem', marginBottom: '2rem' }}
    >
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top gradient bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, var(--universe-primary), var(--universe-secondary))',
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</h2>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <span className="topic-tag">{difficulty.toLowerCase()}</span>
              <span className="topic-tag">⏱️ {readTime}m</span>
            </div>
          </div>

          {/* Share button — uses progressive enhancement */}
          <ShareButton shareText={shareText} slug={slug} />
        </div>

        {/* Summary */}
        {summary && (
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}
          >
            {summary}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {tags.slice(0, 5).map((tag) => (
              <span key={tag} className="topic-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

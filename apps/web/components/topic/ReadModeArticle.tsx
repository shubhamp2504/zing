/**
 * ⚡ ReadModeArticle — The main article with 10 sections
 * Includes ReadingAura system, ZingMomentFlash, Table of Contents
 */

import { autoLinkContent, type TopicIndex } from '@/lib/auto-link';
import ZingMomentFlash from '@/components/scrollytelling/ZingMomentFlash';

/** Escape HTML entities in plain text before injecting auto-link anchors */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

interface ReadModeArticleProps {
  content: Record<string, unknown> | null;
  topicSections?: Array<{ id: string; title: string; type: string; order: number }>;
  mood: Record<string, string>;
  hasZingMomentFlash: boolean;
  zingMomentSentenceId: string | null;
  readingAuraEnabled: boolean;
  readTimeMinutes: number;
  topicIndex?: TopicIndex[];
  currentSlug?: string;
}

/**
 * Extract text sections from content JSON
 */
function getContentSections(content: Record<string, unknown> | null): Array<{
  id: string;
  title: string;
  body: string;
  type: string;
}> {
  if (!content) return [];

  // If content has a `sections` array with body text, use it directly
  const sections = (content as any).sections;
  if (Array.isArray(sections) && sections.length > 0 && sections[0].body) {
    return sections;
  }

  // Build sections from summary/keyFacts structure (seed data format)
  const result: Array<{ id: string; title: string; body: string; type: string }> = [];

  if ((content as any).summary) {
    result.push({
      id: 'summary',
      title: 'Summary',
      body: String((content as any).summary),
      type: 'text',
    });
  }

  if (Array.isArray((content as any).keyFacts) && (content as any).keyFacts.length > 0) {
    result.push({
      id: 'key-facts',
      title: 'Key Facts',
      body: (content as any).keyFacts.map((f: string) => `• ${f}`).join('\n'),
      type: 'list',
    });
  }

  // Fallback: render any remaining string values
  if (result.length === 0) {
    return [
      {
        id: 'main',
        title: 'Content',
        body: typeof content === 'string' ? content : JSON.stringify(content, null, 2),
        type: 'text',
      },
    ];
  }

  return result;
}

export default function ReadModeArticle({
  content,
  topicSections,
  mood,
  hasZingMomentFlash,
  zingMomentSentenceId,
  readingAuraEnabled,
  readTimeMinutes,
  topicIndex,
  currentSlug,
}: ReadModeArticleProps) {
  const contentSections = getContentSections(content);

  // Merge DB section titles into content sections if we have structurally separate data
  const dbSections = Array.isArray(topicSections) ? topicSections.sort((a, b) => a.order - b.order) : [];
  
  // If we have DB sections with titles but content sections are just summary/keyFacts,
  // prepend the DB section outlines as a table of contents
  const sections = contentSections.length > 0 ? contentSections : [];

  if (sections.length === 0) {
    return (
      <section className="reading-width" style={{ padding: '2rem 1rem' }}>
        <div
          className="glass-card"
          style={{
            padding: '2rem',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <p>📝 Content is being prepared. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="reading-width"
      style={{ padding: '0 1rem', marginBottom: '3rem' }}
      aria-label="Article content"
    >
      {/* Reading time indicator */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        ⏱️ {readTimeMinutes} min read
      </div>

      {/* Article sections */}
      {sections.map((section, index) => {
        const sectionMood = mood[section.id] ?? 'neutral';

        return (
          <div
            key={section.id}
            className={`scroll-reveal ${readingAuraEnabled ? 'reading-aura' : ''}`}
            data-mood={sectionMood}
            style={{
              marginBottom: '2.5rem',
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* Section heading */}
            {section.title && section.title !== 'Content' && (
              <h2
                id={`section-${section.id}`}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  scrollMarginTop: 'calc(var(--header-height) + 1rem)',
                }}
              >
                {section.title}
              </h2>
            )}

            {/* Section body */}
            <div
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {/* If this section contains the ZING Moment Flash sentence */}
              {hasZingMomentFlash && zingMomentSentenceId === section.id ? (
                <ZingMomentFlash>
                  {section.body.split('\n').map((line, i) => {
                    if (topicIndex && currentSlug) {
                      const { html } = autoLinkContent(escapeHtml(line), topicIndex, currentSlug);
                      return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
                    }
                    return <p key={i}>{line}</p>;
                  })}
                </ZingMomentFlash>
              ) : (
                section.body.split('\n').map((line, i) => {
                  if (topicIndex && currentSlug) {
                    const { html } = autoLinkContent(escapeHtml(line), topicIndex, currentSlug);
                    return <p key={i} style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: html }} />;
                  }
                  return <p key={i} style={{ marginBottom: '0.5rem' }}>{line}</p>;
                })
              )}
            </div>
          </div>
        );
      })}

      {/* Section outline from database (shows upcoming article structure) */}
      {dbSections.length > 0 && (
        <div
          className="glass-card scroll-reveal"
          style={{
            padding: '1.5rem',
            marginTop: '1rem',
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
            In This Article
          </h3>
          <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem' }}>
            {dbSections.map((s) => (
              <li
                key={s.id}
                style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.5,
                }}
              >
                <a
                  href={`#section-${s.id}`}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '1px',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {s.title}
                </a>
                {s.type !== 'text' && s.type !== 'deep-dive' && (
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.6875rem',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '0.25rem',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {s.type.replace(/-/g, ' ')}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

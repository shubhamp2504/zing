/**
 * ⚡ TopicCinematicHeader — Full-viewport hero with parallax
 * Displays topic title, metadata, and cinematic backdrop
 */

import Link from 'next/link';

interface TopicCinematicHeaderProps {
  title: string;
  summary: string | null;
  universe: string;
  subWorld: string;
  difficulty: string;
  readTime: number;
  examRelevance: string[];
}

export default function TopicCinematicHeader({
  title,
  summary,
  universe,
  subWorld,
  difficulty,
  readTime,
  examRelevance,
}: TopicCinematicHeaderProps) {
  const difficultyLabel = difficulty === 'BEGINNER' ? '🟢'
    : difficulty === 'INTERMEDIATE' ? '🟡'
    : difficulty === 'ADVANCED' ? '🔴'
    : '⚪';

  return (
    <header
      className="scroll-reveal"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--universe-primary) 8%, transparent) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Topic breadcrumb"
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '2rem',
          position: 'relative',
        }}
      >
        <Link
          href={`/${universe}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {universe.replace(/-/g, ' ')}
        </Link>
        <span>/</span>
        <Link
          href={`/${universe}/${subWorld}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {subWorld.replace(/-/g, ' ')}
        </Link>
      </nav>

      {/* Title */}
      <h1
        style={{
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          maxWidth: '48rem',
          position: 'relative',
          marginBottom: '1.5rem',
        }}
      >
        {title}
      </h1>

      {/* Summary */}
      {summary && (
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '36rem',
            lineHeight: 1.7,
            position: 'relative',
            marginBottom: '2rem',
          }}
        >
          {summary}
        </p>
      )}

      {/* Meta badges */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <span className="topic-tag">
          {difficultyLabel} {difficulty.toLowerCase()}
        </span>
        <span className="topic-tag">
          ⏱️ {readTime} min read
        </span>
        {examRelevance.map((exam) => (
          <span key={exam} className="exam-badge">{exam}</span>
        ))}
      </div>
    </header>
  );
}

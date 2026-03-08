/**
 * ⚡ The Living Wall — Homepage editorial feed
 *
 * Real-time curated content wall. Server Component.
 * Fetches latest + most-viewed topics from DB.
 */

import { prisma } from '@zing/database';
import Link from 'next/link';

const UNIVERSE_SLUG_MAP: Record<string, string> = {
  SCHOLAR: 'scholar',
  CODE_COSMOS: 'code-cosmos',
  BATTLE_GROUND: 'battle-ground',
  CAREER: 'career',
  CIVILIZATION: 'civilization',
  KNOWLEDGE: 'knowledge',
  CURIOSITY: 'curiosity',
};

export default async function LivingWall() {
  let daily = null;
  let trending: { slug: string; title: string; universe: string; subWorld: string; quickShotSummary: string | null }[] = [];

  try {
    // Latest published topic → "Today's ZING"
    daily = await prisma.topic.findFirst({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true, universe: true, subWorld: true, quickShotSummary: true },
    });

    // Most-viewed topics → "Trending"
    trending = await prisma.topic.findMany({
      where: { status: 'PUBLISHED', slug: { not: daily?.slug ?? '' } },
      orderBy: { viewCount: 'desc' },
      take: 2,
      select: { slug: true, title: true, universe: true, subWorld: true, quickShotSummary: true },
    });
  } catch {
    return null;
  }

  if (!daily && trending.length === 0) return null;

  return (
    <section
      className="zing-section"
      style={{
        maxWidth: '48rem',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        The Living Wall
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {daily && (
          <article className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: '#FFD700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Today&apos;s ZING ⚡
            </span>
            <Link
              href={`/${UNIVERSE_SLUG_MAP[daily.universe] ?? daily.universe.toLowerCase()}/${daily.subWorld}/${daily.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
                {daily.title}
              </h3>
              {daily.quickShotSummary && (
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem', lineHeight: 1.6 }}>
                  {daily.quickShotSummary}
                </p>
              )}
            </Link>
          </article>
        )}

        {trending.map((t) => (
          <article key={t.slug} className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: '#EF4444',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Trending 🔥
            </span>
            <Link
              href={`/${UNIVERSE_SLUG_MAP[t.universe] ?? t.universe.toLowerCase()}/${t.subWorld}/${t.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
                {t.title}
              </h3>
              {t.quickShotSummary && (
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem', lineHeight: 1.6 }}>
                  {t.quickShotSummary}
                </p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

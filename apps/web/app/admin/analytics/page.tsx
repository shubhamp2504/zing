/**
 * ⚡ Admin Analytics — /admin/analytics
 *
 * Real database analytics: most read topics, universe distribution,
 * language breakdown, sharing stats, content status overview.
 */

import { prisma } from '@zing/database';

export const dynamic = 'force-dynamic';

const UNIVERSE_LABELS: Record<string, string> = {
  SCHOLAR: '📖 Scholar',
  CODE_COSMOS: '💻 Code Cosmos',
  BATTLE_GROUND: '⚔️ Battle Ground',
  CAREER: '💼 Career',
  CIVILIZATION: '🏛️ Civilization',
  KNOWLEDGE: '🔬 Knowledge',
  CURIOSITY: '🧩 Curiosity',
};

export default async function AnalyticsPage() {
  const [
    mostRead,
    mostShared,
    universeBreakdown,
    statusBreakdown,
    difficultyBreakdown,
    translationLangs,
    totalViews,
    totalShares,
    totalLikes,
    topicCount,
  ] = await Promise.all([
    prisma.topic.findMany({
      select: { slug: true, title: true, universe: true, viewCount: true },
      orderBy: { viewCount: 'desc' },
      take: 5,
    }),
    prisma.topic.findMany({
      select: { slug: true, title: true, universe: true, shareCount: true },
      orderBy: { shareCount: 'desc' },
      take: 5,
    }),
    prisma.topic.groupBy({ by: ['universe'], _count: { id: true } }),
    prisma.topic.groupBy({ by: ['status'], _count: { id: true } }),
    prisma.topic.groupBy({ by: ['difficulty'], _count: { id: true } }),
    prisma.topicTranslation.groupBy({ by: ['language'], _count: { id: true } }),
    prisma.topic.aggregate({ _sum: { viewCount: true } }),
    prisma.topic.aggregate({ _sum: { shareCount: true } }),
    prisma.topic.aggregate({ _sum: { likeCount: true } }),
    prisma.topic.count(),
  ]);

  const views = totalViews._sum.viewCount ?? 0;
  const shares = totalShares._sum.shareCount ?? 0;
  const likes = totalLikes._sum.likeCount ?? 0;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        📈 Analytics
      </h1>

      {/* Summary Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {[
          { icon: '📚', value: topicCount, label: 'Total Topics' },
          { icon: '👁️', value: views, label: 'Total Views' },
          { icon: '❤️', value: likes, label: 'Total Likes' },
          { icon: '🔗', value: shares, label: 'Total Shares' },
        ].map((s) => (
          <div key={s.label} className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>
              {s.value.toLocaleString()}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Most Read */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
            🔥 Most Read Topics
          </h2>
          {mostRead.length === 0 ? (
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
              No view data yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {mostRead.map((t, i) => (
                <div
                  key={t.slug}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.375rem 0.5rem',
                    borderRadius: '0.25rem',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>
                    {i + 1}. {t.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    {t.viewCount.toLocaleString()} views
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highest Share Rate */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
            🤝 Most Shared Topics
          </h2>
          {mostShared.length === 0 ? (
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
              No share data yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {mostShared.map((t, i) => (
                <div
                  key={t.slug}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.375rem 0.5rem',
                    borderRadius: '0.25rem',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>
                    {i + 1}. {t.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    {t.shareCount.toLocaleString()} shares
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Universe Breakdown */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
            🌌 Universe Distribution
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {universeBreakdown.map((u) => (
              <div
                key={u.universe}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.375rem 0.5rem',
                  borderRadius: '0.25rem',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>
                  {UNIVERSE_LABELS[u.universe] ?? u.universe}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                  {u._count.id} topics
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
            🌐 Translation Languages
          </h2>
          {translationLangs.length === 0 ? (
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
              No translations yet.
            </p>
          ) : (
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem' }}>
              {translationLangs.map((l) => (
                <div key={l.language} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{l._count.id}</p>
                  <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)' }}>
                    {l.language.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Status */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
            📋 Content Status
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {statusBreakdown.map((s) => (
              <div key={s.status} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{s._count.id}</p>
                <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)' }}>
                  {s.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Spread */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
            📊 Difficulty Spread
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {difficultyBreakdown.map((d) => (
              <div key={d.difficulty} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{d._count.id}</p>
                <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)' }}>
                  {d.difficulty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

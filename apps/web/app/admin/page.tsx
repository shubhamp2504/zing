/**
 * ⚡ Admin Dashboard — /admin
 *
 * Overview stats, content queue, recent activity from real DB data.
 */

import { prisma } from "@zing/database";

export const dynamic = 'force-dynamic'; // Always fetch fresh data

export default async function AdminDashboard() {
  const [topicCount, characterCount, translationCount, relationCount, recentTopics] = await Promise.all([
    prisma.topic.count({ where: { status: 'PUBLISHED' } }),
    prisma.character.count(),
    prisma.topicTranslation.count(),
    prisma.topicRelation.count(),
    prisma.topic.findMany({
      select: { slug: true, title: true, universe: true, difficulty: true, updatedAt: true, status: true },
      orderBy: { updatedAt: 'desc' },
      take: 8,
    }),
  ]);

  const universeBreakdown = await prisma.topic.groupBy({
    by: ['universe'],
    _count: { id: true },
  });

  const stats = [
    { label: 'Topics Published', value: String(topicCount), icon: '📚' },
    { label: 'AI Characters', value: String(characterCount), icon: '🤖' },
    { label: 'Translations', value: String(translationCount), icon: '🌐' },
    { label: 'Knowledge Links', value: String(relationCount), icon: '🔗' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card"
            style={{ padding: '1.25rem' }}
          >
            <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            <p
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginTop: '0.5rem',
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Universe Breakdown */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>🌌 Topics by Universe</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {universeBreakdown.map((u: { universe: string; _count: { id: number } }) => (
            <div key={u.universe} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600 }}>{u.universe}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '0.5rem' }}>{u._count.id} topics</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        {[
          { href: '/admin/create', label: '✍️ Create Topic' },
          { href: '/admin/pipeline', label: '🤖 AI Pipeline' },
          { href: '/admin/translate', label: '🌐 Translate' },
          { href: '/admin/connect', label: '🔗 Add Connection' },
        ].map((action) => (
          <a
            key={action.href}
            href={action.href}
            className="glass-card"
            style={{
              padding: '0.625rem 1rem',
              fontSize: '0.875rem',
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
            }}
          >
            {action.label}
          </a>
        ))}
      </div>

      {/* Recent Topics */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>⏱️ Recent Topics</h2>
        {recentTopics.length === 0 ? (
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>
            No topics yet. Create one from the Pipeline page.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {recentTopics.map((t: { slug: string; title: string; universe: string; difficulty: string; updatedAt: Date; status: string }) => (
              <div key={t.slug} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{t.title}</span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginLeft: '0.75rem' }}>{t.universe} · {t.difficulty}</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
                  {t.updatedAt.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

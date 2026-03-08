/**
 * ⚡ ZING — Universe Landing Page
 * Shows sub-worlds and available topics for a universe
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { findUniverse } from '@/lib/universes';
import { getTopicsByUniverse } from '@/lib/queries';
import ScrollReveal from '@/components/scrollytelling/ScrollReveal';
import AnimatedSubWorldCard from '@/components/universe/AnimatedSubWorldCard';
import SectionSkeleton from '@/components/topic/SectionSkeleton';

export const revalidate = 3600;

interface UniversePageProps {
  params: Promise<{ universe: string }>;
}

export async function generateMetadata({ params }: UniversePageProps): Promise<Metadata> {
  const { universe: slug } = await params;
  const universe = findUniverse(slug);
  if (!universe) return { title: 'Not Found | ZING' };

  return {
    title: `${universe.name} — ZING`,
    description: universe.description,
  };
}

export default async function UniversePage({ params }: UniversePageProps) {
  const { universe: slug } = await params;
  const universe = findUniverse(slug);
  if (!universe) notFound();

  const topics = await getTopicsByUniverse(slug);

  // Group topics by subWorld
  const topicsBySubWorld: Record<string, typeof topics> = {};
  for (const topic of topics) {
    const sw = String(topic.subWorld);
    if (!topicsBySubWorld[sw]) topicsBySubWorld[sw] = [];
    topicsBySubWorld[sw].push(topic);
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <header
        style={{
          padding: '5rem 1.5rem 3rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${universe.colors.primary}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <Link
          href="/"
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            marginBottom: '1.5rem',
            display: 'inline-block',
          }}
        >
          ← Back to ZING
        </Link>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{universe.icon}</div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: universe.colors.primary,
            marginBottom: '0.5rem',
          }}
        >
          {universe.name}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', maxWidth: '32rem', marginInline: 'auto' }}>
          {universe.tagline}
        </p>
        {topics.length > 0 && (
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', marginTop: '0.75rem' }}>
            {topics.length} topic{topics.length !== 1 ? 's' : ''} available
          </p>
        )}
      </header>

      {/* Sub-Worlds Grid */}
      <main style={{ padding: '0 1.5rem 4rem', maxWidth: '72rem', marginInline: 'auto' }}>
        {/* Sub-worlds with topics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {universe.subWorlds
            .filter((sw) => (topicsBySubWorld[sw.slug] || []).length > 0)
            .map((subWorld) => {
            const swTopics = topicsBySubWorld[subWorld.slug]!;
            return (
              <ScrollReveal key={subWorld.id} delay={50}>
                <Suspense fallback={<SectionSkeleton height="12rem" />}>
                  <AnimatedSubWorldCard
                    subWorldSlug={subWorld.slug}
                    subWorldName={subWorld.name}
                    subWorldIcon={subWorld.icon}
                    subWorldDescription={subWorld.description}
                    universeSlug={slug}
                    universeColor={universe.colors.primary}
                    topics={swTopics.map((t) => ({
                      slug: t.slug,
                      title: t.title,
                      quickShotSummary: t.quickShotSummary,
                      difficulty: t.difficulty as string | null,
                      readTimeMinutes: t.readTimeMinutes,
                    }))}
                  />
                </Suspense>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Coming soon sub-worlds — collapsed */}
        {(() => {
          const emptySubWorlds = universe.subWorlds.filter((sw) => !(topicsBySubWorld[sw.slug]?.length));
          if (emptySubWorlds.length === 0) return null;
          return (
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>
                More sub-worlds coming soon
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {emptySubWorlds.map((sw) => (
                  <span
                    key={sw.id}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '2rem',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.3)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <span>{sw.icon}</span> {sw.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </main>
    </div>
  );
}

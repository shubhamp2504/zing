/**
 * ⚡ ZING — Sub-World Landing Page
 * Shows topics within a specific sub-world
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findUniverse, findSubWorld } from '@/lib/universes';
import { getTopicsBySubWorld } from '@/lib/queries';
import ScrollReveal from '@/components/scrollytelling/ScrollReveal';
import AnimatedTopicList from '@/components/universe/AnimatedTopicList';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ universe: string; subworld: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { universe, subworld } = await params;
  const u = findUniverse(universe);
  const sw = u ? findSubWorld(universe, subworld) : undefined;

  if (!u || !sw) return { title: 'Not Found | ZING' };

  return {
    title: `${sw.name} — ${u.name} | ZING`,
    description: sw.description,
  };
}

export default async function SubWorldPage({ params }: PageProps) {
  const { universe, subworld } = await params;
  const u = findUniverse(universe);
  const sw = u ? findSubWorld(universe, subworld) : undefined;

  if (!u || !sw) notFound();

  const topics = await getTopicsBySubWorld(universe, subworld);

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
            background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${u.colors.primary}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <Link
          href={`/${universe}`}
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            marginBottom: '1.5rem',
            display: 'inline-block',
          }}
        >
          ← Back to {u.name}
        </Link>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{sw.icon}</div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: u.colors.primary,
            marginBottom: '0.5rem',
          }}
        >
          {sw.name}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: '32rem', marginInline: 'auto' }}>
          {sw.description}
        </p>
      </header>

      {/* Topics */}
      <main style={{ padding: '0 1.5rem 4rem', maxWidth: '48rem', marginInline: 'auto' }}>
        {topics.length > 0 ? (
          <ScrollReveal>
            <AnimatedTopicList
              topics={topics.map((t) => ({
                slug: t.slug,
                title: t.title,
                quickShotSummary: t.quickShotSummary,
                difficulty: t.difficulty as string | null,
                readTimeMinutes: t.readTimeMinutes,
              }))}
              universe={universe}
              subworld={subworld}
              universeColor={u.colors.primary}
            />
          </ScrollReveal>
        ) : (
          <div
            className="glass-card"
            style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}
          >
            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>{sw.icon}</p>
            <p>Topics for {sw.name} are coming soon!</p>
            <Link
              href={`/${universe}`}
              style={{ color: u.colors.primary, textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}
            >
              ← Explore other {u.name} sub-worlds
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

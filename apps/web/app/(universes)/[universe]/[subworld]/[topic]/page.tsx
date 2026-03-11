/**
 * ⚡ ZING — Topic Page (Simplified)
 * Clean, content-first topic pages
 *
 * Route: /[universe]/[subworld]/[topic]
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { findUniverse } from '@/lib/universes';
import { getTopicBySlug, getTopicForMetadata } from '@/lib/queries';
import ViewTracker from '@/components/topic/ViewTracker';

/* Essential section imports */
import ReadModeArticle from '@/components/topic/ReadModeArticle';
import SnapViewCard from '@/components/topic/SnapViewCard';
import DesiAnalogyCards from '@/components/topic/DesiAnalogyCards';
import RelatedTopics from '@/components/topic/RelatedTopics';
import SourcesAndReferences from '@/components/topic/SourcesAndReferences';
import SectionSkeleton from '@/components/topic/SectionSkeleton';

/* ── ISR Configuration ── */
export const revalidate = 3600; // Re-validate every hour

/* ── Types ── */
interface TopicPageProps {
  params: Promise<{
    universe: string;
    subworld: string;
    topic: string;
  }>;
  searchParams: Promise<{
    mode?: string;
  }>;
}

/* ── Metadata Generation ── */
export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { universe, topic: topicSlug } = await params;

  try {
    const topic = await getTopicForMetadata(topicSlug);

    if (!topic) {
      return { title: 'Topic Not Found | ZING' };
    }

    const title = topic.title;
    const description = topic.quickShotSummary ?? `Learn about ${title} on ZING`;

    return {
      title: `${title} | ZING`,
      description,
      openGraph: {
        title: `${title} | ZING`,
        description,
        type: 'article',
        siteName: 'ZING',
      },
    };
  } catch (error) {
    console.error('[Topic Page] Error in generateMetadata:', error);
    return {
      title: 'Topic Not Found | ZING',
    };
  }
}

/* ── Page Component ── */
export default async function TopicPage({ params, searchParams }: TopicPageProps) {
  const { universe, subworld, topic: topicSlug } = await params;
  const { mode = 'read' } = await searchParams;

  /* Fetch topic data */
  let topic;
  try {
    topic = await getTopicBySlug(topicSlug);
  } catch (error) {
    console.error('[Topic Page] Error fetching topic:', error);
    notFound();
  }

  if (!topic) {
    notFound();
  }

  const content = topic.content as Record<string, unknown> | null;
  const relatedTopics = [
    ...topic.relationsFrom.map((r) => ({
      ...r.toTopic,
      relationType: r.relationType,
      strength: r.strength,
    })),
    ...topic.relationsTo.map((r) => ({
      ...r.fromTopic,
      relationType: r.relationType,
      strength: r.strength,
    })),
  ];

  const universeData = findUniverse(universe);

  return (
    <article
      data-universe={universe}
      className="topic-page"
      style={{ 
        maxWidth: '48rem', 
        margin: '0 auto', 
        padding: '2rem 1.5rem',
        minHeight: '100vh'
      }}
    >
      <ViewTracker slug={topicSlug} />

      {/* [1] Clean Header: Title + Tags + Breadcrumb */}
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href={`/${universe}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {universeData?.name ?? universe}
          </Link>
          {' / '}
          <Link href={`/${universe}/${subworld}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {subworld}
          </Link>
        </nav>

        {/* Title */}
        <h1 style={{ 
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
          fontWeight: 700, 
          marginBottom: '0.75rem',
          lineHeight: 1.2,
          color: 'rgba(255,255,255,0.95)'
        }}>
          {topic.title}
        </h1>

        {/* Tags */}
        {topic.tags && topic.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {topic.tags.slice(0, 5).map((tag) => (
              <span 
                key={tag} 
                style={{ 
                  fontSize: '0.75rem', 
                  padding: '0.25rem 0.75rem', 
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '1rem',
                  color: 'rgba(255,255,255,0.7)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* [2] Mode Selector: 2 Pills */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        padding: '0.5rem',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '0.5rem',
        width: 'fit-content'
      }}>
        <Link
          href={`/${universe}/${subworld}/${topicSlug}`}
          style={{
            padding: '0.5rem 1.5rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
            background: mode === 'read' ? 'rgba(255,215,0,0.15)' : 'transparent',
            border: mode === 'read' ? '1px solid rgba(255,215,0,0.3)' : '1px solid transparent',
            color: mode === 'read' ? 'rgba(255,215,0,1)' : 'rgba(255,255,255,0.6)',
            transition: 'all 0.2s',
          }}
        >
          📖 Read
        </Link>
        <Link
          href={`/${universe}/${subworld}/${topicSlug}?mode=snap`}
          style={{
            padding: '0.5rem 1.5rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
            background: mode === 'snap' ? 'rgba(255,215,0,0.15)' : 'transparent',
            border: mode === 'snap' ? '1px solid rgba(255,215,0,0.3)' : '1px solid transparent',
            color: mode === 'snap' ? 'rgba(255,215,0,1)' : 'rgba(255,255,255,0.6)',
            transition: 'all 0.2s',
          }}
        >
          ⚡ Snap
        </Link>
      </div>

      {/* [3] Content: Snap or Read */}
      {mode === 'snap' ? (
        <Suspense fallback={<SectionSkeleton height="12rem" />}>
          <SnapViewCard
            title={topic.title}
            summary={topic.quickShotSummary}
            readTime={topic.readTimeMinutes}
            difficulty={topic.difficulty}
            universe={universe}
            tags={topic.tags}
            slug={topicSlug}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<SectionSkeleton height="60vh" />}>
          <ReadModeArticle
            content={content}
            topicSections={topic.sections as any}
            mood={(topic.mood as Record<string, string>) ?? {}}
            hasZingMomentFlash={topic.hasZingMomentFlash}
            zingMomentSentenceId={topic.zingMomentSentenceId}
            readingAuraEnabled={topic.readingAuraEnabled}
            readTimeMinutes={topic.readTimeMinutes}
            topicIndex={[]} // No topic index for now
            currentSlug={topicSlug}
          />
        </Suspense>
      )}

      {/* [4] Desi Analogies (if exists) */}
      <Suspense fallback={null}>
        <DesiAnalogyCards
          content={content}
          universe={universe}
        />
      </Suspense>

      {/* [5] Related Topics (max 5) */}
      {relatedTopics.length > 0 && (
        <Suspense fallback={<SectionSkeleton height="10rem" />}>
          <section style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              Related Topics
            </h2>
            <RelatedTopics
              topics={relatedTopics.slice(0, 5)}
              currentUniverse={universe}
            />
          </section>
        </Suspense>
      )}

      {/* [6] Sources (expandable) */}
      <Suspense fallback={<SectionSkeleton height="6rem" />}>
        <SourcesAndReferences
          content={content}
          sources={topic.sources}
          qualityBadge={topic.qualityBadge}
        />
      </Suspense>
    </article>
  );
}


/* ── Metadata Generation ── */
export async function generateMetadata({ params, searchParams }: TopicPageProps): Promise<Metadata> {
  const { universe, topic: topicSlug } = await params;
  const { lang } = await searchParams;

  try {
    const topic = await getTopicForMetadata(topicSlug);

    if (!topic) {
      return { title: 'Topic Not Found | ZING' };
    }

    const universeData = findUniverse(universe);
    const title = topic.title;
    const description = topic.quickShotSummary ?? `Learn about ${title} on ZING`;

    return {
      title,
      description,
      openGraph: {
        title: `${title} | ZING`,
        description,
        type: 'article',
        siteName: 'ZING',
        locale: lang === 'hi' ? 'hi_IN' : lang === 'mr' ? 'mr_IN' : 'en_IN',
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(title)}&universe=${encodeURIComponent(universe)}&subtitle=${encodeURIComponent(description)}`,
            width: 1200,
            height: 630,
            type: 'image/png',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | ZING`,
        description,
        images: [`/api/og?title=${encodeURIComponent(title)}&universe=${encodeURIComponent(universe)}`],
      },
      alternates: {
        languages: {
          en: `/${universe}/${topic.subWorld}/${topicSlug}`,
          hi: `/${universe}/${topic.subWorld}/${topicSlug}?lang=hi`,
          mr: `/${universe}/${topic.subWorld}/${topicSlug}?lang=mr`,
        },
      },
      other: {
        'application/ld+json': JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          author: { '@type': 'Organization', name: 'ZING' },
          publisher: { '@type': 'Organization', name: 'ZING' },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://zing-alpha.vercel.app'}/${universe}/${topic.subWorld}/${topicSlug}`,
          },
          inLanguage: lang ?? 'en',
          about: { '@type': 'Thing', name: universeData?.name ?? universe },
        }),
      },
    };
  } catch (error) {
    console.error('[Topic Page] Error in generateMetadata:', error);
    return {
      title: 'Topic Not Found | ZING',
    };
  }
}

/* ── Page Component ── */
export default async function TopicPage({ params, searchParams }: TopicPageProps) {
  const { universe, subworld, topic: topicSlug } = await params;
  const { lang = 'en', mode } = await searchParams;

  /* Fetch topic data */
  let topic;
  try {
    topic = await getTopicBySlug(topicSlug);
  } catch (error) {
    console.error('[Topic Page] Error fetching topic:', error);
    notFound();
  }

  if (!topic) {
    notFound();
  }

  const content = topic.content as Record<string, unknown> | null;
  const topicIndex = await getTopicIndex();
  const relatedTopics = [
    ...topic.relationsFrom.map((r) => ({
      ...r.toTopic,
      relationType: r.relationType,
      strength: r.strength,
    })),
    ...topic.relationsTo.map((r) => ({
      ...r.fromTopic,
      relationType: r.relationType,
      strength: r.strength,
    })),
  ];

  const activeMode = mode ?? 'read';
  const exitHref = `/${universe}/${subworld}/${topicSlug}`;
  const topicDataForModes = {
    title: topic.title,
    quickShotSummary: topic.quickShotSummary,
    sections: topic.sections as { id: string; title: string; type: string }[] | null,
    content,
  };

  /* Immersive modes render as full-screen overlays */
  if (activeMode === 'story') {
    return (
      <StoryMode
        slides={buildStorySlides(topicDataForModes)}
        topicTitle={topic.title}
        universe={universe}
        exitHref={exitHref}
      />
    );
  }

  if (activeMode === 'cinematic') {
    return (
      <CinematicMode
        scenes={buildCinematicScenes(topicDataForModes)}
        topicTitle={topic.title}
        universe={universe}
        exitHref={exitHref}
      />
    );
  }

  if (activeMode === 'swipe') {
    return (
      <SwipeMode
        cards={buildSwipeCards(topicDataForModes)}
        topicTitle={topic.title}
        universe={universe}
        exitHref={exitHref}
      />
    );
  }

  return (
    <article
      data-universe={universe}
      data-lang={lang}
      lang={lang}
      className="topic-page"
      style={{ position: 'relative' }}
    >
      {/* Reading Progress Bar — pure CSS scroll-driven */}
      <ReadingProgressBar />
      <ViewTracker slug={topicSlug} />
      {/* <GamificationBar topicSlug={topicSlug} universe={universe} /> — disabled for now */}

      {/* [1] Cinematic Header */}
      <Suspense fallback={<SectionSkeleton height="60vh" />}>
        <TopicCinematicHeader
          title={topic.title}
          summary={topic.quickShotSummary}
          universe={universe}
          subWorld={subworld}
          difficulty={topic.difficulty}
          readTime={topic.readTimeMinutes}
          examRelevance={topic.examTags}
        />
      </Suspense>

      {/* [2] Content Mode Selector + Language Toggle + Like */}
      <Suspense fallback={<SectionSkeleton height="3rem" />}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', padding: '0 1rem' }}>
          <ContentModeSelector
            currentMode={mode ?? 'read'}
            topicSlug={topicSlug}
            universe={universe}
            subWorld={subworld}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LikeButton slug={topicSlug} initialCount={topic.likeCount} />
            <LanguageToggle currentLang={lang} />
          </div>
        </div>
      </Suspense>

      {/* [3] Snap View Card — shown in both read and snap modes */}
      <Suspense fallback={<SectionSkeleton height="12rem" />}>
        <SnapViewCard
          title={topic.title}
          summary={topic.quickShotSummary}
          readTime={topic.readTimeMinutes}
          difficulty={topic.difficulty}
          universe={universe}
          tags={topic.tags}
          slug={topicSlug}
        />
      </Suspense>

      {/* Snap mode: show only the card + visualization + sources */}
      {activeMode === 'snap' ? (
        <>
          <Suspense fallback={<SectionSkeleton height="20rem" />}>
            <TopicVisualization
              universe={universe}
              content={content}
              difficulty={topic.difficulty}
              tags={topic.tags}
              readTimeMinutes={topic.readTimeMinutes}
              relatedCount={relatedTopics.length}
              sourcesCount={topic.sources.length}
              qualityBadge={topic.qualityBadge}
            />
          </Suspense>
          <Suspense fallback={<SectionSkeleton height="8rem" />}>
            <SourcesAndReferences
              content={content}
              sources={topic.sources}
              qualityBadge={topic.qualityBadge}
            />
          </Suspense>
        </>
      ) : (
        <>
          {/* [4] Read Mode Article (main content) */}
          <ColorDrainSection>
          <Suspense fallback={<SectionSkeleton height="60vh" />}>
            <ReadModeArticle
              content={content}
              topicSections={topic.sections as any}
              mood={(topic.mood as Record<string, string>) ?? {}}
              hasZingMomentFlash={topic.hasZingMomentFlash}
              zingMomentSentenceId={topic.zingMomentSentenceId}
              readingAuraEnabled={topic.readingAuraEnabled}
              readTimeMinutes={topic.readTimeMinutes}
              topicIndex={topicIndex}
              currentSlug={topicSlug}
            />
          </Suspense>
          </ColorDrainSection>

          {/* [5] Topic Visualization */}
          <ScrollReveal delay={100}>
          <Suspense fallback={<SectionSkeleton height="20rem" />}>
            <TopicVisualization
              universe={universe}
              content={content}
              difficulty={topic.difficulty}
              tags={topic.tags}
              readTimeMinutes={topic.readTimeMinutes}
              relatedCount={relatedTopics.length}
              sourcesCount={topic.sources.length}
              qualityBadge={topic.qualityBadge}
            />
          </Suspense>
          </ScrollReveal>

          {/* [6] Desi Analogy Cards */}
          <ScrollReveal delay={150}>
          <Suspense fallback={<SectionSkeleton height="15rem" />}>
            <DesiAnalogyCards
              content={content}
              universe={universe}
            />
          </Suspense>
          </ScrollReveal>

          {/* Silhouette Army — for civilization/battle topics */}
          {(universe === 'civilization' || universe === 'battle-ground') && (
            <SilhouetteArmy
              count={60}
              caption="Every figure represents a life shaped by this moment in history."
              color={universe === 'battle-ground' ? 'rgba(239,68,68,0.4)' : 'rgba(139,92,246,0.4)'}
            />
          )}

          {/* [7] Meme Corner — disabled for now
          <Suspense fallback={<SectionSkeleton height="10rem" />}>
            <MemeCorner content={content} />
          </Suspense>
          */}

          {/* [8] ZING Connection */}
          <ScrollReveal delay={100}>
          <Suspense fallback={<SectionSkeleton height="10rem" />}>
            <ZingConnection
              content={content}
              universe={universe}
            />
          </Suspense>
          </ScrollReveal>

          {/* [9] Knowledge Galaxy + Related Topics */}
          <Suspense fallback={<SectionSkeleton height="20rem" />}>
            {relatedTopics.length > 0 && (
              <section className="content-width scroll-reveal" style={{ padding: '0 1rem', marginBottom: '2rem' }}>
                <KnowledgeGalaxyWrapper
                  topics={[
                    { slug: topicSlug, title: topic.title, universe, subWorld: subworld },
                    ...relatedTopics.map((rt: any) => ({ slug: rt.slug, title: rt.title, universe: rt.universe?.toLowerCase() ?? universe, subWorld: rt.subWorld?.toLowerCase() ?? subworld })),
                  ]}
                  connections={relatedTopics.map((rt: any) => ({ from: topicSlug, to: rt.slug, strength: rt.strength ?? 0.5 }))}
                />
              </section>
            )}
            <RelatedTopics
              topics={relatedTopics}
              currentUniverse={universe}
            />
          </Suspense>

          {/* [10] Tips & Tricks */}
          <ScrollReveal delay={100}>
          <Suspense fallback={<SectionSkeleton height="10rem" />}>
            <TipsAndTricks content={content} />
          </Suspense>
          </ScrollReveal>

          {/* [11] Mirror Moment — ZING's emotional signature */}
          <ScrollReveal delay={150}>
          <Suspense fallback={<SectionSkeleton height="20rem" />}>
            <MirrorMoment
              question={(topic as any).mirrorMoment ?? 'What did this topic make you feel?'}
              universe={universe}
            />
          </Suspense>
          </ScrollReveal>

          {/* [12] Sources & References */}
          <Suspense fallback={<SectionSkeleton height="8rem" />}>
            <SourcesAndReferences
              content={content}
              sources={topic.sources}
              qualityBadge={topic.qualityBadge}
            />
          </Suspense>
        </>
      )}
    </article>
  );
}

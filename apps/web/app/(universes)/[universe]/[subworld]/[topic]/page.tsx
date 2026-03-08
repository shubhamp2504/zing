/**
 * ⚡ ZING — Topic Page (Server Component)
 * The heart of ZING: cinematic, immersive topic pages
 *
 * Route: /[universe]/[subworld]/[topic]
 *
 * 12 Mandatory sections + 3 extra sections
 * Each wrapped in Suspense with skeleton fallbacks
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { findUniverse } from '@/lib/universes';
import { getTopicBySlug, getTopicForMetadata, getTopicIndex } from '@/lib/queries';
import ViewTracker from '@/components/topic/ViewTracker';
// import GamificationBar from '@/components/topic/GamificationBar'; // disabled for now
import { LanguageToggle } from '@/components/topic/LanguageToggle';
import LikeButton from '@/components/topic/LikeButton';

/* ── Section Imports (lazy-loaded per section) ── */
import TopicCinematicHeader from '@/components/topic/TopicCinematicHeader';
import ContentModeSelector from '@/components/topic/ContentModeSelector';
import SnapViewCard from '@/components/topic/SnapViewCard';
import ReadModeArticle from '@/components/topic/ReadModeArticle';
import TopicVisualization from '@/components/topic/TopicVisualization';
import DesiAnalogyCards from '@/components/topic/DesiAnalogyCards';
// import MemeCorner from '@/components/topic/MemeCorner'; // disabled for now
import ZingConnection from '@/components/topic/ZingConnection';
import RelatedTopics from '@/components/topic/RelatedTopics';
import TipsAndTricks from '@/components/topic/TipsAndTricks';
import MirrorMoment from '@/components/topic/MirrorMoment';
import SourcesAndReferences from '@/components/topic/SourcesAndReferences';
import ReadingProgressBar from '@/components/topic/ReadingProgressBar';
import SectionSkeleton from '@/components/topic/SectionSkeleton';
import StoryMode from '@/components/modes/StoryMode';
import CinematicMode from '@/components/modes/CinematicMode';
import SwipeMode from '@/components/modes/SwipeMode';
import KnowledgeGalaxyWrapper from '@/components/galaxy/KnowledgeGalaxyWrapper';
import ScrollReveal from '@/components/scrollytelling/ScrollReveal';
import ColorDrainSection from '@/components/scrollytelling/ColorDrainSection';
import SilhouetteArmy from '@/components/scrollytelling/SilhouetteArmy';
import { buildStorySlides, buildCinematicScenes, buildSwipeCards } from '@/lib/build-mode-data';

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
    lang?: string;
    mode?: string;
  }>;
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

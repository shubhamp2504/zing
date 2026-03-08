import { prisma } from '@zing/database';

export async function getTopicBySlug(slug: string) {
  return await prisma.topic.findFirst({
    where: { slug, status: 'PUBLISHED', deletedAt: null },
    include: {
      relationsFrom: {
        include: {
          toTopic: {
            select: {
              id: true,
              slug: true,
              title: true,
              universe: true,
              subWorld: true,
              difficulty: true,
              readTimeMinutes: true,
            },
          },
        },
        orderBy: { strength: 'desc' },
        take: 6,
      },
      relationsTo: {
        include: {
          fromTopic: {
            select: {
              id: true,
              slug: true,
              title: true,
              universe: true,
              subWorld: true,
              difficulty: true,
              readTimeMinutes: true,
            },
          },
        },
        orderBy: { strength: 'desc' },
        take: 6,
      },
    },
  });
}

export async function getAllTopicSlugs() {
  const topics = await prisma.topic.findMany({
    where: { status: 'PUBLISHED', deletedAt: null },
    select: { slug: true, universe: true, subWorld: true },
  });
  
  // Convert enums to URL-friendly slugs
  return topics.map(t => ({
    slug: String(t.slug),
    universe: UNIVERSE_TO_SLUG[String(t.universe)] ?? String(t.universe).toLowerCase().replace(/_/g, '-'),
    subWorld: String(t.subWorld),
  }));
}

/**
 * Map URL slug to Prisma Universe enum value
 */
const SLUG_TO_UNIVERSE: Record<string, string> = {
  scholar: 'SCHOLAR',
  'code-cosmos': 'CODE_COSMOS',
  'battle-ground': 'BATTLE_GROUND',
  career: 'CAREER',
  civilization: 'CIVILIZATION',
  knowledge: 'KNOWLEDGE',
  curiosity: 'CURIOSITY',
};

const UNIVERSE_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_TO_UNIVERSE).map(([slug, enumVal]) => [enumVal, slug])
);

export async function getTopicsByUniverse(universeSlug: string) {
  const universeEnum = SLUG_TO_UNIVERSE[universeSlug];
  if (!universeEnum) return [];

  return await prisma.topic.findMany({
    where: {
      universe: universeEnum as any,
      status: 'PUBLISHED',
      deletedAt: null,
    },
    select: {
      slug: true,
      title: true,
      quickShotSummary: true,
      subWorld: true,
      difficulty: true,
      readTimeMinutes: true,
    },
    orderBy: { title: 'asc' },
  });
}

export async function getTopicsBySubWorld(universeSlug: string, subWorldSlug: string) {
  const universeEnum = SLUG_TO_UNIVERSE[universeSlug];
  if (!universeEnum) return [];

  return await prisma.topic.findMany({
    where: {
      universe: universeEnum as any,
      subWorld: subWorldSlug,
      status: 'PUBLISHED',
      deletedAt: null,
    },
    select: {
      slug: true,
      title: true,
      quickShotSummary: true,
      difficulty: true,
      readTimeMinutes: true,
      tags: true,
    },
    orderBy: { title: 'asc' },
  });
}

/**
 * Fetch all published topics as a lightweight index for auto-linking.
 * Returns URL-friendly universe slugs (not DB enum values).
 * Generates keyword aliases from titles for better matching.
 */
export async function getTopicIndex() {
  const topics = await prisma.topic.findMany({
    where: { status: 'PUBLISHED', deletedAt: null },
    select: { slug: true, title: true, universe: true, subWorld: true },
  });

  return topics.map((t) => ({
    slug: String(t.slug),
    title: String(t.title),
    universe: UNIVERSE_TO_SLUG[String(t.universe)] ?? String(t.universe).toLowerCase().replace(/_/g, '-'),
    subWorld: String(t.subWorld),
    aliases: extractKeywords(String(t.title)),
  }));
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been',
  'how', 'what', 'why', 'when', 'where', 'who', 'which',
  'to', 'for', 'of', 'in', 'on', 'at', 'by', 'with', 'from',
  'do', 'does', 'did', 'and', 'or', 'but', 'not', 'your', 'it',
  'its', 'actually', 'works', 'explained', 'beginners', 'absolute',
  'start', 'cracking', 'first',
]);

/** Extract significant keywords from a title for auto-link matching */
function extractKeywords(title: string): string[] {
  const words = title.replace(/[?!&.,]/g, '').split(/\s+/).filter(Boolean);
  const significant = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()) && w.length > 2);

  const aliases: string[] = [];

  // Individual significant words (3+ chars, not stop words)
  for (const w of significant) {
    if (w.length >= 3) aliases.push(w);
  }

  // 2-word significant phrases
  for (let i = 0; i < significant.length - 1; i++) {
    aliases.push(`${significant[i]} ${significant[i + 1]}`);
  }

  return aliases;
}

export async function getTopicForMetadata(slug: string) {
  return await prisma.topic.findFirst({
    where: { slug, status: 'PUBLISHED', deletedAt: null },
    select: {
      title: true,
      quickShotSummary: true,
      subWorld: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

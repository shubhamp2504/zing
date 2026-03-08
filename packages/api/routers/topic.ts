/**
 * ⚡ ZING Topic Router
 * Handles all topic-related queries
 */

import { z } from 'zod';
import { router, publicProcedure } from '../server';
import { TRPCError } from '@trpc/server';

export const topicRouter = router({
  /**
   * Get a single topic by slug (with optional language translation)
   */
  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        language: z.string().default('en'),
      })
    )
    .query(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.findFirst({
        where: {
          slug: input.slug,
          status: 'PUBLISHED',
          deletedAt: null,
        },
        include: {
          translations: true,
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

      if (!topic) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Topic "${input.slug}" not found`,
        });
      }

      // Filter translations for the requested language
      const languageUpper = input.language.toUpperCase();
      const translation = topic.translations.find(
        (t) => t.language === languageUpper
      );

      return {
        ...topic,
        // Override with translated content if available
        displayTitle: translation?.title ?? topic.title,
        displayContent: translation?.content ?? topic.content,
        displaySummary: translation?.quickShotSummary ?? topic.quickShotSummary,
        displayLanguage: translation ? input.language : 'en',
        relatedTopics: [
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
        ],
      };
    }),

  /**
   * List topics by universe and sub-world
   */
  listBySubWorld: publicProcedure
    .input(
      z.object({
        universe: z.string(),
        subWorld: z.string(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const topics = await ctx.prisma.topic.findMany({
        where: {
          universe: input.universe as any,
          subWorld: input.subWorld,
          status: 'PUBLISHED',
          deletedAt: null,
        },
        select: {
          id: true,
          slug: true,
          title: true,
          quickShotSummary: true,
          universe: true,
          subWorld: true,
          difficulty: true,
          readTimeMinutes: true,
          examTags: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
      });

      let nextCursor: string | undefined;
      if (topics.length > input.limit) {
        const next = topics.pop();
        nextCursor = next?.id;
      }

      return { topics, nextCursor };
    }),

  /**
   * Get all published topic slugs (for generateStaticParams)
   */
  getAllSlugs: publicProcedure.query(async ({ ctx }) => {
    const topics = await ctx.prisma.topic.findMany({
      where: { status: 'PUBLISHED', deletedAt: null },
      select: {
        slug: true,
        universe: true,
        subWorld: true,
      },
    });
    return topics;
  }),

  /**
   * Search topics (basic — full Meilisearch in Phase 3)
   */
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(1).max(200),
        limit: z.number().min(1).max(20).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const topics = await ctx.prisma.topic.findMany({
        where: {
          status: 'PUBLISHED',
          deletedAt: null,
          OR: [
            { title: { contains: input.query, mode: 'insensitive' } },
            { quickShotSummary: { contains: input.query, mode: 'insensitive' } },
            { tags: { has: input.query.toLowerCase() } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          quickShotSummary: true,
          universe: true,
          subWorld: true,
          difficulty: true,
          readTimeMinutes: true,
        },
        take: input.limit,
      });

      return topics;
    }),
});

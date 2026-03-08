/**
 * ⚡ ZING Character Router
 */

import { z } from 'zod';
import { router, publicProcedure } from '../server';

export const characterRouter = router({
  /**
   * Get character by slug (for CharacterNarrator component)
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.character.findFirst({
        where: { slug: input.slug, isActive: true },
      });
    }),

  /**
   * Get character for a universe
   */
  getByUniverse: publicProcedure
    .input(z.object({ universe: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.character.findFirst({
        where: {
          universe: input.universe as any,
          isActive: true,
        },
      });
    }),
});

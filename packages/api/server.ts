/**
 * ⚡ ZING tRPC Server — Core setup
 * @module @zing/api/server
 */

import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { prisma } from '@zing/database';

/**
 * Context — available in every procedure
 */
export interface Context {
  prisma: typeof prisma;
  userId?: string;
  language?: string;
}

export function createContext(): Context {
  return {
    prisma,
    language: 'en',
  };
}

/**
 * tRPC Initialization
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error ? error.cause.message : null,
      },
    };
  },
});

/**
 * Exports
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

/**
 * Middleware — require authentication
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});

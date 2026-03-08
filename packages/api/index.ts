/**
 * ⚡ ZING — Root tRPC Router
 * @module @zing/api
 */

import { router, createCallerFactory, createContext } from './server';
import { topicRouter } from './routers/topic';
import { characterRouter } from './routers/character';

/**
 * Root App Router — merges all sub-routers
 */
export const appRouter = router({
  topic: topicRouter,
  character: characterRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Server-side caller (for Server Components)
 */
export const createCaller = createCallerFactory(appRouter);

export function createServerCaller() {
  return createCaller(createContext());
}

export { createContext } from './server';
export type { Context } from './server';

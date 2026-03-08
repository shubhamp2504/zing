/**
 * ⚡ ZING — tRPC HTTP handler (API route)
 */

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createContext } from '@zing/api';

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(),
  });
}

export { handler as GET, handler as POST };

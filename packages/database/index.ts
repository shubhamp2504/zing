/**
 * ⚡ ZING Database Client
 * Re-exports Prisma client for use across the monorepo
 */
export { PrismaClient } from '@prisma/client';
export type * from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Singleton Prisma client instance
 * Prevents multiple connections in development (Next.js hot reload)
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

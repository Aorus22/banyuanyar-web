import { PrismaClient } from '#/prisma/db';

// Dynamically import the D1 adapter only when needed
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Declare global types for Cloudflare environment
declare global {
  var cloudflareEnv:
    | {
        DB?: D1Database;
      }
    | undefined;
}

async function createPrismaClient(): Promise<PrismaClient> {
  // In production with Cloudflare D1
  if (process.env.NODE_ENV === 'production' && globalThis.cloudflareEnv?.DB) {
    const { PrismaD1 } = await import('@prisma/adapter-d1');
    const adapter = new PrismaD1(globalThis.cloudflareEnv.DB);
    return new PrismaClient({ adapter });
  }

  // For development or when D1 is not available
  return new PrismaClient({});
}

// For synchronous usage, we'll create the client immediately
// In production, this should be properly handled with proper async initialization
export const prisma: PrismaClient = (() => {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  // For development or when D1 adapter is not available
  const client = new PrismaClient({});

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }

  return client;
})();

// Export async function for proper D1 initialization in production
export async function getPrismaClient(): Promise<PrismaClient> {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = await createPrismaClient();

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }

  return client;
}

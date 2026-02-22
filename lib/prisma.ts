import { PrismaClient } from '@prisma/client';
import { Console } from 'node:console';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use Transaction Mode pooler (port 6543) if available in env, else fallback to session
const connectionString = process.env.DATABASE_URL_POOLER || process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasourceUrl: connectionString,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
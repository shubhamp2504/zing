import { NextResponse } from 'next/server';
import { prisma } from '@zing/database';

export async function GET() {
  const topics = await prisma.topic.findMany({
    select: { slug: true, title: true, quickShotSummary: true, universe: true, subWorld: true, readTimeMinutes: true, viewCount: true, difficulty: true, tags: true },
    where: { status: 'PUBLISHED' },
    orderBy: { updatedAt: 'desc' },
    take: 6,
  });
  return NextResponse.json(topics);
}

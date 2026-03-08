import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@zing/database';

const RATE_MAP = new Map<string, number>();
const RATE_WINDOW = 2_000; // 2s

/** POST — Increment like count for a topic */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  if (RATE_MAP.get(ip) && now - RATE_MAP.get(ip)! < RATE_WINDOW) {
    return NextResponse.json({ error: 'rate limited' }, { status: 429 });
  }
  RATE_MAP.set(ip, now);
  const { slug } = (await req.json()) as { slug?: string };

  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'slug required' }, { status: 400 });
  }

  const topic = await prisma.topic.updateMany({
    where: { slug },
    data: { likeCount: { increment: 1 } },
  });

  if (topic.count === 0) {
    return NextResponse.json({ error: 'topic not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

/** DELETE — Decrement like count for a topic */
export async function DELETE(req: NextRequest) {
  const { slug } = (await req.json()) as { slug?: string };

  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'slug required' }, { status: 400 });
  }

  // Find topic and decrement (never below 0)
  const topic = await prisma.topic.findFirst({ where: { slug }, select: { id: true, likeCount: true } });
  if (!topic) {
    return NextResponse.json({ error: 'topic not found' }, { status: 404 });
  }

  if (topic.likeCount > 0) {
    await prisma.topic.update({
      where: { id: topic.id },
      data: { likeCount: { decrement: 1 } },
    });
  }

  return NextResponse.json({ success: true });
}

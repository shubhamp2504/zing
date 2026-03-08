import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@zing/database';

const RATE_MAP = new Map<string, number>();
const RATE_WINDOW = 10_000; // 10s

/** POST — Increment view count for a topic */
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

  await prisma.topic.updateMany({
    where: { slug },
    data: { viewCount: { increment: 1 } },
  });

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@zing/database';

/** GET — Fetch DRAFT and REVIEW topics for the pipeline */
export async function GET() {
  const topics = await prisma.topic.findMany({
    where: { status: { in: ['DRAFT', 'REVIEW'] } },
    select: {
      id: true,
      slug: true,
      title: true,
      universe: true,
      subWorld: true,
      difficulty: true,
      status: true,
      readTimeMinutes: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json(topics);
}

/** PATCH — Update a topic's status (approve → PUBLISHED, reject → ARCHIVED) */
export async function PATCH(req: NextRequest) {
  const { id, status } = (await req.json()) as { id?: string; status?: string };

  if (!id || !status) {
    return NextResponse.json({ error: 'id and status required' }, { status: 400 });
  }

  const validStatuses = ['PUBLISHED', 'ARCHIVED', 'REVIEW', 'DRAFT'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const topic = await prisma.topic.update({
    where: { id },
    data: {
      status: status as 'PUBLISHED' | 'ARCHIVED' | 'REVIEW' | 'DRAFT',
      ...(status === 'PUBLISHED' ? { publishedAt: new Date() } : {}),
    },
    select: { id: true, slug: true, status: true },
  });

  return NextResponse.json(topic);
}

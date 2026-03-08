import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@zing/database';

/** POST — Create a topic connection (TopicRelation) */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    fromSlug?: string;
    toSlug?: string;
    relationType?: string;
    connectionText?: string;
    strength?: number;
  };

  const { fromSlug, toSlug, relationType = 'RELATED', connectionText, strength = 0.5 } = body;

  if (!fromSlug || !toSlug) {
    return NextResponse.json({ error: 'fromSlug and toSlug required' }, { status: 400 });
  }

  const validTypes = ['PREREQUISITE', 'RELATED', 'BUILDS_ON', 'OPPOSITE', 'DEEPER'];
  if (!validTypes.includes(relationType)) {
    return NextResponse.json({ error: 'Invalid relationType' }, { status: 400 });
  }

  const [fromTopic, toTopic] = await Promise.all([
    prisma.topic.findUnique({ where: { slug: fromSlug }, select: { id: true } }),
    prisma.topic.findUnique({ where: { slug: toSlug }, select: { id: true } }),
  ]);

  if (!fromTopic) {
    return NextResponse.json({ error: `Topic "${fromSlug}" not found` }, { status: 404 });
  }
  if (!toTopic) {
    return NextResponse.json({ error: `Topic "${toSlug}" not found` }, { status: 404 });
  }

  try {
    const relation = await prisma.topicRelation.create({
      data: {
        fromTopicId: fromTopic.id,
        toTopicId: toTopic.id,
        relationType: relationType as 'PREREQUISITE' | 'RELATED' | 'BUILDS_ON' | 'OPPOSITE' | 'DEEPER',
        strength: Math.max(0, Math.min(1, strength)),
      },
    });
    return NextResponse.json({ success: true, id: relation.id });
  } catch (e: unknown) {
    if (typeof e === 'object' && e !== null && 'code' in e && (e as { code: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Connection already exists' }, { status: 409 });
    }
    throw e;
  }
}

/** GET — List all connections */
export async function GET() {
  const relations = await prisma.topicRelation.findMany({
    select: {
      id: true,
      relationType: true,
      strength: true,
      createdAt: true,
      fromTopic: { select: { slug: true, title: true } },
      toTopic: { select: { slug: true, title: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json(relations);
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@zing/database';

/** POST — Save a translation for a topic */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    topicSlug?: string;
    language?: string;
    title?: string;
    translation?: string;
    regionalContext?: string;
    quality?: string;
  };

  const { topicSlug, language, title, translation, regionalContext, quality = 'AI_DRAFT' } = body;

  if (!topicSlug || !language || !translation) {
    return NextResponse.json({ error: 'topicSlug, language, and translation required' }, { status: 400 });
  }

  const validQualities = ['AI_DRAFT', 'AI_VERIFIED', 'HUMAN', 'COMMUNITY'];
  if (!validQualities.includes(quality)) {
    return NextResponse.json({ error: 'Invalid quality level' }, { status: 400 });
  }

  const topic = await prisma.topic.findUnique({
    where: { slug: topicSlug },
    select: { id: true, title: true },
  });

  if (!topic) {
    return NextResponse.json({ error: `Topic "${topicSlug}" not found` }, { status: 404 });
  }

  const record = await prisma.topicTranslation.upsert({
    where: {
      topicId_language: { topicId: topic.id, language: language as 'HI' | 'MR' | 'TA' | 'TE' | 'BN' | 'GU' | 'KN' | 'ML' | 'PA' | 'OR' | 'SA' },
    },
    update: {
      title: title || topic.title,
      description: translation.slice(0, 500),
      content: { text: translation, regionalContext: regionalContext || '' },
      sections: { blocks: [] },
      translatedBy: quality as 'AI_DRAFT' | 'AI_VERIFIED' | 'HUMAN' | 'COMMUNITY',
    },
    create: {
      topicId: topic.id,
      language: language as 'HI' | 'MR' | 'TA' | 'TE' | 'BN' | 'GU' | 'KN' | 'ML' | 'PA' | 'OR' | 'SA',
      title: title || topic.title,
      description: translation.slice(0, 500),
      content: { text: translation, regionalContext: regionalContext || '' },
      sections: { blocks: [] },
      translatedBy: quality as 'AI_DRAFT' | 'AI_VERIFIED' | 'HUMAN' | 'COMMUNITY',
    },
  });

  return NextResponse.json({ success: true, id: record.id });
}

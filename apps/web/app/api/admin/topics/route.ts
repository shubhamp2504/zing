/**
 * ⚡ Admin API — Create / Publish Topic
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@zing/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, universe, subWorld, content, quickShotSummary, difficulty, tags, examTags, sources, status } = body as {
      title?: string;
      slug?: string;
      universe?: string;
      subWorld?: string;
      content?: string;
      quickShotSummary?: string;
      difficulty?: string;
      tags?: string[];
      examTags?: string[];
      sources?: string[];
      status?: string;
    };

    if (!title || !universe || !subWorld) {
      return NextResponse.json({ error: 'title, universe, and subWorld are required' }, { status: 400 });
    }

    const topicSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Parse content string into structured JSON
    const contentJson = {
      summary: quickShotSummary || '',
      keyFacts: [] as string[],
      sections: content ? [{ id: 'main', title: 'Content', body: content, type: 'text' }] : [],
    };

    const sectionsJson = content
      ? [{ id: 'main', title: 'Content', type: 'text', order: 0 }]
      : [];

    const topic = await prisma.topic.create({
      data: {
        slug: topicSlug,
        title,
        description: quickShotSummary || title,
        universe: universe as any,
        subWorld,
        status: (status as any) || 'DRAFT',
        difficulty: (difficulty as any) || 'BEGINNER',
        content: contentJson,
        sections: sectionsJson,
        mood: {},
        quickShotSummary: quickShotSummary || null,
        tags: tags || [],
        examTags: examTags || [],
        sources: sources || [],
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, slug: topic.slug, id: topic.id });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A topic with this slug already exists' }, { status: 409 });
    }
    console.error('[Admin API] Create topic error:', error);
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
  }
}

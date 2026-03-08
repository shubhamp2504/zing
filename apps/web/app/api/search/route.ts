/**
 * ⚡ Search API Route — /api/search
 *
 * Tries Meilisearch first, falls back to PostgreSQL full-text search.
 * Returns normalized SearchResult[] with highlighting.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('q') ?? '';
  const universe = searchParams.get('universe') ?? undefined;
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 50);

  if (query.length < 2) {
    return NextResponse.json({ results: [], totalHits: 0 });
  }

  // Try Meilisearch
  if (process.env.MEILISEARCH_HOST && process.env.MEILISEARCH_API_KEY) {
    try {
      const { getSearchClient } = await import('@zing/ai/search');
      const client = getSearchClient();
      const searchRes = await client.search({
        query,
        universe,
        limit,
        language: 'en',
        offset: 0,
      });
      return NextResponse.json(searchRes);
    } catch (e) {
      console.warn('[Search] Meilisearch failed, falling back to DB:', e);
    }
  }

  // Fallback: PostgreSQL via tRPC
  try {
    const { createServerCaller } = await import('@zing/api');
    const api = createServerCaller();
    const topics = await (api as any).topic.search({ query, limit });
    return NextResponse.json({
      results: topics.map(
        (t: { slug: string; title: string; quickShotSummary: string | null; universe: string; subWorld: string; examTags?: string[] }) => ({
          slug: t.slug,
          title: t.title,
          hook: t.quickShotSummary ?? '',
          universe: t.universe,
          subWorld: t.subWorld,
          language: 'en',
          examTags: t.examTags ?? [],
          score: 1,
        })
      ),
      totalHits: topics.length,
      processingTimeMs: 0,
      query,
    });
  } catch (e) {
    console.warn('[Search] DB fallback also failed:', e);
    return NextResponse.json({ results: [], totalHits: 0 });
  }
}

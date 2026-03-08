/**
 * ⚡ ZING Guide API — /api/guide
 *
 * Streaming AI agent endpoint. Accepts user messages,
 * runs the tool-using agent loop, streams response.
 */

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, history = [] } = body as {
    message: string;
    history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  };

  if (!message || typeof message !== 'string') {
    return new Response(JSON.stringify({ error: 'Message required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Rate limit: simple in-memory (replace with Redis in production)
  // For now, trust the client — proper rate limiting with upstash later

  try {
    const { runZingGuide } = await import('@zing/ai/guide');
    const { ToolExecutor } = await import('@zing/ai/guide') as any;

    // Build tool executor using tRPC
    const { createServerCaller } = await import('@zing/api');
    const api = createServerCaller() as any;

    const tools = {
      search_topics: async (input: { query: string; universe?: string; limit: number }) => {
        try {
          const results = await api.topic.search({
            query: input.query,
            limit: input.limit,
          });
          return results.map((t: any) => ({
            slug: t.slug,
            title: t.title,
            hook: t.hook,
            universe: t.universe,
          }));
        } catch {
          return [];
        }
      },
      get_topic_full: async (input: { topicSlug: string }) => {
        try {
          const topic = await api.topic.getBySlug({
            slug: input.topicSlug,
            language: 'en',
          });
          if (!topic) return null;
          return {
            title: topic.displayTitle ?? topic.title,
            content: JSON.stringify(topic.content),
            universe: topic.universe,
          };
        } catch {
          return null;
        }
      },
      find_connections: async (input: { topicA: string; topicB: string }) => {
        // For now, return empty — will be enhanced with actual connection logic
        return [];
      },
      get_related: async (input: { topicSlug: string; limit: number }) => {
        try {
          const topic = await api.topic.getBySlug({
            slug: input.topicSlug,
            language: 'en',
          });
          if (!topic?.relatedTopics) return [];
          return topic.relatedTopics.slice(0, input.limit).map((r: any) => ({
            slug: r.slug,
            title: r.title,
            universe: r.universe,
          }));
        } catch {
          return [];
        }
      },
    };

    const result = await runZingGuide(
      message,
      history.map((h) => ({ role: h.role, content: h.content })),
      tools
    );

    return new Response(
      JSON.stringify({
        text: result.text,
        citations: result.citations,
        toolCallsUsed: result.toolCallsUsed,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (e) {
    console.error('[Guide] Error:', e);
    return new Response(
      JSON.stringify({
        text: 'Arre yaar, kuch technical issue aa gaya. Please try again! 🙏',
        citations: [],
        toolCallsUsed: 0,
        error: true,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

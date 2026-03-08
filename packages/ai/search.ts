/**
 * ⚡ ZING Search — Meilisearch client + fallback
 *
 * Primary: Meilisearch (100K docs free tier)
 * Fallback: PostgreSQL full-text search via tRPC
 */

import { z } from 'zod';

// ─── Types ──────────────────────────────────────────────

export const SearchInputSchema = z.object({
  query: z.string().min(1).max(200),
  universe: z.string().optional(),
  language: z.string().default('en'),
  limit: z.number().min(1).max(50).default(10),
  offset: z.number().default(0),
});

export type SearchInput = z.infer<typeof SearchInputSchema>;

export interface SearchResult {
  slug: string;
  title: string;
  hook: string;
  universe: string;
  subWorld: string;
  language: string;
  examTags: string[];
  /** Relevance score 0-1 */
  score: number;
  /** Highlighted matches in title */
  highlightedTitle?: string;
  /** Highlighted matches in hook */
  highlightedHook?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalHits: number;
  processingTimeMs: number;
  query: string;
}

// ─── Meilisearch Client ─────────────────────────────────

class MeilisearchClient {
  private host: string;
  private apiKey: string;
  private indexName = 'topics';

  constructor() {
    this.host = process.env.MEILISEARCH_HOST ?? 'http://localhost:7700';
    this.apiKey = process.env.MEILISEARCH_API_KEY ?? '';
  }

  private async fetch(path: string, options?: RequestInit): Promise<Response> {
    return fetch(`${this.host}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        ...options?.headers,
      },
    });
  }

  async search(input: SearchInput): Promise<SearchResponse> {
    const body: Record<string, unknown> = {
      q: input.query,
      limit: input.limit,
      offset: input.offset,
      attributesToHighlight: ['title', 'hook'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    };

    if (input.universe) {
      body.filter = `universe = "${input.universe}"`;
    }

    const res = await this.fetch(`/indexes/${this.indexName}/search`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Meilisearch error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as {
      hits: Array<{
        slug: string;
        title: string;
        hook: string;
        universe: string;
        subWorld: string;
        language: string;
        examTags: string[];
        _formatted?: { title?: string; hook?: string };
      }>;
      estimatedTotalHits: number;
      processingTimeMs: number;
      query: string;
    };

    return {
      results: data.hits.map((hit, index) => ({
        slug: hit.slug,
        title: hit.title,
        hook: hit.hook,
        universe: hit.universe,
        subWorld: hit.subWorld,
        language: hit.language ?? 'en',
        examTags: hit.examTags ?? [],
        score: 1 - index * 0.05, // approximate score from position
        highlightedTitle: hit._formatted?.title,
        highlightedHook: hit._formatted?.hook,
      })),
      totalHits: data.estimatedTotalHits,
      processingTimeMs: data.processingTimeMs,
      query: data.query,
    };
  }

  /**
   * Sync topics from database to Meilisearch index.
   * Call during content pipeline or after topic publish.
   */
  async indexTopics(
    topics: Array<{
      id: string;
      slug: string;
      title: string;
      hook: string;
      universe: string;
      subWorld: string;
      examTags: string[];
      language?: string;
    }>
  ): Promise<{ taskUid: number }> {
    const res = await this.fetch(`/indexes/${this.indexName}/documents`, {
      method: 'POST',
      body: JSON.stringify(topics),
    });

    if (!res.ok) {
      throw new Error(`Meilisearch indexing error: ${res.status}`);
    }

    return (await res.json()) as { taskUid: number };
  }

  /**
   * Configure Meilisearch index settings.
   * Call once during setup.
   */
  async configureIndex(): Promise<void> {
    // Searchable attributes
    await this.fetch(`/indexes/${this.indexName}/settings`, {
      method: 'PATCH',
      body: JSON.stringify({
        searchableAttributes: ['title', 'hook', 'examTags'],
        filterableAttributes: ['universe', 'subWorld', 'language', 'examTags'],
        sortableAttributes: ['title', 'createdAt'],
        displayedAttributes: [
          'slug',
          'title',
          'hook',
          'universe',
          'subWorld',
          'language',
          'examTags',
        ],
        rankingRules: [
          'words',
          'typo',
          'proximity',
          'attribute',
          'sort',
          'exactness',
        ],
      }),
    });
  }
}

// ─── Singleton ──────────────────────────────────────────

let _client: MeilisearchClient | null = null;

export function getSearchClient(): MeilisearchClient {
  if (!_client) _client = new MeilisearchClient();
  return _client;
}

// ─── Search Placeholders (rotating Hindi/English) ───────

export const SEARCH_PLACEHOLDERS = [
  'Karna kyu hara...',
  'Black holes explain karo...',
  'Git rebase vs merge...',
  'Photosynthesis Hinglish mein...',
  'Partition 1947 ke baad...',
  'What is quantum entanglement?',
  'DNA replication steps...',
  'Ashoka ne Buddhism kyu apnaya...',
  'How does blockchain work?',
  'Mughal architecture styles...',
] as const;

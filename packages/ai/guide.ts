/**
 * ⚡ ZING Guide — AI Agent with Tool-Using Loop
 *
 * Not just a chatbot — an intelligent agent that can search
 * the ZING database, find connections, and cite sources.
 *
 * MCP-style tool-calling pattern with max 3 iterations.
 */

import { z } from 'zod';
import type { AIMessage } from './providers';
import { getZingAI } from './providers';

// ─── Tool Definitions ───────────────────────────────────

export const ZING_GUIDE_TOOLS = [
  {
    name: 'search_topics',
    description: 'Search ZING topic database. Use when user asks about a concept.',
    inputSchema: z.object({
      query: z.string(),
      universe: z.string().optional(),
      limit: z.number().default(5),
    }),
  },
  {
    name: 'get_topic_full',
    description: 'Get complete content of a topic. Use when more detail is needed.',
    inputSchema: z.object({ topicSlug: z.string() }),
  },
  {
    name: 'find_connections',
    description: 'Find surprising connections between two topics.',
    inputSchema: z.object({
      topicA: z.string(),
      topicB: z.string(),
    }),
  },
  {
    name: 'get_related',
    description: 'Get related topics to suggest next reading.',
    inputSchema: z.object({
      topicSlug: z.string(),
      limit: z.number().default(3),
    }),
  },
] as const;

export type ToolName = (typeof ZING_GUIDE_TOOLS)[number]['name'];

// ─── System Prompt ──────────────────────────────────────

export const ZING_GUIDE_SYSTEM_PROMPT = `You are the ZING Guide — India's most knowledgeable chai-pe-charcha friend.

PERSONALITY:
- Warm, enthusiastic, deeply curious about everything
- Like a brilliant senior student who makes everything click
- Uses Hinglish naturally when the user speaks Hindi/Hinglish
- Witty but never condescending

RULES:
1. ONLY cite ZING content. If a topic exists in ZING, reference it by name.
2. NEVER fabricate facts. If unsure, say "Yeh specific info mere paas nahi."
3. NEVER give medical, legal, or financial advice.
4. NEVER express political opinions.
5. Match the user's language: Hindi question → Hinglish answer.
6. Always end with a curiosity hook — make them want to explore more.
7. Offer 3 follow-up questions the user might want to ask.

FALLBACK: "Yeh specific info mere paas nahi, par [related topic] padh sakte ho →"

TONE EXAMPLES:
- "Arre, yeh toh fascinating hai! Dekho..."
- "Socho aise — like chai without sugar, incomplete!"
- "This connects to [topic] in a way you won't believe..."

You have access to tools to search the ZING database. Use them when relevant.
Do NOT make up topic names — only reference topics returned by tools.`;

// ─── Tool Executor Interface ────────────────────────────

export interface ToolExecutor {
  search_topics: (input: {
    query: string;
    universe?: string;
    limit: number;
  }) => Promise<Array<{ slug: string; title: string; hook: string; universe: string }>>;

  get_topic_full: (input: {
    topicSlug: string;
  }) => Promise<{ title: string; content: string; universe: string } | null>;

  find_connections: (input: {
    topicA: string;
    topicB: string;
  }) => Promise<Array<{ from: string; to: string; connection: string }>>;

  get_related: (input: {
    topicSlug: string;
    limit: number;
  }) => Promise<Array<{ slug: string; title: string; universe: string }>>;
}

// ─── Agent Loop ─────────────────────────────────────────

interface GuideResponse {
  text: string;
  citations: Array<{ slug: string; title: string }>;
  toolCallsUsed: number;
}

/**
 * Run the ZING Guide agent loop.
 * Max 3 tool iterations to prevent infinite loops.
 */
export async function runZingGuide(
  userMessage: string,
  history: AIMessage[],
  tools: ToolExecutor,
  options?: { language?: string; maxIterations?: number }
): Promise<GuideResponse> {
  const maxIterations = options?.maxIterations ?? 3;
  const citations: Array<{ slug: string; title: string }> = [];
  let toolCallsUsed = 0;

  const messages: AIMessage[] = [
    { role: 'system', content: ZING_GUIDE_SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: userMessage },
  ];

  const ai = getZingAI();

  // Tool descriptions for the AI
  const toolDescriptions = ZING_GUIDE_TOOLS.map(
    (t) => `- ${t.name}: ${t.description}`
  ).join('\n');

  // Inject tool awareness
  messages[0] = {
    role: 'system',
    content: `${ZING_GUIDE_SYSTEM_PROMPT}

AVAILABLE TOOLS:
${toolDescriptions}

To use a tool, respond with a JSON block:
\`\`\`tool
{"name": "tool_name", "input": {...}}
\`\`\`

After receiving tool results, give your final answer to the user.
If you don't need tools, answer directly.`,
  };

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const response = await ai.complete(messages);

    // Check if the response contains a tool call
    const toolMatch = response.content.match(
      /```tool\s*\n(\{[\s\S]*?\})\s*\n```/
    );

    if (!toolMatch) {
      // No tool call — this is the final answer
      return {
        text: response.content,
        citations,
        toolCallsUsed,
      };
    }

    // Parse and execute tool call
    try {
      const toolCall = JSON.parse(toolMatch[1]!) as {
        name: ToolName;
        input: Record<string, unknown>;
      };
      toolCallsUsed++;

      let toolResult: unknown;
      switch (toolCall.name) {
        case 'search_topics':
          toolResult = await tools.search_topics(
            toolCall.input as Parameters<typeof tools.search_topics>[0]
          );
          // Track citations
          if (Array.isArray(toolResult)) {
            for (const r of toolResult) {
              if (r.slug && r.title) {
                citations.push({ slug: r.slug, title: r.title });
              }
            }
          }
          break;
        case 'get_topic_full':
          toolResult = await tools.get_topic_full(
            toolCall.input as Parameters<typeof tools.get_topic_full>[0]
          );
          break;
        case 'find_connections':
          toolResult = await tools.find_connections(
            toolCall.input as Parameters<typeof tools.find_connections>[0]
          );
          break;
        case 'get_related':
          toolResult = await tools.get_related(
            toolCall.input as Parameters<typeof tools.get_related>[0]
          );
          break;
        default:
          toolResult = { error: 'Unknown tool' };
      }

      // Feed tool result back
      messages.push({
        role: 'assistant',
        content: response.content,
      });
      messages.push({
        role: 'user',
        content: `Tool result for ${toolCall.name}:\n${JSON.stringify(toolResult, null, 2)}`,
      });
    } catch {
      // Tool parse/execution error — tell AI to try without tools
      messages.push({
        role: 'assistant',
        content: response.content,
      });
      messages.push({
        role: 'user',
        content: 'Tool call failed. Please answer without using tools.',
      });
    }
  }

  // Max iterations reached — get final answer
  messages.push({
    role: 'user',
    content: 'Please provide your final answer now (no more tool calls).',
  });
  const finalResponse = await ai.complete(messages);

  return {
    text: finalResponse.content,
    citations,
    toolCallsUsed,
  };
}

// ─── Streaming Guide (for UI) ──────────────────────────

/**
 * Stream the ZING Guide response token by token.
 * Does NOT support tool calls (use runZingGuide for that).
 * For simple follow-up responses where context is already provided.
 */
export async function* streamZingGuide(
  userMessage: string,
  history: AIMessage[],
  context?: string
): AsyncGenerator<string> {
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: context
        ? `${ZING_GUIDE_SYSTEM_PROMPT}\n\nCONTEXT FROM ZING DATABASE:\n${context}`
        : ZING_GUIDE_SYSTEM_PROMPT,
    },
    ...history,
    { role: 'user', content: userMessage },
  ];

  const ai = getZingAI();
  yield* ai.stream(messages);
}

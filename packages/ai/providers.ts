/**
 * ⚡ ZING AI — Provider Abstraction Layer
 *
 * Swap Groq → Gemini → Claude without changing app code.
 * Automatic fallback chain. Rate-limit aware.
 */

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  tokensUsed: number;
  model: string;
}

export interface AIProviderOptions {
  stream?: boolean;
  maxTokens?: number;
  json?: boolean;
  temperature?: number;
}

export interface AIProvider {
  name: string;
  complete(
    messages: AIMessage[],
    options?: AIProviderOptions
  ): Promise<AIResponse>;
  stream(messages: AIMessage[]): AsyncGenerator<string>;
}

// ─── Groq Provider ──────────────────────────────────────

class GroqProvider implements AIProvider {
  name = 'groq';

  async complete(
    messages: AIMessage[],
    options: AIProviderOptions = {}
  ): Promise<AIResponse> {
    const { default: Groq } = await import('groq-sdk');
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY! });
    const res = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      max_tokens: options.maxTokens ?? 2048,
      temperature: options.temperature ?? 0.7,
      ...(options.json ? { response_format: { type: 'json_object' as const } } : {}),
    });

    return {
      content: res.choices[0]?.message?.content ?? '',
      tokensUsed: res.usage?.total_tokens ?? 0,
      model: 'groq/llama-3.3-70b',
    };
  }

  async *stream(messages: AIMessage[]): AsyncGenerator<string> {
    const { default: Groq } = await import('groq-sdk');
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY! });
    const stream = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      max_tokens: 2048,
      temperature: 0.7,
      stream: true,
    });
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) yield delta;
    }
  }
}

// ─── Gemini Provider ────────────────────────────────────

class GeminiProvider implements AIProvider {
  name = 'gemini';

  async complete(
    messages: AIMessage[],
    options: AIProviderOptions = {}
  ): Promise<AIResponse> {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Convert messages → Gemini format
    const systemInstruction = messages.find((m) => m.role === 'system')?.content;
    const history = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
        parts: [{ text: m.content }],
      }));

    const lastMessage = history.pop();
    const chat = model.startChat({
      history,
      ...(systemInstruction ? { systemInstruction } : {}),
    });

    const res = await chat.sendMessage(lastMessage?.parts[0]?.text ?? '');
    const text = res.response.text();

    return {
      content: text,
      tokensUsed: text.length / 4, // approximate
      model: 'gemini/gemini-2.5-flash',
    };
  }

  async *stream(messages: AIMessage[]): AsyncGenerator<string> {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemInstruction = messages.find((m) => m.role === 'system')?.content;
    const history = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
        parts: [{ text: m.content }],
      }));

    const lastMessage = history.pop();
    const chat = model.startChat({
      history,
      ...(systemInstruction ? { systemInstruction } : {}),
    });

    const res = await chat.sendMessageStream(lastMessage?.parts[0]?.text ?? '');
    for await (const chunk of res.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  }
}

// ─── ZingAI Main Class ─────────────────────────────────

export class ZingAI {
  private providers: AIProvider[] = [];

  constructor() {
    if (process.env.GROQ_API_KEY) this.providers.push(new GroqProvider());
    if (process.env.GEMINI_API_KEY) this.providers.push(new GeminiProvider());
  }

  async complete(
    messages: AIMessage[],
    options: AIProviderOptions = {}
  ): Promise<AIResponse> {
    if (this.providers.length === 0) {
      throw new Error('No AI providers configured. Set GROQ_API_KEY or GEMINI_API_KEY.');
    }

    for (const provider of this.providers) {
      try {
        return await provider.complete(messages, options);
      } catch (e) {
        console.warn(`[ZingAI] ${provider.name} failed, trying next...`, e);
        continue;
      }
    }
    throw new Error('[ZingAI] All AI providers failed');
  }

  async *stream(messages: AIMessage[]): AsyncGenerator<string> {
    if (this.providers.length === 0) {
      throw new Error('No AI providers configured.');
    }

    for (const provider of this.providers) {
      try {
        yield* provider.stream(messages);
        return;
      } catch (e) {
        console.warn(`[ZingAI] ${provider.name} stream failed, trying next...`, e);
        continue;
      }
    }
    throw new Error('[ZingAI] All AI providers failed (streaming)');
  }

  get availableProviders(): string[] {
    return this.providers.map((p) => p.name);
  }
}

// Singleton
let _instance: ZingAI | null = null;
export function getZingAI(): ZingAI {
  if (!_instance) _instance = new ZingAI();
  return _instance;
}

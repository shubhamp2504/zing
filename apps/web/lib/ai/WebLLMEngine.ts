/**
 * ⚡ WebLLM Offline AI Engine
 *
 * Downloads a small LLM to IndexedDB for offline usage.
 * Used when user has no internet (exam halls, rural areas).
 * VIDYARTHI subscription feature.
 */

// WebLLM types (dynamic import — library may not be installed)
type ProgressCallback = (progress: { text: string; progress: number }) => void;

export class ZingOfflineAI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private engine: any = null;
  private _isReady = false;
  private _isLoading = false;
  private modelId = 'Llama-3.2-3B-Instruct-q4f16_1-MLC';

  get isReady() {
    return this._isReady;
  }

  get isLoading() {
    return this._isLoading;
  }

  /**
   * Check if model is already downloaded (IndexedDB)
   */
  async isModelCached(): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false;
      // Check IndexedDB for cached model
      const dbs = await window.indexedDB.databases();
      return dbs.some((db) => db.name?.includes('webllm') || db.name?.includes('mlc'));
    } catch {
      return false;
    }
  }

  /**
   * Initialize WebLLM engine. Downloads model if not cached (~1.8GB).
   */
  async initialize(onProgress?: ProgressCallback): Promise<void> {
    if (this._isReady || this._isLoading) return;
    this._isLoading = true;

    try {
      // Dynamic import — WebLLM is a large library
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const webllm = (await import('@mlc-ai/web-llm' as any)) as any;

      this.engine = await webllm.CreateMLCEngine(this.modelId, {
        initProgressCallback: (report: { text: string; progress: number }) => {
          onProgress?.({
            text: report.text,
            progress: report.progress,
          });
        },
      });

      this._isReady = true;
    } catch (error) {
      console.error('WebLLM initialization failed:', error);
      throw new Error('Failed to initialize offline AI. Your browser may not support WebGPU.');
    } finally {
      this._isLoading = false;
    }
  }

  /**
   * Ask a question to the offline LLM
   */
  async ask(question: string, context?: string): Promise<string> {
    if (!this._isReady || !this.engine) {
      throw new Error('Offline AI not initialized. Call initialize() first.');
    }

    const systemPrompt = `You are ZING's offline study assistant for Indian students.
You help with topics from Science, History, Math, Geography, Civics, Economics, and Culture.
Respond in simple Hinglish (mix of Hindi and English).
Be concise — you're running on a phone with limited resources.
${context ? `\nContext about the current topic:\n${context}` : ''}`;

    try {
      const response = await this.engine.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
        max_tokens: 512,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content ?? 'Sorry, kuch samajh nahi aaya. Try again?';
    } catch (error) {
      console.error('Offline AI query failed:', error);
      return 'Offline AI mein error aa gaya. Page refresh karke try karo.';
    }
  }

  /**
   * Clean up resources
   */
  async destroy(): Promise<void> {
    if (this.engine) {
      try {
        await this.engine.unload();
      } catch {
        // Ignore cleanup errors
      }
      this.engine = null;
      this._isReady = false;
    }
  }
}

// Singleton
let instance: ZingOfflineAI | null = null;

export function getOfflineAI(): ZingOfflineAI {
  if (!instance) {
    instance = new ZingOfflineAI();
  }
  return instance;
}

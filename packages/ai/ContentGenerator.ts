/**
 * ⚡ AI Content Generator — Structured topic/translation generation
 *
 * Uses ZingAI providers (Groq → Gemini fallback) to generate
 * ZING-quality educational content with Zod validation.
 */
import { z } from 'zod';
import { getZingAI } from './providers';

// ─── Schemas ───────────────────────────────────────

const TopicContentSchema = z.object({
  title: z.string().min(3),
  slug: z.string(),
  universe: z.string(),
  subWorld: z.string(),
  quickShotSummary: z.string().max(280),
  content: z.object({
    snapView: z.array(z.string()).min(3).max(6),
    readMode: z.string().min(200),
    desiAnalogies: z.array(z.object({
      title: z.string(),
      analogy: z.string(),
      relation: z.string(),
    })).min(1),
    memeCorner: z.array(z.object({
      text: z.string(),
      format: z.string(),
    })),
    tipsAndTricks: z.array(z.string()),
    mirrorMoment: z.string(),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url().optional(),
      type: z.string(),
    })),
  }),
  examTags: z.array(z.string()),
  mood: z.string().optional(),
  zingMomentFlash: z.string(),
});

const TranslationContentSchema = z.object({
  title: z.string(),
  quickShotSummary: z.string(),
  content: z.record(z.unknown()),
  translationNotes: z.string().optional(),
  qualityScore: z.number().min(0).max(1),
});

export type TopicContent = z.infer<typeof TopicContentSchema>;
export type TranslationContent = z.infer<typeof TranslationContentSchema>;

// ─── Generator ─────────────────────────────────────

const TOPIC_SYSTEM_PROMPT = `You are ZING's AI content generator for Indian education.
Generate educational topics in ZING's signature style:
- Cinematic, engaging, story-driven
- Hinglish-friendly (mix Hindi + English naturally)
- Desi analogies (relate to Indian daily life, cricket, Bollywood, chai)
- Exam-relevant (UPSC, SSC, state PSCs)
- Include "Zing Moment Flash" — the one-line insight that creates an "aha!"

OUTPUT: Valid JSON matching the schema exactly. No markdown wrapping.`;

const TRANSLATION_PROMPTS: Record<string, string> = {
  hi: 'Translate to Hindi (हिंदी). Use UPSC-style formal Hindi. Desi context should feel natural, not translated.',
  mr: 'Translate to Marathi (मराठी). Use Maharashtra-specific context, MPSC relevance.',
  ta: 'Translate to Tamil (தமிழ்). Use Tamil Nadu context, TN PSC relevance.',
  te: 'Translate to Telugu (తెలుగు). Use Andhra/Telangana context.',
  bn: 'Translate to Bengali (বাংলা). Use West Bengal/Bangladesh context, WBPSC relevance.',
  gu: 'Translate to Gujarati (ગુજરાતી). Use Gujarat context, GPSC relevance.',
  kn: 'Translate to Kannada (ಕನ್ನಡ). Use Karnataka context, KPSC relevance.',
  ml: 'Translate to Malayalam (മലയാളം). Use Kerala context, Kerala PSC relevance.',
  pa: 'Translate to Punjabi (ਪੰਜਾਬੀ). Use Punjab context, PPSC relevance.',
  or: 'Translate to Odia (ଓଡ଼ିଆ). Use Odisha context, OPSC relevance.',
  sa: 'Translate to Sanskrit (संस्कृतम्). Classical Sanskrit, scholarly tone.',
};

export async function generateTopic(
  title: string,
  universe: string,
  subWorld: string
): Promise<TopicContent> {
  const ai = getZingAI();

  const prompt = `Generate a ZING topic about: "${title}"
Universe: ${universe}
Sub-world: ${subWorld}

Required JSON structure:
{
  "title": "Display title",
  "slug": "url-friendly-slug",
  "universe": "${universe}",
  "subWorld": "${subWorld}",
  "quickShotSummary": "280-char max hook",
  "content": {
    "snapView": ["Point 1", "Point 2", ...], // 3-6 key points
    "readMode": "Full article (500+ words, engaging, Hinglish-friendly)",
    "desiAnalogies": [{ "title": "", "analogy": "", "relation": "" }],
    "memeCorner": [{ "text": "", "format": "comparison|timeline|table" }],
    "tipsAndTricks": ["Exam tip 1", ...],
    "mirrorMoment": "Reflective question for the student",
    "sources": [{ "title": "", "url": "", "type": "textbook|article|lecture" }]
  },
  "examTags": ["UPSC", "SSC"],
  "mood": "curious|intense|playful",
  "zingMomentFlash": "The AHA insight that makes this topic unforgettable"
}`;

  const response = await ai.generate(TOPIC_SYSTEM_PROMPT, prompt);

  // Parse and validate
  const parsed = JSON.parse(response);
  return TopicContentSchema.parse(parsed);
}

export async function generateTranslation(
  englishContent: TopicContent,
  targetLanguage: string
): Promise<TranslationContent> {
  const ai = getZingAI();

  const langPrompt = TRANSLATION_PROMPTS[targetLanguage] ?? 'Translate to the target language.';

  const prompt = `${langPrompt}

Translate this ZING topic content:

Title: ${englishContent.title}
Summary: ${englishContent.quickShotSummary}
Content: ${JSON.stringify(englishContent.content, null, 2)}
Zing Moment: ${englishContent.zingMomentFlash}

OUTPUT JSON:
{
  "title": "Translated title",
  "quickShotSummary": "Translated summary",
  "content": { /* same structure, translated */ },
  "translationNotes": "Any cultural adaptation notes",
  "qualityScore": 0.0-1.0
}`;

  const response = await ai.generate(
    'You are a professional translator specializing in Indian languages for education. Translate accurately while preserving the engaging ZING style.',
    prompt
  );

  const parsed = JSON.parse(response);
  return TranslationContentSchema.parse(parsed);
}

/**
 * Quality scoring — checks required fields presence
 */
export function scoreTopicQuality(topic: TopicContent): {
  score: number;
  missing: string[];
} {
  const checks = [
    { name: 'title', pass: topic.title.length >= 3 },
    { name: 'quickShotSummary', pass: topic.quickShotSummary.length > 0 },
    { name: 'snapView (3+)', pass: topic.content.snapView.length >= 3 },
    { name: 'readMode (200+ chars)', pass: topic.content.readMode.length >= 200 },
    { name: 'desiAnalogies', pass: topic.content.desiAnalogies.length >= 1 },
    { name: 'tipsAndTricks', pass: topic.content.tipsAndTricks.length >= 1 },
    { name: 'mirrorMoment', pass: topic.content.mirrorMoment.length > 0 },
    { name: 'sources', pass: topic.content.sources.length >= 1 },
    { name: 'examTags', pass: topic.examTags.length >= 1 },
    { name: 'zingMomentFlash', pass: topic.zingMomentFlash.length > 0 },
  ];

  const passed = checks.filter((c) => c.pass);
  const missing = checks.filter((c) => !c.pass).map((c) => c.name);

  return {
    score: passed.length / checks.length,
    missing,
  };
}

/**
 * ⚡ ZING Lens API — Gemini Vision for concept identification
 *
 * Accepts image as base64, identifies educational concept,
 * returns matching ZING topic path.
 */
import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are ZING Lens, an AI that identifies educational concepts from images.
You serve Indian students (Class 6-12, UPSC, state PSCs).

When you see an image:
1. Identify the main educational concept (science, history, math, geography, civics, economics, culture)
2. Map it to a ZING universe and topic
3. Explain what you see in simple Hinglish

Respond in JSON:
{
  "concept": "Name of the concept",
  "universe": "science|history|math|geography|civics|economics|culture",
  "zingPath": "/universe/subworld/topic-slug",
  "explanation": "Brief Hinglish explanation of what you identified",
  "confidence": 0.0-1.0,
  "examRelevance": ["UPSC", "SSC"] // which exams this is relevant for
}

If you cannot identify an educational concept, return:
{
  "concept": null,
  "explanation": "Yeh image mein koi educational concept nahi mila. Try a clearer photo of a textbook, diagram, or monument!",
  "confidence": 0
}`;

// Simple in-memory rate limit (per IP, resets hourly)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

    // Rate limit: 10 scans/hour for guests
    if (!checkRateLimit(ip, 10)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in an hour.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { image, mimeType } = body as { image?: string; mimeType?: string };

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: 'Missing image or mimeType' },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        {
          concept: 'Photosynthesis',
          universe: 'science',
          zingPath: '/science/biology/photosynthesis',
          explanation: 'Demo mode — Gemini API key not configured. This is a sample response.',
          confidence: 0.5,
          examRelevance: ['UPSC'],
        },
        { status: 200 }
      );
    }

    // Call Gemini 2.5 Pro with vision
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: SYSTEM_PROMPT },
                {
                  inlineData: {
                    mimeType,
                    data: image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini Vision error:', err);
      return NextResponse.json(
        { error: 'AI processing failed. Try again.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 502 }
      );
    }

    const result = JSON.parse(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('ZING Lens error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

# 📡 ZING API Documentation

Complete reference for all API endpoints and tRPC procedures.

---

## 🔗 Base URLs

- **Development**: `http://localhost:3000`
- **Production**: `https://your-app.vercel.app`

---

## 📚 tRPC API

ZING uses tRPC for type-safe API calls. All procedures are available at `/api/trpc`.

### Client Setup

```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@repo/api';

export const trpc = createTRPCReact<AppRouter>();
```

---

## 🔍 Topic Router

### `topic.getBySlug`

Get full topic details by slug.

**Input:**
```typescript
{
  slug: string;
  language?: 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn' | 'gu' | 'kn' | 'ml' | 'pa' | 'or';
}
```

**Output:**
```typescript
{
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  universe: string;
  subWorld: string;
  displayTitle: string;        // Translated if language param provided
  displayContent: object;       // Translated content
  displaySummary: string;       // Translated quickShotSummary
  quickShotSummary: string;
  content: {
    snapView: string[];
    readMode: string;
    desiAnalogies: Array<{
      title: string;
      analogy: string;
      relation: string;
    }>;
    memeCorner: Array<{
      text: string;
      format: string;
    }>;
    tipsAndTricks: string[];
    mirrorMoment: string;
    sources: Array<{
      title: string;
      url?: string;
      type: string;
    }>;
  };
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  readingTime: number;          // In minutes
  examTags: string[];
  mood: string;
  zingMomentFlash: string;
  relatedTopics: Array<{
    id: string;
    slug: string;
    title: string;
    universe: string;
    relationType: 'PREREQUISITE' | 'RELATED' | 'LEADS_TO' | 'CONTRAST';
    strength: number;             // 0-1
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

**Usage:**
```typescript
const { data, isLoading } = trpc.topic.getBySlug.useQuery({ 
  slug: 'pythagorean-theorem',
  language: 'hi' 
});
```

---

### `topic.listBySubWorld`

Get paginated topics for a sub-world.

**Input:**
```typescript
{
  universe: string;
  subWorld: string;
  cursor?: string;              // For pagination
  limit?: number;               // Default: 20, Max: 100
}
```

**Output:**
```typescript
{
  topics: Array<{
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    quickShotSummary: string;
    readingTime: number;
    difficulty: string;
    mood: string;
  }>;
  nextCursor?: string;
}
```

**Usage:**
```typescript
const { data, fetchNextPage } = trpc.topic.listBySubWorld.useInfiniteQuery(
  { universe: 'scholar', subWorld: 'math', limit: 20 },
  { getNextPageParam: (lastPage) => lastPage.nextCursor }
);
```

---

### `topic.getAllSlugs`

Get all topic slugs for static generation.

**Output:**
```typescript
Array<{
  universe: string;
  subWorld: string;
  slug: string;
}>
```

**Usage:**
```typescript
// For generateStaticParams
export async function generateStaticParams() {
  const caller = await createServerCaller();
  return caller.topic.getAllSlugs();
}
```

---

### `topic.search`

Search topics by query.

**Input:**
```typescript
{
  query: string;
  universe?: string;            // Filter by universe
  limit?: number;               // Default: 10
}
```

**Output:**
```typescript
{
  results: Array<{
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    universe: string;
    subWorld: string;
    quickShotSummary: string;
    _score: number;             // Relevance score
  }>;
}
```

---

## 👤 Character Router

### `character.getBySlug`

Get character details.

**Input:**
```typescript
{
  slug: string;
}
```

**Output:**
```typescript
{
  id: string;
  slug: string;
  name: string;
  description: string;
  universe: string;
  riveStateMachines: {
    idle: string;
    talking: string;
    celebrating: string;
    thinking: string;
  };
  staticImageUrl: string;
  era: string;
  nationality: string;
  knownFor: string;
}
```

---

### `character.getByUniverse`

Get all characters for a universe.

**Input:**
```typescript
{
  universe: string;
}
```

**Output:**
```typescript
Array<Character>
```

---

## 🔎 REST API Routes

### `POST /api/search`

Meilisearch-powered search with PostgreSQL fallback.

**Request Body:**
```json
{
  "query": "photosynthesis",
  "universe": "science",        // Optional filter
  "limit": 10
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "...",
      "slug": "photosynthesis",
      "title": "Photosynthesis",
      "subtitle": "How plants convert sunlight into food",
      "universe": "science",
      "subWorld": "biology",
      "quickShotSummary": "...",
      "score": 0.95
    }
  ],
  "processingTime": 12,           // In milliseconds
  "source": "meilisearch"         // Or "postgresql"
}
```

**Response Codes:**
- `200` — Success
- `400` — Invalid query (empty or too short)
- `500` — Search service error

---

### `POST /api/guide`

ZING Guide AI agent endpoint (tool-using agent).

**Request Body:**
```json
{
  "message": "Explain Newton's laws in simple Hindi",
  "sessionId": "user-123",        // Optional for context
  "context": {                    // Optional
    "currentTopic": "newton-laws",
    "universe": "science"
  }
}
```

**Response (Streaming):**
```json
// Server-Sent Events (text/event-stream)
data: {"type":"thinking","message":"Searching for related topics..."}
data: {"type":"tool","name":"search_topics","args":{"query":"Newton laws"}}
data: {"type":"chunk","content":"Newton ke teen laws hain..."}
data: {"type":"chunk","content":" pehla law kehta hai ki..."}
data: {"type":"citation","source":"newton-laws-explained","title":"Newton's Laws"}
data: {"type":"done"}
```

**Response Types:**
- `thinking` — Agent is processing
- `tool` — Agent is calling a tool
- `chunk` — Streaming text response
- `citation` — Source reference
- `done` — Stream complete

**Rate Limiting:**
- **Guest users**: 10 queries/day
- **VIDYARTHI users**: 100 queries/day

---

### `POST /api/zing-lens`

Gemini Vision concept identification from camera input.

**Request Body:**
```json
{
  "image": "base64_encoded_image_data",
  "mimeType": "image/jpeg"
}
```

**Response:**
```json
{
  "concept": "Photosynthesis",
  "universe": "science",
  "zingPath": "/science/biology/photosynthesis",
  "explanation": "Yeh diagram chloroplast ka structure dikha raha hai...",
  "confidence": 0.87,
  "examRelevance": ["UPSC", "NEET"]
}
```

**No Concept Found:**
```json
{
  "concept": null,
  "explanation": "Yeh image mein koi educational concept nahi mila...",
  "confidence": 0.0
}
```

**Rate Limiting:**
- **Guest users**: 10 scans/hour
- **VIDYARTHI users**: 50 scans/hour

**Response Codes:**
- `200` — Success
- `400` — Missing image or mimeType
- `429` — Rate limit exceeded
- `502` — Gemini Vision API error

---

## 📄 Static Routes

### `GET /sitemap.xml`

Dynamic sitemap with all topics.

**Response:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zing.app/</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://zing.app/science/biology/photosynthesis</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... all topics ... -->
</urlset>
```

---

### `GET /robots.txt`

Search engine directives.

**Response:**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://zing.app/sitemap.xml
```

---

### `GET /manifest.webmanifest`

PWA manifest for installable app.

**Response:**
```json
{
  "name": "ZING — India's Knowledge Platform",
  "short_name": "ZING",
  "description": "Cinematic learning for Indian students",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#FFD700",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🔐 Authentication (NextAuth)

Coming soon — Google OAuth integration.

---

## 📊 Error Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 400 | Bad Request | Invalid input, missing required fields |
| 401 | Unauthorized | Missing or invalid auth token |
| 403 | Forbidden | Insufficient permissions (e.g., non-admin) |
| 404 | Not Found | Topic/character slug doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Database error, AI provider down |
| 502 | Bad Gateway | External API (Groq/Gemini) error |

---

## 🎯 Rate Limits

| Endpoint | Guest | VIDYARTHI |
|----------|-------|-----------|
| `/api/guide` | 10/day | 100/day |
| `/api/zing-lens` | 10/hour | 50/hour |
| `/api/search` | 100/hour | Unlimited |
| tRPC (all) | Unlimited | Unlimited |

---

## 📦 TypeScript Types

All types are auto-generated from Prisma schema and exported from `@repo/api`:

```typescript
import type { AppRouter } from '@repo/api';
import type { Topic, Character } from '@prisma/client';

// tRPC client with full type safety
const trpc = createTRPCReact<AppRouter>();

// Infer output types
type TopicBySlug = RouterOutputs<AppRouter>['topic']['getBySlug'];
```

---

## 🧪 Testing API Locally

### tRPC (Server-side):
```typescript
import { createServerCaller } from '@repo/api';

const caller = await createServerCaller();
const topic = await caller.topic.getBySlug({ slug: 'test' });
```

### REST API:
```bash
# Search
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"photosynthesis"}'

# ZING Lens
curl -X POST http://localhost:3000/api/zing-lens \
  -H "Content-Type: application/json" \
  -d '{"image":"base64...","mimeType":"image/jpeg"}'
```

---

**Need more details?** Check the source code in [packages/api/](../packages/api/).

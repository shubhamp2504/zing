# ⚡ ZING

> **India's cinematic knowledge platform** — Where education meets Bollywood magic.

ZING makes learning exam-ready content as engaging as watching a movie. Built for UPSC, NEET, JEE aspirants and knowledge seekers across India.

---

## 🎯 What is ZING?

ZING transforms complex topics into **cinematic experiences** using:
- 🎬 **Scrollytelling animations** — Visual stories that unfold as you scroll
- 🧠 **AI-powered explanations** — Groq + Gemini Guide agents in Hinglish
- 🌌 **7 Universes** — Scholar, Science, Money, Earth, Code, Heart, Art
- 🎮 **Gamification** — XP, badges, levels (Vidyarthi → Brahmarishi)
- 🌐 **11 Indian languages** — English, Hindi, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Punjabi, Odia

**Example topics:**
- _"How does photosynthesis actually work?"_ → Cinematic mode with 6-step visual journey
- _"What is an API?"_ → Desi analogy: "Your mom (client) asks the waiter (API) to get food from the kitchen (server)"
- _"Pythagorean Theorem"_ → Interactive triangle visualization with Sanskrit origins story

---

## ✨ Key Features

### 📖 Three Learning Modes
1. **📚 Read Mode** — Long-form article with auto-linked concepts
2. **🎬 Cinematic Mode** — Full-screen slideshow with Ken Burns animations
3. **📱 Story Mode** — Instagram-style 8-second slides with auto-advance
4. **💳 Swipe Mode** — Tinder-style flashcards for quick revision

### 🤖 AI-Powered Experience
- **ZING Guide** — Chat with Groq Llama 3.3 70B in Hinglish (⚡ icon)
- **ZING Lens** — Point camera at any object, get instant explanation via Gemini Vision
- **Auto-linking** — Topics automatically link to related concepts
- **Knowledge Galaxy** — Interactive force-directed graph of topic connections

### 🎨 Innovations
- **Reading Ritual** — Personalized recommendations based on time/mood/goal
- **Depth Dial** — 10 levels from "Explain like I'm 5" to "PhD-level research"
- **Desi Analogies** — Relatable Indian context for abstract concepts
- **Character Codex** — Learn from historical figures (Aryabhatta, Chanakya, Ada Lovelace)

### 🌐 Multilingual Support
- **11 languages** with native script rendering
- **Translation quality badges** — AI_DRAFT, AI_VERIFIED, HUMAN
- **Language detection** — URL prefix → localStorage → Accept-Language
- **Devanagari fonts** — Optimized for Hindi/Marathi/Sanskrit

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **PostgreSQL 14+** (or Vercel Postgres, Neon, Supabase)
- **npm 11+**

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/zing.git
cd zing

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add DATABASE_URL, GROQ_API_KEY, GEMINI_API_KEY

# Database setup
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Start dev server
npm run dev
# Open http://localhost:3000
```

📘 **Full guide:** [GETTING_STARTED.md](./GETTING_STARTED.md)

---

## 📁 Project Structure

```
zing/
├── apps/
│   └── web/                    # Next.js 16 app
│       ├── app/                # App Router
│       │   ├── (universes)/    # Topic pages
│       │   ├── admin/          # Content management
│       │   └── api/            # REST + tRPC endpoints
│       ├── components/         # React components
│       └── lib/                # Utilities
│
├── packages/
│   ├── ui/                     # Design system (7 universe themes)
│   ├── api/                    # tRPC backend
│   ├── database/               # Prisma schema + seed
│   └── ai/                     # Groq + Gemini providers
│
└── .github/workflows/          # CI/CD pipelines
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.5** — React 19, App Router, Server Components
- **TypeScript 5.9.2** — Strict mode enabled
- **Tailwind CSS v4** — Via @tailwindcss/postcss
- **Framer Motion** — Scroll animations, page transitions
- **Lottie** — Vector animations for universe loaders

### Backend
- **tRPC v11** — Type-safe API with superjson serializer
- **Prisma** — PostgreSQL ORM with 9 models
- **NextAuth.js** — Google OAuth authentication
- **Zod** — Runtime schema validation

### AI/ML
- **Groq** — Llama 3.3 70B (primary, 1000 tokens/sec)
- **Gemini 2.5 Flash** — Fallback, vision API
- **WebLLM** — Offline AI (1.8GB model download)
- **Meilisearch** — Typo-tolerant fast search

### DevOps
- **Turborepo** — Monorepo build system
- **Vitest** — Unit testing (31 tests passing)
- **GitHub Actions** — CI/CD (TypeScript, lint, build, Lighthouse)
- **Docker** — Containerized deployments

---

## 🚀 Deployment

### Quick Deploy to Production (20 minutes)

**Option 1: Vercel + Neon (Recommended — Free)**
```bash
# 1. Get free accounts
https://vercel.com → Sign up with GitHub
https://neon.tech → Create PostgreSQL database

# 2. Get API keys (both free)
https://console.groq.com → Create API key
https://aistudio.google.com → Get Gemini key

# 3. Deploy
npm i -g vercel
vercel --prod

# 4. Add environment variables in Vercel dashboard
DATABASE_URL, GROQ_API_KEY, GEMINI_API_KEY

# 5. Initialize database
vercel env pull .env.local
cd packages/database
npx prisma migrate deploy
npm run db:seed

# Done! Your ZING instance is live 🎉
```

**📘 Detailed Guides:**
- [QUICK_DEPLOY.md](../QUICK_DEPLOY.md) — 5-minute quick start
- [DEPLOYMENT.md](../DEPLOYMENT.md) — Complete deployment guide
- [PRODUCTION_CHECKLIST.md](../PRODUCTION_CHECKLIST.md) — Pre-launch checklist

**Alternative Deployment Options:**
- Railway + PostgreSQL
- DigitalOcean App Platform
- Self-hosted VPS (requires Docker)

**Free Tier Limits:**
- **Vercel**: 100GB bandwidth/month (enough for 10K daily users)
- **Neon**: 0.5GB storage (~5000 topics)
- **Groq**: 6000 tokens/min
- **Gemini**: 15 requests/min
- **Monthly Cost**: ₹0 (or ₹67 with custom domain)

---

## 🎮 Key Components

### Topic Page Architecture
```typescript
// 12-section layout with ISR caching
app/(universes)/[universe]/[subworld]/[topic]/page.tsx

// Sections (with Suspense boundaries):
1. Cinematic Header (Ken Burns background)
2. Content Mode Selector (Read/Cinematic/Story/Swipe)
3. Snap View (3-panel quick overview)
4. Read Mode Article (auto-linked concepts)
5. Visualization (interactive diagrams)
6. Desi Analogies (Indian context)
7. Meme Corner (lighthearted learning)
8. ZING Connection (related topics)
9. Related Topics (carousel)
10. Tips & Tricks (exam-focused)
11. Mirror Moment (reflection prompt)
12. Sources & References (credible links)
```

### Gamification System
```typescript
// lib/gamification.ts
XP_ACTIONS = {
  TOPIC_READ: 10,
  TOPIC_COMPLETE: 25,
  QUIZ_ATTEMPT: 15,
  STREAK_WEEK: 100,
  // ... 12 total actions
}

LEVELS = [
  { level: 1, name: 'Vidyarthi', xpRequired: 0 },
  { level: 8, name: 'Brahmarishi', xpRequired: 10000 },
]

BADGES = {
  nightOwl: { emoji: '🦉', condition: 'Read 10 topics after 10 PM' },
  // ... 13 badges
}
```

---

## 🌍 Universes

| Universe | Theme | Color | Subjects |
|----------|-------|-------|----------|
| 🎓 **Scholar** | परीक्षा जीतना है | Blue | History, Geography, Polity, Economics, Current Affairs |
| 🔬 **Science** | सच्चाई की खोज | Green | Physics, Chemistry, Biology, Math, Astronomy |
| 💰 **Money** | पैसे की बात | Gold | Finance, Business, Startups, Investing, Economics |
| 🌱 **Earth** | धरती की सेवा | Green | Environment, Sustainability, Climate, Agriculture |
| 💻 **Code** | कोड की शक्ति | Purple | Programming, AI, Web Dev, Data Science, Tech |
| ❤️ **Heart** | अपनी पहचान | Pink | Psychology, Relationships, Mental Health, Philosophy |
| 🎨 **Art** | कला का जादू | Orange | Cinema, Music, Literature, Design, Culture |

---

## 📊 Performance

- **Lighthouse Score**: Performance 90+, Accessibility 95+
- **First Contentful Paint**: <1.5s (4G network)
- **Time to Interactive**: <3.5s
- **Bundle Size**: 180KB gzipped (Next.js optimized)
- **ISR Cache**: Topics revalidate every 1 hour

---

## 🧪 Testing

```bash
# Run all tests (31 unit tests)
npm run test

# Watch mode
npm run test:watch

# Type checking
npm run check-types

# Linting
npm run lint

# Full quality check
npm run test && npm run lint && npm run build
```

**Coverage:**
- ✅ Universe system (9 tests)
- ✅ Gamification (13 tests)
- ✅ Innovations (5 tests)
- ✅ Auto-linking (4 tests)

---

## 🌐 API Documentation

### tRPC Endpoints
```typescript
// Topic queries
api.topic.getBySlug({ slug: 'photosynthesis', language: 'hi' })
api.topic.listBySubWorld({ universe: 'science', subWorld: 'biology' })
api.topic.search({ query: 'quantum mechanics' })

// Character queries
api.character.getBySlug({ slug: 'aryabhatta' })
```

### REST Endpoints
```typescript
POST /api/search        // Meilisearch + PostgreSQL fallback
POST /api/guide         // ZING Guide (SSE streaming)
POST /api/zing-lens     // Camera-based concept identification
GET  /sitemap.xml       // SEO sitemap
GET  /robots.txt        // Search engine directives
GET  /manifest.webmanifest // PWA manifest
```

📘 **Full reference:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# https://vercel.com/new

# 3. Configure environment variables
# Add DATABASE_URL, GROQ_API_KEY, GEMINI_API_KEY

# 4. Deploy
# Automatic on every push to main
```

📘 **Full guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Code of conduct
- Development workflow
- Coding standards
- Testing guidelines
- PR submission process

**Quick contribution ideas:**
- 📝 Add topics for UPSC/NEET/JEE
- 🌐 Translate content to regional languages
- 🎨 Create Lottie animations for universe loaders
- 🧪 Write component tests
- 📖 Improve documentation

---

## 📜 License

MIT License — See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- **Indian students** — Primary user research group
- **Groq** — Lightning-fast LLM inference
- **Google Gemini** — Multimodal AI capabilities
- **Vercel** — Deployment platform
- **Turborepo** — Monorepo tooling

---

## 📞 Contact

- **GitHub Issues** — Bug reports and feature requests
- **GitHub Discussions** — Questions and ideas
- **Email** — contact@zing.study (coming soon)
- **Twitter** — @ZINGStudy (coming soon)

---

## 🌟 Star History

**⭐ If ZING helps you learn, give us a star!**

---

## 🎯 Roadmap

### Q1 2025
- ✅ Core platform (9 phases complete)
- ✅ Multilingual support (11 languages)
- ✅ AI integration (Groq + Gemini)
- 🚧 Mobile app (React Native)

### Q2 2025
- 🔜 Collaborative study rooms
- 🔜 Live doubt-solving sessions
- 🔜 Exam-specific tracks (UPSC/NEET/JEE)
- 🔜 Creator platform for educators

### Q3 2025
- 🔜 Offline-first PWA
- 🔜 Voice-based search (hi-IN, en-IN)
- 🔜 AR visualizations (WebXR)
- 🔜 Community translations

---

**Built with ❤️ for the 260 million students of India** 🇮🇳

# 🤝 Contributing to ZING

Thank you for your interest in contributing to ZING! This guide will help you get started.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

---

## 📜 Code of Conduct

- **Be respectful** — ZING serves Indian students from diverse backgrounds
- **Be inclusive** — Write code and docs that work for everyone
- **Be educational** — Content should be accurate and exam-relevant
- **Be performant** — India has 4G networks; optimize for speed

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/zing.git
cd zing
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
# Add your DATABASE_URL, GROQ_API_KEY, GEMINI_API_KEY
```

### 3. Run Database Setup

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 4. Start Dev Server

```bash
npm run dev
# Open http://localhost:3000
```

---

## 🔄 Development Workflow

### Branching Strategy

- `main` — Production-ready code
- `develop` — Integration branch for features
- `feature/description` — New features
- `fix/description` — Bug fixes
- `docs/description` — Documentation updates

**Example:**
```bash
git checkout -b feature/add-sanskrit-support
# Make changes
git commit -m "feat: add Sanskrit language support"
git push origin feature/add-sanskrit-support
# Open PR on GitHub
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug in X
docs: update API documentation
style: format code with prettier
refactor: restructure component Y
test: add tests for Z
chore: update dependencies
```

**Examples:**
```
feat(topic): add scrollytelling to history topics
fix(search): handle empty query gracefully
docs(api): document ZING Lens endpoint
test(gamification): add XP calculation tests
```

---

## 📁 Project Structure

```
zing/
├── apps/
│   └── web/                    # Main Next.js app
│       ├── app/                # App Router pages
│       │   ├── (universes)/    # Topic pages
│       │   ├── admin/          # Admin panel
│       │   └── api/            # API routes
│       ├── components/         # React components
│       │   ├── topic/          # Topic-related
│       │   ├── search/         # Search components
│       │   ├── guide/          # ZING Guide
│       │   ├── scrollytelling/ # Scroll animations
│       │   └── ...
│       └── lib/                # Utilities
│           ├── universes.ts    # Universe config
│           ├── gamification.ts # XP/badges/levels
│           ├── innovations.ts  # Reading ritual, depth dial
│           └── auto-link.ts    # Auto-linking engine
│
├── packages/
│   ├── ui/                     # Design system
│   │   ├── tokens.ts           # Colors, spacing, themes
│   │   ├── physics.ts          # Animation configs
│   │   ├── variants.ts         # Framer Motion variants
│   │   └── DeviceCapability.ts # Performance detection
│   │
│   ├── api/                    # tRPC backend
│   │   ├── server.ts           # tRPC context + procedures
│   │   ├── index.ts            # Root router
│   │   └── routers/
│   │       ├── topic.ts        # Topic queries
│   │       └── character.ts    # Character queries
│   │
│   ├── database/               # Prisma ORM
│   │   ├── schema.prisma       # Database models
│   │   ├── seed.ts             # Seed data
│   │   └── index.ts            # Prisma client
│   │
│   └── ai/                     # AI providers
│       ├── providers.ts        # Groq + Gemini
│       ├── guide.ts            # ZING Guide agent
│       ├── search.ts           # Meilisearch client
│       └── ContentGenerator.ts # AI content pipeline
│
└── .github/workflows/          # CI/CD
```

---

## 💻 Coding Standards

### TypeScript

- **Strict mode enabled** — All code must pass `tsc --noEmit`
- **Explicit types** for function parameters and returns
- **Avoid `any`** — Use `unknown` or proper types
- **Use Zod** for runtime validation of external data

**Good:**
```typescript
interface TopicProps {
  slug: string;
  language?: Language;
}

export async function getTopic({ slug, language = 'en' }: TopicProps): Promise<Topic | null> {
  // ...
}
```

**Bad:**
```typescript
export async function getTopic(slug: any, lang: any): any {
  // ...
}
```

### React Components

- **Server Components by default** — Add `'use client'` only when needed
- **Named exports** for components (not default)
- **Props interface** always defined
- **Accessibility** — Use semantic HTML, ARIA labels

**Example:**
```typescript
'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
      aria-label="Action button"
    >
      {children}
    </button>
  );
}
```

### Styling

- **Tailwind CSS first** — Use utility classes
- **Custom CSS** only for animations or complex effects
- **Mobile-first** — Design for phones, enhance for desktop
- **Dark mode aware** — Use `dark:` variants

**Example:**
```tsx
<div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-lg md:p-6 lg:p-8">
  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
    Title
  </h2>
</div>
```

### Performance

- **Use `loading.tsx`** for Suspense boundaries
- **Dynamic imports** for heavy components
- **Image optimization** — Always use `next/image`
- **Reduce motion** — Respect `prefers-reduced-motion`

**Example:**
```typescript
import dynamic from 'next/dynamic';

const ZingLottie = dynamic(() => import('./ZingLottie'), {
  loading: () => <div>Loading animation...</div>,
  ssr: false,
});
```

---

## 🧪 Testing

### Unit Tests (Vitest)

All utility functions and hooks should have tests.

```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
```

**Example test:**
```typescript
// __tests__/gamification.test.ts
import { describe, it, expect } from 'vitest';
import { getLevelForXP } from '../lib/gamification';

describe('Level System', () => {
  it('should return Vidyarthi for 0 XP', () => {
    const result = getLevelForXP(0);
    expect(result.level).toBe(1);
    expect(result.name).toBe('Vidyarthi');
  });
});
```

### What to Test

- ✅ Utility functions (gamification, universes, auto-link)
- ✅ Hooks (useScrollProgress, useTypewriter, useDeviceCapability)
- ✅ API routers (tRPC procedures)
- ❌ UI components (manual testing for now)
- ❌ API routes (covered by integration tests)

### Running Tests Before Commit

```bash
npm run test && npm run lint && npm run check-types
```

Or use the pre-commit hook (recommended).

---

## 🎨 Adding a New Feature

### Example: Add a New Universe

1. **Update universe config** (`lib/universes.ts`):
   ```typescript
   {
     id: 'dharma-drishti',
     slug: 'dharma-drishti',
     name: 'Dharma Drishti',
     tagline: 'Philosophy meets practice',
     // ...
   }
   ```

2. **Add theme** (`packages/ui/tokens.ts`):
   ```typescript
   dharma: {
     primary: '#9333ea',
     secondary: '#c084fc',
     accent: '#e9d5ff',
     dark: '#581c87',
   }
   ```

3. **Create test** (`__tests__/universes.test.ts`):
   ```typescript
   it('should include dharma-drishti universe', () => {
     const dharma = findUniverse('dharma-drishti');
     expect(dharma).toBeDefined();
   });
   ```

4. **Run tests & build**:
   ```bash
   npm run test
   npm run build
   ```

5. **Commit & PR**:
   ```bash
   git add .
   git commit -m "feat: add Dharma Drishti universe"
   git push origin feature/add-dharma-universe
   ```

---

## 📝 Adding Content

### Via Admin Panel (Recommended)

1. Go to `/admin/create`
2. Fill in topic details
3. Click "Generate with AI" (uses Groq/Gemini)
4. Review quality checklist (8/10 required)
5. Publish

### Via Prisma Studio

```bash
npx prisma studio
# Open http://localhost:5555
# Add topic manually in GUI
```

### Via Seed Script

Edit `packages/database/seed.ts`:

```typescript
await prisma.topic.create({
  data: {
    slug: 'your-topic',
    title: 'Your Topic Title',
    universe: 'SCHOLAR',
    subWorld: 'math',
    quickShotSummary: '...',
    content: { /* ... */ },
    // ...
  },
});
```

---

## 🌐 Adding a New Language

1. **Update middleware** (`apps/web/middleware.ts`):
   ```typescript
   const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'gu', 'kn', 'ml', 'pa', 'or', 'sa'];
   ```

2. **Add language name** (`components/topic/LanguageToggle.tsx`):
   ```typescript
   { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' }
   ```

3. **Update Prisma enum** (`packages/database/schema.prisma`):
   ```prisma
   enum Language {
     EN HI MR TA TE BN GU KN ML PA OR SA
   }
   ```

4. **Run migration**:
   ```bash
   npx prisma migrate dev --name add_sanskrit_language
   ```

---

## 🐛 Submitting a Bug Fix

1. **Check existing issues** on GitHub
2. **Create an issue** if not reported
3. **Create a branch**: `fix/issue-number-description`
4. **Write a test** that reproduces the bug
5. **Fix the bug** and confirm test passes
6. **Submit PR** with clear description

---

## 🚀 Submitting Changes

### Pull Request Checklist

- [ ] Code passes all tests (`npm run test`)
- [ ] No TypeScript errors (`npm run check-types`)
- [ ] No linting errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] PR title follows conventional commits
- [ ] Description explains **what** and **why**
- [ ] Screenshots for UI changes
- [ ] Docs updated if API changed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
How did you test this?

## Screenshots (if applicable)
[Add screenshots]
```

---

## 🎯 Areas We Need Help

### High Priority
- 🌐 **Translations** — Hindi, regional languages (11 supported)
- 📝 **Content** — Topics for UPSC, NEET, JEE
- 🎨 **Lottie Animations** — Universe loaders, micro-feedback
- 🧪 **Tests** — Component tests, E2E tests

### Medium Priority
- 📱 **PWA Features** — Offline support, install prompt
- 🔐 **Authentication** — Google OAuth, GitHub
- 📊 **Analytics** — Custom PostHog dashboards
- ♿ **Accessibility** — ARIA labels, keyboard navigation

### Low Priority
- 🎮 **Gamification** — New badges, achievements
- 🤖 **AI Improvements** — Better prompts, more tools
- 🎭 **Rive Characters** — Animated character states

---

## 💡 Tips for Contributors

- **Start small** — Fix a typo, add a test, update docs
- **Ask questions** — Open a GitHub Discussion if unsure
- **Keep PRs focused** — One feature or fix per PR
- **Be patient** — Reviews may take 2-3 days
- **Celebrate wins** — Your contribution helps millions of students! 🎉

---

## 📞 Getting Help

- **GitHub Discussions**: For questions and ideas
- **GitHub Issues**: For bugs and feature requests
- **Discord** (coming soon): Real-time chat

---

**Thank you for contributing to ZING!** Every line of code brings quality education to more Indian students. ⚡

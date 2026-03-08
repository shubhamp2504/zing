# 🚀 ZING — Getting Started Guide

**Build Time**: ~5 minutes  
**Prerequisites**: Node.js 18+, PostgreSQL 14+

---

## Step 1: Environment Setup (2 min)

### Create `.env.local` file in `zing/` root:

```bash
cp .env.example .env.local
```

### Add these 3 essential variables:

```env
# 1. DATABASE (Required)
DATABASE_URL="postgresql://user:password@localhost:5432/zing"

# 2. GROQ API (FREE — https://console.groq.com)
GROQ_API_KEY="gsk_..."

# 3. GEMINI API (FREE — https://aistudio.google.com)
GEMINI_API_KEY="AIza..."
```

**Getting API Keys** (both FREE, instant signup):

1. **Groq**: https://console.groq.com → Sign up → API Keys → Create → Copy `gsk_...`
2. **Gemini**: https://aistudio.google.com → Get API Key → Copy `AIza...`

---

## Step 2: Install Dependencies (1 min)

```bash
npm install
```

Installs all workspace packages: web, ui, api, database, ai.

---

## Step 3: Database Setup (2 min)

```bash
# Generate Prisma client (creates TypeScript types)
npx prisma generate

# Create database tables (runs migrations)
npx prisma migrate dev --name init

# Add sample content (5 topics + 5 characters)
npx prisma db seed
```

**Expected output**: 
```
✓ 5 topics seeded
✓ 5 characters seeded
```

---

## Step 4: Start Dev Server (10 sec)

```bash
npm run dev
```

Open **http://localhost:3000** 🎉

---

## ✅ What You Should See

1. **Homepage**: 7 universe cards (Scholar, Code Sutra, Kaal Yatra, etc.)
2. **Click "Scholar"** → Sub-worlds (Math, Science, etc.)
3. **Click "Mathematics"** → Sample topics from seed data
4. **Try Search**: Press `Cmd+K` (or `Ctrl+K`) → Type "photosynthesis"
5. **Try ZING Guide**: Click ⚡ icon (bottom-right) → Ask "Explain Newton's laws"

---

## 🧪 Verify Installation

Run tests to confirm everything works:

```bash
npm run test
```

**Expected**: `✓ 31 tests passed`

---

## 🛠️ Troubleshooting

### ❌ "Cannot find module '@repo/ui'"
**Fix**: Run `npm install` from `zing/` root (not `apps/web/`)

### ❌ "Environment variable not found: DATABASE_URL"
**Fix**: Create `.env.local` in `zing/` root with `DATABASE_URL`

### ❌ "Prisma Client not initialized"
**Fix**: Run `npx prisma generate`

### ❌ "Cannot connect to database"
**Fix**: 
1. Check PostgreSQL is running
2. Verify connection string in `.env.local`
3. Or use **cloud database** (easier):
   - Vercel Postgres: https://vercel.com/storage/postgres
   - Neon: https://neon.tech (FREE)
   - Supabase: https://supabase.com (FREE)

---

## 🎯 Next Steps

### 1. Explore Admin Panel
Visit **http://localhost:3000/admin**
- Dashboard: Stats + content queue
- Create: AI-assisted topic creation
- Pipeline: AI content drafts
- Translate: 11 Indian languages

### 2. Add Your First Topic
1. Go to `/admin/create`
2. Enter title: "Newton's Laws of Motion"
3. Select universe: "Gyaan Netra (Science)"
4. Click "Generate with AI" → AI fills 12 sections
5. Review quality checklist → Publish

### 3. Try Reading Modes
1. Open any topic
2. Click mode selector (top-right)
3. Try:
   - **Cinematic Mode**: Full-screen slideshow
   - **Story Mode**: Instagram-style
   - **Swipe Mode**: Flashcards

### 4. Test Multilingual
1. Click 🌐 (language toggle) → Switch to "हिंदी"
2. URL changes to `/hi/...`
3. Content shows in Hindi (if translated)

---

## 📦 Optional Setup

### Meilisearch (Better Search)
```bash
# Install Meilisearch locally
brew install meilisearch  # macOS
# or download from https://meilisearch.com

# Run Meilisearch
meilisearch

# Add to .env.local
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_API_KEY="masterKey"
```

### Analytics (PostHog)
1. Sign up: https://posthog.com
2. Get project API key
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY="phc_..."
   ```

---

## 🎨 Customization

### Change Universe Colors
Edit `packages/ui/tokens.ts` → `UNIVERSE_THEMES`

### Add New Topics
Use `/admin/create` or directly via Prisma Studio:
```bash
npx prisma studio
```

### Modify Database Schema
1. Edit `packages/database/schema.prisma`
2. Run `npx prisma migrate dev --name your_change`

---

## 📖 Learn More

- **Architecture**: [FINAL_COMPLETION_REPORT.md](../FINAL_COMPLETION_REPORT.md)
- **Database Schema**: [packages/database/schema.prisma](packages/database/schema.prisma)
- **API Routes**: [packages/api/](packages/api/)
- **Components**: [apps/web/components/](apps/web/components/)

---

**Ready to build?** Start with `/admin/create` to add your first topic! ⚡

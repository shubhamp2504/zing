# 🚢 ZING — Deployment Guide (Vercel)

**Deploy ZING to production in 10 minutes with Vercel + Vercel Postgres**

---

## 🎯 Prerequisites

- GitHub account
- Vercel account (free tier works)
- Groq API key (FREE — https://console.groq.com)
- Gemini API key (FREE — https://aistudio.google.com)

---

## Step 1: Push to GitHub (1 min)

```bash
cd d:\copilot\ZING\zing

# Initialize git (if not already)
git init
git add .
git commit -m "Initial ZING deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/zing.git
git push -u origin main
```

---

## Step 2: Import to Vercel (2 min)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `zing` repository
4. Framework Preset: **Next.js** (auto-detected)
5. Root Directory: `apps/web`
6. Click **"Deploy"** → Vercel will build and fail (expected — needs env vars)

---

## Step 3: Add Vercel Postgres (2 min)

1. Go to your project dashboard → **Storage** tab
2. Click **"Create Database"** → Select **"Postgres"**
3. Choose **"Continue"** on the free tier
4. Database is provisioned in ~30 seconds
5. Vercel automatically adds these env vars:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NO_SSL`

---

## Step 4: Configure Environment Variables (3 min)

Go to **Settings** → **Environment Variables** and add:

### Required:

```
DATABASE_URL = [Use POSTGRES_PRISMA_URL value]
DATABASE_URL_UNPOOLED = [Use POSTGRES_URL_NO_SSL value]
GROQ_API_KEY = gsk_... [From console.groq.com]
GEMINI_API_KEY = AIza... [From aistudio.google.com]
NEXTAUTH_URL = https://your-app.vercel.app
NEXTAUTH_SECRET = [Generate with: openssl rand -base64 32]
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
```

### Recommended (but optional):

```
# Meilisearch (cloud.meilisearch.com — FREE)
MEILISEARCH_HOST = https://ms-xxxxx.meilisearch.io
MEILISEARCH_API_KEY = ...

# PostHog Analytics (posthog.com — FREE)
NEXT_PUBLIC_POSTHOG_KEY = phc_...
NEXT_PUBLIC_POSTHOG_HOST = https://app.posthog.com

# Admin access
ADMIN_EMAILS = your@email.com
```

---

## Step 5: Run Database Migration (2 min)

Vercel doesn't auto-run Prisma migrations. You need to do it manually:

### Option A: From Local Machine

```bash
# Set production database URL temporarily
export DATABASE_URL="postgresql://..."  # Copy from Vercel env vars

# Run migrations
npx prisma migrate deploy

# Seed database with initial content
npx prisma db seed
```

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run migration command
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

---

## Step 6: Redeploy (1 min)

1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Check **"Use existing Build Cache"** → **Redeploy**
4. Wait ~2 minutes for build
5. Visit your live URL! 🎉

---

## ✅ Post-Deployment Checklist

### Test Core Features:

- [ ] Homepage loads with 7 universe cards
- [ ] Click through to a topic page
- [ ] Try search (Cmd+K)
- [ ] Click ⚡ ZING Guide icon → Ask a question
- [ ] Visit `/admin` dashboard
- [ ] Create a new topic via `/admin/create`

### Performance:

- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Check bundle size (should be <130KB per page)
- [ ] Test on mobile device

---

## 🔧 Common Issues

### ❌ Build fails with "Cannot find module '@repo/ui'"
**Fix**: Ensure `Root Directory` in Vercel is set to `apps/web`

### ❌ "Prisma Client not initialized"
**Fix**: Add build command override:
```bash
cd ../.. && npx prisma generate && cd apps/web && next build
```

### ❌ "Cannot connect to database"
**Fix**: 
1. Check `DATABASE_URL` points to `POSTGRES_PRISMA_URL`
2. Verify database is in same region as deployment

### ❌ "Too many redirects" on homepage
**Fix**: Check `NEXTAUTH_URL` matches your Vercel domain exactly

---

## 🎨 Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `zing.example.com`)
3. Follow DNS setup instructions
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to new domain

---

## 📊 Enable Analytics (Optional)

### PostHog Setup:
1. Sign up at https://posthog.com (FREE)
2. Get API key from Project Settings
3. Add to Vercel env vars:
   ```
   NEXT_PUBLIC_POSTHOG_KEY = phc_...
   ```
4. Redeploy

### Vercel Analytics:
1. Go to **Analytics** tab
2. Click **"Enable"** (FREE on Pro plan)
3. Automatically tracks Web Vitals

---

## 🔐 Google OAuth Setup (For User Login)

1. Go to https://console.cloud.google.com
2. Create new project → **APIs & Services** → **Credentials**
3. Create **OAuth 2.0 Client ID**
4. Authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`
5. Copy Client ID + Secret
6. Add to Vercel env vars:
   ```
   GOOGLE_CLIENT_ID = ...
   GOOGLE_CLIENT_SECRET = ...
   ```
7. Redeploy

---

## 🚀 Scaling Considerations

### Free Tier Limits:
- **Vercel**: 100GB bandwidth, 100 serverless function executions/day
- **Vercel Postgres**: 60 compute hours/month, 256MB storage
- **Groq**: 6000 tokens/min (generous)
- **Gemini**: 15 requests/min

### When to Upgrade:
- **Traffic > 10K visitors/month** → Vercel Pro ($20/mo)
- **Database > 256MB** → Vercel Postgres Pro ($20/mo) or migrate to Neon/Supabase
- **Need faster AI** → Add Anthropic Claude API key

---

## 🎯 Production Optimization

### Before Launch:

1. **Images**: Add Next.js `<Image>` optimization
2. **Fonts**: Subset to `latin,devanagari` only
3. **Analytics**: Set up PostHog funnels for:
   - Topic views
   - Mode switches (Cinematic/Story/Swipe)
   - ZING Guide queries
   - Search usage
4. **Error Tracking**: Add Sentry DSN
5. **Monitoring**: Set up Vercel Speed Insights

### After Launch:

1. Monitor webhook for Prisma migration alerts
2. Set up GitHub Actions for automated migrations
3. Enable preview deployments for all branches
4. Configure edge caching for static content

---

## 📖 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Prisma Deploy**: https://pris.ly/d/migrate-deploy
- **Next.js Production**: https://nextjs.org/docs/deployment

---

**Your ZING deployment is live!** 🎉

Next: Share with students and start collecting feedback.

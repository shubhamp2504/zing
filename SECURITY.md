# Security Policy

## 🔒 Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Active support  |
| < 1.0   | ❌ Not supported   |

---

## 🛡️ Security Best Practices

ZING follows industry-standard security practices:

### Authentication & Authorization
- **NextAuth.js** — Secure OAuth 2.0 implementation
- **JWT tokens** — HTTP-only cookies, 30-day expiration
- **CSRF protection** — Built-in Next.js CSRF tokens
- **Role-based access** — Admin panel restricted to authenticated users

### Data Protection
- **Database encryption** — PostgreSQL SSL mode required in production
- **Environment variables** — Never committed to Git (`.env.local` in `.gitignore`)
- **API keys** — Stored in environment variables, rotated quarterly
- **Rate limiting** — Implemented on all AI endpoints:
  - Guest users: 10 requests/day (ZING Guide), 10 requests/hour (ZING Lens)
  - Authenticated users: 100 requests/day (ZING Guide), 50 requests/hour (ZING Lens)

### Content Security
- **CSP headers** — Configured in `next.config.js` (script-src, style-src, img-src)
- **XSS protection** — React auto-escaping, DOMPurify for user-generated content
- **SQL injection** — Parameterized queries via Prisma (no raw SQL)
- **Input validation** — Zod schemas for all API endpoints

### Dependency Management
- **Automated updates** — GitHub Dependabot enabled
- **Vulnerability scanning** — `npm audit` run in CI pipeline
- **License compliance** — MIT-compatible dependencies only

---

## 🚨 Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in ZING, please follow responsible disclosure:

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, email us at: **security@zing.study** (coming soon)

Until the email is set up, create a **private security advisory** on GitHub:
1. Go to https://github.com/yourusername/zing/security/advisories
2. Click "New draft security advisory"
3. Fill in the advisory form with:
   - **Title**: Brief description (e.g., "XSS vulnerability in topic markdown rendering")
   - **Description**: Detailed steps to reproduce
   - **Severity**: Your assessment (Critical/High/Medium/Low)
   - **Affected versions**: Version number(s)
   - **Proof of concept**: Code snippet or screenshot

### What to Include

Please provide:
- **Vulnerability type** (e.g., XSS, SQL Injection, CSRF, Authentication bypass)
- **Affected component** (e.g., `/api/search`, `ContentModeSelector.tsx`)
- **Steps to reproduce** (detailed, with screenshots if possible)
- **Impact assessment** (what an attacker could do)
- **Suggested fix** (optional, but appreciated)
- **Your contact info** (for follow-up questions)

### Response Timeline

- **24 hours** — Initial acknowledgment
- **72 hours** — Severity assessment and preliminary response
- **7 days** — Patch development (for Critical/High severity)
- **30 days** — Public disclosure (after patch is deployed)

### Rewards

While we don't have a formal bug bounty program yet, we offer:
- ⭐ **Public acknowledgment** in CHANGELOG.md (with your permission)
- 🎓 **ZING Premium** account (lifetime free access)
- 🏆 **Security Contributor badge** on your profile

---

## 🔐 Security Features

### Built-in Protections

1. **HTTPS Enforcement**
   - All production traffic via HTTPS (Vercel automatic)
   - HSTS headers with 1-year max-age
   - TLS 1.3 minimum

2. **Authentication Security**
   - Password hashing with bcrypt (cost factor: 12)
   - Session rotation after privilege escalation
   - Account lockout after 5 failed login attempts (15-minute cooldown)

3. **API Security**
   - Rate limiting (via `@upstash/ratelimit`)
   - API key rotation every 90 days
   - CORS restricted to allowed origins
   - Request size limits (10MB max)

4. **Data Validation**
   - Zod schema validation on all inputs
   - Type-safe tRPC procedures
   - Prisma query sanitization

5. **Content Security**
   - DOMPurify for user-generated HTML
   - Markdown rendered via `react-markdown` (XSS-safe)
   - Image CDN with signed URLs (Cloudinary/Uploadthing)

---

## 🧪 Security Testing

We perform regular security audits:

### Automated Scanning
- **npm audit** — Daily via GitHub Actions
- **Dependabot** — Weekly dependency updates
- **CodeQL** — Automatic code scanning for vulnerabilities
- **Lighthouse CI** — Security headers validation

### Manual Testing
- **Penetration testing** — Quarterly (via third-party)
- **Code review** — All PRs reviewed by 2+ maintainers
- **Security checklist** — Mandatory for all releases

---

## 📜 Security Checklist (for Contributors)

Before submitting a PR that touches security-sensitive code:

- [ ] All user inputs validated with Zod schemas
- [ ] No raw SQL queries (use Prisma only)
- [ ] Environment variables not hardcoded
- [ ] No sensitive data in error messages
- [ ] Rate limiting on new API endpoints
- [ ] Authentication checks for protected routes
- [ ] HTTPS-only cookies for sessions
- [ ] XSS protection for rendered content
- [ ] CSRF tokens for state-changing operations
- [ ] Secrets not logged to console
- [ ] No `eval()` or `Function()` constructors
- [ ] Dependencies free of known vulnerabilities (`npm audit`)

---

## 🚫 Out of Scope

The following are **NOT** considered security vulnerabilities:

- **Missing rate limits on public content** (topic pages, universe pages)
- **Lack of 2FA** (planned for v1.2)
- **Self-XSS** (requires user to paste malicious code in browser console)
- **Clickjacking on non-sensitive pages** (X-Frame-Options header intentionally omitted for embed support)
- **CSV injection** (we don't export CSV files)
- **Version disclosure** (Next.js version in headers is intentional)

---

## 📚 Security Resources

- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **Next.js Security**: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
- **tRPC Security**: https://trpc.io/docs/server/authorization
- **Prisma Security**: https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance

---

## 🔄 Security Updates

Subscribe to security advisories:
1. Go to https://github.com/yourusername/zing
2. Click "Watch" → "Custom" → "Security alerts only"

---

## 📞 Contact

- **General security questions**: security@zing.study (coming soon)
- **Security advisories**: https://github.com/yourusername/zing/security/advisories
- **Bug reports (non-security)**: https://github.com/yourusername/zing/issues

---

**Thank you for helping keep ZING secure for India's students!** 🙏

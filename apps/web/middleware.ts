/**
 * ⚡ Multilingual Middleware — Language detection + routing
 *
 * Detection priority: URL prefix → localStorage → Accept-Language → default EN
 * Supports: en, hi, mr, ta, te, bn, gu, kn, ml, pa, or
 */
import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'gu', 'kn', 'ml', 'pa', 'or'] as const;
type SupportedLang = (typeof SUPPORTED_LANGUAGES)[number];

const DEFAULT_LANG: SupportedLang = 'en';

// Paths that should NOT be language-prefixed
const EXCLUDED_PATHS = ['/api/', '/admin', '/_next/', '/manifest', '/robots', '/sitemap', '/favicon'];

function isExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATHS.some((p) => pathname.startsWith(p));
}

function extractLangFromPath(pathname: string): SupportedLang | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const first = segments[0] as SupportedLang;
    if (SUPPORTED_LANGUAGES.includes(first)) {
      return first;
    }
  }
  return null;
}

function detectLanguageFromHeader(request: NextRequest): SupportedLang {
  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return DEFAULT_LANG;

  // Parse Accept-Language header
  const langs = acceptLang
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang!.split('-')[0]!.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    if (SUPPORTED_LANGUAGES.includes(lang as SupportedLang)) {
      return lang as SupportedLang;
    }
  }

  return DEFAULT_LANG;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths
  if (isExcludedPath(pathname)) {
    return NextResponse.next();
  }

  // Check if URL already has a language prefix
  const urlLang = extractLangFromPath(pathname);

  if (urlLang) {
    // URL has valid lang prefix — rewrite to English route with ?lang= param
    // so the existing route handlers serve the content
    const strippedPath = pathname.replace(`/${urlLang}`, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = strippedPath;
    url.searchParams.set('lang', urlLang);
    const response = NextResponse.rewrite(url);
    response.headers.set('x-zing-language', urlLang);
    return response;
  }

  // For English (default), no redirect needed — just pass through
  // Only redirect if user has a non-English preference
  const cookieLang = request.cookies.get('zing-lang')?.value as SupportedLang | undefined;
  const detectedLang = cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang)
    ? cookieLang
    : detectLanguageFromHeader(request);

  if (detectedLang !== DEFAULT_LANG) {
    // Rewrite to English route with ?lang= param for non-English users
    const url = request.nextUrl.clone();
    url.searchParams.set('lang', detectedLang);
    const response = NextResponse.rewrite(url);
    response.headers.set('x-zing-language', detectedLang);
    return response;
  }

  // English — pass through, set header
  const response = NextResponse.next();
  response.headers.set('x-zing-language', 'en');
  return response;
}

export const config = {
  matcher: [
    // Match all paths EXCEPT static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|woff2?|ttf|otf|mp4|webm)).*)',
  ],
};

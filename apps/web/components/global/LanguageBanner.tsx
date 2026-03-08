'use client';

import { useSearchParams } from 'next/navigation';

const LANG_NAMES: Record<string, string> = {
  hi: 'हिंदी',
  mr: 'मराठी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  pa: 'ਪੰਜਾਬੀ',
  or: 'ଓଡ଼ିଆ',
};

export default function LanguageBanner() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  if (!lang || lang === 'en' || !LANG_NAMES[lang]) return null;

  return (
    <div
      style={{
        background: 'rgba(255, 191, 0, 0.08)',
        borderBottom: '1px solid rgba(255, 191, 0, 0.15)',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        fontSize: '0.8125rem',
        color: 'rgba(255, 191, 0, 0.8)',
      }}
    >
      🌐 {LANG_NAMES[lang]} translation
      <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>
        — AI-generated, may contain errors
      </span>
    </div>
  );
}

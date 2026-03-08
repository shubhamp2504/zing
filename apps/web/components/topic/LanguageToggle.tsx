/**
 * ⚡ LanguageToggle — Switch between available translations
 *
 * Shows language names in their native script (not English names).
 * Updates URL and saves preference.
 */
'use client';

import { useState, useCallback } from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
] as const;

interface LanguageToggleProps {
  /** Currently active language (from URL or context) */
  currentLang?: string;
  /** Available translations for this topic */
  availableLanguages?: string[];
  className?: string;
}

export function LanguageToggle({
  currentLang = 'en',
  availableLanguages,
  className = '',
}: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = useCallback(
    (code: string) => {
      // Save preference
      document.cookie = `zing-lang=${code}; path=/; max-age=${365 * 24 * 60 * 60}`;
      localStorage.setItem('zing-lang', code);

      // Navigate to language-prefixed URL
      const currentPath = window.location.pathname;

      // Remove existing lang prefix if present
      const langCodes = LANGUAGES.map((l) => l.code);
      const segments = currentPath.split('/').filter(Boolean);
      const hasLangPrefix = langCodes.includes(segments[0] as (typeof langCodes)[number]);
      const cleanPath = hasLangPrefix ? '/' + segments.slice(1).join('/') : currentPath;

      // Add new lang prefix (skip for English)
      const newPath = code === 'en' ? cleanPath : `/${code}${cleanPath}`;
      window.location.href = newPath;

      setIsOpen(false);
    },
    []
  );

  const current = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0]!;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Change language"
      >
        <span className="text-sm">🌐</span>
        <span className="text-sm text-white/80">{current.nativeName}</span>
        <svg
          className={`w-3 h-3 text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-2 max-h-[320px] overflow-y-auto">
              {LANGUAGES.map((lang) => {
                const isAvailable = !availableLanguages || availableLanguages.includes(lang.code);
                const isCurrent = lang.code === currentLang;

                return (
                  <button
                    key={lang.code}
                    onClick={() => isAvailable && switchLanguage(lang.code)}
                    disabled={!isAvailable || isCurrent}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      isCurrent
                        ? 'bg-white/10 text-white'
                        : isAvailable
                          ? 'hover:bg-white/5 text-white/70'
                          : 'text-white/20 cursor-not-allowed'
                    }`}
                  >
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-xs text-white/30">{lang.name}</span>
                    {isCurrent && <span className="text-xs ml-2">✓</span>}
                    {!isAvailable && <span className="text-xs ml-2">—</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

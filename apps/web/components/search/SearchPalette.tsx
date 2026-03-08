/**
 * ⚡ SearchPalette — Cmd+K search with rotating placeholders, voice search
 *
 * Client Component — handles keyboard shortcuts, search state, navigation.
 * Uses ZING_PHYSICS.overlay.open for entrance animation.
 */
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const PLACEHOLDERS = [
  'Karna kyu hara...',
  'Black holes explain karo...',
  'Git rebase vs merge...',
  'Photosynthesis Hinglish mein...',
  'Partition 1947 ke baad...',
  'What is quantum entanglement?',
  'DNA replication steps...',
  'Ashoka ne Buddhism kyu apnaya...',
  'How does blockchain work?',
  'Mughal architecture styles...',
];

interface SearchResult {
  slug: string;
  title: string;
  hook: string;
  universe: string;
  subWorld: string;
  highlightedTitle?: string;
  highlightedHook?: string;
  examTags?: string[];
}

export default function SearchPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const router = useRouter();

  // Rotate placeholder every 3 seconds
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search with debounce
  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
      }
    } catch {
      // Silently fail — search is non-critical
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setQuery(value);
      setSelectedIndex(0);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => doSearch(value), 200);
    },
    [doSearch]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        const r = results[selectedIndex];
        router.push(`/${r.universe}/${r.subWorld}/${r.slug}`);
        setIsOpen(false);
      }
    },
    [results, selectedIndex, router]
  );

  // Voice search via Web Speech API
  const startVoiceSearch = useCallback(() => {
    const win = window as any;
    const SpeechRecognitionCtor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'hi-IN'; // Hindi-India default
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        handleInputChange(transcript);
      }
    };
    recognition.onerror = () => setIsListening(false);

    recognition.start();
  }, [handleInputChange]);

  const navigateToResult = useCallback(
    (r: SearchResult) => {
      router.push(`/${r.universe}/${r.subWorld}/${r.slug}`);
      setIsOpen(false);
    },
    [router]
  );

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '20vh',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        animation: 'overlayOpen 0.2s ease',
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '36rem',
          margin: '0 1rem',
          borderRadius: '1rem',
          background: 'rgba(20,20,20,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          animation: 'paletteSlide 0.2s ease',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search ZING"
      >
        {/* Input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={PLACEHOLDERS[placeholderIndex]}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
            }}
            aria-label="Search query"
          />
          <button
            onClick={startVoiceSearch}
            style={{
              background: isListening ? 'rgba(239,68,68,0.2)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              color: isListening ? '#EF4444' : 'rgba(255,255,255,0.3)',
              fontSize: '1rem',
            }}
            aria-label="Voice search"
          >
            🎤
          </button>
          <kbd
            style={{
              fontSize: '0.625rem',
              color: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '24rem', overflowY: 'auto' }}>
          {loading && (
            <div
              style={{
                padding: '1rem',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.875rem',
              }}
            >
              Searching...
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div
              style={{
                padding: '2rem 1rem',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              <div style={{ width: 60, height: 60, margin: '0 auto 0.5rem' }}>
                <img src="/animations/states/empty-search.json" alt="" style={{ display: 'none' }} />
                <span style={{ fontSize: '2rem' }}>🤷</span>
              </div>
              <p style={{ fontSize: '0.875rem' }}>Kuch nahi mila — try something different!</p>
            </div>
          )}

          {results.map((r, i) => (
            <button
              key={r.slug}
              onClick={() => navigateToResult(r)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '0.75rem 1rem',
                background:
                  i === selectedIndex ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                transition: 'background 0.1s',
              }}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--universe-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                  }}
                >
                  {r.universe}
                </span>
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: r.highlightedTitle ?? r.title,
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.5,
                }}
                dangerouslySetInnerHTML={{
                  __html: r.highlightedHook ?? r.hook,
                }}
              />
              {r.examTags && r.examTags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    gap: '0.25rem',
                    marginTop: '0.375rem',
                  }}
                >
                  {r.examTags.map((tag) => (
                    <span
                      key={tag}
                      className="exam-badge"
                      style={{ fontSize: '0.5625rem' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0.5rem 1rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.625rem',
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          <span>↑↓ Navigate &nbsp; ↵ Open &nbsp; Esc Close</span>
          <span>⚡ ZING Search</span>
        </div>
      </div>

      <style>{`
        @keyframes overlayOpen {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes paletteSlide {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

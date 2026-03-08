/**
 * ⚡ Admin Translate — AI-powered translation workflow
 *
 * Side-by-side English vs translation with AI generation.
 */
'use client';

import { useState, useCallback } from 'react';

const LANGUAGES = [
  { code: 'hi', name: 'Hindi', nameNative: 'हिन्दी', dbCode: 'HI' },
  { code: 'mr', name: 'Marathi', nameNative: 'मराठी', dbCode: 'MR' },
  { code: 'ta', name: 'Tamil', nameNative: 'தமிழ்', dbCode: 'TA' },
  { code: 'te', name: 'Telugu', nameNative: 'తెలుగు', dbCode: 'TE' },
  { code: 'bn', name: 'Bengali', nameNative: 'বাংলা', dbCode: 'BN' },
  { code: 'gu', name: 'Gujarati', nameNative: 'ગુજરાતી', dbCode: 'GU' },
  { code: 'kn', name: 'Kannada', nameNative: 'ಕನ್ನಡ', dbCode: 'KN' },
  { code: 'ml', name: 'Malayalam', nameNative: 'മലയാളം', dbCode: 'ML' },
  { code: 'pa', name: 'Punjabi', nameNative: 'ਪੰਜਾਬੀ', dbCode: 'PA' },
  { code: 'or', name: 'Odia', nameNative: 'ଓଡ଼ିଆ', dbCode: 'OR' },
  { code: 'sa', name: 'Sanskrit', nameNative: 'संस्कृतम्', dbCode: 'SA' },
];

type QualityLevel = 'AI_DRAFT' | 'AI_VERIFIED' | 'HUMAN';

export default function TranslatePage() {
  const [topicSlug, setTopicSlug] = useState('');
  const [language, setLanguage] = useState('hi');
  const [originalContent, setOriginalContent] = useState('');
  const [translation, setTranslation] = useState('');
  const [regionalContext, setRegionalContext] = useState('');
  const [quality, setQuality] = useState<QualityLevel>('AI_DRAFT');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  const saveTranslation = useCallback(async () => {
    if (!topicSlug.trim() || !translation.trim()) return;
    setSaving(true);
    try {
      const langObj = LANGUAGES.find((l) => l.code === language);
      const res = await fetch('/api/admin/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicSlug: topicSlug.trim(),
          language: langObj?.dbCode ?? language.toUpperCase(),
          translation: translation.trim(),
          regionalContext: regionalContext.trim(),
          quality,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Save failed', 'error');
      } else {
        showToast('Translation saved!', 'success');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setSaving(false);
    }
  }, [topicSlug, language, translation, regionalContext, quality]);

  const generateTranslation = useCallback(async () => {
    if (!topicSlug.trim()) return;
    setGenerating(true);
    try {
      const langName = LANGUAGES.find((l) => l.code === language)?.name ?? language;
      const res = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Translate the following ZING topic content to ${langName}. Maintain the engaging ZING tone. Keep technical terms in English with ${langName} explanations in parentheses. Add regional context where relevant.\n\nContent:\n${originalContent}`,
          history: [],
        }),
      });
      const data = await res.json();
      setTranslation(data.text ?? 'Translation failed');
      setQuality('AI_DRAFT');
    } catch {
      setTranslation('Error generating translation.');
    } finally {
      setGenerating(false);
    }
  }, [topicSlug, language, originalContent]);

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        🌐 Translate Topic
      </h1>

      {/* Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr auto',
          gap: '0.75rem',
          marginBottom: '1rem',
        }}
      >
        <input
          value={topicSlug}
          onChange={(e) => setTopicSlug(e.target.value)}
          placeholder="Topic slug (e.g., quantum-entanglement)"
          style={{
            padding: '0.5rem 0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.5rem',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.8125rem',
            outline: 'none',
          }}
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.5rem',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.8125rem',
            outline: 'none',
          }}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.nameNative} ({l.name})
            </option>
          ))}
        </select>
        <select
          value={quality}
          onChange={(e) => setQuality(e.target.value as QualityLevel)}
          style={{
            padding: '0.5rem 0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.5rem',
            color:
              quality === 'HUMAN'
                ? '#10B981'
                : quality === 'AI_VERIFIED'
                ? '#FFD700'
                : 'rgba(255,255,255,0.5)',
            fontSize: '0.8125rem',
            outline: 'none',
          }}
        >
          <option value="AI_DRAFT">AI Draft</option>
          <option value="AI_VERIFIED">AI Verified</option>
          <option value="HUMAN">Human Reviewed</option>
        </select>
        <button
          onClick={generateTranslation}
          disabled={generating || !topicSlug.trim()}
          style={{
            padding: '0.5rem 1rem',
            background: generating
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,153,51,0.15)',
            color: generating ? 'rgba(255,255,255,0.3)' : '#FF9933',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: generating ? 'not-allowed' : 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {generating ? '⏳ Translating...' : '🤖 Generate'}
        </button>
      </div>

      {/* Side-by-side */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div className="glass-card" style={{ padding: '1rem', minHeight: '20rem' }}>
          <h3
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}
          >
            🇬🇧 English Original
          </h3>
          <textarea
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            placeholder="Paste English content here..."
            style={{
              width: '100%',
              minHeight: '16rem',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.8125rem',
              lineHeight: 1.8,
              resize: 'vertical',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>

        <div className="glass-card" style={{ padding: '1rem', minHeight: '20rem' }}>
          <h3
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}
          >
            {LANGUAGES.find((l) => l.code === language)?.nameNative} Translation
          </h3>
          <textarea
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="Translation will appear here..."
            style={{
              width: '100%',
              minHeight: '16rem',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.8125rem',
              lineHeight: 2,
              resize: 'vertical',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>
      </div>

      {/* Regional Context */}
      <div className="glass-card" style={{ padding: '1rem' }}>
        <h3
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}
        >
          🏛️ Regional Context Additions
        </h3>
        <textarea
          value={regionalContext}
          onChange={(e) => setRegionalContext(e.target.value)}
          placeholder="Add region-specific context, examples, or cultural references..."
          style={{
            width: '100%',
            minHeight: '4rem',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.8125rem',
            lineHeight: 1.8,
            resize: 'vertical',
            fontFamily: 'var(--font-body)',
          }}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={saveTranslation}
        disabled={saving || !topicSlug.trim() || !translation.trim()}
        style={{
          marginTop: '1rem',
          padding: '0.625rem 1.5rem',
          background:
            topicSlug && translation
              ? 'linear-gradient(135deg, #FF9933, #FFD700)'
              : 'rgba(255,255,255,0.05)',
          color:
            topicSlug && translation
              ? '#0A0A0A'
              : 'rgba(255,255,255,0.3)',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: topicSlug && translation ? 'pointer' : 'not-allowed',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        {saving ? '⏳ Saving...' : '✅ Save Translation'}
      </button>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            background: toast.type === 'success' ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)',
            color: '#fff',
            fontSize: '0.875rem',
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

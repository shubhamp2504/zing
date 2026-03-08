/**
 * ⚡ Admin Create — Topic creation with AI drafting
 *
 * Split-screen: AI draft (left) + Edit (right)
 * Quality checklist sidebar.
 */
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const UNIVERSE_SUBWORLDS: Record<string, string[]> = {
  scholar: ['math', 'science', 'social-studies', 'languages', 'board-exams'],
  'code-cosmos': ['foundations', 'frontend', 'backend', 'devops', 'dsa-interview'],
  'battle-ground': ['upsc', 'jee-neet', 'cat-mba', 'state-psc', 'ssc-banking'],
  career: ['interviews', 'startup', 'finance', 'soft-skills', 'industry-guides'],
  civilization: ['itihasa', 'strategy', 'indian-history', 'constitution', 'great-leaders'],
  knowledge: ['space', 'earth', 'oceans', 'human-body', 'everyday-science'],
  curiosity: ['psychology', 'philosophy', 'unsolved', 'pop-culture', 'future-tech'],
};

const SLUG_TO_ENUM: Record<string, string> = {
  scholar: 'SCHOLAR',
  'code-cosmos': 'CODE_COSMOS',
  'battle-ground': 'BATTLE_GROUND',
  career: 'CAREER',
  civilization: 'CIVILIZATION',
  knowledge: 'KNOWLEDGE',
  curiosity: 'CURIOSITY',
};

const UNIVERSES = Object.keys(UNIVERSE_SUBWORLDS);

const QUALITY_CHECKLIST = [
  'Hook is compelling (< 20 words)',
  'Desi analogy included',
  'Mirror Moment question drafted',
  'Snap View summary (< 100 words)',
  'At least 2 exam tags',
  'ZING Moment sentence identified',
  'Sources cited (min 2)',
  'Meme/Hinglish element present',
  'Cross-universe connection identified',
  'Proofread for accuracy',
];

const DRAFT_KEY = 'zing-admin-draft';

export default function CreateTopicPage() {
  const [title, setTitle] = useState('');
  const [universe, setUniverse] = useState(UNIVERSES[0]!);
  const [subWorld, setSubWorld] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [editContent, setEditContent] = useState('');
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [checklist, setChecklist] = useState<boolean[]>(
    new Array(QUALITY_CHECKLIST.length).fill(false)
  );
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.title) setTitle(draft.title);
        if (draft.universe) setUniverse(draft.universe);
        if (draft.subWorld) setSubWorld(draft.subWorld);
        if (draft.editContent) setEditContent(draft.editContent);
        if (draft.aiDraft) setAiDraft(draft.aiDraft);
        if (draft.checklist) setChecklist(draft.checklist);
      }
    } catch { /* ignore */ }
  }, []);

  // Reset subWorld when universe changes
  useEffect(() => {
    setSubWorld('');
  }, [universe]);

  // Auto-save every 30s
  useEffect(() => {
    if (!title && !editContent) return;
    autoSaveTimer.current = setInterval(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, universe, subWorld, editContent, aiDraft, checklist }));
        showToast('Draft auto-saved', 'success');
      } catch { /* ignore */ }
    }, 30000);
    return () => {
      if (autoSaveTimer.current) clearInterval(autoSaveTimer.current);
    };
  }, [title, universe, subWorld, editContent, aiDraft, checklist]);

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, universe, subWorld, editContent, aiDraft, checklist }));
      showToast('Draft saved!', 'success');
    } catch {
      showToast('Failed to save draft', 'error');
    }
  }, [title, universe, subWorld, editContent, aiDraft, checklist]);

  const publishTopic = useCallback(async () => {
    if (!title.trim() || !subWorld) return;
    setPublishing(true);
    try {
      const res = await fetch('/api/admin/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          universe: SLUG_TO_ENUM[universe],
          subWorld,
          content: editContent,
          quickShotSummary: editContent.slice(0, 250),
          status: 'PUBLISHED',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Publish failed', 'error');
      } else {
        showToast(`Published! /${universe}/${subWorld}/${data.slug}`, 'success');
        localStorage.removeItem(DRAFT_KEY);
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setPublishing(false);
    }
  }, [title, universe, subWorld, editContent]);

  const generateDraft = useCallback(async () => {
    if (!title.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate a complete ZING topic draft for "${title}" in the ${universe} universe. Include: hook, content sections, desi analogy, mirror moment question, exam tags, snap view summary.`,
          history: [],
        }),
      });
      const data = await res.json();
      setAiDraft(data.text ?? 'Failed to generate draft');
    } catch {
      setAiDraft('Error generating draft. Check AI configuration.');
    } finally {
      setGenerating(false);
    }
  }, [title, universe]);

  const toggleCheck = useCallback((index: number) => {
    setChecklist((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const completedChecks = checklist.filter(Boolean).length;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          ✍️ Create Topic
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="glass-card"
            onClick={saveDraft}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
            }}
          >
            Save Draft
          </button>
          <button
            onClick={publishTopic}
            disabled={completedChecks < 8 || publishing || !title.trim() || !subWorld}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              background:
                completedChecks >= 8
                  ? 'linear-gradient(135deg, #FF9933, #FFD700)'
                  : 'rgba(255,255,255,0.05)',
              color: completedChecks >= 8 ? '#0A0A0A' : 'rgba(255,255,255,0.3)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: completedChecks >= 8 ? 'pointer' : 'not-allowed',
            }}
          >
            {publishing ? '⏳ Publishing...' : `Publish (${completedChecks}/${QUALITY_CHECKLIST.length})`}
          </button>
        </div>
      </div>

      {/* Meta Fields */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.75rem',
          marginBottom: '1rem',
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Topic title..."
          style={{
            gridColumn: 'span 3',
            padding: '0.625rem 0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.5rem',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1rem',
            fontWeight: 600,
            outline: 'none',
          }}
        />
        <select
          value={universe}
          onChange={(e) => setUniverse(e.target.value)}
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
          {UNIVERSES.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <select
          value={subWorld}
          onChange={(e) => setSubWorld(e.target.value)}
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
          <option value="">Select sub-world...</option>
          {(UNIVERSE_SUBWORLDS[universe] ?? []).map((sw) => (
            <option key={sw} value={sw}>
              {sw}
            </option>
          ))}
        </select>
        <button
          onClick={generateDraft}
          disabled={generating || !title.trim()}
          style={{
            padding: '0.5rem 0.75rem',
            background: generating
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,153,51,0.15)',
            color: generating ? 'rgba(255,255,255,0.3)' : '#FF9933',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: generating ? 'not-allowed' : 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 600,
          }}
        >
          {generating ? '⏳ Generating...' : '🤖 Generate AI Draft'}
        </button>
      </div>

      {/* Split Screen */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* AI Draft (left) */}
        <div
          className="glass-card"
          style={{
            padding: '1rem',
            minHeight: '24rem',
            overflow: 'auto',
          }}
        >
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
            🤖 AI Draft
          </h3>
          {aiDraft ? (
            <pre
              style={{
                fontSize: '0.8125rem',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {aiDraft}
            </pre>
          ) : (
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255,255,255,0.2)',
                textAlign: 'center',
                marginTop: '6rem',
              }}
            >
              Enter a title and click &quot;Generate AI Draft&quot;
            </p>
          )}
        </div>

        {/* Edit Panel (right) */}
        <div
          className="glass-card"
          style={{
            padding: '1rem',
            minHeight: '24rem',
          }}
        >
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
            ✍️ Your Edit
          </h3>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Write or paste your content here..."
            style={{
              width: '100%',
              minHeight: '20rem',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.8125rem',
              lineHeight: 1.8,
              resize: 'vertical',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>
      </div>

      {/* Quality Checklist */}
      <div className="glass-card" style={{ padding: '1rem' }}>
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
          ✅ Quality Checklist ({completedChecks}/{QUALITY_CHECKLIST.length})
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
            gap: '0.25rem',
          }}
        >
          {QUALITY_CHECKLIST.map((item, i) => (
            <label
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.8125rem',
                color: checklist[i]
                  ? 'rgba(255,255,255,0.8)'
                  : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={checklist[i] ?? false}
                onChange={() => toggleCheck(i)}
                style={{
                  accentColor: '#FFD700',
                }}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
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

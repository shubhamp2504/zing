/**
 * ⚡ Admin Pipeline — Content approval queue
 *
 * Shows DRAFT and REVIEW topics with approve/reject workflow.
 */
'use client';

import { useState, useEffect, useCallback } from 'react';

interface PipelineTopic {
  id: string;
  slug: string;
  title: string;
  universe: string;
  subWorld: string;
  difficulty: string;
  status: string;
  readTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

const UNIVERSE_LABELS: Record<string, string> = {
  SCHOLAR: '📖 Scholar',
  CODE_COSMOS: '💻 Code Cosmos',
  BATTLE_GROUND: '⚔️ Battle Ground',
  CAREER: '💼 Career',
  CIVILIZATION: '🏛️ Civilization',
  KNOWLEDGE: '🔬 Knowledge',
  CURIOSITY: '🧩 Curiosity',
};

export default function PipelinePage() {
  const [filter, setFilter] = useState<'all' | 'DRAFT' | 'REVIEW'>('all');
  const [topics, setTopics] = useState<PipelineTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchTopics = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/pipeline');
      if (res.ok) setTopics(await res.json());
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTopics(); }, [fetchTopics]);

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  const updateStatus = async (id: string, status: 'PUBLISHED' | 'ARCHIVED') => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/admin/pipeline', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setTopics((prev) => prev.filter((t) => t.id !== id));
        showToast(`Topic ${status === 'PUBLISHED' ? 'published' : 'archived'}!`, 'success');
      } else {
        showToast('Action failed', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = topics.filter(
    (t) => filter === 'all' || t.status === filter
  );

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
          🤖 AI Pipeline
        </h1>
        <a
          href="/admin/create"
          className="glass-card"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            color: '#FFD700',
            fontWeight: 600,
            cursor: 'pointer',
            border: '1px solid rgba(255,215,0,0.2)',
            textDecoration: 'none',
          }}
        >
          + Create New Topic
        </a>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['all', 'DRAFT', 'REVIEW'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              background:
                filter === f ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
              color:
                filter === f ? '#FFD700' : 'rgba(255,255,255,0.5)',
            }}
          >
            {f === 'all' ? `All (${topics.length})` : `${f} (${topics.filter(t => t.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div
          className="glass-card"
          style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}
        >
          <p style={{ fontSize: '0.875rem' }}>⏳ Loading pipeline...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: '3rem',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</p>
          <p style={{ fontSize: '0.875rem' }}>
            {topics.length === 0
              ? 'No draft or review topics. Create one from the Create page.'
              : 'No topics match this filter.'}
          </p>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {['Title', 'Universe', 'Difficulty', 'Status', 'Updated', 'Actions'].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        fontSize: '0.6875rem',
                        color: 'rgba(255,255,255,0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((topic) => (
                <tr
                  key={topic.id}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                  }}
                >
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>
                    {topic.title}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.6)' }}>
                    {UNIVERSE_LABELS[topic.universe] ?? topic.universe}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>
                    {topic.difficulty}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '0.25rem',
                        background: topic.status === 'REVIEW' ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
                        color: topic.status === 'REVIEW' ? '#FFD700' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {topic.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {new Date(topic.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        onClick={() => updateStatus(topic.id, 'PUBLISHED')}
                        disabled={actionLoading === topic.id}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.6875rem',
                          background: 'rgba(16,185,129,0.15)',
                          color: '#10B981',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: actionLoading === topic.id ? 'wait' : 'pointer',
                        }}
                        title="Publish"
                      >
                        ✓ Publish
                      </button>
                      <button
                        onClick={() => updateStatus(topic.id, 'ARCHIVED')}
                        disabled={actionLoading === topic.id}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.6875rem',
                          background: 'rgba(239,68,68,0.15)',
                          color: '#EF4444',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: actionLoading === topic.id ? 'wait' : 'pointer',
                        }}
                        title="Archive"
                      >
                        ✕ Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

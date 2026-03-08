/**
 * ⚡ Admin Connect — ZING Connection creator
 *
 * Create cross-topic connections with strength slider.
 * Fetches existing connections and allows creating new ones.
 */
'use client';

import { useState, useEffect, useCallback } from 'react';

const RELATION_TYPES = ['PREREQUISITE', 'RELATED', 'BUILDS_ON', 'OPPOSITE', 'DEEPER'] as const;

interface Connection {
  id: string;
  relationType: string;
  strength: number;
  createdAt: string;
  fromTopic: { slug: string; title: string };
  toTopic: { slug: string; title: string };
}

export default function ConnectPage() {
  const [topicA, setTopicA] = useState('');
  const [topicB, setTopicB] = useState('');
  const [connectionType, setConnectionType] = useState<(typeof RELATION_TYPES)[number]>('RELATED');
  const [strength, setStrength] = useState(0.5);
  const [creating, setCreating] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  const fetchConnections = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/connections');
      if (res.ok) setConnections(await res.json());
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchConnections(); }, [fetchConnections]);

  const createConnection = async () => {
    if (!topicA.trim() || !topicB.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/admin/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromSlug: topicA.trim(),
          toSlug: topicB.trim(),
          relationType: connectionType,
          strength,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed', 'error');
      } else {
        showToast('Connection created!', 'success');
        setTopicA('');
        setTopicB('');
        setStrength(0.5);
        fetchConnections();
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        🔗 Create Connection
      </h1>

      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          maxWidth: '36rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.375rem',
              }}
            >
              Topic A
            </label>
            <input
              value={topicA}
              onChange={(e) => setTopicA(e.target.value)}
              placeholder="Search topic..."
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.5rem',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.8125rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)' }}>
            ↕️
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.375rem',
              }}
            >
              Topic B
            </label>
            <input
              value={topicB}
              onChange={(e) => setTopicB(e.target.value)}
              placeholder="Search topic..."
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.5rem',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.8125rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.375rem',
              }}
            >
              Relation Type
            </label>
            <select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value as (typeof RELATION_TYPES)[number])}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.5rem',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.8125rem',
                outline: 'none',
              }}
            >
              {RELATION_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.375rem',
              }}
            >
              <span>Strength</span>
              <span style={{ color: '#FFD700' }}>{strength.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={strength}
              onChange={(e) => setStrength(parseFloat(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#FFD700',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.625rem',
                color: 'rgba(255,255,255,0.2)',
                marginTop: '0.25rem',
              }}
            >
              <span>Loose</span>
              <span>Strong</span>
            </div>
          </div>

          {/* Preview */}
          {topicA && topicB && (
            <div
              style={{
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.08)',
              }}
            >
              <p
                style={{
                  fontSize: '0.6875rem',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: '0.5rem',
                }}
              >
                Preview:
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                <strong>{topicA}</strong> → <span style={{ color: '#FFD700' }}>{connectionType}</span> → <strong>{topicB}</strong>
              </p>
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '0.25rem',
                }}
              >
                Strength: {strength.toFixed(1)}
              </p>
            </div>
          )}

          <button
            onClick={createConnection}
            disabled={!topicA || !topicB || creating}
            style={{
              padding: '0.625rem 1rem',
              background:
                topicA && topicB
                  ? 'linear-gradient(135deg, #FF9933, #FFD700)'
                  : 'rgba(255,255,255,0.05)',
              color:
                topicA && topicB
                  ? '#0A0A0A'
                  : 'rgba(255,255,255,0.3)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor:
                topicA && topicB ? 'pointer' : 'not-allowed',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {creating ? '⏳ Creating...' : 'Create Connection'}
          </button>
        </div>
      </div>

      {/* Existing Connections */}
      <div className="glass-card" style={{ padding: '1.25rem', marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
          Existing Connections ({connections.length})
        </h2>
        {connections.length === 0 ? (
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
            No connections yet. Create one above.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {connections.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  background: 'rgba(255,255,255,0.03)',
                  fontSize: '0.8125rem',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{c.fromTopic.title}</span>
                <span style={{ color: '#FFD700', fontSize: '0.6875rem', fontWeight: 600 }}>{c.relationType}</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{c.toTopic.title}</span>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
                  {c.strength.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

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

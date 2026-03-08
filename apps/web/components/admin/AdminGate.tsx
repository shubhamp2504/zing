'use client';

import { useState, useEffect, type ReactNode } from 'react';

export default function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('zing-admin-ok') === '1') {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem('zing-admin-ok', '1');
        setAuthed(true);
      } else {
        setError('Wrong password');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (authed === null) return null; // loading

  if (authed) return <>{children}</>;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '0.75rem',
          padding: '2.5rem',
          width: '22rem',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</p>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFD700', marginBottom: '0.25rem' }}>
          ZING Admin
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
          Enter admin password to continue
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%',
            padding: '0.625rem 0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '0.5rem',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.875rem',
            outline: 'none',
            marginBottom: '0.75rem',
          }}
        />
        {error && (
          <p style={{ fontSize: '0.8125rem', color: '#EF4444', marginBottom: '0.75rem' }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          style={{
            width: '100%',
            padding: '0.625rem',
            background: 'linear-gradient(135deg, #FF9933, #FFD700)',
            color: '#0A0A0A',
            fontWeight: 600,
            fontSize: '0.875rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: loading ? 'wait' : 'pointer',
          }}
        >
          {loading ? '⏳ Verifying...' : 'Enter Admin'}
        </button>
      </form>
    </div>
  );
}

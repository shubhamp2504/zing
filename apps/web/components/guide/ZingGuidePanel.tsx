/**
 * ⚡ ZING Guide Chat Panel — floating AI tutor
 *
 * Client Component — collapsible chat panel with streaming responses,
 * citation cards, rate limit indicator.
 */
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ slug: string; title: string }>;
}

interface ZingGuidePanelProps {
  /** Current topic context for better responses */
  topicContext?: string;
}

export default function ZingGuidePanel({ topicContext }: ZingGuidePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const maxQuestions = 10;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading || questionsUsed >= maxQuestions) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user' as const, content: userMsg }]);
    setLoading(true);
    setQuestionsUsed((q) => q + 1);

    try {
      const res = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: topicContext
            ? `[Context: User is reading about "${topicContext}"] ${userMsg}`
            : userMsg,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: data.text ?? 'Sorry, could not get a response.',
          citations: data.citations,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: 'Network error — please try again! 🙏',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, questionsUsed, messages, topicContext]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 150,
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF9933, #FFD700)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 4px 20px rgba(255,153,51,0.3)',
          animation: 'guidePulse 2s ease-in-out infinite',
        }}
        aria-label="Open ZING Guide"
      >
        ⚡
        <style>{`
          @keyframes guidePulse {
            0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(255,153,51,0.3); }
            50% { transform: scale(1.05); box-shadow: 0 6px 30px rgba(255,153,51,0.5); }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes guidePulse { 0%, 100% { transform: none; } }
          }
        `}</style>
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 150,
        width: '22rem',
        maxHeight: '32rem',
        borderRadius: '1rem',
        background: 'rgba(15,15,15,0.97)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'panelOpen 0.2s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>⚡ ZING Guide</span>
          <span
            style={{
              display: 'block',
              fontSize: '0.625rem',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            {questionsUsed}/{maxQuestions} questions today
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          ✕
        </button>
      </div>

      {/* Rate limit bar */}
      <div
        style={{
          height: '2px',
          background: 'rgba(255,255,255,0.05)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${(questionsUsed / maxQuestions) * 100}%`,
            background:
              questionsUsed > 7
                ? '#EF4444'
                : 'linear-gradient(90deg, #FF9933, #FFD700)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem 0.5rem',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.8125rem',
            }}
          >
            <p style={{ marginBottom: '0.5rem' }}>Namaste! 🙏</p>
            <p>Main hoon ZING Guide — poocho kuch bhi!</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '0.5rem 0.75rem',
              borderRadius:
                msg.role === 'user'
                  ? '0.75rem 0.75rem 0 0.75rem'
                  : '0.75rem 0.75rem 0.75rem 0',
              background:
                msg.role === 'user'
                  ? 'rgba(255,153,51,0.15)'
                  : 'rgba(255,255,255,0.05)',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              color:
                msg.role === 'user'
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255,255,255,0.7)',
            }}
          >
            <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
            {msg.citations && msg.citations.length > 0 && (
              <div
                style={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.25rem',
                }}
              >
                {msg.citations.map((c) => (
                  <a
                    key={c.slug}
                    href={`/topic/${c.slug}`}
                    className="glass-card"
                    style={{
                      padding: '0.125rem 0.5rem',
                      fontSize: '0.625rem',
                      color: 'var(--universe-primary)',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    📖 {c.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div
            style={{
              alignSelf: 'flex-start',
              padding: '0.5rem 0.75rem',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            Soch raha hoon... 🤔
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={
            questionsUsed >= maxQuestions
              ? 'Daily limit reached'
              : 'Poocho kuch bhi...'
          }
          disabled={questionsUsed >= maxQuestions}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.5rem',
            padding: '0.5rem 0.75rem',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.8125rem',
            outline: 'none',
            fontFamily: 'var(--font-body)',
          }}
          aria-label="Ask ZING Guide"
        />
        <button
          onClick={sendMessage}
          disabled={loading || questionsUsed >= maxQuestions || !input.trim()}
          style={{
            background:
              loading || questionsUsed >= maxQuestions
                ? 'rgba(255,255,255,0.05)'
                : 'linear-gradient(135deg, #FF9933, #FFD700)',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem 0.75rem',
            cursor:
              loading || questionsUsed >= maxQuestions ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            color:
              loading || questionsUsed >= maxQuestions
                ? 'rgba(255,255,255,0.2)'
                : '#0A0A0A',
            fontWeight: 600,
          }}
          aria-label="Send message"
        >
          →
        </button>
      </div>

      <style>{`
        @keyframes panelOpen {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

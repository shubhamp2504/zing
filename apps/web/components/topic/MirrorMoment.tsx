/**
 * ⚡ MirrorMoment — ZING's emotional signature component
 *
 * THE component that makes ZING different from Wikipedia.
 * No borders. No card. Pure presence. Word-by-word reveal.
 * SVG Lotus bloom with saffron-to-gold gradient petals.
 *
 * Renders as Server Component (static HTML + CSS animations).
 * IntersectionObserver trigger handled via CSS animation-timeline: view()
 */

interface MirrorMomentProps {
  question: string;
  universe: string;
}

export default function MirrorMoment({ question, universe }: MirrorMomentProps) {
  const words = question.split(' ');

  return (
    <section
      className="scroll-reveal"
      aria-label="Mirror moment — a moment of reflection"
      style={{
        padding: '6rem 1.5rem 4rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Subtle universe glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, color-mix(in srgb, var(--universe-primary) 3%, transparent) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Word-by-word question reveal */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.5,
          maxWidth: '36rem',
          margin: '0 auto 3rem',
          position: 'relative',
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="mirror-word"
            style={{
              display: 'inline-block',
              opacity: 0,
              animation: `mirrorWordFade 0.4s ease forwards`,
              animationDelay: `${i * 0.03}s`,
              animationTimeline: 'view()',
              marginRight: '0.3em',
            }}
          >
            {word}
          </span>
        ))}
      </p>

      {/* SVG Lotus */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
          position: 'relative',
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Lotus bloom"
        >
          <defs>
            <linearGradient id="lotusGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>

          {/* Petal 1 — top */}
          <path
            d="M50 15 Q60 35 50 50 Q40 35 50 15"
            stroke="url(#lotusGradient)"
            strokeWidth="1.5"
            fill="none"
            className="lotus-petal"
            style={{ animationDelay: '0s' }}
          />
          {/* Petal 2 — top-right */}
          <path
            d="M65 20 Q70 40 55 50 Q55 30 65 20"
            stroke="url(#lotusGradient)"
            strokeWidth="1.5"
            fill="none"
            className="lotus-petal"
            style={{ animationDelay: '0.3s' }}
          />
          {/* Petal 3 — right */}
          <path
            d="M75 35 Q70 50 55 55 Q65 40 75 35"
            stroke="url(#lotusGradient)"
            strokeWidth="1.5"
            fill="none"
            className="lotus-petal"
            style={{ animationDelay: '0.6s' }}
          />
          {/* Petal 4 — top-left */}
          <path
            d="M35 20 Q30 40 45 50 Q45 30 35 20"
            stroke="url(#lotusGradient)"
            strokeWidth="1.5"
            fill="none"
            className="lotus-petal"
            style={{ animationDelay: '0.9s' }}
          />
          {/* Petal 5 — left */}
          <path
            d="M25 35 Q30 50 45 55 Q35 40 25 35"
            stroke="url(#lotusGradient)"
            strokeWidth="1.5"
            fill="none"
            className="lotus-petal"
            style={{ animationDelay: '1.2s' }}
          />

          {/* ZING ⚡ center — fades in after lotus completes */}
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fontSize="14"
            fill="#FFD700"
            className="zing-center"
          >
            ⚡
          </text>
        </svg>
      </div>

      {/* "Pause. Think." message */}
      <p
        className="mirror-cta"
        style={{
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.25)',
          fontFamily: 'var(--font-serif)',
          position: 'relative',
        }}
      >
        Pause. Think. Then continue your journey.
      </p>

      {/* ── CSS Animations (scoped) ── */}
      <style>{`
        @keyframes mirrorWordFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .lotus-petal {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: petalDraw 0.3s ease forwards;
          animation-timeline: view();
        }

        @keyframes petalDraw {
          to { stroke-dashoffset: 0; }
        }

        .zing-center {
          opacity: 0;
          animation: zingFadeIn 0.5s ease forwards;
          animation-delay: 2s;
          animation-timeline: view();
        }

        @keyframes zingFadeIn {
          to { opacity: 1; }
        }

        .mirror-cta {
          opacity: 0;
          animation: mirrorWordFade 0.8s ease forwards;
          animation-delay: 2.5s;
          animation-timeline: view();
        }

        @media (prefers-reduced-motion: reduce) {
          .mirror-word,
          .lotus-petal,
          .zing-center,
          .mirror-cta {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

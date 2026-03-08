'use client';

import { BADGES, type BadgeId } from '@/lib/gamification';

interface BadgeProgress {
  current: number;
  required: number;
}

interface BadgeShowcaseProps {
  earnedBadges: string[];
  badgeProgress: Record<string, BadgeProgress>;
  onClose: () => void;
}

const allBadges = Object.values(BADGES);

export default function BadgeShowcase({ earnedBadges, badgeProgress, onClose }: BadgeShowcaseProps) {
  const earnedCount = earnedBadges.length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'relative',
          maxHeight: '75vh',
          overflowY: 'auto',
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
          borderTop: '1px solid rgba(255,215,0,0.2)',
          borderRadius: '1.5rem 1.5rem 0 0',
          padding: '1.5rem 1rem 5rem',
          animation: 'badgePanelSlide 0.35s ease-out',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>🏆</div>
          <h2
            style={{
              margin: 0,
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#FFD700',
              letterSpacing: '0.02em',
            }}
          >
            उपलब्धियाँ
          </h2>
          <p
            style={{
              margin: '0.25rem 0 0',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {earnedCount} / {allBadges.length} badges unlocked
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close badge showcase"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* Badge Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
            gap: '0.75rem',
          }}
        >
          {allBadges.map((badge) => {
            const earned = earnedBadges.includes(badge.id);
            const progress = badgeProgress[badge.id];
            const pct = progress
              ? Math.min(100, Math.round((progress.current / progress.required) * 100))
              : 0;

            return (
              <div
                key={badge.id}
                style={{
                  position: 'relative',
                  background: earned
                    ? 'linear-gradient(135deg, rgba(255,215,0,0.12) 0%, rgba(255,140,0,0.08) 100%)'
                    : 'rgba(255,255,255,0.03)',
                  border: earned
                    ? '1px solid rgba(255,215,0,0.35)'
                    : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '1rem',
                  padding: '1rem 0.75rem',
                  textAlign: 'center',
                  opacity: earned ? 1 : 0.55,
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: '2rem',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                    filter: earned ? 'none' : 'grayscale(1)',
                  }}
                >
                  {badge.icon}
                </div>

                {/* Hindi Name */}
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: earned ? '#FFD700' : 'rgba(255,255,255,0.5)',
                    marginBottom: '0.15rem',
                  }}
                >
                  {badge.name}
                </div>

                {/* English Name */}
                <div
                  style={{
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {badge.nameEn}
                </div>

                {/* Progress / Status */}
                {earned ? (
                  <div
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      color: '#FFD700',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    ✓ Unlocked
                  </div>
                ) : progress ? (
                  <div>
                    <div
                      style={{
                        height: '3px',
                        borderRadius: '2px',
                        background: 'rgba(255,255,255,0.08)',
                        overflow: 'hidden',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: 'linear-gradient(90deg, #555, #888)',
                          borderRadius: '2px',
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>
                      {progress.current} / {progress.required}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)' }}>
                    🔒 Locked
                  </div>
                )}

                {/* Earned glow */}
                {earned && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-1px',
                      borderRadius: '1rem',
                      boxShadow: '0 0 12px rgba(255,215,0,0.15)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.25)',
            marginTop: '1.25rem',
          }}
        >
          Keep reading topics to unlock more badges!
        </p>
      </div>

      <style>{`
        @keyframes badgePanelSlide {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

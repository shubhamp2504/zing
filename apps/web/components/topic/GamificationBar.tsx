'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { BADGES, XP_ACTIONS, getLevelForXP, calculateStreak } from '@/lib/gamification';
import BadgeShowcase from '@/components/gamification/BadgeShowcase';

const STORAGE_KEY = 'zing-gamification';

interface GamificationState {
  totalXP: number;
  streak: number;
  lastActiveDate: string | null;
  topicsRead: string[];
  // Badge tracking
  earnedBadges: string[];
  topicsByUniverse: Record<string, string[]>;
}

const EMPTY_STATE: GamificationState = {
  totalXP: 0,
  streak: 0,
  lastActiveDate: null,
  topicsRead: [],
  earnedBadges: [],
  topicsByUniverse: {},
};

function loadState(): GamificationState {
  if (typeof window === 'undefined') return { ...EMPTY_STATE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate old state without badge fields
      return {
        ...EMPTY_STATE,
        ...parsed,
        earnedBadges: parsed.earnedBadges ?? [],
        topicsByUniverse: parsed.topicsByUniverse ?? {},
      };
    }
  } catch {}
  return { ...EMPTY_STATE };
}

function saveState(state: GamificationState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

/** Map URL universe slug → badge requirement universe slug */
const UNIVERSE_TO_BADGE: Record<string, string> = {
  scholar: 'kaal-yatra',
  'code-cosmos': 'tech-sutra',
  'battle-ground': 'nyaya-drishti',
  knowledge: 'gyaan-netra',
  curiosity: 'moksha-lab',
  career: 'arthashastra-2-0',
  civilization: 'rang-manch',
};

/** Check all badge requirements against current state */
function checkBadges(state: GamificationState): string[] {
  const earned: string[] = [...state.earnedBadges];

  for (const badge of Object.values(BADGES)) {
    if (earned.includes(badge.id)) continue;

    const req = badge.requirement;
    let unlocked = false;

    if (req.type === 'streak') {
      unlocked = state.streak >= req.count;
    } else if (req.type === 'all_universes') {
      unlocked = Object.keys(state.topicsByUniverse).length >= req.count;
    } else if (req.type === 'universe_topics') {
      // Map badge universe slug to URL universes
      const matchingUniverses = Object.entries(UNIVERSE_TO_BADGE)
        .filter(([, badgeSlug]) => badgeSlug === req.universe)
        .map(([urlSlug]) => urlSlug);
      const count = matchingUniverses.reduce(
        (sum, u) => sum + (state.topicsByUniverse[u]?.length ?? 0),
        0,
      );
      unlocked = count >= req.count;
    }
    // shares, cinematic_views require future tracking

    if (unlocked) earned.push(badge.id);
  }

  return earned;
}

/** Compute progress for each badge */
function getBadgeProgress(state: GamificationState): Record<string, { current: number; required: number }> {
  const progress: Record<string, { current: number; required: number }> = {};

  for (const badge of Object.values(BADGES)) {
    const req = badge.requirement;

    if (req.type === 'streak') {
      progress[badge.id] = { current: state.streak, required: req.count };
    } else if (req.type === 'all_universes') {
      progress[badge.id] = { current: Object.keys(state.topicsByUniverse).length, required: req.count };
    } else if (req.type === 'universe_topics') {
      const matchingUniverses = Object.entries(UNIVERSE_TO_BADGE)
        .filter(([, badgeSlug]) => badgeSlug === req.universe)
        .map(([urlSlug]) => urlSlug);
      const count = matchingUniverses.reduce(
        (sum, u) => sum + (state.topicsByUniverse[u]?.length ?? 0),
        0,
      );
      progress[badge.id] = { current: count, required: req.count };
    } else if (req.type === 'shares') {
      progress[badge.id] = { current: 0, required: req.count };
    } else if (req.type === 'cinematic_views') {
      progress[badge.id] = { current: 0, required: req.count };
    }
  }

  return progress;
}

interface GamificationBarProps {
  topicSlug: string;
  universe: string;
}

export default function GamificationBar({ topicSlug, universe }: GamificationBarProps) {
  const [state, setState] = useState<GamificationState | null>(null);
  const [xpGained, setXpGained] = useState(0);
  const [showBadges, setShowBadges] = useState(false);
  const [newBadge, setNewBadge] = useState<string | null>(null);
  const hasAwarded = useRef(false);

  useEffect(() => {
    const current = loadState();

    // Update streak
    const streakResult = calculateStreak(
      current.lastActiveDate ? new Date(current.lastActiveDate) : null
    );
    if (streakResult.streakBroken) {
      current.streak = 1;
    } else if (streakResult.newStreak > 0) {
      current.streak += 1;
    }
    current.lastActiveDate = new Date().toISOString();

    // Track universe
    if (!current.topicsByUniverse[universe]) {
      current.topicsByUniverse[universe] = [];
    }
    if (!current.topicsByUniverse[universe].includes(topicSlug)) {
      current.topicsByUniverse[universe].push(topicSlug);
    }

    // Award XP once per topic
    if (!hasAwarded.current && !current.topicsRead.includes(topicSlug)) {
      hasAwarded.current = true;
      const xp = XP_ACTIONS.READ_TOPIC;
      current.totalXP += xp;
      current.topicsRead.push(topicSlug);
      setXpGained(xp);
      setTimeout(() => setXpGained(0), 3000);
    }

    // Check badges
    const prevCount = current.earnedBadges.length;
    current.earnedBadges = checkBadges(current);
    if (current.earnedBadges.length > prevCount) {
      const latestBadge = current.earnedBadges[current.earnedBadges.length - 1]!;
      setNewBadge(latestBadge);
      setTimeout(() => setNewBadge(null), 4000);
    }

    saveState(current);
    setState(current);
  }, [topicSlug, universe]);

  const handleCloseBadges = useCallback(() => setShowBadges(false), []);

  if (!state) return null;

  const level = getLevelForXP(state.totalXP);
  const progressPct = Math.round(level.progressToNext * 100);
  const badgeCount = state.earnedBadges.length;
  const badgeProgress = getBadgeProgress(state);
  const newBadgeData = newBadge ? Object.values(BADGES).find((b) => b.id === newBadge) : null;

  return (
    <>
      {/* Badge unlock toast */}
      {newBadgeData && (
        <div
          style={{
            position: 'fixed',
            bottom: '3.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 150,
            background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.15))',
            border: '1px solid rgba(255,215,0,0.4)',
            borderRadius: '1rem',
            padding: '0.6rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation: 'badgeToast 4s ease-out forwards',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>{newBadgeData.icon}</span>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FFD700' }}>
              Badge Unlocked!
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)' }}>
              {newBadgeData.name} — {newBadgeData.nameEn}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          padding: '0.5rem 1rem',
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.6)',
        }}
      >
        {/* Streak */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
          <span>🔥</span>
          <span style={{ fontWeight: 600, color: state.streak >= 7 ? '#F59E0B' : 'rgba(255,255,255,0.7)' }}>
            {state.streak}
          </span>
        </div>

        {/* Level + Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
          <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap' }}>
            {level.nameHi}
          </span>
          <div
            style={{
              width: '5rem',
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #FFD700, #FF6B00)',
                borderRadius: '2px',
                transition: 'width 0.6s ease',
              }}
            />
          </div>
          {level.nextLevel && (
            <span style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>
              → {level.nextLevel.nameHi}
            </span>
          )}
        </div>

        {/* XP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0, position: 'relative' }}>
          <span>⚡</span>
          <span style={{ fontWeight: 600, color: '#FFD700' }}>{state.totalXP} XP</span>
          {xpGained > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-1.5rem',
                right: 0,
                fontWeight: 700,
                fontSize: '0.8rem',
                color: '#FFD700',
                animation: 'xpFloat 2.5s ease-out forwards',
                pointerEvents: 'none',
              }}
            >
              +{xpGained}
            </span>
          )}
        </div>

        {/* Badge trophy — opens showcase */}
        <button
          onClick={() => setShowBadges(true)}
          aria-label="View achievements"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            flexShrink: 0,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: badgeCount > 0 ? '#FFD700' : 'rgba(255,255,255,0.5)',
            fontSize: '0.75rem',
          }}
        >
          <span>🏆</span>
          <span style={{ fontWeight: 600 }}>{badgeCount}</span>
        </button>

        {/* Topics count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
          <span>📖</span>
          <span>{state.topicsRead.length}</span>
        </div>
      </div>

      {/* Badge Showcase overlay */}
      {showBadges && (
        <BadgeShowcase
          earnedBadges={state.earnedBadges}
          badgeProgress={badgeProgress}
          onClose={handleCloseBadges}
        />
      )}

      <style>{`
        @keyframes xpFloat {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-2rem); }
        }
        @keyframes badgeToast {
          0% { opacity: 0; transform: translateX(-50%) translateY(1rem); }
          10% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-0.5rem); }
        }
      `}</style>
    </>
  );
}

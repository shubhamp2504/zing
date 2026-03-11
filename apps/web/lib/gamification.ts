/**
 * ⚡ Gamification System — Streaks, XP, Badges, Leaderboard
 *
 * Server-side gamification logic. Integrates with user profiles.
 */

import { z } from 'zod';

// ─── XP Configuration ───────────────────────────────────

export const XP_ACTIONS = {
  READ_TOPIC: 10,
  COMPLETE_SNAP_VIEW: 5,
  SHARE_TOPIC: 15,
  COMPLETE_CINEMATIC: 25,
  // Removed: COMPLETE_STORY_MODE (20) - Story mode discontinued
  // Removed: COMPLETE_SWIPE_DECK (15) - Swipe mode discontinued
  ASK_ZING_GUIDE: 5,
  DAILY_LOGIN: 10,
  STREAK_BONUS_7: 50,
  STREAK_BONUS_30: 200,
  FIRST_TOPIC_IN_UNIVERSE: 30,
  COMPLETE_SUBWORLD: 100,
} as const;

export type XPAction = keyof typeof XP_ACTIONS;

// ─── Badge System ───────────────────────────────────────

export const BADGES = {
  // Universe Exploration
  kaal_explorer: {
    id: 'kaal_explorer',
    name: 'कालयात्री',
    nameEn: 'Time Traveler',
    description: 'Read 10 topics in Kaal Yatra',
    icon: '🕰️',
    requirement: { type: 'universe_topics' as const, universe: 'kaal-yatra', count: 10 },
  },
  gyaan_seeker: {
    id: 'gyaan_seeker',
    name: 'ज्ञान साधक',
    nameEn: 'Knowledge Seeker',
    description: 'Read 10 topics in Gyaan Netra',
    icon: '🔬',
    requirement: { type: 'universe_topics' as const, universe: 'gyaan-netra', count: 10 },
  },
  nyaya_champion: {
    id: 'nyaya_champion',
    name: 'न्याय दूत',
    nameEn: 'Justice Champion',
    description: 'Read 10 topics in Nyaya Drishti',
    icon: '⚖️',
    requirement: { type: 'universe_topics' as const, universe: 'nyaya-drishti', count: 10 },
  },
  tech_guru: {
    id: 'tech_guru',
    name: 'तकनीकी गुरु',
    nameEn: 'Tech Guru',
    description: 'Read 10 topics in Tech Sutra',
    icon: '💻',
    requirement: { type: 'universe_topics' as const, universe: 'tech-sutra', count: 10 },
  },
  rang_lover: {
    id: 'rang_lover',
    name: 'कला प्रेमी',
    nameEn: 'Art Lover',
    description: 'Read 10 topics in Rang Manch',
    icon: '🎭',
    requirement: { type: 'universe_topics' as const, universe: 'rang-manch', count: 10 },
  },
  artha_master: {
    id: 'artha_master',
    name: 'अर्थ विशेषज्ञ',
    nameEn: 'Economy Master',
    description: 'Read 10 topics in Arthashastra 2.0',
    icon: '📊',
    requirement: { type: 'universe_topics' as const, universe: 'arthashastra-2-0', count: 10 },
  },
  moksha_wanderer: {
    id: 'moksha_wanderer',
    name: 'मोक्ष यात्री',
    nameEn: 'Soul Wanderer',
    description: 'Read 10 topics in Moksha Lab',
    icon: '🧘',
    requirement: { type: 'universe_topics' as const, universe: 'moksha-lab', count: 10 },
  },

  // Streaks
  streak_7: {
    id: 'streak_7',
    name: 'सात दिन',
    nameEn: '7-Day Streak',
    description: 'Read for 7 consecutive days',
    icon: '🔥',
    requirement: { type: 'streak' as const, count: 7 },
  },
  streak_30: {
    id: 'streak_30',
    name: 'महीना पूरा',
    nameEn: '30-Day Streak',
    description: 'Read for 30 consecutive days',
    icon: '⚡',
    requirement: { type: 'streak' as const, count: 30 },
  },
  streak_100: {
    id: 'streak_100',
    name: 'शतक',
    nameEn: 'Century',
    description: 'Read for 100 consecutive days',
    icon: '👑',
    requirement: { type: 'streak' as const, count: 100 },
  },

  // Special
  all_universes: {
    id: 'all_universes',
    name: 'सप्तर्षि',
    nameEn: 'Seven Sages',
    description: 'Read at least one topic from every universe',
    icon: '🌟',
    requirement: { type: 'all_universes' as const, count: 7 },
  },
  first_share: {
    id: 'first_share',
    name: 'ज्ञान दाता',
    nameEn: 'Knowledge Giver',
    description: 'Share your first topic',
    icon: '🤝',
    requirement: { type: 'shares' as const, count: 1 },
  },
  cinematic_viewer: {
    id: 'cinematic_viewer',
    name: 'सिनेमा प्रेमी',
    nameEn: 'Cinematic Viewer',
    description: 'Complete 5 Cinematic Mode experiences',
    icon: '🎬',
    requirement: { type: 'cinematic_views' as const, count: 5 },
  },
} as const;

export type BadgeId = keyof typeof BADGES;

// ─── Level System ───────────────────────────────────────

export const LEVELS = [
  { level: 1, name: 'Vidyarthi', nameHi: 'विद्यार्थी', minXP: 0 },
  { level: 2, name: 'Learner', nameHi: 'शिक्षार्थी', minXP: 100 },
  { level: 3, name: 'Explorer', nameHi: 'खोजी', minXP: 300 },
  { level: 4, name: 'Scholar', nameHi: 'विद्वान', minXP: 700 },
  { level: 5, name: 'Guru', nameHi: 'गुरु', minXP: 1500 },
  { level: 6, name: 'Rishi', nameHi: 'ऋषि', minXP: 3000 },
  { level: 7, name: 'Maharishi', nameHi: 'महर्षि', minXP: 6000 },
  { level: 8, name: 'Brahmarishi', nameHi: 'ब्रह्मर्षि', minXP: 12000 },
] as const;

export function getLevelForXP(xp: number) {
  let currentLevel: (typeof LEVELS)[number] = LEVELS[0]!;
  for (const level of LEVELS) {
    if (xp >= level.minXP) currentLevel = level;
    else break;
  }
  const nextLevel = LEVELS.find((l) => l.minXP > xp);
  return {
    ...currentLevel,
    nextLevel: nextLevel ?? null,
    progressToNext: nextLevel
      ? (xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)
      : 1,
  };
}

// ─── Streak Logic ───────────────────────────────────────

export function calculateStreak(
  lastActiveDate: Date | null,
  currentDate: Date = new Date()
): { maintained: boolean; newStreak: number; streakBroken: boolean } {
  if (!lastActiveDate) {
    return { maintained: true, newStreak: 1, streakBroken: false };
  }

  const lastDate = new Date(lastActiveDate);
  const today = new Date(currentDate);

  // Normalize to IST (UTC+5:30)
  lastDate.setMinutes(lastDate.getMinutes() + 330);
  today.setMinutes(today.getMinutes() + 330);

  const lastDay = Math.floor(lastDate.getTime() / 86400000);
  const todayDay = Math.floor(today.getTime() / 86400000);
  const diff = todayDay - lastDay;

  if (diff === 0) return { maintained: true, newStreak: 0, streakBroken: false }; // Same day
  if (diff === 1) return { maintained: true, newStreak: 1, streakBroken: false }; // Consecutive
  return { maintained: false, newStreak: 1, streakBroken: true }; // Streak broken
}

// ─── The Inheritance (JS counter) ───────────────────────

/**
 * "India has created knowledge for 5000 years.
 *  This is contribution #[X]"
 *
 * Global counter of all topics ever read on ZING.
 * Increments with every topic view. Costs ₹0.
 */
export const INHERITANCE_CONFIG = {
  startDate: new Date('2025-01-01'),
  baseCount: 5000, // Start with 5000 for the feeling
  message: (count: number) =>
    `India has created knowledge for 5000 years. This is contribution #${count.toLocaleString('en-IN')}`,
  messageHi: (count: number) =>
    `भारत 5000 साल से ज्ञान बना रहा है। यह योगदान #${count.toLocaleString('en-IN')} है`,
};

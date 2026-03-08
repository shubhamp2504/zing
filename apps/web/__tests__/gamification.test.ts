/**
 * Unit tests for lib/gamification.ts
 */
import { describe, it, expect } from 'vitest';
import {
  XP_ACTIONS,
  BADGES,
  LEVELS,
  getLevelForXP,
  calculateStreak,
} from '../lib/gamification';

describe('XP System', () => {
  it('should have 12 XP actions', () => {
    expect(Object.keys(XP_ACTIONS)).toHaveLength(12);
  });

  it('all XP values should be positive integers', () => {
    for (const [, xp] of Object.entries(XP_ACTIONS)) {
      expect(xp).toBeGreaterThan(0);
      expect(Number.isInteger(xp)).toBe(true);
    }
  });
});

describe('Badge System', () => {
  it('should have badges defined', () => {
    const badgeKeys = Object.keys(BADGES);
    expect(badgeKeys.length).toBeGreaterThan(10);
  });

  it('each badge should have required fields', () => {
    for (const [, badge] of Object.entries(BADGES)) {
      expect(badge.id).toBeTruthy();
      expect(badge.name).toBeTruthy();
      expect(badge.icon).toBeTruthy();
      expect(badge.description).toBeTruthy();
    }
  });
});

describe('Level System', () => {
  it('should have 8 levels', () => {
    expect(LEVELS).toHaveLength(8);
  });

  it('levels should be sorted by minXP ascending', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      expect(LEVELS[i]!.minXP).toBeGreaterThan(LEVELS[i - 1]!.minXP);
    }
  });

  it('getLevelForXP(0) should return Vidyarthi (level 1)', () => {
    const result = getLevelForXP(0);
    expect(result.level).toBe(1);
    expect(result.name).toBe('Vidyarthi');
  });

  it('getLevelForXP(100) should return Learner (level 2)', () => {
    const result = getLevelForXP(100);
    expect(result.level).toBe(2);
  });

  it('getLevelForXP(12000) should return Brahmarishi (level 8)', () => {
    const result = getLevelForXP(12000);
    expect(result.level).toBe(8);
    expect(result.name).toBe('Brahmarishi');
    expect(result.nextLevel).toBeNull();
    expect(result.progressToNext).toBe(1);
  });

  it('getLevelForXP should include progress to next level', () => {
    const result = getLevelForXP(200); // Between level 2 (100) and level 3 (300)
    expect(result.level).toBe(2);
    expect(result.progressToNext).toBeCloseTo(0.5, 1);
  });
});

describe('Streak Logic', () => {
  it('should return newStreak 1 for null lastActiveDate', () => {
    const result = calculateStreak(null);
    expect(result.newStreak).toBe(1);
    expect(result.maintained).toBe(true);
  });

  it('should return maintained for same day', () => {
    const now = new Date();
    const result = calculateStreak(now, now);
    expect(result.maintained).toBe(true);
    expect(result.streakBroken).toBe(false);
  });

  it('should break streak after 2+ days gap', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000);
    const result = calculateStreak(twoDaysAgo);
    expect(result.streakBroken).toBe(true);
  });
});

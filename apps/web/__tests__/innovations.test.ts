/**
 * Unit tests for lib/innovations.ts
 */
import { describe, it, expect } from 'vitest';
import { getReadingRitual, DEPTH_LEVELS } from '../lib/innovations';

describe('Reading Ritual', () => {
  it('should return a greeting object', () => {
    const ritual = getReadingRitual();
    expect(ritual).toBeDefined();
    expect(ritual.greeting).toBeTruthy();
    expect(ritual.greetingHi).toBeTruthy();
    expect(ritual.emoji).toBeTruthy();
    expect(ritual.mood).toBeTruthy();
  });

  it('timeOfDay should be a valid period', () => {
    const ritual = getReadingRitual();
    expect(['morning', 'afternoon', 'evening', 'night']).toContain(ritual.mood);
  });
});

describe('Depth Levels', () => {
  it('should have 10 depth levels', () => {
    expect(DEPTH_LEVELS).toHaveLength(10);
  });

  it('each level should have required fields', () => {
    for (const level of DEPTH_LEVELS) {
      expect(level.level).toBeGreaterThan(0);
      expect(level.name).toBeTruthy();
      expect(level.description).toBeTruthy();
    }
  });

  it('levels should be numbered 1-10 in order', () => {
    DEPTH_LEVELS.forEach((level, idx) => {
      expect(level.level).toBe(idx + 1);
    });
  });
});

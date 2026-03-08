/**
 * Unit tests for lib/universes.ts
 */
import { describe, it, expect } from 'vitest';
import { UNIVERSES, findUniverse, findSubWorld } from '../lib/universes';

describe('Universe Configuration', () => {
  it('should have 7 universes', () => {
    expect(UNIVERSES).toHaveLength(7);
  });

  it('each universe should have required fields', () => {
    for (const u of UNIVERSES) {
      expect(u.id).toBeTruthy();
      expect(u.slug).toBeTruthy();
      expect(u.name).toBeTruthy();
      expect(u.colors).toBeDefined();
      expect(u.colors.primary).toBeTruthy();
      expect(u.icon).toBeTruthy();
      expect(u.subWorlds.length).toBeGreaterThan(0);
    }
  });

  it('each sub-world should have required fields', () => {
    for (const u of UNIVERSES) {
      for (const sw of u.subWorlds) {
        expect(sw.id).toBeTruthy();
        expect(sw.slug).toBeTruthy();
        expect(sw.name).toBeTruthy();
      }
    }
  });

  it('all slugs should be URL-safe', () => {
    const slugPattern = /^[a-z0-9-]+$/;
    for (const u of UNIVERSES) {
      expect(u.slug).toMatch(slugPattern);
      for (const sw of u.subWorlds) {
        expect(sw.slug).toMatch(slugPattern);
      }
    }
  });

  it('findUniverse should find scholar', () => {
    const scholar = findUniverse('scholar');
    expect(scholar).toBeDefined();
    expect(scholar?.name).toBe('Scholar');
  });

  it('findUniverse should return undefined for unknown slug', () => {
    expect(findUniverse('nonexistent')).toBeUndefined();
  });

  it('findSubWorld should find a sub-world', () => {
    const result = findSubWorld('scholar', 'math');
    expect(result).toBeDefined();
    expect(result?.name).toBe('Mathematics');
  });

  it('findSubWorld should return undefined for wrong universe', () => {
    expect(findSubWorld('nonexistent', 'math')).toBeUndefined();
  });

  it('total sub-worlds should be 35', () => {
    const total = UNIVERSES.reduce((acc, u) => acc + u.subWorlds.length, 0);
    expect(total).toBe(35);
  });
});

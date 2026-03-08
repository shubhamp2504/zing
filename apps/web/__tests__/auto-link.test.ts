/**
 * Unit tests for lib/auto-link.ts
 */
import { describe, it, expect } from 'vitest';
import { findAutoLinks } from '../lib/auto-link';

const SAMPLE_INDEX = [
  { slug: 'photosynthesis', title: 'Photosynthesis', universe: 'science', subWorld: 'biology' },
  { slug: 'gravity', title: 'Gravity', universe: 'science', subWorld: 'physics' },
  { slug: 'newton', title: 'Newton', universe: 'science', subWorld: 'physics', aliases: ['Isaac Newton'] },
];

describe('Auto-linking Engine', () => {
  it('should return empty array for empty text', () => {
    expect(findAutoLinks('', SAMPLE_INDEX)).toEqual([]);
  });

  it('should find known topic by title', () => {
    const links = findAutoLinks('The process of Photosynthesis converts sunlight.', SAMPLE_INDEX);
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]?.title).toBe('Photosynthesis');
  });

  it('should return objects with required fields', () => {
    const links = findAutoLinks('Newton discovered Gravity while watching an apple fall.', SAMPLE_INDEX);
    for (const link of links) {
      expect(link).toHaveProperty('matchedText');
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('universe');
    }
  });

  it('should exclude specified slugs', () => {
    const links = findAutoLinks('Gravity is awesome.', SAMPLE_INDEX, ['gravity']);
    const gravitySlugs = links.filter((l) => l.href.includes('gravity'));
    expect(gravitySlugs).toHaveLength(0);
  });
});

/**
 * ⚡ Reading Ritual — Time-aware content personalization
 *
 * Changes greeting, mood, and suggestions based on Indian time zones.
 * Pure config — no heavy tech.
 */

interface RitualConfig {
  greeting: string;
  greetingHi: string;
  emoji: string;
  mood: 'morning' | 'afternoon' | 'evening' | 'night';
  suggestion: string;
  bgGradient: string;
}

/**
 * Get reading ritual config based on IST time.
 * @param date - Current date (defaults to now)
 */
export function getReadingRitual(date: Date = new Date()): RitualConfig {
  // Convert to IST (UTC+5:30)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const istTime = new Date(utc + 330 * 60000);
  const hour = istTime.getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'Good Morning',
      greetingHi: 'सुप्रभात',
      emoji: '🌅',
      mood: 'morning',
      suggestion: 'Morning mind is sharpest — try a Science or Code topic!',
      bgGradient: 'linear-gradient(135deg, rgba(255,153,51,0.05), rgba(255,215,0,0.03))',
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      greeting: 'Good Afternoon',
      greetingHi: 'नमस्कार',
      emoji: '☀️',
      mood: 'afternoon',
      suggestion: 'Afternoon = perfect for History or Politics deep dives.',
      bgGradient: 'linear-gradient(135deg, rgba(255,215,0,0.04), rgba(16,185,129,0.03))',
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      greeting: 'Good Evening',
      greetingHi: 'शुभ संध्या',
      emoji: '🌇',
      mood: 'evening',
      suggestion: 'Evening wind-down? Try Arts & Culture or Philosophy.',
      bgGradient: 'linear-gradient(135deg, rgba(236,72,153,0.04), rgba(139,92,246,0.03))',
    };
  }

  return {
    greeting: 'Late Night Learning',
    greetingHi: 'शुभ रात्रि',
    emoji: '🌙',
    mood: 'night',
    suggestion: 'Night owl? Economics or a Mirror Moment hits different at 2 AM.',
    bgGradient: 'linear-gradient(135deg, rgba(139,92,246,0.05), rgba(0,212,255,0.03))',
  };
}

/**
 * Depth Dial — 10 levels of content depth.
 * User controls how deep they want to go.
 */
export const DEPTH_LEVELS = [
  { level: 1, name: 'Glance', nameHi: 'एक नज़र', readTime: '30s', description: 'Title + one line' },
  { level: 2, name: 'Snap', nameHi: 'स्नैप', readTime: '1m', description: 'Snap View card' },
  { level: 3, name: 'Summary', nameHi: 'सारांश', readTime: '2m', description: 'Quick summary + analogy' },
  { level: 4, name: 'Standard', nameHi: 'मानक', readTime: '5m', description: 'Full article, default depth' },
  { level: 5, name: 'Deep', nameHi: 'गहरा', readTime: '8m', description: 'Article + all sections' },
  { level: 6, name: 'Expert', nameHi: 'विशेषज्ञ', readTime: '12m', description: 'Sources + references + connections' },
  { level: 7, name: 'Research', nameHi: 'शोध', readTime: '15m', description: 'Academic-level with citations' },
  { level: 8, name: 'Scholar', nameHi: 'विद्वान', readTime: '20m', description: 'Multiple perspectives + debates' },
  { level: 9, name: 'Master', nameHi: 'गुरु', readTime: '30m', description: 'Complete knowledge graph' },
  { level: 10, name: 'Oracle', nameHi: 'दृष्टा', readTime: '45m+', description: 'Everything + rabbit holes' },
] as const;

/**
 * Rabbit Hole System — auto-suggest reading chains.
 * Suggests next 3 topics based on current reading context.
 */
export interface RabbitHole {
  nextTopic: {
    slug: string;
    title: string;
    universe: string;
    hook: string;
  };
  connectionReason: string;
  depth: 'shallow' | 'related' | 'surprising';
}

/**
 * Wisdom Thread content format definition.
 * A thread is a curated sequence of topics with narrative glue.
 */
export interface WisdomThread {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  topicSlugs: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

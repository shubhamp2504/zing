/**
 * ⚡ ZING UNIVERSE CONFIGURATION
 * Complete metadata for all 7 knowledge universes
 * 
 * @module universes
 * @version 8.0.0
 * @description The 7 Universes and 35 Sub-Worlds of ZING
 */

import { z } from 'zod';
import { UNIVERSE_THEMES } from '@repo/ui/tokens';

/**
 * SUB-WORLD SCHEMA
 */
export const SubWorldSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  nameHi: z.string().optional(),
  nameMr: z.string().optional(),
  description: z.string(),
  icon: z.string(),
  topicCount: z.number().default(0),
});

/**
 * UNIVERSE SCHEMA
 */
export const UniverseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  taglineHinglish: z.string(),
  taglineMarathi: z.string(),
  description: z.string(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    dark: z.string(),
  }),
  icon: z.string(),
  mascot: z.string().optional(),
  characterSlug: z.string().optional(),
  ambientSound: z.string().optional(),
  cursorType: z.enum(['default', 'pointer', 'crosshair', 'text']).default('default'),
  transitionStyle: z.enum(['fade', 'slide', 'scale', 'wipe']).default('fade'),
  subWorlds: z.array(SubWorldSchema),
});

export type SubWorld = z.infer<typeof SubWorldSchema>;
export type SubWorldInput = z.input<typeof SubWorldSchema>;
export type Universe = z.infer<typeof UniverseSchema>;
export type UniverseInput = z.input<typeof UniverseSchema>;

/**
 * ALL 7 UNIVERSES (raw input — parsed at runtime via schema)
 */
const UNIVERSES_RAW: UniverseInput[] = [
  {
    id: 'scholar',
    slug: 'scholar',
    name: 'Scholar',
    tagline: 'Master your academics. Top your exams.',
    taglineHinglish: 'Padhai ka asli power. Marks ka baap.',
    taglineMarathi: 'Abhyasacha khari shakti. Gunancha raja.',
    description: 'Complete CBSE, ICSE, State Board syllabus with deep explanations',
    colors: UNIVERSE_THEMES.scholar,
    icon: '📚',
    mascot: 'Aryabhatta',
    characterSlug: 'aryabhatta',
    transitionStyle: 'slide',
    subWorlds: [
      {
        id: 'math',
        slug: 'math',
        name: 'Mathematics',
        nameHi: 'गणित',
        nameMr: 'गणित',
        description: 'Algebra, Geometry, Calculus, Trigonometry',
        icon: '∑',
      },
      {
        id: 'science',
        slug: 'science',
        name: 'Science',
        nameHi: 'विज्ञान',
        nameMr: 'विज्ञान',
        description: 'Physics, Chemistry, Biology',
        icon: '⚗️',
      },
      {
        id: 'social-studies',
        slug: 'social-studies',
        name: 'Social Studies',
        nameHi: 'सामाजिक अध्ययन',
        nameMr: 'सामाजिक अभ्यास',
        description: 'History, Geography, Civics',
        icon: '🌍',
      },
      {
        id: 'languages',
        slug: 'languages',
        name: 'Languages',
        nameHi: 'भाषाएँ',
        nameMr: 'भाषा',
        description: 'English, Hindi, Grammar',
        icon: '✍️',
      },
      {
        id: 'board-exams',
        slug: 'board-exams',
        name: 'Board Exams',
        nameHi: 'बोर्ड परीक्षा',
        nameMr: 'बोर्ड परीक्षा',
        description: 'Class 10, Class 12 preparation',
        icon: '📝',
      },
    ],
  },
  {
    id: 'code-cosmos',
    slug: 'code-cosmos',
    name: 'Code Cosmos',
    tagline: 'Build the future. Code like a pro.',
    taglineHinglish: 'Code se duniya badlo. Developer bano.',
    taglineMarathi: 'Code shika. Bhavishya ghadva.',
    description: 'Complete programming guide from basics to advanced',
    colors: UNIVERSE_THEMES.codeСosmos,
    icon: '💻',
    mascot: 'Ada Lovelace',
    characterSlug: 'ada-lovelace',
    transitionStyle: 'wipe',
    subWorlds: [
      {
        id: 'foundations',
        slug: 'foundations',
        name: 'Foundations',
        description: 'Programming basics, Logic, Algorithms',
        icon: '🏗️',
      },
      {
        id: 'frontend',
        slug: 'frontend',
        name: 'Frontend',
        description: 'HTML, CSS, JavaScript, React, Next.js',
        icon: '🎨',
      },
      {
        id: 'backend',
        slug: 'backend',
        name: 'Backend',
        description: 'Node.js, Python, Databases, APIs',
        icon: '⚙️',
      },
      {
        id: 'devops',
        slug: 'devops',
        name: 'DevOps',
        description: 'Docker, CI/CD, Cloud, Deployment',
        icon: '🚀',
      },
      {
        id: 'dsa-interview',
        slug: 'dsa-interview',
        name: 'DSA & Interviews',
        description: 'Data Structures, Algorithms, System Design',
        icon: '🧩',
      },
    ],
  },
  {
    id: 'battle-ground',
    slug: 'battle-ground',
    name: 'Battle Ground',
    tagline: 'Crack UPSC, JEE, NEET. Conquer your exam.',
    taglineHinglish: 'Exam crackers ka adda. Sapne haqeeqat bano.',
    taglineMarathi: 'Pariksha jinka. Swapna purna kara.',
    description: 'India\'s toughest competitive exams conquered',
    colors: UNIVERSE_THEMES.battleGround,
    icon: '⚔️',
    mascot: 'Chanakya',
    characterSlug: 'chanakya',
    transitionStyle: 'scale',
    subWorlds: [
      {
        id: 'upsc',
        slug: 'upsc',
        name: 'UPSC',
        description: 'Civil Services Examination complete guide',
        icon: '🏛️',
      },
      {
        id: 'jee-neet',
        slug: 'jee-neet',
        name: 'JEE & NEET',
        description: 'Engineering and Medical entrance preparation',
        icon: '🔬',
      },
      {
        id: 'cat-mba',
        slug: 'cat-mba',
        name: 'CAT & MBA',
        description: 'Management entrance exams',
        icon: '📊',
      },
      {
        id: 'state-psc',
        slug: 'state-psc',
        name: 'State PSC',
        description: 'MPSC, UPPSC, BPSC and other state services',
        icon: '🗺️',
      },
      {
        id: 'ssc-banking',
        slug: 'ssc-banking',
        name: 'SSC & Banking',
        description: 'SSC CGL, SBI PO, IBPS preparation',
        icon: '🏦',
      },
    ],
  },
  {
    id: 'career',
    slug: 'career',
    name: 'Career',
    tagline: 'Build your career. Own your future.',
    taglineHinglish: 'Career banao. Safalta paao.',
    taglineMarathi: 'Kariyar ghadva. Yashasvi vha.',
    description: 'From first job to leadership - complete career guide',
    colors: UNIVERSE_THEMES.career,
    icon: '💼',
    mascot: 'Steve Jobs',
    characterSlug: 'steve-jobs',
    transitionStyle: 'slide',
    subWorlds: [
      {
        id: 'interviews',
        slug: 'interviews',
        name: 'Interviews',
        description: 'Interview preparation, Resume, LinkedIn',
        icon: '🤝',
      },
      {
        id: 'startup',
        slug: 'startup',
        name: 'Startup',
        description: 'Entrepreneurship, Business, Funding',
        icon: '🚀',
      },
      {
        id: 'finance',
        slug: 'finance',
        name: 'Finance',
        description: 'Personal finance, Investing, Taxes',
        icon: '💰',
      },
      {
        id: 'soft-skills',
        slug: 'soft-skills',
        name: 'Soft Skills',
        description: 'Communication, Leadership, Productivity',
        icon: '🗣️',
      },
      {
        id: 'industry-guides',
        slug: 'industry-guides',
        name: 'Industry Guides',
        description: 'Tech, Finance, Healthcare, Marketing careers',
        icon: '🏢',
      },
    ],
  },
  {
    id: 'civilization',
    slug: 'civilization',
    name: 'Civilization',
    tagline: 'Learn from the past. Shape the future.',
    taglineHinglish: 'Itihasa se seekho. Bharat ko jaano.',
    taglineMarathi: 'Itihasatun shika. Bharat olakha.',
    description: 'India\'s rich heritage, strategy, and timeless wisdom',
    colors: UNIVERSE_THEMES.civilization,
    icon: '🏺',
    mascot: 'Chanakya',
    characterSlug: 'chanakya-wisdom',
    transitionStyle: 'fade',
    subWorlds: [
      {
        id: 'itihasa',
        slug: 'itihasa',
        name: 'Itihasa',
        description: 'Mahabharata, Ramayana, Puranas',
        icon: '📜',
      },
      {
        id: 'strategy',
        slug: 'strategy',
        name: 'Strategy',
        description: 'Arthashastra, warfare, diplomacy',
        icon: '♟️',
      },
      {
        id: 'indian-history',
        slug: 'indian-history',
        name: 'Indian History',
        description: 'Ancient, Medieval, Modern India',
        icon: '🕉️',
      },
      {
        id: 'constitution',
        slug: 'constitution',
        name: 'Constitution',
        description: 'Indian Constitution, Rights, Governance',
        icon: '⚖️',
      },
      {
        id: 'great-leaders',
        slug: 'great-leaders',
        name: 'Great Leaders',
        description: 'Gandhi, Ambedkar, Nehru, Patel, and more',
        icon: '👤',
      },
    ],
  },
  {
    id: 'knowledge',
    slug: 'knowledge',
    name: 'Knowledge',
    tagline: 'Explore the universe. Question everything.',
    taglineHinglish: 'Duniya ko jaano. Sawal karo. Samjho.',
    taglineMarathi: 'Jagala olakha. Prashna vichara.',
    description: 'Science, space, nature - pure curiosity satisfied',
    colors: UNIVERSE_THEMES.knowledge,
    icon: '🔭',
    mascot: 'Marie Curie',
    characterSlug: 'marie-curie',
    transitionStyle: 'scale',
    subWorlds: [
      {
        id: 'space',
        slug: 'space',
        name: 'Space',
        description: 'Astronomy, planets, galaxies, black holes',
        icon: '🌌',
      },
      {
        id: 'earth',
        slug: 'earth',
        name: 'Earth',
        description: 'Geography, climate, natural phenomena',
        icon: '🌍',
      },
      {
        id: 'human-body',
        slug: 'human-body',
        name: 'Human Body',
        description: 'Anatomy, biology, health, medicine',
        icon: '🧬',
      },
      {
        id: 'mathematics',
        slug: 'mathematics',
        name: 'Mathematics',
        description: 'Pure math, theorems, mathematical beauty',
        icon: '∞',
      },
      {
        id: 'experiments',
        slug: 'experiments',
        name: 'Experiments',
        description: 'DIY science, cool experiments, demos',
        icon: '🧪',
      },
    ],
  },
  {
    id: 'curiosity',
    slug: 'curiosity',
    name: 'Curiosity',
    tagline: 'Because some questions have no syllabus.',
    taglineHinglish: 'Kyon? Kaise? Kya? Sab jawab yahaan.',
    taglineMarathi: 'Ka? Kasa? Kay? Sarvansathi uttar.',
    description: 'Philosophy, psychology, art - the weird and wonderful',
    colors: UNIVERSE_THEMES.curiosity,
    icon: '🤔',
    mascot: 'Albert Einstein',
    characterSlug: 'einstein',
    transitionStyle: 'wipe',
    subWorlds: [
      {
        id: 'psychology',
        slug: 'psychology',
        name: 'Psychology',
        description: 'Mind, behavior, emotions, thinking',
        icon: '🧠',
      },
      {
        id: 'economics',
        slug: 'economics',
        name: 'Economics',
        description: 'Money, markets, trade, capitalism',
        icon: '📈',
      },
      {
        id: 'geopolitics',
        slug: 'geopolitics',
        name: 'Geopolitics',
        description: 'World politics, power, nations',
        icon: '🌐',
      },
      {
        id: 'arts-culture',
        slug: 'arts-culture',
        name: 'Arts & Culture',
        description: 'Music, film, literature, culture',
        icon: '🎭',
      },
      {
        id: 'philosophy',
        slug: 'philosophy',
        name: 'Philosophy',
        description: 'Existence, truth, ethics, meaning',
        icon: '💭',
      },
    ],
  },
];

/** Parsed and validated universes with defaults applied */
export const UNIVERSES: Universe[] = UNIVERSES_RAW.map((u) => UniverseSchema.parse(u));

/**
 * UTILITY FUNCTIONS
 */

/**
 * Find universe by slug
 */
export function findUniverse(slug: string): Universe | undefined {
  return UNIVERSES.find((u) => u.slug === slug);
}

/**
 * Find sub-world by universe and sub-world slugs
 */
export function findSubWorld(universeSlug: string, subWorldSlug: string): SubWorld | undefined {
  const universe = findUniverse(universeSlug);
  return universe?.subWorlds.find((sw) => sw.slug === subWorldSlug);
}

/**
 * Get universe theme as CSS variables object
 */
export function getUniverseTheme(slug: string): Record<string, string> {
  const universe = findUniverse(slug);
  if (!universe) return {};

  return {
    '--universe-primary': universe.colors.primary,
    '--universe-secondary': universe.colors.secondary,
    '--universe-accent': universe.colors.accent,
    '--universe-dark': universe.colors.dark,
  };
}

/**
 * Get all topic paths for generateStaticParams
 */
export function getAllTopicPaths(): { universe: string; subWorld: string }[] {
  const paths: { universe: string; subWorld: string }[] = [];

  for (const universe of UNIVERSES) {
    for (const subWorld of universe.subWorlds) {
      paths.push({
        universe: universe.slug,
        subWorld: subWorld.slug,
      });
    }
  }

  return paths;
}

/**
 * Get universe display name with fallback
 */
export function getUniverseDisplayName(slug: string, language: 'en' | 'hi' | 'mr' = 'en'): string {
  const universe = findUniverse(slug);
  if (!universe) return slug;

  // Always return English name for now (translations can be added later)
  return universe.name;
}

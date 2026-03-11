/**
 * Seed TopicRelation records to populate the knowledge graph.
 * Usage: npx tsx seed-relations.ts
 */
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../../.env.local') });

import { prisma } from './index';

// Topic ID map
const T = {
  monsoon:       'cmmglg96i000caq0ae8tgiee7', // How the Indian Monsoon Works (KNOWLEDGE/earth)
  upsc:          'cmmglg7g70008aq0a2idkr9jz', // UPSC Preparation Guide (BATTLE_GROUND/upsc)
  photosynthesis:'cmmglg96h000aaq0a06cme484', // How Photosynthesis Works (SCHOLAR/science)
  arthashastra:  'cmmglg96i000daq0auo13gkvv', // The Arthashastra Explained (CIVILIZATION/strategy)
  interview:     'cmmglg7g70009aq0anoaqkpyl', // First Tech Interview (CAREER/interviews)
  api:           'cmmglg7g60007aq0a0jki3bf6', // What is an API? (CODE_COSMOS/foundations)
  dreams:        'cmmglg983000eaq0aqqjsjg5b', // Why Do We Dream? (CURIOSITY/psychology)
  blackholes:    'cmmglg7g60005aq0aee9xvu48', // How Black Holes Work (KNOWLEDGE/space)
  git:           'cmmglg96i000baq0a8exysh44', // Git & GitHub (CODE_COSMOS/foundations)
  pythagoras:    'cmmglg7g60006aq0asa3447k1', // Pythagorean Theorem (SCHOLAR/math)
} as const;

type Rel = {
  fromTopicId: string;
  toTopicId: string;
  relationType: 'RELATED' | 'PREREQUISITE' | 'BUILDS_ON' | 'DEEPER' | 'OPPOSITE';
  strength: number;
};

const relations: Rel[] = [
  // ── SCHOLAR connections ──
  // Pythagorean Theorem ↔ Photosynthesis (both core science education)
  { fromTopicId: T.pythagoras, toTopicId: T.photosynthesis, relationType: 'RELATED', strength: 0.6 },
  // Pythagorean Theorem ↔ Black Holes (math underpins astrophysics)
  { fromTopicId: T.pythagoras, toTopicId: T.blackholes, relationType: 'PREREQUISITE', strength: 0.7 },

  // ── KNOWLEDGE connections ──
  // Monsoon ↔ Photosynthesis (rain drives plant growth)
  { fromTopicId: T.monsoon, toTopicId: T.photosynthesis, relationType: 'RELATED', strength: 0.85 },
  // Monsoon ↔ UPSC (geography is a core UPSC subject)
  { fromTopicId: T.monsoon, toTopicId: T.upsc, relationType: 'RELATED', strength: 0.75 },
  // Black Holes ↔ Dreams (mysteries of the universe vs mind)
  { fromTopicId: T.blackholes, toTopicId: T.dreams, relationType: 'RELATED', strength: 0.5 },

  // ── CODE_COSMOS connections ──
  // API ↔ Git (both foundational dev skills)
  { fromTopicId: T.api, toTopicId: T.git, relationType: 'RELATED', strength: 0.9 },
  // API ↔ Tech Interview (API knowledge needed for interviews)
  { fromTopicId: T.api, toTopicId: T.interview, relationType: 'PREREQUISITE', strength: 0.8 },
  // Git ↔ Tech Interview (Git skills needed for jobs)
  { fromTopicId: T.git, toTopicId: T.interview, relationType: 'PREREQUISITE', strength: 0.75 },

  // ── CAREER connections ──
  // Tech Interview ↔ UPSC (both competitive exam strategies)
  { fromTopicId: T.interview, toTopicId: T.upsc, relationType: 'RELATED', strength: 0.55 },

  // ── CIVILIZATION connections ──
  // Arthashastra ↔ UPSC (ancient Indian polity is UPSC syllabus)
  { fromTopicId: T.arthashastra, toTopicId: T.upsc, relationType: 'RELATED', strength: 0.9 },
  // Arthashastra ↔ Tech Interview (Kautilya's strategy applies to negotiations)
  { fromTopicId: T.arthashastra, toTopicId: T.interview, relationType: 'RELATED', strength: 0.45 },

  // ── CURIOSITY connections ──
  // Dreams ↔ Photosynthesis (biology — brain vs plants)
  { fromTopicId: T.dreams, toTopicId: T.photosynthesis, relationType: 'RELATED', strength: 0.4 },
  // Dreams ↔ UPSC (psychology is optional UPSC subject)
  { fromTopicId: T.dreams, toTopicId: T.upsc, relationType: 'RELATED', strength: 0.35 },

  // ── Cross-universe deep connections ──
  // Black Holes ↔ Arthashastra (both deal with immense gravitational power)
  { fromTopicId: T.blackholes, toTopicId: T.arthashastra, relationType: 'RELATED', strength: 0.3 },
  // Pythagoras ↔ API (math logic underpins programming)
  { fromTopicId: T.pythagoras, toTopicId: T.api, relationType: 'RELATED', strength: 0.55 },
  // Monsoon ↔ Black Holes (both massive natural systems)
  { fromTopicId: T.monsoon, toTopicId: T.blackholes, relationType: 'RELATED', strength: 0.35 },
  // Git ↔ Pythagoras (version control = mathematical proof steps)
  { fromTopicId: T.git, toTopicId: T.pythagoras, relationType: 'RELATED', strength: 0.3 },
];

async function main() {
  console.log(`Seeding ${relations.length} topic relations...`);

  // Clear existing relations first
  const deleted = await prisma.topicRelation.deleteMany({});
  console.log(`Cleared ${deleted.count} existing relations.`);

  let created = 0;
  for (const rel of relations) {
    try {
      await prisma.topicRelation.create({ data: rel });
      created++;
    } catch (e: any) {
      console.error(`Failed: ${rel.fromTopicId} → ${rel.toTopicId}: ${e.message}`);
    }
  }

  console.log(`✅ Created ${created}/${relations.length} relations.`);
  await prisma.$disconnect();
}

main();

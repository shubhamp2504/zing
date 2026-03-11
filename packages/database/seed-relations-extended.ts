/**
 * Seed TopicRelation records for the extended 91 topics + connections to original 10.
 * Usage: npx tsx seed-relations-extended.ts
 *
 * Looks up topics by slug (not hardcoded IDs) so it works regardless of when
 * topics were seeded.
 */
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../../.env.local') });

import { prisma } from './index';

type RelType = 'RELATED' | 'PREREQUISITE' | 'BUILDS_ON' | 'DEEPER' | 'OPPOSITE';

interface SlugRelation {
  from: string;
  to: string;
  type: RelType;
  strength: number;
}

// ═══════════════════════════════════════════════════════════════
// KNOWLEDGE GRAPH — Cross-topic connections across all 7 universes
// Each relation represents a "Zing Connection" — the surprise link
// between two seemingly unrelated topics.
// ═══════════════════════════════════════════════════════════════

const relations: SlugRelation[] = [
  // ────────────────────────────────────────────
  // SCHOLAR internal connections
  // ────────────────────────────────────────────
  { from: 'quadratic-equations', to: 'linear-equations', type: 'BUILDS_ON', strength: 0.95 },
  { from: 'trigonometry-basics', to: 'quadratic-equations', type: 'RELATED', strength: 0.8 },
  { from: 'newtons-laws', to: 'electricity-fundamentals', type: 'RELATED', strength: 0.75 },
  { from: 'periodic-table', to: 'acids-bases-salts', type: 'PREREQUISITE', strength: 0.9 },
  { from: 'cell-biology', to: 'acids-bases-salts', type: 'RELATED', strength: 0.6 },
  { from: 'indian-constitution', to: 'democracy-and-diversity', type: 'BUILDS_ON', strength: 0.9 },
  { from: 'french-revolution', to: 'democracy-and-diversity', type: 'PREREQUISITE', strength: 0.85 },
  { from: 'cbse-board-exam-strategy', to: 'english-grammar-tenses', type: 'RELATED', strength: 0.5 },

  // ────────────────────────────────────────────
  // CODE_COSMOS internal connections
  // ────────────────────────────────────────────
  { from: 'js-promises-async-await', to: 'react-hooks', type: 'PREREQUISITE', strength: 0.9 },
  { from: 'react-hooks', to: 'nextjs-app-router', type: 'PREREQUISITE', strength: 0.85 },
  { from: 'css-flexbox-grid', to: 'react-hooks', type: 'RELATED', strength: 0.7 },
  { from: 'nodejs-express', to: 'sql-databases', type: 'RELATED', strength: 0.85 },
  { from: 'typescript', to: 'js-promises-async-await', type: 'BUILDS_ON', strength: 0.9 },
  { from: 'docker-containers', to: 'cicd-github-actions', type: 'RELATED', strength: 0.9 },
  { from: 'arrays-linked-lists', to: 'system-design-basics', type: 'PREREQUISITE', strength: 0.7 },
  { from: 'python-for-beginners', to: 'arrays-linked-lists', type: 'PREREQUISITE', strength: 0.8 },
  { from: 'web-security-owasp', to: 'nodejs-express', type: 'BUILDS_ON', strength: 0.85 },

  // ────────────────────────────────────────────
  // BATTLE_GROUND internal connections
  // ────────────────────────────────────────────
  { from: 'upsc-mains-answer-writing', to: 'upsc-ethics-paper-guide', type: 'RELATED', strength: 0.9 },
  { from: 'upsc-geography-decoded', to: 'upsc-current-affairs-strategy', type: 'RELATED', strength: 0.8 },
  { from: 'upsc-optional-subject-guide', to: 'upsc-mains-answer-writing', type: 'RELATED', strength: 0.85 },
  { from: 'jee-mains-complete-strategy', to: 'exam-time-management', type: 'RELATED', strength: 0.9 },
  { from: 'neet-biology-strategy', to: 'exam-time-management', type: 'RELATED', strength: 0.85 },
  { from: 'cat-exam-preparation', to: 'cat-dilr-strategy', type: 'BUILDS_ON', strength: 0.95 },
  { from: 'ssc-cgl-complete-guide', to: 'banking-ibps-po-guide', type: 'RELATED', strength: 0.75 },
  { from: 'state-psc-preparation', to: 'upsc-mains-answer-writing', type: 'RELATED', strength: 0.8 },

  // ────────────────────────────────────────────
  // CAREER internal connections
  // ────────────────────────────────────────────
  { from: 'resume-that-gets-interviews', to: 'linkedin-profile-optimization', type: 'RELATED', strength: 0.95 },
  { from: 'salary-negotiation-india', to: 'resume-that-gets-interviews', type: 'BUILDS_ON', strength: 0.8 },
  { from: 'startup-idea-validation', to: 'startup-equity-esop-guide', type: 'RELATED', strength: 0.9 },
  { from: 'personal-finance-beginners', to: 'salary-negotiation-india', type: 'RELATED', strength: 0.75 },
  { from: 'freelancing-india-guide', to: 'remote-work-india-guide', type: 'RELATED', strength: 0.9 },
  { from: 'communication-skills-workplace', to: 'resume-that-gets-interviews', type: 'RELATED', strength: 0.7 },
  { from: 'data-structures-interview-prep', to: 'system-design-interview-guide', type: 'BUILDS_ON', strength: 0.9 },
  { from: 'mba-vs-tech-career-path', to: 'startup-idea-validation', type: 'RELATED', strength: 0.7 },

  // ────────────────────────────────────────────
  // CIVILIZATION internal connections
  // ────────────────────────────────────────────
  { from: 'chandragupta-maurya-empire', to: 'ashoka-the-great-transformation', type: 'BUILDS_ON', strength: 0.95 },
  { from: 'indian-constitution-making', to: 'ambedkar-social-revolution', type: 'RELATED', strength: 0.95 },
  { from: 'mughal-empire-rise-fall', to: 'indian-independence-movement', type: 'BUILDS_ON', strength: 0.7 },
  { from: 'sun-tzu-art-of-war-decoded', to: 'game-theory-for-life', type: 'RELATED', strength: 0.85 },
  { from: 'panchayati-raj-local-governance', to: 'indian-constitution-making', type: 'BUILDS_ON', strength: 0.9 },
  { from: 'indus-valley-civilization', to: 'chandragupta-maurya-empire', type: 'RELATED', strength: 0.7 },
  { from: 'cold-war-world-order', to: 'indian-independence-movement', type: 'RELATED', strength: 0.6 },

  // ────────────────────────────────────────────
  // KNOWLEDGE internal connections
  // ────────────────────────────────────────────
  { from: 'quantum-physics-explained', to: 'electricity-how-it-works', type: 'BUILDS_ON', strength: 0.8 },
  { from: 'human-brain-neuroscience', to: 'human-immune-system', type: 'RELATED', strength: 0.7 },
  { from: 'dna-genetics-basics', to: 'evolution-natural-selection', type: 'PREREQUISITE', strength: 0.95 },
  { from: 'climate-change-science', to: 'volcanoes-tectonic-plates', type: 'RELATED', strength: 0.75 },
  { from: 'solar-system-guide', to: 'quantum-physics-explained', type: 'RELATED', strength: 0.6 },
  { from: 'fibonacci-golden-ratio', to: 'pi-number-infinite-mystery', type: 'RELATED', strength: 0.9 },
  { from: 'ocean-science-deep-sea', to: 'climate-change-science', type: 'RELATED', strength: 0.8 },

  // ────────────────────────────────────────────
  // CURIOSITY internal connections
  // ────────────────────────────────────────────
  { from: 'cognitive-biases-decoded', to: 'behavioral-economics-nudge', type: 'RELATED', strength: 0.95 },
  { from: 'stoicism-for-modern-life', to: 'existentialism-meaning-of-life', type: 'RELATED', strength: 0.85 },
  { from: 'sleep-science-explained', to: 'happiness-research', type: 'RELATED', strength: 0.75 },
  { from: 'geopolitics-of-water', to: 'india-china-geopolitics', type: 'RELATED', strength: 0.7 },
  { from: 'bollywood-economics', to: 'behavioral-economics-nudge', type: 'RELATED', strength: 0.7 },
  { from: 'ai-how-chatgpt-works', to: 'cognitive-biases-decoded', type: 'RELATED', strength: 0.6 },
  { from: 'inflation-economics-explained', to: 'behavioral-economics-nudge', type: 'BUILDS_ON', strength: 0.85 },
  { from: 'indian-classical-music-basics', to: 'bollywood-economics', type: 'RELATED', strength: 0.7 },

  // ════════════════════════════════════════════
  // CROSS-UNIVERSE "ZING CONNECTIONS"
  // These are the surprise links — the core differentiator
  // ════════════════════════════════════════════

  // SCHOLAR ↔ CODE_COSMOS (math meets code)
  { from: 'quadratic-equations', to: 'arrays-linked-lists', type: 'RELATED', strength: 0.6 },
  { from: 'linear-equations', to: 'python-for-beginners', type: 'RELATED', strength: 0.65 },
  { from: 'trigonometry-basics', to: 'css-flexbox-grid', type: 'RELATED', strength: 0.4 },

  // SCHOLAR ↔ BATTLE_GROUND (school → exams)
  { from: 'cbse-board-exam-strategy', to: 'jee-mains-complete-strategy', type: 'PREREQUISITE', strength: 0.9 },
  { from: 'cbse-board-exam-strategy', to: 'neet-biology-strategy', type: 'PREREQUISITE', strength: 0.9 },
  { from: 'indian-constitution', to: 'upsc-mains-answer-writing', type: 'PREREQUISITE', strength: 0.85 },
  { from: 'cell-biology', to: 'neet-biology-strategy', type: 'PREREQUISITE', strength: 0.9 },
  { from: 'newtons-laws', to: 'jee-mains-complete-strategy', type: 'PREREQUISITE', strength: 0.85 },
  { from: 'periodic-table', to: 'jee-mains-complete-strategy', type: 'PREREQUISITE', strength: 0.8 },

  // SCHOLAR ↔ KNOWLEDGE (school → deeper science)
  { from: 'cell-biology', to: 'dna-genetics-basics', type: 'PREREQUISITE', strength: 0.9 },
  { from: 'cell-biology', to: 'human-brain-neuroscience', type: 'PREREQUISITE', strength: 0.7 },
  { from: 'newtons-laws', to: 'quantum-physics-explained', type: 'PREREQUISITE', strength: 0.75 },
  { from: 'electricity-fundamentals', to: 'electricity-how-it-works', type: 'BUILDS_ON', strength: 0.95 },
  { from: 'acids-bases-salts', to: 'ocean-science-deep-sea', type: 'RELATED', strength: 0.5 },

  // SCHOLAR ↔ CIVILIZATION (history overlap)
  { from: 'french-revolution', to: 'indian-independence-movement', type: 'RELATED', strength: 0.8 },
  { from: 'french-revolution', to: 'cold-war-world-order', type: 'RELATED', strength: 0.65 },
  { from: 'indian-constitution', to: 'indian-constitution-making', type: 'BUILDS_ON', strength: 0.95 },
  { from: 'indian-constitution', to: 'ambedkar-social-revolution', type: 'RELATED', strength: 0.9 },
  { from: 'democracy-and-diversity', to: 'panchayati-raj-local-governance', type: 'RELATED', strength: 0.85 },

  // CODE_COSMOS ↔ CAREER (coding → jobs)
  { from: 'arrays-linked-lists', to: 'data-structures-interview-prep', type: 'RELATED', strength: 0.95 },
  { from: 'system-design-basics', to: 'system-design-interview-guide', type: 'RELATED', strength: 0.95 },
  { from: 'react-hooks', to: 'freelancing-india-guide', type: 'RELATED', strength: 0.55 },
  { from: 'typescript', to: 'data-structures-interview-prep', type: 'RELATED', strength: 0.7 },
  { from: 'docker-containers', to: 'remote-work-india-guide', type: 'RELATED', strength: 0.5 },
  { from: 'web-security-owasp', to: 'system-design-interview-guide', type: 'RELATED', strength: 0.65 },

  // CODE_COSMOS ↔ CURIOSITY (tech meets psychology)
  { from: 'ai-how-chatgpt-works', to: 'system-design-basics', type: 'RELATED', strength: 0.65 },
  { from: 'ai-how-chatgpt-works', to: 'python-for-beginners', type: 'RELATED', strength: 0.7 },
  { from: 'nextjs-app-router', to: 'ai-how-chatgpt-works', type: 'RELATED', strength: 0.5 },

  // BATTLE_GROUND ↔ CAREER (exams → career)
  { from: 'cat-exam-preparation', to: 'mba-vs-tech-career-path', type: 'RELATED', strength: 0.9 },
  { from: 'ssc-cgl-complete-guide', to: 'resume-that-gets-interviews', type: 'RELATED', strength: 0.5 },
  { from: 'exam-time-management', to: 'communication-skills-workplace', type: 'RELATED', strength: 0.5 },
  { from: 'banking-ibps-po-guide', to: 'personal-finance-beginners', type: 'RELATED', strength: 0.65 },

  // BATTLE_GROUND ↔ CIVILIZATION (exams ↔ history)
  { from: 'upsc-mains-answer-writing', to: 'indian-constitution-making', type: 'RELATED', strength: 0.85 },
  { from: 'upsc-ethics-paper-guide', to: 'stoicism-for-modern-life', type: 'RELATED', strength: 0.75 },
  { from: 'upsc-geography-decoded', to: 'geopolitics-of-water', type: 'RELATED', strength: 0.85 },
  { from: 'upsc-geography-decoded', to: 'climate-change-science', type: 'RELATED', strength: 0.8 },
  { from: 'upsc-current-affairs-strategy', to: 'india-china-geopolitics', type: 'RELATED', strength: 0.9 },

  // CAREER ↔ CURIOSITY (skills ↔ psychology)
  { from: 'salary-negotiation-india', to: 'behavioral-economics-nudge', type: 'RELATED', strength: 0.8 },
  { from: 'communication-skills-workplace', to: 'cognitive-biases-decoded', type: 'RELATED', strength: 0.7 },
  { from: 'startup-idea-validation', to: 'behavioral-economics-nudge', type: 'RELATED', strength: 0.8 },
  { from: 'personal-finance-beginners', to: 'inflation-economics-explained', type: 'BUILDS_ON', strength: 0.9 },
  { from: 'personal-finance-beginners', to: 'cryptocurrency-blockchain-explained', type: 'RELATED', strength: 0.65 },

  // CAREER ↔ CIVILIZATION (strategy overlap)
  { from: 'startup-idea-validation', to: 'sun-tzu-art-of-war-decoded', type: 'RELATED', strength: 0.6 },
  { from: 'startup-equity-esop-guide', to: 'game-theory-for-life', type: 'RELATED', strength: 0.7 },

  // CIVILIZATION ↔ CURIOSITY (history ↔ philosophy)
  { from: 'ashoka-the-great-transformation', to: 'stoicism-for-modern-life', type: 'RELATED', strength: 0.7 },
  { from: 'ambedkar-social-revolution', to: 'existentialism-meaning-of-life', type: 'RELATED', strength: 0.55 },
  { from: 'sun-tzu-art-of-war-decoded', to: 'cognitive-biases-decoded', type: 'RELATED', strength: 0.65 },
  { from: 'game-theory-for-life', to: 'behavioral-economics-nudge', type: 'RELATED', strength: 0.85 },
  { from: 'cold-war-world-order', to: 'india-china-geopolitics', type: 'BUILDS_ON', strength: 0.85 },
  { from: 'indian-independence-movement', to: 'indian-classical-music-basics', type: 'RELATED', strength: 0.5 },

  // CIVILIZATION ↔ KNOWLEDGE (history ↔ science)
  { from: 'indus-valley-civilization', to: 'climate-change-science', type: 'RELATED', strength: 0.45 },
  { from: 'chandragupta-maurya-empire', to: 'game-theory-for-life', type: 'RELATED', strength: 0.6 },

  // KNOWLEDGE ↔ CURIOSITY (science ↔ mind)
  { from: 'human-brain-neuroscience', to: 'sleep-science-explained', type: 'RELATED', strength: 0.9 },
  { from: 'human-brain-neuroscience', to: 'cognitive-biases-decoded', type: 'RELATED', strength: 0.85 },
  { from: 'human-brain-neuroscience', to: 'happiness-research', type: 'RELATED', strength: 0.8 },
  { from: 'evolution-natural-selection', to: 'ai-how-chatgpt-works', type: 'RELATED', strength: 0.55 },
  { from: 'dna-genetics-basics', to: 'sleep-science-explained', type: 'RELATED', strength: 0.5 },
  { from: 'climate-change-science', to: 'geopolitics-of-water', type: 'RELATED', strength: 0.85 },
  { from: 'fibonacci-golden-ratio', to: 'indian-classical-music-basics', type: 'RELATED', strength: 0.7 },
  { from: 'pi-number-infinite-mystery', to: 'existentialism-meaning-of-life', type: 'RELATED', strength: 0.35 },
  { from: 'solar-system-guide', to: 'geopolitics-of-water', type: 'RELATED', strength: 0.4 },

  // KNOWLEDGE ↔ BATTLE_GROUND (science → exams)
  { from: 'quantum-physics-explained', to: 'jee-mains-complete-strategy', type: 'RELATED', strength: 0.7 },
  { from: 'human-immune-system', to: 'neet-biology-strategy', type: 'RELATED', strength: 0.8 },
  { from: 'evolution-natural-selection', to: 'neet-biology-strategy', type: 'RELATED', strength: 0.75 },

  // ════════════════════════════════════════════
  // CONNECTIONS TO ORIGINAL 10 SEED TOPICS
  // (linking new topics back to the originals)
  // ════════════════════════════════════════════

  // pythagorean-theorem (SCHOLAR/math)
  { from: 'pythagorean-theorem', to: 'quadratic-equations', type: 'RELATED', strength: 0.85 },
  { from: 'pythagorean-theorem', to: 'trigonometry-basics', type: 'PREREQUISITE', strength: 0.9 },
  { from: 'pythagorean-theorem', to: 'fibonacci-golden-ratio', type: 'RELATED', strength: 0.7 },

  // what-is-an-api (CODE_COSMOS/foundations)
  { from: 'what-is-an-api', to: 'nodejs-express', type: 'PREREQUISITE', strength: 0.85 },
  { from: 'what-is-an-api', to: 'js-promises-async-await', type: 'PREREQUISITE', strength: 0.8 },
  { from: 'what-is-an-api', to: 'web-security-owasp', type: 'RELATED', strength: 0.65 },

  // upsc-preparation-guide (BATTLE_GROUND/upsc)
  { from: 'upsc-preparation-guide', to: 'upsc-mains-answer-writing', type: 'BUILDS_ON', strength: 0.95 },
  { from: 'upsc-preparation-guide', to: 'upsc-ethics-paper-guide', type: 'BUILDS_ON', strength: 0.9 },
  { from: 'upsc-preparation-guide', to: 'upsc-geography-decoded', type: 'BUILDS_ON', strength: 0.9 },
  { from: 'upsc-preparation-guide', to: 'upsc-optional-subject-guide', type: 'BUILDS_ON', strength: 0.85 },
  { from: 'upsc-preparation-guide', to: 'upsc-current-affairs-strategy', type: 'BUILDS_ON', strength: 0.9 },
  { from: 'upsc-preparation-guide', to: 'exam-time-management', type: 'RELATED', strength: 0.8 },

  // how-black-holes-work (KNOWLEDGE/space)
  { from: 'how-black-holes-work', to: 'quantum-physics-explained', type: 'RELATED', strength: 0.85 },
  { from: 'how-black-holes-work', to: 'solar-system-guide', type: 'RELATED', strength: 0.8 },

  // why-do-we-dream (CURIOSITY/psychology)
  { from: 'why-do-we-dream', to: 'sleep-science-explained', type: 'RELATED', strength: 0.95 },
  { from: 'why-do-we-dream', to: 'human-brain-neuroscience', type: 'RELATED', strength: 0.85 },
  { from: 'why-do-we-dream', to: 'cognitive-biases-decoded', type: 'RELATED', strength: 0.6 },

  // first-tech-interview (CAREER/interviews)
  { from: 'first-tech-interview', to: 'data-structures-interview-prep', type: 'RELATED', strength: 0.9 },
  { from: 'first-tech-interview', to: 'resume-that-gets-interviews', type: 'RELATED', strength: 0.85 },
  { from: 'first-tech-interview', to: 'system-design-interview-guide', type: 'BUILDS_ON', strength: 0.8 },

  // arthashastra-explained (CIVILIZATION/strategy)
  { from: 'arthashastra-explained', to: 'chandragupta-maurya-empire', type: 'RELATED', strength: 0.95 },
  { from: 'arthashastra-explained', to: 'sun-tzu-art-of-war-decoded', type: 'RELATED', strength: 0.85 },
  { from: 'arthashastra-explained', to: 'game-theory-for-life', type: 'RELATED', strength: 0.8 },

  // photosynthesis-explained (SCHOLAR/science)
  { from: 'photosynthesis-explained', to: 'cell-biology', type: 'RELATED', strength: 0.9 },
  { from: 'photosynthesis-explained', to: 'climate-change-science', type: 'RELATED', strength: 0.7 },
  { from: 'photosynthesis-explained', to: 'evolution-natural-selection', type: 'RELATED', strength: 0.6 },

  // git-github-beginners (CODE_COSMOS/foundations)
  { from: 'git-github-beginners', to: 'cicd-github-actions', type: 'PREREQUISITE', strength: 0.9 },
  { from: 'git-github-beginners', to: 'docker-containers', type: 'RELATED', strength: 0.65 },
  { from: 'git-github-beginners', to: 'typescript', type: 'RELATED', strength: 0.5 },

  // indian-monsoon-system (KNOWLEDGE/earth)
  { from: 'indian-monsoon-system', to: 'climate-change-science', type: 'RELATED', strength: 0.85 },
  { from: 'indian-monsoon-system', to: 'geopolitics-of-water', type: 'RELATED', strength: 0.8 },
  { from: 'indian-monsoon-system', to: 'upsc-geography-decoded', type: 'RELATED', strength: 0.85 },
  { from: 'indian-monsoon-system', to: 'ocean-science-deep-sea', type: 'RELATED', strength: 0.7 },
];

async function main() {
  console.log(`\n⚡ ZING Knowledge Graph — Extended Relations Seeder`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Relations to create: ${relations.length}\n`);

  // Build slug→ID map for all topics
  const topics = await prisma.topic.findMany({ select: { id: true, slug: true } });
  const slugMap = new Map(topics.map(t => [t.slug, t.id]));
  console.log(`Found ${topics.length} topics in database.\n`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const rel of relations) {
    const fromId = slugMap.get(rel.from);
    const toId = slugMap.get(rel.to);

    if (!fromId || !toId) {
      const missing = !fromId ? rel.from : rel.to;
      console.warn(`⚠ Skipped: "${rel.from}" → "${rel.to}" (topic "${missing}" not found in DB)`);
      skipped++;
      continue;
    }

    try {
      await prisma.topicRelation.upsert({
        where: {
          fromTopicId_toTopicId_relationType: { 
            fromTopicId: fromId, 
            toTopicId: toId,
            relationType: rel.type 
          },
        },
        update: { strength: rel.strength },
        create: {
          fromTopicId: fromId,
          toTopicId: toId,
          relationType: rel.type,
          strength: rel.strength,
        },
      });
      created++;
    } catch (e: any) {
      // If compound unique doesn't exist, fall back to create
      try {
        await prisma.topicRelation.create({
          data: {
            fromTopicId: fromId,
            toTopicId: toId,
            relationType: rel.type,
            strength: rel.strength,
          },
        });
        created++;
      } catch (e2: any) {
        console.error(`✗ Failed: "${rel.from}" → "${rel.to}": ${e2.message}`);
        failed++;
      }
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Created: ${created}`);
  if (skipped > 0) console.log(`⚠  Skipped: ${skipped} (topics not yet seeded)`);
  if (failed > 0) console.log(`✗  Failed:  ${failed}`);
  console.log(`Total relations in graph: ${created + skipped + failed}/${relations.length}\n`);

  await prisma.$disconnect();
}

main();

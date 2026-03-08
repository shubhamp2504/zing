/**
 * ⚡ ZING Database Seed Script
 * Seeds the database with 5 example topics (one from each major universe)
 * 
 * Usage: pnpm db:seed
 */
import { PrismaClient, Universe, Difficulty, TopicStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('⚡ Seeding ZING database...\n');

  // ── Clean existing data ──
  await prisma.topicRelation.deleteMany();
  await prisma.topicTranslation.deleteMany();
  await prisma.savedTopic.deleteMany();
  await prisma.dailyContent.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.character.deleteMany();

  // ═══════════════════════════════════════
  // CHARACTERS
  // ═══════════════════════════════════════

  const characters = await Promise.all([
    prisma.character.create({
      data: {
        slug: 'aryabhatta',
        name: 'Aryabhatta',
        description: 'The father of Indian mathematics. Guides students through the Scholar universe with wisdom from 5th century India.',
        universe: 'SCHOLAR',
        riveStateMachines: {
          idle: 'Default resting pose with gentle float',
          talking: 'Explaining concepts with hand gestures',
          celebrating: 'Joyful animation when student understands',
          thinking: 'Contemplative pose during difficult problems',
        },
        staticImageUrl: '/characters/aryabhatta-static.webp',
        era: 'Ancient India (476–550 CE)',
        nationality: 'Indian',
        knownFor: 'Zero, place value system, trigonometry, astronomy',
        availablePhase: 1,
      },
    }),
    prisma.character.create({
      data: {
        slug: 'ada-lovelace',
        name: 'Ada Lovelace',
        description: 'The world\'s first computer programmer. Guides coders through Code Cosmos with Victorian elegance and razor-sharp logic.',
        universe: 'CODE_COSMOS',
        riveStateMachines: {
          idle: 'Seated at analytical engine, quill in hand',
          talking: 'Animated explanation with code snippets floating',
          celebrating: 'Elegant celebration when code compiles',
          debugging: 'Focused expression while finding bugs',
        },
        staticImageUrl: '/characters/ada-lovelace-static.webp',
        era: 'Victorian England (1815–1852)',
        nationality: 'British',
        knownFor: 'First algorithm, analytical engine notes, programming vision',
        availablePhase: 1,
      },
    }),
    prisma.character.create({
      data: {
        slug: 'chanakya',
        name: 'Chanakya',
        description: 'The master strategist. Guides exam warriors through Battle Ground with the cunning of Arthashastra.',
        universe: 'BATTLE_GROUND',
        riveStateMachines: {
          idle: 'Regal seated pose, scrolls around',
          talking: 'Strategic gestures, commanding presence',
          celebrating: 'Satisfied nod when strategy succeeds',
          planning: 'Deep thought with chess-like board',
        },
        staticImageUrl: '/characters/chanakya-static.webp',
        era: 'Ancient India (375–283 BCE)',
        nationality: 'Indian',
        knownFor: 'Arthashastra, Maurya Empire advisor, political strategy',
        availablePhase: 1,
      },
    }),
    prisma.character.create({
      data: {
        slug: 'marie-curie',
        name: 'Marie Curie',
        description: 'The pioneer of radioactivity. Guides curious minds through the Knowledge universe with scientific wonder.',
        universe: 'KNOWLEDGE',
        riveStateMachines: {
          idle: 'In laboratory, examining glowing vial',
          talking: 'Passionate explanation of discoveries',
          celebrating: 'Nobel Prize moment animation',
          experimenting: 'Conducting experiments with lab equipment',
        },
        staticImageUrl: '/characters/marie-curie-static.webp',
        era: 'Modern Era (1867–1934)',
        nationality: 'Polish-French',
        knownFor: 'Radioactivity, two Nobel Prizes, polonium and radium',
        availablePhase: 1,
      },
    }),
    prisma.character.create({
      data: {
        slug: 'einstein',
        name: 'Albert Einstein',
        description: 'The genius who questioned everything. Guides wandering minds through Curiosity with thought experiments.',
        universe: 'CURIOSITY',
        riveStateMachines: {
          idle: 'Thoughtful pose, wild hair, chalk in hand',
          talking: 'Enthusiastic explanation with blackboard',
          celebrating: 'Famous tongue-out playful moment',
          wondering: 'Gazing at stars, imagination mode',
        },
        staticImageUrl: '/characters/einstein-static.webp',
        era: 'Modern Era (1879–1955)',
        nationality: 'German-American',
        knownFor: 'Relativity, E=mc², photoelectric effect, thought experiments',
        availablePhase: 1,
      },
    }),
  ]);

  console.log(`✅ Created ${characters.length} characters`);

  // ═══════════════════════════════════════
  // TOPICS (5 seed topics)
  // ═══════════════════════════════════════

  const topics = await Promise.all([
    // 1. SCHOLAR — Pythagorean Theorem
    prisma.topic.create({
      data: {
        slug: 'pythagorean-theorem',
        title: 'The Pythagorean Theorem',
        subtitle: 'The equation that built civilizations',
        quickShotSummary: 'In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c².',
        description: 'Discover how a simple relationship between three sides of a triangle shaped mathematics, architecture, and navigation for over 2,500 years.',
        universe: 'SCHOLAR',
        subWorld: 'math',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        publishedAt: new Date(),
        readTimeMinutes: 8,
        tags: ['mathematics', 'geometry', 'theorem', 'pythagoras', 'triangles'],
        examTags: ['CBSE-10', 'ICSE-10', 'JEE-BASIC'],
        sources: [
          'https://mathworld.wolfram.com/PythagoreanTheorem.html',
          'https://en.wikipedia.org/wiki/Pythagorean_theorem',
        ],
        qualityBadge: 'verified',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-3-sentence-5',
        readingAuraEnabled: true,
        content: {
          summary: 'In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c².',
          keyFacts: [
            'Known to Babylonians 1000 years before Pythagoras',
            'Over 400 different proofs exist',
            'Used in GPS, architecture, and game development',
            'The Sulba Sutras of ancient India described it independently',
          ],
          desiAnalogies: [
            { id: 'cricket', analogy: 'Cricket Pitch Distance', explanation: 'When the fielder throws from deep square leg to the wicket, the ball\'s path forms the hypotenuse. The pitch length and side distance are the two sides — Pythagoras decides if it\'s a run-out!', emoji: '🏏' },
            { id: 'kite', analogy: 'Flying a Patang', explanation: 'The string length (hypotenuse), height of the kite, and horizontal distance from you form a right triangle. That\'s why you need more string than you think — Pythagoras tax!', emoji: '🪁' },
            { id: 'gully', analogy: 'Gully Cricket Boundary', explanation: 'When the boundary is a wall and you hit diagonally, the ball travels more than the wall\'s length. a² + b² = c² tells you exactly how far your sixer went.', emoji: '🧱' },
          ],
          memes: [
            { id: 'm1', text: 'Me: "I\'ll never use math in real life"\nGPS using Pythagorean theorem to find the nearest chai stall: 👀', context: 'Every time someone says math is useless' },
            { id: 'm2', text: 'Pythagoras: *discovers theorem*\nIndian mathematicians who wrote it in Sulba Sutras 1000 years earlier: "First time?"', context: 'India\'s contribution to mathematics goes way back' },
          ],
          zingConnections: [
            { id: 'c1', from: 'Pythagorean Theorem', to: 'GPS Navigation', insight: 'Every time Google Maps calculates distance, it uses the Pythagorean theorem in 3D (with altitude). Your daily commute runs on 2,500-year-old math.' },
            { id: 'c2', from: 'Geometry', to: 'Black Holes', insight: 'Einstein\'s curved spacetime uses Riemannian geometry — a generalization of flat Euclidean geometry where Pythagoras lives. The theorem breaks near a black hole!' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'Remember Pythagorean triplets: 3-4-5, 5-12-13, 8-15-17, 7-24-25. These appear in almost every board exam.', category: 'EXAM' },
            { id: 't2', tip: 'To check if a triangle is right-angled: just verify if a² + b² = c² for the three sides. No angles needed.', category: 'SHORTCUT' },
            { id: 't3', tip: 'In coordinate geometry, distance formula √((x₂-x₁)² + (y₂-y₁)²) IS the Pythagorean theorem. Same concept, different avatar.', category: 'CONNECTION' },
          ],
        },
        sections: [
          { id: 'intro', title: 'Before Pythagoras', type: 'story', order: 1 },
          { id: 'theorem', title: 'The Theorem Itself', type: 'deep-dive', order: 2 },
          { id: 'zing-moment', title: 'The Proof That Changed Math', type: 'zing-moment', order: 3 },
          { id: 'real-world', title: 'Where You Use It Without Knowing', type: 'application', order: 4 },
          { id: 'india', title: 'India Knew It First', type: 'india-connection', order: 5 },
        ],
        mood: {
          intro: 'discovery',
          theorem: 'neutral',
          'zing-moment': 'achievement',
          'real-world': 'discovery',
          india: 'achievement',
        },
      },
    }),

    // 2. CODE COSMOS — What is an API?
    prisma.topic.create({
      data: {
        slug: 'what-is-an-api',
        title: 'What is an API?',
        subtitle: 'The waiter between your app and the kitchen',
        quickShotSummary: 'An API (Application Programming Interface) is a set of rules that lets one piece of software talk to another. Think of it as a waiter: you (the app) tell the waiter (API) what you want, the waiter goes to the kitchen (server), and brings back your food (data).',
        description: 'APIs are everywhere — from weather apps to UPI payments. Understand how software talks to software, explained with chai and dosa analogies.',
        universe: 'CODE_COSMOS',
        subWorld: 'foundations',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        publishedAt: new Date(),
        readTimeMinutes: 6,
        tags: ['api', 'web-development', 'rest', 'http', 'backend'],
        examTags: [],
        sources: [
          'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction',
        ],
        qualityBadge: 'verified',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-2-sentence-8',
        readingAuraEnabled: true,
        content: {
          summary: 'An API (Application Programming Interface) is a set of rules that lets one piece of software talk to another. Think of it as a waiter: you (the app) tell the waiter (API) what you want, the waiter goes to the kitchen (server), and brings back your food (data).',
          keyFacts: [
            'REST APIs use HTTP methods: GET, POST, PUT, DELETE',
            'JSON is the most common API response format',
            'UPI, Google Maps, and Zomato all use APIs',
            'You can build your own API in 20 lines of code',
          ],
          desiAnalogies: [
            { id: 'chai', analogy: 'Chai Stall Order System', explanation: 'You tell the chaiwala "ek cutting chai" (request). He makes it in the kitchen (server). The counter between you is the API. You never go into the kitchen — you just get your chai (response).', emoji: '☕' },
            { id: 'dabbawala', analogy: 'Mumbai Dabbawalas', explanation: 'Dabbawalas pick up lunch from homes (data source), deliver to offices (client), and bring back empty boxes. They\'re a human API — reliable, fast, and they never mix up orders (Six Sigma!).', emoji: '🍱' },
            { id: 'upi', analogy: 'UPI Payment Flow', explanation: 'When you pay via PhonePe, your bank doesn\'t talk to the shopkeeper directly. UPI\'s API acts as the middleman — verifying, processing, confirming. All in 2 seconds!', emoji: '💳' },
          ],
          memes: [
            { id: 'm1', text: 'Frontend dev: "API response is slow"\nBackend dev: "Works fine on Postman"\nThe server: *running on a chai break schedule*', context: 'The eternal frontend vs backend battle' },
            { id: 'm2', text: 'API returns 200 OK\nBut the data is completely wrong\nMe: 🤡', context: 'Status codes can lie sometimes' },
          ],
          zingConnections: [
            { id: 'c1', from: 'APIs', to: 'UPI Payments', insight: 'India processes 10+ billion UPI transactions per month. Every single one goes through NPCI\'s API. India\'s digital revolution runs on API calls.' },
            { id: 'c2', from: 'REST API', to: 'Git & GitHub', insight: 'GitHub\'s API lets you create repos, manage issues, and trigger deployments — all without opening a browser. DevOps automation is just clever API chaining.' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'Start with Postman or Thunder Client to test APIs before writing code. Seeing the response visually makes everything click faster.', category: 'PRACTICE' },
            { id: 't2', tip: 'HTTP status codes: 2xx = success, 3xx = redirect, 4xx = your mistake, 5xx = server\'s mistake. Memorize 200, 201, 400, 401, 404, 500.', category: 'EXAM' },
            { id: 't3', tip: 'Free APIs to practice with: JSONPlaceholder, PokéAPI, OpenWeatherMap. Build something fun before building something serious.', category: 'SHORTCUT' },
          ],
        },
        sections: [
          { id: 'intro', title: 'The Chai Stall Analogy', type: 'story', order: 1 },
          { id: 'how-it-works', title: 'How APIs Actually Work', type: 'deep-dive', order: 2 },
          { id: 'types', title: 'REST vs GraphQL vs gRPC', type: 'comparison', order: 3 },
          { id: 'build', title: 'Build Your First API', type: 'hands-on', order: 4 },
        ],
        mood: {
          intro: 'discovery',
          'how-it-works': 'neutral',
          types: 'neutral',
          build: 'achievement',
        },
      },
    }),

    // 3. BATTLE GROUND — How to Start UPSC Preparation
    prisma.topic.create({
      data: {
        slug: 'upsc-preparation-guide',
        title: 'How to Start UPSC Preparation',
        subtitle: 'From zero to Prelims — the honest roadmap',
        quickShotSummary: 'UPSC CSE has 3 stages: Prelims (objective), Mains (subjective), Interview. Start with NCERT books (Class 6-12), read the newspaper daily, and give yourself 12-18 months minimum.',
        description: 'No coaching hype, no shortcuts. A brutally honest, step-by-step guide to starting your UPSC Civil Services journey from scratch.',
        universe: 'BATTLE_GROUND',
        subWorld: 'upsc',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        publishedAt: new Date(),
        readTimeMinutes: 15,
        tags: ['upsc', 'civil-services', 'ias', 'exam-preparation', 'strategy'],
        examTags: ['UPSC-PRELIMS', 'UPSC-MAINS'],
        sources: [
          'https://www.upsc.gov.in/',
          'https://www.insightsonindia.com/',
        ],
        qualityBadge: 'expert-reviewed',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-4-sentence-3',
        readingAuraEnabled: true,
        content: {
          summary: 'UPSC CSE has 3 stages: Prelims (objective), Mains (subjective), Interview. Start with NCERT books (Class 6-12), read the newspaper daily, and give yourself 12-18 months minimum.',
          keyFacts: [
            'Only ~0.1% of applicants get selected',
            'The syllabus is defined by UPSC — not coaching institutes',
            'NCERT books are the non-negotiable foundation',
            'Optional subject choice can make or break your rank',
          ],
          desiAnalogies: [
            { id: 'thali', analogy: 'The UPSC Thali', explanation: 'UPSC is like an unlimited thali — History, Polity, Geography, Economics, Science, Ethics... You can\'t skip any dish. But knowing which ones carry more marks is the key to finishing the plate.', emoji: '🍽️' },
            { id: 'ipl', analogy: 'IPL Auction Strategy', explanation: 'Like IPL teams have limited purse but need to fill 11 positions, you have limited time but need to cover all subjects. Smart allocation wins — don\'t blow all your prep time on one subject.', emoji: '🏏' },
          ],
          memes: [
            { id: 'm1', text: 'Parents: "Beta, UPSC de do"\nUPSC syllabus: *literally everything that has ever happened in India and the world*\nMe: 😭', context: 'When you realize the syllabus is everything' },
            { id: 'm2', text: 'Coaching institute: "Our study material is enough"\nToppers: "NCERT + newspaper + self-notes"\nCoaching: 🤐', context: 'The free resources vs paid coaching debate' },
          ],
          zingConnections: [
            { id: 'c1', from: 'UPSC Preparation', to: 'The Arthashastra', insight: 'Chanakya\'s Arthashastra appears in UPSC Ethics, History, AND Political Science papers. One ancient text, three different marks — that\'s efficient studying.' },
            { id: 'c2', from: 'UPSC Geography', to: 'Indian Monsoon', insight: 'The Indian Monsoon is one of the most-asked topics in UPSC Prelims Geography. Understanding pressure systems = guaranteed 2-3 questions.' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'Start with NCERT Class 6-12 for History, Geography, Polity, Science. Read them twice — first for understanding, second for notes.', category: 'FOUNDATION' },
            { id: 't2', tip: 'Read The Hindu or Indian Express daily. Mark 5 articles relevant to GS syllabus. This single habit can boost Mains score by 30-50 marks.', category: 'DAILY' },
            { id: 't3', tip: 'Give at least one mock test per week from Month 3 onwards. Analysis of wrong answers teaches more than reading new material.', category: 'STRATEGY' },
          ],
        },
        sections: [
          { id: 'reality', title: 'The Reality Check', type: 'story', order: 1 },
          { id: 'syllabus', title: 'Understanding the Syllabus', type: 'deep-dive', order: 2 },
          { id: 'strategy', title: 'The 18-Month Battle Plan', type: 'strategy', order: 3 },
          { id: 'chanakya-moment', title: 'What Chanakya Would Tell You', type: 'zing-moment', order: 4 },
          { id: 'resources', title: 'Free Resources That Actually Work', type: 'resources', order: 5 },
        ],
        mood: {
          reality: 'war',
          syllabus: 'neutral',
          strategy: 'war',
          'chanakya-moment': 'philosophy',
          resources: 'discovery',
        },
      },
    }),

    // 4. KNOWLEDGE — How Black Holes Work
    prisma.topic.create({
      data: {
        slug: 'how-black-holes-work',
        title: 'How Black Holes Work',
        subtitle: 'Where physics breaks and wonder begins',
        quickShotSummary: 'A black hole forms when a massive star collapses under its own gravity. Its pull is so strong that nothing — not even light — can escape past the event horizon.',
        description: 'From stellar collapse to the event horizon — understand the most terrifying and beautiful objects in the universe, explained so simply that a 15-year-old gets it.',
        universe: 'KNOWLEDGE',
        subWorld: 'space',
        status: 'PUBLISHED',
        difficulty: 'INTERMEDIATE',
        publishedAt: new Date(),
        readTimeMinutes: 12,
        tags: ['space', 'black-holes', 'astrophysics', 'gravity', 'relativity'],
        examTags: ['JEE-ADVANCED', 'UPSC-SCIENCE'],
        sources: [
          'https://science.nasa.gov/astrophysics/focus-areas/black-holes',
          'https://www.hawking.org.uk/the-beginning-of-time',
        ],
        qualityBadge: 'verified',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-3-sentence-7',
        readingAuraEnabled: true,
        scrollytellingConfig: {
          enabled: true,
          type: 'parallax-zoom',
          startScale: 1,
          endScale: 0.01,
          description: 'Zoom from galaxy view into black hole center',
        },
        content: {
          summary: 'A black hole forms when a massive star collapses under its own gravity. Its pull is so strong that nothing — not even light — can escape past the event horizon.',
          keyFacts: [
            'The nearest black hole to Earth is about 1,500 light-years away',
            'Time literally slows down near a black hole',
            'The first photo of a black hole was taken in 2019 (M87*)',
            'Sagittarius A* is the supermassive black hole at our galaxy\'s center',
          ],
          desiAnalogies: [
            { id: 'roti', analogy: 'Roti on a Gas Stove', explanation: 'Imagine placing a heavy steel ball on a fresh roti — it creates a dip. That\'s spacetime curvature! A black hole is like an infinitely heavy ball that tears through the roti entirely.', emoji: '🫓' },
            { id: 'drain', analogy: 'Bathroom Drain Whirlpool', explanation: 'Water spiraling into a drain = matter spiraling into a black hole. The closer you get, the faster you spin, and once you cross the edge — no coming back. Same physics, different scale.', emoji: '🌀' },
          ],
          memes: [
            { id: 'm1', text: 'Black hole: *exists*\nLight trying to escape: "Abhi nahi toh kabhi nahi"\nBlack hole: "Kabhi nahi."', context: 'Nothing escapes the event horizon' },
            { id: 'm2', text: 'Me near deadline: time goes so fast\nMe near a black hole: time literally stops\nWhere do I sign up? 🕐', context: 'Time dilation is real and we all want it during exams' },
          ],
          zingConnections: [
            { id: 'c1', from: 'Black Holes', to: 'Pythagorean Theorem', insight: 'Near a black hole, the Pythagorean theorem doesn\'t work because space itself is curved. You need Riemannian geometry instead — Euclid breaks at the cosmic scale!' },
            { id: 'c2', from: 'Event Horizon', to: 'Dreams', insight: 'Both black holes and dreams push the boundaries of human understanding. We can observe their effects but can\'t directly experience what\'s "inside" either one.' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'Remember: black holes don\'t "suck" — they attract via gravity like any other massive object. If our Sun became a black hole (it can\'t), Earth\'s orbit wouldn\'t change.', category: 'MISCONCEPTION' },
            { id: 't2', tip: 'For JEE: focus on escape velocity formula v = √(2GM/R). When v > c (speed of light), you get a black hole. This is the Schwarzschild radius.', category: 'EXAM' },
          ],
        },
        sections: [
          { id: 'death-of-star', title: 'The Death of a Star', type: 'story', order: 1 },
          { id: 'event-horizon', title: 'The Point of No Return', type: 'deep-dive', order: 2 },
          { id: 'time-dilation', title: 'When Time Itself Bends', type: 'zing-moment', order: 3 },
          { id: 'types', title: 'Stellar vs Supermassive vs Primordial', type: 'comparison', order: 4 },
          { id: 'india', title: 'ISRO and Black Hole Research', type: 'india-connection', order: 5 },
        ],
        mood: {
          'death-of-star': 'war',
          'event-horizon': 'philosophy',
          'time-dilation': 'discovery',
          types: 'neutral',
          india: 'achievement',
        },
      },
    }),

    // 5. CURIOSITY — Why Do We Dream?
    prisma.topic.create({
      data: {
        slug: 'why-do-we-dream',
        title: 'Why Do We Dream?',
        subtitle: 'The mind\'s midnight cinema — decoded',
        quickShotSummary: 'Dreams occur during REM (Rapid Eye Movement) sleep. Leading theories suggest they help process emotions, consolidate memories, and simulate threats for survival practice.',
        description: 'Every night, your brain creates a private movie. Some are beautiful, some are terrifying, and science still can\'t fully explain why.',
        universe: 'CURIOSITY',
        subWorld: 'psychology',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        publishedAt: new Date(),
        readTimeMinutes: 10,
        tags: ['psychology', 'dreams', 'neuroscience', 'sleep', 'consciousness'],
        examTags: [],
        sources: [
          'https://www.sleepfoundation.org/dreams',
          'https://www.nature.com/articles/s41583-021-00530-9',
        ],
        qualityBadge: 'verified',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-3-sentence-4',
        readingAuraEnabled: true,
        content: {
          summary: 'Dreams occur during REM (Rapid Eye Movement) sleep. Leading theories suggest they help process emotions, consolidate memories, and simulate threats for survival practice.',
          keyFacts: [
            'We dream 4-6 times per night but forget 95%',
            'Blind people dream with sound, touch, and smell',
            'Lucid dreaming is when you know you\'re dreaming',
            'Ancient Indians studied dreams in the Mandukya Upanishad',
          ],
          desiAnalogies: [
            { id: 'bollywood', analogy: 'Bollywood Director Brain', explanation: 'Your brain during REM sleep is like a Bollywood director with zero budget control — mixing random actors (people you know), exotic locations (places you\'ve seen), and impossible plots. No script, pure masala!', emoji: '🎬' },
            { id: 'jugaad', analogy: 'Memory Jugaad', explanation: 'Dreams are your brain\'s jugaad for filing memories — it takes the day\'s experiences, mixes them up, tests which ones to keep, and throws away the rest. Decluttering, desi-style.', emoji: '🧠' },
          ],
          memes: [
            { id: 'm1', text: 'Brain at 3 AM: "Let me show you a dream where your teeth fall out in a board exam while your crush watches"\nMe: "Why are you like this?"', context: 'The classic anxiety dream everyone has' },
            { id: 'm2', text: 'Me: *has an amazing dream*\nAlarm: rings\nThe dream: *vanishes like my motivation on Monday*', context: 'We forget 95% of dreams within 5 minutes of waking' },
          ],
          zingConnections: [
            { id: 'c1', from: 'Dreams', to: 'Black Holes', insight: 'Both represent the edges of human understanding — we can measure their existence but can\'t fully explain what happens inside. Dreams are the black holes of neuroscience.' },
            { id: 'c2', from: 'Lucid Dreaming', to: 'Mandukya Upanishad', insight: 'The Mandukya Upanishad described four states of consciousness (waking, dreaming, deep sleep, turiya) 3,000 years before Western neuroscience. Ancient Indian philosophy was doing brain science!' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'Keep a dream journal next to your bed. Write immediately upon waking — even 30 seconds of delay causes 50% memory loss.', category: 'PRACTICE' },
            { id: 't2', tip: 'To try lucid dreaming: do "reality checks" during the day (count your fingers, read text twice). This habit carries into dreams, triggering awareness.', category: 'TECHNIQUE' },
          ],
        },
        sections: [
          { id: 'midnight', title: 'What Happens at 3 AM', type: 'story', order: 1 },
          { id: 'science', title: 'The Neuroscience of Dreams', type: 'deep-dive', order: 2 },
          { id: 'lucid', title: 'Lucid Dreaming — Controlling Movies', type: 'zing-moment', order: 3 },
          { id: 'theories', title: 'Freud vs Jung vs Modern Science', type: 'comparison', order: 4 },
          { id: 'india', title: 'Swapna Shastra — Indian Dream Science', type: 'india-connection', order: 5 },
        ],
        mood: {
          midnight: 'philosophy',
          science: 'discovery',
          lucid: 'achievement',
          theories: 'neutral',
          india: 'discovery',
        },
      },
    }),

    // 6. CAREER — Cracking Your First Tech Interview
    prisma.topic.create({
      data: {
        slug: 'first-tech-interview',
        title: 'Cracking Your First Tech Interview',
        subtitle: 'From nervous fresher to confident candidate',
        quickShotSummary: 'Tech interviews have 4 rounds: Resume screening → Technical (DSA + System Design) → Coding assignment → HR. Prepare 3 projects, practice 100 LeetCode problems, and have 3 good questions ready.',
        description: 'The honest guide to tech interviews in India — what recruiters actually look for, common mistakes, and how to turn "I don\'t know" into a strength.',
        universe: 'CAREER',
        subWorld: 'interviews',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        publishedAt: new Date(),
        readTimeMinutes: 14,
        tags: ['interview', 'tech-career', 'fresher', 'coding-interview', 'hr-round'],
        examTags: [],
        sources: [
          'https://www.teamblind.com/blog/index.php/tag/interview/',
          'https://www.geeksforgeeks.org/interview-preparation/',
        ],
        qualityBadge: 'expert-reviewed',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-4-sentence-2',
        readingAuraEnabled: true,
        content: {
          summary: 'Tech interviews have 4 rounds: Resume screening → Technical (DSA + System Design) → Coding assignment → HR. Prepare 3 projects, practice 100 LeetCode problems, and have 3 good questions ready.',
          keyFacts: [
            'Most rejections happen in first 2 minutes of intro',
            '"Tell me about yourself" is the most important answer',
            'GitHub profile matters more than college marks for startups',
            'Asking smart questions shows more than knowing all answers',
          ],
          desiAnalogies: [
            { id: 'arranged', analogy: 'Arranged Marriage Meeting', explanation: 'Tech interviews are like arranged marriage meetings — both sides are evaluating each other, first impressions matter way too much, and your relatives (references) get called later. "Tell me about yourself" = biodata!', emoji: '💍' },
            { id: 'cricket', analogy: 'IPL Player Auction', explanation: 'Your resume is the player stats. The interview is the auction room. GitHub is your highlights reel. Just like unsold players find teams later, rejected candidates find better companies. Keep playing!', emoji: '🏏' },
          ],
          memes: [
            { id: 'm1', text: 'Interviewer: "Where do you see yourself in 5 years?"\nMe: "In your position."\nInterviewer: 😐\nMe: "I mean... growing with the company!" 😅', context: 'The classic HR question that nobody answers honestly' },
            { id: 'm2', text: 'Resume: "Proficient in 15 technologies"\nInterviewer: "Explain how HashMap works"\nMe: "So basically... it\'s like a dabba..." 📦', context: 'When your resume writes checks your brain can\'t cash' },
          ],
          zingConnections: [
            { id: 'c1', from: 'Tech Interviews', to: 'Git & GitHub', insight: 'A green GitHub contribution graph impresses recruiters more than a 90% CGPA. Regular commits show you actually CODE, not just study theory.' },
            { id: 'c2', from: 'Interview Strategy', to: 'Arthashastra', insight: 'Chanakya\'s "Saam, Daam, Dand, Bhed" applies to interviews: charm them (Saam), show value (Daam), demonstrate strength (Dand), differentiate yourself (Bhed).' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'Prepare a 60-second "Tell me about yourself" that covers: who you are → what you\'ve built → why this company. Practice until it sounds natural, not rehearsed.', category: 'MUST-DO' },
            { id: 't2', tip: 'For DSA rounds: solve 100 problems (not 500). Focus on patterns: sliding window, two pointers, BFS/DFS, dynamic programming. Quality > quantity.', category: 'STRATEGY' },
            { id: 't3', tip: 'Always ask 2-3 questions at the end: "What does a typical day look like?" and "What\'s the biggest challenge the team faces?" — shows genuine interest.', category: 'PRO-TIP' },
          ],
        },
        sections: [
          { id: 'mindset', title: 'The Interview Mindset Shift', type: 'story', order: 1 },
          { id: 'preparation', title: 'The 30-Day Prep Plan', type: 'deep-dive', order: 2 },
          { id: 'rounds', title: 'What Happens in Each Round', type: 'comparison', order: 3 },
          { id: 'aha-moment', title: 'When They Actually Say Yes', type: 'zing-moment', order: 4 },
          { id: 'mistakes', title: '7 Mistakes That Kill Offers', type: 'resources', order: 5 },
        ],
        mood: {
          mindset: 'discovery',
          preparation: 'neutral',
          rounds: 'war',
          'aha-moment': 'achievement',
          mistakes: 'neutral',
        },
      },
    }),

    // 7. CIVILIZATION — The Arthashastra Explained
    prisma.topic.create({
      data: {
        slug: 'arthashastra-explained',
        title: 'The Arthashastra Explained',
        subtitle: 'Ancient India\'s playbook for power',
        quickShotSummary: 'The Arthashastra is a 4th-century BCE treatise on governance, economics, military strategy, and espionage. Chanakya wrote it as a guide for rulers — covering everything from taxation to sabotage.',
        description: 'Chanakya\'s 2,300-year-old manual on statecraft, economics, and war — brutal, brilliant, and eerily relevant to modern politics and business.',
        universe: 'CIVILIZATION',
        subWorld: 'strategy',
        status: 'PUBLISHED',
        difficulty: 'INTERMEDIATE',
        publishedAt: new Date(),
        readTimeMinutes: 16,
        tags: ['chanakya', 'strategy', 'statecraft', 'ancient-india', 'politics', 'economics'],
        examTags: ['UPSC-HISTORY', 'UPSC-ETHICS'],
        sources: [
          'https://www.ancient.eu/Arthashastra/',
          'https://ncert.nic.in/textbook/pdf/iess104.pdf',
        ],
        qualityBadge: 'expert-reviewed',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-3-sentence-9',
        readingAuraEnabled: true,
        content: {
          summary: 'The Arthashastra is a 4th-century BCE treatise on governance, economics, military strategy, and espionage. Chanakya wrote it as a guide for rulers — covering everything from taxation to sabotage.',
          keyFacts: [
            'Predates Machiavelli\'s The Prince by 1,800 years',
            'Has chapters on cryptocurrency-like concepts (economic stability)',
            'Recommends spies disguised as saints, students, and merchants',
            'Foundation of the Mauryan Empire under Chandragupta',
          ],
          desiAnalogies: [
            { id: 'startup', analogy: 'Startup CEO Playbook', explanation: 'Arthashastra is basically a 2,300-year-old "How to Run a Startup" — covers fundraising (treasury), team management (ministers), competitive analysis (enemy kingdoms), and pivot strategy (mandala theory).', emoji: '📈' },
            { id: 'chess', analogy: 'Chess Game = Kingdom', explanation: 'Chanakya invented political chess before chess was invented! The king (raja), minister (mantri), spies (pawns), army (rooks) — every move in Arthashastra maps to a chess strategy.', emoji: '♟️' },
          ],
          memes: [
            { id: 'm1', text: 'Machiavelli: "I wrote the ultimate guide to power"\nChanakya (1,800 years earlier): "That\'s cute." 🙏', context: 'The original OG of political strategy' },
            { id: 'm2', text: 'Chanakya\'s advice: "Keep your friends close and enemies closer"\nAlso Chanakya: "Actually, just poison your enemies\' food"\n💀', context: 'Arthashastra doesn\'t mess around with diplomacy' },
          ],
          zingConnections: [
            { id: 'c1', from: 'Arthashastra', to: 'UPSC Preparation', insight: 'Arthashastra appears in UPSC History (Mauryan Empire), Ethics (governance principles), and Political Science (statecraft theory). Master one text, score in three papers.' },
            { id: 'c2', from: 'Mandala Theory', to: 'Modern Geopolitics', insight: 'Chanakya\'s "your neighbor is your enemy, your neighbor\'s neighbor is your friend" explains India-Pakistan-China-Russia dynamics perfectly. 2,300 years and still accurate!' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'For UPSC: focus on 3 key concepts — Saptanga Theory (7 elements of state), Mandala Theory (circle of kings), and the spy system. These cover 90% of questions.', category: 'EXAM' },
            { id: 't2', tip: 'Compare Arthashastra with Machiavelli\'s The Prince in essays — UPSC loves comparative analysis between Indian and Western political thought.', category: 'STRATEGY' },
          ],
        },
        sections: [
          { id: 'chanakya', title: 'Who Was Chanakya?', type: 'story', order: 1 },
          { id: 'contents', title: 'The 15 Books of Arthashastra', type: 'deep-dive', order: 2 },
          { id: 'mandala', title: 'The Mandala Theory — India\'s Game of Thrones', type: 'zing-moment', order: 3 },
          { id: 'modern', title: 'Chanakya in Boardrooms and Elections', type: 'application', order: 4 },
          { id: 'ethics', title: 'The Moral Dilemma — When Does Strategy Become Immoral?', type: 'philosophy', order: 5 },
        ],
        mood: {
          chanakya: 'discovery',
          contents: 'neutral',
          mandala: 'war',
          modern: 'discovery',
          ethics: 'philosophy',
        },
      },
    }),

    // 8. SCHOLAR — Photosynthesis Explained
    prisma.topic.create({
      data: {
        slug: 'photosynthesis-explained',
        title: 'How Photosynthesis Actually Works',
        subtitle: 'The most important chemical reaction on Earth',
        quickShotSummary: 'Photosynthesis = 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. It has two stages: Light reactions (in thylakoids) and Calvin cycle (in stroma). Together they convert light energy into chemical energy (glucose).',
        description: 'Every breath you take exists because of photosynthesis. Here\'s how plants turn sunlight, water, and CO₂ into food and oxygen — explained at the molecular level.',
        universe: 'SCHOLAR',
        subWorld: 'science',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        publishedAt: new Date(),
        readTimeMinutes: 11,
        tags: ['biology', 'photosynthesis', 'plants', 'biochemistry', 'chlorophyll'],
        examTags: ['CBSE-10', 'CBSE-12', 'NEET', 'JEE-MAINS'],
        sources: [
          'https://ncert.nic.in/textbook/pdf/kebo106.pdf',
          'https://www.khanacademy.org/science/biology/photosynthesis-in-plants',
        ],
        qualityBadge: 'verified',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-2-sentence-11',
        readingAuraEnabled: true,
        content: {
          summary: 'Photosynthesis = 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. It has two stages: Light reactions (in thylakoids) and Calvin cycle (in stroma). Together they convert light energy into chemical energy (glucose).',
          keyFacts: [
            'A single tree produces enough oxygen for 2 people per year',
            'Chlorophyll absorbs red and blue light, reflects green',
            'Photosynthesis removes 120 billion tons of CO₂ annually',
            'Started 3.5 billion years ago with cyanobacteria',
          ],
          desiAnalogies: [
            { id: 'kitchen', analogy: 'Maa Ka Kitchen', explanation: 'Photosynthesis is like your mom\'s kitchen: sunlight is the gas stove, water from roots is the water, CO₂ is the raw vegetables. Output? Glucose (food) and oxygen (the good vibes). Plants are literally cooking all day!', emoji: '👩‍🍳' },
            { id: 'solar', analogy: 'Solar Panel on Village Rooftops', explanation: 'A leaf is nature\'s solar panel — it captures light energy and converts it to usable energy (glucose). India\'s push for solar energy is basically copying what plants figured out 3.5 billion years ago.', emoji: '☀️' },
          ],
          memes: [
            { id: 'm1', text: 'Plants: *literally produce oxygen for free*\nHumans: "Let me cut them down for a parking lot"\nPlants: 🌿😐', context: 'Deforestation is the real villain' },
            { id: 'm2', text: 'Teacher: "Write the photosynthesis equation"\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\nMe who memorized it like a phone number: 📱✌️', context: 'The most memorized equation in biology class' },
          ],
          zingConnections: [
            { id: 'c1', from: 'Photosynthesis', to: 'Indian Monsoon', insight: 'No monsoon = no rain = no photosynthesis = no food. India\'s agricultural GDP is directly tied to how well plants photosynthesize during the monsoon season.' },
            { id: 'c2', from: 'Chlorophyll', to: 'Solar Energy', insight: 'Scientists are building "artificial leaves" that mimic photosynthesis to generate clean hydrogen fuel. Plants solved the energy crisis billions of years ago — we\'re just catching up.' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'NEET trick: Light reactions happen in thylakoids (think T for "Top" — stacked membranes). Calvin cycle happens in stroma (think S for "Surrounding").', category: 'EXAM' },
            { id: 't2', tip: 'Remember C3 vs C4: most plants are C3. C4 plants (sugarcane, maize) are more efficient in hot climates — they fix CO₂ twice. CAM plants (cactus) open stomata only at night.', category: 'COMPARISON' },
            { id: 't3', tip: 'The equation 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ can be remembered as: "6-6 in, 1-6 out" (6 carbon dioxide + 6 water → 1 glucose + 6 oxygen).', category: 'SHORTCUT' },
          ],
        },
        sections: [
          { id: 'why-green', title: 'Why Are Plants Green?', type: 'story', order: 1 },
          { id: 'mechanism', title: 'The Two-Stage Process', type: 'deep-dive', order: 2 },
          { id: 'equation', title: 'The Most Beautiful Equation in Biology', type: 'zing-moment', order: 3 },
          { id: 'types', title: 'C3 vs C4 vs CAM Photosynthesis', type: 'comparison', order: 4 },
          { id: 'future', title: 'Artificial Photosynthesis — The Next Green Revolution', type: 'discovery', order: 5 },
        ],
        mood: {
          'why-green': 'discovery',
          mechanism: 'neutral',
          equation: 'achievement',
          types: 'neutral',
          future: 'discovery',
        },
      },
    }),

    // 9. CODE COSMOS — Git & GitHub for Beginners
    prisma.topic.create({
      data: {
        slug: 'git-github-beginners',
        title: 'Git & GitHub for Absolute Beginners',
        subtitle: 'Version control without the confusion',
        quickShotSummary: 'Git = version control system (tracks code changes). GitHub = cloud platform (stores Git repos). Core workflow: clone → edit → add → commit → push. Branches let you experiment safely.',
        description: 'Git seems scary until you understand the analogy: it\'s just a time machine for your code. Learn the 7 commands that cover 95% of real-world use.',
        universe: 'CODE_COSMOS',
        subWorld: 'foundations',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        publishedAt: new Date(),
        readTimeMinutes: 13,
        tags: ['git', 'github', 'version-control', 'dev-tools', 'collaboration'],
        examTags: [],
        sources: [
          'https://git-scm.com/book/en/v2',
          'https://docs.github.com/en/get-started',
        ],
        qualityBadge: 'verified',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-3-sentence-6',
        readingAuraEnabled: true,
        content: {
          summary: 'Git = version control system (tracks code changes). GitHub = cloud platform (stores Git repos). Core workflow: clone → edit → add → commit → push. Branches let you experiment safely.',
          keyFacts: [
            'Over 100 million developers use GitHub',
            'Git was created by Linus Torvalds (Linux creator) in 2005',
            'A commit is a snapshot, not a diff (common misconception)',
            'You can\'t break main branch if you work on feature branches',
          ],
          desiAnalogies: [
            { id: 'game', analogy: 'Video Game Save Points', explanation: 'Git commits are like save points in a game. Mess up? Load the last save. Want to try a risky move? Create a new save branch. Game over? Reset to any previous save. Git is Ctrl+Z on steroids!', emoji: '🎮' },
            { id: 'recipe', analogy: 'Nani Ka Recipe Book', explanation: 'Your Nani\'s recipe book has changes over generations — original recipe (main), your mom\'s version (branch), your experiment (feature branch). Git tracks who changed what, so the original is never lost.', emoji: '📖' },
          ],
          memes: [
            { id: 'm1', text: 'git push --force\nThe entire team\'s work: 💀\nMe: "It works on my machine"', context: 'Never force push to main. NEVER.' },
            { id: 'm2', text: 'Day 1: "Git is easy"\nDay 3: *accidentally detached HEAD*\n"I am looking respectfully at SVN" 👁️👁️', context: 'Git has a learning curve shaped like a cliff' },
          ],
          zingConnections: [
            { id: 'c1', from: 'Git & GitHub', to: 'Tech Interviews', insight: 'A consistent GitHub contribution graph is your best portfolio. Recruiters check it before your resume — daily commits show you actually ship code.' },
            { id: 'c2', from: 'Version Control', to: 'APIs', insight: 'GitHub\'s REST API lets you automate everything — create repos, merge PRs, deploy code. CI/CD pipelines are just Git + API calls working together.' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'Only 7 commands cover 95% of daily Git: init, clone, add, commit, push, pull, checkout. Master these before learning anything else.', category: 'FOUNDATION' },
            { id: 't2', tip: 'Write commit messages like newspaper headlines: "Add login page" not "updated stuff". Future you will thank present you.', category: 'BEST-PRACTICE' },
            { id: 't3', tip: 'Accidentally committed to main? "git reset --soft HEAD~1" undoes the commit but keeps your changes. Soft reset is your best friend.', category: 'RESCUE' },
          ],
        },
        sections: [
          { id: 'analogy', title: 'The Save Point Analogy', type: 'story', order: 1 },
          { id: 'commands', title: 'The 7 Essential Commands', type: 'deep-dive', order: 2 },
          { id: 'branches', title: 'Branches — When It Finally Clicks', type: 'zing-moment', order: 3 },
          { id: 'workflow', title: 'Real Developer Workflow', type: 'hands-on', order: 4 },
          { id: 'mistakes', title: 'Fixing Common Mistakes', type: 'resources', order: 5 },
        ],
        mood: {
          analogy: 'discovery',
          commands: 'neutral',
          branches: 'achievement',
          workflow: 'neutral',
          mistakes: 'neutral',
        },
      },
    }),

    // 10. KNOWLEDGE — The Indian Monsoon System
    prisma.topic.create({
      data: {
        slug: 'indian-monsoon-system',
        title: 'How the Indian Monsoon Works',
        subtitle: 'The most important weather pattern for a billion people',
        quickShotSummary: 'The Indian monsoon is driven by differential heating of land and ocean. In summer, warm land creates low pressure, pulling moisture-laden winds from the Indian Ocean. The Himalayas block these winds, causing heavy rainfall.',
        description: 'Why does it rain in July but not in January? Understand the science behind monsoons — from ocean temperatures to Himalayan geography — and why India\'s economy depends on it.',
        universe: 'KNOWLEDGE',
        subWorld: 'earth',
        status: 'PUBLISHED',
        difficulty: 'BEGINNER',
        publishedAt: new Date(),
        readTimeMinutes: 12,
        tags: ['monsoon', 'geography', 'climate', 'india', 'weather', 'agriculture'],
        examTags: ['CBSE-9', 'UPSC-GEOGRAPHY'],
        sources: [
          'https://mausam.imd.gov.in/',
          'https://ncert.nic.in/textbook/pdf/iess104.pdf',
        ],
        qualityBadge: 'verified',
        hasZingMomentFlash: true,
        zingMomentSentenceId: 'section-2-sentence-8',
        readingAuraEnabled: true,
        content: {
          summary: 'The Indian monsoon is driven by differential heating of land and ocean. In summer, warm land creates low pressure, pulling moisture-laden winds from the Indian Ocean. The Himalayas block these winds, causing heavy rainfall.',
          keyFacts: [
            'Monsoon provides 80% of India\'s annual rainfall',
            'Agricultural GDP is directly tied to monsoon strength',
            'The word "monsoon" comes from Arabic "mausim" (season)',
            'Monsoon failure can trigger drought, inflation, and farmer distress',
          ],
          desiAnalogies: [
            { id: 'cooler', analogy: 'Desert Cooler Effect', explanation: 'The monsoon works like a giant desert cooler — ocean water evaporates (wet pad), wind carries moisture to land (fan), Himalayas cool it down (metal body), and rain falls (water dripping). India-sized AC!', emoji: '❄️' },
            { id: 'train', analogy: 'Mumbai Local Train', explanation: 'The monsoon arrives like a Mumbai local — has a fixed schedule (June 1 Kerala), makes stops along the way (coast → plains → mountains), sometimes late, and when it arrives, EVERYONE gets drenched.', emoji: '🚂' },
          ],
          memes: [
            { id: 'm1', text: 'IMD: "Monsoon will arrive on June 1"\nMonsoon on June 15: "Traffic tha" 🚗', context: 'Monsoon predictions vs reality — an annual Indian tradition' },
            { id: 'm2', text: 'India without monsoon: 🏜️\nIndia with monsoon: 🏊\nThere is no in-between. 😭', context: 'From drought to floods in one season' },
          ],
          zingConnections: [
            { id: 'c1', from: 'Indian Monsoon', to: 'Photosynthesis', insight: 'India\'s kharif crops (rice, maize, cotton) depend entirely on monsoon rain for photosynthesis. No monsoon = no photosynthesis = food crisis for 1.4 billion people.' },
            { id: 'c2', from: 'Monsoon Geography', to: 'UPSC Preparation', insight: 'The monsoon mechanism is one of the most-tested UPSC Geography topics. Understanding pressure systems, ITCZ, and jet streams can guarantee 3-5 Prelims questions.' },
          ],
          tipsAndTricks: [
            { id: 't1', tip: 'Remember the monsoon path: Kerala (June 1) → Mumbai (June 10) → Delhi (June 25) → All India (July 15). Think of it as the monsoon\'s "train route."', category: 'EXAM' },
            { id: 't2', tip: 'Key terms for UPSC: ITCZ (Inter-Tropical Convergence Zone), Somali Jet, Western Ghats orographic rainfall, monsoon trough, El Niño effect on monsoon.', category: 'VOCABULARY' },
            { id: 't3', tip: 'Southwest monsoon = June-September (wet). Northeast monsoon = October-December (Tamil Nadu only). Know both directions for board exams.', category: 'SHORTCUT' },
          ],
        },
        sections: [
          { id: 'june-1', title: 'June 1st — When India Holds Its Breath', type: 'story', order: 1 },
          { id: 'science', title: 'The Science — Pressure, Winds, and Mountains', type: 'deep-dive', order: 2 },
          { id: 'onset', title: 'The Moment Monsoon Arrives in Kerala', type: 'zing-moment', order: 3 },
          { id: 'types', title: 'Southwest vs Northeast Monsoon', type: 'comparison', order: 4 },
          { id: 'prediction', title: 'How IMD Predicts Monsoon (And Why It\'s Hard)', type: 'discovery', order: 5 },
        ],
        mood: {
          'june-1': 'discovery',
          science: 'neutral',
          onset: 'achievement',
          types: 'neutral',
          prediction: 'discovery',
        },
      },
    }),
  ]);

  console.log(`✅ Created ${topics.length} topics`);

  // ═══════════════════════════════════════
  // TOPIC RELATIONS (Knowledge Graph Edges)
  // ═══════════════════════════════════════

  const relations = await Promise.all([
    // Pythagorean Theorem → Black Holes (geometry in spacetime)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[0]!.id,
        toTopicId: topics[3]!.id,
        relationType: 'RELATED',
        strength: 0.3,
      },
    }),
    // APIs → UPSC (technology optional subject)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[1]!.id,
        toTopicId: topics[2]!.id,
        relationType: 'RELATED',
        strength: 0.2,
      },
    }),
    // Git/GitHub → First Tech Interview (must-know skill)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[8]!.id,
        toTopicId: topics[5]!.id,
        relationType: 'PREREQUISITE',
        strength: 0.7,
      },
    }),
    // APIs → Git (both foundational dev tools)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[1]!.id,
        toTopicId: topics[8]!.id,
        relationType: 'RELATED',
        strength: 0.5,
      },
    }),
    // Photosynthesis → Monsoon (plant growth depends on rain)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[7]!.id,
        toTopicId: topics[9]!.id,
        relationType: 'RELATED',
        strength: 0.4,
      },
    }),
    // Monsoon → UPSC (major geography topic)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[9]!.id,
        toTopicId: topics[2]!.id,
        relationType: 'RELATED',
        strength: 0.5,
      },
    }),
    // Arthashastra → UPSC (ethics and history paper)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[6]!.id,
        toTopicId: topics[2]!.id,
        relationType: 'BUILDS_ON',
        strength: 0.6,
      },
    }),
    // Black Holes → Dreams (both explore consciousness boundaries)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[3]!.id,
        toTopicId: topics[4]!.id,
        relationType: 'RELATED',
        strength: 0.2,
      },
    }),
    // Photosynthesis → Pythagorean Theorem (both in school curriculum)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[7]!.id,
        toTopicId: topics[0]!.id,
        relationType: 'RELATED',
        strength: 0.3,
      },
    }),
    // First Tech Interview → Arthashastra (strategy and preparation)
    prisma.topicRelation.create({
      data: {
        fromTopicId: topics[5]!.id,
        toTopicId: topics[6]!.id,
        relationType: 'RELATED',
        strength: 0.3,
      },
    }),
  ]);

  console.log(`✅ Created ${relations.length} topic relations`);

  // ═══════════════════════════════════════
  // TOPIC TRANSLATIONS (Hindi samples)
  // ═══════════════════════════════════════

  await prisma.topicTranslation.create({
    data: {
      topicId: topics[0]!.id,
      language: 'HI',
      translatedBy: 'AI_DRAFT',
      title: 'पाइथागोरस प्रमेय',
      subtitle: 'वो समीकरण जिसने सभ्यताएँ बनाईं',
      description: 'जानिए कैसे एक त्रिभुज की तीन भुजाओं का सरल संबंध 2,500 सालों से गणित, वास्तुकला और नेविगेशन को आकार दे रहा है।',
      content: {
        summary: 'समकोण त्रिभुज में कर्ण का वर्ग बाकी दो भुजाओं के वर्गों के योग के बराबर होता है: a² + b² = c²।',
        keyFacts: [
          'बेबीलोन ने पाइथागोरस से 1000 साल पहले इसे जाना था',
          '400 से अधिक अलग-अलग प्रमाण मौजूद हैं',
          'GPS, आर्किटेक्चर और गेम डेवलपमेंट में इस्तेमाल होता है',
          'भारत के शुल्ब सूत्रों में इसका स्वतंत्र वर्णन है',
        ],
      },
      sections: [
        { id: 'intro', title: 'पाइथागोरस से पहले', type: 'story', order: 1 },
        { id: 'theorem', title: 'प्रमेय', type: 'deep-dive', order: 2 },
        { id: 'zing-moment', title: 'वो प्रमाण जिसने गणित बदल दिया', type: 'zing-moment', order: 3 },
        { id: 'real-world', title: 'जहाँ आप इसे बिना जाने इस्तेमाल करते हैं', type: 'application', order: 4 },
        { id: 'india', title: 'भारत ने पहले जाना', type: 'india-connection', order: 5 },
      ],
    },
  });

  console.log('✅ Created 1 Hindi translation (Pythagorean Theorem)');

  // ═══════════════════════════════════════
  // ENRICH CONTENT WITH ARTICLE BODY TEXT
  // ═══════════════════════════════════════
  // Full article sections are in update-content.ts (companion script).
  // Run: npx tsx update-content.ts
  // This adds content.sections[].body to each topic for ReadModeArticle rendering.
  console.log('💡 Run "npx tsx update-content.ts" to add full article body content.\n');

  console.log('\n⚡ Seed complete! ZING database is ready.\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

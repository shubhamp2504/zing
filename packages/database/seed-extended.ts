/**
 * ⚡ ZING Extended Seed — 91 Additional Topics
 * Run AFTER seed.ts to populate all 7 universes × 5 subWorlds
 *
 * Usage: npx tsx seed-extended.ts
 */
import { PrismaClient, Universe, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

interface TopicSeed {
  slug: string;
  title: string;
  subtitle: string;
  quickShotSummary: string;
  description: string;
  universe: Universe;
  subWorld: string;
  difficulty: Difficulty;
  readTimeMinutes: number;
  tags: string[];
  examTags: string[];
  sources: string[];
  content: {
    summary: string;
    keyFacts: string[];
    desiAnalogies: { id: string; analogy: string; explanation: string; emoji: string }[];
    memes: { id: string; text: string; context: string }[];
    zingConnections: { id: string; from: string; to: string; insight: string }[];
    tipsAndTricks: { id: string; tip: string; category: string }[];
  };
  sections: { id: string; title: string; type: string; order: number }[];
  mood: Record<string, string>;
}

async function createTopic(t: TopicSeed) {
  return prisma.topic.upsert({
    where: { slug: t.slug },
    update: {},
    create: {
      slug: t.slug,
      title: t.title,
      subtitle: t.subtitle,
      quickShotSummary: t.quickShotSummary,
      description: t.description,
      universe: t.universe,
      subWorld: t.subWorld,
      status: 'PUBLISHED',
      difficulty: t.difficulty,
      publishedAt: new Date(),
      readTimeMinutes: t.readTimeMinutes,
      tags: t.tags,
      examTags: t.examTags,
      sources: t.sources,
      qualityBadge: 'verified',
      hasZingMomentFlash: true,
      zingMomentSentenceId: 'section-2-sentence-5',
      readingAuraEnabled: true,
      content: t.content,
      sections: t.sections,
      mood: t.mood,
    },
  });
}

// ═══════════════════════════════════════════
// SCHOLAR — 13 NEW TOPICS
// (math, science, social-studies, languages, board-exams)
// ═══════════════════════════════════════════

const SCHOLAR: TopicSeed[] = [
  {
    slug: 'quadratic-equations-explained',
    title: 'Quadratic Equations Explained',
    subtitle: 'ax² + bx + c = 0 — the equation that curves everything',
    quickShotSummary: 'A quadratic equation is any equation of the form ax² + bx + c = 0. The solutions come from the quadratic formula: x = (-b ± √(b²-4ac)) / 2a. The discriminant (b²-4ac) tells you if roots are real or imaginary.',
    description: 'From projectile motion to business profit curves — quadratic equations are everywhere. Master the formula, understand the graph, and never fear the parabola again.',
    universe: 'SCHOLAR',
    subWorld: 'math',
    difficulty: 'BEGINNER',
    readTimeMinutes: 9,
    tags: ['mathematics', 'algebra', 'quadratic', 'equations', 'parabola'],
    examTags: ['CBSE-10', 'ICSE-10', 'JEE-MAINS'],
    sources: ['https://ncert.nic.in/textbook/pdf/jemh104.pdf'],
    content: {
      summary: 'A quadratic equation is any equation of the form ax² + bx + c = 0. Solve using the quadratic formula or factoring.',
      keyFacts: [
        'The graph of a quadratic is always a parabola',
        'Discriminant > 0 means two real roots, = 0 means one, < 0 means imaginary',
        'Used in physics for projectile motion trajectories',
        'Ancient Babylonians solved quadratics 4,000 years ago',
      ],
      desiAnalogies: [
        { id: 'cricket-ball', analogy: 'Cricket Ball Trajectory', explanation: 'When a batsman hits a six, the ball follows a parabolic path — that\'s a quadratic equation in action! The peak height and landing distance are both calculated using ax² + bx + c.', emoji: '🏏' },
        { id: 'samosa', analogy: 'Samosa Business Profit', explanation: 'If making samosas costs ₹x² per batch but you sell at ₹10x, your profit equation is quadratic. Find the sweet spot (vertex) to maximize profit!', emoji: '🔺' },
      ],
      memes: [
        { id: 'm1', text: 'Teacher: "Factorize this quadratic"\nMe: *uses the formula every single time*\nTeacher: 😤', context: 'The formula is a lifesaver when factoring gets hard' },
        { id: 'm2', text: 'Discriminant < 0\nRoots: imaginary\nMe: just like my social life 😭', context: 'When math gets too relatable' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Quadratic Equations', to: 'Projectile Motion', insight: 'Every thrown ball, launched rocket, or jumping frog follows a quadratic path. Physics literally runs on parabolas.' },
        { id: 'c2', from: 'Parabola', to: 'Satellite Dishes', insight: 'Satellite dishes are parabolic because a parabola focuses all parallel signals to one point — the receiver. Math shapes your TV signal!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'If sum of coefficients (a+b+c) = 0, then x=1 is always a root. Quick check before heavy calculation!', category: 'SHORTCUT' },
        { id: 't2', tip: 'Product of roots = c/a, Sum of roots = -b/a. These two facts solve 50% of board exam quadratic questions.', category: 'EXAM' },
      ],
    },
    sections: [
      { id: 'why-curves', title: 'Why Everything Curves', type: 'story', order: 1 },
      { id: 'formula', title: 'The Quadratic Formula', type: 'deep-dive', order: 2 },
      { id: 'discriminant', title: 'The Discriminant — Root Detective', type: 'zing-moment', order: 3 },
      { id: 'real-world', title: 'Quadratics in Real Life', type: 'application', order: 4 },
    ],
    mood: { 'why-curves': 'discovery', formula: 'neutral', discriminant: 'achievement', 'real-world': 'discovery' },
  },
  {
    slug: 'trigonometry-basics',
    title: 'Trigonometry — Sin, Cos, Tan Decoded',
    subtitle: 'The triangle math that runs the world',
    quickShotSummary: 'Trigonometry studies relationships between angles and sides. sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent. These ratios help calculate heights, distances, and wave patterns.',
    description: 'From measuring temple heights to designing sound waves — trigonometry is the bridge between angles and the real world.',
    universe: 'SCHOLAR',
    subWorld: 'math',
    difficulty: 'BEGINNER',
    readTimeMinutes: 10,
    tags: ['trigonometry', 'mathematics', 'angles', 'sine', 'cosine'],
    examTags: ['CBSE-10', 'JEE-MAINS', 'NEET'],
    sources: ['https://ncert.nic.in/textbook/pdf/jemh108.pdf'],
    content: {
      summary: 'Trigonometry studies angle-side relationships in triangles. Three core ratios: sin, cos, tan.',
      keyFacts: [
        'Aryabhatta defined sine (jya) in the 5th century CE',
        'sin²θ + cos²θ = 1 is the most important identity',
        'Used in music, architecture, GPS, and game physics',
        'All periodic waves (sound, light, AC current) use trig functions',
      ],
      desiAnalogies: [
        { id: 'qutub', analogy: 'Measuring Qutub Minar', explanation: 'Stand 50m away, measure the angle of elevation (60°). tan 60° = height/50. Height = 50 × √3 ≈ 86m. You just measured India\'s tallest minaret with a protractor!', emoji: '🕌' },
        { id: 'ferris', analogy: 'Giant Wheel at Mela', explanation: 'Your height on a ferris wheel follows a sine wave — goes up, peaks, comes down, repeats. sin θ literally traces your ride path!', emoji: '🎡' },
      ],
      memes: [
        { id: 'm1', text: 'Some People Have\nCurly Brown Hair\nThrough Proper Brushing\n(SOH-CAH-TOA mnemonic) 🧠', context: 'Everyone has their own way to remember trig ratios' },
        { id: 'm2', text: 'Teacher: "What is sin 90°?"\nMe: "1"\nTeacher: "Prove it"\nMe: *draws the entire unit circle* 😤', context: 'When you know the answer but the proof takes forever' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Trigonometry', to: 'Music & Sound', insight: 'Every musical note is a sine wave. When you tune a guitar, you\'re adjusting the frequency of trigonometric functions. Math literally makes music!' },
        { id: 'c2', from: 'Sine Function', to: 'AC Electricity', insight: 'The electricity in your home follows a sine wave pattern — that\'s why it\'s called AC (alternating current). Trig powers your fan!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'sin 0°=0, sin 30°=½, sin 45°=1/√2, sin 60°=√3/2, sin 90°=1. Pattern: √0/2, √1/2, √2/2, √3/2, √4/2.', category: 'SHORTCUT' },
        { id: 't2', tip: 'For complementary angles: sin(90°-θ) = cos θ. This single fact converts between sin and cos instantly.', category: 'EXAM' },
      ],
    },
    sections: [
      { id: 'origins', title: 'Aryabhatta\'s Gift to the World', type: 'story', order: 1 },
      { id: 'ratios', title: 'The Three Sacred Ratios', type: 'deep-dive', order: 2 },
      { id: 'unit-circle', title: 'The Unit Circle Revelation', type: 'zing-moment', order: 3 },
      { id: 'waves', title: 'Trig in Sound, Light, and Electricity', type: 'application', order: 4 },
    ],
    mood: { origins: 'discovery', ratios: 'neutral', 'unit-circle': 'achievement', waves: 'discovery' },
  },
  {
    slug: 'newtons-laws-of-motion',
    title: 'Newton\'s Laws of Motion',
    subtitle: 'Three laws that explain why everything moves',
    quickShotSummary: 'Law 1: Objects stay at rest or in motion unless acted upon (inertia). Law 2: F = ma (force equals mass times acceleration). Law 3: Every action has an equal and opposite reaction.',
    description: 'An apple fell, and Newton changed physics forever. Three simple laws that explain everything from car crashes to rocket launches.',
    universe: 'SCHOLAR',
    subWorld: 'science',
    difficulty: 'BEGINNER',
    readTimeMinutes: 10,
    tags: ['physics', 'newton', 'motion', 'forces', 'mechanics'],
    examTags: ['CBSE-9', 'CBSE-11', 'JEE-MAINS', 'NEET'],
    sources: ['https://ncert.nic.in/textbook/pdf/iesc109.pdf'],
    content: {
      summary: 'Three laws: Inertia, F=ma, Action-Reaction. They govern all classical motion.',
      keyFacts: [
        'Published in 1687 in Principia Mathematica',
        'F = ma is the most used equation in engineering',
        'Rockets work because of the third law',
        'These laws break down at very high speeds (need relativity)',
      ],
      desiAnalogies: [
        { id: 'auto', analogy: 'Auto-Rickshaw Physics', explanation: 'Law 1: You lean forward when auto brakes suddenly (inertia). Law 2: Heavier auto needs more force to accelerate. Law 3: Auto pushes road backward, road pushes auto forward. Physics on every Indian road!', emoji: '🛺' },
        { id: 'carrom', analogy: 'Carrom Board Striker', explanation: 'Striker hits coin (action), coin moves (reaction). Heavier striker = more force (F=ma). A coin at rest stays until you hit it (inertia). Three laws in one carrom shot!', emoji: '🎯' },
      ],
      memes: [
        { id: 'm1', text: 'Apple: *falls on Newton*\nNewton: "Gravity! F=ma! Three laws!"\nApple falling on me: *just a bruise and anger* 🍎😠', context: 'Not everyone gets inspired by falling fruit' },
        { id: 'm2', text: 'Newton\'s 4th law (unofficial):\n"Every student at rest wants to remain at rest until the exam applies an external force" 📚', context: 'Inertia applies to studying too' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Newton\'s Laws', to: 'Rocket Science', insight: 'ISRO\'s rockets work entirely on Newton\'s Third Law — hot gases push down, rocket pushes up. India\'s Mangalyaan reached Mars on 17th-century physics!' },
        { id: 'c2', from: 'F = ma', to: 'Car Safety', insight: 'Seatbelts and airbags are designed using F=ma. They increase the time of deceleration, reducing the force on your body during a crash.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'JEE trick: Free Body Diagrams (FBD) solve 80% of mechanics problems. Draw ALL forces on the object before writing equations.', category: 'EXAM' },
        { id: 't2', tip: 'Action-reaction pairs act on DIFFERENT objects. This is the #1 misconception — they never cancel each other out.', category: 'MISCONCEPTION' },
      ],
    },
    sections: [
      { id: 'apple', title: 'The Apple That Changed Everything', type: 'story', order: 1 },
      { id: 'three-laws', title: 'The Three Laws Deep Dive', type: 'deep-dive', order: 2 },
      { id: 'fma', title: 'F = ma — The Most Powerful Equation', type: 'zing-moment', order: 3 },
      { id: 'rockets', title: 'From Carrom to Rockets', type: 'application', order: 4 },
    ],
    mood: { apple: 'discovery', 'three-laws': 'neutral', fma: 'achievement', rockets: 'discovery' },
  },
  {
    slug: 'periodic-table-explained',
    title: 'The Periodic Table — Decoded',
    subtitle: 'The cheat sheet of the universe',
    quickShotSummary: 'The periodic table organizes 118 elements by atomic number. Rows (periods) show energy levels, columns (groups) show similar chemical properties. Mendeleev predicted undiscovered elements using this pattern.',
    description: 'Every substance in the universe is made from just 118 elements arranged in one genius table. Understand the logic behind the most important chart in science.',
    universe: 'SCHOLAR',
    subWorld: 'science',
    difficulty: 'BEGINNER',
    readTimeMinutes: 11,
    tags: ['chemistry', 'periodic-table', 'elements', 'mendeleev', 'atoms'],
    examTags: ['CBSE-10', 'CBSE-11', 'JEE-MAINS', 'NEET'],
    sources: ['https://ncert.nic.in/textbook/pdf/jesc105.pdf'],
    content: {
      summary: '118 elements organized by atomic number. Groups share properties, periods show energy levels.',
      keyFacts: [
        'Mendeleev left gaps for undiscovered elements — and was right',
        'Hydrogen is the most abundant element in the universe',
        'Noble gases (Group 18) almost never react with anything',
        'India contributed to discovering element 118 (Oganesson)',
      ],
      desiAnalogies: [
        { id: 'hostel', analogy: 'College Hostel Arrangement', explanation: 'The periodic table is like a hostel — each floor (period) has more rooms (electrons). Students in the same column (group) have similar habits (properties). Noble gases are the introverts who never interact!', emoji: '🏢' },
        { id: 'thali', analogy: 'Elements Thali', explanation: 'Metals are the dal and rice (bulk, essential). Non-metals are the spicy chutneys (reactive, flavorful). Noble gases are the papad — present but doesn\'t mix with anyone!', emoji: '🍽️' },
      ],
      memes: [
        { id: 'm1', text: 'Mendeleev: *predicts 3 undiscovered elements*\nElements: *get discovered exactly as predicted*\nChemistry class: "THIS GUY IS THE OG" 🔮', context: 'Mendeleev was basically a chemistry prophet' },
        { id: 'm2', text: 'Noble gases at the party:\n*standing in the corner*\n*not reacting with anyone*\n"We have a full octet, we don\'t need friends" 😎', context: 'Noble gases are the ultimate introverts' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Periodic Table', to: 'Stars', insight: 'Stars are element factories — hydrogen fuses to helium, then carbon, oxygen... all the way to iron. Every element heavier than iron was made in a supernova explosion!' },
        { id: 'c2', from: 'Alkali Metals', to: 'Diwali', insight: 'The yellow flame in Diwali sparklers? That\'s sodium (Na). The purple? Potassium (K). Firework chemistry runs on Group 1 elements!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Mnemonic for Period 3: NaMgAl SiPS ClAr = "Nana Maggi Al(ways) Sips ClarA." Sodium to Argon memorized!', category: 'SHORTCUT' },
        { id: 't2', tip: 'Electronegativity increases right and up. Francium (bottom-left) is least electronegative. Fluorine (top-right) is most. Remember the "upstairs neighbor" rule.', category: 'EXAM' },
      ],
    },
    sections: [
      { id: 'mendeleev', title: 'Mendeleev\'s Bold Gamble', type: 'story', order: 1 },
      { id: 'structure', title: 'Reading the Table Like a Pro', type: 'deep-dive', order: 2 },
      { id: 'patterns', title: 'The Hidden Patterns', type: 'zing-moment', order: 3 },
      { id: 'india', title: 'India\'s Elements Story', type: 'india-connection', order: 4 },
    ],
    mood: { mendeleev: 'discovery', structure: 'neutral', patterns: 'achievement', india: 'achievement' },
  },
  {
    slug: 'indian-constitution-basics',
    title: 'The Indian Constitution — Simplified',
    subtitle: 'The document that holds India together',
    quickShotSummary: 'The Indian Constitution is the world\'s longest written constitution with 448 articles, 25 parts, and 12 schedules. It was drafted by a committee led by Dr. B.R. Ambedkar and adopted on 26 January 1950.',
    description: 'From Fundamental Rights to Directive Principles — understand the document that defines India\'s democracy, explained without legal jargon.',
    universe: 'SCHOLAR',
    subWorld: 'social-studies',
    difficulty: 'BEGINNER',
    readTimeMinutes: 14,
    tags: ['constitution', 'india', 'civics', 'democracy', 'ambedkar'],
    examTags: ['CBSE-9', 'CBSE-10', 'UPSC-POLITY'],
    sources: ['https://legislative.gov.in/constitution-of-india/'],
    content: {
      summary: 'World\'s longest constitution. 448 articles, Fundamental Rights, DPSP, Federal structure with unitary bias.',
      keyFacts: [
        'Took 2 years, 11 months, 18 days to draft',
        'Borrowed features from 10+ constitutions worldwide',
        'Started handwritten by Prem Behari Narain Raizada',
        'The Preamble was the last part to be drafted',
      ],
      desiAnalogies: [
        { id: 'rules', analogy: 'Society Rules Book', explanation: 'The Constitution is India\'s society "rules book" — Fundamental Rights are the resident privileges, DPSP are the committee\'s goals, and Amendments are the AGM resolutions that update the rules.', emoji: '📜' },
        { id: 'os', analogy: 'India\'s Operating System', explanation: 'If India were a computer, the Constitution is its OS. Parliament is the application layer, courts are the antivirus (judicial review), and amendments are software updates!', emoji: '💻' },
      ],
      memes: [
        { id: 'm1', text: 'World: "Our constitution has 7 articles"\nIndia: "Hold my 448 articles and 12 schedules" 💪', context: 'India doesn\'t do anything small' },
        { id: 'm2', text: 'Article 21: Right to Life\nAlso me: *surviving on Maggi during exams*\nI\'m exercising my fundamental right 🍜', context: 'Article 21 is the most invoked fundamental right' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Indian Constitution', to: 'Arthashastra', insight: 'Chanakya\'s Saptanga theory (7 organs of state) influenced the constitutional structure: Legislature, Executive, Judiciary echo his raj, amatya, and nyaya concepts.' },
        { id: 'c2', from: 'Fundamental Rights', to: 'UPSC Preparation', insight: 'Articles 12-35 (Fundamental Rights) appear in every UPSC Prelims paper. Memorize articles 14, 19, 21, 32 — they cover 80% of polity questions.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Remember Part III (FR) vs Part IV (DPSP): FR = enforceable in court, DPSP = not enforceable but fundamental to governance. Both are important for exams.', category: 'EXAM' },
        { id: 't2', tip: 'Article 32 (Right to Constitutional Remedies) was called the "heart and soul of the Constitution" by Dr. Ambedkar himself. Quote this in essays!', category: 'ESSAY' },
      ],
    },
    sections: [
      { id: 'making', title: 'The Making of the Constitution', type: 'story', order: 1 },
      { id: 'structure', title: 'Parts, Articles, Schedules', type: 'deep-dive', order: 2 },
      { id: 'rights', title: 'Your Fundamental Rights', type: 'zing-moment', order: 3 },
      { id: 'ambedkar', title: 'Ambedkar\'s Vision', type: 'india-connection', order: 4 },
    ],
    mood: { making: 'discovery', structure: 'neutral', rights: 'achievement', ambedkar: 'philosophy' },
  },
  {
    slug: 'cell-biology-basics',
    title: 'The Cell — Building Block of Life',
    subtitle: 'A factory smaller than a grain of sand',
    quickShotSummary: 'The cell is the smallest unit of life. Plant cells have cell walls and chloroplasts; animal cells don\'t. Key organelles: nucleus (control center), mitochondria (powerhouse), ribosomes (protein factories).',
    description: 'Your body has 37 trillion cells, each running its own mini-factory. Explore the incredible micro-world that makes life possible.',
    universe: 'SCHOLAR',
    subWorld: 'science',
    difficulty: 'BEGINNER',
    readTimeMinutes: 9,
    tags: ['biology', 'cell', 'organelles', 'mitochondria', 'nucleus'],
    examTags: ['CBSE-9', 'CBSE-11', 'NEET'],
    sources: ['https://ncert.nic.in/textbook/pdf/iesc105.pdf'],
    content: {
      summary: 'The cell is the fundamental unit of life. Prokaryotes lack a nucleus; eukaryotes have membrane-bound organelles.',
      keyFacts: [
        'The human body has ~37 trillion cells',
        'Red blood cells have no nucleus',
        'Mitochondria have their own DNA (maternal inheritance)',
        'Robert Hooke discovered cells in 1665 using cork',
      ],
      desiAnalogies: [
        { id: 'factory', analogy: 'Saree Factory', explanation: 'A cell is like a Surat saree factory — nucleus is the owner\'s office (instructions), ribosomes are the looms (making products), golgi is the packing department, and the cell membrane is the factory gate with a guard.', emoji: '🏭' },
        { id: 'kitchen', analogy: 'Mitochondria = Maa Ka Kitchen', explanation: 'Mitochondria produce energy (ATP) for the cell, just like Mom\'s kitchen produces energy (food) for the family. Both are the "powerhouse" — one of the cell, one of the home!', emoji: '👩‍🍳' },
      ],
      memes: [
        { id: 'm1', text: '"The mitochondria is the powerhouse of the cell"\nThe only biology fact that survives after school 💪🧬', context: 'The most remembered biology fact of all time' },
        { id: 'm2', text: 'Animal cell: *no cell wall*\nPlant cell: *has cell wall, chloroplasts, vacuole*\nPlant cell is basically the upgraded premium version 🌿✨', context: 'Plant cells have more features than animal cells' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Cell Biology', to: 'Photosynthesis', insight: 'Photosynthesis happens inside chloroplasts — organelles found ONLY in plant cells. No chloroplasts, no photosynthesis, no oxygen, no us.' },
        { id: 'c2', from: 'Mitochondrial DNA', to: 'Human Migration', insight: 'Mitochondrial DNA passes only through mothers. Scientists trace human migration patterns across India using mtDNA — your maternal lineage tells the story of ancient migration!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'NEET trick: "Plants have CWCV that animals don\'t" — Cell Wall, Chloroplasts, large central Vacuole. Everything else is shared.', category: 'EXAM' },
        { id: 't2', tip: 'Draw and label the cell diagram 10 times. NEET frequently asks diagram-based questions about cell organelles.', category: 'PRACTICE' },
      ],
    },
    sections: [
      { id: 'discovery', title: 'How Cells Were Discovered', type: 'story', order: 1 },
      { id: 'organelles', title: 'The Organelle Tour', type: 'deep-dive', order: 2 },
      { id: 'powerhouse', title: 'The Mitochondria Truth', type: 'zing-moment', order: 3 },
      { id: 'plant-animal', title: 'Plant vs Animal Cell', type: 'comparison', order: 4 },
    ],
    mood: { discovery: 'discovery', organelles: 'neutral', powerhouse: 'achievement', 'plant-animal': 'neutral' },
  },
  {
    slug: 'french-revolution-explained',
    title: 'The French Revolution',
    subtitle: 'When bread became more expensive than liberty',
    quickShotSummary: 'The French Revolution (1789-1799) overthrew the monarchy. Caused by inequality, bread shortage, and Enlightenment ideas. Key events: Storming of Bastille, Declaration of Rights, Reign of Terror, Rise of Napoleon.',
    description: 'How bread prices, angry peasants, and revolutionary ideas toppled a 1,000-year-old monarchy — and why it still shapes modern democracy.',
    universe: 'SCHOLAR',
    subWorld: 'social-studies',
    difficulty: 'BEGINNER',
    readTimeMinutes: 12,
    tags: ['history', 'french-revolution', 'democracy', 'europe', 'liberty'],
    examTags: ['CBSE-9', 'UPSC-HISTORY'],
    sources: ['https://ncert.nic.in/textbook/pdf/iess201.pdf'],
    content: {
      summary: 'The French Revolution overthrew monarchy, established republic, introduced liberty-equality-fraternity as political ideals.',
      keyFacts: [
        'Marie Antoinette never actually said "Let them eat cake"',
        'The guillotine was considered a "humane" execution method',
        'The Revolution inspired movements worldwide, including in India',
        'Napoleon emerged from the chaos and crowned himself Emperor',
      ],
      desiAnalogies: [
        { id: 'onion', analogy: 'Onion Price Riots', explanation: 'Just like rising bread prices triggered the French Revolution, onion price spikes in India have toppled governments. When food becomes unaffordable, no government is safe — 1789 France or 2010s India!', emoji: '🧅' },
        { id: 'caste', analogy: 'Three Estates = Caste System', explanation: 'France had three estates: clergy (Brahmins), nobility (Kshatriyas), and commoners (everyone else paying taxes). The revolution was when the "third estate" said enough — parallels to India\'s social movements.', emoji: '⚖️' },
      ],
      memes: [
        { id: 'm1', text: 'French peasants in 1789:\n"We have no bread"\nLouis XVI: "That\'s rough buddy"\n*Bastille gets stormed* 🏰', context: 'When the king ignores hunger, revolution happens' },
        { id: 'm2', text: 'Liberty, Equality, Fraternity!\n*proceeds to have Reign of Terror*\nRevolution: "We\'re still figuring out the equality part" 😬', context: 'The revolution got messy before it got better' },
      ],
      zingConnections: [
        { id: 'c1', from: 'French Revolution', to: 'Indian Constitution', insight: 'Liberty, Equality, Fraternity — the French Revolution\'s motto appears in India\'s Preamble. The French gave us the words, Ambedkar gave them Indian meaning.' },
        { id: 'c2', from: 'Third Estate', to: 'Indian Independence', insight: 'Just as France\'s Third Estate revolted against unfair taxes, India\'s freedom movement fought against exploitative British taxation. Same pattern, different empires.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Timeline trick: 1789 (Bastille) → 1791 (Constitution) → 1793 (Terror) → 1799 (Napoleon). Four dates cover 90% of exam questions.', category: 'EXAM' },
        { id: 't2', tip: 'Compare French Revolution with Indian independence movement for 5-mark essay questions. Examiners love cross-country comparisons.', category: 'ESSAY' },
      ],
    },
    sections: [
      { id: 'bread', title: 'The Bread Crisis', type: 'story', order: 1 },
      { id: 'causes', title: 'Causes — Inequality, Ideas, Hunger', type: 'deep-dive', order: 2 },
      { id: 'bastille', title: 'Storming the Bastille', type: 'zing-moment', order: 3 },
      { id: 'aftermath', title: 'From Terror to Napoleon', type: 'comparison', order: 4 },
    ],
    mood: { bread: 'war', causes: 'neutral', bastille: 'war', aftermath: 'philosophy' },
  },
  {
    slug: 'acids-bases-salts',
    title: 'Acids, Bases & Salts',
    subtitle: 'The chemistry you eat, drink, and clean with',
    quickShotSummary: 'Acids donate H⁺ ions (pH < 7), bases donate OH⁻ ions (pH > 7). When acid + base react, they form salt + water (neutralization). pH scale measures acidity: 0 (most acidic) to 14 (most basic).',
    description: 'From lemon juice to soap — acids and bases are in every meal, every cleaning product, and every cell of your body.',
    universe: 'SCHOLAR',
    subWorld: 'science',
    difficulty: 'BEGINNER',
    readTimeMinutes: 9,
    tags: ['chemistry', 'acids', 'bases', 'pH', 'neutralization'],
    examTags: ['CBSE-10', 'NEET', 'JEE-MAINS'],
    sources: ['https://ncert.nic.in/textbook/pdf/jesc102.pdf'],
    content: {
      summary: 'Acids donate H⁺, bases donate OH⁻. pH scale 0-14. Neutralization: acid + base → salt + water.',
      keyFacts: [
        'Human blood pH is maintained at exactly 7.35-7.45',
        'Stomach acid (HCl) has pH 1.5-2 — strong enough to dissolve metal',
        'Bee sting is acidic (use baking soda), wasp sting is basic (use vinegar)',
        'Litmus paper was the first pH indicator, discovered from lichens',
      ],
      desiAnalogies: [
        { id: 'nimbu', analogy: 'Nimbu Paani pH', explanation: 'Nimbu (lemon) juice is acidic (pH 2). That sour taste? That\'s citric acid hitting your tongue. Add sugar and salt — you\'re doing a mini chemistry experiment with every glass of nimbu paani!', emoji: '🍋' },
        { id: 'antacid', analogy: 'ENO After Biryani', explanation: 'Eating too much biryani → excess stomach acid → acidity. ENO (sodium bicarbonate, a base) neutralizes the acid. Acid + Base = Salt + Water + Relief. Chemistry saves your stomach!', emoji: '💊' },
      ],
      memes: [
        { id: 'm1', text: 'pH 7: I\'m neutral\npH 1: I\'ll dissolve your spoon\npH 14: I\'ll dissolve your skin\npH 7: "I just want peace" ☮️', context: 'Neutral pH is the Switzerland of chemistry' },
        { id: 'm2', text: 'Me after eating too much street food:\n*reaches for ENO*\nENO: neutralization reaction go brrr 🧪', context: 'Every Indian stomach has experienced neutralization therapy' },
      ],
      zingConnections: [
        { id: 'c1', from: 'pH Scale', to: 'Human Body', insight: 'Your blood maintains pH 7.4 constantly. Even a 0.2 change can be fatal. Your body runs 24/7 acid-base buffering — chemistry keeping you alive!' },
        { id: 'c2', from: 'Acid Rain', to: 'Indian Monsoon', insight: 'Industrial pollution + monsoon rain = acid rain (pH < 5.6). The Taj Mahal\'s marble is corroding because of acid rain from Mathura refineries. Chemistry meets geography!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'pH = -log[H⁺]. If [H⁺] = 10⁻³, pH = 3. Just flip the exponent sign! Works for all board exam calculations.', category: 'SHORTCUT' },
        { id: 't2', tip: 'Strong acids: HCl, H₂SO₄, HNO₃. Strong bases: NaOH, KOH. Everything else is weak. This covers 90% of exam questions.', category: 'EXAM' },
      ],
    },
    sections: [
      { id: 'taste', title: 'Why Lemons Are Sour', type: 'story', order: 1 },
      { id: 'theory', title: 'The pH Scale Explained', type: 'deep-dive', order: 2 },
      { id: 'neutral', title: 'Neutralization — The Great Balance', type: 'zing-moment', order: 3 },
      { id: 'daily', title: 'Acids & Bases in Daily Life', type: 'application', order: 4 },
    ],
    mood: { taste: 'discovery', theory: 'neutral', neutral: 'achievement', daily: 'discovery' },
  },
  {
    slug: 'english-grammar-tenses',
    title: 'Master All 12 Tenses in English',
    subtitle: 'Past, present, future — and all their variations',
    quickShotSummary: 'English has 12 tenses: 4 types (simple, continuous, perfect, perfect continuous) × 3 times (past, present, future). Each has a specific structure and use case.',
    description: 'Tenses are the backbone of English grammar. Once you see the 4×3 grid, everything clicks — no more confusion between "has been" and "had been".',
    universe: 'SCHOLAR',
    subWorld: 'languages',
    difficulty: 'BEGINNER',
    readTimeMinutes: 10,
    tags: ['english', 'grammar', 'tenses', 'language', 'writing'],
    examTags: ['CBSE-10', 'IELTS', 'CAT-VARC'],
    sources: ['https://www.grammarly.com/blog/verb-tenses/'],
    content: {
      summary: '12 tenses in a 4×3 grid: Simple/Continuous/Perfect/PerfectContinuous × Past/Present/Future.',
      keyFacts: [
        'Simple Present and Simple Past cover 80% of daily conversation',
        'Present Perfect is the most confusing for Indian English speakers',
        'Future tenses use will/shall/going to',
        'The 4×3 grid pattern makes all 12 tenses logical',
      ],
      desiAnalogies: [
        { id: 'chai-time', analogy: 'Chai Timeline', explanation: 'Simple Past: "I drank chai." Present Continuous: "I am drinking chai." Present Perfect: "I have drunk 3 cups." Future: "I will drink more." Your chai habit covers all tenses!', emoji: '☕' },
        { id: 'cricket-time', analogy: 'Cricket Match Commentary', explanation: '"Kohli hits (simple present)! He has been batting (present perfect continuous) for 3 hours! India had won (past perfect) the last match. They will dominate (future)!"', emoji: '🏏' },
      ],
      memes: [
        { id: 'm1', text: 'Me: "I have went to the market"\nEnglish teacher: 💀\nCorrect: "I have GONE to the market"\nPast participle is not = past tense!', context: 'The most common tense mistake in Indian English' },
        { id: 'm2', text: 'Present Perfect vs Simple Past:\n"I have eaten" (relevant now)\n"I ate" (done and dusted)\nMe: "I eated" ❌😅', context: 'English tenses have too many irregular forms' },
      ],
      zingConnections: [
        { id: 'c1', from: 'English Tenses', to: 'Coding Logic', insight: 'Tenses are like programming states: Past (completed), Present (executing), Future (scheduled). Understanding tenses = understanding state management!' },
        { id: 'c2', from: 'Grammar', to: 'UPSC Essay', insight: 'UPSC Essay paper marks depend heavily on grammar. Correct tense usage alone can boost your essay score by 20-30 marks.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Draw the 4×3 grid on paper. Fill in ONE example sentence per cell. Review daily for a week. The pattern becomes automatic.', category: 'PRACTICE' },
        { id: 't2', tip: 'Signal words: "yesterday/ago" = past, "now/currently" = present continuous, "since/for" = perfect, "already" = present perfect.', category: 'SHORTCUT' },
      ],
    },
    sections: [
      { id: 'grid', title: 'The 4×3 Tense Grid', type: 'deep-dive', order: 1 },
      { id: 'mistakes', title: 'Common Indian English Tense Mistakes', type: 'story', order: 2 },
      { id: 'click', title: 'When the Pattern Clicks', type: 'zing-moment', order: 3 },
      { id: 'practice', title: 'Practice Sentences', type: 'hands-on', order: 4 },
    ],
    mood: { grid: 'neutral', mistakes: 'discovery', click: 'achievement', practice: 'neutral' },
  },
  {
    slug: 'cbse-board-exam-strategy',
    title: 'CBSE Board Exam — The Complete Strategy',
    subtitle: 'Score 90+ without burning out',
    quickShotSummary: 'Focus on NCERT (80% of questions come from there), solve last 10 years papers, master time management (3 hours = 180 marks = 1 mark per minute), and start revision 2 months before exams.',
    description: 'The honest strategy for CBSE Board exams — from study planning to exam-day tips. Based on what toppers actually did, not what coaching institutes sell.',
    universe: 'SCHOLAR',
    subWorld: 'board-exams',
    difficulty: 'BEGINNER',
    readTimeMinutes: 15,
    tags: ['cbse', 'board-exams', 'class-10', 'class-12', 'exam-strategy'],
    examTags: ['CBSE-10', 'CBSE-12'],
    sources: ['https://cbse.gov.in/'],
    content: {
      summary: 'NCERT is the Bible. Previous year papers are the practice tests. Time management is the real skill. Start revision 2 months early.',
      keyFacts: [
        '80% of board exam questions come directly from NCERT',
        'Solving 10 years of previous papers covers almost all question types',
        'Presentation and neat handwriting can boost marks by 5-10%',
        'Attempting all questions is more important than perfecting a few',
      ],
      desiAnalogies: [
        { id: 'cricket-match', analogy: 'ODI Cricket Strategy', explanation: 'Board exams are like an ODI — you have 50 overs (3 hours). Don\'t try to hit every ball for six (tough questions). Rotate strike (attempt all), play big shots on easy questions, and don\'t get out (silly mistakes)!', emoji: '🏏' },
        { id: 'thali-strategy', analogy: 'Exam Thali', explanation: 'Easy questions = dal rice (eat first, fills you up). Medium = sabzi (takes time but worth it). Hard = dessert (attempt last). Never start with the gulab jamun!', emoji: '🍽️' },
      ],
      memes: [
        { id: 'm1', text: 'CBSE: "This year\'s paper will be easy"\nThe paper: *makes students question their existence*\nCBSE: 🤡', context: 'The annual CBSE surprise is a national tradition' },
        { id: 'm2', text: 'Me: *opens NCERT at midnight before exam*\nNCERT: "I have 300 pages"\nMe: "Speed-reading activated" 🏃💨', context: 'Last-minute NCERT cramming is a universal experience' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Board Exam Strategy', to: 'Time Management', insight: 'The 1-mark-per-minute rule applies everywhere — CBSE, JEE, NEET, UPSC. Master time allocation once, apply it to every exam in your life.' },
        { id: 'c2', from: 'NCERT Mastery', to: 'UPSC Foundation', insight: 'UPSC toppers say "start with NCERT Class 6-12." If you master NCERT for boards, you\'ve already built 40% of your UPSC foundation. Two birds, one stone!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The 3-2-1 revision method: Read chapter 3 times, make notes 2 times, solve questions 1 time. Works for every subject.', category: 'STRATEGY' },
        { id: 't2', tip: 'On exam day: read the paper for 15 minutes, attempt EASY questions first, then MEDIUM, then HARD. Never get stuck on one question for more than 5 minutes.', category: 'EXAM-DAY' },
      ],
    },
    sections: [
      { id: 'reality', title: 'The Board Exam Reality', type: 'story', order: 1 },
      { id: 'plan', title: 'The 60-Day Battle Plan', type: 'deep-dive', order: 2 },
      { id: 'ncert', title: 'NCERT — Your Only True Friend', type: 'zing-moment', order: 3 },
      { id: 'exam-day', title: 'Exam Day Survival Guide', type: 'resources', order: 4 },
    ],
    mood: { reality: 'war', plan: 'neutral', ncert: 'achievement', 'exam-day': 'war' },
  },
  {
    slug: 'linear-equations-two-variables',
    title: 'Linear Equations in Two Variables',
    subtitle: 'Two unknowns, two equations, one solution',
    quickShotSummary: 'A linear equation in two variables (ax + by = c) represents a straight line on a graph. Two such equations can have one solution (intersecting), no solution (parallel), or infinite solutions (same line).',
    description: 'Where two lines meet on a graph — that\'s your answer. Master graphical and algebraic methods to solve simultaneous equations.',
    universe: 'SCHOLAR',
    subWorld: 'math',
    difficulty: 'BEGINNER',
    readTimeMinutes: 8,
    tags: ['mathematics', 'algebra', 'linear-equations', 'graphs', 'simultaneous'],
    examTags: ['CBSE-10', 'ICSE-10'],
    sources: ['https://ncert.nic.in/textbook/pdf/jemh103.pdf'],
    content: {
      summary: 'Pair of linear equations: substitution, elimination, or graphical method. Check a₁/a₂ ratios to predict solution type.',
      keyFacts: [
        'Two methods: substitution and elimination (plus graphical)',
        'a₁/a₂ ≠ b₁/b₂ → unique solution (lines intersect)',
        'a₁/a₂ = b₁/b₂ ≠ c₁/c₂ → no solution (parallel lines)',
        'a₁/a₂ = b₁/b₂ = c₁/c₂ → infinite solutions (same line)',
      ],
      desiAnalogies: [
        { id: 'train', analogy: 'Two Trains Problem', explanation: 'Train A goes Mumbai→Delhi at 60 km/h, Train B goes Delhi→Mumbai at 80 km/h. Where do they meet? Two equations, two unknowns (distance and time). Linear equations solve "when do meetings happen?"', emoji: '🚂' },
        { id: 'budget', analogy: 'Mobile Recharge Plans', explanation: 'Jio: ₹x per GB + ₹y per call. Airtel: ₹a per GB + ₹b per call. At what usage do both cost the same? That intersection point = your best plan!', emoji: '📱' },
      ],
      memes: [
        { id: 'm1', text: 'Substitution method: "Replace x with this expression"\nMe: *makes it more complicated*\nElimination method: "I\'ll save you" 🦸', context: 'Elimination is often easier than substitution' },
        { id: 'm2', text: 'Two parallel lines:\n"We have no solution"\nJust like my love life 📏😭', context: 'When lines never meet, there is no solution' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Linear Equations', to: 'Machine Learning', insight: 'Machine learning\'s core algorithm (linear regression) is literally solving linear equations to find the "best fit line." Your Class 10 math powers AI!' },
        { id: 'c2', from: 'Graphical Method', to: 'Economics', insight: 'Supply and demand curves are linear equations. Where they intersect = market price. Economics runs on the same graphs you drew in math class!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Quick ratio check: Compare a₁/a₂, b₁/b₂, c₁/c₂ FIRST. Takes 10 seconds and tells you the answer type before solving!', category: 'SHORTCUT' },
        { id: 't2', tip: 'For word problems: assign x and y to unknowns, write two equations from the conditions, then solve. The hardest part is writing the equations, not solving them.', category: 'STRATEGY' },
      ],
    },
    sections: [
      { id: 'meet', title: 'Where Two Lines Meet', type: 'story', order: 1 },
      { id: 'methods', title: 'Three Methods to Solve', type: 'deep-dive', order: 2 },
      { id: 'ratio', title: 'The Ratio Shortcut', type: 'zing-moment', order: 3 },
      { id: 'word-problems', title: 'Cracking Word Problems', type: 'hands-on', order: 4 },
    ],
    mood: { meet: 'discovery', methods: 'neutral', ratio: 'achievement', 'word-problems': 'neutral' },
  },
  {
    slug: 'electricity-fundamentals',
    title: 'Electricity — Ohm\'s Law & Circuits',
    subtitle: 'V = IR and the world lights up',
    quickShotSummary: 'Electric current (I) is the flow of electrons. Voltage (V) is the push. Resistance (R) opposes flow. Ohm\'s Law: V = IR. Series circuits share current; parallel circuits share voltage.',
    description: 'From phone chargers to power grids — understand how electricity flows, why fuses blow, and what actually happens when you flip a switch.',
    universe: 'SCHOLAR',
    subWorld: 'science',
    difficulty: 'BEGINNER',
    readTimeMinutes: 11,
    tags: ['physics', 'electricity', 'ohms-law', 'circuits', 'current'],
    examTags: ['CBSE-10', 'CBSE-12', 'JEE-MAINS'],
    sources: ['https://ncert.nic.in/textbook/pdf/jesc112.pdf'],
    content: {
      summary: 'V = IR (Ohm\'s Law). Current = charge flow, Voltage = potential difference, Resistance = opposition. Series vs Parallel circuits.',
      keyFacts: [
        'Ohm\'s Law is the most used equation in electrical engineering',
        'In series: R_total = R₁ + R₂ + R₃',
        'In parallel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃',
        'India runs on 230V AC at 50 Hz (US uses 120V 60Hz)',
      ],
      desiAnalogies: [
        { id: 'water', analogy: 'Water Tank Analogy', explanation: 'Voltage = water pressure (height of tank). Current = flow rate (how much water flows). Resistance = pipe width (narrow pipe = more resistance). V=IR is just plumbing math!', emoji: '🚰' },
        { id: 'diwali', analogy: 'Diwali Lights — Series vs Parallel', explanation: 'Old Diwali lights (series): one bulb blows, all go dark. New LED strips (parallel): one fails, rest stay on. That\'s why parallel circuits are used in homes!', emoji: '💡' },
      ],
      memes: [
        { id: 'm1', text: 'V = IR\nI = V/R\nR = V/I\nThe holy triangle of physics that actually makes sense 📐⚡', context: 'Ohm\'s Law triangle is the most useful physics tool' },
        { id: 'm2', text: 'Me: *touches live wire*\nElectricity: "Ohm\'s law says I should flow through you"\nMy body (wet): *offers least resistance* 😱', context: 'Water reduces body resistance — making wet hands dangerous' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Ohm\'s Law', to: 'Phone Charging', insight: 'Fast chargers increase voltage (V↑) to push more current (I↑) through the same cable resistance. Your phone\'s fast charging is just V=IR engineering!' },
        { id: 'c2', from: 'Parallel Circuits', to: 'Home Wiring', insight: 'Every room outlet runs in parallel — that\'s why turning off the bedroom light doesn\'t shut off the kitchen. Your house is a giant parallel circuit!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Draw the VIR triangle: V on top, I and R at bottom. Cover what you want to find. V = I×R, I = V/R, R = V/I.', category: 'SHORTCUT' },
        { id: 't2', tip: 'For CBSE numericals: always write Given, Formula, Substitution, Answer. This 4-step format guarantees full marks even if the answer is wrong.', category: 'EXAM' },
      ],
    },
    sections: [
      { id: 'switch', title: 'What Happens When You Flip a Switch', type: 'story', order: 1 },
      { id: 'ohm', title: 'V = IR — The Holy Equation', type: 'deep-dive', order: 2 },
      { id: 'circuits', title: 'Series vs Parallel — The Diwali Test', type: 'zing-moment', order: 3 },
      { id: 'safety', title: 'Why Fuses Save Lives', type: 'application', order: 4 },
    ],
    mood: { switch: 'discovery', ohm: 'neutral', circuits: 'achievement', safety: 'neutral' },
  },
  {
    slug: 'democracy-and-diversity',
    title: 'Democracy & Diversity in India',
    subtitle: 'Unity in diversity — more than just a slogan',
    quickShotSummary: 'India\'s democracy manages diversity through federalism, secularism, and reservation policies. Social divisions (caste, religion, language) can strengthen democracy when they cross-cut rather than overlap.',
    description: 'How does the world\'s largest democracy manage 1.4 billion people with 22 official languages and hundreds of communities? The answer is in the design of the system.',
    universe: 'SCHOLAR',
    subWorld: 'social-studies',
    difficulty: 'BEGINNER',
    readTimeMinutes: 12,
    tags: ['democracy', 'diversity', 'india', 'federalism', 'social-studies'],
    examTags: ['CBSE-10', 'UPSC-POLITY'],
    sources: ['https://ncert.nic.in/textbook/pdf/jess203.pdf'],
    content: {
      summary: 'India manages diversity through federalism, constitutional provisions, and cross-cutting social divisions that prevent polarization.',
      keyFacts: [
        'India has 22 scheduled languages and 19,500+ dialects',
        'Federalism divides power between Centre and States',
        'Cross-cutting divisions prevent any single group from dominating',
        'Belgium\'s power-sharing model is compared with Sri Lanka in CBSE',
      ],
      desiAnalogies: [
        { id: 'cricket-team', analogy: 'Cricket Team India', explanation: 'The Indian cricket team has players from every state, religion, and language — Punjab\'s fast bowlers, Mumbai\'s batsmen, Chennai\'s spinners. Democracy works the same way — diverse strengths unite for one goal.', emoji: '🇮🇳' },
        { id: 'thali', analogy: 'Democracy Thali', explanation: 'Every state contributes a different dish to India\'s thali — Rajma from Punjab, Dosa from Tamil Nadu, Rosogolla from Bengal. Remove diversity, you get a boring thali. Same with democracy!', emoji: '🍽️' },
      ],
      memes: [
        { id: 'm1', text: 'India: 22 official languages\nEurope: struggles with 24\nIndia: "First time?" 🇮🇳😎', context: 'India manages more linguistic diversity than the entire EU' },
        { id: 'm2', text: 'CBSE: "Compare Belgium and Sri Lanka"\nEvery Class 10 student: *copies the same 5 points since 2006* 📝', context: 'The Belgium-Sri Lanka comparison is the most asked question' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Indian Democracy', to: 'Indian Constitution', insight: 'The Constitution\'s federal structure (List system: Union, State, Concurrent) is how India manages diversity. Without it, 28 states couldn\'t coexist peacefully.' },
        { id: 'c2', from: 'Diversity', to: 'Indian Monsoon', insight: 'India\'s geographic diversity (deserts, mountains, coasts) is why the monsoon affects regions differently — and why federalism lets local governments respond to local needs.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Belgium model: Community government + federal structure. Sri Lanka: Majoritarianism = civil war. This comparison is worth 5 marks every year.', category: 'EXAM' },
        { id: 't2', tip: 'Cross-cutting vs Overlapping divisions: If caste, class, and region all align → conflict. If they cross-cut (rich and poor in every caste) → stability. This concept explains India!', category: 'CONCEPT' },
      ],
    },
    sections: [
      { id: 'diverse', title: 'The Most Diverse Democracy', type: 'story', order: 1 },
      { id: 'manage', title: 'How India Manages Diversity', type: 'deep-dive', order: 2 },
      { id: 'belgium', title: 'Belgium vs Sri Lanka — The Lesson', type: 'comparison', order: 3 },
      { id: 'future', title: 'Can Diversity Be Our Strength?', type: 'zing-moment', order: 4 },
    ],
    mood: { diverse: 'discovery', manage: 'neutral', belgium: 'philosophy', future: 'achievement' },
  },
];

// ═══════════════════════════════════════════
// PLACEHOLDER: CODE_COSMOS topics will be added below
// ═══════════════════════════════════════════

const CODE_COSMOS: TopicSeed[] = [
  {
    slug: 'javascript-promises-async-await',
    title: 'Promises & Async/Await in JavaScript',
    subtitle: 'Stop fearing asynchronous code forever',
    quickShotSummary: 'A Promise represents a future value — pending, fulfilled, or rejected. Async/await is syntactic sugar over Promises. Use try/catch for errors. Promise.all() runs multiple async ops in parallel.',
    description: 'From callback hell to async heaven — understand how JavaScript handles asynchronous operations and why Promises changed everything.',
    universe: 'CODE_COSMOS', subWorld: 'foundations', difficulty: 'INTERMEDIATE', readTimeMinutes: 12,
    tags: ['javascript', 'promises', 'async-await', 'asynchronous', 'es6'],
    examTags: [], sources: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise'],
    content: {
      summary: 'Promises handle async operations. async/await makes them readable. Promise.all for parallel execution.',
      keyFacts: ['Promises were added in ES6 (2015)', 'async/await was added in ES8 (2017)', 'Callback hell is the #1 reason Promises were invented', 'Promise.all rejects if ANY single promise rejects'],
      desiAnalogies: [
        { id: 'zomato', analogy: 'Zomato Order', explanation: 'Ordering on Zomato is a Promise — pending (order placed), fulfilled (food delivered), rejected (restaurant cancelled). You don\'t stand at the restaurant waiting; you do other things and get notified. That\'s async!', emoji: '🍕' },
        { id: 'irctc', analogy: 'IRCTC Waitlist', explanation: 'A waitlisted ticket is a pending Promise. If confirmed → fulfilled. If cancelled → rejected. You don\'t sit at the station waiting — you check status later. Async behavior in real life!', emoji: '🚂' },
      ],
      memes: [
        { id: 'm1', text: 'Callback hell:\ncallback(callback(callback(callback())))\n\nPromise chain:\n.then().then().then()\n\nasync/await:\njust looks normal 😌', context: 'The evolution of async JavaScript' },
        { id: 'm2', text: 'try {\n  await life();\n} catch (error) {\n  console.log("It\'s okay, try again");\n}\n// Wholesome JS 🥹', context: 'Async/await + error handling = life advice' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Promises', to: 'APIs', insight: 'Every API call returns a Promise. fetch(), axios, tRPC — all Promise-based. Master Promises and you master API communication.' },
        { id: 'c2', from: 'Async/Await', to: 'Node.js Backend', insight: 'Node.js runs on a single thread. Async/await lets it handle 10,000+ concurrent requests without blocking. The secret to scalable backends!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Use Promise.all() for independent async operations (e.g., fetching user + posts simultaneously). It\'s 2x faster than sequential awaits.', category: 'PERFORMANCE' },
        { id: 't2', tip: 'Always use try/catch with async/await. Unhandled promise rejections crash Node.js apps in production.', category: 'BEST-PRACTICE' },
      ],
    },
    sections: [
      { id: 'callback-hell', title: 'The Callback Hell Problem', type: 'story', order: 1 },
      { id: 'promises', title: 'Promises — The Fix', type: 'deep-dive', order: 2 },
      { id: 'async-await', title: 'Async/Await — The Elegance', type: 'zing-moment', order: 3 },
      { id: 'patterns', title: 'Real-World Patterns', type: 'hands-on', order: 4 },
    ],
    mood: { 'callback-hell': 'war', promises: 'discovery', 'async-await': 'achievement', patterns: 'neutral' },
  },
  {
    slug: 'react-hooks-explained',
    title: 'React Hooks — useState, useEffect & Beyond',
    subtitle: 'The building blocks of modern React',
    quickShotSummary: 'useState manages component state. useEffect handles side effects (API calls, timers). useRef persists values without re-rendering. Custom hooks let you share logic between components.',
    description: 'React Hooks revolutionized how we write components. Master the 5 essential hooks and build anything.',
    universe: 'CODE_COSMOS', subWorld: 'frontend', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['react', 'hooks', 'usestate', 'useeffect', 'frontend'],
    examTags: [], sources: ['https://react.dev/reference/react/hooks'],
    content: {
      summary: 'useState for state, useEffect for side effects, useRef for persistence. Custom hooks for reusability.',
      keyFacts: ['Hooks replaced class components in React 16.8 (2019)', 'useEffect cleanup prevents memory leaks', 'The dependency array controls when effects run', 'Custom hooks must start with "use"'],
      desiAnalogies: [
        { id: 'switchboard', analogy: 'Home Switchboard', explanation: 'useState is like a switchboard — each switch (state) controls something (light, fan). Flipping a switch re-renders the room state. useEffect is the auto-timer that turns off lights at night.', emoji: '🔌' },
        { id: 'tiffin', analogy: 'Dabba for State Management', explanation: 'useState is a small tiffin (local state). useContext is a large sharing dabba (global state). useReducer is a full thali system with organized compartments (complex state logic).', emoji: '🍱' },
      ],
      memes: [
        { id: 'm1', text: 'useEffect(() => {\n  // runs on every render\n})\n\nMy component: *enters infinite loop*\nMe: "WHY" 😱', context: 'Forgetting the dependency array is a rite of passage' },
        { id: 'm2', text: 'Class component: 500 lines\nSame thing with hooks: 150 lines\nReact team: "We know." 😎', context: 'Hooks dramatically reduce code complexity' },
      ],
      zingConnections: [
        { id: 'c1', from: 'React Hooks', to: 'JavaScript Closures', insight: 'Hooks rely on JavaScript closures. Understanding closures = understanding why stale state bugs happen in useEffect. It\'s the same concept, different context.' },
        { id: 'c2', from: 'useEffect', to: 'API Integration', insight: 'Every data-fetching pattern in React starts with useEffect (or React Query/SWR). Master useEffect and you master how apps communicate with servers.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'useEffect dependency array rules: [] = runs once, [dep] = runs when dep changes, no array = runs every render. Memorize this!', category: 'MUST-KNOW' },
        { id: 't2', tip: 'Use React DevTools Profiler to find unnecessary re-renders. useMemo and useCallback optimize only AFTER you find a performance issue — never prematurely.', category: 'PERFORMANCE' },
      ],
    },
    sections: [
      { id: 'before', title: 'Before Hooks — Class Component Pain', type: 'story', order: 1 },
      { id: 'core', title: 'The Core Three: useState, useEffect, useRef', type: 'deep-dive', order: 2 },
      { id: 'custom', title: 'Custom Hooks — The Superpower', type: 'zing-moment', order: 3 },
      { id: 'mistakes', title: 'Common Hook Mistakes', type: 'resources', order: 4 },
    ],
    mood: { before: 'war', core: 'neutral', custom: 'achievement', mistakes: 'neutral' },
  },
  {
    slug: 'css-flexbox-grid',
    title: 'CSS Flexbox & Grid — Complete Guide',
    subtitle: 'Layout without pain, finally',
    quickShotSummary: 'Flexbox: one-dimensional layout (row OR column). Grid: two-dimensional layout (rows AND columns). Use Flexbox for navigation bars and card rows. Use Grid for full page layouts and dashboards.',
    description: 'Stop fighting with float and position. Flexbox and Grid are the modern CSS layout tools that make responsive design actually fun.',
    universe: 'CODE_COSMOS', subWorld: 'frontend', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['css', 'flexbox', 'grid', 'layout', 'responsive'],
    examTags: [], sources: ['https://css-tricks.com/snippets/css/a-guide-to-flexbox/'],
    content: {
      summary: 'Flexbox = 1D layout. Grid = 2D layout. Both use container + items pattern.',
      keyFacts: ['display: flex aligns items in a row by default', 'display: grid creates rows AND columns simultaneously', 'justify-content = main axis, align-items = cross axis', 'Grid template areas let you name layout sections'],
      desiAnalogies: [
        { id: 'train', analogy: 'Mumbai Local Compartments', explanation: 'Flexbox is like passengers in a train compartment — they line up in one direction (row). Grid is the entire train network — rows of tracks and columns of stations. Same system, different scales.', emoji: '🚆' },
        { id: 'rangoli', analogy: 'Rangoli Grid', explanation: 'A rangoli pattern is a CSS Grid — rows and columns of dots, each cell filled differently. grid-template-columns is the dot spacing, grid-template-rows is the line spacing!', emoji: '🎨' },
      ],
      memes: [
        { id: 'm1', text: 'CSS before flexbox:\nfloat: left\nclear: both\noverflow: hidden\n*crying*\n\nCSS after flexbox:\ndisplay: flex\njustify-content: center\n✨🥲', context: 'Centering was CSS\'s biggest pain point' },
        { id: 'm2', text: '"How to center a div"\n— Most searched CSS question since 2009\n\nAnswer: display: grid; place-items: center;\n— 2 lines. That\'s it. 😤', context: 'The eternal CSS centering struggle is over' },
      ],
      zingConnections: [
        { id: 'c1', from: 'CSS Grid', to: 'Dashboard Design', insight: 'Every admin dashboard uses CSS Grid for the sidebar + header + content layout. Master grid-template-areas and you can build any dashboard in 10 minutes.' },
        { id: 'c2', from: 'Flexbox', to: 'Mobile-First Design', insight: 'Flexbox\'s flex-wrap property is the secret to responsive design. Items automatically wrap to the next row on small screens — no media queries needed!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Centering anything: parent { display: grid; place-items: center; }. Three lines. Works for any element. Memorize this.', category: 'SHORTCUT' },
        { id: 't2', tip: 'Use Flexbox for components (navbar, cards, buttons). Use Grid for page layout (header, sidebar, content, footer). Both together = unstoppable.', category: 'STRATEGY' },
      ],
    },
    sections: [
      { id: 'pain', title: 'The Float Era — Dark Times', type: 'story', order: 1 },
      { id: 'flexbox', title: 'Flexbox Deep Dive', type: 'deep-dive', order: 2 },
      { id: 'grid', title: 'CSS Grid — The 2D Revolution', type: 'zing-moment', order: 3 },
      { id: 'responsive', title: 'Responsive Without Media Queries', type: 'hands-on', order: 4 },
    ],
    mood: { pain: 'war', flexbox: 'discovery', grid: 'achievement', responsive: 'discovery' },
  },
  {
    slug: 'nodejs-express-basics',
    title: 'Node.js & Express — Build Your First Server',
    subtitle: 'JavaScript on the backend, finally',
    quickShotSummary: 'Node.js lets JavaScript run outside the browser. Express is a minimal web framework for routing and middleware. A basic server: import express, create app, define routes, listen on port.',
    description: 'From frontend-only to full-stack — learn how Node.js and Express power millions of APIs and web servers worldwide.',
    universe: 'CODE_COSMOS', subWorld: 'backend', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['nodejs', 'express', 'backend', 'server', 'javascript'],
    examTags: [], sources: ['https://nodejs.org/en/learn', 'https://expressjs.com/en/starter/hello-world.html'],
    content: {
      summary: 'Node.js = JS runtime. Express = web framework. Define routes, use middleware, serve responses.',
      keyFacts: ['Node.js uses V8 engine (same as Chrome)', 'npm has 2M+ packages — largest ecosystem ever', 'Express handles 70%+ of Node.js web apps', 'Node.js is single-threaded but handles concurrency via event loop'],
      desiAnalogies: [
        { id: 'restaurant', analogy: 'Restaurant Kitchen System', explanation: 'Node.js is the chef who takes orders (requests) one at a time but doesn\'t wait for food to cook (async). Express is the menu system — defines what you can order (routes) and how it\'s prepared (middleware).', emoji: '👨‍🍳' },
        { id: 'post-office', analogy: 'India Post Office', explanation: 'Express routes are like post office windows — /api/users goes to window 1, /api/orders goes to window 2. Middleware is the security check everyone passes through before reaching any window.', emoji: '📮' },
      ],
      memes: [
        { id: 'm1', text: 'Frontend dev: "I only know JavaScript"\nNode.js: "That\'s all you need for backend too"\nFrontend dev: *becomes full-stack* 🦸', context: 'Node.js made full-stack JavaScript possible' },
        { id: 'm2', text: 'node_modules size: 847 MB\nActual project code: 12 KB\nMe looking at my hard drive: 😰', context: 'node_modules is famously heavy' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Express.js', to: 'APIs', insight: 'Express is the most popular framework for building REST APIs. Every GET/POST/PUT/DELETE route maps directly to CRUD operations. Master Express = master API development.' },
        { id: 'c2', from: 'Node.js Event Loop', to: 'Promises', insight: 'The event loop is WHY Promises work in Node.js. It queues async operations and processes them when ready — the engine behind async/await.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Start with just 4 routes: GET (read), POST (create), PUT (update), DELETE (remove). This covers 95% of real-world APIs.', category: 'FOUNDATION' },
        { id: 't2', tip: 'Use nodemon for development — it auto-restarts the server on file changes. "npx nodemon index.js" saves hours of manual restarts.', category: 'TOOL' },
      ],
    },
    sections: [
      { id: 'why', title: 'Why JavaScript on the Server?', type: 'story', order: 1 },
      { id: 'first-server', title: 'Your First Express Server', type: 'hands-on', order: 2 },
      { id: 'middleware', title: 'Middleware — The Secret Sauce', type: 'zing-moment', order: 3 },
      { id: 'project', title: 'Build a Mini CRUD API', type: 'hands-on', order: 4 },
    ],
    mood: { why: 'discovery', 'first-server': 'achievement', middleware: 'discovery', project: 'achievement' },
  },
  {
    slug: 'typescript-for-beginners',
    title: 'TypeScript — JavaScript with Superpowers',
    subtitle: 'Types save you from 3 AM debugging sessions',
    quickShotSummary: 'TypeScript adds static types to JavaScript. Define types with : annotation, interfaces for objects, generics for reusable types. The compiler catches errors BEFORE runtime — saving hours of debugging.',
    description: 'Why do top companies use TypeScript? Because runtime errors are expensive. Learn how types turn JavaScript chaos into predictable code.',
    universe: 'CODE_COSMOS', subWorld: 'foundations', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['typescript', 'javascript', 'types', 'static-typing', 'interfaces'],
    examTags: [], sources: ['https://www.typescriptlang.org/docs/handbook/'],
    content: {
      summary: 'TypeScript = JavaScript + types. Catches errors at compile time. Interfaces, generics, enums.',
      keyFacts: ['TypeScript was created by Microsoft in 2012', 'All valid JavaScript is valid TypeScript', 'Used by Google, Airbnb, Slack, Stripe', 'Next.js, Angular, and Deno are built with TypeScript'],
      desiAnalogies: [
        { id: 'helmet', analogy: 'Helmet While Riding', explanation: 'TypeScript is like wearing a helmet — JavaScript works without it, but one crash (runtime error) and you\'ll wish you had it. Types protect your code like a helmet protects your head.', emoji: '⛑️' },
        { id: 'recipe', analogy: 'Recipe with Measurements', explanation: 'JavaScript: "Add some salt." TypeScript: "Add exactly 2 tsp salt (type: Salt, amount: number)." Without types, your code-dish might taste terrible and you won\'t know why!', emoji: '📝' },
      ],
      memes: [
        { id: 'm1', text: 'JavaScript: "undefined is not a function"\nMe at 3 AM: 😱\n\nTypeScript: *catches the error in VS Code*\nMe: "Thank you, TypeScript overlord" 🙏', context: 'TypeScript prevents the most common runtime errors' },
        { id: 'm2', text: 'any any any any any\nThe forbidden TypeScript pattern that defeats the entire purpose 🤡', context: 'Using "any" everywhere defeats the point of TypeScript' },
      ],
      zingConnections: [
        { id: 'c1', from: 'TypeScript', to: 'React Hooks', insight: 'TypeScript + React = typed props, typed state, typed hooks. Your editor auto-completes everything and catches bugs before you even run the app.' },
        { id: 'c2', from: 'Static Typing', to: 'API Design', insight: 'tRPC uses TypeScript types to connect frontend and backend with zero API schemas. Type-safety from database to browser — the holy grail of full-stack development.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Start by renaming .js to .ts. TypeScript infers most types automatically. Add explicit types gradually — don\'t type everything on day 1.', category: 'MIGRATION' },
        { id: 't2', tip: 'Use "strict: true" in tsconfig.json from the start. It\'s harder to enable later. Strict mode catches 3x more bugs.', category: 'BEST-PRACTICE' },
      ],
    },
    sections: [
      { id: 'chaos', title: 'The JavaScript Chaos Problem', type: 'story', order: 1 },
      { id: 'types', title: 'Types, Interfaces & Generics', type: 'deep-dive', order: 2 },
      { id: 'compiler', title: 'When the Compiler Saves You', type: 'zing-moment', order: 3 },
      { id: 'migrate', title: 'Migrating a JS Project to TS', type: 'hands-on', order: 4 },
    ],
    mood: { chaos: 'war', types: 'neutral', compiler: 'achievement', migrate: 'neutral' },
  },
  {
    slug: 'sql-database-fundamentals',
    title: 'SQL & Databases — From Zero to Queries',
    subtitle: 'The language every developer must know',
    quickShotSummary: 'SQL (Structured Query Language) manages relational databases. Core operations: SELECT (read), INSERT (create), UPDATE (modify), DELETE (remove). Tables have rows (records) and columns (fields). JOIN combines related tables.',
    description: 'Every app stores data. SQL is the universal language to CRUD (Create, Read, Update, Delete) that data. From Instagram to banking — SQL powers it all.',
    universe: 'CODE_COSMOS', subWorld: 'backend', difficulty: 'BEGINNER', readTimeMinutes: 13,
    tags: ['sql', 'database', 'postgresql', 'mysql', 'queries'],
    examTags: [], sources: ['https://www.w3schools.com/sql/'],
    content: {
      summary: 'SQL manages relational data. CRUD operations, JOINs, WHERE filters, GROUP BY aggregations.',
      keyFacts: ['SQL was invented in 1974 at IBM', 'PostgreSQL, MySQL, SQLite are the most popular', 'NoSQL databases (MongoDB) don\'t use SQL', 'Every website you use runs SQL queries behind the scenes'],
      desiAnalogies: [
        { id: 'register', analogy: 'School Attendance Register', explanation: 'A database table is like the attendance register — each row is a student, columns are name/roll/attendance. SQL is the teacher\'s command: "SELECT name FROM students WHERE attendance < 75%" — who\'s in trouble!', emoji: '📋' },
        { id: 'aadhaar', analogy: 'Aadhaar Database', explanation: 'India\'s Aadhaar system is the world\'s largest biometric database — 1.3 billion records! When you authenticate with fingerprint, a SQL-like query runs: "SELECT * FROM citizens WHERE fingerprint = yours"', emoji: '🆔' },
      ],
      memes: [
        { id: 'm1', text: 'DELETE FROM users;\n-- forgot WHERE clause\n-- all users gone\n-- resume updated\n💀', context: 'The most dangerous SQL command without WHERE' },
        { id: 'm2', text: 'SQL: "I\'m 50 years old and still the standard"\nNoSQL: "I\'m more modern"\nSQL: *still used by every major company* 😎', context: 'SQL has outlived every "SQL killer" trend' },
      ],
      zingConnections: [
        { id: 'c1', from: 'SQL', to: 'APIs', insight: 'Every API endpoint ultimately runs SQL queries. GET /users → SELECT * FROM users. POST /user → INSERT INTO users. REST routes map directly to SQL operations.' },
        { id: 'c2', from: 'JOIN Operations', to: 'Data Science', insight: 'Data scientists spend 60% of their time writing SQL JOINs to combine data from multiple tables. Master JOINs and you\'re 60% data scientist already.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Learn in this order: SELECT → WHERE → ORDER BY → JOIN → GROUP BY → Sub-queries. This covers 95% of real-world SQL.', category: 'FOUNDATION' },
        { id: 't2', tip: 'ALWAYS test DELETE and UPDATE with a SELECT first. Run: SELECT * FROM users WHERE id = 5; THEN: DELETE FROM users WHERE id = 5;', category: 'SAFETY' },
      ],
    },
    sections: [
      { id: 'why-data', title: 'Why Data Needs Structure', type: 'story', order: 1 },
      { id: 'crud', title: 'CRUD — The Four Sacred Operations', type: 'deep-dive', order: 2 },
      { id: 'join', title: 'JOIN — When Tables Meet', type: 'zing-moment', order: 3 },
      { id: 'practice', title: 'Write Your First 10 Queries', type: 'hands-on', order: 4 },
    ],
    mood: { 'why-data': 'discovery', crud: 'neutral', join: 'achievement', practice: 'neutral' },
  },
  {
    slug: 'docker-containers-explained',
    title: 'Docker & Containers Simplified',
    subtitle: '"Works on my machine" — no more excuses',
    quickShotSummary: 'Docker packages your app + dependencies into a container that runs identically everywhere. Dockerfile defines the image. docker-compose manages multi-container apps. Containers are NOT virtual machines — they share the host OS kernel.',
    description: 'Why does your app work locally but crash in production? Docker fixes this by guaranteeing the same environment everywhere.',
    universe: 'CODE_COSMOS', subWorld: 'devops', difficulty: 'INTERMEDIATE', readTimeMinutes: 13,
    tags: ['docker', 'containers', 'devops', 'deployment', 'infrastructure'],
    examTags: [], sources: ['https://docs.docker.com/get-started/'],
    content: {
      summary: 'Docker containers package code + environment. Consistent across dev/staging/production.',
      keyFacts: ['Docker was released in 2013 and changed DevOps forever', 'Container ≠ Virtual Machine (containers share the OS kernel)', 'Docker Hub has 100,000+ pre-built images', 'Kubernetes orchestrates thousands of containers at scale'],
      desiAnalogies: [
        { id: 'tiffin', analogy: 'Dabba / Tiffin System', explanation: 'A Docker container is like a tiffin box — everything your app needs (code, libraries, config) is packed inside. Whether you eat at home or office, the food (app) is identical. The tiffin case (container) guarantees consistency!', emoji: '🍱' },
        { id: 'masala', analogy: 'Ready-Made Masala Pack', explanation: 'A Dockerfile is like a masala recipe written on the packet. Anyone, anywhere can add water (server) and get the exact same taste (app behavior). No variation, no surprises.', emoji: '🌶️' },
      ],
      memes: [
        { id: 'm1', text: 'Dev: "It works on my machine"\nDocker: "Then we\'ll ship your machine"\n📦🚀', context: 'Docker\'s entire value proposition in one sentence' },
        { id: 'm2', text: 'docker pull node:18\ndocker build -t myapp .\ndocker run myapp\n\n*chef\'s kiss* — deployed in 3 commands 👨‍🍳', context: 'Docker makes deployment absurdly simple' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Docker', to: 'Git & GitHub', insight: 'GitHub Actions + Docker = automated CI/CD. Every git push triggers a Docker build and deployment. The ultimate DevOps workflow is just Git + Docker + Cloud.' },
        { id: 'c2', from: 'Containers', to: 'Microservices', insight: 'Each microservice runs in its own container — independently scaled, deployed, and updated. Netflix runs 1000+ microservices, each in its own Docker container.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Use multi-stage builds to reduce image size. Build stage (1GB+) → Production stage (100MB). Smaller images = faster deployments.', category: 'OPTIMIZATION' },
        { id: 't2', tip: 'docker-compose up -d spins up your entire app stack (database + backend + frontend) with one command. Use it for local development always.', category: 'WORKFLOW' },
      ],
    },
    sections: [
      { id: 'problem', title: 'The "Works on My Machine" Problem', type: 'story', order: 1 },
      { id: 'containers', title: 'What Are Containers Really?', type: 'deep-dive', order: 2 },
      { id: 'ship', title: 'Build, Ship, Run — The Docker Trinity', type: 'zing-moment', order: 3 },
      { id: 'compose', title: 'Docker Compose for Multi-Service Apps', type: 'hands-on', order: 4 },
    ],
    mood: { problem: 'war', containers: 'discovery', ship: 'achievement', compose: 'neutral' },
  },
  {
    slug: 'data-structures-arrays-linked-lists',
    title: 'Arrays vs Linked Lists',
    subtitle: 'The foundation of every coding interview',
    quickShotSummary: 'Arrays store elements in contiguous memory (fast access O(1), slow insertion O(n)). Linked Lists use nodes with pointers (slow access O(n), fast insertion O(1)). Choose based on your access vs insertion pattern.',
    description: 'Every data structure interview starts here. Understand when to use arrays vs linked lists — with real coding examples and complexity analysis.',
    universe: 'CODE_COSMOS', subWorld: 'dsa-interview', difficulty: 'INTERMEDIATE', readTimeMinutes: 12,
    tags: ['data-structures', 'arrays', 'linked-lists', 'big-o', 'dsa'],
    examTags: [], sources: ['https://www.geeksforgeeks.org/data-structures/'],
    content: {
      summary: 'Arrays = contiguous, O(1) access, O(n) insert. Linked Lists = pointers, O(n) access, O(1) insert.',
      keyFacts: ['Array access by index is O(1) — constant time', 'Linked list insertion at head is O(1)', 'Arrays use less memory per element (no pointer overhead)', 'Most interview problems use arrays but some need linked lists'],
      desiAnalogies: [
        { id: 'train', analogy: 'Train vs Auto-Rickshaw Chain', explanation: 'An array is a train — seats are numbered (indexed), finding seat 42 is instant. A linked list is auto-rickshaws chained together — to reach #5, you must pass through #1, #2, #3, #4 first!', emoji: '🚂' },
        { id: 'hostel', analogy: 'Hostel Rooms vs Tents', explanation: 'Array = hostel rooms (fixed, numbered, quick to find). Linked list = tents at a music festival (flexible, can add/remove anywhere, but you have to walk past each one to find yours).', emoji: '🏕️' },
      ],
      memes: [
        { id: 'm1', text: 'Interviewer: "When would you use a linked list?"\nMe: "When you ask me to use a linked list"\nInterviewer: 😐', context: 'In practice, arrays win 90% of the time' },
        { id: 'm2', text: 'Array: O(1) access, O(n) insert\nLinked List: O(n) access, O(1) insert\nIT ISN\'T POSSIBLE TO HAVE IT ALL 😩', context: 'Every data structure has trade-offs' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Arrays', to: 'Binary Search', insight: 'Binary search ONLY works on sorted arrays — O(log n) search. This is why arrays + sorting is the most powerful DSA combo in interviews.' },
        { id: 'c2', from: 'Linked Lists', to: 'Browser History', insight: 'Your browser\'s back/forward button is a doubly linked list! Each page points to the previous and next page. Linked lists power everyday navigation.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Default to arrays unless you need frequent insertions/deletions at arbitrary positions. Arrays are cache-friendly and faster in practice.', category: 'STRATEGY' },
        { id: 't2', tip: 'Practice these linked list problems: reverse a linked list, detect cycle (Floyd\'s), merge two sorted lists. These 3 cover 80% of interview linked list questions.', category: 'INTERVIEW' },
      ],
    },
    sections: [
      { id: 'memory', title: 'How Memory Actually Works', type: 'story', order: 1 },
      { id: 'arrays', title: 'Arrays — The Ordered Warrior', type: 'deep-dive', order: 2 },
      { id: 'linked', title: 'Linked Lists — The Flexible Chain', type: 'deep-dive', order: 3 },
      { id: 'choose', title: 'When to Use Which', type: 'zing-moment', order: 4 },
    ],
    mood: { memory: 'discovery', arrays: 'neutral', linked: 'neutral', choose: 'achievement' },
  },
  {
    slug: 'nextjs-app-router',
    title: 'Next.js App Router — The Complete Guide',
    subtitle: 'File-based routing that makes React even better',
    quickShotSummary: 'Next.js App Router uses file system for routes: app/page.tsx = /, app/about/page.tsx = /about. Server Components render on server (faster). Client Components use "use client". Layout.tsx wraps child pages.',
    description: 'Next.js is React\'s recommended framework. Master the App Router and build production-ready apps with routing, SSR, and API routes built in.',
    universe: 'CODE_COSMOS', subWorld: 'frontend', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['nextjs', 'react', 'app-router', 'ssr', 'full-stack'],
    examTags: [], sources: ['https://nextjs.org/docs/app'],
    content: {
      summary: 'File-based routing, Server Components by default, layouts for shared UI, route handlers for APIs.',
      keyFacts: ['App Router was introduced in Next.js 13', 'Server Components = no JavaScript sent to client (lighter pages)', 'layout.tsx persists across navigations (no re-render)', 'Vercel created Next.js and offers free hosting'],
      desiAnalogies: [
        { id: 'house', analogy: 'Flat/Apartment Building', explanation: 'App Router is like an apartment building: layout.tsx is the main entrance + elevator (shared). Each page.tsx is a flat. [dynamic] routes are flexible rental units. The building (layout) stays, you just visit different flats (pages).', emoji: '🏢' },
        { id: 'thali', analogy: 'Server-Side Thali', explanation: 'Server Components = thali prepared in the kitchen (server) and served complete. Client Components = live counter where you interact with the chef. Serve the main thali from server, keep only interactive bits on client!', emoji: '🍽️' },
      ],
      memes: [
        { id: 'm1', text: 'Create React App: dead\nVite + React: alive\nNext.js: "I AM React for production" 👑', context: 'Next.js is now React\'s recommended framework' },
        { id: 'm2', text: '"use client"\n— The 2 words that define the App Router experience\n— Also the 2 words devs type most when things don\'t work 😅', context: 'The server/client boundary is the biggest learning curve' },
      ],
      zingConnections: [
        { id: 'c1', from: 'App Router', to: 'React Hooks', insight: 'useState, useEffect only work in Client Components ("use client"). Server Components can directly await data. This split changes how you think about React architecture.' },
        { id: 'c2', from: 'Next.js', to: 'Docker & Deployment', insight: 'Next.js deploys instantly on Vercel (zero config) or anywhere via Docker. The standalone output mode creates a minimal Docker image for production.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Keep Server Components as default. Only add "use client" when you need interactivity (onClick, useState, useEffect). Less client JS = faster pages.', category: 'ARCHITECTURE' },
        { id: 't2', tip: 'Use loading.tsx for instant loading states and error.tsx for error boundaries. Next.js makes UX patterns trivially easy with special filenames.', category: 'UX' },
      ],
    },
    sections: [
      { id: 'why', title: 'Why Next.js Won', type: 'story', order: 1 },
      { id: 'routing', title: 'File-Based Routing Deep Dive', type: 'deep-dive', order: 2 },
      { id: 'server', title: 'Server vs Client Components', type: 'zing-moment', order: 3 },
      { id: 'deploy', title: 'Deploy to Vercel in 2 Minutes', type: 'hands-on', order: 4 },
    ],
    mood: { why: 'discovery', routing: 'neutral', server: 'achievement', deploy: 'achievement' },
  },
  {
    slug: 'cicd-github-actions',
    title: 'CI/CD with GitHub Actions',
    subtitle: 'Automate everything — build, test, deploy',
    quickShotSummary: 'CI (Continuous Integration) = automated testing on every push. CD (Continuous Deployment) = automated deployment after tests pass. GitHub Actions uses YAML workflows triggered by events (push, PR, schedule).',
    description: 'Stop deploying manually. Set up a pipeline that tests, builds, and deploys your code automatically every time you push.',
    universe: 'CODE_COSMOS', subWorld: 'devops', difficulty: 'INTERMEDIATE', readTimeMinutes: 11,
    tags: ['cicd', 'github-actions', 'automation', 'devops', 'deployment'],
    examTags: [], sources: ['https://docs.github.com/en/actions'],
    content: {
      summary: 'CI/CD automates testing and deployment. GitHub Actions uses YAML workflows triggered by git events.',
      keyFacts: ['GitHub Actions gives 2,000 free minutes/month', 'Workflows run in virtual machines (Ubuntu/Windows/macOS)', 'Marketplace has 15,000+ pre-built actions', 'Matrix strategy tests across multiple versions simultaneously'],
      desiAnalogies: [
        { id: 'factory', analogy: 'Assembly Line Factory', explanation: 'CI/CD is like Tata Motors\' assembly line — each station (step) does one job: weld body (build), check paint (test), attach wheels (deploy). If any station fails, the line stops before shipping a bad car.', emoji: '🏭' },
        { id: 'exam', analogy: 'Board Exam Result System', explanation: 'Students submit papers (git push). Papers get checked (CI tests). Results declared (deployment). If you fail (tests fail), you don\'t graduate (no deployment). Automation prevents bad code from going live!', emoji: '📝' },
      ],
      memes: [
        { id: 'm1', text: 'git push\nCI: ✅ Build passed\nCI: ✅ Tests passed\nCI: ✅ Deployed\n\nMe: *sips chai while code deploys itself* ☕', context: 'The CI/CD dream — push and relax' },
        { id: 'm2', text: 'CI pipeline: 🔴 FAILED\nReason: "missing semicolon"\nMe who pushed without running tests locally: 🤡', context: 'CI catches what you were too lazy to test' },
      ],
      zingConnections: [
        { id: 'c1', from: 'GitHub Actions', to: 'Docker', insight: 'Most CI/CD pipelines build Docker images and push them to registries. GitHub Actions + Docker + Cloud = complete deployment automation in one YAML file.' },
        { id: 'c2', from: 'CI/CD', to: 'Tech Interviews', insight: 'Senior engineer interviews always ask about CI/CD. Explaining your pipeline setup shows you understand production-grade development — a major plus.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Start simple: on push → install deps → run tests → deploy. Add complexity later (caching, matrix, artifacts). A basic pipeline beats no pipeline.', category: 'STRATEGY' },
        { id: 't2', tip: 'Cache node_modules with actions/cache to cut CI time by 50%. Caching is the #1 CI optimization.', category: 'PERFORMANCE' },
      ],
    },
    sections: [
      { id: 'manual', title: 'The Manual Deployment Nightmare', type: 'story', order: 1 },
      { id: 'yaml', title: 'Writing Your First Workflow', type: 'hands-on', order: 2 },
      { id: 'auto', title: 'When Tests Run Themselves', type: 'zing-moment', order: 3 },
      { id: 'advanced', title: 'Matrix Builds & Secrets', type: 'deep-dive', order: 4 },
    ],
    mood: { manual: 'war', yaml: 'neutral', auto: 'achievement', advanced: 'neutral' },
  },
  {
    slug: 'system-design-basics',
    title: 'System Design — The Big Picture',
    subtitle: 'How WhatsApp handles 100 billion messages a day',
    quickShotSummary: 'System design is about building scalable systems. Key concepts: load balancers distribute traffic, caching (Redis) reduces DB load, databases (SQL vs NoSQL) store data, CDNs serve static content globally.',
    description: 'From single server to global scale — understand the building blocks of systems like WhatsApp, Netflix, and UPI.',
    universe: 'CODE_COSMOS', subWorld: 'dsa-interview', difficulty: 'INTERMEDIATE', readTimeMinutes: 16,
    tags: ['system-design', 'scalability', 'architecture', 'load-balancer', 'caching'],
    examTags: [], sources: ['https://github.com/donnemartin/system-design-primer'],
    content: {
      summary: 'Load balancers, caching, databases, message queues, CDNs — building blocks of scalable systems.',
      keyFacts: ['WhatsApp handles 100B+ messages daily with ~50 engineers', 'Redis can handle 1M+ operations per second', 'CDNs serve content from the nearest server to the user', 'Horizontal scaling (more machines) beats vertical scaling (bigger machine)'],
      desiAnalogies: [
        { id: 'upi', analogy: 'UPI Architecture', explanation: 'UPI handles 10B+ transactions/month. Load balancer = traffic police directing cars. Cache = nearby ATM (quick access). Database = RBI vault (permanent storage). Message queue = bank token system (orderly processing).', emoji: '⚡' },
        { id: 'dabba', analogy: 'Mumbai Dabbawala System', explanation: 'Dabbawalas are a distributed system — sorting stations (load balancers), color codes (routing), multiple delivery guys (horizontal scaling), and error rate of 1 in 16 million. Better than most tech systems!', emoji: '🍱' },
      ],
      memes: [
        { id: 'm1', text: 'Interviewer: "Design WhatsApp"\nMe: "So basically... two users... and a database..."\nInterviewer: "You have 45 minutes"\nMe: *sweating* 😰', context: 'System design interviews are intimidating but learnable' },
        { id: 'm2', text: 'Junior dev: "Just use a bigger server"\nSenior dev: "Use 10 smaller servers"\n*load balancer has entered the chat* ⚖️', context: 'Horizontal scaling > Vertical scaling' },
      ],
      zingConnections: [
        { id: 'c1', from: 'System Design', to: 'Tech Interviews', insight: 'System design rounds appear in all senior developer interviews (SDE-2+). Companies want to know you can think beyond code — at the architecture level.' },
        { id: 'c2', from: 'Caching', to: 'Databases', insight: 'Redis sits between your app and database, serving frequently accessed data 100x faster. This single addition handles most scaling problems.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'System design interview template: Requirements → High-level design → Component deep-dive → Scaling → Trade-offs. Follow this structure every time.', category: 'INTERVIEW' },
        { id: 't2', tip: 'Start with back-of-envelope calculations: daily users × requests/user × data size. This tells you if you need 1 server or 100.', category: 'ESTIMATION' },
      ],
    },
    sections: [
      { id: 'single', title: 'From One Server to Millions', type: 'story', order: 1 },
      { id: 'blocks', title: 'The Building Blocks', type: 'deep-dive', order: 2 },
      { id: 'scale', title: 'The Moment It Scales', type: 'zing-moment', order: 3 },
      { id: 'design', title: 'Design WhatsApp — Step by Step', type: 'hands-on', order: 4 },
    ],
    mood: { single: 'discovery', blocks: 'neutral', scale: 'achievement', design: 'war' },
  },
  {
    slug: 'python-for-beginners',
    title: 'Python — Your First Programming Language',
    subtitle: 'Simple enough to start, powerful enough to stay',
    quickShotSummary: 'Python uses indentation instead of braces. Variables don\'t need type declarations. Lists, dicts, and loops are the core tools. Used in web dev (Django/Flask), data science (pandas), AI/ML (TensorFlow), and automation.',
    description: 'Python is the #1 language for beginners, data science, and AI. Learn the fundamentals that power Google, Netflix, and NASA.',
    universe: 'CODE_COSMOS', subWorld: 'foundations', difficulty: 'BEGINNER', readTimeMinutes: 10,
    tags: ['python', 'programming', 'beginner', 'scripting', 'data-science'],
    examTags: [], sources: ['https://docs.python.org/3/tutorial/'],
    content: {
      summary: 'Python: readable, versatile, huge ecosystem. Indentation-based syntax. Lists, dicts, functions, classes.',
      keyFacts: ['Python was named after Monty Python, not the snake', '#1 language on GitHub and Stack Overflow since 2022', 'Used by Google, Netflix, Instagram, NASA, ISRO', 'Python 2 is dead — always use Python 3'],
      desiAnalogies: [
        { id: 'hindi', analogy: 'Hindi of Programming', explanation: 'Python is the Hindi of programming languages — easy to start, widely understood, and gets the job done everywhere. Not the fastest (C++ is the sports car), but the most practical for everyday use.', emoji: '🗣️' },
        { id: 'jugaad', analogy: 'Jugaad Programming', explanation: 'Python\'s philosophy is "there should be one obvious way to do it" — no jugaad needed. List comprehensions, built-in functions, and libraries mean you write 3 lines where Java needs 30.', emoji: '🔧' },
      ],
      memes: [
        { id: 'm1', text: 'Java: public static void main(String[] args) { System.out.println("Hello"); }\nPython: print("Hello")\nPython devs: "Life is too short for Java" 🐍', context: 'Python vs Java verbosity is a classic meme' },
        { id: 'm2', text: 'Python:\nimport antigravity\n\n# Yes, this is a real module.\n# It opens xkcd.com\n# Python devs have a sense of humor 😂', context: 'Python has easter eggs including import this and import antigravity' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Python', to: 'AI & Machine Learning', insight: 'TensorFlow, PyTorch, scikit-learn — all AI frameworks use Python. If you want to work in AI, Python is not optional, it\'s mandatory.' },
        { id: 'c2', from: 'Python Scripts', to: 'Automation', insight: 'Python can automate Excel reports, send emails, download files, scrape websites — all in 10-20 lines. The ultimate productivity hack for any professional.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Learn in this order: variables → lists → loops → functions → dicts → classes. Skip decorators and generators for now — they\'re advanced.', category: 'FOUNDATION' },
        { id: 't2', tip: 'Use Google Colab (free) to write Python in the browser — zero setup needed. Perfect for learning without installing anything.', category: 'TOOL' },
      ],
    },
    sections: [
      { id: 'why', title: 'Why Python Rules the World', type: 'story', order: 1 },
      { id: 'basics', title: 'Variables, Lists & Loops', type: 'deep-dive', order: 2 },
      { id: 'elegant', title: 'When Python Code Looks Like English', type: 'zing-moment', order: 3 },
      { id: 'project', title: 'Build 3 Mini Projects', type: 'hands-on', order: 4 },
    ],
    mood: { why: 'discovery', basics: 'neutral', elegant: 'achievement', project: 'achievement' },
  },
  {
    slug: 'web-security-owasp',
    title: 'Web Security — OWASP Top 10 Explained',
    subtitle: 'Don\'t build apps that hackers love',
    quickShotSummary: 'OWASP Top 10 lists the most critical web security risks: Injection (SQLi, XSS), Broken Authentication, Sensitive Data Exposure, Broken Access Control, Security Misconfiguration. Defense: validate inputs, hash passwords, use HTTPS, principle of least privilege.',
    description: 'Every developer should know the top 10 ways apps get hacked — and how to prevent each one. Security isn\'t optional; it\'s a feature.',
    universe: 'CODE_COSMOS', subWorld: 'backend', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['security', 'owasp', 'xss', 'sql-injection', 'authentication'],
    examTags: [], sources: ['https://owasp.org/www-project-top-ten/'],
    content: {
      summary: 'OWASP Top 10: Injection, Broken Auth, Data Exposure, XSS, Broken Access Control. Validate, hash, encrypt, verify.',
      keyFacts: ['SQL injection is still the #1 web vulnerability', '80% of breaches involve weak or stolen passwords', 'HTTPS encrypts all data in transit — always use it', 'The average data breach costs ₹17.6 crore in India'],
      desiAnalogies: [
        { id: 'bank', analogy: 'Bank Security System', explanation: 'Web security is like bank security: HTTPS = armored van (encrypted transport), Authentication = ID check at the door, Authorization = only YOUR locker opens, Input validation = metal detector (no weapons/code injection).', emoji: '🏦' },
        { id: 'door', analogy: 'Darwaza Band Karo', explanation: 'Broken Access Control is like a fancy lock on the front door but the back window is open. Hackers don\'t break down doors — they find the open window. Secure ALL entry points!', emoji: '🚪' },
      ],
      memes: [
        { id: 'm1', text: 'Input: \'; DROP TABLE users; --\nDatabase: *deletes everything*\nDev who didn\'t sanitize inputs: 😱\n\nBobby Tables strikes again! 🎓', context: 'The classic SQL injection attack from xkcd' },
        { id: 'm2', text: 'Password: admin\nAdmin password: admin123\nHacker: "Thanks, don\'t mind if I do" 🏃💨', context: 'Default credentials are the easiest attack vector' },
      ],
      zingConnections: [
        { id: 'c1', from: 'OWASP', to: 'SQL & Databases', insight: 'SQL injection happens when user input goes directly into SQL queries. Parameterized queries (prepared statements) prevent 100% of SQL injection attacks. One technique, one vulnerability eliminated.' },
        { id: 'c2', from: 'Authentication', to: 'Tech Interviews', insight: 'Senior dev interviews always include security questions. Knowing OWASP Top 10 and basic defenses distinguishes you from 90% of candidates.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Never store passwords in plain text. Use bcrypt with salt rounds ≥ 10. This single practice prevents the worst data breach scenario.', category: 'MUST-DO' },
        { id: 't2', tip: 'Use helmet.js (Express) or security headers middleware. It adds 10+ security headers automatically — 2 minutes of setup for massive protection.', category: 'TOOL' },
      ],
    },
    sections: [
      { id: 'hack', title: 'How Apps Actually Get Hacked', type: 'story', order: 1 },
      { id: 'owasp', title: 'OWASP Top 10 Deep Dive', type: 'deep-dive', order: 2 },
      { id: 'defend', title: 'The Defense Toolkit', type: 'zing-moment', order: 3 },
      { id: 'checklist', title: 'Security Checklist for Every Project', type: 'resources', order: 4 },
    ],
    mood: { hack: 'war', owasp: 'neutral', defend: 'achievement', checklist: 'neutral' },
  },
];

// ═══════════════════════════════════════════
// PLACEHOLDER: BATTLE_GROUND topics will be added below
// ═══════════════════════════════════════════

const BATTLE_GROUND: TopicSeed[] = [
  {
    slug: 'jee-mains-complete-strategy',
    title: 'JEE Mains — The Complete Strategy',
    subtitle: 'From NCERT to 250+ in 6 months',
    quickShotSummary: 'JEE Mains tests Physics, Chemistry, Maths (300 marks, 3 hours). Focus: NCERT for Chemistry, HC Verma for Physics, RD Sharma for Maths. 70% comes from Class 11 topics. Practice mock tests weekly.',
    description: 'The honest guide to JEE Mains — which books, which topics, how to manage time, and what coaching won\'t tell you.',
    universe: 'BATTLE_GROUND', subWorld: 'jee-neet', difficulty: 'INTERMEDIATE', readTimeMinutes: 16,
    tags: ['jee', 'engineering', 'physics', 'chemistry', 'mathematics'],
    examTags: ['JEE-MAINS', 'JEE-ADVANCED'],
    sources: ['https://jeemain.nta.nic.in/'],
    content: {
      summary: 'JEE Mains: 300 marks, 3 hours, 75 questions. NCERT + previous years + mock tests = the winning formula.',
      keyFacts: ['~12 lakh students appear annually', 'Class 11 topics carry 60-70% weightage', 'Chemistry has highest marks-per-hour ROI', 'NTA conducts JEE twice a year — best of two scores counts'],
      desiAnalogies: [
        { id: 'cricket', analogy: 'T20 Match Strategy', explanation: 'JEE is a T20 — 180 minutes for 300 marks. Don\'t waste time on "sixes" (impossible questions). Rotate strike with easy questions (singles/doubles). Identify your "death overs" topics (last 30 mins) and practice those specifically.', emoji: '🏏' },
        { id: 'thali', analogy: 'PCM Thali Balance', explanation: 'Physics = biryani (heavy, needs time). Chemistry = dal (quick, high nutrition/marks). Maths = roti (foundational, can\'t skip). Balance your study thali — don\'t just eat biryani!', emoji: '🍽️' },
      ],
      memes: [
        { id: 'm1', text: 'Coaching: "Our success rate is 90%"\nAlso coaching: *counts everyone who passed anything as success*\nToppers: "I studied NCERT at home" 📚', context: 'Coaching institute statistics are creatively calculated' },
        { id: 'm2', text: 'JEE aspirant schedule:\n6 AM: Wake up\n6 AM - 12 AM: Study\n12 AM: "One more chapter"\n2 AM: Still studying\nSleep: "We don\'t do that here" 😴', context: 'JEE preparation is intense but sleep is important' },
      ],
      zingConnections: [
        { id: 'c1', from: 'JEE Physics', to: 'Newton\'s Laws', insight: 'Mechanics alone carries 25-30% of JEE Physics marks. Master Newton\'s Laws, Work-Energy, Rotational Motion — these three chapters are your physics backbone.' },
        { id: 'c2', from: 'JEE Chemistry', to: 'Periodic Table', insight: 'Inorganic chemistry (periodic table patterns, chemical bonding) is the easiest 30 marks in JEE. Most students neglect it. Don\'t be most students.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'High ROI topics: Chemistry > Physics > Maths in terms of marks earned per hour of study. Start your daily study with Chemistry for quick wins.', category: 'STRATEGY' },
        { id: 't2', tip: 'Solve JEE previous year papers (2015-2024) chapter-wise, not year-wise. This builds pattern recognition for each topic type.', category: 'PRACTICE' },
      ],
    },
    sections: [
      { id: 'reality', title: 'JEE Reality Check', type: 'story', order: 1 },
      { id: 'plan', title: 'The 6-Month Battle Plan', type: 'deep-dive', order: 2 },
      { id: 'secret', title: 'The NCERT Secret Nobody Tells You', type: 'zing-moment', order: 3 },
      { id: 'mock', title: 'Mock Test Strategy', type: 'resources', order: 4 },
    ],
    mood: { reality: 'war', plan: 'neutral', secret: 'achievement', mock: 'war' },
  },
  {
    slug: 'neet-biology-strategy',
    title: 'NEET Biology — Score 340/360',
    subtitle: 'Biology carries your NEET rank',
    quickShotSummary: 'NEET Biology (360/720) is the highest-scoring section. Focus: NCERT line-by-line reading, Human Physiology (highest weightage), Genetics & Evolution. Diagrams are mandatory — practice drawing daily.',
    description: 'Biology is 50% of NEET marks. Master NCERT, diagrams, and previous year analysis to maximize your score in the most predictable section.',
    universe: 'BATTLE_GROUND', subWorld: 'jee-neet', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['neet', 'biology', 'medical', 'ncert', 'human-physiology'],
    examTags: ['NEET'],
    sources: ['https://neet.nta.nic.in/'],
    content: {
      summary: 'NEET Biology = 50% of paper. NCERT is the ONLY source. Line-by-line reading + diagrams + PYQ analysis.',
      keyFacts: ['90%+ NEET Biology questions come directly from NCERT', 'Human Physiology chapter alone carries 20-25% of bio marks', 'Diagrams in answers increase marks by 15-20%', '~20 lakh students compete for ~1 lakh MBBS seats'],
      desiAnalogies: [
        { id: 'ncert', analogy: 'NCERT = Gita for NEET', explanation: 'NCERT Biology is to NEET what the Bhagavad Gita is to life — every answer is in there if you read it carefully enough. No other book needed. Trust the NCERT.', emoji: '📖' },
        { id: 'body', analogy: 'Human Body = India Map', explanation: 'Learning Human Physiology is like learning India\'s geography: heart = Delhi (controls everything), lungs = Mumbai (major exchange hub), liver = Gujarat (processing/industry), kidneys = water department (filtration).', emoji: '🫀' },
      ],
      memes: [
        { id: 'm1', text: 'NEET aspirant: *reads NCERT 7 times*\nFriend: "Don\'t you need other books?"\nNEET topper: "I read NCERT 12 times"\nOther books: 📦 (untouched)', context: 'NCERT repetition is the NEET meta' },
        { id: 'm2', text: 'NEET Biology: "Name the enzyme that..."\nMe: *names every enzyme from NCERT*\nExam: *asks the ONE enzyme I skipped*\nAlways. 😤', context: 'The one thing you skip always shows up' },
      ],
      zingConnections: [
        { id: 'c1', from: 'NEET Biology', to: 'Cell Biology', insight: 'Cell structure/division is the foundation chapter. Without understanding cells, topics like genetics, human physiology, and plant biology won\'t make sense. Start here.' },
        { id: 'c2', from: 'Genetics', to: 'Why Do We Dream?', insight: 'Neuroscience connects to genetics through gene expression in brain development. The same DNA that determines your eye color also influences sleep patterns and dream intensity.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Read NCERT line by line. Highlight NEW facts on each reading (you\'ll find new details even on the 5th read). NEET tests exact NCERT wording.', category: 'MUST-DO' },
        { id: 't2', tip: 'High-weightage chapters: Human Physiology, Genetics & Evolution, Ecology, Cell Biology. These 4 areas carry 60%+ of biology marks.', category: 'PRIORITY' },
      ],
    },
    sections: [
      { id: 'stakes', title: 'Why Biology Decides Your Rank', type: 'story', order: 1 },
      { id: 'ncert', title: 'The NCERT Bible Method', type: 'deep-dive', order: 2 },
      { id: 'top-chapters', title: 'The 4 Chapters That Carry 60% Marks', type: 'zing-moment', order: 3 },
      { id: 'diagrams', title: 'Diagram Practice Guide', type: 'hands-on', order: 4 },
    ],
    mood: { stakes: 'war', ncert: 'neutral', 'top-chapters': 'achievement', diagrams: 'neutral' },
  },
  {
    slug: 'cat-exam-preparation',
    title: 'CAT Exam — From Zero to 99 Percentile',
    subtitle: 'The MBA entrance that tests how you think',
    quickShotSummary: 'CAT has 3 sections: VARC (Verbal), DILR (Data/Logic), QA (Quantitative). 2 hours, 66 questions. Focus on reading speed (VARC), puzzle patterns (DILR), and arithmetic shortcuts (QA). Mock tests are more important than study material.',
    description: 'CAT doesn\'t test knowledge — it tests speed, accuracy, and thinking ability. Here\'s how to train your brain for India\'s toughest aptitude test.',
    universe: 'BATTLE_GROUND', subWorld: 'cat-mba', difficulty: 'ADVANCED', readTimeMinutes: 15,
    tags: ['cat', 'mba', 'aptitude', 'iim', 'quantitative'],
    examTags: ['CAT', 'CAT-VARC', 'CAT-DILR', 'CAT-QA'],
    sources: ['https://iimcat.ac.in/'],
    content: {
      summary: 'CAT: 3 sections, 2 hours, 66 questions. Speed + accuracy + mock analysis = 99 percentile formula.',
      keyFacts: ['2.5 lakh+ students compete for ~5,000 IIM seats', 'DILR is the most unpredictable section', 'Reading speed of 300+ wpm is essential for VARC', 'Top scorers take 40+ mock tests before CAT day'],
      desiAnalogies: [
        { id: 'ipl', analogy: 'IPL Auction = CAT Strategy', explanation: 'CAT is like IPL auction — limited budget (time), need to fill all positions (sections). Don\'t blow 70% on one expensive player (section). Strategic allocation across VARC, DILR, QA = winning combination.', emoji: '🏏' },
        { id: 'jugaad', analogy: 'Mental Math Jugaad', explanation: 'CAT QA rewards jugaad math: 17.5% = 1/6 + some. Tables till 30, squares till 30, cubes till 15 — memorize these and you solve 40% of QA questions by mental math alone.', emoji: '🧮' },
      ],
      memes: [
        { id: 'm1', text: 'VARC passage: 1000 words on post-modern deconstructivism\nTime given: 12 minutes\nMe after reading: "I know words, but this is something else" 🤯', context: 'CAT VARC passages are notoriously complex' },
        { id: 'm2', text: 'CAT score: 99.5 percentile\nIIM Ahmedabad: "Your profile is interesting but..."\nMe: 😭', context: 'CAT score alone doesn\'t guarantee IIM admission' },
      ],
      zingConnections: [
        { id: 'c1', from: 'CAT Quantitative', to: 'Quadratic Equations', insight: 'Number theory, algebra, and geometry from school form 70% of CAT QA. If you mastered Class 10 math, you\'re 70% ready for CAT quant. School math pays off!' },
        { id: 'c2', from: 'CAT VARC', to: 'Critical Thinking', insight: 'CAT Reading Comprehension trains argument analysis — identifying assumptions, weakening/strengthening arguments. This skill is valuable in consulting, management, and everyday decision-making.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Take 1 mock test per week from month 2. Spend 3x more time ANALYZING the mock than taking it. Analysis is where real learning happens.', category: 'STRATEGY' },
        { id: 't2', tip: 'VARC hack: Read editorial sections of The Hindu/Indian Express daily for 3 months. Your reading speed and comprehension will improve automatically.', category: 'DAILY' },
      ],
    },
    sections: [
      { id: 'what', title: 'What CAT Actually Tests', type: 'story', order: 1 },
      { id: 'sections', title: 'VARC vs DILR vs QA', type: 'deep-dive', order: 2 },
      { id: 'mock', title: 'The Mock Test Revelation', type: 'zing-moment', order: 3 },
      { id: 'timeline', title: '6-Month Preparation Timeline', type: 'resources', order: 4 },
    ],
    mood: { what: 'discovery', sections: 'neutral', mock: 'achievement', timeline: 'war' },
  },
  {
    slug: 'upsc-mains-answer-writing',
    title: 'UPSC Mains — The Art of Answer Writing',
    subtitle: 'Good answers ≠ good knowledge. Good answers = good structure.',
    quickShotSummary: 'UPSC Mains rewards structured answers: Introduction (1-2 lines) → Body (points with examples) → Conclusion (balanced view). Use diagrams, flowcharts, and keywords from the syllabus. 150-word answers in 7 minutes, 250-word in 12 minutes.',
    description: 'Most UPSC aspirants know the content but fail at answer writing. Master the structure that converts knowledge into marks.',
    universe: 'BATTLE_GROUND', subWorld: 'upsc', difficulty: 'ADVANCED', readTimeMinutes: 14,
    tags: ['upsc', 'mains', 'answer-writing', 'ias', 'essay'],
    examTags: ['UPSC-MAINS'],
    sources: ['https://www.upsc.gov.in/'],
    content: {
      summary: 'UPSC Mains = structured answer writing. Intro-Body-Conclusion format, diagrams, keywords, balanced views.',
      keyFacts: ['Answer writing practice matters more than reading new material', 'Examiners spend 60-90 seconds per answer', 'Diagrams can earn 1-2 extra marks per answer', 'Balanced conclusion (both sides) impresses examiners'],
      desiAnalogies: [
        { id: 'thali', analogy: 'Answer = Well-Plated Thali', explanation: 'A good UPSC answer is like a well-plated thali: introduction is the appetizer (crisp), body points are the main courses (substantial), diagrams are the garnish (impressive), conclusion is the dessert (memorable). Presentation matters!', emoji: '🍽️' },
        { id: 'elevator', analogy: 'Elevator Pitch', explanation: '7 minutes per answer means you\'re giving an elevator pitch to the examiner. They want clarity, not a textbook. Hook them in line 1, deliver value in the body, close strong.', emoji: '🗣️' },
      ],
      memes: [
        { id: 'm1', text: 'Me writing UPSC answer: *uses entire page*\nExaminer: reads first 3 lines and last line\nMe: 😐\n\nHence: Make the intro and conclusion count!', context: 'Examiners don\'t read every word — they scan' },
        { id: 'm2', text: 'Content knowledge: 100%\nAnswer writing skill: 20%\nResult: "Not recommended"\n\nContent knowledge: 60%\nAnswer writing skill: 90%\nResult: IAS officer 🎖️', context: 'Answer writing skill matters more than raw knowledge' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Answer Writing', to: 'UPSC Preparation', insight: 'Daily answer writing practice (1 hour) from month 3 is the single most impactful UPSC habit. Toppers write 200+ practice answers before Mains.' },
        { id: 'c2', from: 'Structured Writing', to: 'Indian Constitution', insight: 'Constitutional quotes in answers (Preamble, DPSPs, FRs) show depth. Examiners give bonus marks for constitutional backing of arguments.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The 7-minute formula: 1 min reading → 1 min planning → 4 min writing → 1 min review. Stick to this for every 150-word answer.', category: 'TIMING' },
        { id: 't2', tip: 'Start answers with a quote, statistic, or constitutional reference. "As Ambedkar envisioned..." immediately grabs examiner attention.', category: 'OPENING' },
      ],
    },
    sections: [
      { id: 'problem', title: 'Why Toppers Don\'t Write More', type: 'story', order: 1 },
      { id: 'structure', title: 'The I-B-C Framework', type: 'deep-dive', order: 2 },
      { id: 'practice', title: 'Daily Answer Writing Routine', type: 'zing-moment', order: 3 },
      { id: 'examples', title: 'Before vs After — Real Answer Makeovers', type: 'comparison', order: 4 },
    ],
    mood: { problem: 'war', structure: 'neutral', practice: 'achievement', examples: 'discovery' },
  },
  {
    slug: 'ssc-cgl-complete-guide',
    title: 'SSC CGL — The Government Job Gateway',
    subtitle: 'From exam halls to Central Government offices',
    quickShotSummary: 'SSC CGL has 4 tiers: Tier 1 (objective, 200 marks), Tier 2 (objective + descriptive), Tier 3 (descriptive), Tier 4 (skill test). Focus areas: Quantitative Aptitude, Reasoning, English, GK. Eligibility: any graduate.',
    description: 'SSC CGL is the gateway to prestigious government jobs (Income Tax, Excise, Audit). The complete strategy for all 4 tiers.',
    universe: 'BATTLE_GROUND', subWorld: 'ssc-banking', difficulty: 'BEGINNER', readTimeMinutes: 13,
    tags: ['ssc', 'cgl', 'government-job', 'aptitude', 'reasoning'],
    examTags: ['SSC-CGL'],
    sources: ['https://ssc.nic.in/'],
    content: {
      summary: 'SSC CGL: 4 tiers, objective + descriptive. Focus on quant speed, reasoning patterns, and GK current affairs.',
      keyFacts: ['30 lakh+ apply for ~10,000 posts', 'Tier 1 cutoff is usually 140-160/200', 'Speed is more important than accuracy in Tier 1', 'Any graduate from any stream can apply'],
      desiAnalogies: [
        { id: 'race', analogy: 'Marathon Not Sprint', explanation: 'SSC CGL preparation is a marathon — Tier 1 to Tier 4 can take 18 months. Many give up after Tier 1 itself. Those who maintain consistency through all 4 tiers get the sarkari naukri. Persistence wins.', emoji: '🏃' },
        { id: 'shortcut', analogy: 'Quant Math = Street Smart Math', explanation: 'SSC Quant isn\'t school math — it\'s street-smart math. Approximation, percentage shortcuts, Vedic multiplication. The person who calculates faster wins, not the one who knows more formulas.', emoji: '🧮' },
      ],
      memes: [
        { id: 'm1', text: 'Dad: "Sarkari naukri mil jayegi"\nSSC CGL competition: 30 lakh for 10,000 seats\nMe: "Dad, it\'s harder than you think" 😅', context: 'Parents and students have very different views of SSC difficulty' },
        { id: 'm2', text: 'SSC aspirant daily routine:\n6 AM: GK revision\n9 AM: Quant shortcuts\n12 PM: Reasoning puzzles\n3 PM: English grammar\n6 PM: Mock test\n9 PM: Previous year analysis\nSleep: Optional 😴', context: 'SSC preparation is a full-time job' },
      ],
      zingConnections: [
        { id: 'c1', from: 'SSC CGL', to: 'CAT Exam', insight: 'SSC Quant and CAT QA overlap significantly — number theory, algebra, geometry. Preparing for one gives a 40% head start on the other!' },
        { id: 'c2', from: 'SSC Reasoning', to: 'Critical Thinking', insight: 'SSC Reasoning section trains pattern recognition and logical thinking — skills valuable in programming, data analysis, and everyday problem-solving.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Speed math: memorize tables 1-30, squares 1-30, cubes 1-15, fraction-decimal conversions. This alone saves 10 minutes in Tier 1.', category: 'SHORTCUT' },
        { id: 't2', tip: 'For GK: follow monthly current affairs magazines (Pratiyogita Darpan). 40% of GK questions come from last 6 months of current affairs.', category: 'STRATEGY' },
      ],
    },
    sections: [
      { id: 'dream', title: 'The Sarkari Naukri Dream', type: 'story', order: 1 },
      { id: 'tiers', title: 'Understanding All 4 Tiers', type: 'deep-dive', order: 2 },
      { id: 'speed', title: 'Speed Math — The Secret Weapon', type: 'zing-moment', order: 3 },
      { id: 'plan', title: '12-Month Preparation Plan', type: 'resources', order: 4 },
    ],
    mood: { dream: 'discovery', tiers: 'neutral', speed: 'achievement', plan: 'war' },
  },
  {
    slug: 'upsc-ethics-paper-guide',
    title: 'UPSC Ethics Paper — Score 110+',
    subtitle: 'The most subjective paper with the most marks potential',
    quickShotSummary: 'Ethics paper (GS-4, 250 marks) tests: ethical theories, attitude, aptitude, emotional intelligence, public service values, case studies. Case studies carry 120 marks — practice them weekly. Use real examples, not textbook definitions.',
    description: 'Ethics is the most underestimated UPSC paper. It\'s also where the rank difference is made. Master case studies and real-world ethical frameworks.',
    universe: 'BATTLE_GROUND', subWorld: 'upsc', difficulty: 'ADVANCED', readTimeMinutes: 14,
    tags: ['upsc', 'ethics', 'aptitude', 'case-studies', 'governance'],
    examTags: ['UPSC-MAINS'],
    sources: ['https://www.upsc.gov.in/'],
    content: {
      summary: 'Ethics GS-4: 250 marks. Case studies (120 marks) are the game-changer. Practice weekly. Quote thinkers. Be practical, not preachy.',
      keyFacts: ['Case studies carry 120/250 marks — almost half', 'Quoting Gandhian values earns extra marks', 'Ethics scores range wildly: 90 to 160 — biggest score variance', 'Practical solutions beat philosophical answers in case studies'],
      desiAnalogies: [
        { id: 'dilemma', analogy: 'Daily Life Ethical Dilemmas', explanation: 'Ethics paper scenarios mirror real life: Your boss asks you to hide data (integrity). A colleague takes credit for your work (honesty). A rich donor wants a favor (conflict of interest). You face these daily!', emoji: '⚖️' },
        { id: 'gandhi', analogy: 'WWGD — What Would Gandhi Do?', explanation: 'When stuck on an ethics case study, ask "What Would Gandhi Do?" Then add practical modern solutions. The combo of idealism + pragmatism is exactly what examiners want.', emoji: '🕊️' },
      ],
      memes: [
        { id: 'm1', text: 'Ethics paper: "Your junior has made an error that benefits you. What do you do?"\n\nIdeal answer: "Report it transparently"\nReal life: *sweats nervously* 😅', context: 'Ethics paper answers vs real-life choices — the eternal gap' },
        { id: 'm2', text: 'UPSC Ethics syllabus: Emotional Intelligence\nAspirants: *cries during preparation*\n"I have emotional intelligence — it\'s all sadness" 😢📚', context: 'The irony of studying emotions while being emotionally exhausted' },
      ],
      zingConnections: [
        { id: 'c1', from: 'UPSC Ethics', to: 'Arthashastra', insight: 'Chanakya\'s concept of "Dharma of the ruler" appears in Ethics case studies about governance dilemmas. Ancient wisdom provides framework for modern ethical analysis.' },
        { id: 'c2', from: 'Ethical Theories', to: 'Indian Constitution', insight: 'Directive Principles of State Policy are essentially ethical guidelines for governance. Quoting DPSPs in ethics answers shows constitutional grounding — examiners love this.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For case studies: Identify stakeholders → List ethical issues → Apply principles → Give practical solution → Mention consequences. This 5-step framework works for every case.', category: 'FRAMEWORK' },
        { id: 't2', tip: 'Memorize 10 quotes from Gandhi, Ambedkar, Kalam, Vivekananda, and 5 from Western thinkers (Aristotle, Kant, Rawls). One relevant quote per answer adds 1-2 marks.', category: 'SCORING' },
      ],
    },
    sections: [
      { id: 'why', title: 'Why Ethics Is the Rank Maker', type: 'story', order: 1 },
      { id: 'theory', title: 'Ethical Theories Simplified', type: 'deep-dive', order: 2 },
      { id: 'case', title: 'Cracking Case Studies', type: 'zing-moment', order: 3 },
      { id: 'thinkers', title: 'Thinkers & Quotes Toolkit', type: 'resources', order: 4 },
    ],
    mood: { why: 'discovery', theory: 'philosophy', case: 'achievement', thinkers: 'philosophy' },
  },
  {
    slug: 'state-psc-preparation',
    title: 'State PSC — Your Local IAS Path',
    subtitle: 'Same prestige, closer to home',
    quickShotSummary: 'State PSCs (MPSC, UPPSC, BPSC, etc.) conduct exams similar to UPSC but focused on state-specific topics. Key difference: state history, geography, and current affairs are heavily tested. NCERT + state-specific textbooks are the foundation.',
    description: 'State Public Service Commissions offer prestigious administrative posts. Understand how they differ from UPSC and how to prepare smartly for your state.',
    universe: 'BATTLE_GROUND', subWorld: 'state-psc', difficulty: 'INTERMEDIATE', readTimeMinutes: 12,
    tags: ['state-psc', 'mpsc', 'uppsc', 'bpsc', 'government-exam'],
    examTags: ['STATE-PSC'],
    sources: ['https://mpsc.gov.in/', 'https://uppsc.up.nic.in/'],
    content: {
      summary: 'State PSCs: similar to UPSC but with state-specific focus. State history, geography, and current affairs are key differentiators.',
      keyFacts: ['MPSC, UPPSC, BPSC are the most competitive state PSCs', 'State-specific questions carry 30-40% weightage', 'Many UPSC aspirants simultaneously prepare for State PSC', 'Salary and perks are comparable to IAS at state level'],
      desiAnalogies: [
        { id: 'ipl-domestic', analogy: 'IPL vs Ranji Trophy', explanation: 'UPSC is the IPL — national stage, highest visibility. State PSC is Ranji Trophy — equally competitive, great career, and many Ranji players eventually play IPL. Success at state level opens national doors.', emoji: '🏏' },
        { id: 'local-train', analogy: 'Express vs Local Train', explanation: 'UPSC is the Rajdhani Express — goes far, takes long. State PSC is the local train — reaches closer destinations faster. Both get you to a great career; the route differs.', emoji: '🚂' },
      ],
      memes: [
        { id: 'm1', text: 'UPSC: "The competition is too tough"\nState PSC: "It\'s equally tough but nobody talks about it"\nBoth aspirants: 😤 *studying at 2 AM*', context: 'State PSC difficulty is often underestimated' },
        { id: 'm2', text: 'Parents: "Beta, UPSC karo"\nMe: *clears State PSC first*\nParents: "Chalo, this is also good"\nWin-win! 🏆', context: 'State PSC as a parallel path to administrative services' },
      ],
      zingConnections: [
        { id: 'c1', from: 'State PSC', to: 'UPSC Preparation', insight: '60% of State PSC syllabus overlaps with UPSC. If you\'re preparing for UPSC, you\'re already 60% ready for your State PSC. File both applications!' },
        { id: 'c2', from: 'State History', to: 'Indian Constitution', insight: 'State-specific constitutional provisions (Governor\'s role, State Legislature, etc.) overlap between State PSC and UPSC Polity. One study session, two exam preparations.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Get state-specific textbooks from your state board (Class 6-12). They cover local history, geography, and culture that NCERT doesn\'t touch.', category: 'FOUNDATION' },
        { id: 't2', tip: 'Follow your state\'s local newspaper (Lokmat for Maharashtra, Dainik Jagran for UP, etc.) for state current affairs. National papers miss state-level news.', category: 'DAILY' },
      ],
    },
    sections: [
      { id: 'value', title: 'Why State PSC Is Underrated', type: 'story', order: 1 },
      { id: 'diff', title: 'How State PSC Differs from UPSC', type: 'comparison', order: 2 },
      { id: 'state', title: 'The State-Specific Edge', type: 'zing-moment', order: 3 },
      { id: 'plan', title: 'Dual Preparation Strategy', type: 'resources', order: 4 },
    ],
    mood: { value: 'discovery', diff: 'neutral', state: 'achievement', plan: 'war' },
  },
  {
    slug: 'upsc-geography-decoded',
    title: 'UPSC Geography — Physical & Human',
    subtitle: 'Maps, monsoons, and marks',
    quickShotSummary: 'UPSC Geography covers Physical (plate tectonics, climate, oceans) and Human (population, urbanization, industries). Map-based questions are common in Prelims. Use Atlas daily. Link current events to geographical concepts.',
    description: 'Geography is the most visual UPSC subject — maps make it memorable. Master physical and human geography with atlas-based learning.',
    universe: 'BATTLE_GROUND', subWorld: 'upsc', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['upsc', 'geography', 'physical-geography', 'human-geography', 'maps'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS'],
    sources: ['https://ncert.nic.in/textbook/pdf/iess104.pdf'],
    content: {
      summary: 'UPSC Geography: Physical + Human + Indian geography. Atlas-based learning, map practice, current affairs linkage.',
      keyFacts: ['Geography carries 15-20 questions in UPSC Prelims', 'Indian Monsoon is the most-tested geography topic', 'Map questions appear every year — practice with blank maps', 'GC Leong + NCERT = sufficient for most aspirants'],
      desiAnalogies: [
        { id: 'travel', analogy: 'India Road Trip', explanation: 'Learning Indian Geography is like planning a road trip — start with the physical features (mountains, rivers = roads), then human geography (cities, industries = stops), then economic geography (resources = fuel stations).', emoji: '🗺️' },
        { id: 'kitchen', analogy: 'Types of Rocks = Types of Roti', explanation: 'Igneous rock = fresh roti (made from raw dough/magma). Sedimentary rock = paratha (layered over time). Metamorphic rock = naan (original changed by heat/pressure). Rock cycle = cooking techniques!', emoji: '🫓' },
      ],
      memes: [
        { id: 'm1', text: 'UPSC: "Locate these rivers on a map"\nMe who can\'t find my own house on Google Maps: 🗺️😰', context: 'Map skills take practice — most of us can\'t even navigate our own cities' },
        { id: 'm2', text: 'Geography fact: India has 6 climate zones\nMy city: experiences all 6 in one week\nWeather: "I am unpredictable" ☀️🌧️❄️🌪️', context: 'India\'s climate diversity is extreme' },
      ],
      zingConnections: [
        { id: 'c1', from: 'UPSC Geography', to: 'Indian Monsoon', insight: 'Monsoon mechanism alone can yield 3-5 Prelims questions. Understanding pressure systems, ITCZ, jet streams, and El Niño covers most of the physical geography paper.' },
        { id: 'c2', from: 'Human Geography', to: 'Indian Constitution', insight: 'Population distribution, urbanization, and development indices link geography to Directive Principles (DPSP). Article 39 (resource distribution) is a geography-meets-polity topic.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Open an Atlas alongside every geography reading session. Locate every place name on the map. Visual memory is 3x stronger than text memory.', category: 'PRACTICE' },
        { id: 't2', tip: 'Link current events to geography: floods → drainage patterns, earthquake → plate tectonics, drought → rainfall distribution. This dual preparation saves time.', category: 'STRATEGY' },
      ],
    },
    sections: [
      { id: 'why', title: 'Why Geography Is Visual', type: 'story', order: 1 },
      { id: 'physical', title: 'Physical Geography Essentials', type: 'deep-dive', order: 2 },
      { id: 'maps', title: 'When the Map Clicks', type: 'zing-moment', order: 3 },
      { id: 'human', title: 'Human Geography & Current Affairs', type: 'application', order: 4 },
    ],
    mood: { why: 'discovery', physical: 'neutral', maps: 'achievement', human: 'discovery' },
  },
  {
    slug: 'banking-ibps-po-guide',
    title: 'IBPS PO — Bank Officer Exam Guide',
    subtitle: 'From graduate to bank officer',
    quickShotSummary: 'IBPS PO has Prelims (100 marks: English + Quant + Reasoning) and Mains (200 marks: adds GK/Banking). Focus: speed in calculations, logical reasoning patterns, and banking awareness. 20+ PSU banks recruit through IBPS.',
    description: 'IBPS PO is one of the most sought-after government exams for bank officer positions. Here\'s the strategy for Prelims + Mains.',
    universe: 'BATTLE_GROUND', subWorld: 'ssc-banking', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['ibps', 'banking', 'po', 'government-exam', 'finance'],
    examTags: ['IBPS-PO'],
    sources: ['https://www.ibps.in/'],
    content: {
      summary: 'IBPS PO: Prelims + Mains + Interview. Speed-based exam. Banking awareness is the differentiator.',
      keyFacts: ['20+ public sector banks recruit through IBPS PO', 'Prelims is purely a speed test — 1 hour for 100 questions', 'Banking awareness questions come from last 6 months of news', 'Starting salary of PO: ₹52,000+ per month'],
      desiAnalogies: [
        { id: 'counter', analogy: 'Bank Counter = Exam Timer', explanation: 'IBPS Prelims is like a bank counter — long queue (questions), limited time (token number). You can\'t serve everyone. Prioritize easy customers (questions), skip the difficult ones, close the window (submit) on time.', emoji: '🏦' },
        { id: 'rbi', analogy: 'RBI Governor for a Day', explanation: 'Banking awareness section tests if you understand how India\'s banking system works. Think like RBI Governor: repo rate, CRR, SLR, NBFC regulations, digital banking initiatives.', emoji: '🏛️' },
      ],
      memes: [
        { id: 'm1', text: 'IBPS Prelims: 100 questions in 60 minutes\nThat\'s 36 seconds per question\nMe on question 1: *spends 2 minutes*\nRemaining 99 questions: 👀', context: 'Time management is the entire game in IBPS' },
        { id: 'm2', text: 'Parents: "Beta, bank mein job lelo"\nIBPS competition: 30 lakh applicants\nParents: "Arre simple sa exam hai"\n💀', context: 'Banking exams are far more competitive than parents realize' },
      ],
      zingConnections: [
        { id: 'c1', from: 'IBPS PO', to: 'SSC CGL', insight: 'IBPS PO Quant and SSC CGL Quant have 70% overlap. Preparing for one gives massive advantage on the other. Apply for both exams simultaneously!' },
        { id: 'c2', from: 'Banking Awareness', to: 'Indian Economy', insight: 'RBI policy rates, fiscal deficit, GDP growth — banking awareness connects directly to UPSC Economics. Finance knowledge is transferable across all government exams.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Prelims strategy: Attempt Reasoning first (35 questions, 20 min) → Quant next (35 questions, 25 min) → English last (30 questions, 15 min). This sequence maximizes score.', category: 'STRATEGY' },
        { id: 't2', tip: 'Download the Oliveboard/Testbook app and take sectional tests daily. 15 minutes of daily practice improves speed by 40% in 2 months.', category: 'PRACTICE' },
      ],
    },
    sections: [
      { id: 'career', title: 'The Bank Officer Dream', type: 'story', order: 1 },
      { id: 'pattern', title: 'Prelims + Mains + Interview', type: 'deep-dive', order: 2 },
      { id: 'speed', title: 'The Speed Equation', type: 'zing-moment', order: 3 },
      { id: 'banking', title: 'Banking Awareness Crash Course', type: 'resources', order: 4 },
    ],
    mood: { career: 'discovery', pattern: 'neutral', speed: 'achievement', banking: 'neutral' },
  },
  {
    slug: 'upsc-optional-subject-guide',
    title: 'Choosing Your UPSC Optional Subject',
    subtitle: 'The decision that can make or break your rank',
    quickShotSummary: 'UPSC optional carries 500 marks (2 papers). Popular choices: Sociology (short syllabus), Geography (overlap with GS), PSIR (polity overlap), Public Admin (governance overlap). Choose based on: interest, overlap with GS, scoring trend, and material availability.',
    description: 'Your UPSC optional subject choice is a strategic decision worth 500 marks. Data-driven analysis of which subjects score best.',
    universe: 'BATTLE_GROUND', subWorld: 'upsc', difficulty: 'INTERMEDIATE', readTimeMinutes: 13,
    tags: ['upsc', 'optional', 'strategy', 'sociology', 'geography'],
    examTags: ['UPSC-MAINS'],
    sources: ['https://www.upsc.gov.in/'],
    content: {
      summary: 'UPSC optional = 500 marks. Choose based on interest + GS overlap + scoring trend + available mentors.',
      keyFacts: ['Optional subject carries 500/2025 marks in Mains — the single biggest subject', 'Sociology is most popular (short syllabus, decent scoring)', 'Geography optional has max overlap with GS-1', 'Anthropology has historically highest average scores'],
      desiAnalogies: [
        { id: 'ipl', analogy: 'IPL Auction — Optional = Your Power Player', explanation: 'Choosing an optional is like buying a power player in IPL auction — it should complement your existing team (GS strengths), fit the pitch (exam trend), and have a proven track record. Don\'t chase hype, chase compatibility.', emoji: '🏏' },
        { id: 'arranged', analogy: 'Arranged Marriage Due Diligence', explanation: 'Choosing an optional needs the same rigor as arranged marriage due diligence: compatibility (interest), family approval (mentor availability), long-term potential (scoring trend), and location (study material access).', emoji: '🤝' },
      ],
      memes: [
        { id: 'm1', text: 'Friends: "Take Sociology, everyone does"\nMe: *takes History*\nHistory syllabus: *2500 years of content*\nMe: 😱', context: 'Optional subject choice regret is real' },
        { id: 'm2', text: 'UPSC: "You can choose any subject"\nEveryone in 2024: Sociology, Geography, PSIR, Pub Ad\nOther 27 optionals: "Am I a joke to you?" 😤', context: '4 subjects dominate 70% of optional choices' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Optional Subject', to: 'UPSC Preparation', insight: 'Your optional should overlap with at least 2 GS papers. Geography optional → GS1 geography + GS3 environment. Sociology → GS1 society + GS2 governance. Smart overlap = less study time.' },
        { id: 'c2', from: 'Scoring Trend', to: 'UPSC Mains Strategy', insight: 'Average optional scores vary by 30-40 marks across subjects. Anthropology averages 290/500 while Literature subjects average 240/500. Data-driven choice can boost your rank by 200 positions.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Before choosing: read the syllabus of top 3 options completely, study 1 chapter of each, and attempt 5 previous year questions. This "test drive" saves months of wrong-subject pain.', category: 'DECISION' },
        { id: 't2', tip: 'Talk to 3 toppers who took your shortlisted optional. Ask about scoring trend, study hours needed, and common pitfalls. First-hand experience beats coaching advice.', category: 'RESEARCH' },
      ],
    },
    sections: [
      { id: 'stakes', title: 'The 500-Mark Decision', type: 'story', order: 1 },
      { id: 'compare', title: 'Top 6 Optionals Compared', type: 'comparison', order: 2 },
      { id: 'data', title: 'The Data-Driven Choice', type: 'zing-moment', order: 3 },
      { id: 'common', title: 'Common Mistakes in Choosing', type: 'resources', order: 4 },
    ],
    mood: { stakes: 'war', compare: 'neutral', data: 'achievement', common: 'war' },
  },
  {
    slug: 'exam-time-management',
    title: 'Exam Time Management — The Universal Skill',
    subtitle: 'The 3-hour game that decides your future',
    quickShotSummary: 'Time management = attempt strategy + question selection + speed control. Rule of thumb: marks available ÷ time = marks per minute. For CBSE: 1 mark/min. For JEE: 1.67 marks/min. For UPSC Prelims: 1 mark/min. Always attempt easy questions first.',
    description: 'The difference between a 90% scorer and a 70% scorer isn\'t knowledge — it\'s time management. Works for every exam: boards, JEE, UPSC, CAT, SSC.',
    universe: 'BATTLE_GROUND', subWorld: 'jee-neet', difficulty: 'BEGINNER', readTimeMinutes: 10,
    tags: ['time-management', 'exam-strategy', 'speed', 'attempt-strategy', 'marks'],
    examTags: ['CBSE-10', 'CBSE-12', 'JEE-MAINS', 'NEET', 'UPSC-PRELIMS'],
    sources: ['https://www.nta.ac.in/'],
    content: {
      summary: 'Marks/minute ratio, 3-pass strategy (easy→medium→hard), skip rules, and speed practice.',
      keyFacts: ['Attempting all questions boosts score by 10-15% even with some wrong', 'First 60% of time should cover 80% of easy questions', 'Negative marking traps: skip if less than 50% confident', 'Speed improves 30% with just 3 weeks of timed practice'],
      desiAnalogies: [
        { id: 'buffet', analogy: 'Buffet Eating Strategy', explanation: 'Exam = buffet with a time limit. First pass: load up on favorites (easy questions). Second pass: try medium dishes. Third pass: exotic items (hard questions). Don\'t spend 20 minutes deciding on dessert while main course gets cold!', emoji: '🍽️' },
        { id: 'auto-meter', analogy: 'Auto Meter Running', explanation: 'Every exam has a meter running — marks per minute. JEE meter: 1.67 marks/min. If you spend 5 minutes on a 4-mark question, the meter shows you\'re losing money. Cut your losses, move on!', emoji: '🛺' },
      ],
      memes: [
        { id: 'm1', text: 'Time left: 30 minutes\nQuestions left: 40\nMe: *speedrun mode activated* 🏃💨\n\nProTip: Don\'t reach this point. Pace from the start.', context: 'Last-minute panic is the result of poor time management' },
        { id: 'm2', text: 'Easy question: 2 minutes ✅\nMedium question: 5 minutes 🤔\nHard question: 15 minutes, wrong answer, tears ❌😭\n\nThe hard question cost you 3 easy questions.', context: 'Opportunity cost of spending too long on hard questions' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Time Management', to: 'CBSE Board Strategy', insight: 'CBSE gives exactly 1 mark per minute. If a 5-mark question takes more than 5 minutes, you\'re in time debt. This simple math applies to every board exam.' },
        { id: 'c2', from: 'Speed Practice', to: 'CAT Exam', insight: 'CAT is the ultimate speed test (66 questions in 2 hours). CAT toppers finish with 5+ minutes to spare. Speed comes from practice, not raw intelligence.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The 3-Pass Strategy: Pass 1 — attempt everything you can solve in under expected time. Pass 2 — attempt medium questions. Pass 3 — attempt hard ones with remaining time.', category: 'UNIVERSAL' },
        { id: 't2', tip: 'Buy a ₹50 analog watch for exams (phones not allowed). Divide the dial into sections per question paper section. Glance at the watch every 15 minutes to pace yourself.', category: 'HACK' },
      ],
    },
    sections: [
      { id: 'cost', title: 'The Hidden Cost of One Hard Question', type: 'story', order: 1 },
      { id: 'math', title: 'The Marks-Per-Minute Math', type: 'deep-dive', order: 2 },
      { id: 'pass', title: 'The 3-Pass Strategy', type: 'zing-moment', order: 3 },
      { id: 'practice', title: 'Speed Training Exercises', type: 'hands-on', order: 4 },
    ],
    mood: { cost: 'war', math: 'neutral', pass: 'achievement', practice: 'neutral' },
  },
  {
    slug: 'upsc-current-affairs-strategy',
    title: 'UPSC Current Affairs — The Smart Way',
    subtitle: 'Don\'t read everything — read what matters',
    quickShotSummary: 'UPSC current affairs: 30-40% of Prelims questions come from last 12 months. Sources: The Hindu + PIB + Yojana magazine. Focus on: government schemes, international events with India angle, Supreme Court judgments, environment/ecology, science & tech.',
    description: 'Current affairs overwhelm aspirants daily. Here\'s the filter: what UPSC actually asks, which sources to trust, and how to make notes that stick.',
    universe: 'BATTLE_GROUND', subWorld: 'upsc', difficulty: 'INTERMEDIATE', readTimeMinutes: 12,
    tags: ['upsc', 'current-affairs', 'newspaper', 'the-hindu', 'prelims'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS'],
    sources: ['https://www.thehindu.com/', 'https://pib.gov.in/'],
    content: {
      summary: 'UPSC current affairs: The Hindu + PIB + monthly magazines. Filter by syllabus relevance. Make weekly consolidated notes.',
      keyFacts: ['30-40% of Prelims questions are current affairs based', 'The Hindu editorial section is the most UPSC-relevant newspaper section', 'PIB (Press Information Bureau) is the government\'s official news source', 'Monthly compilation > daily notes for revision efficiency'],
      desiAnalogies: [
        { id: 'filter', analogy: 'Water Filter for News', explanation: 'Daily news is like tap water — full of everything. UPSC current affairs preparation needs a filter: The Hindu (first filter), syllabus relevance check (second filter), note-making (purified water). Don\'t drink raw news!', emoji: '🚰' },
        { id: 'thali', analogy: 'News Thali', explanation: 'The Hindu = rice (staple, daily). PIB = government sabzi (schemes, policies). Yojana magazine = monthly special dish. Indian Express opinion = dessert (additional perspective). Balanced thali, balanced preparation.', emoji: '🍽️' },
      ],
      memes: [
        { id: 'm1', text: 'UPSC aspirant reading The Hindu:\n*marks 30 articles as important*\n*makes notes of 20*\n*UPSC asks about the 1 article you skipped*\n😤', context: 'UPSC has a talent for asking what you didn\'t prepare' },
        { id: 'm2', text: 'Day 1: "I\'ll read 5 sources daily"\nDay 7: "The Hindu is enough"\nDay 30: "Just the editorial is fine"\nDay 90: *reads only headlines* 📰😅', context: 'Current affairs burnout is real — build sustainable habits' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Current Affairs', to: 'UPSC Geography', insight: 'Every natural disaster, climate summit, and environmental report connects current affairs to geography. One article can prepare you for both Prelims GK and Mains GS-1.' },
        { id: 'c2', from: 'Government Schemes', to: 'UPSC Ethics', insight: 'Government welfare schemes appear in Ethics case studies — "You\'re a district officer implementing PM Awas Yojana..." Knowing the scheme = knowing the case study context.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The 30-minute Hindu routine: Page 1 headlines (5 min) → Editorial (10 min) → Explain/Analysis section (10 min) → Economy page (5 min). Skip sports, entertainment, city-specific news.', category: 'DAILY' },
        { id: 't2', tip: 'Make weekly consolidated notes (not daily). Every Sunday, merge 7 days of current affairs into one organized note. This is 10x more revise-friendly.', category: 'NOTE-MAKING' },
      ],
    },
    sections: [
      { id: 'overwhelm', title: 'The Current Affairs Overwhelm', type: 'story', order: 1 },
      { id: 'sources', title: 'Sources — What to Read, What to Skip', type: 'deep-dive', order: 2 },
      { id: 'filter', title: 'The UPSC Relevance Filter', type: 'zing-moment', order: 3 },
      { id: 'notes', title: 'Note-Making That Sticks', type: 'hands-on', order: 4 },
    ],
    mood: { overwhelm: 'war', sources: 'neutral', filter: 'achievement', notes: 'neutral' },
  },
  {
    slug: 'cat-dilr-strategy',
    title: 'CAT DILR — Logic That Bends Your Brain',
    subtitle: 'The section nobody can predict',
    quickShotSummary: 'CAT DILR (Data Interpretation & Logical Reasoning) is the most unpredictable section. Types: set-based puzzles (arrangements, blood relations), data tables, charts, games theory. Strategy: practice 100+ set types, skip unsolvable sets quickly.',
    description: 'DILR separates CAT toppers from the rest. The section is impossible to master from textbooks — only practice builds the intuition.',
    universe: 'BATTLE_GROUND', subWorld: 'cat-mba', difficulty: 'ADVANCED', readTimeMinutes: 12,
    tags: ['cat', 'dilr', 'logic', 'data-interpretation', 'puzzles'],
    examTags: ['CAT-DILR'],
    sources: ['https://iimcat.ac.in/'],
    content: {
      summary: 'CAT DILR: set-based puzzles, data tables, logic games. Practice 100+ sets. Skip wisely. Time = scarce resource.',
      keyFacts: ['DILR has the lowest average scores across all CAT sections', 'Each set has 4-6 questions — all-or-nothing approach works best', 'Attempting 3-4 sets well beats attempting 5 sets poorly', 'DILR topics are unpredictable — new puzzle types appear every year'],
      desiAnalogies: [
        { id: 'puzzle', analogy: 'Rubik\'s Cube Competition', explanation: 'DILR is like a Rubik\'s Cube competition — you get a new puzzle each time, time is limited, and practice builds pattern recognition more than theory. The person who\'s solved 1000 cubes spots patterns the newcomer can\'t.', emoji: '🧩' },
        { id: 'detective', analogy: 'CID Detective Reasoning', explanation: 'DILR sets are like CID cases — gather clues (data), eliminate suspects (wrong options), connect evidence (data points), and solve the case (answer). Logical deduction, not calculation!', emoji: '🔍' },
      ],
      memes: [
        { id: 'm1', text: 'CAT DILR set: "5 friends sit in a circle. A is not next to B. C is 2 seats from D..."\nMe: *draws 47 diagrams*\n*15 minutes later*\n*gets 1 out of 4 correct* 😎💀', context: 'DILR sets consume disproportionate time' },
        { id: 'm2', text: 'DILR in mock test: Easy, scored 95%ile\nDILR in actual CAT: WHAT IS THIS\nCAT creators: *evil laugh* 😈', context: 'CAT DILR difficulty is notoriously unpredictable' },
      ],
      zingConnections: [
        { id: 'c1', from: 'CAT DILR', to: 'System Design', insight: 'DILR builds the same analytical thinking needed for system design — breaking complex problems into components, identifying constraints, and optimizing within limits.' },
        { id: 'c2', from: 'Logic Puzzles', to: 'Programming', insight: 'DILR puzzles train the same logical thinking as debugging code — systematic elimination, constraint satisfaction, and pattern matching. CAT prep makes you a better programmer!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Spend first 3 minutes scanning ALL sets. Identify the 3-4 easiest ones. Attempt ONLY those. Leaving 2 sets unattempted is better than getting all wrong.', category: 'STRATEGY' },
        { id: 't2', tip: 'Practice one DILR set daily for 3 months (90 sets). Not from CAT prep books — use actual CAT, XAT, NMAT previous year papers. Real sets beat practice sets.', category: 'PRACTICE' },
      ],
    },
    sections: [
      { id: 'fear', title: 'Why Everyone Fears DILR', type: 'story', order: 1 },
      { id: 'types', title: 'The 10 Set Types You\'ll See', type: 'deep-dive', order: 2 },
      { id: 'skip', title: 'The Art of Skipping', type: 'zing-moment', order: 3 },
      { id: 'daily', title: 'The 1-Set-Per-Day Challenge', type: 'hands-on', order: 4 },
    ],
    mood: { fear: 'war', types: 'neutral', skip: 'achievement', daily: 'neutral' },
  },
];

// ═══════════════════════════════════════════
// PLACEHOLDER: CAREER topics will be added below
// ═══════════════════════════════════════════

const CAREER: TopicSeed[] = [
  {
    slug: 'resume-that-gets-interviews',
    title: 'The Resume That Gets Interviews',
    subtitle: 'From "applied 100, heard from 0" to "3 interviews this week"',
    quickShotSummary: 'Resume rules: 1 page max, ATS-friendly format (no columns/graphics), quantify achievements (increased X by Y%), tailor for each role. Use action verbs + numbers. Top third of resume = most important. Skills section must match job keywords.',
    description: 'Most resumes get 7 seconds of human attention after passing through ATS bots. Here\'s how to survive both filters.',
    universe: 'CAREER', subWorld: 'interviews', difficulty: 'BEGINNER', readTimeMinutes: 10,
    tags: ['resume', 'job-search', 'ats', 'career', 'hiring'],
    examTags: [],
    sources: ['https://www.linkedin.com/'],
    content: {
      summary: '1 page, ATS-friendly, quantified achievements, tailored keywords. Your resume is a marketing document, not a biography.',
      keyFacts: ['75% of resumes are rejected by ATS before a human sees them', 'Recruiters spend average 7 seconds on first resume scan', 'Quantified achievements get 40% more interview callbacks', 'Most effective resume format: reverse chronological'],
      desiAnalogies: [
        { id: 'shaadi', analogy: 'Matrimony Profile', explanation: 'Your resume is like a Shaadi.com profile — first impression matters, keep it crisp, highlight your best qualities upfront, and tailor it for the audience (company). Nobody reads a 5-page biodata. One page. Maximum impact.', emoji: '💍' },
        { id: 'menu', analogy: 'Restaurant Menu Design', explanation: 'Best restaurants have 1-page menus with clear categories and highlights. Your resume should work the same: clear sections (Experience, Skills, Education), highlighted specialties (achievements), easy to scan in seconds.', emoji: '📋' },
      ],
      memes: [
        { id: 'm1', text: 'Resume: "Proficient in MS Office"\nEvery applicant ever: *adds same line*\nRecruiter: 📄🗑️\n\nSay this instead: "Built automated Excel dashboard tracking 50K+ records"', context: 'Generic skills versus quantified achievements' },
        { id: 'm2', text: 'Applied to 200 jobs ❌\nApplied to 20 tailored jobs ✅✅✅\n\nSpray and pray is dead. Sniper approach wins.', context: 'Quality over quantity in job applications' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Resume Keywords', to: 'First Tech Interview', insight: 'The keywords on your resume become interview questions. If you list "React hooks" on your resume, expect a "Tell me about useState vs useReducer" question. Only list what you can defend!' },
        { id: 'c2', from: 'ATS Optimization', to: 'SEO Basics', insight: 'ATS keyword matching works exactly like Google SEO — match the job description "keywords" in your resume content. Think of your resume as a web page and the job description as the search query.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Copy the job description into a word cloud tool. The biggest words are the keywords ATS is scanning for. Include those exact words in your resume.', category: 'ATS-HACK' },
        { id: 't2', tip: 'Formula for achievements: "Action Verb + What You Did + Quantified Result." E.g., "Reduced API response time by 60% (800ms → 320ms) serving 10K daily users."', category: 'WRITING' },
      ],
    },
    sections: [
      { id: 'problem', title: 'Why Your Resume Gets Ignored', type: 'story', order: 1 },
      { id: 'ats', title: 'Beating the ATS Robot', type: 'deep-dive', order: 2 },
      { id: 'formula', title: 'The Achievement Formula', type: 'zing-moment', order: 3 },
      { id: 'templates', title: 'Resume Templates That Work', type: 'resources', order: 4 },
    ],
    mood: { problem: 'war', ats: 'neutral', formula: 'achievement', templates: 'neutral' },
  },
  {
    slug: 'salary-negotiation-india',
    title: 'Salary Negotiation — The Indian Guide',
    subtitle: 'Stop leaving lakhs on the table',
    quickShotSummary: 'Never reveal your current salary first. Research market rates (Glassdoor, Levels.fyi). Counter-offer with data. Negotiate total comp: base + bonus + stocks + benefits. The best time to negotiate is after the offer, before signing. Silence is a power tool.',
    description: 'Indian professionals lose ₹5-15 lakhs per year by not negotiating. Here\'s the science of getting what you\'re worth without burning bridges.',
    universe: 'CAREER', subWorld: 'soft-skills', difficulty: 'INTERMEDIATE', readTimeMinutes: 12,
    tags: ['salary', 'negotiation', 'career', 'compensation', 'india'],
    examTags: [],
    sources: ['https://www.glassdoor.co.in/', 'https://www.levels.fyi/'],
    content: {
      summary: 'Research market rates, don\'t reveal current salary, counter with data, negotiate total comp, use strategic silence.',
      keyFacts: ['Only 37% of Indians negotiate their first offer', 'Salary negotiation adds ₹3-10 lakh on average', 'Companies budget 10-20% above initial offer for negotiation', 'Negotiating is expected — not negotiating signals low confidence'],
      desiAnalogies: [
        { id: 'bazaar', analogy: 'Sarojini Nagar Bargaining', explanation: 'Salary negotiation = Sarojini Nagar shopping. The sticker price (first offer) is NEVER the final price. The seller (company) has margins built in. If you pay sticker price, you overpaid. Counter-offer, walk away power, bundle deals — same skills!', emoji: '🛍️' },
        { id: 'cricket', analogy: 'IPL Player Retention', explanation: 'In IPL retention, players with data (performance stats) command premium prices. Same in salary negotiation — bring your performance numbers (revenue generated, users impacted, projects delivered) and let data negotiate for you.', emoji: '🏏' },
      ],
      memes: [
        { id: 'm1', text: 'HR: "What\'s your expected salary?"\nMe: "The market rate for this role"\nHR: "But what\'s YOUR expected salary?"\nMe: "What\'s the BUDGET for this role?" 🤝\n\nReverse the question.', context: 'Never answer first — whoever names a number first usually loses' },
        { id: 'm2', text: 'Month 1: "I\'m grateful for any offer"\nMonth 2: *discovers colleague earns 40% more for same role*\nMonth 3: *starts negotiating for next offer* 😤', context: 'Pay disparity motivates future negotiation' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Salary Negotiation', to: 'First Tech Interview', insight: 'Interview performance and negotiation skill are separate skills. Many great interviewers accept 20% below market because they don\'t negotiate. Master both for maximum career value.' },
        { id: 'c2', from: 'Negotiation', to: 'Startup Equity', insight: 'Startup offers have more negotiation room — equity, joining bonus, title, WFH days, learning budget. When base salary is firm, negotiate the package peripherals.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Use Glassdoor + Levels.fyi + LinkedIn salary insights to find the 50th, 75th, and 90th percentile for your role. Ask for the 75th percentile with data.', category: 'RESEARCH' },
        { id: 't2', tip: 'After receiving an offer, say: "Thank you, I\'m excited. I need 48 hours to review." This creates space for a written counter-offer, which is more effective than verbal.', category: 'TACTIC' },
      ],
    },
    sections: [
      { id: 'money', title: 'The Money You\'re Leaving Behind', type: 'story', order: 1 },
      { id: 'prep', title: 'Research Before You Negotiate', type: 'deep-dive', order: 2 },
      { id: 'script', title: 'The Negotiation Script', type: 'zing-moment', order: 3 },
      { id: 'mistakes', title: 'Top 5 Negotiation Mistakes', type: 'resources', order: 4 },
    ],
    mood: { money: 'war', prep: 'neutral', script: 'achievement', mistakes: 'war' },
  },
  {
    slug: 'linkedin-profile-optimization',
    title: 'LinkedIn Profile That Attracts Recruiters',
    subtitle: 'Your 24/7 networking agent',
    quickShotSummary: 'LinkedIn optimization: Professional photo (65% more views), headline with keywords (not just job title), About section telling your career story, Featured section with work samples. Post weekly for visibility. Network = Net worth in job market.',
    description: 'LinkedIn is where 90% of tech hiring starts. Optimize your profile to become a recruiter magnet instead of a job chaser.',
    universe: 'CAREER', subWorld: 'interviews', difficulty: 'BEGINNER', readTimeMinutes: 10,
    tags: ['linkedin', 'personal-branding', 'networking', 'job-search', 'career'],
    examTags: [],
    sources: ['https://www.linkedin.com/'],
    content: {
      summary: 'Pro photo, keyword-rich headline, story-based About, weekly posts, featured section with portfolio. Be found, don\'t just search.',
      keyFacts: ['Profiles with photos get 21x more views', 'Custom headline gets 35% more search appearances', 'Posting weekly increases profile views by 5x', 'Recruiters search by skills keywords — list top 50 skills'],
      desiAnalogies: [
        { id: 'shop', analogy: 'Shop Sign vs Product', explanation: 'Your LinkedIn headline is the shop sign — "Full Stack Developer | React | Node.js" tells passing recruiters what you sell. Your About section is walking into the shop — it should tell your story and make them want to hire you.', emoji: '🏪' },
        { id: 'cricket', analogy: 'Cricket Stats Card', explanation: 'A cricketer\'s selection depends on their stats card — batting average, strike rate, recent form. Your LinkedIn is your career stats card — experience, skills, recommendations, activity. Selectors (recruiters) check stats before picking players.', emoji: '🏏' },
      ],
      memes: [
        { id: 'm1', text: 'LinkedIn headline: "Passionate about innovation and synergy"\nRecruiter: *scrolls past*\n\nLinkedIn headline: "React Developer | Built app used by 50K users"\nRecruiter: *clicks* 🎯', context: 'Specific keywords beat generic buzzwords' },
        { id: 'm2', text: '"I don\'t post on LinkedIn because it\'s cringe"\nAlso them: "Why am I not getting interview calls?"\n\nPosting → Visibility → Opportunities. Simple math. 📊', context: 'LinkedIn activity directly correlates with inbound opportunities' },
      ],
      zingConnections: [
        { id: 'c1', from: 'LinkedIn Optimization', to: 'Resume Building', insight: 'Your LinkedIn and resume should tell the same story with different formats. LinkedIn = expanded narrative. Resume = compressed highlights. Keep them consistent — recruiters check both.' },
        { id: 'c2', from: 'Personal Branding', to: 'Open Source Contribution', insight: 'Sharing your open source contributions on LinkedIn multiplies their career impact. A GitHub contribution + LinkedIn post = 10x the networking value of either alone.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Headline formula: "Role | Top Skill 1 | Top Skill 2 | Unique Value." E.g., "Full Stack Developer | React & Node.js | Building SaaS Products | Ex-Flipkart"', category: 'HEADLINE' },
        { id: 't2', tip: 'Add 500+ connections (quality over quantity, but minimum 500 unlocks search visibility). Connect with recruiters, alumni, industry professionals in your target companies.', category: 'NETWORKING' },
      ],
    },
    sections: [
      { id: 'invisible', title: 'Are You Invisible to Recruiters?', type: 'story', order: 1 },
      { id: 'profile', title: 'Section-by-Section Profile Makeover', type: 'deep-dive', order: 2 },
      { id: 'keywords', title: 'The Keyword Discovery', type: 'zing-moment', order: 3 },
      { id: 'posting', title: 'What to Post and When', type: 'resources', order: 4 },
    ],
    mood: { invisible: 'war', profile: 'neutral', keywords: 'achievement', posting: 'discovery' },
  },
  {
    slug: 'startup-idea-validation',
    title: 'Startup Idea Validation — Before You Build',
    subtitle: 'Don\'t build a product nobody wants',
    quickShotSummary: 'Validate before building: Talk to 50 potential users, identify their #1 pain point, check if they\'d pay to solve it. Build MVP in 2-4 weeks. Measure: landing page signups, pre-orders, letter of intent. 90% of startups fail because they solve imaginary problems.',
    description: 'The biggest startup mistake: building first, validating later. Flip the order and save months of wasted effort.',
    universe: 'CAREER', subWorld: 'startup', difficulty: 'INTERMEDIATE', readTimeMinutes: 12,
    tags: ['startup', 'validation', 'mvp', 'product', 'entrepreneurship'],
    examTags: [],
    sources: ['https://www.ycombinator.com/library'],
    content: {
      summary: 'Talk to 50 users, find real pain points, test willingness to pay, build MVP in 2-4 weeks, measure traction.',
      keyFacts: ['90% of startups fail — 42% because of no market need', 'Talking to 50 potential users costs ₹0 and saves months', 'The "Mom Test": don\'t tell people your idea, ask about their problems', 'A landing page with waitlist is the fastest validation method'],
      desiAnalogies: [
        { id: 'stall', analogy: 'Chai Stall Pilot', explanation: 'Starting a startup without validation is like opening a chai stall without checking if the location has foot traffic. Smart chai-wallahs stand at a corner for 3 days and count potential customers before investing. Validate the location (market) first!', emoji: '☕' },
        { id: 'arranged', analogy: 'Rishta Due Diligence', explanation: 'Indian families do thorough due diligence before rishta (background, family, stability). Apply the same rigor to your startup idea — market research, competitor analysis, customer interviews, financial viability check.', emoji: '🤝' },
      ],
      memes: [
        { id: 'm1', text: 'Me: "I have an amazing startup idea!"\nInvestor: "Have you talked to any customers?"\nMe: "No, but trust me, people need this"\nInvestor: 🚪👋\n\nCustomer discovery > Founder intuition', context: 'Founders overvalue their own ideas' },
        { id: 'm2', text: 'Month 1-3: Building the perfect product\nMonth 4: Launch day! 🚀\nMonth 5: 3 users\nMonth 6: "Maybe I should have validated first" 😅', context: 'Building before validating is the #1 startup mistake' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Idea Validation', to: 'Product Management', insight: 'The validation process IS product management — user research, problem discovery, solution hypotheses, testing. Learning to validate ideas makes you a better PM, regardless of startup outcome.' },
        { id: 'c2', from: 'MVP Building', to: 'React & Next.js', insight: 'A well-structured Next.js app can be your MVP — server-rendered landing page, API routes for signups, Vercel deployment in minutes. Full-stack JS makes rapid validation possible.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The "Mom Test" rule: Never say "I have an idea for X, would you use it?" Instead ask: "Tell me about the last time you faced [problem]. How did you solve it? How much did it cost you?"', category: 'INTERVIEWING' },
        { id: 't2', tip: 'Build a one-page landing page describing the solution, add a "Join Waitlist" button. If 100 visitors → 10+ signups, the idea has legs. Costs ₹0 with Vercel free tier.', category: 'MVP' },
      ],
    },
    sections: [
      { id: 'graveyard', title: 'The Startup Graveyard', type: 'story', order: 1 },
      { id: 'talk', title: 'How to Talk to Users', type: 'deep-dive', order: 2 },
      { id: 'test', title: 'The ₹0 Validation Test', type: 'zing-moment', order: 3 },
      { id: 'mvp', title: 'MVP in 2 Weeks Playbook', type: 'hands-on', order: 4 },
    ],
    mood: { graveyard: 'war', talk: 'neutral', test: 'achievement', mvp: 'discovery' },
  },
  {
    slug: 'personal-finance-beginners',
    title: 'Personal Finance for Young Indians',
    subtitle: 'The money guide your school never taught',
    quickShotSummary: '50-30-20 rule: 50% needs, 30% wants, 20% savings/investments. Start SIP in index funds (Nifty 50) with ₹500/month. Emergency fund = 6 months expenses. Don\'t buy insurance as investment. Term insurance + health insurance = must-have before investing.',
    description: 'Personal finance simplified for 20-somethings in India. From first salary to first investment, no jargon, just action.',
    universe: 'CAREER', subWorld: 'finance', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['personal-finance', 'investment', 'sip', 'mutual-funds', 'india'],
    examTags: [],
    sources: ['https://www.amfiindia.com/'],
    content: {
      summary: '50-30-20 budgeting, SIP in index funds, emergency fund first, insurance before investment, compounding magic.',
      keyFacts: ['₹5000/month SIP in Nifty 50 for 20 years ≈ ₹50+ lakhs at 12% CAGR', 'Only 3% of Indians invest in mutual funds', 'Credit card debt costs 36-42% interest — financial emergency', 'Term insurance of ₹1 crore costs only ₹700/month at age 25'],
      desiAnalogies: [
        { id: 'dabba', analogy: 'Tiffin Dabba Finance', explanation: '50-30-20 budget is like a 3-compartment tiffin: sabzi (needs, 50%), rice (wants, 30%), dal (savings/investments, 20%). Every month, fill the tiffin before eating. Empty dal compartment = financial malnutrition.', emoji: '🍱' },
        { id: 'tree', analogy: 'Peepal Tree Compounding', explanation: 'Compound interest is like a Peepal tree — plant it early (₹500 SIP at 22), ignore it for 20 years, and you have a massive tree giving shade (₹50 lakhs+). Plant at 32? Shade comes 10 years later and smaller.', emoji: '🌳' },
      ],
      memes: [
        { id: 'm1', text: 'Salary: ₹50,000\nRent: ₹15,000\nFood/Transport: ₹10,000\nOnline shopping: ₹20,000\nSavings: ₹5,000\n\n"Where does my money go?" 🤔', context: 'Lifestyle inflation eats savings' },
        { id: 'm2', text: 'Uncle: "LIC lelo, best investment hai"\nActual return: 4-5% (below inflation)\n\nIndex fund return: 12-15% CAGR\n\nPlease. Do the math. 📊', context: 'Traditional investment advice is often wrong' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Personal Finance', to: 'Startup Equity', insight: 'Understanding personal finance is essential before joining a startup for equity. Stock options are only valuable if you understand vesting, exercise price, tax implications, and dilution.' },
        { id: 'c2', from: 'Compounding', to: 'Mathematics', insight: 'Compound interest (A = P(1+r/n)^nt) is probably the most practically useful math formula. Understanding exponential growth changes how you think about money, career, and learning.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Day 1 of salary: auto-transfer 20% to a separate savings account. What you don\'t see, you don\'t spend. This single automation builds wealth.', category: 'AUTOMATION' },
        { id: 't2', tip: 'Start a ₹500/month SIP in Nifty 50 index fund TODAY. Not next month, not after research. The best time was 5 years ago. The second best time is now.', category: 'ACTION' },
      ],
    },
    sections: [
      { id: 'problem', title: 'Why Are We Broke at Month-End?', type: 'story', order: 1 },
      { id: 'budget', title: 'The 50-30-20 Tiffin System', type: 'deep-dive', order: 2 },
      { id: 'compound', title: 'When Compounding Clicks', type: 'zing-moment', order: 3 },
      { id: 'start', title: 'Your First Investment — Today', type: 'hands-on', order: 4 },
    ],
    mood: { problem: 'war', budget: 'neutral', compound: 'achievement', start: 'discovery' },
  },
  {
    slug: 'freelancing-india-guide',
    title: 'Freelancing in India — The Real Guide',
    subtitle: 'From side hustle to full-time income',
    quickShotSummary: 'Start freelancing: pick one skill (writing/design/dev/marketing), create 3 portfolio samples, start on Upwork/Fiverr. Pricing: start 20% below market, increase after 5-star reviews. Invoice with GST if earning 20L+/year. Track expenses for tax deductions.',
    description: 'Freelancing in India is booming — ₹1.5 lakh crore market. The honest guide to getting started, pricing, and scaling.',
    universe: 'CAREER', subWorld: 'startup', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['freelancing', 'side-hustle', 'income', 'upwork', 'self-employed'],
    examTags: [],
    sources: ['https://www.upwork.com/', 'https://www.fiverr.com/'],
    content: {
      summary: 'One skill, 3 portfolio samples, start on platforms, price competitively, build reputation, scale to direct clients.',
      keyFacts: ['India has 15 million freelancers — 2nd largest market globally', 'Average freelancer earns ₹15-25 per hour on platforms', 'Top Indian freelancers earn ₹2-5 lakhs per month', 'Direct clients pay 3-5x more than platform clients'],
      desiAnalogies: [
        { id: 'sabzi', analogy: 'Sabzi Mandi to Brand Store', explanation: 'Platform freelancing (Upwork/Fiverr) is like selling at Sabzi Mandi — high competition, low margins, but good for starting out and learning. Direct clients are like having your own brand store — higher prices, loyal customers, less competition. Graduate from Mandi to Store.', emoji: '🛒' },
        { id: 'auto', analogy: 'Auto to Uber', explanation: 'Starting a freelancing career is like going from auto-rickshaw (bidding for each ride) to Uber (clients come to you). Build reputation (ratings), increase prices (surge), and eventually clients just book you directly (premium tier).', emoji: '🛺' },
      ],
      memes: [
        { id: 'm1', text: 'Client: "I need a full website"\nBudget: ₹5,000\nMe: "That buys a Zomato order, not a website"\nClient: "But my nephew can do it for free"\nMe: "Then ask your nephew" 😌', context: 'Underpaying clients are everywhere — learn to say no' },
        { id: 'm2', text: 'Week 1 freelancing: "I\'ll work from the beach!"\nReality: *works from bed at 2 AM to meet deadline*\nBeach: 🏖️ *still waiting*', context: 'Freelancing freedom comes with responsibility' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Freelancing', to: 'React & Next.js', insight: 'Web development freelancing has the highest demand on Indian platforms. A React/Next.js developer with a good portfolio can earn ₹50-100/hour on Upwork within 6 months.' },
        { id: 'c2', from: 'Freelancing Income', to: 'Personal Finance', insight: 'Freelancers need separate savings discipline — irregular income + no employer benefits. Keep 3 months expenses as buffer + pay advance tax quarterly to avoid penalties.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Your first 5 projects should be priced 20% below market to get 5-star reviews. After 10 reviews, raise prices to market rate. Reviews are currency on platforms.', category: 'PRICING' },
        { id: 't2', tip: 'Create 3 impressive portfolio samples (even if for fictional clients). Nobody hires freelancers without seeing samples. Quality > quantity.', category: 'PORTFOLIO' },
      ],
    },
    sections: [
      { id: 'boom', title: 'India\'s Freelancing Boom', type: 'story', order: 1 },
      { id: 'start', title: 'Getting Your First Client', type: 'deep-dive', order: 2 },
      { id: 'price', title: 'The Pricing Revelation', type: 'zing-moment', order: 3 },
      { id: 'scale', title: 'From Platform to Direct Clients', type: 'resources', order: 4 },
    ],
    mood: { boom: 'discovery', start: 'neutral', price: 'achievement', scale: 'discovery' },
  },
  {
    slug: 'communication-skills-workplace',
    title: 'Workplace Communication — Stand Out Silently',
    subtitle: 'The promotion skill nobody teaches',
    quickShotSummary: 'Workplace communication: Write emails with clear subject lines (action + topic). Meetings: speak in the first 5 minutes. Slack: be concise, use threads. Presentations: 10-20-30 rule (10 slides, 20 min, 30pt font). Visibility = career growth.',
    description: 'Technical skills get you hired. Communication skills get you promoted. The workplace survival guide for Indian professionals.',
    universe: 'CAREER', subWorld: 'soft-skills', difficulty: 'BEGINNER', readTimeMinutes: 10,
    tags: ['communication', 'workplace', 'email', 'presentation', 'career-growth'],
    examTags: [],
    sources: ['https://hbr.org/'],
    content: {
      summary: 'Clear emails, early meeting contributions, concise messaging, structured presentations = professional visibility.',
      keyFacts: ['93% of communication is non-verbal (body language + tone)', 'Average professional sends 40 emails/day — yours better stand out', 'Speaking in the first 5 minutes of meetings increases perception of contribution by 80%', 'Top-performing employees are not the smartest — they communicate best'],
      desiAnalogies: [
        { id: 'diwali', analogy: 'Diwali Lights vs Diwali Cracker', explanation: 'Good communication is like Diwali lights — continuous, warm, visible. Bad communication is like crackers — loud, short, creates smoke. Be the lights: consistently clear, well-structured, pleasant to interact with.', emoji: '🪔' },
        { id: 'biryani', analogy: 'Biryani Layering', explanation: 'A good email/presentation is like biryani — layered properly. Subject line (aroma) hooks them in, first paragraph (top layer) gives the main point, details (middle layers) add depth, CTA (bottom layer) tells them what to do next.', emoji: '🍚' },
      ],
      memes: [
        { id: 'm1', text: 'Subject: "Hi"\nBody: *3 paragraphs before the actual request*\n\nSubject: "Action needed: Review PR #247 by Friday"\nBody: *direct, 3 lines*\n\nWhich email gets a response faster? 📧', context: 'Email subject lines predict response rates' },
        { id: 'm2', text: '8-person meeting:\n6 people: silent\n1 person: answers when asked\n1 person: speaks proactively\n\nGuess who gets the promotion? The same one who spoke up. 🗣️', context: 'Meeting participation = visibility = growth' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Written Communication', to: 'UPSC Answer Writing', insight: 'Structured writing (intro-body-conclusion) works everywhere — UPSC answers, work emails, project proposals, Slack messages. The skill is universally transferable.' },
        { id: 'c2', from: 'Presentation Skills', to: 'Teaching', insight: 'Great presenters are great teachers — they simplify complexity, use stories, and check understanding. Improving presentation skills automatically improves your ability to mentor and lead.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Email subject line formula: [Action/FYI/Request] + Topic + Deadline. E.g., "[Action] Review marketing budget — by Wed EOD". Gets opened and actioned fast.', category: 'EMAIL' },
        { id: 't2', tip: 'In your next meeting, prepare ONE question or ONE observation beforehand. Speak it in the first 5 minutes. This builds the habit of early contribution.', category: 'MEETINGS' },
      ],
    },
    sections: [
      { id: 'invisible', title: 'The Invisible Performer Problem', type: 'story', order: 1 },
      { id: 'email', title: 'Emails That Get Responses', type: 'deep-dive', order: 2 },
      { id: 'meeting', title: 'When Speaking Up Changes Everything', type: 'zing-moment', order: 3 },
      { id: 'present', title: 'Presentation Framework', type: 'resources', order: 4 },
    ],
    mood: { invisible: 'war', email: 'neutral', meeting: 'achievement', present: 'neutral' },
  },
  {
    slug: 'startup-equity-esop-guide',
    title: 'Startup Equity & ESOP — The Real Math',
    subtitle: 'Before you accept equity as compensation',
    quickShotSummary: 'ESOPs (Employee Stock Option Plans) have a vesting schedule (usually 4 years, 1-year cliff). Exercise price ≠ market value. Tax: perquisite tax on exercise + capital gains on sale. Most ESOPs become worthless (70% startups fail). Evaluate: company valuation, dilution risk, liquidity timeline.',
    description: 'Indian startups offer ESOPs as golden carrots. Understand the real math before you accept equity over cash.',
    universe: 'CAREER', subWorld: 'startup', difficulty: 'ADVANCED', readTimeMinutes: 14,
    tags: ['esop', 'equity', 'startup', 'compensation', 'vesting'],
    examTags: [],
    sources: ['https://cleartax.in/s/esop-taxation'],
    content: {
      summary: 'Vesting schedule, exercise price, dilution, tax implications, liquidity timeline. Equity is a lottery ticket — size your bet accordingly.',
      keyFacts: ['ESOPs vest over 4 years typically with 1-year cliff', 'Perquisite tax applies when you exercise — even before selling!', 'Startup equity is worth ₹0 until a liquidity event (IPO/acquisition)', 'Indian ESOP taxation changed in 2020 — tax on exercise, not vesting'],
      desiAnalogies: [
        { id: 'land', analogy: 'Zameen (Land) Deal', explanation: 'ESOPs are like buying land in a developing area — cheap today, potentially worth crores in 10 years, but could also become worthless if the area doesn\'t develop. Just like land, equity has ZERO liquidity until someone buys it.', emoji: '🏗️' },
        { id: 'wedding', analogy: 'Wedding Gift vs Cash Gift', explanation: 'Equity vs salary is like wedding gifts vs cash: equity is a fancy gift set (might be amazing, might be useless). Cash is cash — always useful. Don\'t accept fancy gifts instead of cash unless you can afford to.', emoji: '🎁' },
      ],
      memes: [
        { id: 'm1', text: 'Startup: "We\'re offering you 0.1% equity"\n0.1% of ₹1000 crore valuation = ₹1 crore! 🤑\n0.1% after 3 rounds of dilution = 0.02% = ₹20 lakhs\nAfter tax and exercise cost = ₹8 lakhs\nReality check! 📉', context: 'Dilution reduces your equity significantly over funding rounds' },
        { id: 'm2', text: 'Founder: "ESOPs are your ownership in the company!"\nFine print: 4-year vesting, 1-year cliff, bad-leaver clause, board approval needed for exercise\nMe: "So I own this... with conditions" 📜', context: 'ESOP terms are complex and often founder-friendly' },
      ],
      zingConnections: [
        { id: 'c1', from: 'ESOP Taxation', to: 'Personal Finance', insight: 'ESOPs are taxed twice in India: perquisite tax (up to 30%) when you exercise + capital gains tax when you sell. Many employees face surprise tax bills. Factor tax into ESOP value calculations.' },
        { id: 'c2', from: 'Startup Equity', to: 'Salary Negotiation', insight: 'When a startup offers equity instead of higher salary, calculate the expected value: (equity value × probability of liquidity event). If that\'s less than the salary difference, take the cash.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Ask these 5 questions: (1) Exercise price? (2) Latest 409A/FMV valuation? (3) Total shares outstanding? (4) Liquidation preferences? (5) Expected timeline to IPO/acquisition?', category: 'DUE-DILIGENCE' },
        { id: 't2', tip: 'Rule of thumb: Treat ESOP value as ₹0 for financial planning. If it pays off, treat it as bonus. Never take a pay cut that you can\'t sustain hoping equity will compensate.', category: 'MINDSET' },
      ],
    },
    sections: [
      { id: 'mirage', title: 'The Equity Mirage', type: 'story', order: 1 },
      { id: 'mechanics', title: 'How ESOPs Actually Work', type: 'deep-dive', order: 2 },
      { id: 'math', title: 'The ₹1 Crore That Became ₹8 Lakhs', type: 'zing-moment', order: 3 },
      { id: 'negotiate', title: 'Negotiating Your ESOP Package', type: 'resources', order: 4 },
    ],
    mood: { mirage: 'war', mechanics: 'neutral', math: 'achievement', negotiate: 'discovery' },
  },
  {
    slug: 'data-structures-interview-prep',
    title: 'DSA Interview Prep — The 50 Question Map',
    subtitle: 'The shortcut that 10x engineers use',
    quickShotSummary: 'Focus on 50 essential problems across: Arrays (10), Strings (5), LinkedList (5), Trees (10), Graphs (5), DP (10), Sorting/Searching (5). Pattern recognition beats question grinding. Key patterns: sliding window, two pointers, BFS/DFS, backtracking.',
    description: 'You don\'t need to solve 500 LeetCode problems. You need to master 50 problems that cover all patterns. Quality beats quantity.',
    universe: 'CAREER', subWorld: 'interviews', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['dsa', 'interview', 'leetcode', 'arrays', 'dynamic-programming'],
    examTags: [],
    sources: ['https://leetcode.com/', 'https://neetcode.io/'],
    content: {
      summary: '50 problems, 8 patterns. Arrays + Trees + DP = 60% of all interview questions. Pattern mastery > problem count.',
      keyFacts: ['FAANG interviews ask from a pool of ~200 patterns (not 2000+ problems)', 'Arrays and strings make up 40% of interview questions', 'Dynamic programming is asked in 15-20% of hard-level interviews', 'Explaining your approach matters more than the optimal solution'],
      desiAnalogies: [
        { id: 'jugaad', analogy: 'Pattern Jugaad', explanation: 'DSA patterns are like cooking recipes — once you know the "sliding window" recipe, every sliding window problem is just a flavor variation. Learn 8 recipes (patterns), cook infinite dishes (problems). Jugaad > brute force.', emoji: '🧑‍🍳' },
        { id: 'cricket', analogy: 'Net Practice vs Match', explanation: 'Solving 500 problems without analysis is like 500 balls in cricket nets without watching your technique. Quality practice (understanding patterns, analyzing failures) beats mindless repetition. 50 well-analyzed problems > 500 speed-solved ones.', emoji: '🏏' },
      ],
      memes: [
        { id: 'm1', text: 'LeetCode grinder: *solves 1000 problems*\nInterview: "Implement a rate limiter"\nThem: "That\'s not on LeetCode" 😰\n\nPattern thinker: "That\'s a sliding window + hashmap"\nSolved in 10 min ✅', context: 'Pattern recognition beats problem count' },
        { id: 'm2', text: 'Interviewer: "Can you optimize this?"\nMe: *adds a hashmap*\nOptimized! 🗺️\n\nFact: 60% of optimization answers involve adding a hashmap 😅', context: 'Hashmaps are the universal optimization tool' },
      ],
      zingConnections: [
        { id: 'c1', from: 'DSA Patterns', to: 'System Design', insight: 'DSA builds the foundation for system design — hash tables become distributed caches, trees become database indexes, graphs become network topologies. DSA is microservice thinking at the data structure level.' },
        { id: 'c2', from: 'Interview Prep', to: 'JavaScript Promises', insight: 'JavaScript-specific DSA questions test async thinking: implement Promise.all, debounce, throttle, event emitter. These are real-world DSA problems specific to frontend interviews.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The 50-problem roadmap: 10 Arrays + 5 Strings + 5 LinkedList + 10 Trees + 5 Graphs + 10 DP + 5 Sorting/Searching. Master these before moving to hard problems.', category: 'ROADMAP' },
        { id: 't2', tip: 'For every problem: solve it, then study the optimal solution, then re-solve from memory after 3 days. The "re-solve after 3 days" step is where real learning happens (spaced repetition).', category: 'RETENTION' },
      ],
    },
    sections: [
      { id: 'myth', title: 'The LeetCode Myth', type: 'story', order: 1 },
      { id: 'patterns', title: '8 Patterns That Cover Everything', type: 'deep-dive', order: 2 },
      { id: 'aha', title: 'When Pattern Recognition Clicks', type: 'zing-moment', order: 3 },
      { id: 'plan', title: 'The 50-Problem Roadmap', type: 'resources', order: 4 },
    ],
    mood: { myth: 'war', patterns: 'neutral', aha: 'achievement', plan: 'neutral' },
  },
  {
    slug: 'remote-work-india-guide',
    title: 'Remote Work in India — The Complete Guide',
    subtitle: 'Work from anywhere, earn like Bangalore',
    quickShotSummary: 'Remote work tips: Dedicated workspace (even a corner desk counts), camera-on meetings, async communication via docs/Slack, overlap at least 4 hours with team timezone. Tools: Notion + Slack + Loom + Zoom. Remote ≠ lazy; visibility matters more.',
    description: 'Remote work has transformed Indian tech careers. The playbook for staying productive, visible, and growing while working from home.',
    universe: 'CAREER', subWorld: 'industry-guides', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['remote-work', 'wfh', 'productivity', 'async', 'career'],
    examTags: [],
    sources: ['https://www.notion.so/'],
    content: {
      summary: 'Dedicated workspace, camera-on culture, async communication, timezone overlap, visible contributions.',
      keyFacts: ['70% of Indian tech companies offer hybrid/remote options post-2020', 'Remote workers report 22% higher productivity but 19% more loneliness', 'Over-communication is better than under-communication in remote work', 'Remote jobs from Indian companies pay 20-40% less than US remote roles'],
      desiAnalogies: [
        { id: 'joint-family', analogy: 'Joint Family WFH', explanation: 'Working from home in a joint family is India-specific challenge: parents watching TV, kids running, pressure cooker whistles on calls. Solution: negotiate a "do not disturb" zone (even a corner) + noise-canceling earphones + a sign on the door.', emoji: '🏠' },
        { id: 'dabba', analogy: 'Mumbai Dabba System', explanation: 'Remote async communication should work like Mumbai\'s dabba (tiffin) delivery system — precise, timely, no miscommunication. Write clear documents (the tiffin), deliver them on schedule (async updates), and trust the system to work without you watching.', emoji: '🍱' },
      ],
      memes: [
        { id: 'm1', text: 'Remote work expectation: *coding from a hill station* ⛰️\nRemote work reality: *bed → desk (2 steps) → bed again*\n\nThe discipline struggle is real. Shower and get dressed. Yes, really.', context: 'The freedom of remote work requires discipline' },
        { id: 'm2', text: '"You\'re on mute"\n"You\'re on mute"\n"YOU\'RE ON MUTE"\n\nThe three most common words in remote work 🔇🎙️', context: 'Universal remote work experience' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Remote Work', to: 'Freelancing', insight: 'Remote work skills transfer directly to freelancing — self-discipline, async communication, time management. Many remote employees freelance on the side or transition to full-time freelancing.' },
        { id: 'c2', from: 'Async Communication', to: 'Technical Writing', insight: 'Remote work makes writing your most important professional skill. Documents, Slack messages, emails — they\'re your primary interaction medium. Writing clearly = performing well remotely.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The "virtual commute" hack: take a 10-minute walk before and after work hours. This creates a mental boundary between work and personal time — the #1 remote work struggle.', category: 'BOUNDARIES' },
        { id: 't2', tip: 'Send a weekly "what I did" summary email to your manager every Friday. 3-5 bullet points. This solves the visibility problem that sinks remote careers.', category: 'VISIBILITY' },
      ],
    },
    sections: [
      { id: 'reality', title: 'Remote Work ≠ Easy Work', type: 'story', order: 1 },
      { id: 'setup', title: 'Setting Up for Success', type: 'deep-dive', order: 2 },
      { id: 'async', title: 'Async Communication Superpower', type: 'zing-moment', order: 3 },
      { id: 'career', title: 'Growing Your Career Remotely', type: 'resources', order: 4 },
    ],
    mood: { reality: 'war', setup: 'neutral', async: 'achievement', career: 'discovery' },
  },
  {
    slug: 'system-design-interview-guide',
    title: 'System Design Interview — The Framework',
    subtitle: 'From "I have no idea" to structured answers',
    quickShotSummary: 'System design framework: Requirements (5 min) → Estimation (5 min) → High-Level Design (10 min) → Deep Dive (15 min) → Bottlenecks (5 min). Key components: Load Balancer, CDN, Cache (Redis), DB (SQL vs NoSQL), Message Queue, Microservices.',
    description: 'System design interviews terrify candidates. But there\'s a framework that makes every question approachable. Here it is.',
    universe: 'CAREER', subWorld: 'interviews', difficulty: 'ADVANCED', readTimeMinutes: 16,
    tags: ['system-design', 'interview', 'architecture', 'scalability', 'backend'],
    examTags: [],
    sources: ['https://github.com/donnemartin/system-design-primer'],
    content: {
      summary: '5-step framework: Requirements → Estimation → High-Level Design → Deep Dive → Bottlenecks. Components: LB, CDN, Cache, DB, MQ.',
      keyFacts: ['System design interviews are 45-60 minutes — framework prevents wasting time', 'Interviewers test structured thinking more than specific knowledge', 'Always start with requirements clarification — never assume', 'CAP theorem (Consistency, Availability, Partition tolerance) applies to every design'],
      desiAnalogies: [
        { id: 'city', analogy: 'Designing a Smart City', explanation: 'System design is like designing a smart city: roads (network), traffic signals (load balancers), water tanks (caches), power grid (database), garbage collection (cleanup processes). Start with the big picture, then zoom into details.', emoji: '🏙️' },
        { id: 'irctc', analogy: 'IRCTC Tatkal = Scaling Problem', explanation: 'IRCTC on Tatkal day is a system design problem: 10 million users at 10 AM, limited inventory (seats), need queuing (message queue), caching (seat availability), and rate limiting. Most system design questions are just IRCTC at different scales!', emoji: '🚂' },
      ],
      memes: [
        { id: 'm1', text: 'Interviewer: "Design Twitter"\nMe: "It\'s a social media pla—"\nInterviewer: "What are the requirements?"\nMe: 😅\n\nLesson: ALWAYS clarify requirements first.', context: 'Jumping to solutions is the #1 system design mistake' },
        { id: 'm2', text: 'System design answer to everything:\n1. Add a cache ✅\n2. Use a message queue ✅\n3. Add a load balancer ✅\n4. ???\n5. "It scales" 🚀', context: 'These three components solve 80% of scaling problems' },
      ],
      zingConnections: [
        { id: 'c1', from: 'System Design', to: 'DSA', insight: 'DSA powers system design internals: consistent hashing (hash functions), priority queues (task scheduling), tries (autocomplete), B-trees (database indexing). DSA is the engine; system design is the car.' },
        { id: 'c2', from: 'Scalability', to: 'Docker Containers', insight: 'Containerization (Docker + Kubernetes) is what makes horizontal scaling possible in practice. Understanding containers transforms abstract system design concepts into deployable architectures.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The RESHADED framework: Requirements → Estimation → Storage schema → High-level design → API design → Detailed design → Evaluation → Distinctive component. Follow sequentially.', category: 'FRAMEWORK' },
        { id: 't2', tip: 'Practice 10 classic designs: URL shortener, Twitter, WhatsApp, YouTube, Uber, Instagram, Parking Lot, Rate Limiter, Search Autocomplete, Notification System. These 10 cover 90% of interview patterns.', category: 'PRACTICE' },
      ],
    },
    sections: [
      { id: 'fear', title: 'Why System Design Feels Impossible', type: 'story', order: 1 },
      { id: 'framework', title: 'The 5-Step Framework', type: 'deep-dive', order: 2 },
      { id: 'click', title: 'When Architecture Thinking Clicks', type: 'zing-moment', order: 3 },
      { id: 'practice', title: 'The 10-Problem Practice Kit', type: 'resources', order: 4 },
    ],
    mood: { fear: 'war', framework: 'neutral', click: 'achievement', practice: 'neutral' },
  },
  {
    slug: 'mba-vs-tech-career-path',
    title: 'MBA vs Tech Career — The Indian Dilemma',
    subtitle: 'To MBA or not to MBA?',
    quickShotSummary: 'MBA makes sense if: career switch needed, non-brand-name college, want management track. Skip MBA if: already in FAANG, CTC > 25 LPA, want to stay technical. ROI: Top 10 MBA = positive ROI in 3-5 years. Tier 2 MBA = often negative ROI. Alternative: build skills + switch through interviews.',
    description: 'The MBA question haunts every Indian tech professional by year 3. Here\'s the data-driven analysis to make the right choice.',
    universe: 'CAREER', subWorld: 'industry-guides', difficulty: 'INTERMEDIATE', readTimeMinutes: 13,
    tags: ['mba', 'career', 'tech', 'iim', 'decision-making'],
    examTags: ['CAT'],
    sources: ['https://iimcat.ac.in/', 'https://www.glassdoor.co.in/'],
    content: {
      summary: 'MBA ROI: Top 10 = positive in 3-5 years. Tier 2 = often negative. Tech career growth via skills can outpace MBA returns.',
      keyFacts: ['Average IIM-A placement: ₹32 LPA (2024)', 'Senior Software Engineer at FAANG: ₹40-60 LPA (no MBA needed)', '2 years of lost salary (₹30-50 lakhs) + fees (₹25 lakhs) = ₹55-75 lakhs opportunity cost for MBA', 'MBA is most valuable for career SWITCHES, not incremental growth'],
      desiAnalogies: [
        { id: 'highway', analogy: 'NH vs Toll Road', explanation: 'Tech career is the National Highway — free, direct, but you drive yourself. MBA is the toll road — costs ₹55-75 lakhs, takes 2-year detour, but the lanes are wider (network, brand). If you\'re already on a fast highway, the toll road may not be worth it.', emoji: '🛣️' },
        { id: 'arranged', analogy: 'Arranged vs Love Match', explanation: 'MBA hiring = arranged marriage (placement process, filters, brand matching). Tech hiring = love match (you prove your skills, get selected on merit). Both paths lead to great outcomes; the process differs.', emoji: '💑' },
      ],
      memes: [
        { id: 'm1', text: 'Year 3 SDE: "Should I do MBA?"\nYear 3 MBA: "Should I learn to code?"\n\nThe grass is always greener 😅\n\nRealest answer: Do what aligns with what you ENJOY doing.', context: 'FOMO drives most MBA decisions' },
        { id: 'm2', text: 'IIM fee: ₹25 lakhs\nLost salary: ₹50 lakhs\nTotal investment: ₹75 lakhs\n\nSame person on LinkedIn: "MBA is about the experience, not the money"\n\nSir, for ₹75 lakhs I need it to be about the money too 💰', context: 'MBA ROI needs honest financial analysis' },
      ],
      zingConnections: [
        { id: 'c1', from: 'MBA Decision', to: 'CAT Exam', insight: 'If you decide to do MBA, CAT preparation takes 6-12 months. The QA section directly uses school math. Start with mocks to assess your current level before committing.' },
        { id: 'c2', from: 'Career Path', to: 'Salary Negotiation', insight: 'Whether MBA or tech, salary negotiation skill determines actual compensation. An MBA who can\'t negotiate earns less than a tech person who can. Learn to negotiate regardless of path.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The decision framework: (1) What role do I want in 5 years? (2) Does that role REQUIRE an MBA? (3) Can I get there through skill-building? If #3 is yes, MBA may not be needed.', category: 'DECISION' },
        { id: 't2', tip: 'Talk to 5 MBA graduates and 5 senior tech professionals at your target level. Ask about daily work, satisfaction, and salary. Real conversations beat theoretical analysis.', category: 'RESEARCH' },
      ],
    },
    sections: [
      { id: 'dilemma', title: 'The 3-Year-Itch Dilemma', type: 'story', order: 1 },
      { id: 'math', title: 'The Real ROI Math', type: 'deep-dive', order: 2 },
      { id: 'clarity', title: 'When the Career Path Becomes Clear', type: 'zing-moment', order: 3 },
      { id: 'decide', title: 'The Decision Framework', type: 'resources', order: 4 },
    ],
    mood: { dilemma: 'philosophy', math: 'neutral', clarity: 'achievement', decide: 'discovery' },
  },
];

// ═══════════════════════════════════════════
// PLACEHOLDER: CIVILIZATION topics will be added below
// ═══════════════════════════════════════════

const CIVILIZATION: TopicSeed[] = [
  {
    slug: 'chandragupta-maurya-empire',
    title: 'Chandragupta Maurya — Empire Builder',
    subtitle: 'From nobody to emperor at 20',
    quickShotSummary: 'Chandragupta Maurya (340-298 BCE) founded the Maurya Empire with Chanakya\'s strategic mentorship. Defeated Nanda dynasty, repelled Alexander\'s successor Seleucus, and unified most of the Indian subcontinent. His governance model (from Arthashastra) is studied by MBA students worldwide.',
    description: 'The original Indian underdog story — a young man with a brilliant strategist mentor who built the first pan-Indian empire.',
    universe: 'CIVILIZATION', subWorld: 'indian-history', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['chandragupta', 'maurya', 'ancient-india', 'empire', 'chanakya'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS'],
    sources: ['https://ncert.nic.in/textbook/pdf/kehe106.pdf'],
    content: {
      summary: 'Chandragupta + Chanakya: strategy + execution = India\'s first great empire spanning from Afghanistan to Bengal.',
      keyFacts: ['Founded Maurya Empire at age ~20', 'Empire stretched from Afghanistan to Bengal — largest Indian empire until British Raj', 'Treaty with Seleucus gained 500 war elephants', 'Renounced everything at peak — became Jain monk'],
      desiAnalogies: [
        { id: 'startup', analogy: 'India\'s First Startup Founder', explanation: 'Chandragupta is India\'s first startup founder: no resources (background), one brilliant mentor (Chanakya = angel investor + advisor), disrupted the incumbent (Nanda dynasty = monopoly), scaled rapidly (empire = unicorn), and EXIT — renounced at peak (like stepping down as CEO).', emoji: '🚀' },
        { id: 'chess', analogy: 'Chess Master Strategy', explanation: 'Chanakya-Chandragupta partnership worked like a chess game: Chanakya planned 10 moves ahead (strategy/Arthashastra), Chandragupta executed on the board (military + governance). One brain, one executor = unstoppable.', emoji: '♟️' },
      ],
      memes: [
        { id: 'm1', text: 'Chandragupta at 20: *conquers the Nanda Empire*\nMe at 20: *can\'t decide what to order for dinner*\n\nDifferent vibes. Entirely. 😅', context: 'Historical figures achieved a LOT young' },
        { id: 'm2', text: 'Chandragupta: *builds India\'s biggest empire*\nAlso Chandragupta: "You know what, I\'m good. Going monk mode."\n*gives up everything*\nUltimate sigma move. 🧘', context: 'His renunciation is one of history\'s wildest career pivots' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Maurya Empire', to: 'Arthashastra', insight: 'Chandragupta\'s governance ran on Arthashastra principles — spy networks (intelligence), tax optimization, trade regulation. Modern governments still use these frameworks under different names.' },
        { id: 'c2', from: 'Ancient Military', to: 'System Design', insight: 'Maurya empire logistics — managing 600,000 soldiers, supply chains, communication across a continent — is essentially system design. Distributed systems, message queues, load balancing — ancient engineers solved these in analog.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Maurya Empire chronology is a must — Chandragupta → Bindusara → Ashoka. The transition from Arthashastra governance to Dhamma governance is a favorite essay topic.', category: 'EXAM' },
        { id: 't2', tip: 'Connect Chandragupta\'s era to global events: he was contemporary of Alexander the Great. This global context impresses in UPSC Mains answers.', category: 'CONTEXT' },
      ],
    },
    sections: [
      { id: 'rise', title: 'From Nobody to Emperor', type: 'story', order: 1 },
      { id: 'empire', title: 'Building the Empire', type: 'deep-dive', order: 2 },
      { id: 'zing', title: 'The Renunciation', type: 'zing-moment', order: 3 },
      { id: 'legacy', title: 'Legacy That Shaped India', type: 'resources', order: 4 },
    ],
    mood: { rise: 'war', empire: 'achievement', zing: 'philosophy', legacy: 'discovery' },
  },
  {
    slug: 'indian-constitution-making',
    title: 'Making of the Indian Constitution',
    subtitle: '2 years, 11 months, 17 days of debate',
    quickShotSummary: 'The Constituent Assembly (299 members) debated from 1946-1949 to create the world\'s longest written constitution. Key contributors: Ambedkar (drafting committee chair), Nehru, Patel, Maulana Azad. Borrowed features: UK (parliamentary system), US (fundamental rights), Ireland (DPSP), USSR (fundamental duties).',
    description: 'The Indian Constitution wasn\'t just written — it was debated, argued, and crafted by 299 of India\'s brightest minds. The story of how a diverse nation agreed on its rule book.',
    universe: 'CIVILIZATION', subWorld: 'constitution', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['constitution', 'ambedkar', 'constituent-assembly', 'fundamental-rights', 'india'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS', 'CBSE-10'],
    sources: ['https://www.constitutionofindia.net/'],
    content: {
      summary: '299 members, 2 years 11 months of debate, borrowed best features from world constitutions, balanced unity with diversity.',
      keyFacts: ['World\'s longest written constitution — originally 395 articles, 8 schedules, 22 parts', 'Drafted in handwritten calligraphy — not printed', 'Ambedkar spent 141 days defending the draft in Assembly debates', 'Constitution Day: November 26 (adopted 1949), Republic Day: January 26 (enacted 1950)'],
      desiAnalogies: [
        { id: 'recipe', analogy: 'Recipe from World\'s Best Kitchens', explanation: 'The Constitution is like a recipe that borrowed from the world\'s best kitchens: British Parliament (dal — staple, foundation), American Bill of Rights (biryani — flavor, individual rights), Irish DPSPs (raita — balance), Soviet duties (pickle — responsibility). Combined into uniquely Indian thali.', emoji: '🍽️' },
        { id: 'startup-pitch', analogy: 'The Ultimate Pitch Deck', explanation: 'The Preamble is the ultimate startup pitch: "We, the People of India" (founding team), "sovereign, socialist, secular, democratic, republic" (company values), "justice, liberty, equality, fraternity" (mission statement). All in 85 words!', emoji: '📝' },
      ],
      memes: [
        { id: 'm1', text: 'Ambedkar: *defends every article in 141 days of debates*\nAssembly members: *raises 7,635 amendments*\nAmbedkar: *answers each one*\n\nPatience level: Infinity. 🫡', context: 'Ambedkar\'s dedication to defending the draft was extraordinary' },
        { id: 'm2', text: 'The Constitution: "All citizens are equal"\nAlso the Constitution: *1500+ amendments in 75 years*\n\nThe founders designed it to EVOLVE. That\'s not a bug — it\'s a feature. 🔄', context: 'The amendment process is intentional flexibility' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Indian Constitution', to: 'UPSC Ethics', insight: 'The Preamble and DPSPs are ethical guidelines for governance. Every UPSC Ethics case study can reference constitutional principles — "As enshrined in Article 14, equality before law demands..."' },
        { id: 'c2', from: 'Constitutional Design', to: 'System Design', insight: 'The Constitution is India\'s system architecture: separation of powers (microservices), federalism (distributed system), judiciary (error handling), amendment process (version control). Engineers appreciate its design patterns.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Memorize the Preamble word by word. It\'s asked in UPSC Prelims and is the philosophical foundation of every polity answer in Mains.', category: 'EXAM' },
        { id: 't2', tip: 'Know which country each constitutional feature was borrowed from — UK (parliamentary), US (FR & judiciary), Ireland (DPSP), France (republic), USSR (duties). UPSC loves this factoid.', category: 'SOURCES' },
      ],
    },
    sections: [
      { id: 'why', title: 'Why India Needed a New Constitution', type: 'story', order: 1 },
      { id: 'assembly', title: 'The Constituent Assembly Debates', type: 'deep-dive', order: 2 },
      { id: 'design', title: 'When You See the Design Genius', type: 'zing-moment', order: 3 },
      { id: 'borrowed', title: 'Borrowed Features Map', type: 'comparison', order: 4 },
    ],
    mood: { why: 'war', assembly: 'philosophy', design: 'achievement', borrowed: 'discovery' },
  },
  {
    slug: 'ashoka-the-great-transformation',
    title: 'Ashoka — From Conqueror to Buddha',
    subtitle: 'The emperor who chose peace after winning war',
    quickShotSummary: 'Ashoka (304-232 BCE), Maurya emperor, conquered Kalinga in a brutal war (260 BCE) — 100,000 killed, 150,000 deported. The bloodshed transformed him: embraced Buddhism, promoted Dhamma (righteous living), erected pillars with edicts. His lion capital is India\'s national emblem.',
    description: 'The most dramatic transformation in ancient history — a ruthless conqueror who became the world\'s first pacifist emperor.',
    universe: 'CIVILIZATION', subWorld: 'great-leaders', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['ashoka', 'maurya', 'buddhism', 'kalinga', 'peace'],
    examTags: ['UPSC-PRELIMS', 'CBSE-6'],
    sources: ['https://ncert.nic.in/textbook/pdf/fess104.pdf'],
    content: {
      summary: 'Ashoka: brutal warrior → Kalinga war → transformation → Buddhism → Dhamma → peace. India\'s national emblem comes from his era.',
      keyFacts: ['Kalinga War (260 BCE): 100,000 killed, 150,000 deported', 'After Kalinga, Ashoka never waged another war', 'Ashoka\'s rock edicts are found across South Asia — first Indian "mass media"', 'India\'s national emblem (Lion Capital at Sarnath) is from Ashoka\'s pillar'],
      desiAnalogies: [
        { id: 'startup-pivot', analogy: 'The Ultimate Career Pivot', explanation: 'Ashoka\'s transformation is history\'s biggest career pivot: from CEO of War Inc. to CEO of Peace Foundation. Like a tech bro who makes millions, has a crisis of conscience, and starts an NGO — except at continental scale.', emoji: '🔄' },
        { id: 'brand', analogy: 'India\'s First Branding Expert', explanation: 'Ashoka\'s rock edicts were India\'s first branding campaign — messages carved in stone across the empire (like billboards on highways). Consistent message (Dhamma), wide distribution (Afghanistan to Bengal), lasting impact (readable 2300 years later). Mad marketing skills.', emoji: '📢' },
      ],
      memes: [
        { id: 'm1', text: 'Ashoka before Kalinga: "I\'ll conquer everything"\nAshoka after Kalinga: "War is terrible, I\'m becoming Buddhist"\nGrandfather Chandragupta: 👁️👄👁️\n\nThe family reunion must\'ve been awkward.', context: 'Ashoka\'s transformation was radically different from his warrior grandfather' },
        { id: 'm2', text: 'Ashoka: *carves messages on rocks that last 2300 years*\nMe: *writes a tweet that gets 3 likes and disappears*\n\nContent strategy: rock > Twitter 🪨', context: 'Ancient messaging was more durable than modern social media' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Ashoka', to: 'Chandragupta Maurya', insight: 'Three generations, three philosophies: Chandragupta (Arthashastra — pragmatic power), Bindusara (maintenance), Ashoka (Dhamma — ethical governance). The Maurya dynasty shows how governance philosophy evolves.' },
        { id: 'c2', from: 'Dhamma', to: 'UPSC Ethics', insight: 'Ashoka\'s Dhamma principles (tolerance, non-violence, respect for elders, generosity) appear in UPSC Ethics questions. His governance model is the earliest example of "ethical administration."' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Know the difference between Ashoka\'s Dhamma and Buddhism. Dhamma was broader — moral code for all citizens, not just Buddhist teaching. This distinction is frequently tested.', category: 'EXAM' },
        { id: 't2', tip: 'Ashoka\'s edicts are primary historical sources. Memorize types: Rock Edicts (14), Pillar Edicts (7), Minor Rock Edicts. Their locations and content are UPSC Prelims favorites.', category: 'FACTUAL' },
      ],
    },
    sections: [
      { id: 'war', title: 'The Kalinga Bloodbath', type: 'story', order: 1 },
      { id: 'change', title: 'The Transformation', type: 'deep-dive', order: 2 },
      { id: 'dhamma', title: 'When Empire Meets Conscience', type: 'zing-moment', order: 3 },
      { id: 'legacy', title: 'Legacy — From Edicts to Emblem', type: 'resources', order: 4 },
    ],
    mood: { war: 'war', change: 'philosophy', dhamma: 'achievement', legacy: 'discovery' },
  },
  {
    slug: 'sun-tzu-art-of-war-decoded',
    title: 'Art of War — Strategy for Modern Life',
    subtitle: '2500-year-old wisdom that runs Silicon Valley',
    quickShotSummary: 'Sun Tzu\'s Art of War (500 BCE) teaches: "Know your enemy, know yourself" (market research), "The supreme art is to subdue without fighting" (competitive advantage without competition), "All warfare is deception" (strategic positioning). Used by: military, CEOs, sports coaches, startup founders.',
    description: 'The 2500-year-old strategy manual that CEOs, generals, and startup founders still swear by. Decoded for modern Indian professionals.',
    universe: 'CIVILIZATION', subWorld: 'strategy', difficulty: 'INTERMEDIATE', readTimeMinutes: 13,
    tags: ['strategy', 'sun-tzu', 'leadership', 'competition', 'war'],
    examTags: [],
    sources: ['https://www.gutenberg.org/ebooks/132'],
    content: {
      summary: 'Art of War: strategy > tactics, preparation > reaction, positioning > fighting. Applicable to business, careers, and competition.',
      keyFacts: ['Written ~500 BCE by Sun Tzu, Chinese military strategist', 'Shortest strategy book ever — only 13 chapters, ~6000 words', 'Required reading at West Point, Harvard Business School, and INSEAD', 'Jeff Bezos, Bill Belichick, and many CEOs cite it as influential'],
      desiAnalogies: [
        { id: 'chanakya', analogy: 'Sun Tzu + Chanakya = Complete Strategist', explanation: 'Sun Tzu focused on military strategy (how to WIN). Chanakya focused on governance (how to RULE). Together, they cover the complete professional playbook: win the battle (market/interview) AND govern well (lead the team/company).', emoji: '⚔️' },
        { id: 'cricket', analogy: 'IPL Captaincy = Art of War', explanation: '"Know your enemy" = study opponent batting stats. "Choose battles" = pick which bowlers face which batsmen. "Deception" = field placements that mislead. "Win without fighting" = psychological pressure. MS Dhoni was basically Sun Tzu with a bat.', emoji: '🏏' },
      ],
      memes: [
        { id: 'm1', text: 'Sun Tzu: "The supreme art of war is to subdue the enemy without fighting"\n\nJio in 2016: *gives free data to 100M users*\nOther telecoms: "We surrender"\n\nSun Tzu would be proud. 📱', context: 'Jio\'s strategy was textbook Art of War' },
        { id: 'm2', text: 'Sun Tzu: "Know yourself"\nMe: *takes 47 personality tests*\n\nSun Tzu: "Know your enemy"\nMe: *stalks competitor\'s LinkedIn*\n\nStrategic analysis level: Beginner 😅', context: 'Applying ancient wisdom to modern professional life' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Art of War', to: 'Arthashastra', insight: 'Art of War (military focus) and Arthashastra (governance focus) were written in the same century — 5th century BCE. Two civilizations independently codified strategic thinking. Human competition is universal.' },
        { id: 'c2', from: 'Strategic Thinking', to: 'System Design', insight: '"All warfare is based on deception" translates to system design: rate limiting, firewall rules, and security through obscurity are defensive strategies. Understanding attack vectors (enemies) is essential for system defense.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Top 5 applicable principles: (1) Know yourself AND your enemy (2) Win without fighting when possible (3) Speed > size (4) Adapt to changing conditions (5) All warfare is based on deception.', category: 'KEY-PRINCIPLES' },
        { id: 't2', tip: 'Read Art of War alongside Arthashastra for the complete strategy toolkit. Where Sun Tzu says WHEN to fight, Chanakya says HOW to govern after winning. Both books are under 200 pages each.', category: 'READING' },
      ],
    },
    sections: [
      { id: 'why', title: 'Why CEOs Read a War Book', type: 'story', order: 1 },
      { id: 'principles', title: 'The 13 Chapters Decoded', type: 'deep-dive', order: 2 },
      { id: 'modern', title: 'When Ancient Strategy Solves Modern Problems', type: 'zing-moment', order: 3 },
      { id: 'apply', title: 'Applying Art of War to Your Career', type: 'application', order: 4 },
    ],
    mood: { why: 'war', principles: 'philosophy', modern: 'achievement', apply: 'discovery' },
  },
  {
    slug: 'mughal-empire-rise-fall',
    title: 'Mughal Empire — Rise to Fall',
    subtitle: '332 years that shaped modern India',
    quickShotSummary: 'Mughal Empire (1526-1857): Babur → Humayun → Akbar (golden age, religious tolerance) → Jahangir → Shah Jahan (Taj Mahal) → Aurangzeb (expansion + decline seeds). Contributions: administrative reforms (mansabdari), architecture (Taj, Red Fort), art (miniature paintings), cultural synthesis.',
    description: 'The empire that gave India the Taj Mahal, administrative frameworks, and a unified cultural identity — and how overexpansion led to its decline.',
    universe: 'CIVILIZATION', subWorld: 'indian-history', difficulty: 'INTERMEDIATE', readTimeMinutes: 15,
    tags: ['mughal', 'akbar', 'mughal-architecture', 'medieval-india', 'history'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS', 'CBSE-7'],
    sources: ['https://ncert.nic.in/textbook/pdf/gess104.pdf'],
    content: {
      summary: 'Mughals: 6 great emperors, administrative innovation, architectural marvels, cultural synthesis, decline through overexpansion.',
      keyFacts: ['Mughal Empire at peak (under Aurangzeb) controlled 25% of world GDP', 'Akbar\'s Din-i-Ilahi attempted religious synthesis', 'Taj Mahal took 22 years and 20,000 workers to build', 'Mansabdari system was one of history\'s most efficient military-administrative frameworks'],
      desiAnalogies: [
        { id: 'startup', analogy: 'Startup to Corporation to Decline', explanation: 'Mughal trajectory mirrors companies: Babur (founder, MVP), Akbar (product-market fit, scaling with culture), Shah Jahan (brand building, Taj Mahal = marketing), Aurangzeb (CEO who scaled too fast and lost culture). Over-expansion without culture = decline.', emoji: '📈📉' },
        { id: 'thali', analogy: 'Mughlai as Cultural Fusion', explanation: 'Mughlai cuisine itself tells the empire\'s story — Turkish techniques + Persian flavors + Indian spices + local ingredients = biryani, kebabs, naan. The Mughals were fusion pioneers: architecture, music, language (Urdu), art — all blended.', emoji: '🍗' },
      ],
      memes: [
        { id: 'm1', text: 'Akbar: *creates inclusive administration, tolerates all religions*\nAurangzeb: *does the opposite*\nEmpire: 📈 under Akbar, 📉 under Aurangzeb\n\nHistory lesson: inclusive leadership scales better.', context: 'Governance style directly correlates with empire longevity' },
        { id: 'm2', text: 'Shah Jahan: "I\'ll build the most beautiful tomb for my wife"\nTaj Mahal: *takes 22 years, costs ₹32 crore (today: ₹70,000 crore)*\nSon Aurangzeb: *imprisons him looking at the Taj*\n\nFamily drama was Mughal-level. 😬', context: 'Mughal family politics were intense' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Mughal Administration', to: 'Indian Constitution', insight: 'Mughal administrative innovations (revenue collection, provincial governance, civil services) influenced British Indian administration, which in turn shaped independent India\'s administrative structure. History → Constitution → Present governance.' },
        { id: 'c2', from: 'Mughal Architecture', to: 'Ashoka\'s Legacy', insight: 'Indian architecture evolved from Ashokan pillars (functional, simple) to Mughal monuments (ornate, emotional). Both eras used architecture as power communication — edicts carved in stone, empires built in marble.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'UPSC chronology hack: BHA-JAS-A = Babur, Humayun, Akbar, Jahangir, Shah Jahan, Aurangzeb. Learn their approximate reign years: 1526, 1530, 1556, 1605, 1628, 1658.', category: 'MEMORY' },
        { id: 't2', tip: 'For UPSC Mains: Don\'t just describe events — analyze WHY. Why did Akbar succeed with tolerance? Why did Aurangzeb\'s expansion backfire? Analytical answers score higher.', category: 'ANALYSIS' },
      ],
    },
    sections: [
      { id: 'arrival', title: 'Babur\'s Gamble — Entering India', type: 'story', order: 1 },
      { id: 'golden', title: 'Akbar\'s Golden Age', type: 'deep-dive', order: 2 },
      { id: 'lesson', title: 'When Expansion Becomes Destruction', type: 'zing-moment', order: 3 },
      { id: 'legacy', title: 'What the Mughals Left Behind', type: 'resources', order: 4 },
    ],
    mood: { arrival: 'war', golden: 'achievement', lesson: 'philosophy', legacy: 'discovery' },
  },
  {
    slug: 'ambedkar-social-revolution',
    title: 'Ambedkar — The Greatest Social Revolutionary',
    subtitle: 'From untouchable to constitution maker',
    quickShotSummary: 'B.R. Ambedkar (1891-1956): Born Dalit, faced extreme discrimination, earned PhD from Columbia + DSc from LSE + Bar from London. Led Dalit movement, chaired Constitution Drafting Committee (1947-49), fought for social justice through law. Father of Indian Constitution, architect of reservation policy.',
    description: 'The story of how India\'s most discriminated-against citizen became the architect of its most powerful document — the Constitution.',
    universe: 'CIVILIZATION', subWorld: 'great-leaders', difficulty: 'BEGINNER', readTimeMinutes: 14,
    tags: ['ambedkar', 'constitution', 'social-justice', 'dalit', 'equality'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS', 'CBSE-10'],
    sources: ['https://www.constitutionofindia.net/'],
    content: {
      summary: 'Ambedkar: born into discrimination, educated in world\'s best universities, used law + constitution as weapons for social justice.',
      keyFacts: ['First Dalit to earn a college degree in India', 'Held doctorates from both Columbia University and LSE', 'Chaired the Constitution Drafting Committee', 'Converted to Buddhism in 1956 with 600,000 followers'],
      desiAnalogies: [
        { id: 'code', analogy: 'The Constitution as Source Code', explanation: 'Ambedkar was like India\'s lead developer: he wrote the source code (Constitution) with built-in anti-discrimination protocols (Articles 14-18), access control (Fundamental Rights), and upgrade mechanisms (Amendment process). Every Indian app runs on his codebase.', emoji: '💻' },
        { id: 'bridge', analogy: 'Bridge Builder', explanation: 'Ambedkar built bridges — literally between communities, figuratively between antiquity (caste system) and modernity (constitutional equality). The reservation system is the ramp that allows people from the valley (discrimination) to reach the bridge (opportunity).', emoji: '🌉' },
      ],
      memes: [
        { id: 'm1', text: 'Society: "You can\'t study because of your birth"\nAmbedkar: *earns PhD from Columbia + PhD from LSE + Bar from London*\nSociety: "Wait—"\nAmbedkar: *writes the Constitution*\nSociety: 👁️👄👁️\n\nUltimate revenge = success. 📜', context: 'Ambedkar\'s education was itself an act of revolution' },
        { id: 'm2', text: 'Person: "Why do we still need reservation?"\nAmbedkar\'s writings: *explains 3000 years of systemic discrimination in excruciating detail*\nPerson: "Oh."\n\nRead before you debate. 📚', context: 'The reservation debate requires historical context' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Ambedkar', to: 'Indian Constitution', insight: 'Ambedkar didn\'t just draft the Constitution — he defended every article in 141 days of Assembly debates. His arguments on Articles 14-18 (Right to Equality) are masterclasses in legal reasoning.' },
        { id: 'c2', from: 'Social Justice', to: 'UPSC Ethics', insight: 'Ambedkar\'s life and philosophy provide answers to almost every UPSC Ethics question: integrity against adversity, compassion for the marginalized, using law as a tool for justice. Quote him in Ethics answers.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Read "Annihilation of Caste" (short book). It\'s Ambedkar\'s most powerful argument for social reform. The ideas are directly relevant to GS-1 (Society) and GS-4 (Ethics) answers.', category: 'READING' },
        { id: 't2', tip: 'Know the difference between Ambedkar\'s approach (constitutional/legal reform) and Gandhi\'s approach (social/moral reform) to caste discrimination. This comparative question appears frequently in UPSC Mains.', category: 'COMPARISON' },
      ],
    },
    sections: [
      { id: 'struggle', title: 'The Untouchable Who Studied at Columbia', type: 'story', order: 1 },
      { id: 'fight', title: 'The Legal Battle for Equality', type: 'deep-dive', order: 2 },
      { id: 'zing', title: 'When the Constitution Became a Weapon', type: 'zing-moment', order: 3 },
      { id: 'today', title: 'Ambedkar\'s Legacy Today', type: 'application', order: 4 },
    ],
    mood: { struggle: 'war', fight: 'war', zing: 'achievement', today: 'philosophy' },
  },
  {
    slug: 'game-theory-for-life',
    title: 'Game Theory — Strategy for Everyday Decisions',
    subtitle: 'Why the smartest move isn\'t always obvious',
    quickShotSummary: 'Game theory studies strategic decisions where your outcome depends on others\' choices. Key concepts: Prisoner\'s Dilemma (cooperation vs betrayal), Nash Equilibrium (no one benefits from changing strategy alone), Zero-sum vs Positive-sum games. Applications: negotiations, pricing, traffic, relationships.',
    description: 'Game theory isn\'t just math — it explains why people cooperate, compete, and make seemingly irrational choices. The thinking framework for life.',
    universe: 'CIVILIZATION', subWorld: 'strategy', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['game-theory', 'strategy', 'nash-equilibrium', 'decision-making', 'economics'],
    examTags: [],
    sources: ['https://plato.stanford.edu/entries/game-theory/'],
    content: {
      summary: 'Game theory: strategic decision-making where outcomes depend on others\' choices. Prisoner\'s Dilemma, Nash Equilibrium, and everyday applications.',
      keyFacts: ['John Nash won Nobel Prize for Nash Equilibrium theory', 'Prisoner\'s Dilemma explains why competitors rarely cooperate', 'Auction theory (a game theory branch) won 2020 Nobel Prize in Economics', 'Game theory is used in: military strategy, business, AI, and even biology'],
      desiAnalogies: [
        { id: 'autorickshaw', analogy: 'Auto-Rickshaw Bargaining = Negotiation Game', explanation: 'Haggling with an auto driver is game theory: you both have a reservation price (walk-away number), both bluff, and the deal happens at Nash Equilibrium — where neither of you benefits from changing your offer. Every Indian practices game theory daily!', emoji: '🛺' },
        { id: 'cricket', analogy: 'IPL Auction = Auction Theory', explanation: 'IPL auction is applied game theory: teams have budgets (constraints), need to build balanced squads (strategy), and others\' bids affect your strategy (interdependence). The winning team isn\'t the richest — it\'s the most strategic.', emoji: '🏏' },
      ],
      memes: [
        { id: 'm1', text: 'Prisoner A: *stays silent*\nPrisoner B: *betrays*\nPrisoner A: 10 years jail\nPrisoner B: goes free\n\nClassic Prisoner\'s Dilemma. Trust is risky. 🔒\n\nBut repeated games change everything — betrayal has consequences.', context: 'The one-shot vs repeated game distinction matters' },
        { id: 'm2', text: 'Nash Equilibrium in real life:\nEvery lane in traffic: equally slow\nEvery checkout counter at DMart: equal queue\n\nYou can\'t game the system because everyone else is trying too. 🚗', context: 'Nash Equilibrium explains why "shortcuts" don\'t stay shortcuts' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Game Theory', to: 'Art of War', insight: 'Sun Tzu intuitively understood game theory 2500 years before Nash: "Know your enemy, know yourself" is essentially constructing the payoff matrix. Ancient strategy was game theory without the math notation.' },
        { id: 'c2', from: 'Nash Equilibrium', to: 'System Design', insight: 'Distributed systems face game-theoretic problems: Byzantine Generals Problem (trust), Leader Election (coordination), Load Balancing (resource allocation). System design IS game theory with computers.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Three takeaways for life: (1) In one-time interactions, expect selfish behavior. (2) In repeated interactions, cooperation wins long-term. (3) Always consider the other player\'s incentives before deciding.', category: 'LIFE-LESSONS' },
        { id: 't2', tip: 'Before any negotiation (salary, vendor, deal), map out: What are YOUR options if this fails? What are THEIR options? The person with better alternatives (BATNA) has more power.', category: 'NEGOTIATION' },
      ],
    },
    sections: [
      { id: 'why', title: 'Why Smart People Make Bad Choices', type: 'story', order: 1 },
      { id: 'concepts', title: 'Key Concepts Simplified', type: 'deep-dive', order: 2 },
      { id: 'aha', title: 'When You See Games Everywhere', type: 'zing-moment', order: 3 },
      { id: 'apply', title: 'Game Theory for Negotiations & Career', type: 'application', order: 4 },
    ],
    mood: { why: 'philosophy', concepts: 'neutral', aha: 'achievement', apply: 'discovery' },
  },
  {
    slug: 'indian-independence-movement',
    title: 'Indian Independence Movement — 1857 to 1947',
    subtitle: '90 years of resistance that freed a nation',
    quickShotSummary: 'Indian independence: Revolt of 1857 (first war) → Indian National Congress (1885) → Extremists vs Moderates → Gandhi\'s Non-Cooperation (1920), Civil Disobedience (1930), Quit India (1942) → Subhas Chandra Bose/INA → Partition → Independence (1947). Key phases: Armed → Political → Mass movement → Freedom.',
    description: 'The 90-year journey from first revolt to midnight freedom — the movements, leaders, sacrifices, and strategies that ended colonial rule.',
    universe: 'CIVILIZATION', subWorld: 'indian-history', difficulty: 'INTERMEDIATE', readTimeMinutes: 16,
    tags: ['independence', 'gandhi', 'freedom', 'colonial', 'partition'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS', 'CBSE-8', 'CBSE-10'],
    sources: ['https://ncert.nic.in/textbook/pdf/hess104.pdf'],
    content: {
      summary: '1857-1947: Armed revolt → Political organization → Mass non-violent movements → Freedom. Multiple strategies, one goal.',
      keyFacts: ['1857 revolt failed but planted the seed of national consciousness', 'Gandhi led 3 major movements: Non-Cooperation (1920), Civil Disobedience (1930), Quit India (1942)', 'Bose\'s INA attacked British India from Burma — different strategy, same goal', 'Partition displaced 15 million people — largest mass migration in human history'],
      desiAnalogies: [
        { id: 'version', analogy: 'Freedom Movement Versions', explanation: 'Independence movement evolved like software versions: v1.0 (1857 — armed revolt, crashed), v2.0 (Congress moderates — petition-based, slow), v3.0 (Gandhi — mass movement, non-violence), v3.5 (Bose — armed + diplomatic). The final release was August 15, 1947.', emoji: '🔄' },
        { id: 'team', analogy: 'India\'s All-Star Team', explanation: 'The freedom movement was an all-star team: Gandhi (captain, strategy), Nehru (vice-captain, political vision), Patel (enforcer, unification), Ambedkar (social justice angle), Bose (aggression), Bhagat Singh (fearlessness), Sarojini Naidu (cultural), Maulana Azad (communal harmony).', emoji: '⭐' },
      ],
      memes: [
        { id: 'm1', text: 'British in 1857: "Just a mutiny, we\'ll handle it"\nBritish in 1920: "Just a march, it\'ll pass"\nBritish in 1942: "Okay this is serious"\nBritish in 1947: *packs bags* 🎒\n\nConsistency wins.', context: 'The sustained nature of the freedom movement wore down colonial resolve' },
        { id: 'm2', text: 'Textbook version: "India got independence peacefully"\n\nReality: 1857 revolt + Jallianwala Bagh + Chauri Chaura + Quit India + INA battles + Naval Mutiny + Partition violence\n\nIt was anything but simple or peaceful. 📚', context: 'The freedom movement was multifaceted and complex' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Independence Movement', to: 'Indian Constitution', insight: 'The Constitution was written as a direct response to colonial injustice: Fundamental Rights counter British oppression, DPSP address social inequalities exposed during colonial rule. Freedom struggle → Constitutional design.' },
        { id: 'c2', from: 'Non-Violence', to: 'UPSC Ethics', insight: 'Gandhi\'s non-violence philosophy is the most-tested theme in UPSC Ethics — Satyagraha, means vs ends, civil disobedience, moral authority. Understanding the freedom struggle is mandatory for Ethics paper.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'UPSC timeline hack: divide 1857-1947 into decades and learn 2-3 key events per decade. This creates a mental timeline that helps answer any chronology question.', category: 'CHRONOLOGY' },
        { id: 't2', tip: 'For Mains: Connect freedom movement events to international events (WWI, WWII, Russian Revolution). UPSC rewards global context in Indian history answers.', category: 'GLOBAL-CONTEXT' },
      ],
    },
    sections: [
      { id: 'revolt', title: '1857 — The First Spark', type: 'story', order: 1 },
      { id: 'gandhi', title: 'Gandhi\'s Three Movements', type: 'deep-dive', order: 2 },
      { id: 'midnight', title: 'The Tryst with Destiny Moment', type: 'zing-moment', order: 3 },
      { id: 'cost', title: 'The Cost of Freedom — Partition', type: 'resources', order: 4 },
    ],
    mood: { revolt: 'war', gandhi: 'philosophy', midnight: 'achievement', cost: 'war' },
  },
  {
    slug: 'panchayati-raj-local-governance',
    title: 'Panchayati Raj — India\'s Grassroots Democracy',
    subtitle: 'The government that starts from your village',
    quickShotSummary: 'Panchayati Raj (73rd Amendment, 1992) established 3-tier local governance: Gram Panchayat (village) → Panchayat Samiti (block) → Zila Parishad (district). Features: direct elections, reservation for SC/ST/women (33%), devolution of 29 subjects. India has 2.5 lakh Gram Panchayats.',
    description: 'Democracy doesn\'t start at Parliament — it starts at your village Panchayat. How India\'s 2.5 lakh Gram Panchayats work and why they matter.',
    universe: 'CIVILIZATION', subWorld: 'constitution', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['panchayati-raj', 'local-governance', 'democracy', '73rd-amendment', 'village'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS', 'STATE-PSC'],
    sources: ['https://www.panchayat.gov.in/'],
    content: {
      summary: '73rd Amendment: 3-tier local governance with direct elections, reservation, and 29 devolved subjects. Democracy at doorstep.',
      keyFacts: ['India has ~2.5 lakh Gram Panchayats with 30 lakh+ elected representatives', '33% seats reserved for women — India\'s largest women\'s empowerment program through elected posts', 'Panchayats handle 29 subjects including education, health, water, roads', 'Gandhi\'s vision: "India lives in its villages"'],
      desiAnalogies: [
        { id: 'microservices', analogy: 'Governance Microservices', explanation: 'Panchayati Raj is like microservices architecture: instead of one monolithic government (Centre), tasks are distributed to smaller, independent services (Panchayats). Each handles its domain (water, roads, education), scales independently, and is closer to the user (citizen).', emoji: '🏘️' },
        { id: 'joint-family', analogy: 'Joint Family to Nuclear Family', explanation: 'Before Panchayati Raj: all governance from Delhi/state capital (joint family — elder decides everything). After: local governance at village level (nuclear family — you decide for your household). Both have pros/cons, but local decisions fit local needs better.', emoji: '👨‍👩‍👧‍👦' },
      ],
      memes: [
        { id: 'm1', text: 'Gram Panchayat: *manages roads, water, education*\nBuilding permits, social welfare, sanitation\n\nAverage citizen: "Panchayat? What do they even do?"\n\nAnswer: EVERYTHING you take for granted at village level. 🏘️', context: 'Panchayat functions are underappreciated' },
        { id: 'm2', text: 'India 1947: "Democracy = Parliament"\nIndia 1992 (73rd Amendment): "Democracy = Your village too"\n30 lakh elected Panchayat representatives > 795 MPs + MLAs\n\nBiggest democracy? It\'s at the grassroots. 🗳️', context: 'India\'s real democratic scale is at the Panchayat level' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Panchayati Raj', to: 'Indian Constitution', insight: 'Originally in Directive Principles (Article 40), Panchayati Raj became constitutional reality only through 73rd Amendment (1992). The journey from DPSP to law is a UPSC favorite topic — shows how the Constitution evolves.' },
        { id: 'c2', from: 'Local Governance', to: 'UPSC Ethics', insight: 'Panchayat-level governance creates Ethics paper scenarios: a Sarpanch facing corruption pressure, managing caste dynamics in fund allocation, bal ancing development with environmental protection. Local = relatable case studies.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Know the difference between 73rd Amendment (rural) and 74th Amendment (urban — municipalities). They\'re always compared in Prelims and Mains.', category: 'EXAM' },
        { id: 't2', tip: 'Remember the 11th Schedule (29 subjects devolved to Panchayats). Group them mentally: social (education, health), infrastructure (roads, water), economic (agriculture, markets), environment (land, soil conservation).', category: 'MEMORY' },
      ],
    },
    sections: [
      { id: 'gandhi', title: 'Gandhi\'s Village Democracy Vision', type: 'story', order: 1 },
      { id: 'structure', title: 'The 3-Tier System', type: 'deep-dive', order: 2 },
      { id: 'power', title: 'When Villages Got Real Power', type: 'zing-moment', order: 3 },
      { id: 'women', title: 'Women\'s Representation Revolution', type: 'application', order: 4 },
    ],
    mood: { gandhi: 'philosophy', structure: 'neutral', power: 'achievement', women: 'discovery' },
  },
  {
    slug: 'indus-valley-civilization',
    title: 'Indus Valley — The Forgotten Superpower',
    subtitle: '5000 years ago, India was already urbanized',
    quickShotSummary: 'Indus Valley Civilization (3300-1300 BCE): Harappa + Mohenjo-daro were planned cities with grid roads, drainage systems, public baths, standardized weights. Population: ~5 million (world\'s largest at that time). No temples found, suggesting secular governance. Script still undeciphered.',
    description: 'While Egypt built pyramids and Mesopotamia built ziggurats, India built the world\'s first planned cities with better sanitation than most modern Indian cities.',
    universe: 'CIVILIZATION', subWorld: 'itihasa', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['indus-valley', 'harappa', 'mohenjo-daro', 'ancient', 'archaeology'],
    examTags: ['UPSC-PRELIMS', 'CBSE-6'],
    sources: ['https://ncert.nic.in/textbook/pdf/fess104.pdf'],
    content: {
      summary: 'World\'s first planned cities, advanced drainage, standardized weights, no military structures. India was sophisticated 5000 years ago.',
      keyFacts: ['Mohenjo-daro had better drainage than most modern Indian cities', 'Great Bath of Mohenjo-daro = world\'s first public swimming pool', 'Population ~5 million was world\'s largest civilization at that time', 'Indus script has 400+ symbols — still NOT deciphered after 100 years of trying'],
      desiAnalogies: [
        { id: 'city', analogy: 'India\'s First Smart City', explanation: 'Indus Valley cities were India\'s first smart cities: grid layout (like Chandigarh), covered drainage (like... better than most Indian cities today), standardized brick sizes (ISO certification 5000 years early), public granaries (food security), and a great bath (public wellness).', emoji: '🏙️' },
        { id: 'quality', analogy: 'Ancient "Made in India" Quality', explanation: 'Indus Valley had standardized weights and measures — their bricks were always in 1:2:4 ratio (length:width:height). This is quality control 5000 years before ISO certification. Ancient "Make in India" was world-class.', emoji: '🧱' },
      ],
      memes: [
        { id: 'm1', text: 'Indus Valley 3000 BCE: *grid roads, covered drains, public baths*\nIndia 2024: *pothole on main road, open drains*\n\nWe peaked 5000 years ago. 😅\n\nJokes aside — they were INCREDIBLE urban planners.', context: 'IVC urban planning was remarkably advanced' },
        { id: 'm2', text: 'Archaeologists: "We found 400+ symbols"\nLinguists: "Let us decipher them"\n*100 years later*\nStill undeciphered: "I\'m built different" 🔤🤷\n\nThe Indus script remains one of archaeology\'s greatest mysteries.', context: 'The undeciphered script adds mystique to IVC' },
      ],
      zingConnections: [
        { id: 'c1', from: 'IVC Urban Planning', to: 'System Design', insight: 'IVC urban planning is essentially physical system design: water input (wells), drainage output (covered sewers), modular housing (standardized bricks), central storage (granaries). The same design principles apply to software architecture.' },
        { id: 'c2', from: 'Indus Valley', to: 'Mughal Empire', insight: '4500 years separate IVC and Mughals, yet both represent peaks of Indian urban civilization. IVC = functional brilliance (drainage, planning). Mughals = aesthetic brilliance (Taj Mahal, gardens). Both shaped how we build cities.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Know the major IVC sites and their specialties: Mohenjo-daro (Great Bath), Harappa (granaries), Lothal (dockyard/port), Kalibangan (ploughed field), Dholavira (water management). Each site has unique features.', category: 'SITES' },
        { id: 't2', tip: 'IVC decline theories: Aryan invasion (debated), climate change, river drying (Saraswati), floods. UPSC asks "critically analyze the reasons for IVC decline" — present all theories with evidence.', category: 'ANALYSIS' },
      ],
    },
    sections: [
      { id: 'discovery', title: 'Discovering the Forgotten Civilization', type: 'story', order: 1 },
      { id: 'cities', title: 'The World\'s First Smart Cities', type: 'deep-dive', order: 2 },
      { id: 'zing', title: '5000 Years Ahead of Their Time', type: 'zing-moment', order: 3 },
      { id: 'mystery', title: 'The Unsolved Script Mystery', type: 'resources', order: 4 },
    ],
    mood: { discovery: 'discovery', cities: 'achievement', zing: 'achievement', mystery: 'philosophy' },
  },
  {
    slug: 'cold-war-world-order',
    title: 'Cold War — How Two Superpowers Shaped the World',
    subtitle: 'The 45-year conflict that never fired a shot (directly)',
    quickShotSummary: 'Cold War (1947-1991): USA (capitalism) vs USSR (communism). Never direct combat but proxy wars (Korea, Vietnam, Afghanistan). Key events: Berlin Wall, Cuban Missile Crisis, Space Race, Arms Race. India\'s NAM (Non-Aligned Movement) was a third path. Ended with USSR dissolution (1991).',
    description: 'The Cold War shaped modern geopolitics, technology (internet was a military project!), and India\'s foreign policy. Understanding it explains today\'s world order.',
    universe: 'CIVILIZATION', subWorld: 'strategy', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['cold-war', 'geopolitics', 'usa', 'ussr', 'non-aligned'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS', 'CBSE-12'],
    sources: ['https://ncert.nic.in/textbook/pdf/leps101.pdf'],
    content: {
      summary: 'USA vs USSR: ideological rivalry, proxy wars, arms/space race, NAM as third path. Ended 1991. Shaped today\'s world order.',
      keyFacts: ['Cuban Missile Crisis (1962) brought world closest to nuclear war — 13 days of terror', 'Space Race: USSR sent first human to space (Gagarin, 1961), USA landed on Moon (1969)', 'Internet (ARPANET) was originally a US military Cold War project', 'India co-founded NAM with Nehru, Nasser, Tito — 120 nations chose non-alignment'],
      desiAnalogies: [
        { id: 'cricket', analogy: 'India-Pakistan Cricket Rivalry', explanation: 'Cold War was like India-Pakistan cricket: two rivals who never play a direct war (full series) but compete everywhere else — proxy matches (UN votes), influence over neutral teams (developing nations), and the whole world watches. NAM = ICC saying "let\'s just enjoy the game."', emoji: '🏏' },
        { id: 'neighbors', analogy: 'Apartment Complex Politics', explanation: 'USA and USSR were like two powerful families in an apartment complex: one family (US) wants everyone to run their own businesses. Other family (USSR) wants shared resources. Smaller families (developing nations) are pressured to pick a side. India was like: "We\'ll be friends with both." (NAM).', emoji: '🏢' },
      ],
      memes: [
        { id: 'm1', text: 'USA in Cold War:\n- Built internet\n- Went to moon\n- Created NATO\n\nAll because they were SCARED of Russia.\n\nFear is one hell of a motivator. 😅🚀', context: 'Many modern technologies emerged from Cold War competition' },
        { id: 'm2', text: 'Nehru at NAM: "We won\'t pick a side"\nUSA: "But—"\nUSSR: "But—"\nIndia: *takes aid from both*\n\nModern foreign policy: "We\'re friends with everyone" 🤝🤝', context: 'India\'s NAM strategy was pragmatic genius' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Cold War', to: 'Indian Independence', insight: 'India\'s independence (1947) coincided with Cold War\'s start. India\'s choice of NAM was deeply influenced by the freedom movement\'s values: sovereignty, self-determination, and anti-imperialism. Domestic history shaped foreign policy.' },
        { id: 'c2', from: 'Space Race', to: 'How Black Holes Work', insight: 'The Space Race drove 90% of early space science investment. Without Cold War competition, we\'d be decades behind in understanding black holes, the cosmos, and space technology. Rivalry accelerated knowledge.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Cold War questions in Mains ask about India\'s role, not just US-USSR dynamics. Focus on NAM, India-USSR friendship treaty (1971), and how India navigated between the blocs.', category: 'INDIA-FOCUS' },
        { id: 't2', tip: 'Connect Cold War to current geopolitics: US-China rivalry is called "New Cold War." Same patterns: tech competition (AI race), proxy conflicts, alliance building (Quad, BRICS). History repeats.', category: 'CURRENT-AFFAIRS' },
      ],
    },
    sections: [
      { id: 'why', title: 'How Two Allies Became Enemies', type: 'story', order: 1 },
      { id: 'crises', title: 'Key Crises and Near-Misses', type: 'deep-dive', order: 2 },
      { id: 'india', title: 'India\'s Third Path — NAM', type: 'zing-moment', order: 3 },
      { id: 'today', title: 'Cold War Echoes in Today\'s World', type: 'application', order: 4 },
    ],
    mood: { why: 'war', crises: 'war', india: 'achievement', today: 'discovery' },
  },
];

// ═══════════════════════════════════════════
// PLACEHOLDER: KNOWLEDGE topics will be added below
// ═══════════════════════════════════════════

const KNOWLEDGE: TopicSeed[] = [
  {
    slug: 'quantum-physics-explained',
    title: 'Quantum Physics — The Reality Underneath Reality',
    subtitle: 'Where particles exist in two places at once',
    quickShotSummary: 'Quantum physics: particles behave as waves AND particles (wave-particle duality), can exist in multiple states simultaneously (superposition), and can be linked across distances (entanglement). Observation changes behavior (Heisenberg uncertainty). Powers: lasers, MRI machines, semiconductors, future quantum computers.',
    description: 'The physics of the very small that breaks every "common sense" rule. And yet, 30% of the world economy depends on quantum mechanics.',
    universe: 'KNOWLEDGE', subWorld: 'space', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['quantum-physics', 'superposition', 'entanglement', 'wave-particle', 'science'],
    examTags: [],
    sources: ['https://www.quantamagazine.org/'],
    content: {
      summary: 'Quantum mechanics: wave-particle duality, superposition, entanglement, uncertainty principle. Weird physics that runs modern technology.',
      keyFacts: ['30% of US GDP depends on technologies based on quantum mechanics', 'Schrödinger\'s Cat is a thought experiment, not animal cruelty', 'Quantum entanglement works faster than light — Einstein called it "spooky action at a distance"', 'Your phone\'s semiconductor chip is a quantum mechanical device'],
      desiAnalogies: [
        { id: 'chai', analogy: 'Schrodinger\'s Chai', explanation: 'Schrödinger\'s Cat = Schrödinger\'s Chai: until you lift the cup lid, the chai is simultaneously hot AND cold (superposition). The moment you check (observe), it "collapses" into one state. Quantum particles work the same way — measurement determines reality!', emoji: '☕' },
        { id: 'gossip', analogy: 'Quantum Entanglement = Desi Gossip Network', explanation: 'Quantum entanglement is like the desi aunty gossip network: when one aunty knows something, the other aunty across town INSTANTLY knows too, with no visible communication channel. Spooky action at a distance — but it works!', emoji: '🫖' },
      ],
      memes: [
        { id: 'm1', text: 'Normal physics: "Objects are either here or there"\nQuantum physics: "Objects are here AND there until you look"\nMe: "That makes no sense"\nQuantum physics: "Welcome." 🤯', context: 'Quantum mechanics defies common sense — and that\'s correct' },
        { id: 'm2', text: 'Einstein: "God does not play dice"\nBohr: "Stop telling God what to do"\n\nQuantum physics won the debate. The universe IS fundamentally random at small scales. 🎲', context: 'The Einstein-Bohr debate shaped modern physics' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Quantum Physics', to: 'How Black Holes Work', insight: 'The biggest unsolved physics problem: quantum mechanics and general relativity (black holes) don\'t work together. Whoever unifies them will solve the universe. It\'s been 100 years and counting.' },
        { id: 'c2', from: 'Semiconductors', to: 'JavaScript & React', insight: 'Your React app runs on quantum physics: CPU chips use quantum tunneling, SSD storage uses quantum mechanics, LED screen pixels are quantum transitions. Software sits on a quantum hardware foundation.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Don\'t try to "understand" quantum mechanics intuitively. Even Feynman said: "Nobody understands quantum mechanics." Learn the math, accept the weirdness, and watch the experiments prove it right.', category: 'MINDSET' },
        { id: 't2', tip: 'Start with: (1) Double-slit experiment (wave-particle duality) → (2) Schrödinger\'s Cat (superposition) → (3) EPR paradox (entanglement). This order builds understanding gradually.', category: 'LEARNING-PATH' },
      ],
    },
    sections: [
      { id: 'weird', title: 'When Physics Gets Weird', type: 'story', order: 1 },
      { id: 'concepts', title: 'The 4 Key Concepts', type: 'deep-dive', order: 2 },
      { id: 'aha', title: 'Your Phone Runs on Quantum Mechanics', type: 'zing-moment', order: 3 },
      { id: 'future', title: 'Quantum Computing — The Next Revolution', type: 'resources', order: 4 },
    ],
    mood: { weird: 'philosophy', concepts: 'discovery', aha: 'achievement', future: 'discovery' },
  },
  {
    slug: 'human-brain-neuroscience',
    title: 'The Human Brain — 86 Billion Neurons',
    subtitle: 'The most complex object in the known universe',
    quickShotSummary: 'The brain has 86 billion neurons connected by 100 trillion synapses. Key regions: prefrontal cortex (decisions), hippocampus (memory), amygdala (emotions), cerebellum (coordination). Neuroplasticity means the brain physically changes with learning. Brain uses 20% of body\'s energy despite being 2% of weight.',
    description: 'The 1.4 kg organ that creates consciousness, stores memories, and does quantum-level computation. And we still don\'t fully understand it.',
    universe: 'KNOWLEDGE', subWorld: 'human-body', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['brain', 'neuroscience', 'neurons', 'memory', 'consciousness'],
    examTags: [],
    sources: ['https://www.brainfacts.org/'],
    content: {
      summary: '86 billion neurons, 100 trillion connections, neuroplasticity, 20% of body energy. Most complex object in the universe.',
      keyFacts: ['Brain has more neural connections than stars in the Milky Way', 'Hippocampus creates new neurons throughout life (neurogenesis)', 'Prefrontal cortex (decision-making) isn\'t fully developed until age 25', 'Brain uses 20% of body\'s oxygen and calories — despite being 2% of body weight'],
      desiAnalogies: [
        { id: 'railway', analogy: 'Indian Railways Network', explanation: 'The brain is India\'s railway network at cosmic scale: neurons are stations (86 billion!), synapses are tracks (100 trillion connections), neurotransmitters are trains (carrying signals), and the prefrontal cortex is Railway Board headquarters (making decisions). Signals travel at 120 m/s.', emoji: '🚂' },
        { id: 'jugaad', analogy: 'Neural Jugaad', explanation: 'Neuroplasticity is the brain\'s jugaad — when one pathway is blocked (injury/disability), the brain rewires to find alternative routes. Like Indian traffic: road blocked? Take the parallel gali. The brain always finds a way.', emoji: '🧠' },
      ],
      memes: [
        { id: 'm1', text: 'Brain: *can solve complex mathematics*\nAlso brain: *walks into a room and forgets why*\n\n86 billion neurons and they all went on lunch break simultaneously. 🧠😅', context: 'The brain\'s capabilities vs embarrassing failures' },
        { id: 'm2', text: 'Brain at 2 AM: "Remember that embarrassing thing from 2015?"\nMe: "I\'m trying to sleep"\nBrain: "What about that other thing from 2012?"\nMe: "WHY DO YOU STORE THIS" 😩', context: 'The brain\'s tendency to replay embarrassing memories at night' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Brain', to: 'Why Do We Dream', insight: 'Dreams occur during REM sleep when the brain is almost as active as when awake. The hippocampus replays the day\'s memories, the amygdala adds emotional processing — dreams are the brain\'s overnight maintenance routine.' },
        { id: 'c2', from: 'Neural Networks', to: 'AI & Machine Learning', insight: 'Artificial neural networks are inspired by the brain\'s architecture: input neurons → hidden layers → output neurons. But the brain has 86 billion neurons vs AI\'s millions. We\'re still building a bicycle compared to the brain\'s spaceship.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Neuroplasticity hack: the brain strengthens pathways that are used frequently (practice) and prunes unused ones. This is literally why "practice makes perfect" — you\'re physically building neural highways.', category: 'LEARNING' },
        { id: 't2', tip: 'Sleep is not optional for the brain: during deep sleep, the glymphatic system flushes toxins (including Alzheimer\'s-linked proteins). 7-8 hours of sleep is brain maintenance, not luxury.', category: 'HEALTH' },
      ],
    },
    sections: [
      { id: 'scale', title: 'The Numbers Are Insane', type: 'story', order: 1 },
      { id: 'regions', title: 'Brain Regions Decoded', type: 'deep-dive', order: 2 },
      { id: 'plastic', title: 'When Neuroplasticity Blows Your Mind', type: 'zing-moment', order: 3 },
      { id: 'hacks', title: 'Brain Optimization Hacks', type: 'hands-on', order: 4 },
    ],
    mood: { scale: 'discovery', regions: 'neutral', plastic: 'achievement', hacks: 'discovery' },
  },
  {
    slug: 'dna-genetics-basics',
    title: 'DNA & Genetics — The Code of Life',
    subtitle: 'Your body\'s 3 billion letter instruction manual',
    quickShotSummary: 'DNA (deoxyribonucleic acid) is a molecule that stores genetic instructions in 3 billion base pairs (A, T, G, C). Genes (20,000-25,000) are DNA segments that code for proteins. Heredity: DNA from both parents combines. Mutations cause variation (evolution) and disease. CRISPR can now edit genes.',
    description: 'Every cell in your body contains 6 feet of DNA packed into a nucleus smaller than a period. The instruction manual for building YOU.',
    universe: 'KNOWLEDGE', subWorld: 'human-body', difficulty: 'BEGINNER', readTimeMinutes: 13,
    tags: ['dna', 'genetics', 'genes', 'crispr', 'heredity'],
    examTags: ['NEET', 'CBSE-12'],
    sources: ['https://www.genome.gov/genetics-glossary/DNA'],
    content: {
      summary: '3 billion base pairs, 20,000+ genes, double helix structure. DNA = source code of life. CRISPR = gene editing tool.',
      keyFacts: ['Humans share 99.9% DNA with each other — 0.1% makes you unique', 'Every cell has 6 feet of DNA coiled into a 6-micron nucleus', 'Humans share 60% DNA with bananas — biology recycles code!', 'CRISPR gene editing won Nobel Prize in 2020 — changes medicine forever'],
      desiAnalogies: [
        { id: 'recipe', analogy: 'Dadi\'s Recipe Book', explanation: 'DNA is like your dadi\'s recipe book passed through generations: genes are individual recipes (for eyes, hair, height), chromosomes are chapters (23 pairs = 46 chapters), mutations are when someone accidentally changes a recipe (sometimes better biryani, sometimes disaster).', emoji: '📖' },
        { id: 'code', analogy: 'The Ultimate Source Code', explanation: 'DNA is literally source code: 4 characters (A, T, G, C) like binary (0, 1), genes are functions, proteins are the output, and cells are the runtime environment. CRISPR is like a code editor that lets you fix bugs in living organisms. Life is a program.', emoji: '💻' },
      ],
      memes: [
        { id: 'm1', text: 'Me: "I\'m unique!"\nGenetics: "You\'re 99.9% identical to every other human"\nAlso genetics: "And 60% banana"\nMe: 🍌\n\nThe 0.1% is doing HEAVY lifting.', context: 'Human genetic similarity is surprisingly high' },
        { id: 'm2', text: 'DNA: *3 billion base pairs of code*\nZero documentation\nZero comments\nStill runs perfectly for 3.8 billion years\n\nEvolution is the ultimate legacy codebase. 🧬', context: 'DNA as the world\'s oldest running codebase' },
      ],
      zingConnections: [
        { id: 'c1', from: 'DNA', to: 'Cell Biology', insight: 'DNA lives in the nucleus but proteins are made in ribosomes (outside nucleus). mRNA carries the instructions out — like an API call from the database (nucleus) to the server (ribosome). Cell biology is a distributed system.' },
        { id: 'c2', from: 'Genetics', to: 'Why Do We Dream', insight: 'Sleep affects gene expression — during deep sleep, genes for repair, immune function, and memory consolidation are activated. Your DNA literally runs different "programs" when you sleep vs when you\'re awake.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Remember base pairing: A-T (Apna-Tera, they go together) and G-C (Gaadi-Chalak, always paired). This mnemonic helps in genetics problems.', category: 'MEMORY' },
        { id: 't2', tip: 'For NEET: Central Dogma (DNA → RNA → Protein) appears every year. Know the enzymes: DNA polymerase (replication), RNA polymerase (transcription), ribosome (translation).', category: 'EXAM' },
      ],
    },
    sections: [
      { id: 'code', title: 'Life Is Written in 4 Letters', type: 'story', order: 1 },
      { id: 'structure', title: 'DNA Structure & Function', type: 'deep-dive', order: 2 },
      { id: 'banana', title: 'You\'re 60% Banana', type: 'zing-moment', order: 3 },
      { id: 'crispr', title: 'CRISPR — Editing the Code of Life', type: 'resources', order: 4 },
    ],
    mood: { code: 'discovery', structure: 'neutral', banana: 'achievement', crispr: 'discovery' },
  },
  {
    slug: 'climate-change-science',
    title: 'Climate Change — The Science, Not the Politics',
    subtitle: 'What 97% of scientists actually agree on',
    quickShotSummary: 'CO₂ levels are at 420 ppm (highest in 800,000 years). Global temperature has risen 1.1°C since pre-industrial era. Consequences: sea level rise (3.6mm/year), extreme weather, ocean acidification, ecosystem collapse. India is 7th most vulnerable country. Solutions: renewable energy, efficiency, carbon capture.',
    description: 'Climate change stripped of politics — just the physics, chemistry, and data. What\'s happening, why, and what solutions exist.',
    universe: 'KNOWLEDGE', subWorld: 'earth', difficulty: 'INTERMEDIATE', readTimeMinutes: 15,
    tags: ['climate-change', 'global-warming', 'carbon', 'environment', 'sustainability'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS'],
    sources: ['https://www.ipcc.ch/'],
    content: {
      summary: 'CO₂ at 420 ppm, +1.1°C warming, sea level rising 3.6mm/year, extreme weather increasing. Science is clear. Solutions exist.',
      keyFacts: ['CO₂ at 420 ppm — highest in 800,000 years (ice core data)', 'India has 3rd highest CO₂ emissions but one of lowest per-capita emissions', 'Arctic ice is melting 13% per decade — no summer ice expected by 2050', 'Renewable energy is now CHEAPER than coal in most countries including India'],
      desiAnalogies: [
        { id: 'pressure-cooker', analogy: 'Pressure Cooker Earth', explanation: 'CO₂ is like keeping the pressure cooker (Earth) on the stove with the weight sealed: heat keeps building (greenhouse effect), pressure increases (temperature/sea level), and if you don\'t release the valve (reduce emissions), it eventually blows. We\'re at 2 whistles.', emoji: '♨️' },
        { id: 'monsoon', analogy: 'Monsoon Gone Wrong', explanation: 'Climate change for India = monsoon disruption. Maharashtra floods + Rajasthan drought in the same year. The monsoon that feeds 1.4 billion people is becoming unpredictable. This isn\'t abstract science — it\'s our roti-kapda-makan at risk.', emoji: '🌧️' },
      ],
      memes: [
        { id: 'm1', text: 'Earth: *sends floods, heatwaves, cyclones as warnings*\nHumans: "Is this a weather fluctuation?"\nEarth: "I\'VE BEEN SHOUTING FOR 50 YEARS"\nHumans: "Must be natural cycle" 🔥🌊', context: 'Climate denial vs overwhelming scientific evidence' },
        { id: 'm2', text: 'India: "But our per-capita emissions are low!"\nAlso India: *3rd highest total emitter*\nAlso India: *most affected by climate change*\n\nThe math doesn\'t care about fairness. We need to act AND demand fairness. 🇮🇳', context: 'India\'s unique position — low per capita but high total and high vulnerability' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Climate Change', to: 'Indian Monsoon', insight: 'Indian monsoon patterns are directly affected by ocean temperature changes. A 1°C rise in Indian Ocean temperature makes monsoons more erratic — more floods AND more droughts. Understanding climate science IS understanding India\'s future food security.' },
        { id: 'c2', from: 'Greenhouse Effect', to: 'Photosynthesis', insight: 'Plants absorb CO₂ through photosynthesis — they\'re natural carbon capture machines. Deforestation removes this biological CO₂ filter while simultaneously releasing stored carbon. Protecting forests is the cheapest climate solution.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Know the Paris Agreement (limit warming to 1.5°C), India\'s NDC (net-zero by 2070), and IPCC reports. Climate change appears in GS-1 (Geography), GS-3 (Environment), and Essay paper.', category: 'EXAM' },
        { id: 't2', tip: 'The greenhouse effect is NOT bad — without it, Earth would be -18°C. The ENHANCED greenhouse effect (extra CO₂ from fossil fuels) is the problem. This distinction matters scientifically.', category: 'CONCEPT' },
      ],
    },
    sections: [
      { id: 'data', title: 'The Data That Ends All Debates', type: 'story', order: 1 },
      { id: 'science', title: 'The Greenhouse Physics', type: 'deep-dive', order: 2 },
      { id: 'india', title: 'Why India Cannot Ignore This', type: 'zing-moment', order: 3 },
      { id: 'solutions', title: 'Solutions That Already Exist', type: 'resources', order: 4 },
    ],
    mood: { data: 'war', science: 'neutral', india: 'war', solutions: 'discovery' },
  },
  {
    slug: 'solar-system-guide',
    title: 'The Solar System — Cosmic Neighborhood Tour',
    subtitle: 'Our 4.6 billion year old home',
    quickShotSummary: 'Solar system: Sun (99.86% of mass) + 8 planets + dwarf planets + asteroids + comets. Inner planets: Mercury, Venus, Earth, Mars (rocky). Outer planets: Jupiter, Saturn, Uranus, Neptune (gas/ice giants). Key: habitable zone (Goldilocks zone), asteroid belt, Kuiper belt, Oort cloud.',
    description: 'From the Sun\'s nuclear furnace to Neptune\'s frozen winds — a tour of our cosmic neighborhood and India\'s role in exploring it.',
    universe: 'KNOWLEDGE', subWorld: 'space', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['solar-system', 'planets', 'sun', 'space', 'astronomy'],
    examTags: ['CBSE-8'],
    sources: ['https://solarsystem.nasa.gov/'],
    content: {
      summary: '8 planets, 1 star, billions of objects. Sun is 99.86% of solar system mass. Earth is in the Goldilocks zone. India sent missions to Moon and Mars.',
      keyFacts: ['Light from the Sun takes 8 minutes to reach Earth', 'Jupiter is so large that 1,300 Earths could fit inside it', 'India\'s Chandrayaan-3 successfully landed on Moon\'s south pole (2023)', 'Mars Orbiter Mission (Mangalyaan, 2014) cost less than making the movie Gravity'],
      desiAnalogies: [
        { id: 'family', analogy: 'Solar System Joint Family', explanation: 'Solar system is an Indian joint family: Sun is the patriarch (provides for everyone), Jupiter is the elder brother (protects from asteroids), Earth is the lucky middle child (Goldilocks zone), Mars is the adventurous cousin India wants to visit, and Pluto is the relative who got "disowned" (downgraded to dwarf planet in 2006).', emoji: '👨‍👩‍👧‍👦' },
        { id: 'budget', analogy: 'ISRO Budget Magic', explanation: 'Mangalyaan cost ₹450 crore — less than an auto ride per Indian citizen (₹4/person). NASA\'s Mars mission cost $671 million. ISRO proved that space exploration doesn\'t need American budgets — just Indian jugaad and brilliant engineering.', emoji: '🚀' },
      ],
      memes: [
        { id: 'm1', text: 'ISRO Mangalyaan budget: ₹450 crore\nMovie "Gravity" budget: ₹500 crore\n\nISRO: *actually goes to Mars for less than a movie about space*\nHollywood: 👁️👄👁️', context: 'ISRO\'s cost efficiency is legendary' },
        { id: 'm2', text: 'Pluto in 2005: "I\'m a planet!"\nIAU in 2006: "Not anymore"\nPluto: 🥺\n\nRemember: your worth isn\'t defined by others\' classifications. Stay strong, Pluto. 💪', context: 'Pluto\'s reclassification emotionally affected us all' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Solar System', to: 'How Black Holes Work', insight: 'The Sun is an average star. When more massive stars die, they can form black holes. Understanding our solar system\'s star (Sun) is the first step to understanding extreme stellar objects.' },
        { id: 'c2', from: 'Chandrayaan', to: 'Newton\'s Laws', insight: 'Every ISRO mission runs on Newton\'s laws of motion and universal gravitation — F=ma and F=Gm₁m₂/r². The 300-year-old physics that sent India to the Moon\'s south pole!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Planet order mnemonic: "My Very Educated Mother Just Served Us Nachos" — Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.', category: 'MEMORY' },
        { id: 't2', tip: 'For ISRO-related UPSC questions: know Chandrayaan-1 (2008, discovered water on Moon), Mangalyaan (2014, Mars), Chandrayaan-3 (2023, south pole landing). India\'s space achievements are exam favorites.', category: 'EXAM' },
      ],
    },
    sections: [
      { id: 'neighborhood', title: 'Our Cosmic Address', type: 'story', order: 1 },
      { id: 'tour', title: 'Planet-by-Planet Tour', type: 'deep-dive', order: 2 },
      { id: 'isro', title: 'India\'s ₹4-Per-Person Mars Mission', type: 'zing-moment', order: 3 },
      { id: 'beyond', title: 'What\'s Beyond Neptune?', type: 'resources', order: 4 },
    ],
    mood: { neighborhood: 'discovery', tour: 'discovery', isro: 'achievement', beyond: 'philosophy' },
  },
  {
    slug: 'human-immune-system',
    title: 'The Immune System — Your Body\'s Army',
    subtitle: 'An army of trillions fighting 24/7',
    quickShotSummary: 'Immune system has 2 lines: innate (skin, mucus, inflammation — generic defense) and adaptive (T-cells, B-cells, antibodies — targeted defense). Vaccines train the adaptive system with harmless "mugshots." Autoimmune diseases = army attacks own body. HIV destroys T-helper cells, collapsing the system.',
    description: 'Your body fights millions of pathogens daily and you don\'t even notice. The incredible army inside you and how vaccines help it train.',
    universe: 'KNOWLEDGE', subWorld: 'human-body', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['immune-system', 'vaccines', 'antibodies', 'white-blood-cells', 'health'],
    examTags: ['NEET', 'CBSE-12'],
    sources: ['https://www.niaid.nih.gov/'],
    content: {
      summary: 'Innate immunity (generic, fast) + Adaptive immunity (specific, slow, memory). Vaccines = army training with dummy enemies.',
      keyFacts: ['Your body makes 3.8 million white blood cells every SECOND', 'Adaptive immune system "remembers" every pathogen it has ever fought', 'Fever is not the disease — it\'s your immune system raising body temperature to kill pathogens', 'Breast milk transfers mother\'s antibodies to baby (passive immunity)'],
      desiAnalogies: [
        { id: 'border', analogy: 'Indian Border Security', explanation: 'Immune system is like India\'s border defense: Skin = border fence (physical barrier). Mucus = BSF patrol (first response). White blood cells = Army (targeted attack). Antibodies = intelligence operatives (recognize specific intruders). Vaccines = joint military exercises (practice for real threats).', emoji: '🛡️' },
        { id: 'neighbourhood', analogy: 'Society Watchman System', explanation: 'Innate immunity = society gate watchman (stops everyone suspicious, generic check). Adaptive immunity = apartment CCTV with face recognition (identifies and remembers specific intruders). First time: slow response. Second time: "Arre, tu phir aaya? OUT." (memory cells).', emoji: '🏢' },
      ],
      memes: [
        { id: 'm1', text: 'Immune system: *kills 99.99% of pathogens silently*\n0.01% pathogen: *causes cold*\nMe: "My immune system is trash"\nImmune system: "EXCUSE ME??" 😤\n\nGive your body some credit.', context: 'We only notice when the immune system fails, not the millions of times it succeeds' },
        { id: 'm2', text: 'Anti-vaxxer: "Vaccines are unnatural"\nBreast milk: *literally contains antibodies*\nMother\'s immune system: "I\'ve been vaccinating since day 1"\n\nPassive immunity is nature\'s vaccine. 🍼', context: 'Natural immunity transfer happens constantly' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Immune System', to: 'Cell Biology', insight: 'White blood cells are made in bone marrow from stem cells. Understanding cell division and differentiation (from cell biology) explains how your immune system produces billions of specialized fighters daily.' },
        { id: 'c2', from: 'Fever', to: 'Newton\'s Laws', insight: 'Fever is thermodynamics in action — the body converts chemical energy to heat energy to create an environment hostile to pathogens. Physics principles apply inside your body!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'NEET distinction: Active immunity (you fight, slow, long-lasting: vaccines) vs Passive immunity (pre-made antibodies given, fast, short-lived: anti-venom). This is tested every year.', category: 'EXAM' },
        { id: 't2', tip: 'Mnemonic for immune cells: "B for Bullets (antibodies), T for Tactical (cell-mediated). B-cells shoot antibodies from distance. T-cells go hand-to-hand with infected cells."', category: 'MEMORY' },
      ],
    },
    sections: [
      { id: 'war', title: 'The War Inside Your Body', type: 'story', order: 1 },
      { id: 'army', title: 'Innate vs Adaptive Immunity', type: 'deep-dive', order: 2 },
      { id: 'vaccine', title: 'How Vaccines Train Your Army', type: 'zing-moment', order: 3 },
      { id: 'boost', title: 'Boosting Your Immune System', type: 'hands-on', order: 4 },
    ],
    mood: { war: 'war', army: 'neutral', vaccine: 'achievement', boost: 'discovery' },
  },
  {
    slug: 'volcanoes-tectonic-plates',
    title: 'Volcanoes & Tectonic Plates — Earth\'s Restless Surface',
    subtitle: 'The ground beneath your feet is always moving',
    quickShotSummary: 'Earth\'s surface has 15 major tectonic plates floating on magma. Where plates meet: earthquakes, volcanoes, mountains form. Ring of Fire (Pacific) has 75% of world\'s volcanoes. India sits on the Indian Plate, pushing into Eurasian Plate (creating Himalayas). Plate tectonics explains continental drift.',
    description: 'The solid ground you stand on is floating on liquid rock, moving 2 cm/year. When plates collide, mountains rise and volcanoes erupt.',
    universe: 'KNOWLEDGE', subWorld: 'earth', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['volcanoes', 'tectonic-plates', 'earthquakes', 'geology', 'ring-of-fire'],
    examTags: ['UPSC-PRELIMS', 'CBSE-8'],
    sources: ['https://www.usgs.gov/programs/earthquake-hazards'],
    content: {
      summary: '15 major plates floating on magma. Collisions create mountains, volcanoes, earthquakes. India pushes north → Himalayas grow.',
      keyFacts: ['Indian plate moves north at ~5 cm/year — Himalayas grow ~1 cm/year', 'Ring of Fire has 452 volcanoes — 75% of all active volcanoes', 'India\'s Barren Island (Andaman) is the only confirmed active volcano in India', 'Pangaea supercontinent broke apart 200 million years ago — India drifted from Africa to Asia'],
      desiAnalogies: [
        { id: 'chapati', analogy: 'Chapati on Hot Tawa', explanation: 'Tectonic plates are like chapatis on a hot tawa: the heat underneath (mantle convection) makes them bubble and move. Where two chapatis touch (plate boundaries), they wrinkle (mountains) or tear (rifts). The Himalayas = the biggest wrinkle from India\'s chapati pushing into Asia\'s.', emoji: '🫓' },
        { id: 'traffic', analogy: 'Delhi Traffic Jam = Plate Collision', explanation: 'Tectonic plates move like Delhi traffic: mostly slow (2-5 cm/year), but at intersections (boundaries), crashes happen (earthquakes). India-Eurasia plate intersection = the longest slow-motion crash in history — creating the Himalayas for 50 million years.', emoji: '🚗' },
      ],
      memes: [
        { id: 'm1', text: 'India 50 million years ago: *floating across the ocean*\nEurasian Plate: "Where are you going?"\nIndia: "I\'m coming for you"\n*CRASH*\nHimalayas: *exists*\n\nThe longest road trip in geological history. 🏔️', context: 'India literally collided with Asia to form the Himalayas' },
        { id: 'm2', text: 'Himalayas: *grow 1 cm taller every year*\nMount Everest: "I keep setting new records"\nErosion: "Hold my beer"\n\nThe mountain grows AND shrinks simultaneously. Nature\'s balance. ⛰️', context: 'Tectonic uplift vs erosion creates a dynamic equilibrium' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Tectonic Plates', to: 'UPSC Geography', insight: 'Plate tectonics explains India\'s physical geography: Himalayas (collision), Deccan Plateau (volcanic), Western Ghats (rifting), Andaman Islands (subduction). One concept explains India\'s entire landscape.' },
        { id: 'c2', from: 'Earthquakes', to: 'System Design', insight: 'Earthquake-resistant building design uses the same principles as fault-tolerant systems: redundancy, graceful degradation, shock absorption, load distribution. Physical engineering and software engineering share design patterns.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Know India\'s 4 seismic zones (II-V). Zone V (highest risk): NE India, Kashmir, Himachal. This maps directly to tectonic plate boundaries. Geography + disaster management = combined prep.', category: 'EXAM' },
        { id: 't2', tip: 'Remember 3 types of plate boundaries: Convergent (plates collide → mountains/volcanoes), Divergent (plates separate → rift valleys), Transform (plates slide past → earthquakes). Match to Indian examples.', category: 'CONCEPT' },
      ],
    },
    sections: [
      { id: 'ground', title: 'The Ground Is NOT Solid', type: 'story', order: 1 },
      { id: 'plates', title: 'How Tectonic Plates Work', type: 'deep-dive', order: 2 },
      { id: 'india', title: 'India\'s 50 Million Year Journey', type: 'zing-moment', order: 3 },
      { id: 'predict', title: 'Can We Predict Earthquakes?', type: 'resources', order: 4 },
    ],
    mood: { ground: 'discovery', plates: 'neutral', india: 'achievement', predict: 'war' },
  },
  {
    slug: 'fibonacci-golden-ratio',
    title: 'Fibonacci & Golden Ratio — Math in Nature',
    subtitle: 'The number pattern hidden in flowers, galaxies, and your face',
    quickShotSummary: 'Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... (each number = sum of previous two). The ratio of consecutive Fibonacci numbers approaches φ (phi) ≈ 1.618, the Golden Ratio. Found in: sunflower spiral (21/34 seeds), nautilus shell, galaxy arms, DNA helix, Parthenon proportions.',
    description: 'A 13th-century Italian mathematician\'s number sequence appears in sunflowers, hurricanes, stock markets, and Renaissance art. The most elegant pattern in mathematics.',
    universe: 'KNOWLEDGE', subWorld: 'mathematics', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['fibonacci', 'golden-ratio', 'mathematics', 'patterns', 'nature'],
    examTags: [],
    sources: ['https://mathworld.wolfram.com/FibonacciNumber.html'],
    content: {
      summary: 'Fibonacci: 0,1,1,2,3,5,8,13... Golden Ratio: φ ≈ 1.618. Appears in nature, art, architecture, and algorithms.',
      keyFacts: ['Sunflowers have 21 and 34 spirals — both Fibonacci numbers', 'Golden Ratio appears in human face proportions, DNA, and galaxy spirals', 'The Fibonacci sequence was actually known in India (Pingala, 200 BCE) before Fibonacci', 'Used in computer science: Fibonacci heaps, search algorithms, generating random numbers'],
      desiAnalogies: [
        { id: 'rangoli', analogy: 'Nature\'s Rangoli', explanation: 'Fibonacci patterns in nature are like cosmic rangoli — mathematically precise, visually beautiful, infinitely repeating. Sunflower seeds spiral in Fibonacci numbers, just like kolam/rangoli patterns follow mathematical symmetry. Nature is an artist that uses math as paint.', emoji: '🌻' },
        { id: 'interest', analogy: 'Compound Interest Pattern', explanation: 'Fibonacci growth mimics compound interest: small numbers (1, 1, 2) grow slowly, then explode (89, 144, 233, 377...). Just like your SIP: ₹500/month looks tiny, but the compounding makes it massive. Math patterns repeat across nature and finance!', emoji: '📈' },
      ],
      memes: [
        { id: 'm1', text: 'Fibonacci: *discovers the sequence in 1202 AD*\nPingala: *laughs in 200 BCE*\n\nIndia invented it first. As usual. We just didn\'t get the marketing right. 📢🇮🇳', context: 'Indian mathematician Pingala described Fibonacci-like patterns centuries earlier' },
        { id: 'm2', text: 'Me: "Math is useless in real life"\nMath: *holds together every flower, galaxy, seashell, and piece of art ever created*\nMe: 👁️👄👁️ "Okay fine."', context: 'Mathematics in nature makes its utility undeniable' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Fibonacci', to: 'DSA Patents', insight: 'Fibonacci sequence appears in computer science constantly: Fibonacci heaps (priority queues), Fibonacci search (divide & conquer), dynamic programming examples, and generating pseudo-random numbers. Math → Algorithms → Code.' },
        { id: 'c2', from: 'Golden Ratio', to: 'DNA', insight: 'DNA\'s double helix has golden ratio proportions — the major and minor grooves are in φ ratio. The most beautiful math pattern is literally encoded in the molecule of life. Math is biology\'s language.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Generate Fibonacci: each number = sum of previous two. Start: 0, 1 → 0+1=1 → 1+1=2 → 1+2=3 → 2+3=5 → 3+5=8 → 5+8=13. Memorize first 15 for pattern recognition.', category: 'BASICS' },
        { id: 't2', tip: 'The Golden Ratio is used in design: web layouts, logos (Apple, Twitter), photography (rule of thirds is an approximation). Learning φ makes you a better designer AND mathematician.', category: 'APPLICATION' },
      ],
    },
    sections: [
      { id: 'pattern', title: 'The Pattern Hidden Everywhere', type: 'story', order: 1 },
      { id: 'math', title: 'The Fibonacci Sequence & Golden Ratio', type: 'deep-dive', order: 2 },
      { id: 'nature', title: 'When You Start Seeing It Everywhere', type: 'zing-moment', order: 3 },
      { id: 'code', title: 'Fibonacci in Code & Design', type: 'hands-on', order: 4 },
    ],
    mood: { pattern: 'discovery', math: 'neutral', nature: 'achievement', code: 'discovery' },
  },
  {
    slug: 'ocean-science-deep-sea',
    title: 'Deep Oceans — Earth\'s Last Frontier',
    subtitle: 'We know more about Mars than our own ocean floor',
    quickShotSummary: 'Oceans cover 71% of Earth, average depth 3.7 km. Only 5% of ocean floor is mapped in detail. Deepest point: Mariana Trench (11 km). Deep sea has no sunlight, extreme pressure, and life that uses chemosynthesis instead of photosynthesis. Ocean currents regulate global climate.',
    description: 'The deep ocean is darker than space, under crushing pressure, and filled with life forms that seem alien. And it\'s right here on Earth.',
    universe: 'KNOWLEDGE', subWorld: 'earth', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['ocean', 'deep-sea', 'marine', 'mariana-trench', 'marine-biology'],
    examTags: ['UPSC-PRELIMS'],
    sources: ['https://www.noaa.gov/ocean'],
    content: {
      summary: '71% of Earth, 5% explored. Mariana Trench = 11 km deep. Deep oceans regulate climate, host alien-like life, and hide most of Earth\'s biodiversity.',
      keyFacts: ['95% of the ocean remains unexplored', 'There\'s more gold in the ocean (20 million tons) than all gold ever mined', 'Ocean produces 50% of world\'s oxygen via phytoplankton', 'More people have been to space (600+) than the bottom of the Mariana Trench (3)'],
      desiAnalogies: [
        { id: 'well', analogy: 'Kavi ke Kuan se Samudra Tak', explanation: 'Exploring the ocean is like going from a frog\'s perspective in a well (shallow water) to the unlimited ocean (deep sea). At each depth level, the world changes completely — from sunlit coral reefs (shallow) to pitch-black volcanic vents (deep). Depth = entirely different worlds.', emoji: '🌊' },
        { id: 'market', analogy: 'Ocean Layers = Mall Floors', explanation: 'Ocean layers are like a vertical mall: Sunlight zone (top floor, crowded, all the popular shops/fish), Twilight zone (mid floor, dimmer, interesting finds), Midnight zone (basement, dark, rare items), Abyss (sub-basement, extreme, undiscovered). Most people never go past the food court.', emoji: '🏬' },
      ],
      memes: [
        { id: 'm1', text: 'NASA: *maps Mars surface in full detail*\nOcean scientists: "Can we get some budget too?"\nPublic: "Space is cooler"\nOcean: *hides 95% of Earth\'s living space*\n\nThe alien life we seek might be 11 km DOWN, not up. 🌊👽', context: 'Ocean exploration is chronically underfunded compared to space' },
        { id: 'm2', text: 'Deep sea fish: *lives at 11,000m depth, no light, crushing pressure*\nMe: *complains about Monday morning* \n\nPerspective. 🐟', context: 'Deep sea life forms are incredibly resilient' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Ocean Currents', to: 'Climate Change', insight: 'Ocean currents (like Gulf Stream) distribute heat globally — Europe is warm because of Atlantic currents, not just latitude. Climate change disrupting these currents could cause extreme weather shifts.' },
        { id: 'c2', from: 'Ocean Chemistry', to: 'Photosynthesis', insight: 'Phytoplankton (ocean\'s tiny plants) produce 50% of Earth\'s oxygen through photosynthesis. The ocean is the planet\'s biggest lung. Protecting oceans = protecting our oxygen supply.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Ocean layers and their ecosystems appear in Environment section. Remember: Photic zone (0-200m, sunlight), Aphotic zone (200m+, no light). Most marine life is in the photic zone near coasts.', category: 'EXAM' },
        { id: 't2', tip: 'India\'s Deep Ocean Mission (launched 2021) aims to explore 6000m depth in the Central Indian Ocean. This is a current affairs + science crossover topic for UPSC.', category: 'CURRENT-AFFAIRS' },
      ],
    },
    sections: [
      { id: 'unknown', title: 'The Last Unexplored Place on Earth', type: 'story', order: 1 },
      { id: 'layers', title: 'The 5 Ocean Zones', type: 'deep-dive', order: 2 },
      { id: 'alien', title: 'Life Without Sunlight', type: 'zing-moment', order: 3 },
      { id: 'india', title: 'India\'s Deep Ocean Mission', type: 'resources', order: 4 },
    ],
    mood: { unknown: 'discovery', layers: 'neutral', alien: 'achievement', india: 'discovery' },
  },
  {
    slug: 'pi-number-infinite-mystery',
    title: 'Pi (π) — The Never-Ending Number',
    subtitle: 'The ratio that holds the universe together',
    quickShotSummary: 'Pi (π) ≈ 3.14159... is the ratio of a circle\'s circumference to its diameter. It\'s irrational (never-ending, non-repeating decimals). Appears in: circle geometry, wave physics, probability (normal distribution), Einstein\'s field equations, even in rivers\' meandering patterns. Calculated to 62.8 trillion digits.',
    description: 'A number discovered 4000 years ago that appears in every corner of mathematics and physics. And we still can\'t write it completely.',
    universe: 'KNOWLEDGE', subWorld: 'mathematics', difficulty: 'BEGINNER', readTimeMinutes: 10,
    tags: ['pi', 'mathematics', 'geometry', 'circles', 'irrational-numbers'],
    examTags: [],
    sources: ['https://mathworld.wolfram.com/Pi.html'],
    content: {
      summary: 'π = circumference/diameter ≈ 3.14159... Irrational, transcendental, found everywhere in math, physics, and nature.',
      keyFacts: ['Pi has been calculated to 62.8 trillion digits — no patterns found', 'Ancient Indians (Aryabhata, 499 CE) calculated pi as 3.1416 — remarkably accurate', 'Pi appears in Einstein\'s equations, Heisenberg\'s uncertainty principle, and DNA\'s structure', 'March 14 (3/14) is celebrated as Pi Day worldwide'],
      desiAnalogies: [
        { id: 'chai', analogy: 'Pi Is Like Cutting Chai', explanation: 'Pi is like the ratio you instinctively know when making cutting chai — the perfect amount of water to milk to tea to sugar. That ratio, like pi, is always the same regardless of the cup size. Big cup or small cup — the RATIO stays constant. That\'s what pi does for circles.', emoji: '☕' },
        { id: 'aryabhata', analogy: 'India\'s Mathematical Heritage', explanation: 'Aryabhata calculated π = 3.1416 in 499 CE — a thousand years before European mathematicians got close. Madhava of Sangamagrama (Kerala, 14th century) discovered the infinite series for pi before Leibniz. Math IS our heritage.', emoji: '🧮' },
      ],
      memes: [
        { id: 'm1', text: 'Pi: *has 62.8 trillion calculated digits*\nAlso Pi: *still not repeating*\n\nWe\'ve been doing this for 4000 years.\n"Are we there yet?"\n"No." 🔢♾️', context: 'Pi\'s irrationality means the decimal expansion never ends or repeats' },
        { id: 'm2', text: 'Engineer: π = 3\nPhysicist: π = 3.14\nMathematician: "π is a transcendental irrational number that—"\nEngineer: "I said 3. Build the bridge." 🌉😤', context: 'Different fields need different levels of pi precision' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Pi', to: 'Quantum Physics', insight: 'Pi appears in Heisenberg\'s uncertainty principle (ΔxΔp ≥ ℏ/2 where ℏ = h/2π) and Schrödinger\'s equation. A number discovered from circles shows up in quantum mechanics. Math is spookily universal.' },
        { id: 'c2', from: 'Pi', to: 'Fibonacci & Golden Ratio', insight: 'Pi and phi (Golden Ratio) are both irrational numbers found throughout nature. Together, they describe circles (pi) and spirals (phi). Combined, they explain why galaxies, sunflowers, and hurricanes look the way they do.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Memorize first 10 digits: 3.1415926535. Mnemonic: "May I have a large container of coffee ready for me?" (count letters in each word).', category: 'MEMORY' },
        { id: 't2', tip: 'Aryabhata\'s contribution to pi is a common quiz/exam question. Know: he approximated π ≈ 3.1416 and explicitly stated it was "approaching" — implying he knew it was irrational.', category: 'HISTORY' },
      ],
    },
    sections: [
      { id: 'mystery', title: 'A Number That Never Ends', type: 'story', order: 1 },
      { id: 'math', title: 'Pi in Math & Physics', type: 'deep-dive', order: 2 },
      { id: 'india', title: 'India Calculated Pi First', type: 'zing-moment', order: 3 },
      { id: 'fun', title: 'Pi Day & Fun Facts', type: 'resources', order: 4 },
    ],
    mood: { mystery: 'philosophy', math: 'neutral', india: 'achievement', fun: 'discovery' },
  },
  {
    slug: 'electricity-how-it-works',
    title: 'Electricity — From Electron to Outlet',
    subtitle: 'The invisible force powering civilization',
    quickShotSummary: 'Electricity = flow of electrons through conductors. Key concepts: voltage (pressure), current (flow rate), resistance (friction). Ohm\'s Law: V=IR. Power: P=VI. AC (alternating current) powers homes (220V in India). Generated by: thermal (coal), hydro (water), solar, nuclear, wind. India\'s grid: 3rd largest globally.',
    description: 'Everything you use runs on electricity, but most people can\'t explain how a switch works. From electrons to power grids — the complete story.',
    universe: 'KNOWLEDGE', subWorld: 'experiments', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['electricity', 'physics', 'circuits', 'power', 'energy'],
    examTags: ['CBSE-10', 'JEE-MAINS'],
    sources: ['https://ncert.nic.in/textbook/pdf/jesc113.pdf'],
    content: {
      summary: 'Electrons flow through conductors. V=IR. Power = VI. India uses 220V AC. Grid = 3rd largest globally. 70%+ from thermal.',
      keyFacts: ['India has 3rd largest power grid — 442 GW installed capacity', 'AC won the "War of Currents" over DC — Tesla was right', 'Electricity travels near speed of light (~300,000 km/s) through wires', 'Solar power cost dropped 90% in 10 years — now cheapest source in India'],
      desiAnalogies: [
        { id: 'water', analogy: 'Water Tank Analogy', explanation: 'Voltage = water tank height (pressure). Current = water flow rate (liters/second). Resistance = pipe thickness (thin pipe = high resistance). Ohm\'s Law: more pressure (voltage) OR wider pipe (less resistance) = more water (current). V = IR is just plumbing math!', emoji: '🚰' },
        { id: 'india-grid', analogy: 'Indian Railway = Power Grid', explanation: 'India\'s power grid works like Indian Railways: power plants are origins (Mumbai, Delhi), transmission lines are railway tracks, transformers are junction stations (step up/down voltage), and your home is the final destination. Load shedding = train cancelled. ⚡', emoji: '🚂' },
      ],
      memes: [
        { id: 'm1', text: 'Tesla: "AC is the future"\nEdison: "DC is safer"\n*Tesla wins*\n*100 years later*\nUSB-C, EV batteries, solar panels: all DC\n\nEdison: "I TOLD YOU" ⚡\n\nThe War of Currents continues.', context: 'AC won for transmission but DC is making a comeback in electronics' },
        { id: 'm2', text: 'Indian summer:\nAC: ON\nElectricity: *cuts*\nInverter: *beeps ominously*\nFan: *slows to death*\nMe: "This is fine" 🥵\n\nThe universal Indian experience.', context: 'Power cuts are a shared Indian experience' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Electricity', to: 'Climate Change', insight: 'Electricity generation (mostly fossil fuels) is the #1 source of CO₂ emissions globally. Switching to renewable sources solves both the energy AND climate problem simultaneously. The clean energy transition is an electricity problem.' },
        { id: 'c2', from: 'Circuits', to: 'JavaScript Promises', insight: 'Electrical circuits and programming share concepts: series circuit = synchronous code (sequential), parallel circuit = async/Promise.all (concurrent), short circuit = try/catch (error handling). Understanding circuits aids programming intuition.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For CBSE/JEE: V=IR and P=VI are the two most important formulas. From these, derive: P=I²R and P=V²/R. Every numericals problem uses one of these 4 forms.', category: 'EXAM' },
        { id: 't2', tip: 'Common mistake: Voltage is measured ACROSS a component (parallel), Current is measured THROUGH a component (series). Getting this wrong = wrong answers in circuit problems.', category: 'CONCEPT' },
      ],
    },
    sections: [
      { id: 'invisible', title: 'The Invisible Force', type: 'story', order: 1 },
      { id: 'basics', title: 'V, I, R — The Holy Trinity', type: 'deep-dive', order: 2 },
      { id: 'grid', title: 'India\'s Power Grid Is Incredible', type: 'zing-moment', order: 3 },
      { id: 'future', title: 'Solar, Wind & India\'s Energy Future', type: 'resources', order: 4 },
    ],
    mood: { invisible: 'discovery', basics: 'neutral', grid: 'achievement', future: 'discovery' },
  },
  {
    slug: 'evolution-natural-selection',
    title: 'Evolution — How Life Changes Over Time',
    subtitle: '3.8 billion years of biological R&D',
    quickShotSummary: 'Evolution = change in species over generations through natural selection. Darwin\'s theory: variation exists → some variations are advantageous → advantageous traits survive and reproduce → species change over time. Evidence: fossil record, DNA comparison, vestigial organs, observed evolution (bacteria, finches).',
    description: 'From single-celled organisms to 8.7 million species — the 3.8 billion year process that explains ALL life on Earth, including you.',
    universe: 'KNOWLEDGE', subWorld: 'experiments', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['evolution', 'natural-selection', 'darwin', 'adaptation', 'biology'],
    examTags: ['NEET', 'CBSE-12'],
    sources: ['https://evolution.berkeley.edu/'],
    content: {
      summary: 'Natural selection: variation + survival pressure + reproduction = species change over time. 3.8 billion years, millions of species, one process.',
      keyFacts: ['All life on Earth shares a common ancestor from ~3.8 billion years ago', 'Humans and chimps share 98.8% DNA — diverged 6-7 million years ago', 'Evolution is NOT "survival of the fittest" — it\'s "survival of the fit enough"', 'Antibiotic-resistant bacteria = evolution happening in REAL TIME in hospitals'],
      desiAnalogies: [
        { id: 'market', analogy: 'Startup Market Selection', explanation: 'Evolution is like the startup ecosystem: many startups launch (variation), market conditions test them (selection pressure), those with product-market fit survive (adaptation), others shut down (extinction). The market doesn\'t care about your effort — only fit survives.', emoji: '📈' },
        { id: 'family', analogy: 'Joint Family Tree', explanation: 'Indian joint family tree is evolution in miniature: great-grandparents (common ancestor), different branches (species), family resemblance (shared DNA), and each generation slightly different from the previous (variation). Your family IS a living evolution experiment.', emoji: '🌳' },
      ],
      memes: [
        { id: 'm1', text: 'People: "If we evolved from monkeys, why are there still monkeys?"\nEvolution: "That\'s not how this works"\nActual fact: Monkeys and humans share a COMMON ANCESTOR — neither descended from the other.\n\nRead the science! 🐒↔️🧑', context: 'The most common misconception about evolution' },
        { id: 'm2', text: 'Bacteria: *evolves antibiotic resistance*\nDoctors: *develop new antibiotic*\nBacteria: *evolves resistance again*\n\nThe arms race no one asked for. 🦠💪\n\nThis is evolution in fast-forward.', context: 'Antibiotic resistance is observable evolution' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Evolution', to: 'DNA & Genetics', insight: 'Evolution operates on DNA: random mutations create variation, natural selection "chooses" which mutations spread. Understanding DNA mechanics explains HOW evolution happens at the molecular level.' },
        { id: 'c2', from: 'Natural Selection', to: 'AI & Machine Learning', insight: 'Genetic algorithms in AI literally simulate evolution: create variations (mutations), test fitness (evaluate), select the best (survive), repeat for thousands of generations. Evolution is nature\'s machine learning algorithm.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For NEET: Know evidence for evolution: (1) Fossil record (2) Comparative anatomy (homologous/analogous organs) (3) Molecular biology (DNA comparison) (4) Biogeography (island species). All four types appear in questions.', category: 'EXAM' },
        { id: 't2', tip: 'Distinguish: Lamarck (acquired characteristics are inherited — WRONG) vs Darwin (natural selection — RIGHT). But know both for exam purposes. The comparison is always tested.', category: 'COMPARISON' },
      ],
    },
    sections: [
      { id: 'question', title: 'Where Did All Life Come From?', type: 'story', order: 1 },
      { id: 'darwin', title: 'Darwin\'s 4-Step Process', type: 'deep-dive', order: 2 },
      { id: 'realtime', title: 'Evolution Is Happening RIGHT NOW', type: 'zing-moment', order: 3 },
      { id: 'human', title: 'The Human Evolution Story', type: 'resources', order: 4 },
    ],
    mood: { question: 'philosophy', darwin: 'neutral', realtime: 'achievement', human: 'discovery' },
  },
];

// ═══════════════════════════════════════════
// PLACEHOLDER: CURIOSITY topics will be added below
// ═══════════════════════════════════════════

const CURIOSITY: TopicSeed[] = [
  {
    slug: 'cognitive-biases-decoded',
    title: 'Cognitive Biases — Why Your Brain Lies to You',
    subtitle: 'The 188 shortcuts your brain takes without asking',
    quickShotSummary: 'Cognitive biases are mental shortcuts (heuristics) that lead to systematic errors. Key biases: Confirmation bias (seeking info that confirms beliefs), Dunning-Kruger (incompetent people overestimate ability), Anchoring (first number influences decisions), Sunk Cost fallacy (continuing because you already invested).',
    description: 'Your brain isn\'t a logic machine — it\'s a pattern-matching shortcut factory with 188 documented bugs. Time to learn the manual.',
    universe: 'CURIOSITY', subWorld: 'psychology', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['cognitive-biases', 'psychology', 'thinking', 'decision-making', 'brain'],
    examTags: [],
    sources: ['https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/'],
    content: {
      summary: '188 documented biases. Confirmation, Dunning-Kruger, Anchoring, Sunk Cost, Availability = the top 5 that affect daily decisions.',
      keyFacts: ['188 cognitive biases have been documented by researchers', 'Dunning-Kruger: the less you know, the more you think you know', 'Anchoring bias makes the first number you see influence all subsequent judgments', 'Doctors, judges, and scientists are equally susceptible to biases'],
      desiAnalogies: [
        { id: 'marriage', analogy: 'Arranged Marriage Biases', explanation: 'Arranged marriage process is bias central: Confirmation bias (ignore red flags because parents approved), Anchoring (first photo determines expectations), Halo effect (good salary = good person), Sunk Cost (already met 5 times, can\'t say no now). Awareness of biases = better decisions.', emoji: '💑' },
        { id: 'ipl', analogy: 'IPL Auction Anchoring', explanation: 'IPL auction is an anchoring bias factory: base price of ₹2 crore "anchors" teams to bid higher. If base was ₹50 lakhs, bidding would stay lower. The first number changes everything — knowing this gives you negotiation superpower.', emoji: '🏏' },
      ],
      memes: [
        { id: 'm1', text: 'Dunning-Kruger effect:\nBeginner: "I know everything about this"\nIntermediate: "I know nothing"\nExpert: "I know some things"\n\nThe valley of wisdom is real. 📊', context: 'Confidence vs competence curve is counterintuitive' },
        { id: 'm2', text: 'Sunk Cost Fallacy:\n*Watched 1 hour of a terrible movie*\n"I should finish it, already invested 1 hour"\n\nThat 1 hour is GONE. The only question: is the NEXT hour worth it? 🎬', context: 'Sunk costs should not affect future decisions' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Cognitive Biases', to: 'UPSC Ethics', insight: 'Cognitive biases appear in UPSC Ethics case studies: a district collector with confirmation bias ignoring evidence, a politician with sunk cost fallacy continuing a failed project. Naming the bias in your answer shows analytical depth.' },
        { id: 'c2', from: 'Decision Making', to: 'Startup Validation', insight: 'Founders suffer from confirmation bias (only hearing positive feedback) and sunk cost fallacy (continuing because of time invested). Knowing your biases makes you a better entrepreneur and product manager.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Top 5 biases everyone should know: (1) Confirmation (2) Anchoring (3) Sunk Cost (4) Dunning-Kruger (5) Availability (judging probability by how easily examples come to mind).', category: 'ESSENTIAL' },
        { id: 't2', tip: 'Anti-bias hack: Before any important decision, ask "What would change my mind?" If nothing — you\'re in confirmation bias territory. Force yourself to consider the opposite view.', category: 'PRACTICE' },
      ],
    },
    sections: [
      { id: 'bugs', title: 'Your Brain Has 188 Bugs', type: 'story', order: 1 },
      { id: 'top5', title: 'The 5 Biases That Rule Your Life', type: 'deep-dive', order: 2 },
      { id: 'aha', title: 'When You Catch Yourself Mid-Bias', type: 'zing-moment', order: 3 },
      { id: 'fight', title: 'How to Fight Your Own Brain', type: 'hands-on', order: 4 },
    ],
    mood: { bugs: 'discovery', top5: 'neutral', aha: 'achievement', fight: 'neutral' },
  },
  {
    slug: 'behavioral-economics-nudge',
    title: 'Behavioral Economics — Why We\'re Irrational with Money',
    subtitle: 'Nobel Prize-winning insights about bad financial decisions',
    quickShotSummary: 'Behavioral economics: humans aren\'t rational economic agents. Key concepts: Loss aversion (losing ₹100 hurts 2x more than gaining ₹100 pleases), Mental accounting (treating money differently based on source), Nudge theory (small design changes alter big decisions), Present bias (immediate rewards > future rewards).',
    description: 'Traditional economics says humans are rational. Behavioral economics proved we\'re beautifully, predictably irrational. Understanding this changes everything.',
    universe: 'CURIOSITY', subWorld: 'economics', difficulty: 'INTERMEDIATE', readTimeMinutes: 13,
    tags: ['behavioral-economics', 'nudge', 'loss-aversion', 'irrationality', 'kahneman'],
    examTags: [],
    sources: ['https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/facts/'],
    content: {
      summary: 'Humans are predictably irrational. Loss aversion, mental accounting, nudges, present bias. Understanding this = better financial decisions.',
      keyFacts: ['Kahneman won 2002 Nobel for proving humans are irrational decision-makers', 'Thaler won 2017 Nobel for "nudge theory" — small design changes alter behavior', 'Loss aversion: we feel losses 2x stronger than equivalent gains', 'India\'s Swachh Bharat used nudge theory — behavioral change through design'],
      desiAnalogies: [
        { id: 'sale', analogy: 'Big Billion Day Irrationality', explanation: 'Flipkart Big Billion Day exploits every behavioral bias: Anchoring ("₹20,000" crossed out, ₹12,000 shown), Loss aversion ("Only 2 left!"), Social proof ("50,000 people bought this"), Present bias ("Flash deal ends in 2h!"). You think you\'re smart shopping. You\'re being nudged.', emoji: '🛒' },
        { id: 'wallet', analogy: 'Shagun Money vs Salary', explanation: 'Mental accounting: you\'ll spend ₹5,000 shagun money on dinner without thinking, but you\'ll agonize over spending ₹5,000 from salary on the same dinner. Same ₹5,000, different mental buckets. Money is money — but your brain disagrees.', emoji: '💰' },
      ],
      memes: [
        { id: 'm1', text: 'Free shipping on ₹999+ order\nMy cart: ₹850\nMe: *adds ₹200 item I don\'t need*\n\nI spent ₹200 to "save" ₹100 on shipping.\nBehavioral economics wins again. 🛒💸', context: 'Free shipping thresholds are a classic nudge' },
        { id: 'm2', text: 'Classical economics: "Humans are rational"\nBehavioral economics: "Humans buy gym memberships and never go"\n\nWho\'s right? 🏋️😅', context: 'The gap between intention and action defines behavioral economics' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Behavioral Economics', to: 'Cognitive Biases', insight: 'Behavioral economics IS applied cognitive bias research. Kahneman documented the biases; Thaler showed how they affect economic decisions. Same biases, different domain — psychology meets money.' },
        { id: 'c2', from: 'Nudge Theory', to: 'UX Design', insight: 'Every UX designer uses nudge theory: default options (opt-out vs opt-in), progress bars, social proof ("500 people ordered this"). Understanding behavioral economics makes you a better product designer.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Anti-manipulation awareness: When you feel urgency to buy ("only 2 left!"), recognize it as scarcity nudge. When you feel a deal is amazing, check: is the original price real, or is it anchoring manipulation?', category: 'DEFENSE' },
        { id: 't2', tip: 'Use nudges FOR yourself: auto-SIP (removes present bias), savings goal labels (mental accounting that helps), keeping a "no-buy" list on phone (commitment device).', category: 'SELF-NUDGE' },
      ],
    },
    sections: [
      { id: 'irrational', title: 'Humans Are Predictably Irrational', type: 'story', order: 1 },
      { id: 'concepts', title: 'The 5 Key Concepts', type: 'deep-dive', order: 2 },
      { id: 'nudge', title: 'The Nudge That Changed Government Policy', type: 'zing-moment', order: 3 },
      { id: 'protect', title: 'Protecting Yourself from Manipulation', type: 'hands-on', order: 4 },
    ],
    mood: { irrational: 'discovery', concepts: 'neutral', nudge: 'achievement', protect: 'war' },
  },
  {
    slug: 'stoicism-for-modern-life',
    title: 'Stoicism — The 2000-Year-Old Life Hack',
    subtitle: 'Control what you can, accept what you can\'t',
    quickShotSummary: 'Stoicism (300 BCE, Greece/Rome): Focus on what you can control (your actions, thoughts, responses), accept what you can\'t (other people, events, weather). Key thinkers: Marcus Aurelius (emperor), Epictetus (slave), Seneca (advisor). Modern applications: stress management, decision-making, emotional resilience.',
    description: 'A philosophy born in Ancient Greece, practiced by Roman emperors, and now used by Silicon Valley CEOs and Navy SEALs. Stoicism works because it\'s simple.',
    universe: 'CURIOSITY', subWorld: 'philosophy', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['stoicism', 'philosophy', 'marcus-aurelius', 'mindset', 'resilience'],
    examTags: [],
    sources: ['https://plato.stanford.edu/entries/stoicism/'],
    content: {
      summary: 'Focus on what you control, accept what you can\'t. Stoicism = ancient wisdom for modern stress. Used by emperors and entrepreneurs alike.',
      keyFacts: ['Marcus Aurelius wrote Meditations while ruling the Roman Empire — and fighting wars', 'Epictetus was a SLAVE who became one of history\'s greatest philosophers', 'Tim Ferriss, Ryan Holiday, and many tech leaders practice Stoicism daily', 'The Stoic concept of "memento mori" (remember you will die) drives urgency and focus'],
      desiAnalogies: [
        { id: 'gita', analogy: 'Bhagavad Gita Connection', explanation: 'Stoicism and the Bhagavad Gita teach remarkably similar lessons: Krishna says "You have a right to action, not the fruits" (Karma Yoga) = Stoics say "Focus on effort, accept the outcome." Epictetus and Krishna would have been best friends.', emoji: '📖' },
        { id: 'traffic', analogy: 'Mumbai Traffic Test', explanation: 'Stuck in Mumbai traffic? Stoic test: Can you control the traffic? No. Can you control your reaction? Yes. Option A: honk, curse, raise BP. Option B: listen to a podcast, practice patience. Same traffic, completely different experience. That\'s Stoicism.', emoji: '🚗' },
      ],
      memes: [
        { id: 'm1', text: 'Marcus Aurelius: *rules Roman Empire*\nAlso Marcus Aurelius: "Some things are within our control, some are not"\n\nMe: *can\'t control Swiggy delivery time*\n*applies Stoicism*\n*inner peace restored* 🧘', context: 'Stoicism scales from empire-ruling to food-delivery-waiting' },
        { id: 'm2', text: '"Why are you so calm?"\nMe: "I\'ve accepted that I can\'t control others, only my responses"\n"That\'s very philosophical"\nMe: "No, that\'s Tuesday in a joint family" 👨‍👩‍👧‍👦', context: 'Living in Indian families naturally builds Stoic resilience' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Stoicism', to: 'UPSC Ethics', insight: 'Stoic principles map directly to UPSC Ethics: integrity (Marcus Aurelius), equanimity under pressure (Epictetus), duty over desire (Seneca). Quoting Stoic thinkers in Ethics answers adds philosophical depth.' },
        { id: 'c2', from: 'Emotional Control', to: 'Workplace Communication', insight: 'Stoicism\'s core skill — responding thoughtfully instead of reacting emotionally — is THE most important workplace communication skill. Pause before responding to that angry email. That\'s Stoicism in action.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The Dichotomy of Control: before stressing about anything, ask "Can I control this?" If yes → act. If no → accept and focus energy elsewhere. This single question reduces 80% of anxiety.', category: 'PRACTICE' },
        { id: 't2', tip: 'Start with Marcus Aurelius\'s Meditations (Gregory Hays translation) — only 150 pages, written as personal journal entries. Most accessible ancient philosophy book ever written.', category: 'READING' },
      ],
    },
    sections: [
      { id: 'emperor', title: 'The Emperor\'s Secret Journal', type: 'story', order: 1 },
      { id: 'principles', title: 'The 4 Stoic Virtues', type: 'deep-dive', order: 2 },
      { id: 'gita', title: 'When Stoicism Meets the Gita', type: 'zing-moment', order: 3 },
      { id: 'daily', title: 'Daily Stoic Practice', type: 'hands-on', order: 4 },
    ],
    mood: { emperor: 'philosophy', principles: 'neutral', gita: 'achievement', daily: 'neutral' },
  },
  {
    slug: 'cryptocurrency-blockchain-explained',
    title: 'Cryptocurrency & Blockchain — Beyond the Hype',
    subtitle: 'The technology, not the speculation',
    quickShotSummary: 'Blockchain: distributed ledger where transactions are verified by network consensus, not a central authority. Bitcoin: first cryptocurrency (2009, Satoshi Nakamoto). Key concepts: decentralization, mining, smart contracts (Ethereum), DeFi. India: 30% crypto tax + 1% TDS from 2022. Technology is real; speculation is dangerous.',
    description: 'Ignore the "get rich quick" noise. Understand the technology: how blockchain works, what problems it solves, and where the real value lies.',
    universe: 'CURIOSITY', subWorld: 'economics', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['cryptocurrency', 'blockchain', 'bitcoin', 'ethereum', 'defi'],
    examTags: [],
    sources: ['https://bitcoin.org/bitcoin.pdf'],
    content: {
      summary: 'Blockchain: distributed, immutable ledger. Bitcoin started it. Ethereum added smart contracts. Technology real, speculation risky.',
      keyFacts: ['Bitcoin whitepaper is only 9 pages — elegant simplicity', 'Blockchain processes fewer transactions/sec than Visa but is decentralized', 'India has 30% tax on crypto gains + 1% TDS — one of the highest globally', 'Ethereum smart contracts enable DeFi, NFTs, and DAOs — programmable money'],
      desiAnalogies: [
        { id: 'hawala', analogy: 'Digital Hawala System', explanation: 'Blockchain is like a digital hawala network: trusted person-to-person transfer without a bank in between. But instead of trusting ONE hawala operator, you trust a network of THOUSANDS of computers. No single point of failure, no single point of corruption.', emoji: '💱' },
        { id: 'land', analogy: 'Tamper-Proof Land Registry', explanation: 'Indian land records are notoriously prone to fraud. Blockchain-based land registry: once a transaction is recorded, it can\'t be altered. No more fake property papers, no more bribery at tehsildar office. This is blockchain\'s real potential — not speculation.', emoji: '🏠' },
      ],
      memes: [
        { id: 'm1', text: 'Bitcoin in 2010: ₹0.5\nBitcoin in 2021: ₹50,00,000\nBitcoin in 2022: ₹15,00,000\nIndia govt: "30% tax on gains"\n\n"To the moon" 🌕 meets "to the taxman" 💰😅', context: 'Crypto volatility meets Indian tax policy' },
        { id: 'm2', text: 'Me explaining blockchain to family:\n"It\'s a decentralized distributed ledger—"\nDad: "So... digital gold?"\nMom: "Is it like FD?"\nDadi: "Buy real gold instead"\n\nEvery Indian family conversation about crypto. 🏠', context: 'Explaining new tech to traditional families is always an adventure' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Blockchain', to: 'System Design', insight: 'Blockchain IS distributed systems: consensus algorithms (Raft → PoW), replication (every node has full copy), immutability (append-only log). Understanding blockchain means understanding distributed system design.' },
        { id: 'c2', from: 'Cryptocurrency', to: 'Personal Finance', insight: 'Crypto should be MAX 5% of your portfolio for speculative allocation. The 30% flat tax in India + 1% TDS makes short-term trading mathematically unviable. If you invest, HODL + declare everything.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Understand the technology before investing: Read the Bitcoin whitepaper (9 pages, free). If you can\'t explain how blockchain works, you shouldn\'t invest in crypto. Education > speculation.', category: 'EDUCATION' },
        { id: 't2', tip: 'India crypto tax: 30% flat on gains (no deduction for losses from other crypto), 1% TDS on all transactions. Factor tax into EVERY trade calculation — it changes the math dramatically.', category: 'TAX' },
      ],
    },
    sections: [
      { id: 'hype', title: 'Cutting Through the Crypto Hype', type: 'story', order: 1 },
      { id: 'tech', title: 'How Blockchain Actually Works', type: 'deep-dive', order: 2 },
      { id: 'real', title: 'Real-World Applications Beyond Speculation', type: 'zing-moment', order: 3 },
      { id: 'india', title: 'Crypto in India — Rules & Taxes', type: 'resources', order: 4 },
    ],
    mood: { hype: 'war', tech: 'neutral', real: 'achievement', india: 'neutral' },
  },
  {
    slug: 'sleep-science-explained',
    title: 'The Science of Sleep — Why We Can\'t Skip It',
    subtitle: '8 hours that determine the other 16',
    quickShotSummary: 'Sleep has 4 stages: N1 (light), N2 (spindles), N3 (deep/restorative), REM (dreams). Full cycle: 90 minutes. Need: 7-8 hours for adults. During sleep: memories consolidate, toxins flush (glymphatic system), muscles repair, immune system strengthens. Sleep deprivation: worse than being drunk after 24h.',
    description: 'Sleep isn\'t passive rest — it\'s active maintenance. Your brain is as busy during sleep as it is awake. Here\'s what happens every night.',
    universe: 'CURIOSITY', subWorld: 'psychology', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['sleep', 'neuroscience', 'rem', 'health', 'circadian-rhythm'],
    examTags: [],
    sources: ['https://www.sleepfoundation.org/'],
    content: {
      summary: '4 sleep stages, 90-min cycles, 7-8 hours needed. Memory consolidation, toxin flushing, immune boosting all happen during sleep.',
      keyFacts: ['After 17 hours awake, cognitive performance equals 0.05% blood alcohol (legally drunk in many countries)', 'REM sleep is when most dreaming occurs — eyes literally move rapidly', 'Deep sleep (N3) is when growth hormone is released — essential for physical recovery', 'Blue light from screens suppresses melatonin, delaying sleep onset by 90+ minutes'],
      desiAnalogies: [
        { id: 'server', analogy: 'Sleep = Server Maintenance Window', explanation: 'Sleep is your body\'s maintenance window: the IT admin (brain) backs up data (memory consolidation), installs security patches (immune system), cleans up temp files (toxin flushing), and restarts services (hormone regulation). Skip maintenance = system crash.', emoji: '🖥️' },
        { id: 'diwali', analogy: 'Diwali Cleaning', explanation: 'Sleep is like Diwali cleaning for your brain: during N3 deep sleep, the glymphatic system literally washes toxins (including Alzheimer\'s-linked proteins) out of the brain. No cleaning (no sleep) = accumulated dirt (toxins) = long-term damage. Brain needs its annual Diwali cleaning EVERY NIGHT.', emoji: '🧹' },
      ],
      memes: [
        { id: 'm1', text: 'JEE aspirant: "Sleep is for the weak"\nNeuroscience: "Memory consolidation happens during sleep"\nJEE aspirant: *forgets everything studied at night*\nBrain: "I TRIED TO TELL YOU" 🧠😴', context: 'Pulling all-nighters for studying is counterproductive' },
        { id: 'm2', text: 'Phone at 11 PM: *emits blue light*\nMelatonin: "I guess I\'ll die"\nBrain at 2 AM: "Why can\'t I sleep?"\n\nPut. The. Phone. Down. 📱➡️😴', context: 'Blue light is the #1 modern sleep disruptor' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Sleep Science', to: 'Why Do We Dream', insight: 'Dreams occur primarily in REM sleep. The brain processes emotions (amygdala active) and memory (hippocampus replaying events). Dreams aren\'t random — they\'re the brain\'s emotional and cognitive filing system.' },
        { id: 'c2', from: 'Circadian Rhythm', to: 'Human Brain', insight: 'The suprachiasmatic nucleus (a tiny brain cluster) controls your 24-hour circadian clock. It syncs with light/dark cycles. Disrupting this clock (jet lag, night shifts, late-night screens) has cascading health effects.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The 10-3-2-1 rule: 10 hours before bed — no caffeine. 3 hours — no food. 2 hours — no work. 1 hour — no screens. This sequence optimizes sleep quality dramatically.', category: 'ROUTINE' },
        { id: 't2', tip: 'Sleep cycles are 90 minutes. Set your alarm in 90-minute multiples from sleep time (e.g., 7.5 hours = 5 cycles). Waking between cycles (not during deep sleep) feels dramatically better.', category: 'HACK' },
      ],
    },
    sections: [
      { id: 'myth', title: 'The "I\'ll Sleep When I\'m Dead" Myth', type: 'story', order: 1 },
      { id: 'stages', title: 'The 4 Sleep Stages', type: 'deep-dive', order: 2 },
      { id: 'clean', title: 'Your Brain Washes Itself During Sleep', type: 'zing-moment', order: 3 },
      { id: 'optimize', title: 'Sleep Optimization Toolkit', type: 'hands-on', order: 4 },
    ],
    mood: { myth: 'war', stages: 'neutral', clean: 'achievement', optimize: 'discovery' },
  },
  {
    slug: 'geopolitics-of-water',
    title: 'Water Wars — The Next Global Conflict',
    subtitle: 'The resource more valuable than oil',
    quickShotSummary: 'Only 2.5% of Earth\'s water is freshwater. 1.1 billion people lack safe drinking water. Conflict hotspots: Nile (Egypt vs Ethiopia), Indus (India vs Pakistan), Mekong (China vs SE Asia), Jordan (Israel vs neighbors). India: 18% of world population, 4% of world\'s freshwater. Water scarcity = food scarcity = conflict.',
    description: 'Oil created 20th century conflicts. Water will create 21st century ones. Understanding water geopolitics is understanding the future.',
    universe: 'CURIOSITY', subWorld: 'geopolitics', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['water-scarcity', 'geopolitics', 'conflict', 'environment', 'india'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS'],
    sources: ['https://www.worldbank.org/en/topic/water'],
    content: {
      summary: 'Only 2.5% freshwater on Earth. India has 18% people but 4% water. Water conflicts between nations are escalating globally.',
      keyFacts: ['By 2030, global water demand will exceed supply by 40%', 'India faces the worst water crisis in its history — 600 million people affected', 'The Indus Water Treaty (1960) is one of the world\'s most successful water-sharing agreements', '70% of global freshwater is used in agriculture — food security = water security'],
      desiAnalogies: [
        { id: 'tanker', analogy: 'Water Tanker Wars', explanation: 'Indian cities already fight water wars at micro level: colonies fighting over water tanker timing, societies vs municipal supply, farmers vs industrialists for groundwater. The geopolitical version is the same fight — just between nations sharing a river.', emoji: '🚰' },
        { id: 'dam', analogy: 'Upstream Controls Downstream', explanation: 'In geopolitics, whoever controls the river upstream controls everyone downstream. China dams the Brahmaputra → India worries. Ethiopia dams the Nile → Egypt worries. India dams Indus → Pakistan worries. Power flows with water.', emoji: '🏗️' },
      ],
      memes: [
        { id: 'm1', text: 'India: 18% of world population\nIndia\'s freshwater: 4%\nIndia\'s water management: 😨\n\nWe\'re not running out of water. We\'re running out of well-managed water. 💧', context: 'India\'s water crisis is partly management, partly scarcity' },
        { id: 'm2', text: '21st century wars:\n"We\'re fighting over oil"\n*oil runs out*\n"We\'re fighting over water"\n*water runs out*\n"We\'re fighting over—"\n*nothing left*\n\nMaybe stop fighting and start managing? 🤝💧', context: 'Resource conflicts follow a pattern — cooperation is always better' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Water Conflicts', to: 'Indian Constitution', insight: 'Inter-state water disputes in India (Cauvery, Krishna) are constitutional issues — Article 262 + Inter-State Water Disputes Act. The Constitution provides the framework, but implementation remains political. UPSC connects water to polity.' },
        { id: 'c2', from: 'Water Scarcity', to: 'Climate Change', insight: 'Climate change disrupts water cycles: glaciers melting (Indus water supply threatened), erratic monsoons (agriculture affected), droughts and floods increasing. Water scarcity + climate change is a compounding crisis.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Know the key water treaties and disputes: Indus Water Treaty (India-Pak), Cauvery dispute (Karnataka-TN), Nile conflict (Egypt-Ethiopia-Sudan). Water is tested in Geography, International Relations, AND Environment.', category: 'EXAM' },
        { id: 't2', tip: 'India-specific water fact: groundwater provides 85% of rural drinking water and 60% of irrigation. India is the world\'s largest user of groundwater. This one fact explains most of India\'s water crisis.', category: 'KEY-FACT' },
      ],
    },
    sections: [
      { id: 'crisis', title: 'The Coming Water Crisis', type: 'story', order: 1 },
      { id: 'hotspots', title: 'Global Water Conflict Hotspots', type: 'deep-dive', order: 2 },
      { id: 'india', title: 'India\'s Water Time Bomb', type: 'zing-moment', order: 3 },
      { id: 'solutions', title: 'Solutions That Work', type: 'resources', order: 4 },
    ],
    mood: { crisis: 'war', hotspots: 'war', india: 'war', solutions: 'discovery' },
  },
  {
    slug: 'bollywood-economics',
    title: 'Bollywood Economics — The Business of Dreams',
    subtitle: 'India\'s ₹19,000 crore entertainment machine',
    quickShotSummary: 'Bollywood (Hindi film industry) revenue: ~₹19,000 crore. Revenue streams: theatrical (30%), digital/OTT (35%), satellite (15%), music (10%), overseas (10%). Star salaries: ₹20-150 crore per film. Box office success rate: only 10-15% of films are profitable. OTT (Netflix, Prime, Hotstar) is changing the economics.',
    description: 'Behind every Bollywood blockbuster is a complex business model — star economics, music rights, satellite deals, and now OTT disruption.',
    universe: 'CURIOSITY', subWorld: 'arts-culture', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['bollywood', 'economics', 'entertainment', 'ott', 'business'],
    examTags: [],
    sources: ['https://www.ficci.in/'],
    content: {
      summary: '₹19,000 crore industry. 85% films lose money. OTT changed revenue models. Star value vs content debate. India produces most films globally.',
      keyFacts: ['India produces ~1,500-2,000 films annually — most in the world', 'Only 10-15% of Bollywood films make profit at box office', 'OTT (Netflix/Prime/Hotstar) now provides 35% of film revenue — more than theatrical', 'South Indian film industry revenue has surpassed Bollywood in recent years'],
      desiAnalogies: [
        { id: 'startup', analogy: 'Film = Startup', explanation: 'Every Bollywood film is a startup: Producer (investor), Director (CEO), Star (brand ambassador), Script (business plan). 85% fail (like startups). The 15% that succeed subsidize the failures. Film industry and startup ecosystem have the same economics!', emoji: '🎬' },
        { id: 'ott', analogy: 'OTT = Streaming Sabzi Mandi', explanation: 'OTT disrupted Bollywood like BigBasket disrupted sabzi mandi: traditional distribution (theatres = physical shops) being replaced by digital delivery (OTT = online ordering). Content variety increased, prices dropped, and the consumer won.', emoji: '📱' },
      ],
      memes: [
        { id: 'm1', text: 'Star\'s salary: ₹100 crore\nFilm budget: ₹150 crore\nBox office: ₹80 crore\nProducer: 😭\n\nContent films:\nBudget: ₹30 crore\nBox office: ₹200 crore\nProducer: 😎\n\nContent > Stars (slowly becoming true)', context: 'The economics of star-driven vs content-driven films' },
        { id: 'm2', text: 'Bollywood in 2015: "OTT? That\'s for TV shows"\nBollywood in 2024: "Please buy our film for OTT release"\n\nHow the tables turn. 📺→📱', context: 'OTT\'s rising power in Bollywood' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Bollywood Economics', to: 'Personal Finance', insight: 'Film financing uses the same principles as personal investing: diversification (multiple revenue streams), risk management (satellite rights guarantee minimum returns), and market timing (release date selection). Entertainment is finance with spotlights.' },
        { id: 'c2', from: 'Film Industry', to: 'Behavioral Economics', insight: 'Box office relies on behavioral economics: opening weekend FOMO (scarcity + social proof), star power (halo effect), "100 crore club" anchoring, word-of-mouth cascades. Films are marketed using every cognitive bias in the book.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Film revenue isn\'t just box office: music rights (15-20% of budget recovered), satellite (30-40%), digital/OTT (up to 100% of budget for stars). Many films "flop" at box office but profit overall.', category: 'BUSINESS' },
        { id: 't2', tip: 'South Indian cinema overtook Bollywood because of: lower star costs, content-first approach, pan-India dubbing strategy, and loyal regional audiences. The shift from Bollywood-centric to pan-Indian is THE industry trend.', category: 'TREND' },
      ],
    },
    sections: [
      { id: 'numbers', title: 'The ₹19,000 Crore Dream Factory', type: 'story', order: 1 },
      { id: 'revenue', title: 'How Films Actually Make Money', type: 'deep-dive', order: 2 },
      { id: 'ott', title: 'OTT: The Revolution Nobody Expected', type: 'zing-moment', order: 3 },
      { id: 'south', title: 'Why South Indian Cinema Won', type: 'comparison', order: 4 },
    ],
    mood: { numbers: 'discovery', revenue: 'neutral', ott: 'achievement', south: 'discovery' },
  },
  {
    slug: 'ai-how-chatgpt-works',
    title: 'How ChatGPT Actually Works',
    subtitle: 'Demystifying the AI that everyone uses',
    quickShotSummary: 'ChatGPT is a Large Language Model (LLM) trained on internet text. It predicts the next word based on context (not "understanding"). Training: pre-training (reading internet) + fine-tuning (human feedback/RLHF). Limitations: hallucinations (confident wrong answers), no real-time knowledge, doesn\'t think — it patterns.',
    description: 'Everyone uses ChatGPT but few understand how it works. Not magic, not sentient — just very sophisticated pattern matching. And that\'s impressive enough.',
    universe: 'CURIOSITY', subWorld: 'psychology', difficulty: 'INTERMEDIATE', readTimeMinutes: 14,
    tags: ['ai', 'chatgpt', 'llm', 'machine-learning', 'technology'],
    examTags: [],
    sources: ['https://openai.com/research/'],
    content: {
      summary: 'LLM = predicts next word based on patterns in training data. Pre-training + RLHF fine-tuning. Not intelligent, but incredibly useful.',
      keyFacts: ['GPT-4 was trained on ~13 trillion tokens of text data', 'It predicts the next word 1 word at a time — the "intelligence" is an emergent property', 'RLHF (Reinforcement Learning from Human Feedback) makes it helpful and less harmful', 'AI "hallucinations" occur because the model generates plausible-sounding but false text'],
      desiAnalogies: [
        { id: 'parrot', analogy: 'World\'s Smartest Parrot', explanation: 'ChatGPT is like the world\'s smartest parrot: it has "heard" (trained on) billions of conversations and can remix them brilliantly, but it doesn\'t "understand" meaning. A parrot saying "the cat is on the mat" doesn\'t know what a cat IS. ChatGPT: same concept, trillion-dollar scale.', emoji: '🦜' },
        { id: 'recipe', analogy: 'Cooking Without Tasting', explanation: 'ChatGPT learned to cook by reading every recipe ever written (training), then a chef corrected its dishes (RLHF). It makes great-looking food but can\'t actually taste it. Sometimes it looks perfect but has no salt (hallucination). Always verify the output!', emoji: '👨‍🍳' },
      ],
      memes: [
        { id: 'm1', text: 'ChatGPT: "I apologize for the confusion. Here\'s the corrected—"\nMe: "You were so confident the first time!"\nChatGPT: "I\'m trained to sound confident"\nMe: "THAT\'S the problem" 😅', context: 'AI confidence doesn\'t correlate with accuracy' },
        { id: 'm2', text: 'Student: *uses ChatGPT for homework*\nChatGPT: *gives wrong answer confidently*\nTeacher: "This is completely wrong"\nStudent: "But the AI said—"\n\n🤖 ≠ 📚 Always verify!', context: 'Blind trust in AI output is dangerous' },
      ],
      zingConnections: [
        { id: 'c1', from: 'ChatGPT', to: 'Human Brain', insight: 'The brain uses ~86 billion neurons with 100 trillion connections. GPT-4 has ~1.8 trillion parameters. Despite similar scale, they work completely differently: brain learns from experience + emotion, AI learns from statistical patterns in text. Intelligence vs imitation.' },
        { id: 'c2', from: 'AI Training', to: 'Evolution', insight: 'AI training mimics evolution: generate variations (random weights), test fitness (loss function), select the best (gradient descent), repeat for millions of iterations. Machine learning IS artificial evolution with math instead of biology.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Use AI for: brainstorming, first drafts, code templates, explaining concepts. Don\'t use AI for: final answers, medical/legal advice, anything requiring factual accuracy without verification.', category: 'USAGE' },
        { id: 't2', tip: 'Better prompts = better outputs. Be specific: "Write a Python function that calculates Fibonacci using memoization" >> "Write Fibonacci code." Context + constraints + format = good prompts.', category: 'PROMPT' },
      ],
    },
    sections: [
      { id: 'magic', title: 'It\'s Not Magic — It\'s Math', type: 'story', order: 1 },
      { id: 'how', title: 'How LLMs Actually Work', type: 'deep-dive', order: 2 },
      { id: 'limits', title: 'Why It\'s Confidently Wrong Sometimes', type: 'zing-moment', order: 3 },
      { id: 'use', title: 'Using AI Effectively', type: 'hands-on', order: 4 },
    ],
    mood: { magic: 'discovery', how: 'neutral', limits: 'war', use: 'achievement' },
  },
  {
    slug: 'happiness-research',
    title: 'The Science of Happiness — What Actually Works',
    subtitle: 'Spoiler: it\'s not money (after ₹12 LPA)',
    quickShotSummary: 'Research shows: after basic needs met (~₹12 LPA in India), more money doesn\'t increase happiness much. What works: relationships (strongest predictor), gratitude practice, flow states (challenging work), exercise, sleep, helping others. Hedonic adaptation: we get used to both good and bad things quickly.',
    description: 'Harvard\'s 85-year study concluded: relationships are the #1 predictor of happiness. Not money, not career, not followers. Science has answers.',
    universe: 'CURIOSITY', subWorld: 'psychology', difficulty: 'BEGINNER', readTimeMinutes: 11,
    tags: ['happiness', 'psychology', 'well-being', 'research', 'mental-health'],
    examTags: [],
    sources: ['https://www.health.harvard.edu/blog/the-harvard-study-of-adult-development'],
    content: {
      summary: 'Relationships > money > career for happiness. Gratitude, flow states, exercise, and sleep are evidence-based happiness boosters.',
      keyFacts: ['Harvard Study of Adult Development (85 years): relationships are #1 happiness predictor', 'Money increases happiness up to ~$75K/year (₹12 LPA in India) — then plateaus', 'Hedonic adaptation: lottery winners return to baseline happiness within 1 year', 'Expressing gratitude increases happiness by 25% according to research'],
      desiAnalogies: [
        { id: 'joint-family', analogy: 'Joint Family vs Penthouse', explanation: 'Indian joint families intuitively get what Harvard found: strong relationships = happiness. Your chacha\'s jokes, dadi\'s stories, cousin\'s cricket matches add more life satisfaction than a penthouse with no one to share dinner. Joint family IS the happiness research conclusion.', emoji: '👨‍👩‍👧‍👦' },
        { id: 'chai', analogy: 'Cutting Chai Theory', explanation: 'Happiness research matches the cutting chai philosophy: small, shared, frequent moments > one grand celebration. Daily chai with friends > annual vacation alone. Frequency and social connection matter more than intensity and luxury.', emoji: '☕' },
      ],
      memes: [
        { id: 'm1', text: 'Salary: ₹5 LPA → ₹15 LPA → ₹50 LPA\nHappiness: 😐 → 😊 → 😊\n\nMoney helps up to a point. After that, it\'s relationships and purpose that matter.\nBut try explaining this to relatives at family gatherings. 💰😂', context: 'The diminishing returns of money on happiness' },
        { id: 'm2', text: 'Harvard studied happiness for 85 YEARS\nConclusion: "Have good relationships"\n\nDadi: "I told you this 85 years ago"\nScience: *catches up to grandma wisdom* 👵', context: 'Traditional wisdom often predates scientific confirmation' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Happiness', to: 'Cognitive Biases', insight: 'Hedonic adaptation is a cognitive bias — we overestimate how much new things (car, promotion, house) will make us happy, and underestimate relationships and experiences. Knowing this bias helps allocate time better.' },
        { id: 'c2', from: 'Flow State', to: 'Programming', insight: 'Csikszentmihalyi\'s "flow" — complete absorption in challenging work — is one of the strongest happiness predictors. Programmers experience flow more than most professionals. Coding can be a happiness practice!' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'The 3 gratitude journal: every night, write 3 specific things you\'re grateful for. Not generic ("family") but specific ("Mom called to check on me today"). 21 days of this measurably increases happiness.', category: 'DAILY' },
        { id: 't2', tip: 'Invest in experiences, not things. Research: spending ₹5,000 on a dinner with friends generates more lasting happiness than spending ₹5,000 on a gadget. Experiences become memories; things become background.', category: 'SPENDING' },
      ],
    },
    sections: [
      { id: 'money', title: 'The Money Myth', type: 'story', order: 1 },
      { id: 'harvard', title: 'What 85 Years of Research Found', type: 'deep-dive', order: 2 },
      { id: 'dadi', title: 'When Science Confirms Dadi\'s Wisdom', type: 'zing-moment', order: 3 },
      { id: 'practice', title: 'Evidence-Based Happiness Practices', type: 'hands-on', order: 4 },
    ],
    mood: { money: 'philosophy', harvard: 'neutral', dadi: 'achievement', practice: 'discovery' },
  },
  {
    slug: 'india-china-geopolitics',
    title: 'India-China — The Asian Century Rivalry',
    subtitle: 'Two civilizations, one continent, zero trust',
    quickShotSummary: 'India-China: 2 nuclear powers, 3,488 km border, unresolved disputes (Aksai Chin, Arunachal Pradesh). Trade: China is India\'s #2 trade partner (~$115B). Military: Galwan clash (2020) was first fatal confrontation in 45 years. India balances: Quad alliance (with US, Japan, Australia) + BRICS membership (with China, Russia).',
    description: 'India and China are simultaneously economic partners, border rivals, and civilizational competitors. Understanding this relationship IS understanding the 21st century.',
    universe: 'CURIOSITY', subWorld: 'geopolitics', difficulty: 'INTERMEDIATE', readTimeMinutes: 15,
    tags: ['india-china', 'geopolitics', 'border-dispute', 'galwan', 'quad'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS'],
    sources: ['https://www.mea.gov.in/'],
    content: {
      summary: '3,488 km border, trade + rivalry, Galwan 2020, Quad vs BRICS, competing for influence in Asia and Africa.',
      keyFacts: ['India-China border (LAC) has NEVER been formally demarcated — no agreed boundary line exists', 'Galwan clash (June 2020): 20 Indian + 4 Chinese soldiers killed in medieval-style combat', 'Bilateral trade: ~$115 billion — China is India\'s 2nd largest trade partner', 'India banned 300+ Chinese apps after Galwan — largest digital decoupling in history'],
      desiAnalogies: [
        { id: 'neighbours', analogy: 'Complicated Neighbour Dynamics', explanation: 'India-China is like two influential families sharing a property boundary that was never officially surveyed. They trade with each other (business), attend the same community meetings (BRICS, SCO), but fight over the boundary wall (LAC). Can\'t ignore each other, can\'t fully trust each other.', emoji: '🏘️' },
        { id: 'chess', analogy: 'Chess Championship Final', explanation: 'India-China are in a centuries-long chess game: border moves (military), economic gambits (Belt & Road vs Look East), alliance building (Quad vs SCO), technological race (5G, AI, space). Neither can checkmate the other — it\'s a strategic stalemate requiring long-term thinking.', emoji: '♟️' },
      ],
      memes: [
        { id: 'm1', text: 'India-China trade: $115 billion\nIndia-China border: *soldiers fighting*\nIndia-China at UN: *occasionally agree*\nIndia-China in cricket: *China doesn\'t play*\n\nThe world\'s most complicated relationship. 🤝⚔️', context: 'India-China relations defy simple categorization' },
        { id: 'm2', text: 'India: *joins Quad with US*\nAlso India: *stays in BRICS with China*\nAlso India: *buys Russian weapons while shopping American tech*\n\nMulti-alignment energy is peak Indian foreign policy. 🇮🇳💪', context: 'India\'s multi-alignment strategy is strategically deliberate' },
      ],
      zingConnections: [
        { id: 'c1', from: 'India-China', to: 'Cold War', insight: 'India-China relationship echoes Cold War patterns: competing ideologies (democratic vs authoritarian), proxy influence battles (in Southeast Asia, Africa), and the challenge of managing rivalry without direct war. History\'s patterns repeat.' },
        { id: 'c2', from: 'Border Dispute', to: 'Indian Constitution', insight: 'Aksai Chin and Arunachal Pradesh disputes involve constitutional territory claims. India\'s Constitution includes J&K and AP as integral parts. Any border resolution needs constitutional and parliamentary approval — making compromise politically nearly impossible.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: India-China is evergreen — appears in Prelims (factual: LAC length, agreements) and Mains (analytical: India\'s strategic options). Know: 1962 war, Panchsheel, LAC, Galwan, Quad, BRICS. All angles.', category: 'EXAM' },
        { id: 't2', tip: 'India\'s China strategy has 3 pillars: (1) Military preparedness at border (2) Economic diversification away from China dependence (3) Multi-lateral alliance building (Quad, I2U2). Remember this framework for Mains answers.', category: 'FRAMEWORK' },
      ],
    },
    sections: [
      { id: 'clash', title: 'Galwan — The Night That Changed Everything', type: 'story', order: 1 },
      { id: 'history', title: 'The 75-Year Complicated History', type: 'deep-dive', order: 2 },
      { id: 'balance', title: 'India\'s Balancing Act', type: 'zing-moment', order: 3 },
      { id: 'future', title: 'What\'s Next for the Asian Century', type: 'resources', order: 4 },
    ],
    mood: { clash: 'war', history: 'neutral', balance: 'achievement', future: 'philosophy' },
  },
  {
    slug: 'indian-classical-music-basics',
    title: 'Indian Classical Music — What Your Ears Are Missing',
    subtitle: 'When math meets emotion meets meditation',
    quickShotSummary: 'Indian classical music: two traditions — Hindustani (North) and Carnatic (South). Based on Ragas (melodic frameworks, 300+) and Talas (rhythmic cycles). Key: Sa Re Ga Ma Pa Dha Ni (7 notes like Western Do Re Mi). A raga creates a specific mood/time/season. Live improvisation is central — no two performances are identical.',
    description: 'Indian classical music is one of the world\'s most sophisticated art forms — with mathematical precision AND emotional depth. And it\'s criminally underappreciated by young Indians.',
    universe: 'CURIOSITY', subWorld: 'arts-culture', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['classical-music', 'raga', 'tala', 'hindustani', 'carnatic'],
    examTags: [],
    sources: ['https://www.itcsra.org/'],
    content: {
      summary: 'Hindustani + Carnatic. 300+ ragas, complex talas, live improvisation. Mathematical structure + emotional expression = unique art form.',
      keyFacts: ['Sa Re Ga Ma Pa Dha Ni = 7 notes (swaras), same concept as Western Do Re Mi', 'Raga Yaman is the most common beginner raga — used in countless Bollywood songs', 'Tabla has 18+ distinct sounds from just two drums', 'Ravi Shankar\'s sitar influenced The Beatles and global music'],
      desiAnalogies: [
        { id: 'code', analogy: 'Music as Programming', explanation: 'A raga is like a programming language: it has rules (which notes to use, ascending/descending patterns), constraints (forbidden note combinations), and infinite possibilities within those rules (improvisation). The best musicians are like the best programmers — creative WITHIN structure.', emoji: '💻' },
        { id: 'time', analogy: 'Raga = Time Travel', explanation: 'Each raga is associated with a time: Raga Bhairav (morning), Raga Yaman (evening), Raga Malkauns (late night). Playing the right raga at the right time creates a mood that feels like time travel — your brain responds differently to morning ragas vs night ragas. Scientifically proven!', emoji: '⏰' },
      ],
      memes: [
        { id: 'm1', text: 'Me: "Indian classical music is boring"\n*Actually listens to Raga Yaman*\nMe: "Wait... this is the tune of 200 Bollywood songs?"\n\nBollywood borrowed from classical. Not the other way around. 🎵', context: 'Most popular Bollywood melodies are raga-based' },
        { id: 'm2', text: 'Tabla player: *17 different sounds from 2 drums*\nDrum machine: *16 preset sounds*\n\nWho has more range? 🥁\nHuman > Machine (in this case).', context: 'The tabla\'s range of sounds is extraordinary' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Ragas', to: 'Mathematics', insight: 'Ragas are mathematical: 7 notes, 72 parent ragas (melakarta in Carnatic), each derived by mathematical combinations of note intervals. Music theory IS number theory applied to sound waves.' },
        { id: 'c2', from: 'Indian Music', to: 'Fibonacci & Golden Ratio', insight: 'Tala cycles often follow mathematical ratios. The most pleasing rhythmic patterns align with ratios found in nature. When musicians say music is "in nature," they mean it literally — natural mathematical harmony.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Start with: Raga Yaman (evening, pleasant, used in 200+ Bollywood songs). Listen to Pandit Jasraj or Rashid Khan singing Yaman. Once you recognize this raga, you\'ll hear it everywhere.', category: 'STARTING' },
        { id: 't2', tip: 'Use Bollywood as gateway: "Tera Beema" (Padmaavat) = Raga Yaman. "Lag Jaa Gale" = Raga Pahadi. "Ranjha" (Shershaah) = Raga Pilu. Recognizing ragas in Bollywood is a fun entry point.', category: 'GATEWAY' },
      ],
    },
    sections: [
      { id: 'missing', title: 'What Your Ears Are Missing', type: 'story', order: 1 },
      { id: 'basics', title: 'Ragas, Talas, and the 7 Notes', type: 'deep-dive', order: 2 },
      { id: 'bollywood', title: 'That Bollywood Song IS a Raga', type: 'zing-moment', order: 3 },
      { id: 'listen', title: 'Your First Listening Playlist', type: 'resources', order: 4 },
    ],
    mood: { missing: 'discovery', basics: 'neutral', bollywood: 'achievement', listen: 'discovery' },
  },
  {
    slug: 'inflation-economics-explained',
    title: 'Inflation — Why ₹100 Buys Less Every Year',
    subtitle: 'The invisible tax nobody voted for',
    quickShotSummary: 'Inflation: general rise in prices over time. Measured by CPI (Consumer Price Index). Types: demand-pull (too much money chasing goods), cost-push (input costs rise), built-in (wage-price spiral). RBI targets 4% inflation using repo rate. Deflation (falling prices) is actually WORSE than moderate inflation.',
    description: 'Your grandparents bought houses for ₹50,000. Now a phone costs ₹50,000. Understanding inflation is understanding why money melts slowly.',
    universe: 'CURIOSITY', subWorld: 'economics', difficulty: 'BEGINNER', readTimeMinutes: 12,
    tags: ['inflation', 'economics', 'rbi', 'cpi', 'monetary-policy'],
    examTags: ['UPSC-PRELIMS', 'UPSC-MAINS'],
    sources: ['https://rbi.org.in/'],
    content: {
      summary: 'Prices rise → money loses value → RBI controls via repo rate. 4% target. Demand-pull, cost-push, built-in types.',
      keyFacts: ['₹100 in 2000 has the same purchasing power as ~₹350 in 2024', 'RBI targets 4% inflation (±2%) — this was set by the 2016 Monetary Policy Framework', 'India\'s highest inflation: 34% in 1974 (oil crisis)', 'A FD giving 7% with 6% inflation = only 1% REAL return (after inflation)'],
      desiAnalogies: [
        { id: 'chai', analogy: 'The ₹5 to ₹20 Chai Story', explanation: 'Chai was ₹5 in 2005, ₹10 in 2015, ₹20 in 2024. That\'s inflation in one cup: prices doubled, then doubled again. The chai didn\'t get better — the rupee got weaker. If your salary didn\'t 4x in the same period, you effectively got a pay cut.', emoji: '☕' },
        { id: 'rbi', analogy: 'RBI as Water Tank Manager', explanation: 'RBI manages money supply like a water tank manager: too much water (money) = flooding (inflation). Too little = drought (recession). Repo rate is the tap — raise it (expensive loans = less spending = less inflation), lower it (cheap loans = more spending = growth). Balance is everything.', emoji: '🏛️' },
      ],
      memes: [
        { id: 'm1', text: 'FD return: 7% 🎉\nInflation: 6% 📈\nReal return: 1% 😐\nTax on interest: 30% of 7% = 2.1% gone\nActual return: NEGATIVE 💀\n\nYour FD is losing you money. Do the math.', context: 'FDs often give negative real returns after inflation and tax' },
        { id: 'm2', text: 'Grandpa: "I bought this house for ₹50,000"\nMe: "I bought a phone for ₹50,000"\n\nInflation: "You\'re welcome" 💰📉', context: 'The dramatic effect of inflation over decades' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Inflation', to: 'Personal Finance', insight: 'Understanding inflation changes financial planning completely: FDs lose to inflation, equity/index funds beat it. Your money must grow FASTER than inflation or you\'re getting poorer. SIP in index funds > FD. Always.' },
        { id: 'c2', from: 'RBI Monetary Policy', to: 'Banking (IBPS)', insight: 'RBI repo rate directly appears in IBPS PO banking awareness section. Understanding how repo rate → lending rates → EMIs → consumer spending → GDP works is the #1 banking knowledge question.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'For UPSC: Know the difference between CPI (Consumer Price Index — measures what YOU pay) and WPI (Wholesale Price Index — measures what factories pay). RBI targets CPI, not WPI. This distinction is always tested.', category: 'EXAM' },
        { id: 't2', tip: 'Real return formula: Real Return = Nominal Return − Inflation. If your investment gives 10% and inflation is 6%, your real return is only 4%. ALWAYS think in real terms, not nominal.', category: 'FORMULA' },
      ],
    },
    sections: [
      { id: 'melt', title: 'Why Your Money Is Melting', type: 'story', order: 1 },
      { id: 'types', title: 'The 3 Types of Inflation', type: 'deep-dive', order: 2 },
      { id: 'real', title: 'The Real Return Shock', type: 'zing-moment', order: 3 },
      { id: 'rbi', title: 'How RBI Controls Inflation', type: 'resources', order: 4 },
    ],
    mood: { melt: 'war', types: 'neutral', real: 'achievement', rbi: 'neutral' },
  },
  {
    slug: 'existentialism-meaning-of-life',
    title: 'Existentialism — Does Life Have Meaning?',
    subtitle: 'The philosophy that says YOU decide',
    quickShotSummary: 'Existentialism: life has no inherent meaning — YOU create your own meaning through choices and actions. Key thinkers: Sartre ("existence precedes essence"), Camus (absurdism — embrace the meaninglessness), Kierkegaard (faith as a leap). "We are condemned to be free" — radical responsibility for your life.',
    description: 'The scariest and most liberating philosophy: nothing means anything... unless you MAKE it mean something. Freedom and responsibility in one package.',
    universe: 'CURIOSITY', subWorld: 'philosophy', difficulty: 'INTERMEDIATE', readTimeMinutes: 13,
    tags: ['existentialism', 'philosophy', 'meaning', 'sartre', 'camus'],
    examTags: [],
    sources: ['https://plato.stanford.edu/entries/existentialism/'],
    content: {
      summary: 'No inherent meaning. You create meaning through choices. Radical freedom = radical responsibility. Sartre, Camus, Kierkegaard.',
      keyFacts: ['Sartre: "Man is condemned to be free" — you MUST choose, even not choosing is a choice', 'Camus\'s Myth of Sisyphus: "We must imagine Sisyphus happy" — embrace the absurd', 'Kierkegaard is the "father of existentialism" — faith is a choice, not proof', 'Existentialism influenced: therapy (logotherapy), literature, film, and Silicon Valley culture'],
      desiAnalogies: [
        { id: 'career', analogy: 'The "Beta, Engineer Ban Ja" Dilemma', explanation: 'Existentialism vs Indian family expectations is THE modern Indian dilemma: parents say "be an engineer" (predetermined essence), Sartre says "choose your own path" (existence precedes essence). The existential crisis of every 18-year-old filling JEE forms while dreaming of art school.', emoji: '🎨' },
        { id: 'absurd', analogy: 'Bureaucratic Absurdism', explanation: 'Camus\'s absurdism feels like Indian bureaucracy: you stand in a government queue for 3 hours, get told to come back tomorrow, and yet you go back. The process is absurd, but you keep going. Camus says: "Imagine the person in the queue happy." That\'s absurdism.', emoji: '📋' },
      ],
      memes: [
        { id: 'm1', text: 'Sartre: "Life has no meaning"\nMe: "That\'s depressing"\nSartre: "No, it means YOU get to choose the meaning"\nMe: "That\'s... terrifying AND liberating"\nSartre: "Now you get it" 🤯', context: 'Existentialism is simultaneously terrifying and empowering' },
        { id: 'm2', text: 'Camus: "Should I go to the office?"\n*Contemplates the absurdity of existence*\n*Goes anyway*\n*Has chai*\n*Finds meaning in the chai*\n\nQuotidian existentialism. ☕💭', context: 'Finding meaning in small daily moments is applied existentialism' },
      ],
      zingConnections: [
        { id: 'c1', from: 'Existentialism', to: 'Stoicism', insight: 'Stoicism and existentialism share a core idea: focus on what you can control (your choices, your response to situations). Stoicism adds "virtue" as the goal; existentialism says even the goal is your choice. Different conclusions, similar framework.' },
        { id: 'c2', from: 'Meaning-Making', to: 'Happiness Research', insight: 'Existentialism says meaning is created, not found. Happiness research confirms: people who feel their life has PURPOSE score highest on well-being. Sartre predicted positive psychology by 50 years.' },
      ],
      tipsAndTricks: [
        { id: 't1', tip: 'Read order: (1) Camus\'s "The Stranger" (short novel, easy entry) → (2) Sartre\'s "Existentialism is a Humanism" (30-page essay, core ideas) → (3) Kierkegaard\'s "Fear and Trembling" (faith + absurdity).', category: 'READING' },
        { id: 't2', tip: 'Daily existential exercise: When you catch yourself saying "I HAVE to do X," replace with "I CHOOSE to do X." This tiny language shift brings awareness to your freedom and responsibility. It\'s transformative.', category: 'PRACTICE' },
      ],
    },
    sections: [
      { id: 'void', title: 'Staring into the Void', type: 'story', order: 1 },
      { id: 'thinkers', title: 'Sartre, Camus, and Kierkegaard', type: 'deep-dive', order: 2 },
      { id: 'freedom', title: 'When Freedom Becomes Real', type: 'zing-moment', order: 3 },
      { id: 'apply', title: 'Existentialism for Everyday Decisions', type: 'application', order: 4 },
    ],
    mood: { void: 'philosophy', thinkers: 'philosophy', freedom: 'achievement', apply: 'discovery' },
  },
];

// ═══════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════

async function main() {
  console.log('⚡ Seeding ZING database with 91 additional topics...\n');

  const allTopics = [
    ...SCHOLAR,
    ...CODE_COSMOS,
    ...BATTLE_GROUND,
    ...CAREER,
    ...CIVILIZATION,
    ...KNOWLEDGE,
    ...CURIOSITY,
  ];

  let created = 0;
  for (const topic of allTopics) {
    try {
      await createTopic(topic);
      created++;
      if (created % 10 === 0) console.log(`  ✅ ${created}/${allTopics.length} topics...`);
    } catch (e) {
      console.error(`  ❌ Failed: ${topic.slug}`, e);
    }
  }

  console.log(`\n⚡ Done! Created ${created} of ${allTopics.length} topics.\n`);
}

main()
  .catch((e) => {
    console.error('❌ Extended seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

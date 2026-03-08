/**
 * ⚡ buildModeData — transforms topic content into Story/Swipe/Cinematic formats
 */

interface TopicData {
  title: string;
  quickShotSummary: string | null;
  sections: { id: string; title: string; type: string }[] | null;
  content: Record<string, unknown> | null;
}

export function buildStorySlides(topic: TopicData) {
  const content = topic.content ?? {};
  const sections = (topic.sections ?? []) as { id: string; title: string; type: string }[];
  const slides: { id: string; title: string; body: string; emoji?: string }[] = [];

  // Slide 1: Summary
  if (topic.quickShotSummary) {
    slides.push({ id: 'summary', title: topic.title, body: topic.quickShotSummary, emoji: '⚡' });
  }

  // Slide 2+: Key facts (one per slide)
  const keyFacts = Array.isArray(content.keyFacts) ? content.keyFacts as string[] : [];
  keyFacts.forEach((fact, i) => {
    slides.push({ id: `fact-${i}`, title: `Did You Know?`, body: fact, emoji: '💡' });
  });

  // Section titles as story beats
  sections.forEach((s) => {
    slides.push({ id: `section-${s.id}`, title: s.title, body: `Deep dive into: ${s.title}`, emoji: s.type === 'zing-moment' ? '🌟' : '📖' });
  });

  // Desi analogies
  const analogies = Array.isArray(content.desiAnalogies) ? content.desiAnalogies as { id: string; analogy: string; explanation: string; emoji?: string }[] : [];
  analogies.forEach((a) => {
    slides.push({ id: `analogy-${a.id}`, title: a.analogy, body: a.explanation, emoji: a.emoji ?? '🇮🇳' });
  });

  // Tips
  const tips = Array.isArray(content.tipsAndTricks) ? content.tipsAndTricks as { id: string; tip: string; category?: string }[] : [];
  tips.forEach((t) => {
    slides.push({ id: `tip-${t.id}`, title: `${t.category === 'EXAM' ? '📝' : '💪'} Tip`, body: t.tip });
  });

  return slides.length > 0 ? slides : [{ id: 'default', title: topic.title, body: topic.quickShotSummary ?? 'Explore this topic!', emoji: '⚡' }];
}

export function buildCinematicScenes(topic: TopicData) {
  const content = topic.content ?? {};
  const scenes: { id: string; title: string; body: string; mood?: string }[] = [];

  // Opening scene
  scenes.push({ id: 'opening', title: topic.title, body: topic.quickShotSummary ?? 'A journey begins...', mood: 'wonder' });

  // Key facts as scenes
  const keyFacts = Array.isArray(content.keyFacts) ? content.keyFacts as string[] : [];
  keyFacts.forEach((fact, i) => {
    scenes.push({ id: `fact-${i}`, title: 'Key Insight', body: fact, mood: 'discovery' });
  });

  // Desi analogies as scenes
  const analogies = Array.isArray(content.desiAnalogies) ? content.desiAnalogies as { id: string; analogy: string; explanation: string }[] : [];
  analogies.forEach((a) => {
    scenes.push({ id: `analogy-${a.id}`, title: a.analogy, body: a.explanation, mood: 'connection' });
  });

  // Zing connections as grand finale
  const connections = Array.isArray(content.zingConnections) ? content.zingConnections as { id: string; from: string; to: string; insight: string }[] : [];
  connections.forEach((c) => {
    scenes.push({ id: `conn-${c.id}`, title: `${c.from} → ${c.to}`, body: c.insight, mood: 'revelation' });
  });

  return scenes.length > 1 ? scenes : [{ id: 'opening', title: topic.title, body: topic.quickShotSummary ?? 'Explore this topic', mood: 'wonder' }];
}

export function buildSwipeCards(topic: TopicData) {
  const content = topic.content ?? {};
  const cards: { id: string; front: string; back: string; category?: string }[] = [];

  // Key facts as flashcards
  const keyFacts = Array.isArray(content.keyFacts) ? content.keyFacts as string[] : [];
  keyFacts.forEach((fact, i) => {
    cards.push({ id: `fact-${i}`, front: `Key Fact #${i + 1} about ${topic.title}`, back: fact, category: 'Fact' });
  });

  // Tips as flashcards
  const tips = Array.isArray(content.tipsAndTricks) ? content.tipsAndTricks as { id: string; tip: string; category?: string }[] : [];
  tips.forEach((t) => {
    cards.push({ id: `tip-${t.id}`, front: `${t.category ?? 'Tip'}: ${topic.title}`, back: t.tip, category: t.category ?? 'Tip' });
  });

  // Desi analogies as flashcards
  const analogies = Array.isArray(content.desiAnalogies) ? content.desiAnalogies as { id: string; analogy: string; explanation: string }[] : [];
  analogies.forEach((a) => {
    cards.push({ id: `analogy-${a.id}`, front: `Desi Analogy: ${a.analogy}`, back: a.explanation, category: 'Analogy' });
  });

  // Connections as flashcards
  const connections = Array.isArray(content.zingConnections) ? content.zingConnections as { id: string; from: string; to: string; insight: string }[] : [];
  connections.forEach((c) => {
    cards.push({ id: `conn-${c.id}`, front: `Connection: ${c.from} → ${c.to}`, back: c.insight, category: 'Connection' });
  });

  return cards.length > 0 ? cards : [{ id: 'default', front: topic.title, back: topic.quickShotSummary ?? 'No flashcards yet', category: 'Summary' }];
}

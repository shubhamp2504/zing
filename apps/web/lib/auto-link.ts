/**
 * ⚡ Auto-Linking Engine
 *
 * Scans topic content and automatically creates hyperlinks
 * to other ZING topics. Server-side utility.
 *
 * Uses: topic slugs + titles from database to find mentions.
 */

interface TopicIndex {
  slug: string;
  title: string;
  universe: string;
  subWorld: string;
  /** Alternative names/keywords that should link to this topic */
  aliases?: string[];
}

interface AutoLink {
  /** Original text matched */
  matchedText: string;
  /** Full path to linked topic */
  href: string;
  /** Title of linked topic */
  title: string;
  /** Universe of linked topic */
  universe: string;
  /** Position in source text */
  startIndex: number;
  endIndex: number;
}

/**
 * Build a regex that matches any topic title or alias in the index.
 * Sorted longest-first to prevent partial matches.
 */
function buildTopicMatcher(index: TopicIndex[]): RegExp {
  const allTerms: Array<{ term: string; topic: TopicIndex }> = [];

  for (const topic of index) {
    allTerms.push({ term: topic.title, topic });
    if (topic.aliases) {
      for (const alias of topic.aliases) {
        allTerms.push({ term: alias, topic });
      }
    }
  }

  // Sort longest first (greedy matching)
  allTerms.sort((a, b) => b.term.length - a.term.length);

  // Escape regex special chars
  const escaped = allTerms.map((t) =>
    t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  if (escaped.length === 0) return /(?!)/; // never matches

  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

/**
 * Find all auto-linkable mentions in a text.
 *
 * @param text - The content string to scan
 * @param index - All available topics to match against
 * @param excludeSlugs - Topics to exclude (e.g., the current topic)
 * @param maxLinks - Maximum number of links to insert (default 10)
 */
export function findAutoLinks(
  text: string,
  index: TopicIndex[],
  excludeSlugs: string[] = [],
  maxLinks = 10
): AutoLink[] {
  const filteredIndex = index.filter((t) => !excludeSlugs.includes(t.slug));
  if (filteredIndex.length === 0) return [];

  const pattern = buildTopicMatcher(filteredIndex);
  const links: AutoLink[] = [];
  const linkedSlugs = new Set<string>();

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (links.length >= maxLinks) break;

    const matchedText = match[0];
    // Find which topic this matched
    const topic = filteredIndex.find(
      (t) =>
        t.title.toLowerCase() === matchedText.toLowerCase() ||
        t.aliases?.some((a) => a.toLowerCase() === matchedText.toLowerCase())
    );

    if (!topic || linkedSlugs.has(topic.slug)) continue;

    linkedSlugs.add(topic.slug);
    links.push({
      matchedText: match[0],
      href: `/${topic.universe}/${topic.subWorld}/${topic.slug}`,
      title: topic.title,
      universe: topic.universe,
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    });
  }

  return links;
}

/**
 * Apply auto-links to HTML string by wrapping matched text with <a> tags.
 * Processes in reverse order to preserve indices.
 */
export function applyAutoLinks(html: string, links: AutoLink[]): string {
  // Sort by start index descending (apply from end to preserve positions)
  const sorted = [...links].sort((a, b) => b.startIndex - a.startIndex);

  let result = html;
  for (const link of sorted) {
    const before = result.slice(0, link.startIndex);
    const after = result.slice(link.endIndex);
    const anchor = `<a href="${link.href}" class="zing-auto-link" data-universe="${link.universe}" title="${link.title}">${link.matchedText}</a>`;
    result = before + anchor + after;
  }

  return result;
}

/**
 * Full pipeline: find + apply auto-links.
 */
export function autoLinkContent(
  content: string,
  topicIndex: TopicIndex[],
  currentSlug: string,
  maxLinks = 10
): { html: string; links: AutoLink[] } {
  const links = findAutoLinks(content, topicIndex, [currentSlug], maxLinks);
  const html = applyAutoLinks(content, links);
  return { html, links };
}

export type { TopicIndex, AutoLink };

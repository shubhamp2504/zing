/**
 * ⚡ Sitemap generation — /sitemap.xml
 *
 * Dynamic sitemap for all ZING topics.
 * Separate sitemaps planned for /hi/ and /mr/ routes.
 */

import type { MetadataRoute } from 'next';
import { getAllTopicSlugs } from '@/lib/queries';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://zing-alpha.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Dynamic topic pages from database
  let topicPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllTopicSlugs();
    topicPages = slugs.map(s => ({
      url: `${BASE_URL}/${s.universe}/${s.subWorld}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // Database unavailable at build time — return static pages only
  }

  return [...staticPages, ...topicPages];
}

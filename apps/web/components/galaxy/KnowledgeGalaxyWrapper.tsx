'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const KnowledgeGalaxy = dynamic(() => import('./KnowledgeGalaxy'), { ssr: false });

interface Props {
  topics: Array<{ slug: string; title: string; universe: string; subWorld?: string }>;
  connections: Array<{ from: string; to: string; strength: number }>;
  universeColors?: Record<string, string>;
  onTopicClick?: (slug: string) => void;
}

export default function KnowledgeGalaxyWrapper({ onTopicClick, ...props }: Props) {
  const router = useRouter();

  const handleTopicClick = useCallback(
    (slug: string) => {
      if (onTopicClick) {
        onTopicClick(slug);
        return;
      }
      const topic = props.topics.find((t) => t.slug === slug);
      if (topic?.subWorld) {
        router.push(`/${topic.universe}/${topic.subWorld}/${slug}`);
      }
    },
    [onTopicClick, props.topics, router]
  );

  return <KnowledgeGalaxy {...props} onTopicClick={handleTopicClick} />;
}

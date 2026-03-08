'use client';

import { useEffect } from 'react';

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `zing-viewed-${slug}`;
    if (sessionStorage.getItem(key)) return; // only count once per session
    sessionStorage.setItem(key, '1');
    fetch('/api/topics/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  return null;
}

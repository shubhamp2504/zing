/**
 * ⚡ ZING — Topic Page Layout
 * Sets data-universe attribute for universe-specific theming
 */

import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ universe: string }>;
}

export default async function UniverseLayout({ children, params }: LayoutProps) {
  const { universe } = await params;

  return (
    <div data-universe={universe}>
      {children}
    </div>
  );
}

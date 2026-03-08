import { ZingLensCamera } from '@/components/zing-lens/ZingLensCamera';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZING Lens — Scan & Learn',
  description: 'Point your camera at any textbook, diagram, or monument. AI identifies the concept and links to the ZING topic.',
};

export default function LensPage() {
  return (
    <main>
      <ZingLensCamera />
    </main>
  );
}

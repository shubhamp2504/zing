'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchTriggerButton() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
  }, []);

  return (
    <button
      onClick={() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'k',
            code: 'KeyK',
            metaKey: true,
            ctrlKey: true,
            bubbles: true,
          })
        );
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "2rem",
        padding: "0.8rem 2rem",
        fontSize: "1rem",
        fontWeight: 500,
        color: "rgba(255,255,255,0.7)",
        cursor: "pointer",
      }}
    >
      <Search size={16} /> Search Topics — {isMac ? '⌘K' : 'Ctrl+K'}
    </button>
  );
}

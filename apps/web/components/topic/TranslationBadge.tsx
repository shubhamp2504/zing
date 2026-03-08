/**
 * ⚡ TranslationBadge — Shows translation quality inline
 */

interface TranslationBadgeProps {
  quality: 'AI_DRAFT' | 'AI_VERIFIED' | 'HUMAN';
  reviewerName?: string;
  className?: string;
}

const BADGE_CONFIG = {
  AI_DRAFT: {
    icon: '⚠️',
    label: 'AI Draft',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    description: 'AI-generated — may have errors',
  },
  AI_VERIFIED: {
    icon: '🤖',
    label: 'AI Verified',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    description: 'AI-verified translation',
  },
  HUMAN: {
    icon: '✅',
    label: 'Verified',
    color: 'text-green-400 bg-green-500/10 border-green-500/20',
    description: 'Human-verified translation',
  },
};

export function TranslationBadge({ quality, reviewerName, className = '' }: TranslationBadgeProps) {
  const config = BADGE_CONFIG[quality];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.color} ${className}`}
      title={config.description}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
      {quality === 'HUMAN' && reviewerName && (
        <span className="text-white/40">by {reviewerName}</span>
      )}
    </span>
  );
}

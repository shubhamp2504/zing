/**
 * ⚡ SectionSkeleton — Universal loading fallback with Lottie animation
 */
import ZingLottie from '../scrollytelling/ZingLottie';

interface SectionSkeletonProps {
  height?: string;
}

export default function SectionSkeleton({ height = '12rem' }: SectionSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className="glass-card"
      style={{
        height,
        margin: '1rem auto',
        maxWidth: 'var(--content-max-width)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
      <ZingLottie src="/animations/loaders/default.json" width={48} height={48} fallback="⚡" ariaLabel="Loading" />
    </div>
  );
}

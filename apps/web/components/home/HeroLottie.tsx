/**
 * ⚡ HeroLottie — Animated Lottie for the homepage hero section.
 * Wraps ZingLottie with the default loader animation.
 */
'use client';

import ZingLottie from '../scrollytelling/ZingLottie';

export default function HeroLottie() {
  return (
    <div style={{ width: 80, height: 80, margin: '0 auto 0.5rem' }}>
      <ZingLottie src="/animations/loaders/default.json" loop autoplay />
    </div>
  );
}

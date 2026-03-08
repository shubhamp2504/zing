/**
 * ⚡ ZING MOTION VARIANTS
 * Pre-built Framer Motion variants using ZING_PHYSICS
 * 
 * @module variants
 * @version 8.0.0
 * @description Reusable animation variants for consistent motion design
 * 
 * USAGE:
 * import { cardEnter } from '@zing/ui/variants';
 * <motion.div variants={cardEnter} initial="hidden" animate="visible" />
 */

import type { Variants } from 'framer-motion';
import { ZING_PHYSICS } from './physics';

/**
 * CARD ENTER VARIANT
 * Fade + slide up animation for cards
 */
export const cardEnter: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: ZING_PHYSICS.card.enter,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: ZING_PHYSICS.page.exit,
  },
} as const satisfies Variants;

/**
 * STAGGER CONTAINER VARIANT
 * Parent container for staggered children
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ZING_PHYSICS.stagger.normal,
    },
  },
} as const satisfies Variants;

/**
 * STAGGER ITEM VARIANT
 * Individual item in a staggered list
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: ZING_PHYSICS.card.enter,
  },
} as const satisfies Variants;

/**
 * WORD REVEAL VARIANT
 * For text animations (ZING Moment Flash)
 */
export const wordReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: ZING_PHYSICS.content.wordPop,
  },
} as const satisfies Variants;

/**
 * PAGE ENTER VARIANT
 * For Next.js route transitions
 */
export const pageEnter: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: ZING_PHYSICS.page.enter,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: ZING_PHYSICS.page.exit,
  },
} as const satisfies Variants;

/**
 * MODAL VARIANT
 * For modal/dialog animations
 */
export const modalVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: ZING_PHYSICS.overlay.scaleUp,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: ZING_PHYSICS.overlay.exitFast,
  },
} as const satisfies Variants;

/**
 * DRAWER VARIANT
 * For slide-in panels (left/right)
 */
export const drawerVariant = (direction: 'left' | 'right' = 'right'): Variants => ({
  hidden: {
    x: direction === 'right' ? '100%' : '-100%',
  },
  visible: {
    x: 0,
    transition: ZING_PHYSICS.drawer.slide,
  },
  exit: {
    x: direction === 'right' ? '100%' : '-100%',
    transition: ZING_PHYSICS.overlay.exitFast,
  },
} as const satisfies Variants);

/**
 * PARALLAX SLOW VARIANT
 * For background elements (slower scroll)
 */
export const parallaxSlow: Variants = {
  hidden: {
    y: 0,
  },
  visible: {
    y: -50,
    transition: ZING_PHYSICS.content.sectionScroll,
  },
} as const satisfies Variants;

/**
 * PARALLAX FAST VARIANT
 * For foreground elements (faster scroll)
 */
export const parallaxFast: Variants = {
  hidden: {
    y: 0,
  },
  visible: {
    y: -100,
    transition: ZING_PHYSICS.content.sectionScroll,
  },
} as const satisfies Variants;

/**
 * ZING FLASH VARIANT
 * The signature ZING Moment Flash animation
 */
export const zingFlash: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: ZING_PHYSICS.dramatic.zingFlash,
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: 'easeInOut',
    },
  },
} as const satisfies Variants;

/**
 * READING AURA VARIANT
 * Subtle glow around current paragraph
 */
export const readingAura: Variants = {
  inactive: {
    opacity: 0,
    scale: 0.95,
  },
  active: {
    opacity: 1,
    scale: 1,
    transition: ZING_PHYSICS.float.readingAura,
  },
} as const satisfies Variants;

/**
 * HOVER LIFT VARIANT
 * For interactive cards (hover state)
 */
export const hoverLift: Variants = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: ZING_PHYSICS.card.hover,
  },
  tap: {
    y: 0,
    scale: 0.98,
    transition: ZING_PHYSICS.card.press,
  },
} as const satisfies Variants;

/**
 * BUTTON VARIANT
 * For all button interactions
 */
export const buttonVariant: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: ZING_PHYSICS.micro.buttonTap,
  },
  tap: {
    scale: 0.95,
    transition: ZING_PHYSICS.micro.buttonTap,
  },
} as const satisfies Variants;

/**
 * ICON BOUNCE VARIANT
 * For playful icon interactions (like, bookmark)
 */
export const iconBounce: Variants = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  active: {
    scale: [1, 1.3, 1],
    rotate: [0, 10, -10, 0],
    transition: ZING_PHYSICS.micro.iconBounce,
  },
} as const satisfies Variants;

/**
 * TOOLTIP VARIANT
 * For tooltips and info popups
 */
export const tooltipVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: ZING_PHYSICS.micro.tooltipAppear,
  },
} as const satisfies Variants;

/**
 * ACHIEVEMENT VARIANT
 * For celebration animations (quiz complete, streak)
 */
export const achievement: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: ZING_PHYSICS.dramatic.achievement,
  },
  celebrate: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      repeat: 3,
      duration: 0.5,
    },
  },
} as const satisfies Variants;

/**
 * MIRROR MOMENT VARIANT
 * For the Mirror Moment feature (self-reflection)
 */
export const mirrorMoment: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(20px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: ZING_PHYSICS.dramatic.mirrorMoment,
  },
  shimmer: {
    opacity: [1, 0.7, 1],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut',
    },
  },
} as const satisfies Variants;

/**
 * UNIVERSE SWITCH VARIANT
 * For dramatic universe transitions
 */
export const universeSwitch: Variants = {
  exit: {
    opacity: 0,
    scale: 0.9,
    filter: 'blur(10px)',
    transition: ZING_PHYSICS.page.exit,
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: ZING_PHYSICS.page.universeSwitch,
  },
} as const satisfies Variants;

/**
 * FLOAT GENTLE VARIANT
 * For floating Rive characters
 */
export const floatGentle: Variants = {
  rest: {
    y: 0,
  },
  float: {
    y: [-10, 10, -10],
    transition: {
      ...ZING_PHYSICS.float.gentleFloat,
      repeat: Infinity,
      repeatType: 'loop' as const,
      duration: 4,
    },
  },
} as const satisfies Variants;

/**
 * TYPE EXPORTS
 */
export type VariantName =
  | 'cardEnter'
  | 'staggerContainer'
  | 'staggerItem'
  | 'wordReveal'
  | 'pageEnter'
  | 'modalVariant'
  | 'drawerVariant'
  | 'parallaxSlow'
  | 'parallaxFast'
  | 'zingFlash'
  | 'readingAura'
  | 'hoverLift'
  | 'buttonVariant'
  | 'iconBounce'
  | 'tooltipVariant'
  | 'achievement'
  | 'mirrorMoment'
  | 'universeSwitch'
  | 'floatGentle';

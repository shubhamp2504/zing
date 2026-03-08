/**
 * ⚡ ZING_PHYSICS
 * The single source of truth for ALL animation timing across ZING.
 * 
 * @module physics
 * @version 8.0.0
 * @description Complete spring/timing configuration for the ZING platform
 * 
 * CRITICAL RULES:
 * - NEVER hardcode spring values in components
 * - ALWAYS import from this file
 * - Each value is tuned for 60 FPS on 2GB RAM devices
 * - Use semantic names that describe the FEELING, not the numbers
 */

/**
 * SPRING CONFIGURATION TYPE
 * Compatible with Framer Motion spring animations
 */
export interface SpringConfig {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass: number;
  restSpeed?: number;
  restDelta?: number;
}

/**
 * TWEEN CONFIGURATION TYPE
 * Compatible with Framer Motion tween animations
 */
export interface TweenConfig {
  type: 'tween';
  duration: number;
  ease: string | number[];
}

/**
 * ANIMATION CONFIG TYPE
 * Union of all possible animation configurations
 */
export type AnimationConfig = SpringConfig | TweenConfig;

/**
 * ═══════════════════════════════════════════════════
 * ZING_PHYSICS — Master Animation Configuration
 * ═══════════════════════════════════════════════════
 */
export const ZING_PHYSICS = {
  /**
   * OVERLAY ANIMATIONS
   * For modals, drawers, full-screen overlays
   */
  overlay: {
    /**
     * Modal fade in — feels instant but smooth
     * Use for: Modal backgrounds, toast notifications
     */
    fadeIn: {
      type: 'tween',
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    } as const satisfies TweenConfig,

    /**
     * Modal scale up — feels responsive, premium
     * Use for: Modal content, dialog boxes
     */
    scaleUp: {
      type: 'spring',
      stiffness: 380,
      damping: 30,
      mass: 0.8,
    } as const satisfies SpringConfig,

    /**
     * Modal exit — faster than enter (feels snappy)
     * Use for: Closing modals, dismissing overlays
     */
    exitFast: {
      type: 'tween',
      duration: 0.12,
      ease: [0.6, 0.04, 0.98, 0.34], // easeInExpo
    } as const satisfies TweenConfig,
  },

  /**
   * DRAWER ANIMATIONS
   * For side panels, mobile menus, slide-in content
   */
  drawer: {
    /**
     * Drawer slide — feels smooth, natural
     * Use for: Navigation drawers, filter panels
     */
    slide: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.6,
    } as const satisfies SpringConfig,

    /**
     * Quick drawer — for small panels
     * Use for: Tooltips, mini previews
     */
    quick: {
      type: 'spring',
      stiffness: 500,
      damping: 35,
      mass: 0.5,
    } as const satisfies SpringConfig,
  },

  /**
   * CARD ANIMATIONS
   * For topic cards, list items, interactive elements
   */
  card: {
    /**
     * Card hover — subtle, premium feel
     * Use for: Topic cards on hover, clickable elements
     */
    hover: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      mass: 0.5,
    } as const satisfies SpringConfig,

    /**
     * Card press — feels tactile, responsive
     * Use for: Button press, card tap (mobile)
     */
    press: {
      type: 'spring',
      stiffness: 600,
      damping: 30,
      mass: 0.4,
    } as const satisfies SpringConfig,

    /**
     * Card enter — staggered list reveal
     * Use for: Topic list loading, search results
     */
    enter: {
      type: 'spring',
      stiffness: 260,
      damping: 26,
      mass: 0.7,
    } as const satisfies SpringConfig,
  },

  /**
   * CONTENT ANIMATIONS
   * For text reveals, content loading, reading experience
   */
  content: {
    /**
     * Text reveal — feels like ink spreading
     * Use for: Paragraph reveals, quote animations
     */
    textReveal: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 0.8,
    } as const satisfies SpringConfig,

    /**
     * Word pop — individual word emphasis
     * Use for: ZING Moment Flash, key term reveals
     */
    wordPop: {
      type: 'spring',
      stiffness: 500,
      damping: 20,
      mass: 0.5,
    } as const satisfies SpringConfig,

    /**
     * Section scroll — smooth content reveal on scroll
     * Use for: Scrollytelling sections, parallax
     */
    sectionScroll: {
      type: 'tween',
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    } as const satisfies TweenConfig,
  },

  /**
   * PAGE TRANSITIONS
   * For route changes, universe switches
   */
  page: {
    /**
     * Page enter — feels seamless, fast
     * Use for: Next.js route transitions
     */
    enter: {
      type: 'spring',
      stiffness: 280,
      damping: 28,
      mass: 0.6,
    } as const satisfies SpringConfig,

    /**
     * Page exit — quick fade out
     * Use for: Leaving current page
     */
    exit: {
      type: 'tween',
      duration: 0.18,
      ease: [0.6, 0.04, 0.98, 0.34], // easeInExpo
    } as const satisfies TweenConfig,

    /**
     * Universe switch — dramatic, memorable
     * Use for: Switching between universes (Scholar → Code Cosmos)
     */
    universeSwitch: {
      type: 'spring',
      stiffness: 220,
      damping: 24,
      mass: 0.9,
    } as const satisfies SpringConfig,
  },

  /**
   * MICRO-INTERACTIONS
   * For icons, buttons, small UI elements
   */
  micro: {
    /**
     * Icon bounce — playful, delightful
     * Use for: Like button, bookmark icon
     */
    iconBounce: {
      type: 'spring',
      stiffness: 600,
      damping: 15,
      mass: 0.4,
    } as const satisfies SpringConfig,

    /**
     * Button tap — instant feedback
     * Use for: All clickable buttons
     */
    buttonTap: {
      type: 'spring',
      stiffness: 700,
      damping: 25,
      mass: 0.3,
    } as const satisfies SpringConfig,

    /**
     * Tooltip appear — quick, subtle
     * Use for: Tooltips, info popups
     */
    tooltipAppear: {
      type: 'tween',
      duration: 0.12,
      ease: [0.16, 1, 0.3, 1],
    } as const satisfies TweenConfig,
  },

  /**
   * DRAMATIC ANIMATIONS
   * For special moments: ZING Flash, achievements, milestones
   */
  dramatic: {
    /**
     * ZING Moment Flash — THE signature animation
     * Use for: The climactic moment in every topic
     */
    zingFlash: {
      type: 'spring',
      stiffness: 180,
      damping: 20,
      mass: 1.2,
    } as const satisfies SpringConfig,

    /**
     * Achievement reveal — celebration feeling
     * Use for: Quiz completion, streak milestones
     */
    achievement: {
      type: 'spring',
      stiffness: 160,
      damping: 18,
      mass: 1.0,
    } as const satisfies SpringConfig,

    /**
     * Mirror Moment — reflective pause
     * Use for: Mirror Moment feature (self-reflection prompts)
     */
    mirrorMoment: {
      type: 'spring',
      stiffness: 140,
      damping: 22,
      mass: 1.4,
    } as const satisfies SpringConfig,
  },

  /**
   * FLOATING/AMBIENT ANIMATIONS
   * For decorative elements, background animations
   */
  float: {
    /**
     * Gentle float — feels weightless
     * Use for: Floating characters (Rive), particle effects
     */
    gentleFloat: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 1.5,
    } as const satisfies SpringConfig,

    /**
     * Reading aura — ambient glow
     * Use for: Reading Aura feature around current paragraph
     */
    readingAura: {
      type: 'tween',
      duration: 1.2,
      ease: [0.45, 0, 0.55, 1], // easeInOutQuad
    } as const satisfies TweenConfig,
  },

  /**
   * STAGGER TIMING
   * For sequential reveals (lists, grids)
   */
  stagger: {
    /**
     * Fast stagger — feels energetic
     * Use for: Search results, topic lists
     */
    fast: 0.03, // seconds between items

    /**
     * Normal stagger — balanced
     * Use for: Feature lists, card grids
     */
    normal: 0.05,

    /**
     * Slow stagger — dramatic
     * Use for: Hero sections, universe landing pages
     */
    slow: 0.08,

    /**
     * Cascade — waterfall effect
     * Use for: Complex layouts, multi-column grids
     */
    cascade: 0.12,
  },
} as const;

/**
 * TYPE EXPORTS
 */
export type ZingPhysicsKey = keyof typeof ZING_PHYSICS;
export type OverlayAnimation = keyof typeof ZING_PHYSICS.overlay;
export type DrawerAnimation = keyof typeof ZING_PHYSICS.drawer;
export type CardAnimation = keyof typeof ZING_PHYSICS.card;
export type ContentAnimation = keyof typeof ZING_PHYSICS.content;
export type PageAnimation = keyof typeof ZING_PHYSICS.page;
export type MicroAnimation = keyof typeof ZING_PHYSICS.micro;
export type DramaticAnimation = keyof typeof ZING_PHYSICS.dramatic;
export type FloatAnimation = keyof typeof ZING_PHYSICS.float;

/**
 * UTILITY: Get animation config by path
 * 
 * @example
 * const spring = getAnimation('card', 'hover');
 * <motion.div transition={spring} />
 */
export function getAnimation<
  Category extends ZingPhysicsKey,
  Key extends keyof typeof ZING_PHYSICS[Category]
>(category: Category, key: Key): typeof ZING_PHYSICS[Category][Key] {
  return ZING_PHYSICS[category][key];
}

/**
 * UTILITY: Merge custom values with preset
 * 
 * @example
 * const customSpring = mergeAnimation('card', 'hover', { stiffness: 500 });
 */
export function mergeAnimation<
  Category extends ZingPhysicsKey,
  Key extends keyof typeof ZING_PHYSICS[Category]
>(
  category: Category,
  key: Key,
  overrides: Partial<typeof ZING_PHYSICS[Category][Key]>
): typeof ZING_PHYSICS[Category][Key] {
  return { ...ZING_PHYSICS[category][key], ...overrides };
}

/**
 * REDUCED MOTION UTILITY
 * For accessibility — respects user preferences
 * 
 * @example
 * const spring = respectsReducedMotion('card', 'hover');
 */
export function respectsReducedMotion<
  Category extends ZingPhysicsKey,
  Key extends keyof typeof ZING_PHYSICS[Category]
>(category: Category, key: Key): typeof ZING_PHYSICS[Category][Key] | { duration: 0.01 } {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return { type: 'tween', duration: 0.01, ease: 'linear' } as any;
    }
  }
  return ZING_PHYSICS[category][key];
}

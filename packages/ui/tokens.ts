/**
 * ⚡ ZING DESIGN TOKENS
 * The single source of truth for all design values across the ZING platform.
 * 
 * @module tokens
 * @version 8.0.0
 * @description Complete design system for India's Most Immersive Knowledge Universe
 */

/**
 * MASTER COLOR PALETTE
 * These colors define the ZING brand identity
 */
export const COLORS = {
  // Brand Primary
  electricYellow: '#FFD700',
  deepBlack: '#0A0A0A',
  neonPurple: '#8B5CF6',
  hotOrange: '#FF6B00',
  pureWhite: '#FFFFFF',
  
  // Glassmorphism
  glassWhite: 'rgba(255, 255, 255, 0.06)',
  glowYellow: 'rgba(255, 215, 0, 0.15)',
  
  // Grays
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
  
  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

/**
 * UNIVERSE COLOR THEMES
 * Each of the 7 universes has its own color identity
 */
export const UNIVERSE_THEMES = {
  scholar: {
    primary: '#3B82F6',      // Notebook Blue
    secondary: '#60A5FA',
    accent: '#DBEAFE',
    dark: '#1E3A8A',
  },
  codeСosmos: {
    primary: '#10B981',      // Matrix Green
    secondary: '#34D399',
    accent: '#D1FAE5',
    dark: '#065F46',
  },
  battleGround: {
    primary: '#EF4444',      // Battle Red
    secondary: '#F87171',
    accent: '#FEE2E2',
    dark: '#991B1B',
  },
  career: {
    primary: '#F59E0B',      // Ambition Gold
    secondary: '#FBBF24',
    accent: '#FEF3C7',
    dark: '#92400E',
  },
  civilization: {
    primary: '#8B5CF6',      // Royal Purple
    secondary: '#A78BFA',
    accent: '#EDE9FE',
    dark: '#5B21B6',
  },
  knowledge: {
    primary: '#06B6D4',      // Cosmos Cyan
    secondary: '#22D3EE',
    accent: '#CFFAFE',
    dark: '#164E63',
  },
  curiosity: {
    primary: '#EC4899',      // Wonder Pink
    secondary: '#F472B6',
    accent: '#FCE7F3',
    dark: '#9F1239',
  },
} as const;

/**
 * TYPOGRAPHY SYSTEM
 * All font families used across ZING
 */
export const FONTS = {
  display: "'Clash Display', sans-serif",
  heading: "'Outfit Variable', sans-serif",
  body: "'Inter Variable', sans-serif",
  code: "'JetBrains Mono Variable', monospace",
  serif: "'Cormorant Garamond', serif",
  devanagari: "'Noto Sans Devanagari Variable', sans-serif",
} as const;

/**
 * FONT SIZES
 * Responsive typography scale
 */
export const FONT_SIZES = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
  '7xl': '4.5rem',    // 72px
  '8xl': '6rem',      // 96px
} as const;

/**
 * SPACING SCALE
 * 4px base unit
 */
export const SPACING = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

/**
 * BORDER RADIUS
 */
export const RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

/**
 * SHADOWS
 * Elevation system
 */
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  glow: '0 0 20px rgba(255, 215, 0, 0.3)',
} as const;

/**
 * Z-INDEX LAYERS
 * Stacking context management
 */
export const Z_LAYERS = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

/**
 * CSS CUSTOM PROPERTIES
 * Generate CSS variables string for global injection
 */
export const CSS_VARIABLES = `
  :root {
    /* Colors */
    --color-electric-yellow: ${COLORS.electricYellow};
    --color-deep-black: ${COLORS.deepBlack};
    --color-neon-purple: ${COLORS.neonPurple};
    --color-hot-orange: ${COLORS.hotOrange};
    --color-pure-white: ${COLORS.pureWhite};
    
    /* Fonts */
    --font-display: ${FONTS.display};
    --font-heading: ${FONTS.heading};
    --font-body: ${FONTS.body};
    --font-code: ${FONTS.code};
    --font-serif: ${FONTS.serif};
    --font-devanagari: ${FONTS.devanagari};
    
    /* Spacing */
    --spacing-unit: 0.25rem;
    
    /* Shadows */
    --shadow-glow: ${SHADOWS.glow};
  }
  
  /* Universe Themes */
  [data-universe="scholar"] {
    --universe-primary: ${UNIVERSE_THEMES.scholar.primary};
    --universe-secondary: ${UNIVERSE_THEMES.scholar.secondary};
    --universe-accent: ${UNIVERSE_THEMES.scholar.accent};
    --universe-dark: ${UNIVERSE_THEMES.scholar.dark};
  }
  
  [data-universe="code-cosmos"] {
    --universe-primary: ${UNIVERSE_THEMES.codeСosmos.primary};
    --universe-secondary: ${UNIVERSE_THEMES.codeСosmos.secondary};
    --universe-accent: ${UNIVERSE_THEMES.codeСosmos.accent};
    --universe-dark: ${UNIVERSE_THEMES.codeСosmos.dark};
  }
  
  [data-universe="battle-ground"] {
    --universe-primary: ${UNIVERSE_THEMES.battleGround.primary};
    --universe-secondary: ${UNIVERSE_THEMES.battleGround.secondary};
    --universe-accent: ${UNIVERSE_THEMES.battleGround.accent};
    --universe-dark: ${UNIVERSE_THEMES.battleGround.dark};
  }
  
  [data-universe="career"] {
    --universe-primary: ${UNIVERSE_THEMES.career.primary};
    --universe-secondary: ${UNIVERSE_THEMES.career.secondary};
    --universe-accent: ${UNIVERSE_THEMES.career.accent};
    --universe-dark: ${UNIVERSE_THEMES.career.dark};
  }
  
  [data-universe="civilization"] {
    --universe-primary: ${UNIVERSE_THEMES.civilization.primary};
    --universe-secondary: ${UNIVERSE_THEMES.civilization.secondary};
    --universe-accent: ${UNIVERSE_THEMES.civilization.accent};
    --universe-dark: ${UNIVERSE_THEMES.civilization.dark};
  }
  
  [data-universe="knowledge"] {
    --universe-primary: ${UNIVERSE_THEMES.knowledge.primary};
    --universe-secondary: ${UNIVERSE_THEMES.knowledge.secondary};
    --universe-accent: ${UNIVERSE_THEMES.knowledge.accent};
    --universe-dark: ${UNIVERSE_THEMES.knowledge.dark};
  }
  
  [data-universe="curiosity"] {
    --universe-primary: ${UNIVERSE_THEMES.curiosity.primary};
    --universe-secondary: ${UNIVERSE_THEMES.curiosity.secondary};
    --universe-accent: ${UNIVERSE_THEMES.curiosity.accent};
    --universe-dark: ${UNIVERSE_THEMES.curiosity.dark};
  }
  
  /* Devanagari Script Optimization */
  :lang(hi), :lang(mr) {
    --font-body: ${FONTS.devanagari}, ${FONTS.body};
    line-height: 2.0;
    font-size: 1.0625rem;
  }
` as const;

/**
 * TYPE-SAFE EXPORTS
 */
export type Color = keyof typeof COLORS;
export type Universe = keyof typeof UNIVERSE_THEMES;
export type FontFamily = keyof typeof FONTS;
export type FontSize = keyof typeof FONT_SIZES;
export type Spacing = keyof typeof SPACING;
export type Radius = keyof typeof RADIUS;
export type Shadow = keyof typeof SHADOWS;
export type ZLayer = keyof typeof Z_LAYERS;

/**
 * Design System Constants for Kumbara App
 *
 * This file provides a centralized, responsive design system using an 8-point grid.
 * All values scale based on screen dimensions for consistent cross-device experience.
 *
 * Usage:
 * import { spacing, typography, shadows, borderRadius } from '@/constants/designSystem';
 *
 * style={{ padding: spacing(width, height).lg }}
 */

import { TextStyle, ViewStyle, StyleSheet } from "react-native";

/**
 * Calculate responsive base unit from screen width
 * COMPACT VERSION: Reduced by 40% for tighter, modern layout
 * Base unit approximates 4.5px on average phone screens (375-428px wide)
 */
export const getBaseUnit = (width: number): number => width * 0.012;

/**
 * Spacing Scale - 8-Point Grid System
 *
 * Returns spacing values based on screen dimensions
 * All values are multiples of the base unit (~8px)
 *
 * @param width - Screen width from useWindowDimensions
 * @param height - Screen height from useWindowDimensions
 */
export const spacing = (width: number, height: number) => {
  const base = getBaseUnit(width);

  return {
    xs: base * 0.5, // ~4px
    sm: base * 1, // ~8px
    md: base * 2, // ~16px
    lg: base * 3, // ~24px
    xl: base * 4, // ~32px
    xxl: base * 6, // ~48px

    // Vertical spacing helpers
    verticalXs: { paddingVertical: base * 0.5 },
    verticalSm: { paddingVertical: base * 1 },
    verticalMd: { paddingVertical: base * 2 },
    verticalLg: { paddingVertical: base * 3 },
    verticalXl: { paddingVertical: base * 4 },

    // Horizontal spacing helpers
    horizontalXs: { paddingHorizontal: base * 0.5 },
    horizontalSm: { paddingHorizontal: base * 1 },
    horizontalMd: { paddingHorizontal: base * 2 },
    horizontalLg: { paddingHorizontal: base * 3 },
    horizontalXl: { paddingHorizontal: base * 4 }
  };
};

/**
 * Typography Scale - Professional Fintech Style
 *
 * Refined scale inspired by Revolut, N26, Monzo
 * Follows professional banking app typography patterns
 *
 * @param width - Screen width from useWindowDimensions
 */
export const typography = (width: number): Record<string, TextStyle> => {
  return {
    // Hero balance display
    display: {
      fontSize: width * 0.09, // Larger for prominence (~34px)
      fontWeight: "900", // Black weight for impact
      lineHeight: width * 0.108, // 1.2x fontSize
      letterSpacing: -0.02 * width * 0.09 // Tighter for large text
    },
    // Main headings
    h1: {
      fontSize: width * 0.065, // ~25px
      fontWeight: "700",
      lineHeight: width * 0.078,
      letterSpacing: 0
    },
    // Section headers
    h2: {
      fontSize: width * 0.052, // ~20px
      fontWeight: "600",
      lineHeight: width * 0.062,
      letterSpacing: 0
    },
    // Card titles
    h3: {
      fontSize: width * 0.046, // ~17px
      fontWeight: "600",
      lineHeight: width * 0.055,
      letterSpacing: 0
    },
    // Main content
    body: {
      fontSize: width * 0.04, // ~15px
      fontWeight: "400",
      lineHeight: width * 0.06, // 1.5x for readability
      letterSpacing: 0.01 * width * 0.04
    },
    // Emphasized body
    bodyBold: {
      fontSize: width * 0.04,
      fontWeight: "600",
      lineHeight: width * 0.06,
      letterSpacing: 0.01 * width * 0.04
    },
    // Labels and metadata
    caption: {
      fontSize: width * 0.035, // ~13px
      fontWeight: "400",
      lineHeight: width * 0.049, // 1.4x
      letterSpacing: 0.02 * width * 0.035
    },
    // Emphasized labels
    captionBold: {
      fontSize: width * 0.035,
      fontWeight: "600",
      lineHeight: width * 0.049,
      letterSpacing: 0.02 * width * 0.035
    },
    // Fine print
    small: {
      fontSize: width * 0.03, // ~11px
      fontWeight: "400",
      lineHeight: width * 0.042,
      letterSpacing: 0.02 * width * 0.03
    }
  };
};
export const iconSizes = (width: number) => {
  return {
    xs: width * 0.04, // ~15px - Tiny indicators
    sm: width * 0.05, // ~19px - Small inline icons
    md: width * 0.07, // ~26px - Standard icons
    lg: width * 0.09, // ~34px - Large icons
    xl: width * 0.12, // ~45px - Hero icons
    xxl: width * 0.16 // ~60px - Large avatars/logos
  };
};

/**
 * Shadow Presets - Professional Elevation System
 *
 * Refined shadows inspired by Material Design 3 and iOS HIG
 * Creates subtle depth without overwhelming the interface
 *
 * Usage: style={{ ...shadows.card }}
 */
export const shadows: Record<string, ViewStyle> = {
  // Flat - No elevation
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },

  // Subtle - Transaction items, minimal depth
  subtle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2
  },

  // Card - Standard cards and containers
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },

  // Button - Interactive elements
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6
  },

  // Hero - Primary featured element (Balance Card)
  hero: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10
  },

  // Modal - Overlays and dialogs
  modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 48,
    elevation: 16
  }
};

/**
 * Border Radius Scale - Modern Fintech Style
 *
 * Refined corner rounding inspired by Revolut, N26
 * Slightly more rounded for premium aesthetic
 *
 * @param width - Screen width from useWindowDimensions
 */
export const borderRadius = (width: number) => {
  return {
    xs: width * 0.008, // ~3px - minimal rounding
    sm: width * 0.012, // ~4.5px - subtle corners
    md: width * 0.02, // ~8px - standard buttons
    lg: width * 0.032, // ~12px - cards, containers
    xl: width * 0.042, // ~16px - hero elements
    xxl: width * 0.053, // ~20px - prominent cards
    round: width * 0.5 // Fully circular (avatars, pills)
  };
};

/**
 * Border Width Scale - Standardized Line Thicknesses
 *
 * Provides consistent border and divider line widths
 * Use for borders, dividers, and stroke widths
 *
 * Usage:
 * - borderWidth: borderWidths().xs
 * - height: borderWidths().hairline (for horizontal lines)
 */
export const borderWidths = () => {
  return {
    hairline: StyleSheet.hairlineWidth, // Thinnest possible (~0.5px)
    xs: 1, // Standard thin border
    sm: 2, // Medium border
    md: 3, // Thick border
    lg: 4, // Extra thick border
    xl: 5  // Very thick border (rare)
  };
};

/**
 * Layout Helpers
 *
 * Utility functions for common responsive layout patterns
 */
export const layout = {
  /**
   * Get responsive width as percentage of screen width
   */
  widthPercentage: (width: number, percentage: number): number => {
    return width * (percentage / 100);
  },

  /**
   * Get responsive height as percentage of screen height
   */
  heightPercentage: (height: number, percentage: number): number => {
    return height * (percentage / 100);
  },

  /**
   * Center content horizontally
   */
  centerHorizontal: {
    alignItems: "center" as const
  },

  /**
   * Center content vertically
   */
  centerVertical: {
    justifyContent: "center" as const
  },

  /**
   * Center content both ways
   */
  centerBoth: {
    alignItems: "center" as const,
    justifyContent: "center" as const
  },

  /**
   * Full flex container
   */
  flex1: {
    flex: 1
  },

  /**
   * Row layout
   */
  row: {
    flexDirection: "row" as const
  },

  /**
   * Row layout with space between
   */
  rowSpaceBetween: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const
  },

  /**
   * Row layout with centered items
   */
  rowCenter: {
    flexDirection: "row" as const,
    alignItems: "center" as const
  }
};

/**
 * Animation Durations (in milliseconds)
 *
 * Consistent timing for animations and transitions
 */
export const animations = {
  fast: 150,
  normal: 250,
  slow: 400
};

/**
 * Breakpoints for responsive design
 *
 * Use these to apply different styles for different device sizes
 */
export const breakpoints = {
  small: 375, // Small phones
  medium: 428, // Large phones
  large: 768, // Tablets
  xlarge: 1024 // Large tablets / small desktops
};

/**
 * Helper to check device size category
 */
export const getDeviceSize = (
  width: number
): "small" | "medium" | "large" | "xlarge" => {
  if (width < breakpoints.medium) return "small";
  if (width < breakpoints.large) return "medium";
  if (width < breakpoints.xlarge) return "large";
  return "xlarge";
};

/**
 * Accent Color System
 *
 * Modern, vibrant colors for UI accents and actions
 * Use these for buttons, icons, and highlights
 */
export const accentColors = {
  success: "#10B981", // Emerald green - for positive actions
  warning: "#F59E0B", // Amber - for warnings and withdrawals
  primary: "#3B82F6", // Sky blue - for primary actions
  purple: "#8B5CF6", // Violet - for premium features
  error: "#EF4444", // Red - for errors
  info: "#06B6D4" // Cyan - for information
};

/**
 * Gradient Presets
 *
 * Modern gradient combinations for cards and backgrounds
 * Returns array of colors for LinearGradient component
 */
export const gradients = {
  // Primary gradients
  primary: ["#667eea", "#764ba2"],
  primaryLight: ["#a8edea", "#fed6e3"],

  // Success gradients
  success: ["#0cebeb", "#20e3b2", "#29ffc6"],
  successAlt: ["#56ab2f", "#a8e063"],

  // Sunset/warm gradients
  sunset: ["#fa709a", "#fee140"],
  warm: ["#ff9a56", "#ff6a88"],

  // Ocean/cool gradients
  ocean: ["#2E3192", "#1BFFFF"],
  cool: ["#667eea", "#764ba2"],

  // Dark gradients
  dark: ["#0F2027", "#203A43", "#2C5364"],
  darkPurple: ["#2C3E50", "#4CA1AF"],

  // Neon gradients (for dark mode)
  neon: ["#08AEEA", "#2AF598"],
  neonPink: ["#FF6A88", "#FF99AC"]
};

/**
 * Colored Shadow System
 *
 * Modern colored shadows for depth with brand colors
 * iOS and Android compatible
 */
export const coloredShadows = {
  primary: {
    shadowColor: accentColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6
  },
  success: {
    shadowColor: accentColors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6
  },
  purple: {
    shadowColor: accentColors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 7
  }
};

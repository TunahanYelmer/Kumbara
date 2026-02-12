import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, borderRadius, shadows } from "@/constants/designSystem";

/**
 * Navbar Styles - Modern Bottom Tab Navigation
 *
 * Professional fintech design with clean styling
 * Optimized for easy thumb access and visual clarity
 */
export const createNavbarStyles = (
  theme: Theme,
  activeTab: string,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const radius = borderRadius(width);

  return StyleSheet.create({
    // Main navbar container - Minimalist
    navbarContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme.NavbarBgColor,
      paddingHorizontal: space.xs,
      paddingTop: space.xxs, // Tiny top padding
      paddingBottom: space.xs, // Tiny bottom padding
      borderTopWidth: 1,
      borderTopColor: theme.NavbarBorderColor,
      ...shadows.navbar,
      minHeight: 52, // Minimalist height
    },

    // Individual tab button - Minimalist layout
    tabButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 2, // Tiny padding
      position: "relative",
      gap: 0, // No gap between icon and text
    },

    // Icon container - Minimalist
    iconContainer: {
      width: 32, // Tiny size
      height: 32,
      borderRadius: radius.sm,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 0,
    },

    // Active icon container - Subtle depth
    activeIconContainer: {
      backgroundColor: theme.NavbarIconActiveBgColor,
      transform: [{ scale: 1.03 }], // Very subtle scale
    },

    // Tab text label - Minimalist typography
    tabText: {
      fontSize: 9, // Tiny size
      fontWeight: "500",
      color: theme.NavbarTextInactiveColor,
      letterSpacing: 0,
    },

    // Active tab text - Slightly emphasized
    activeTabText: {
      color: theme.NavbarTextActiveColor,
      fontWeight: "600",
      fontSize: 9,
    },

    // Active indicator - Minimalist and subtle
    activeIndicator: {
      position: "absolute",
      top: 0,
      width: 32, // Matches icon size
      height: 2, // Ultra thin line
      backgroundColor: theme.NavbarIndicatorColor,
      borderRadius: radius.full,
      shadowColor: theme.NavbarIndicatorColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 1,
    },

    // FAB (Floating Action Button) - Balcony style
    fabButton: {
      width: 52,
      height: 52,
      marginTop: -26, // High elevation - appears above like balcony
      justifyContent: "center",
      alignItems: "center",
    },

    // FAB icon container - Minimalist with border ring
    fabIconContainer: {
      width: 52, // Matches button size
      height: 52,
      borderRadius: 26, // Perfect circle
      backgroundColor: theme.NavbarIconActiveColor, // Teal #00d4aa
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2, // Thin border ring
      borderColor: theme.DarkMode ? "rgba(0, 212, 170, 0.3)" : "rgba(255, 255, 255, 0.9)", // Adaptive ring
      // Moderate shadow for depth
      shadowColor: theme.NavbarIconActiveColor,
      shadowOffset: { width: 0, height: 2.5 },
      shadowOpacity: 0.35,
      shadowRadius: 9,
      elevation: 9,
    },
  });
};

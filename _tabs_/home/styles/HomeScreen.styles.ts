import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing } from "@/constants/designSystem";

/**
 * HomeScreen Styles - Professional Fintech Layout
 *
 * Inspired by Revolut, N26, Monzo - Clean, hierarchical, scannable
 *
 * Visual Hierarchy:
 * 1. Header - Minimal, unobtrusive
 * 2. Hero Balance - Prominent focal point
 * 3. Quick Actions - Easy thumb reach
 * 4. Transaction History - Scrollable list
 */
export const createHomeScreenStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);

  return StyleSheet.create({
    /**
     * Main container
     * TransactionHistory FlatList handles all scrolling
     */
    container: {
      flex: 1,
      backgroundColor: theme.HomeScreenBgColor,
    },

    /**
     * Header Section
     * Compact user profile area
     */
    header: {
      paddingTop: space.sm,
      paddingHorizontal: space.md,
      paddingBottom: space.xs,
    },

    /**
     * Hero Balance Card Section
     * Primary focal point with premium spacing
     */
    heroSection: {
      paddingVertical: space.sm,
      paddingHorizontal: space.xs,
      alignItems: "center",
      marginBottom: -space.md,        // Subtle overlap for depth
    },

    /**
     * Quick Actions Section
     * Primary interaction zone - overlaps hero slightly
     */
    quickActions: {
      paddingTop: space.lg,           // Compensates for negative margin
      paddingBottom: space.sm,
      paddingHorizontal: space.xs,
    },

    /**
     * Transaction History Wrapper
     * Scrollable list container
     */
    historyWrapper: {
      flex: 1,
      paddingTop: space.xs,
    },
  });
};

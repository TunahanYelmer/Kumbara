import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import {
  spacing,
  borderRadius,
  shadows,
  typography,
  iconSizes,
} from "@/constants/designSystem";

/**
 * StatsScreen Icon Props
 * Matching GoalsList icon sizing patterns
 */
export const createStatsIconProps = (
  theme: Theme,
  width: number,
  height: number
) => {
  const icons = iconSizes(width);

  return {
    // Stat card icons (like GoalsList calendar icon)
    piggyBank: {
      width: icons.sm,
      height: icons.sm,
      fill: "none",
      stroke: theme.StatsLabelColor,
    },
    calendar: {
      width: icons.sm,
      height: icons.sm,
      fill: "none",
      stroke: theme.StatsLabelColor,
    },
    target: {
      width: icons.sm,
      height: icons.sm,
      fill: "none",
      stroke: theme.StatsLabelColor,
    },
    flame: {
      width: icons.sm,
      height: icons.sm,
      fill: "none",
      stroke: theme.StatsLabelColor,
    },
    // Change indicator icons
    trendUp: {
      width: 14,
      height: 14,
      fill: "none",
      stroke: "#22c55e",
    },
    check: {
      width: 14,
      height: 14,
      fill: "none",
      stroke: "#22c55e",
    },
    // Category icons (white on colored background)
    briefcase: {
      width: icons.md,
      height: icons.md,
      fill: "none",
      stroke: "#FFFFFF",
    },
    gift: {
      width: icons.md,
      height: icons.md,
      fill: "none",
      stroke: "#FFFFFF",
    },
  };
};

/**
 * StatsScreen Styles
 * Matching GoalsList and BalanceCard patterns from HomeScreen
 */
export const createStatsScreenStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const radius = borderRadius(width);
  const typo = typography(width);

  return StyleSheet.create({
    // Main container
    container: {
      flex: 1,
      backgroundColor: theme.BackgroundColor,
      paddingHorizontal: space.md,
      paddingTop: space.md,
    },

    // Screen header
    screenHeader: {
      marginBottom: space.md,
    },

    screenTitle: {
      ...typo.h1,
      color: theme.StatsValueColor,
      marginBottom: space.xs,
    },

    screenSubtitle: {
      ...typo.caption,
      color: theme.StatsLabelColor,
    },

    // Stats grid - 2x2 layout (matching GoalsList spacing)
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: space.md,
      marginBottom: space.md,
    },

    // Stat card (matching GoalsList card style)
    statCard: {
      flex: 1,
      minWidth: "45%",
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.lg,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    statHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
      marginBottom: space.sm,
    },

    statLabel: {
      ...typo.small,
      color: theme.StatsLabelColor,
    },

    statValue: {
      ...typo.h2,
      color: theme.StatsValueColor,
      marginBottom: space.xs,
    },

    statChange: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
    },

    statChangeText: {
      ...typo.small,
      fontWeight: "600",
    },

    // Chart container (matching GoalsList card style)
    chartContainer: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.lg,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
      marginBottom: space.md,
    },

    chartHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: space.md,
    },

    chartTitle: {
      ...typo.h3,
      color: theme.StatsValueColor,
    },

    // Period selector - compact grouped buttons
    periodSelector: {
      flexDirection: "row",
      gap: space.xs,
      backgroundColor: "rgba(255,255,255,0.05)",
      padding: space.xs,
      borderRadius: radius.sm,
    },

    periodButton: {
      paddingVertical: space.xs * 1.5,
      paddingHorizontal: space.md,
      borderRadius: space.sm,
    },

    periodButtonActive: {
      backgroundColor: theme.StatsPeriodButtonActiveColor,
    },

    periodButtonText: {
      ...typo.small,
      color: theme.StatsPeriodButtonTextColor,
      fontWeight: "600",
    },

    periodButtonTextActive: {
      color: theme.BackgroundColor,
      fontWeight: "700",
    },

    // Bar chart
    barChart: {
      height: 140,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingTop: space.md,
    },

    barContainer: {
      flex: 1,
      alignItems: "center",
    },

    bar: {
      width: "60%",
      backgroundColor: "rgba(0, 212, 170, 0.2)",
      borderRadius: 6,
      minHeight: 20,
    },

    barLabel: {
      ...typo.small,
      color: theme.StatsLabelColor,
      marginTop: space.sm,
    },

    // Section header (matching GoalsList)
    sectionHeader: {
      marginBottom: space.md,
    },

    sectionTitle: {
      ...typo.h2,
      color: theme.StatsValueColor,
    },

    // Category card (matching GoalsList card style)
    categoryCard: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.lg,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    categoryHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: space.md,
    },

    categoryInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.md,
    },

    // Category icon container (matching GoalsList iconContainer)
    categoryIconContainer: {
      width: width * 0.115, // ~44px like GoalsList
      height: width * 0.115,
      borderRadius: radius.md,
      backgroundColor: "rgba(255,255,255,0.05)",
      alignItems: "center",
      justifyContent: "center",
    },

    categoryName: {
      ...typo.body,
      color: theme.StatsValueColor,
      fontWeight: "600",
    },

    categoryPercent: {
      ...typo.h3,
      color: theme.StatsValueColor,
    },

    // Progress bar (matching GoalsList)
    progressBarBackground: {
      height: 8,
      backgroundColor: "rgba(255,255,255,0.08)",
      borderRadius: radius.sm,
      overflow: "hidden",
    },

    progressBarFill: {
      height: "100%",
      borderRadius: radius.sm,
    },
  });
};

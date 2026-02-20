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
 * GoalsScreen Icon Props
 * Matching GoalsList icon sizing patterns
 */
export const createGoalsScreenIconProps = (
  theme: Theme,
  width: number,
  height: number
) => {
  const icons = iconSizes(width);

  return {
    // Goal icons (white on colored backgrounds)
    beach: {
      width: icons.md,
      height: icons.md,
      fill: "none",
      stroke: "#FFFFFF",
    },
    car: {
      width: icons.md,
      height: icons.md,
      fill: "none",
      stroke: "#FFFFFF",
    },
    shield: {
      width: icons.md,
      height: icons.md,
      fill: "none",
      stroke: "#FFFFFF",
    },
    house: {
      width: icons.md,
      height: icons.md,
      fill: "none",
      stroke: "#FFFFFF",
    },
    plane: {
      width: icons.md,
      height: icons.md,
      fill: "none",
      stroke: "#FFFFFF",
    },
    graduation: {
      width: icons.md,
      height: icons.md,
      fill: "none",
      stroke: "#FFFFFF",
    },
    // Utility icons
    clock: {
      width: 12,
      height: 12,
      fill: "none",
      stroke: theme.StatsLabelColor,
    },
    check: {
      width: 16,
      height: 16,
      fill: "none",
      stroke: "#22c55e",
    },
    plus: {
      width: 24,
      height: 24,
      fill: "none",
      stroke: "#FFFFFF",
    },
  };
};

/**
 * GoalsScreen Styles
 * Matching GoalsList and BalanceCard patterns from HomeScreen
 */
export const createGoalsScreenStyles = (
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
    header: {
      marginBottom: space.lg,
    },

    title: {
      ...typo.h1,
      color: theme.StatsValueColor,
      marginBottom: space.xs,
    },

    subtitle: {
      ...typo.caption,
      color: theme.StatsLabelColor,
    },

    // Summary card (3 columns)
    summaryCard: {
      flexDirection: "row",
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.lg,
      marginBottom: space.lg,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    summaryItem: {
      flex: 1,
      alignItems: "center",
    },

    summaryValue: {
      ...typo.h1,
      color: theme.StatsValueColor,
      marginBottom: space.xs,
    },

    summaryLabel: {
      ...typo.small,
      color: theme.StatsLabelColor,
    },

    summaryDivider: {
      width: 1,
      backgroundColor: "rgba(255,255,255,0.1)",
    },

    // Section title
    sectionTitle: {
      ...typo.h2,
      color: theme.StatsValueColor,
      marginBottom: space.md,
    },

    // Goals list container
    goalsList: {
      gap: space.md,
      marginBottom: space.lg,
    },

    // Individual goal card (matching GoalsList style)
    goalCard: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.lg,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    completedCard: {
      opacity: 0.7,
    },

    goalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: space.md,
    },

    goalInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.md,
      flex: 1,
    },

    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
    },

    goalTitle: {
      ...typo.h3,
      color: theme.StatsValueColor,
      marginBottom: space.xs * 0.75,
    },

    deadlineRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
    },

    deadlineText: {
      ...typo.small,
      color: theme.StatsLabelColor,
    },

    amountColumn: {
      alignItems: "flex-end",
    },

    currentAmount: {
      ...typo.h3,
      color: theme.StatsValueColor,
    },

    targetAmount: {
      ...typo.small,
      color: theme.StatsLabelColor,
    },

    // Progress bar (matching GoalsList)
    progressContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.sm,
    },

    progressBackground: {
      flex: 1,
      height: 8,
      backgroundColor: "rgba(255,255,255,0.08)",
      borderRadius: radius.sm,
      overflow: "hidden",
    },

    progressFill: {
      height: "100%",
      borderRadius: radius.sm,
    },

    progressText: {
      ...typo.small,
      fontWeight: "700",
      minWidth: 35,
    },

    // Floating Action Button
    fab: {
      position: "absolute",
      right: 0,
      bottom: 100,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.StatsHighlightColor,
      alignItems: "center",
      justifyContent: "center",
      ...shadows.hero,
    },
  });
};

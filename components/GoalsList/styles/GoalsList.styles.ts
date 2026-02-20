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
 * Icon Props for Goal Icons
 *
 * Returns size and color configuration for SVG icons
 * All icons are white on colored circular backgrounds
 */
export const createGoalsListIconProps = (
  theme: Theme,
  width: number,
  height: number
) => {
  const icons = iconSizes(width);
  const iconColor = "#FFFFFF"; // White icons on colored backgrounds

  return {
    phone: {
      width: icons.md, // Bigger icons!
      height: icons.md,
      fill: iconColor,
      stroke: iconColor,
    },
    plane: {
      width: icons.md, // Bigger icons!
      height: icons.md,
      fill: iconColor,
      stroke: iconColor,
    },
    bank: {
      width: icons.md, // Bigger icons!
      height: icons.md,
      fill: iconColor,
      stroke: iconColor,
    },
  };
};

/**
 * Goals List Styles - Professional Goal Cards
 *
 * Modern fintech design with progress visualization
 * Optimized for clarity and visual hierarchy
 */
export const createGoalsListStyles = (
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
    },

    // Section header
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: space.xs,
      marginBottom: space.lg,
    },

    headerTitle: {
      ...typo.h2,
      color: theme.GoalsListHeaderTitleColor,
    },

    seeAllButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
    },

    seeAllText: {
      ...typo.caption,
      color: theme.StatsHighlightColor,
      fontWeight: "600",
    },

    // List content
    listContent: {
      gap: space.md, // 12px gap between cards
    },

    // Individual goal card (card design with shadow)
    goalCard: {
      backgroundColor: theme.GoalCardBgColor,
      borderRadius: radius.xl,
      padding: space.md,
      marginBottom: space.sm,
      borderWidth: 1,
      borderColor: theme.GoalCardBorderColor,
      ...shadows.card, // Card elevation shadow
    },

    // Goal header: horizontal layout with left and right sections
    goalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: space.md,
    },

    // Left side: Icon + Text
    goalInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.md,
      flex: 1,
    },

    // Icon container with themed background (applied dynamically)
    iconContainer: {
      width: width * 0.10, // ~38px
      height: width * 0.10,
      borderRadius: radius.md, // Rounded square (14px), not circle
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor applied dynamically based on goal.color
    },

    // Text container for title and deadline
    textContainer: {
      justifyContent: "center",
      flex: 1,
    },

    // Goal title
    goalTitle: {
      ...typo.body,
      color: theme.GoalCardNameColor,
      fontWeight: "600",
      marginBottom: space.xs * 0.75,
    },

    // Deadline container with icon
    deadlineContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
    },

    // Deadline text
    deadlineText: {
      ...typo.small,
      color: theme.GoalCardDeadlineTextColor,
    },

    // Right side: Amounts (stacked vertically)
    amountContainer: {
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: space.xs / 2,
    },

    // Progress bar section (no percentage text in reference design)
    progressBarContainer: {
      width: "100%",
    },

    progressBarBackground: {
      height: 8,
      backgroundColor: theme.GoalCardProgressBgColor,
      borderRadius: radius.sm, // 4px rounded
      overflow: "hidden",
    },

    progressBarFill: {
      height: "100%",
      borderRadius: radius.sm, // 4px rounded
    },

    // Current amount (big, bold, white)
    currentAmount: {
      ...typo.h3,
      color: theme.GoalCardCurrentAmountColor,
    },

    // Target amount (small, gray, below current)
    targetAmount: {
      ...typo.small,
      color: theme.GoalCardTargetAmountColor,
    },
  });
};

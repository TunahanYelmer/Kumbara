import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import {
  spacing,
  borderRadius,
  shadows,
  typography,
  iconSizes
} from "@/constants/designSystem";

/**
 * Icon Props for Quick Action Cards
 *
 * Returns size and color configuration for SVG icons
 */
export const createTransactionsIconProps = (
  theme: Theme,
  width: number,
  height: number
) => {
  const icons = iconSizes(width);
  return {
    wallet: {
      width: icons.md,
      height: icons.md,
      fill: theme.AddMoneyIconFillColor,
      stroke: theme.AddMoneyIconStrokeColor
    },
    withdraw: {
      width: icons.md,
      height: icons.md,
      fill: theme.WithdrawIconFillColor,
      stroke: theme.WithdrawIconStrokeColor
    },
    info: {
      width: icons.md,
      height: icons.md,
      fill: theme.AddGoalIconFillColor,
      stroke: theme.AddGoalIconStrokeColor
    }
  };
};

/**
 * Transactions Styles - Professional Action Buttons
 *
 * Modern fintech design with refined spacing and typography
 * Optimized for thumb-friendly interactions
 */
export const createTransactionsStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const radius = borderRadius(width);
  const typo = typography(width);

  return StyleSheet.create({
    // Main wrapper - minimal styling
    container: {
      marginHorizontal: space.md,
      marginVertical: space.sm
    },

    // Horizontal row for 3 cards
    quickActionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: space.sm // Space between buttons
    },

    // Shared card style (all 3 buttons)
    quickActionCard: {
      flex: 1, // Equal width for all 3
      flexDirection: "column", // Icon above text
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: space.lg,
      paddingHorizontal: space.md,
      borderRadius: radius.xl, // Rounded corners
      ...shadows.card, // Subtle shadow
      minHeight: 100 // Minimum height for touch target
    },

    // Specific background colors for each button
    addMoneyCard: {
      backgroundColor: theme.AddMoneyCardBgColor
    },

    withdrawCard: {
      backgroundColor: theme.WithdrawCardBgColor
    },

    addGoalCard: {
      backgroundColor: theme.AddGoalCardBgColor
    },

    // Icon wrapper
    addMoneyIconContainer: {
      marginBottom: space.sm, // Space between icon and text
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.AddMoneyIconBgColor,
      padding: space.md,
      borderRadius: radius.lg
    },
    withdrawIconContainer: {
      marginBottom: space.sm, // Space between icon and text
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.WithdrawIconBgColor,
      padding: space.md,
      borderRadius: radius.lg
    },
    newGoalIconContainer: {
      marginBottom: space.sm, // Space between icon and text
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.AddGoalIconBgColor,
      padding: space.md,
      borderRadius: radius.lg
    },

    // Shared text style
    actionText: {
      ...typo.caption,
      fontWeight: "600",
      textAlign: "center"
    },

    // Specific text colors for each button
    addMoneyText: {
      color: theme.AddMoneyTextColor
    },

    withdrawText: {
      color: theme.WithdrawTextColor
    },

    addGoalText: {
      color: theme.AddGoalTextColor
    }
  });
};

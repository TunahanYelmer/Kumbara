import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import {
  borderRadius,
  shadows,
  typography,
  spacing,
  iconSizes,
  layout,
  borderWidths
} from "@/constants/designSystem";

export const createBalanceCardIconProps = (
  theme: Theme,
  width: number,
  height: number
) => {
  const icons = iconSizes(width);
  return {
    trendArrow: {
      width: icons.xs,
      height: icons.xs,
      fill: theme.BalanceCardDeficitIconFillColor,
      stroke: theme.BalanceCardGoalsIconStrokeColor
    },
    goals: {
      width: icons.sm,
      height: icons.sm,
      fill: theme.BalanceCardGoalsIconFillColor,
      stroke: theme.BalanceCardGoalsIconStrokeColor
    },
    calendar: {
      width: icons.sm,
      height: icons.sm,
      fill: theme.BalanceCardCalendarIconFillColor,
      stroke: theme.BalanceCardCalendarIconStrokeColor
    }
  };
};

/**
 * BalanceCard Styles - Premium Fintech Hero Card
 *
 * Professional design inspired by Revolut, N26, Monzo
 * Features:
 * - Large, prominent display
 * - Premium gradient background
 * - Refined typography hierarchy
 * - Subtle border for depth
 * - Hero-level elevation
 */
export const createBalanceCardStyles = (theme: Theme, width: number) => {
  const radius = borderRadius(width);
  const typo = typography(width);
  const space = spacing(width, 0);
  const borders = borderWidths();

  return StyleSheet.create({
    cardContainer: {
      flexDirection: "column",
      alignSelf: "stretch",
      backgroundColor: theme.BalanceCardColor[0],
      borderRadius: radius.xl,
      padding: space.xxl,
      marginHorizontal: space.md, // ✅ Space from screen edges
      marginVertical: space.lg, // ✅ More space top/bottom
      ...shadows.hero
    },
    savingsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    savings: {
      gap: space.xl
    },
    savingsText: {
      ...typo.h3,
      color: theme.BalanceCardTitleColor
    },
    savingsDeficit: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: radius.xxl,
      paddingVertical: space.xs,
      paddingHorizontal: space.md,
      backgroundColor: theme.BalanceCardDeficitBadgeBackgroundColor,
      gap: space.md
    },
    savingsDefictPercentage: {
      color: theme.BalanceCardDeficitPercentageTextColor
    },
    savingsDeficitIcon: {},
    balanceContainer: {},
    balanceAmount: {
      flexDirection: "row",
      gap: space.xs
    },
    balanceUnit: {
      ...typo.display,
      color: theme.BalanceCardAmountColor
    },
    balanceValue: {
      ...typo.display,
      color: theme.BalanceCardAmountColor
    },
    borderLine: {
      height: borders.hairline, // or borders.xs
      backgroundColor: theme.BalanceCardBorderLineColor,
      alignSelf: "stretch",
      marginVertical: space.md
    },
    cardFooter: { flexDirection: "row", justifyContent: "space-between" },
    goalsContainer: {},
    goals: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: space.md
    },
    goalsIcon: {},
    goalsText: {
      ...typo.caption,
      color: theme.BalanceCardGoalsTextColor
    },
    lastUpdate: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: space.md
    },
    lastUpdateIcon: {},
    lastUpdateText: {
      ...typo.caption,
      color: theme.BalanceCardLastUpdateTextColor
    }
  });
};

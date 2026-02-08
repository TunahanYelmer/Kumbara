import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { borderRadius, shadows, typography, spacing } from "@/constants/designSystem";

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

  return StyleSheet.create({
    card: {
      width: width * 0.92,
      borderRadius: radius.xxl,        // More premium rounding (20px)
      padding: width * 0.064,          // Balanced padding (24px)
      marginHorizontal: width * 0.04,
      marginVertical: space.sm,
      // Premium hero shadow
      ...shadows.hero,
      // Subtle border for sophistication
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.18)',
      // Extra polish
      overflow: 'hidden',              // Ensures gradient stays within bounds
    },
    title: {
      color: theme.BalanceCardTitleColor,
      ...typo.caption,                 // Use typography system
      fontWeight: "500",
      marginBottom: space.sm,
      opacity: 0.92,
      textTransform: 'uppercase' as const,
      letterSpacing: 1.2,              // More tracking for labels
    },
    amountContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: width * 0.012,
      marginTop: space.xs,
    },
    amount: {
      color: theme.BalanceCardAmountColor,
      ...typo.display,                 // Hero typography
      fontWeight: "900",               // Black weight for maximum impact
      includeFontPadding: false,       // Tighter vertical spacing
    },
  });
};


 
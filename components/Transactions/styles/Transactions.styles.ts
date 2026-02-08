import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, borderRadius, shadows, typography } from "@/constants/designSystem";

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
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: space.md,
      marginVertical: space.sm,
      gap: space.sm,                   // Modern gap property
    },
    add: {
      flex: 1,                         // Equal width buttons
      flexDirection: "row",
      backgroundColor: theme.AddButtonBgColor,
      paddingVertical: space.md,       // Comfortable touch target
      paddingHorizontal: space.lg,
      borderRadius: radius.xl,         // Premium rounding
      alignItems: "center",
      justifyContent: "center",
      ...shadows.button,
      minHeight: 48,                   // Minimum touch target (HIG)
    },
    substract: {
      flex: 1,                         // Equal width buttons
      flexDirection: "row",
      backgroundColor: theme.SubstractButtonBgColor,
      paddingVertical: space.md,       // Comfortable touch target
      paddingHorizontal: space.lg,
      borderRadius: radius.xl,         // Premium rounding
      alignItems: "center",
      justifyContent: "center",
      ...shadows.button,
      minHeight: 48,                   // Minimum touch target (HIG)
    },
    icon: {
      width: width * 0.06,             // Refined icon size
      height: width * 0.06,
      marginRight: space.xs,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      paddingVertical: space.sm,
      paddingHorizontal: space.md,
      borderRadius: radius.lg,
    },
    AddbuttonText: {
      color: theme.AddButtonTextColor,
      ...typo.body,
      fontWeight: "600",               // Semibold for emphasis
      textAlign: "center",
    },
    SubstructButtonText: {
      color: theme.SubstractButtonTextColor,
      ...typo.body,
      fontWeight: "600",               // Semibold for emphasis
      textAlign: "center",
    },
  });
};

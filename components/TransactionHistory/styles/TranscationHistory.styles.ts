import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import {
  spacing,
  borderRadius,
  typography,
  shadows
} from "@/constants/designSystem";

/**
 * TransactionHistory Styles - Professional List Design
 *
 * Clean, scannable transaction list inspired by modern banking apps
 * Optimized for readability and quick scanning
 */
export const createTransactionHistoryStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const radius = borderRadius(width);
  const typo = typography(width);

  return StyleSheet.create({
    container: {
      backgroundColor: theme.BackgroundColor,
      padding: space.md, // Comfortable padding
      marginHorizontal: space.sm,
      marginTop: space.sm,
      marginBottom: space.md,
      borderRadius: radius.lg,
      ...shadows.card // Subtle card elevation
    },
    tabs: {
      flexDirection: "row",
      marginBottom: space.sm,
      gap: space.xs // Modern gap property
    },
    tabButton: {
      backgroundColor: theme.TabButtonBgColor,
      paddingVertical: space.sm,
      paddingHorizontal: space.md,
      borderRadius: radius.lg, // Pill-shaped tabs
      minHeight: 32 // Minimum touch target
    },
    tabButtonText: {
      ...typo.caption,
      fontWeight: "500",
      color: theme.TabButtonInactiveColour,
      textAlign: "center"
    },
    activeTabText: {
      color: theme.TabActiveColor,
      fontWeight: "700"
    },
    loadingContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: space.xl
    },
    loadingText: {
      marginTop: space.sm,
      ...typo.caption,
      color: theme.TransactionHistoryLoadingColor
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: space.xl
    },
    emptyText: {
      ...typo.body,
      color: theme.TransactionHistoryEmptyTextColor,
      textAlign: "center",
      opacity: 0.7
    }
  });
};

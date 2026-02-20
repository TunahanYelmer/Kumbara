import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, borderRadius, shadows } from "@/constants/designSystem";

export const createAddScreenStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BackgroundColor,
    },

    // Back Button
    backButton: {
      width: 48,
      height: 48,
      borderRadius: radius.sm,
      backgroundColor: theme.StatsCardBgColor,
      alignItems: "center",
      justifyContent: "center",
      margin: space.lg,
      marginBottom: 0,
    },

    // Header
    header: {
      marginBottom: space.lg,
      paddingHorizontal: space.lg,
      paddingTop: space.md,
    },

    title: {
      ...typo.h2,
      color: theme.StatsValueColor,
      fontWeight: "700",
      marginBottom: space.xs / 2,
    },

    subtitle: {
      ...typo.caption,
      color: theme.StatsLabelColor,
    },

    // Input Card
    inputCard: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.lg,
      marginBottom: space.lg,
      marginHorizontal: space.lg,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    inputLabel: {
      ...typo.small,
      color: theme.StatsLabelColor,
      fontWeight: "600",
      letterSpacing: 1,
      marginBottom: space.md,
    },

    amountRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    // Custom hero text - intentionally larger than typo.display for amount input
    currencySymbol: {
      fontSize: width * 0.107, // ~40px - Hero currency symbol
      fontWeight: "700",
      color: theme.StatsLabelColor,
      marginRight: space.xs,
    },

    amountInput: {
      fontSize: width * 0.128, // ~48px - Hero amount display
      fontWeight: "800",
      color: theme.StatsValueColor,
    },

    // Type Selector
    typeSelector: {
      flexDirection: "row",
      gap: space.md,
      marginBottom: space.lg,
      paddingHorizontal: space.lg,
    },

    typeButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: space.xs,
      padding: space.md,
      borderRadius: radius.md,
      borderWidth: 2,
      borderColor: theme.StatsCardBorderColor,
      backgroundColor: theme.BackgroundColor,
    },

    typeButtonActive: {
      borderColor: theme.StatsHighlightColor,
      backgroundColor: `${theme.StatsHighlightColor}10`,
    },

    typeButtonExpense: {
      borderColor: theme.WithdrawIconFillColor,
      backgroundColor: `${theme.WithdrawIconFillColor}10`,
    },

    typeButtonText: {
      ...typo.body,
      color: theme.StatsLabelColor,
      fontWeight: "600",
    },

    typeButtonTextActive: {
      color: theme.StatsHighlightColor,
    },

    typeButtonTextExpense: {
      color: theme.WithdrawIconFillColor,
    },

    // Category Grid
    categoryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: space.sm,
    },

    categoryButton: {
      width: (width - space.lg * 2 - space.lg * 2 - space.sm) / 2,
      aspectRatio: 1,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      alignItems: "center",
      justifyContent: "center",
      gap: space.xs,
      backgroundColor: theme.BackgroundColor,
    },

    categoryButtonActive: {
      borderColor: theme.StatsHighlightColor,
      backgroundColor: `${theme.StatsHighlightColor}10`,
    },

    categoryText: {
      ...typo.small,
      color: theme.StatsLabelColor,
      fontWeight: "500",
    },

    categoryTextActive: {
      color: theme.StatsHighlightColor,
    },

    // Number Pad
    numberPad: {
      paddingHorizontal: space.lg,
      paddingTop: space.md,
      gap: space.sm,
    },

    numberRow: {
      flexDirection: "row",
      gap: space.sm,
    },

    numberButton: {
      flex: 1,
      aspectRatio: 2,
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      minHeight: 56, // Accessibility: 48px+ touch target
    },

    numberText: {
      ...typo.h2,
      color: theme.StatsValueColor,
      fontWeight: "600",
    },

    // Submit Button
    submitButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: space.xs,
      backgroundColor: theme.StatsHighlightColor,
      borderRadius: radius.md,
      padding: space.lg,
      marginTop: space.lg,
      marginHorizontal: space.lg,
      marginBottom: space.lg,
      minHeight: 56, // Accessibility: 48px+ touch target
      ...shadows.card,
    },

    submitText: {
      ...typo.body,
      color: theme.BackgroundColor,
      fontWeight: "700",
    },
  });
};

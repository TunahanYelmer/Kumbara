import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, borderRadius, shadows } from "@/constants/designSystem";

export const createAuthScreenStyles = (
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

    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: space.lg,
      paddingTop: space.xxl * 1.5,
      paddingBottom: space.xl,
    },

    // Logo Section
    logoSection: {
      alignItems: "center",
      marginBottom: space.xl,
    },

    logoContainer: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: radius.lg,
      backgroundColor: theme.StatsHighlightColor,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: space.md,
      ...shadows.card,
      shadowColor: theme.StatsHighlightColor,
      shadowOpacity: 0.3,
      shadowRadius: 20,
    },

    appName: {
      ...typo.display,
      color: theme.StatsValueColor,
      letterSpacing: -1,
      marginBottom: space.xs,
    },

    tagline: {
      ...typo.body,
      color: theme.StatsLabelColor,
    },

    // Auth Card
    authCard: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xxl,
      padding: space.lg,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    // Tabs
    tabContainer: {
      flexDirection: "row",
      backgroundColor: theme.BackgroundColor,
      borderRadius: radius.md,
      padding: space.xs / 2,
      marginBottom: space.lg,
    },

    tab: {
      flex: 1,
      paddingVertical: space.sm,
      alignItems: "center",
      borderRadius: radius.sm,
    },

    tabActive: {
      backgroundColor: theme.StatsPeriodButtonActiveColor,
    },

    tabText: {
      ...typo.body,
      fontWeight: "600",
      color: theme.StatsLabelColor,
    },

    tabTextActive: {
      color: theme.StatsValueColor,
    },

    // Form
    form: {
      gap: space.md,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.BackgroundColor,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      paddingHorizontal: space.md,
      height: 56,
    },

    inputIcon: {
      marginRight: space.sm,
    },

    input: {
      flex: 1,
      color: theme.StatsValueColor,
      ...typo.body,
      fontWeight: "500",
    },

    eyeIcon: {
      padding: space.xs / 2,
    },

    // Options
    optionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: space.xs,
    },

    rememberMe: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
      paddingVertical: space.sm,
      minHeight: 48, // Accessibility: minimum touch target
    },

    checkbox: {
      width: 20,
      height: 20,
      borderRadius: radius.xs,
      borderWidth: 2,
      borderColor: theme.StatsLabelColor,
      alignItems: "center",
      justifyContent: "center",
    },

    checkboxActive: {
      backgroundColor: theme.StatsHighlightColor,
      borderColor: theme.StatsHighlightColor,
    },

    rememberText: {
      ...typo.caption,
      color: theme.StatsLabelColor,
    },

    forgotText: {
      ...typo.caption,
      color: theme.StatsHighlightColor,
      fontWeight: "600",
    },

    // Terms
    termsRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: space.sm,
      marginTop: space.xs,
      paddingVertical: space.sm,
      minHeight: 48, // Accessibility: minimum touch target
    },

    termsText: {
      flex: 1,
      ...typo.caption,
      color: theme.StatsLabelColor,
      lineHeight: 20,
    },

    termsLink: {
      color: theme.StatsHighlightColor,
      fontWeight: "600",
    },

    // Submit Button
    submitBtn: {
      backgroundColor: theme.StatsHighlightColor,
      borderRadius: radius.md,
      height: 56,
      alignItems: "center",
      justifyContent: "center",
      marginTop: space.xs,
      ...shadows.card,
      shadowColor: theme.StatsHighlightColor,
      shadowOpacity: 0.3,
    },

    submitBtnDisabled: {
      backgroundColor: `${theme.StatsHighlightColor}30`,
      shadowOpacity: 0,
    },

    submitBtnLoading: {
      opacity: 0.8,
    },

    submitText: {
      ...typo.h4,
      color: theme.BackgroundColor,
      fontWeight: "700",
    },

    // Divider
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: space.lg,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.StatsCardBorderColor,
    },

    dividerText: {
      ...typo.small,
      color: theme.StatsLabelColor,
      marginHorizontal: space.md,
    },

    // Social Login
    socialContainer: {
      flexDirection: "row",
      gap: space.sm,
    },

    socialBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: space.sm,
      backgroundColor: theme.BackgroundColor,
      borderRadius: radius.md,
      height: 56,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
    },

    socialText: {
      ...typo.body,
      color: theme.StatsValueColor,
      fontWeight: "600",
    },

    // Bottom Text
    bottomText: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: space.lg,
    },

    bottomTextPrimary: {
      ...typo.body,
      color: theme.StatsLabelColor,
    },

    bottomTextLink: {
      ...typo.body,
      color: theme.StatsHighlightColor,
      fontWeight: "700",
    },
  });
};

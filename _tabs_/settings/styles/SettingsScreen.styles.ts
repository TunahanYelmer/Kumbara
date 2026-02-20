import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, shadows, borderRadius, iconSizes } from "@/constants/designSystem";

export const createSettingsIconProps = (
  theme: Theme,
  width: number,
  height: number
) => {
  const icons = iconSizes(width);

  return {
    user: {
      width: icons.md,
      height: icons.md,
      stroke: theme.StatsHighlightColor,
    },
    bell: {
      width: icons.md,
      height: icons.md,
      stroke: theme.SettingsItemValueColor,
    },
    lock: {
      width: icons.md,
      height: icons.md,
      stroke: theme.SettingsItemValueColor,
    },
    creditCard: {
      width: icons.md,
      height: icons.md,
      stroke: theme.SettingsItemValueColor,
    },
    moon: {
      width: icons.md,
      height: icons.md,
      stroke: theme.SettingsItemValueColor,
    },
    globe: {
      width: icons.md,
      height: icons.md,
      stroke: theme.SettingsItemValueColor,
    },
    helpCircle: {
      width: icons.md,
      height: icons.md,
      stroke: theme.SettingsItemValueColor,
    },
    fileText: {
      width: icons.md,
      height: icons.md,
      stroke: theme.SettingsItemValueColor,
    },
    logOut: {
      width: icons.md,
      height: icons.md,
      stroke: "#EF4444",
    },
    chevronRight: {
      width: icons.sm,
      height: icons.sm,
      stroke: theme.StatsLabelColor,
    },
  };
};

export const createSettinsSecreenStyles = (theme: Theme, width: number, height: number) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.BackgroundColor,
    },

    scrollContent: {
      paddingBottom: space.xxl,
    },

    // Screen header
    header: {
      paddingHorizontal: space.lg,
      paddingTop: space.lg,
      paddingBottom: space.md,
    },

    screenTitle: {
      ...typo.h1,
      color: theme.StatsValueColor,
      fontWeight: "700",
    },

    // Profile card at top
    profileCard: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.lg,
      marginHorizontal: space.lg,
      marginBottom: space.lg,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
      flexDirection: "row",
      alignItems: "center",
      gap: space.md,
    },

    avatar: {
      width: width * 0.16,
      height: width * 0.16,
      borderRadius: radius.round,
      backgroundColor: theme.StatsHighlightColor,
      justifyContent: "center",
      alignItems: "center",
    },

    profileInfo: {
      flex: 1,
    },

    profileName: {
      ...typo.h3,
      color: theme.StatsValueColor,
      fontWeight: "600",
      marginBottom: space.xs / 2,
    },

    profileEmail: {
      ...typo.caption,
      color: theme.StatsLabelColor,
    },

    // Section container
    section: {
      marginHorizontal: space.lg,
      marginBottom: space.lg,
    },

    sectionTitle: {
      ...typo.caption,
      color: theme.StatsLabelColor,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: space.sm,
      paddingHorizontal: space.xs,
    },

    sectionCard: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
      overflow: "hidden",
    },

    // Setting item
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: space.md,
      paddingHorizontal: space.lg,
      minHeight: 56,
      gap: space.md,
    },

    settingItemWithBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme.StatsCardBorderColor,
    },

    iconContainer: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: radius.md,
      backgroundColor: theme.StatsPeriodButtonBgColor,
      justifyContent: "center",
      alignItems: "center",
    },

    settingContent: {
      flex: 1,
    },

    settingLabel: {
      ...typo.body,
      color: theme.StatsValueColor,
      fontWeight: "500",
    },

    settingValue: {
      ...typo.caption,
      color: theme.StatsLabelColor,
      marginTop: space.xs / 2,
    },

    // Logout button
    logoutButton: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.lg,
      marginHorizontal: space.lg,
      marginBottom: space.lg,
      borderWidth: 1,
      borderColor: theme.WithdrawIconFillColor,
      ...shadows.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: space.sm,
    },

    logoutText: {
      ...typo.body,
      color: theme.WithdrawIconFillColor,
      fontWeight: "600",
    },

    // Navbar container
    navbarContainer: {
      marginTop: "auto",
    },
  });
};

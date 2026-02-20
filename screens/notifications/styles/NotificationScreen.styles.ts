import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, shadows, borderRadius } from "@/constants/designSystem";

export const createNotificationScreenStyles = (
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

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: space.lg,
      paddingTop: space.xxl * 1.5,
      paddingBottom: space.md,
    },

    backBtn: {
      width: 48,
      height: 48,
      borderRadius: radius.sm,
      backgroundColor: theme.StatsCardBgColor,
      alignItems: "center",
      justifyContent: "center",
    },

    headerCenter: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
    },

    headerTitle: {
      ...typo.h2,
      color: theme.StatsValueColor,
    },

    badge: {
      backgroundColor: theme.WithdrawIconFillColor,
      borderRadius: radius.xxl,
      minWidth: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: space.xs / 2,
    },

    badgeText: {
      ...typo.small,
      color: theme.BackgroundColor,
      fontWeight: "700",
    },

    settingsBtn: {
      width: 48,
      height: 48,
      borderRadius: radius.sm,
      backgroundColor: theme.StatsCardBgColor,
      alignItems: "center",
      justifyContent: "center",
    },

    // Filters
    filterContainer: {
      maxHeight: 60,
      marginBottom: space.xs,
    },

    filterContent: {
      paddingHorizontal: space.lg,
      gap: space.xs,
    },

    filterBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs / 2,
      paddingHorizontal: space.md,
      paddingVertical: space.xs,
      borderRadius: radius.xxl,
      backgroundColor: theme.StatsCardBgColor,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
    },

    filterBtnActive: {
      backgroundColor: theme.StatsHighlightColor,
      borderColor: theme.StatsHighlightColor,
    },

    filterText: {
      ...typo.caption,
      color: theme.StatsLabelColor,
      fontWeight: "600",
    },

    filterTextActive: {
      color: theme.BackgroundColor,
    },

    filterBadge: {
      backgroundColor: theme.StatsPeriodButtonBgColor,
      borderRadius: radius.xxl,
      minWidth: 18,
      height: 18,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: space.xs / 2,
    },

    filterBadgeActive: {
      backgroundColor: theme.BackgroundColor,
    },

    filterBadgeText: {
      ...typo.small,
      color: theme.StatsLabelColor,
      fontWeight: "700",
    },

    filterBadgeTextActive: {
      color: theme.StatsHighlightColor,
    },

    // Edit Mode
    editHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: space.lg,
      paddingVertical: space.sm,
      backgroundColor: theme.StatsCardBgColor,
      marginHorizontal: space.lg,
      marginBottom: space.sm,
      borderRadius: radius.sm,
    },

    editText: {
      ...typo.body,
      color: theme.StatsValueColor,
      fontWeight: "600",
    },

    editActions: {
      flexDirection: "row",
      gap: space.lg,
    },

    editCancel: {
      ...typo.body,
      color: theme.StatsLabelColor,
      fontWeight: "600",
    },

    editDelete: {
      ...typo.body,
      color: theme.WithdrawIconFillColor,
      fontWeight: "700",
    },

    // Mark All
    markAllBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
      paddingHorizontal: space.lg,
      paddingVertical: space.sm,
    },

    markAllText: {
      ...typo.caption,
      color: theme.StatsHighlightColor,
      fontWeight: "600",
    },

    // List
    list: {
      flex: 1,
      paddingHorizontal: space.lg,
    },

    notificationCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.md,
      padding: space.md,
      marginBottom: space.sm,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    unreadCard: {
      borderColor: `${theme.StatsHighlightColor}33`,
    },

    selectedCard: {
      backgroundColor: `${theme.StatsHighlightColor}10`,
      borderColor: theme.StatsHighlightColor,
    },

    checkbox: {
      width: 24,
      height: 24,
      borderRadius: radius.xs,
      borderWidth: 2,
      borderColor: theme.StatsLabelColor,
      alignItems: "center",
      justifyContent: "center",
      marginRight: space.sm,
      marginTop: space.xs / 2,
    },

    checkboxActive: {
      backgroundColor: theme.StatsHighlightColor,
      borderColor: theme.StatsHighlightColor,
    },

    iconContainer: {
      width: width * 0.11,
      height: width * 0.11,
      borderRadius: radius.sm,
      alignItems: "center",
      justifyContent: "center",
      marginRight: space.sm,
    },

    content: {
      flex: 1,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: space.xs / 2,
    },

    title: {
      ...typo.body,
      fontWeight: "600",
      color: theme.StatsLabelColor,
      flex: 1,
      marginRight: space.xs,
    },

    unreadTitle: {
      color: theme.StatsValueColor,
      fontWeight: "700",
    },

    time: {
      ...typo.small,
      fontWeight: "500",
    },

    message: {
      ...typo.caption,
      color: theme.StatsLabelColor,
      lineHeight: 20,
      marginBottom: space.sm,
    },

    actionBtn: {
      alignSelf: "flex-start",
    },

    actionText: {
      ...typo.small,
      fontWeight: "600",
    },

    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: radius.round,
      backgroundColor: theme.StatsHighlightColor,
      marginLeft: space.xs,
      marginTop: space.xs / 2,
    },

    // Empty State
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: space.xxl * 1.5,
    },

    emptyTitle: {
      ...typo.h3,
      fontWeight: "700",
      color: theme.StatsValueColor,
      marginBottom: space.xs,
    },

    emptyText: {
      ...typo.caption,
      color: theme.StatsLabelColor,
      textAlign: "center",
    },

    bottomPadding: {
      height: space.lg,
    },

    // Preferences
    preferencesCard: {
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.lg,
      padding: space.lg,
      margin: space.lg,
      marginTop: 0,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    preferencesTitle: {
      ...typo.body,
      fontWeight: "700",
      color: theme.StatsValueColor,
      marginBottom: space.md,
    },

    preferenceItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: space.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.StatsCardBorderColor,
    },

    preferenceLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.sm,
    },

    preferenceTextContainer: {
      justifyContent: "center",
    },

    preferenceName: {
      ...typo.body,
      fontWeight: "600",
      color: theme.StatsValueColor,
      marginBottom: space.xs / 4,
    },

    preferenceDesc: {
      ...typo.small,
      color: theme.StatsLabelColor,
    },
  });
};

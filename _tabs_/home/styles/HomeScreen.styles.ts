import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography } from "@/constants/designSystem";

export const createHomeScreenStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const typo = typography(width);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BackgroundColor,
      paddingBottom: space.xxl,
    },

    // Header Section
    header: {
      paddingHorizontal: space.lg,
      paddingTop: space.lg,
      marginBottom: space.md,
    },

    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.sm,
      marginBottom: space.sm,
    },

    greeting: {
      ...typo.h2,
      color: theme.StatsValueColor,
      fontWeight: "700",
    },

    subtitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs,
    },

    subtitle: {
      ...typo.caption,
      color: theme.StatsLabelColor,
    },

    // Balance Section
    balanceSection: {
      paddingHorizontal: space.lg,
      marginBottom: space.lg,
    },

    // Quick Actions Section
    quickActionsSection: {
      flexDirection: "row",
      gap: space.sm,
      paddingHorizontal: space.lg,
      marginBottom: space.lg,
    },

    // Section
    section: {
      paddingHorizontal: space.lg,
      marginBottom: space.lg,
    },
  });
};

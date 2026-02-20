import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, borderRadius, shadows } from "@/constants/designSystem";

export const createActivityItemStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.md,
      padding: space.sm,
      marginBottom: space.xs,
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    leftSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.sm,
      flex: 1,
    },

    iconContainer: {
      width: width * 0.09,
      height: width * 0.09,
      borderRadius: radius.sm,
      justifyContent: "center",
      alignItems: "center",
    },

    textContainer: {
      flex: 1,
    },

    title: {
      ...typo.body,
      color: theme.StatsValueColor,
      fontWeight: "600",
      marginBottom: space.xs / 2,
    },

    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs / 2,
    },

    time: {
      ...typo.small,
      color: theme.StatsLabelColor,
    },

    amount: {
      ...typo.body,
      fontWeight: "700",
    },
  });
};

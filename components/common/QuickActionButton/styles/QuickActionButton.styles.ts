import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, borderRadius, shadows } from "@/constants/designSystem";

export const createQuickActionButtonStyles = (
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
      backgroundColor: theme.StatsCardBgColor,
      borderRadius: radius.xl,
      padding: space.md,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.StatsCardBorderColor,
      ...shadows.card,
    },

    iconContainer: {
      width: width * 0.10,
      height: width * 0.10,
      borderRadius: radius.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: space.xs,
    },

    label: {
      ...typo.caption,
      color: theme.StatsLabelColor,
      fontWeight: "600",
      textAlign: "center",
    },
  });
};

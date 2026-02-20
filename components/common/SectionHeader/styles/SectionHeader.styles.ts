import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography } from "@/constants/designSystem";

export const createSectionHeaderStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const typo = typography(width);

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: space.md,
    },

    title: {
      ...typo.h3,
      color: theme.StatsValueColor,
      fontWeight: "700",
    },

    seeAllButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs / 2,
    },

    seeAllText: {
      ...typo.caption,
      color: theme.StatsHighlightColor,
      fontWeight: "600",
    },
  });
};

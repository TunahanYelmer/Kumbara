import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, borderRadius } from "@/constants/designSystem";

export const createBadgeTagStyles = (
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
      alignItems: "center",
      gap: space.xs / 2,
      paddingHorizontal: space.sm,
      paddingVertical: space.xs / 2,
      borderRadius: radius.xxl,
      borderWidth: 1,
    },

    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
    },

    text: {
      ...typo.small,
      fontWeight: "700",
    },
  });
};

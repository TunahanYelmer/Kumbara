import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import {
  spacing,
  typography,
  shadows,
  borderRadius,
  layout,
  iconSizes
} from "@/constants/designSystem";

interface Icon {
  stroke: string;
  fill: string;
  height: number;
  width: number;
}

/**
 * User Component Icon Properties -
 *
 * - Accepts theme provider
 * - Screen Width
 * - Screen Height
 * - You can change height , width  fill color , stroke color of the svg icons
 */
export const createUserIconProps = (
  theme: Theme,
  width: number,
  height: number
) => {
  const icons = iconSizes(width);
  return {
    flame: {
      width: icons.sm,
      height: icons.sm,
      fill: theme.UserStreakFireIconFillColor,
      stroke: theme.UserStreakFireIconStrokeColor
    },
    trendArrow: {
      width: icons.xs,
      height: icons.xs,
      fill: theme.UserInsightTrendArrowFillColor,
      stroke: theme.UserInsightTrendArrowStrokeColor
    }
  };
};

/**
 * User Component Styles - Premium User Profile Design
 *
 * Professional user profile header with:
 * - Responsive avatar sizing
 * - Typography system for name and welcome text
 * - Optional avatar shadow for depth
 * - Theme-based colors (no hardcoded values)
 */
export const createUserStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);
  const icons = iconSizes(width);

  return StyleSheet.create({
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical: space.sm, // Design system spacing
      paddingHorizontal: space.md,
      backgroundColor: theme.UserBackgroundColor
    },
    userHeader: {},
    userGreating: {
      flexDirection: "row",
      alignItems: "center",
      gap: space.xs
    },
    userWelcome: {},
    userWelcomeText: {
      ...typo.h1, // Typography system (was fontSize: width * 0.04)
      color: theme.UserWelcomeTextColor // Theme color instead of hardcoded #555
    },
    userStreak: {
      ...layout.rowCenter, // ✅ Replaces flexDirection + alignItems
      justifyContent: "center", // ✅ Still need this for centering
      backgroundColor: theme.UserStreakBackgroundColor, // ✅ Fixed typo
      paddingHorizontal: space.md, // ✅ ~15px (was 12)
      paddingVertical: space.xs, // ✅ ~4px (was 6)
      borderRadius: radius.xxl, // ✅ ~20px (exact match!)
      borderWidth: 1,
      borderColor: theme.UserStreakBorderColor
    },
    userStreakText: {
      ...typo.small,
      color: theme.UserStreakTextColor
    },
    userStreakFlameIcon: {
      height: icons.sm,
      width: icons.sm
    },
    userInsight: {
      ...layout.row,
      gap: space.xs,
      marginTop: space.xs
    },
    userInsightIcon: {},

    userInsightText: {
      ...typo.caption,
      color: theme.UserInsightTextColor
    },
    userIconContainer: {},

    userIcon: {
      width: icons.md,
      height: icons.md
    },

    // Avatar with responsive sizing and optional shadow
    userImage: {
      width: width * 0.15, // 15% of screen width (good size)
      height: width * 0.15, // Keeps circle shape
      marginRight: space.md // Design system spacing
    },

    userInfo: {
      flexDirection: "column",
      gap: space.xs // Modern gap property
    },

    // User name with typography system
    userLabel: {
      ...typo.h3, // Typography system (was fontSize: width * 0.045)
      color: theme.UserNameColor // Theme color (remove hardcoded if needed)
    }

    // Welcome text with typography system
  });
};

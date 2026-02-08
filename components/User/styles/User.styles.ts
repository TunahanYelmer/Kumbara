import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, shadows } from "@/constants/designSystem";

/**
 * User Component Styles - Premium User Profile Design
 *
 * Professional user profile header with:
 * - Responsive avatar sizing
 * - Typography system for name and welcome text
 * - Optional avatar shadow for depth
 * - Theme-based colors (no hardcoded values)
 */
export const createUserStyles = (theme: Theme, width: number, height: number) => {
  const space = spacing(width, height);
  const typo = typography(width);

  return StyleSheet.create({
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical: space.sm,        // Design system spacing
      paddingHorizontal: space.md,
      backgroundColor: theme.UserBackgroundColor,
    },

    userIcon: {
      flexDirection: "row",
      alignItems: "center",
    },

    // Avatar with responsive sizing and optional shadow
    userImage: {
      width: width * 0.15,              // 15% of screen width (good size)
      height: width * 0.15,
      borderRadius: width * 0.075,      // Keeps circle shape
      marginRight: space.md,            // Design system spacing
      ...shadows.subtle,                // Add subtle depth to avatar
    },

    userInfo: {
      flexDirection: "column",
      gap: space.xs,                    // Modern gap property
    },

    // User name with typography system
    userLabel: {
      ...typo.h3,                       // Typography system (was fontSize: width * 0.045)
      color: theme.UserNameColor,       // Theme color (remove hardcoded if needed)
    },

    // Welcome text with typography system
    userWelcome: {
      ...typo.caption,                  // Typography system (was fontSize: width * 0.04)
      color: theme.UserWelcomeColor,    // Theme color instead of hardcoded #555
    },
  });
};

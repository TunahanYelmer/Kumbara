import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, shadows, borderRadius } from "@/constants/designSystem";

/**
 * NotificationScreen Styles - Premium Card List Design
 *
 * Professional notification list with:
 * - Premium card design with shadows.card elevation
 * - Responsive sizing with useWindowDimensions
 * - Typography system for hierarchy (h3 → body → caption)
 * - Design system spacing throughout
 * - Theme-based colors (no hardcoded values)
 */
export const createNotificationScreenStyles = (theme: Theme, width: number, height: number) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BackgroundColor,
      paddingTop: space.md,           // Design system (was hardcoded 16)
    },

    // Premium card design for notification items
    itemContainer: {
      backgroundColor: theme.NotificationCardBgColor,  // Theme token instead of hardcoded #333/#fff
      padding: space.md,              // Design system (was hardcoded 16)
      marginBottom: space.sm,         // Design system (was hardcoded 12)
      marginHorizontal: space.md,     // Better horizontal spacing
      borderRadius: radius.xl,        // Premium rounding (was hardcoded 12)
      ...shadows.card,                // Card elevation from design system
      minHeight: 80,                  // Ensure readable card height
    },

    // Notification title
    title: {
      ...typo.h3,                     // Typography system (was fontSize: 16)
      color: theme.NotificationCardTitleColor,  // Theme token
      marginBottom: space.xs,         // Design system spacing
    },

    // Notification description
    description: {
      ...typo.body,                   // Typography system (was fontSize: 14)
      color: theme.NotificationCardDescriptionColor,  // Theme token
      marginBottom: space.xs,         // Design system (was hardcoded 4)
      lineHeight: typo.body.lineHeight,  // Proper line height for readability
    },

    // Timestamp
    time: {
      ...typo.caption,                // Typography system (was fontSize: 12)
      color: theme.NotificationCardTimeColor,  // Theme token
      opacity: 0.7,                   // Subtle emphasis
    },
  });
};

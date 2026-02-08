import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, shadows } from "@/constants/designSystem";

/**
 * Notifications Button Styles - Premium Icon Button Design
 *
 * Professional notification button with:
 * - Responsive sizing (design system)
 * - Proper touch targets (44px minimum)
 * - Optional subtle shadow for depth
 * - Theme-aware icon switching
 */
export const createNotificationStyles = (theme: Theme, width: number, height: number) => {
  const space = spacing(width, height);

  return StyleSheet.create({
    view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    // Touchable button with proper accessibility
    button: {
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.08,             // Design system sizing
      height: width * 0.08,
      minHeight: 44,                   // Accessibility (Apple HIG)
      minWidth: 44,
      borderRadius: width * 0.04,      // Circular button
      ...shadows.subtle,               // Optional subtle background depth
    },

    // Icon sizing
    icon: {
      width: width * 0.06,             // Slightly smaller than button for padding
      height: width * 0.06,
      tintColor: theme.DarkMode ? undefined : undefined,  // Let image handle theming
    },
  });
};

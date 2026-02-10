import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, shadows, iconSizes } from "@/constants/designSystem";

/**
 * Notifications Button Styles - Premium Icon Button Design
 *
 * Professional notification button with:
 * - Responsive sizing (design system)
 * - Proper touch targets (44px minimum)
 * - Optional subtle shadow for depth
 * - Theme-aware icon switching
 */
export const createNotificationStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const icons = iconSizes(width);

  return StyleSheet.create({
    view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },

    // Touchable button with proper accessibility
    button: {
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.08, // Design system sizing
      height: width * 0.08,
      minHeight: 44, // Accessibility (Apple HIG)
      minWidth: 44,
      borderRadius: width * 0.04 // Circular button
    },

    // Icon sizing
    icon: {
      width: icons.lg,
      height: icons.lg
    }
  });
};

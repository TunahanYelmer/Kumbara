import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, shadows, borderRadius } from "@/constants/designSystem";

/**
 * SettingsScreen Styles - Premium Settings Design
 *
 * Professional fintech settings with:
 * - Card-based setting groups with shadows.card elevation
 * - Responsive typography and spacing
 * - Better visual hierarchy
 * - Enhanced touch targets (48px minimum)
 * - Design system integration throughout
 */
export const createSettinsSecreenStyles = (theme: Theme, width: number, height: number) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.SettingsScreenBackgroundColor,
    },

    container: {
      flex: 1,
    },

    // User profile section
    userContainer: {
      paddingVertical: space.sm,      // Design system spacing
      paddingHorizontal: space.md,
    },

    // Page title - premium typography
    settingsTitle: {
      ...typo.h1,                     // Typography system (was fontSize: 24)
      color: theme.SettingsGroupTitleColor,
      paddingHorizontal: space.md,    // Design system (was hardcoded 16)
      paddingVertical: space.md,
      textAlign: "center",
    },

    // Legacy settings text (if still used)
    settingsText: {
      ...typo.h2,                     // Typography system (was fontSize: 20)
      textAlign: "center",
      marginTop: space.xxl,           // Design system (was hardcoded 50)
    },

    // Setting groups - card-based design with elevation
    settingGroup: {
      backgroundColor: theme.SettingsGroupBackgroundColor,
      marginVertical: space.sm,       // Design system (was hardcoded 8)
      marginHorizontal: space.md,     // Add horizontal margins
      paddingHorizontal: space.md,    // Design system (was hardcoded 16)
      paddingVertical: space.sm,      // Add vertical padding
      borderRadius: radius.xl,        // Premium rounding (was hardcoded 8)
      ...shadows.card,                // Card elevation for depth
    },

    // Group title - uppercase with tracking
    groupTitle: {
      ...typo.captionBold,            // Typography system (was fontSize: 16)
      color: theme.SettingsGroupTitleColor,
      paddingVertical: space.sm,      // Design system (was hardcoded 12)
      textTransform: "uppercase",     // Make group titles stand out
      letterSpacing: 1.2,             // More tracking for labels
    },

    // Setting items with proper touch targets
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: space.md,      // Design system (was hardcoded 12)
      paddingHorizontal: space.sm,    // Design system (was marginLeft: 8)
      borderTopWidth: 1,
      borderTopColor: theme.SettingsItemBorderColor,
      minHeight: 48,                  // Accessibility
    },

    settingValue: {
      ...typo.body,                   // Typography system
      color: theme.SettingsItemValueColor,
    },

    // Currency display with hierarchy
    currencySymbol: {
      ...typo.h2,                     // Larger for prominence (was fontWeight: bold)
      color: theme.SettingsCurrencyCodeColor,
    },

    currencyCode: {
      ...typo.body,                   // Typography system
      color: theme.SettingsCurrencyCodeColor,
    },

    // Navbar container
    navbarContainer: {
      marginTop: "auto",              // Push to bottom
    },
  });
};

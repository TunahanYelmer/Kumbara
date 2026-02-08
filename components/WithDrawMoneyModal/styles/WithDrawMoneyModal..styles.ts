import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, shadows, borderRadius, accentColors } from "@/constants/designSystem";

/**
 * WithdrawMoneyModal Styles - Premium Two-Step Modal Design
 *
 * Professional fintech modal with:
 * - Dramatic modal elevation (shadows.modal)
 * - Two-step withdrawal flow (amount → reason)
 * - Card-based reason selection with individual shadows
 * - Responsive sizing with useWindowDimensions
 * - Design system integration throughout
 * - Accessibility-compliant touch targets (48px minimum)
 */
export const createWithdrawMoneyModalStyles = (theme: Theme, width: number, height: number) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);

  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.ModalOverlayBgColor,
    },

    modal: {
      backgroundColor: theme.ModalBGColor,
      width: width * 0.90,            // More spacious (was 80%)
      padding: space.lg,              // Design system (was hardcoded 20)
      borderRadius: radius.xxl,       // Premium rounding (was hardcoded 10)
      ...shadows.modal,               // Dramatic modal elevation
      maxHeight: height * 0.7,        // Prevent overflow on small screens
    },

    // Step titles (Amount / Reason)
    modalTitle: {
      ...typo.h2,                     // Typography system (was fontSize: 18)
      color: theme.ModalTitleColor,
      marginBottom: space.md,         // Design system (was hardcoded 10)
      textAlign: "center",
    },

    // Amount input (Step 1)
    input: {
      ...typo.body,                   // Typography system
      color: theme.ModalTitleColor,
      borderWidth: 1,
      borderColor: theme.WithdrawModalInputBorderColor,
      borderRadius: radius.lg,        // Design system (was hardcoded 8)
      padding: space.md,              // Design system (was hardcoded 8)
      width: "100%",
      textAlign: "center",
      minHeight: 48,                  // Accessibility
      ...shadows.subtle,              // Subtle input depth
      marginBottom: space.md,
    },

    // Action buttons container
    buttonsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: space.md,            // Design system (was hardcoded 15)
      gap: space.sm,                  // Modern gap property
    },

    // Confirm/Cancel/Next buttons
    modalButton: {
      flex: 1,
      paddingVertical: space.md,      // Design system (was hardcoded 10)
      paddingHorizontal: space.lg,
      backgroundColor: theme.ModalButtonBGColor,
      borderRadius: radius.lg,        // Design system (was hardcoded 8)
      alignItems: "center",
      justifyContent: "center",
      minHeight: 48,                  // Accessibility
      ...shadows.button,              // Button elevation
    },

    buttonText: {
      ...typo.bodyBold,               // Typography system
      color: theme.ModalButtonTextColor,
      textAlign: "center",
    },

    // Step 2: Reason selection - Card-based design
    optionButton: {
      padding: space.md,              // Design system (was hardcoded 10)
      marginVertical: space.xs,       // Design system (was hardcoded 5)
      borderWidth: 1,
      borderColor: theme.WithdrawModalInputBorderColor,  // Remove hardcoded #ccc
      borderRadius: radius.lg,        // Design system (was hardcoded 6)
      backgroundColor: theme.ModalBGColor,
      minHeight: 48,                  // Accessibility
      justifyContent: "center",
      ...shadows.subtle,              // Add subtle elevation
    },

    // Selected reason option
    selectedOption: {
      backgroundColor: theme.WitdrawModalSelectedBg,
      borderColor: accentColors.primary,  // Accent color for modern look
      borderWidth: 2,                     // Thicker border when selected
      ...shadows.card,                    // More prominent when selected
    },

    optionText: {
      ...typo.body,                   // Typography system
      color: theme.WitdrawModalOptionText,
      textAlign: "center",
    },

    selectedOptionText: {
      ...typo.bodyBold,               // Bolder when selected
      color: theme.WitdrawModalOptionText,  // Use theme color instead of hardcoded #fff
    },
  });
};

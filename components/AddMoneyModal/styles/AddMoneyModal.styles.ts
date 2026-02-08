import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import {
  spacing,
  typography,
  shadows,
  borderRadius
} from "@/constants/designSystem";

/**
 * AddMoneyModal Styles - Premium Modal Design
 *
 * Professional fintech modal with:
 * - Dramatic modal elevation (shadows.modal)
 * - Responsive sizing with useWindowDimensions
 * - Design system integration throughout
 * - Accessibility-compliant touch targets (48px minimum)
 */
export const createAddMoneyModalStyles = (
  theme: Theme,
  width: number,
  height: number
) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);

  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.ModalOverlayBgColor,
      justifyContent: "center",
      alignItems: "center"
    },
    modal: {
      width: width * 0.9, // More spacious (was 80%)
      backgroundColor: theme.ModalBGColor,
      padding: space.lg, // Design system (was hardcoded 20)
      borderRadius: radius.xxl, // Premium rounding (was hardcoded 12)
      alignItems: "center",
      ...shadows.modal // Dramatic modal elevation
    },
    modalTitle: {
      color: theme.ModalTitleColor,
      ...typo.h2, // Typography system (was fontSize: 18)
      marginBottom: space.md // Design system (was hardcoded 15)
    },
    input: {
      color: theme.ModalTitleColor,
      width: "100%",
      borderWidth: 1,
      borderColor: theme.WithdrawModalInputBorderColor,
      borderRadius: radius.lg, // Design system (was hardcoded 8)
      padding: space.md, // Design system (was hardcoded 10)
      marginBottom: space.lg, // Design system (was hardcoded 20)
      textAlign: "center",
      ...typo.body, // Typography system
      minHeight: 48, // Accessibility
      ...shadows.subtle // Subtle input depth
    },
    buttonsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      gap: space.sm // Modern gap property
    },
    modalButton: {
      flex: 1,
      backgroundColor: theme.ModalButtonBGColor,
      paddingVertical: space.md, // Design system (was hardcoded 10)
      paddingHorizontal: space.lg,
      borderRadius: radius.lg, // Design system (was hardcoded 8)
      alignItems: "center",
      minHeight: 48, // Accessibility
      ...shadows.button // Button elevation
    },
    buttonText: {
      color: theme.ButtonTextColor,
      ...typo.bodyBold // Typography system (was fontWeight: bold)
    }
  });
};

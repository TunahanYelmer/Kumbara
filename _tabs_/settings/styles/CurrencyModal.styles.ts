import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";
import { spacing, typography, shadows, borderRadius, accentColors } from "@/constants/designSystem";

/**
 * CurrencyModal Styles - Premium Currency Picker Design
 *
 * Professional currency picker with:
 * - Responsive ITEM_HEIGHT based on screen size
 * - Modal elevation with shadows.modal
 * - Accent colors for selected state
 * - Typography system throughout
 * - No hardcoded colors (all from theme or design system)
 */
export const createCurrencyModalStyles = (theme: Theme, width: number, height: number, ITEM_HEIGHT: number) => {
  const space = spacing(width, height);
  const typo = typography(width);
  const radius = borderRadius(width);

  return StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: theme.ModalOverlayBgColor,
        justifyContent: "center",
        alignItems: "center",
      },

      // Premium modal container
      modalContent: {
        width: width * 0.85,            // Responsive (was "85%")
        backgroundColor: theme.ModalBGColor,
        borderRadius: radius.xxl,       // Premium rounding (was hardcoded 16)
        paddingVertical: space.lg,      // Design system (was hardcoded 20)
        paddingHorizontal: space.md,    // Design system (was hardcoded 10)
        alignItems: "center",
        ...shadows.modal,               // Modal elevation (replaces manual shadow)
      },

      // Title (if used)
      title: {
        ...typo.h2,                     // Typography system (was fontSize: 18)
        color: theme.ModalTitleColor,   // Theme color instead of hardcoded #333
        marginBottom: space.sm,         // Design system (was hardcoded 12)
      },

      // Picker container
      container: {
        height: ITEM_HEIGHT * 5,        // Responsive height
        width: "100%",
        overflow: "hidden",
        borderRadius: radius.lg,        // Design system (was hardcoded 12)
        backgroundColor: theme.ModalBGColor,
      },

      // Individual currency item
      item: {
        height: ITEM_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
      },

      // Selected item with accent color
      selectedItem: {
        backgroundColor: theme.WitdrawModalSelectedBg,
        width: "100%",
        height: ITEM_HEIGHT + 2,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: -1,
        ...shadows.card,                // More prominent when selected
      },

      // Currency text
      text: {
        ...typo.body,                   // Typography system (was fontSize: 17)
        color: theme.ModalTitleColor,   // Theme color instead of hardcoded #555
      },

      // Selected currency text
      selectedText: {
        ...typo.bodyBold,               // Typography system (was fontWeight: 700)
        color: theme.WitdrawModalOptionText,
      },

      // Center highlight overlay
      centerOverlay: {
        position: "absolute",
        top: (ITEM_HEIGHT * 5) / 2 - ITEM_HEIGHT / 2,
        width: "100%",
        height: ITEM_HEIGHT,
        borderColor: accentColors.primary,  // Accent color instead of hardcoded #1a237e
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "transparent",     // Transparent overlay
        pointerEvents: "none",
      },

      // Close button (if used in future)
      closeButton: {
        marginTop: space.md,            // Design system (was hardcoded 18)
        backgroundColor: accentColors.primary,  // Accent color instead of #1a237e
        paddingVertical: space.md,      // Design system (was hardcoded 10)
        paddingHorizontal: space.xl,    // Design system (was hardcoded 35)
        borderRadius: radius.lg,        // Design system (was hardcoded 10)
        ...shadows.button,              // Button elevation
      },

      closeText: {
        ...typo.bodyBold,               // Typography system
        color: theme.ModalButtonTextColor,  // Theme color instead of hardcoded #fff
        letterSpacing: 0.3,
      },
    });
};

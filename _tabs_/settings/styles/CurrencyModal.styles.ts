import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is


export const createCurrencyModalStyles = (theme: Theme ,ITEM_HEIGHT : number) =>



     StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.ModalOverlayBgColor,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: "85%",
    backgroundColor: theme.ModalBGColor,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12
  },
  container: {
    height: ITEM_HEIGHT * 5,
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: theme.ModalBGColor,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedItem: {
    backgroundColor: theme.WitdrawModalSelectedBg, // blended blue-gray
    width: "100%",
    height: ITEM_HEIGHT + 2, // extend 1px top & bottom
    justifyContent: "center",
    alignItems: "center",
    marginVertical: -1 // perfectly aligns under center overlay borders
  },
  text: {
    fontSize: 17,
    color: "#555"
  },
  selectedText: {
    color: theme.WitdrawModalOptionText,
    fontWeight: "700"
  },
  centerOverlay: {
    position: "absolute",
    top: (ITEM_HEIGHT * 5) / 2 - ITEM_HEIGHT / 2,
    width: "100%",
    height: ITEM_HEIGHT,
    borderColor: "#1a237e",
    backgroundColor: "#C8D2FF)", // softer translucent blue
    pointerEvents: "none"
  },
  closeButton: {
    marginTop: 18,
    backgroundColor: "#1a237e",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10
  },
  closeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3
  }
});

 
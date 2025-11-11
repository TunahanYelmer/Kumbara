import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createAddMoneyModalStyles = (theme: Theme) =>

      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          backgroundColor: theme.ModalOverlayBgColor,
          justifyContent: "center",
          alignItems: "center"
        },
        modal: {
          width: "80%",
          backgroundColor: theme.ModalBGColor,
          padding: 20,
          borderRadius: 12,
          alignItems: "center"
        },
        modalTitle: {
          color:theme.ModalTitleColor,
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 15
        },
        input: {
          color:theme.ModalTitleColor,
          width: "100%",
          borderWidth: 1,
          borderColor: theme.WithdrawModalInputBorderColor,
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
          textAlign: "center"
        },
        buttonsRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%"
        },
        modalButton: {
          flex: 1,
          backgroundColor: theme.ModalButtonBGColor,
          padding: 10,
          borderRadius: 8,
          alignItems: "center",
          marginHorizontal: 5
        },
        buttonText: {
          color: theme.ButtonTextColor,
          fontWeight: "bold"
        }
      });


 
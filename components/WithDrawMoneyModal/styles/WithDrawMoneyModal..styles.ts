import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createWidthrawMoneyModalStyles = (theme: Theme) =>

       StyleSheet.create({
         modalOverlay: {
           flex: 1,
           justifyContent: "center",
           alignItems: "center",
           backgroundColor: theme.ModalOverlayBgColor
         },
         modal: {
           backgroundColor: theme.ModalBGColor,
           width: "80%",
           padding: 20,
           borderRadius: 10
         },
         modalTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
         input: {
           borderWidth: 1,
           borderColor: theme.ButtonBorderColor,
           padding: 8,
           width: "100%"
         },
         buttonsRow: {
           flexDirection: "row",
           justifyContent: "space-between",
           marginTop: 15
         },
         modalButton: {
           flex: 1,
           marginHorizontal: 5,
           padding: 10,
           backgroundColor: theme.ButtonColor,
           borderRadius: 8
         },
         buttonText: { color: "#fff", textAlign: "center" },
         optionButton: {
           padding: 10,
           marginVertical: 5,
           borderWidth: 1,
           borderColor: "#ccc",
           borderRadius: 6
         },
         selectedOption: { backgroundColor: theme.WitdrawModalSelectedBg },
         optionText: { color: theme.WitdrawModalOptionText },
         selectedOptionText: { color: "#fff" }
       });

 
import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createBalanceCardStyles = (theme: Theme , width : number) =>

      StyleSheet.create({
        card: {
             width: width * 0.9,
             borderRadius: width * 0.03,
             padding: width * 0.07,
             margin: width * 0.03,
             shadowColor: "#000",
             shadowOffset: { width: 0, height: 2 },
             shadowOpacity: 0.1,
             elevation: 3
           },
           title: {
             color: theme.BalanceCardTitleColor,
             fontSize: width * 0.04,
             fontWeight: "600",
             marginBottom: width * 0.01
           },
           amountContainer: {
             flexDirection: "row",
             alignItems: "flex-end"
           },
           amount: {
             color: theme.BalanceCardAmountColor,
             fontSize: width * 0.06,
             fontWeight: "bold"
           }
      });


 
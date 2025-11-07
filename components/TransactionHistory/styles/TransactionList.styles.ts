import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createTransactionListStyles = (theme: Theme , width :number , height : number , isIncome: boolean) =>

       StyleSheet.create({
         items: {
           flexDirection: "row",
           alignItems: "center",
           marginVertical: height * 0.01
         },
         iconBg: {
           padding: width * 0.05,
           width: width * 0.15,
           height: width * 0.15,
           borderRadius: width * 0.07,
           justifyContent: "center",
           alignItems: "center",
           marginRight: width * 0.03
         },
         title: {
           fontWeight: "600",
           fontSize: width * 0.04,
           color: theme.TransactionTitleColor
         },
         amount: {
           padding: width * 0.025,
           borderRadius: width * 0.02,
           minWidth: width * 0.15,
           alignItems: "center"
         },
         amountText: {
           fontWeight: "600",
           fontSize: width * 0.04,
           color: isIncome
             ? theme.TransactionTextIncomeColor
             : theme.TransactionTextExpenseColor
         }
       });


 
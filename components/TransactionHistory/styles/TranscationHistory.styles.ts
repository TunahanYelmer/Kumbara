import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createTransactionHistoryStyles = (theme: Theme , width : number , height: number) =>

      StyleSheet.create({
         container: {
           backgroundColor: theme.BackgroundColor,
           padding: width * 0.04,
           margin: width * 0.025,
           borderRadius: width * 0.025
         },
         tabs: {
           flexDirection: "row",
           marginVertical: height * 0.015
         },
         tabButton: {
           backgroundColor: theme.TabButtonBgColor,
           paddingVertical: height * 0.008,
           paddingHorizontal: width * 0.04,
           borderRadius: width * 0.05,
           marginRight: width * 0.02
         },
         tabButtonText: {
           fontSize: width * 0.04,
           color: theme.TabButtonInactiveColour,
           textAlign: "center"
         },
         activeTabText: {
           color: theme.TabActiveColor,
           fontWeight: "700"
         },
         loadingContainer: {
           alignItems: "center",
           justifyContent: "center",
           paddingVertical: height * 0.05
         },
         loadingText: {
           marginTop: height * 0.01,
           fontSize: width * 0.035,
           color: theme.TransactionHistoryLoadingColor
         },
         emptyContainer: {
           alignItems: "center",
           justifyContent: "center",
           paddingVertical: height * 0.05
         },
         emptyText: {
           fontSize: width * 0.04,
           color: theme.TransactionHistoryEmptyTextColor,
           textAlign: "center"
         }
       });


 
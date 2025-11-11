import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createTransactionsStyles = (theme: Theme , width : number , height : number) =>

    StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      margin: width * 0.03
    },
    add: {
      flexDirection: "row",
      backgroundColor: theme.AddButtonBgColor,
      padding: width * 0.02,
      marginLeft : width * 0.03,
      borderRadius: width * 0.07,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 3
    },
    substract: {
      flexDirection: "row",
      backgroundColor: theme.SubstractButtonBgColor,
      padding: width * 0.02,
      marginRight : width * 0.03,
      borderRadius: width * 0.07,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      elevation: 3
    },
    icon: {
      width: width * 0.08,
      height: width * 0.08,
      marginRight: width * 0.02
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.03,
      borderRadius: width * 0.02
    },
    AddbuttonText: {
      color: theme.AddButtonTextColor,
      fontWeight: "500",
      textAlign: "center",
      fontSize: width * 0.04
    },
    SubstructButtonText: {
      color: theme.SubstractButtonTextColor,
      fontWeight: "500",
      textAlign: "center",
      fontSize: width * 0.04}
  });

 
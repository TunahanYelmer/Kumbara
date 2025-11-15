import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is


export const createNotificationScreenStyles = (theme: Theme  ) =>



    StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BackgroundColor,
      padding: 16
    },
    itemContainer: {
      backgroundColor: theme.DarkMode ? "#333" : "#fff",
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.TextColor
    },
    description: {
      fontSize: 14,
      marginTop: 4,
      color: theme.TextColor
    },
    time: {
      fontSize: 12,
      marginTop: 6,
      color: theme.TextColor,
      opacity: 0.6
    }
  });
;

 
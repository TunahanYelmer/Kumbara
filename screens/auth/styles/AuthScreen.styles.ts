import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer";

export const createAuthScreenStyles = (theme: Theme, width: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BackgroundColor,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: width * 0.08
    },

    headerSection: {
      alignItems: "center",
      marginBottom: width * 0.15
    },

    appName: {
      fontSize: width * 0.12,
      fontWeight: "bold",
      color: theme.TabIconColour,
      marginBottom: width * 0.03
    },

    welcomeTitle: {
      fontSize: width * 0.065,
      fontWeight: "600",
      color: theme.TextColor,
      marginBottom: width * 0.02
    },

    welcomeSubtitle: {
      fontSize: width * 0.04,
      color: theme.TextColor,
      opacity: 0.7,
      textAlign: "center"
    },

    buttonsContainer: {
      width: "100%",
      gap: width * 0.04
    },

    googleButton: {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#DADCE0",
      paddingVertical: width * 0.04,
      paddingHorizontal: width * 0.06,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },

    appleButton: {
      backgroundColor: "#000000",
      paddingVertical: width * 0.04,
      paddingHorizontal: width * 0.06,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3
    },

    googleButtonText: {
      fontSize: width * 0.045,
      fontWeight: "600",
      color: "#3C4043",
      marginLeft: width * 0.03
    },

    appleButtonText: {
      fontSize: width * 0.045,
      fontWeight: "600",
      color: "#FFFFFF",
      marginLeft: width * 0.03
    },

    guestButton: {
      marginTop: width * 0.08,
      paddingVertical: width * 0.03
    },

    guestButtonText: {
      fontSize: width * 0.04,
      color: theme.TabIconColour,
      textDecorationLine: "underline"
    },

    iconStyle: {
      width: width * 0.06,
      height: width * 0.06
    }
  });

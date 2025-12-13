import { StyleSheet } from "react-native";
import { Theme } from "@context/theme/themeReducer"; // or wherever your Theme type is

export const createHomeScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.HomeScreenBgColor
    },
    container: {},
    settingsText: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 50
    },
    settingsTitle: {
      fontSize: 24,
      fontWeight: "bold",
      padding: 16,
      textAlign: "center"
    },
    settingGroup: {
      backgroundColor: theme.HomeScreenGroupBackgroundColor,
      marginVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8
    },
    groupTitle: {
      fontSize: 16,
      fontWeight: "600",
      paddingVertical: 12,
      color: theme.HomeScreenGroupTitleColor
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: theme.HomeScreenItemBorderColor
    },
    settingValue: {
      color: "#666"
    },
    userContainer: {},
    transactionsContainer: {},
    navbarContainer: {}
  });

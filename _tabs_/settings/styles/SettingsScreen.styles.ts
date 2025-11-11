import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createSettinsSecreenStyles = (theme: Theme ) =>

       StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.SettingsScreenBackgroundColor
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
    backgroundColor: theme.SettingsGroupBackgroundColor,
    marginVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 12,
    color: theme.SettingsGroupTitleColor
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: theme.SettingsItemBorderColor
  },
  settingValue: {
    color: theme.SettingsItemValueColor,
  },
  currencySymbol: {
    fontWeight: "bold"
  },
  currencyCode: {
    color: theme.SettingsCurrencyCodeColor
  }
});


 
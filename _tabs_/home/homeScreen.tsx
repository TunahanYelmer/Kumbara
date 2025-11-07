import React from 'react';
import {StyleSheet, StatusBar as RNStatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import User from '@/components/User/User';
import BalanceCard from '@/components/BalanceCard/BalanceCard';
import Transactions from '@/components/Transactions/Transactions';
import TransactionHistory from '@/components/TransactionHistory/TransactionHistory';
import {useTheme} from '@/context/theme/ThemeProvider';






export default function HomeScreen() {
  const [ theme ] = useTheme();
  const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.HomeScreenBgColor
  },
  container: {
  },
  settingsText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50
  }
  ,
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
  }
});


  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <RNStatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <User />
        <BalanceCard />
        <Transactions />
        <TransactionHistory />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  container: {
  },
  settingsText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50
  }
  ,
 settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center"
  },
  settingGroup: {
    backgroundColor: "#fff",
    marginVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 12,
    color: "#243da3"
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0"
  },
  settingValue: {
    color: "#666"
  }
});

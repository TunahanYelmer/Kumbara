import React from "react";
import { StyleSheet, StatusBar as RNStatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import User from "@/components/User/User";
import Navbar from "@/navigation/Navbar/Navbar";
import BalanceCard from "@/components/BalanceCard/BalanceCard";
import Transactions from "@/components/Transactions/Transactions";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";
import Notifications from "@/components/notifications/Notifications";
import { createHomeScreenStyles } from "./styles/HomeScreen.styles";
import { useTheme } from "@/context/theme/ThemeProvider";

export default function HomeScreen() {
  const [theme] = useTheme();
  const styles = createHomeScreenStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <User />
      </View>

      <View style={{ alignItems: "center" }}>
        <BalanceCard />
      </View>
      <View style={styles.transactionsContainer}>
        <Transactions />
        <TransactionHistory />
      </View>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </View>
  );
}

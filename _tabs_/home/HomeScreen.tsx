import React from "react";
import { View, useWindowDimensions } from "react-native";
import User from "@/components/User/User";
import BalanceCard from "@/components/BalanceCard/BalanceCard";
import Transactions from "@/components/Transactions/Transactions";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";
import GoalsList from "@components/GoalsList/GoalsList";
import { createHomeScreenStyles } from "./styles/HomeScreen.styles";
import { useTheme } from "@/context/theme/ThemeProvider";

export default function HomeScreen() {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createHomeScreenStyles(theme, width, height);

  return (
    <View style={styles.container}>
      {/* Compact Header */}
      <View style={styles.header}>
        <User />
      </View>

      {/* Hero Balance Card - Larger and more prominent */}
      <View style={styles.heroSection}>
        <BalanceCard />
      </View>

      {/* Quick Actions - Overlapping with balance card */}
      <View style={styles.quickActions}>
        <Transactions />
      </View>

      {/* Transaction History - Has its own FlatList scrolling */}
      <View style={styles.historyWrapper}>
        <GoalsList />
      </View>
    </View>
  );
}

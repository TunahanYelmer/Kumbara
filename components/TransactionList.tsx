import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

type Props = {
  paymentType: "food" | "market" | "transport" | "bill" | "income";
  amount: number;
};

const iconBgColors: Record<Props["paymentType"], string> = {
  food: "#FFF3E0",
  market: "#F3E0FF",
  transport: "#E0F7FA",
  bill: "#E0F2F1",
  income: "#E8F5E9"
};

const iconStyles: Record<Props["paymentType"], any> = {
  food: { width: 30, height: 30 },
  market: { width: 30, height: 30 },
  transport: { width: 30, height: 30 },
  bill: { width: 30, height: 30 },
  income: { width: 30, height: 30 }
};

const iconSources: Record<Props["paymentType"], any> = {
  food: require("../assets/food.png"),
  market: require("../assets/market.png"),
  transport: require("../assets/transport.png"),
  bill: require("../assets/bill.png"),
  income: require("../assets/income.png")
};

const TransactionList: React.FC<Props> = ({ paymentType, amount }) => {
  const iconSource = iconSources[paymentType];
  const iconStyle = iconStyles[paymentType];
  const bgColor = iconBgColors[paymentType];

  if (!iconSource) {
    return (
      <View>
        <Text>Unknown Transaction</Text>
      </View>
    );
  }

  // Show + for income, - for others, and add ₺ symbol
  const isIncome = paymentType === "income";
  const sign = isIncome ? "+" : "-";
  const formattedAmount = `${sign}${Math.abs(amount)} ₺`;

  return (
    <View style={styles.items}>
      <View style={[styles.iconBg, { backgroundColor: bgColor }]}>
        <Image source={iconSource} style={iconStyle} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "#213361" }}>
          {paymentType.charAt(0).toUpperCase() + paymentType.slice(1)}
        </Text>
      </View>
      <View style={styles.amount}>
        <Text style={styles.amountText}>{formattedAmount}</Text>
      </View>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  items: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconBg: {
    padding: 24,
    width: 18,
    height: 18,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  amount: {
    padding: 10,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center"
  },
  amountText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#213361"
  }
});
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { useState } from "react";

import TransactionList from "./TransactionList";

const data = [
  { id: "1", paymentType: "food", amount: 100 },
  { id: "2", paymentType: "market", amount: 250 },
  { id: "3", paymentType: "bill", amount: 75 },
  { id: "4", paymentType: "transport", amount: 50 },
  { id: "5", paymentType: "food", amount: 100 },
  { id: "6", paymentType: "market", amount: 250 },
  { id: "7", paymentType: "bill", amount: 75 },
  { id: "8", paymentType: "transport", amount: 50 },
  { id: "9", paymentType: "food", amount: 100 },
  { id: "10", paymentType: "market", amount: 250 },
  { id: "11", paymentType: "bill", amount: 75 },
  { id: "12", paymentType: "transport", amount: 50 }
];

const TransactionsHistory = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "income" | "expense">(
    "all"
  );

  const filteredArray = data.filter((item) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "income") return item.paymentType === "income";
    if (selectedTab === "expense") return item.paymentType !== "income"; // ✅ safer
    return false;
  });

  const handleSelectedTab = (tab: "all" | "income" | "expense") => {
    console.log("Selected Tab:", tab);
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => handleSelectedTab("all")}
          style={styles.all}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "all" && { color: "#243da3" }
            ]}
          >
            Tümü
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelectedTab("income")}
          style={styles.income}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "income" && { color: "#243da3" }
            ]}
          >
            Gelir
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelectedTab("expense")}
          style={styles.expense}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "expense" && { color: "#243da3" }
            ]}
          >
            Gider
          </Text>
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <FlatList
        data={filteredArray.slice(0, 4)} // ✅ Limit to 5 items
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionList
            paymentType={item.paymentType as any}
            amount={item.amount}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: "#e0e0e0", marginVertical: 4 }}
          />
        )}
      />
    </View>
  );
};

export default TransactionsHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10
  },
  all: {
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 20
  },
  income: {
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 20
  },
  expense: {
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 20
  },
  buttonText: {
    fontSize: 16,
    color: "#9399b1",
    fontWeight: "500",
    textAlign: "center"
  }
});

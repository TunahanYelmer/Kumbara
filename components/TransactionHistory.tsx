import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions
} from "react-native";
import { useState } from "react";

import TransactionList from "./TransactionList";

const { width, height } = Dimensions.get("window");

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
    if (selectedTab === "expense") return item.paymentType !== "income";
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
          style={styles.tabButton}
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
          style={styles.tabButton}
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
          style={styles.tabButton}
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
        data={filteredArray.slice(0, 4)} // ✅ Limit to 4 items
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionList
            paymentType={item.paymentType as any}
            amount={item.amount}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#e0e0e0",
              marginVertical: height * 0.005
            }}
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
    padding: width * 0.04,
    margin: width * 0.025,
    borderRadius: width * 0.025
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: height * 0.015
  },
  tabButton: {
    backgroundColor: "#ffffff",
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.05,
    marginRight: width * 0.02
  },
  buttonText: {
    fontSize: width * 0.04, // ~16px
    color: "#9399b1",
    fontWeight: "500",
    textAlign: "center"
  }
});

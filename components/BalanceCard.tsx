import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const BalanceCard = () => {
  return (
    <LinearGradient
      colors={[ "#090979", "#00d4ff"]}
      start={{ x: 0.5, y: 0.1 }}
      end={{ x: 1, y: 0.4 }}
      style={styles.card}
    >
      <Text style={styles.title}>Birikimlerim</Text>
      <Text style={styles.amount}>$1,250.00</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 35,
    margin: 15,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    // Shadow for Android
    elevation: 3,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  amount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BalanceCard;

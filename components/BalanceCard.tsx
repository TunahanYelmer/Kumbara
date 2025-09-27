import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getBalance } from "../api/getBalance"; // adjust path if needed
import { useDataLayerValue } from "../context/StateProvider";
import { State, Action } from "../context/reducer";

const { width } = Dimensions.get("window");

const BalanceCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [{ Balance }, dispatch] = useDataLayerValue();

  const handleBalanceUpdate = (newBalance: number) => {
    dispatch({
      type: "SET_BALANCE",
      Balance: newBalance
    } as Action);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await getBalance();
        handleBalanceUpdate(result);

        console.log("ℹ️ Fetched balance:", result);
      } catch (error) {
        console.error("❌ Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [Balance]);

  return (
    <LinearGradient
      colors={["#090979", "#00d4ff"]}
      start={{ x: 0.5, y: 0.1 }}
      end={{ x: 1, y: 0.4 }}
      style={styles.card}
    >
      <Text style={styles.title}>Birikimlerim</Text>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.amount}>${Balance?.toFixed(2) ?? "0.00"}</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    borderRadius: width * 0.03,
    padding: width * 0.07,
    margin: width * 0.03,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  title: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "600",
    marginBottom: width * 0.01
  },
  amount: {
    color: "#fff",
    fontSize: width * 0.06,
    fontWeight: "bold"
  }
});

export default BalanceCard;

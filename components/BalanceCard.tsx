import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getBalance } from "@api/getBalance"; // adjust path if needed
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";

const { width } = Dimensions.get("window");

const BalanceCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [{ Balance, Currency }, dispatch] = useDataLayerValue();
   const [theme] = useTheme();

  useEffect(() => {
    let isMounted = true;

    const fetchBalance = async () => {
      try {
        const result = await getBalance();
        if (isMounted) {
          dispatch({ type: "SET_BALANCE", Balance: result });
        }
      } catch (e) {
        if (isMounted) console.error("❌ Error fetching balance:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBalance();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);
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
      color: theme.BalanceCardTitleColor,
      fontSize: width * 0.04,
      fontWeight: "600",
      marginBottom: width * 0.01
    },
    amountContainer: {
      flexDirection: "row",
      alignItems: "flex-end"
    },
    amount: {
      color: theme.BalanceCardAmountColor,
      fontSize: width * 0.06,
      fontWeight: "bold"
    }
  });
  return (
    <LinearGradient
      colors={theme.BalanceCardColor}
      start={{ x: 0.5, y: 0.1 }}
      end={{ x: 1, y: 0.4 }}
      style={styles.card}
      testID="balance-card"
    >
      <Text style={styles.title} testID="balance-title">
        Birikimlerim
      </Text>
      {loading ? (
        <ActivityIndicator testID="loading-indicator" color={theme.LoadingIndicatorColor} />
      ) : (
        <View style={styles.amountContainer}>
          <Text testID="currency-symbol" style={styles.amount}>
            {Currency ? Currency[0].symbol : "₺"}
          </Text>
          <Text testID="balance-amount" style={styles.amount}>
            {Balance ? Balance.toFixed(2) : "0.00"}
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default BalanceCard;

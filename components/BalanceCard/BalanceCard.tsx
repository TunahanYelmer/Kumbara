import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getBalance } from "@api/getBalance";
import { getToken } from "@/utils/auth";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createBalanceCardStyles } from "./styles/BalanceCard.styles";

/**
 * BalanceCard Component
 * ----------------------
 * Displays the user's current balance inside a styled gradient card.
 * It fetches the balance from the API on mount and updates global state.
 * While loading, it shows an ActivityIndicator instead of the amount.
 *
 * Enhanced with useWindowDimensions for dynamic responsive updates.
 */
const BalanceCard = () => {
  // Local state to control loading spinner
  const [loading, setLoading] = useState(true);

  // Access global balance and currency from context
  const [{ Balance, Currency }, dispatch] = useDataLayerValue();

  // Get active theme and responsive dimensions
  const [theme] = useTheme();
  const { width } = useWindowDimensions();
  const styles = createBalanceCardStyles(theme, width);

  /**
   * Fetch the current balance from the backend once when component mounts.
   * Safely handles component unmounting to avoid memory leaks.
   */
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount

    const fetchBalance = async () => {
      try {
        // Get JWT token from storage
        const token = await getToken();
        if (!token) {
          console.error("❌ No token found");
          return;
        }

        // Fetch user's balance via API
        const result = await getBalance(token);

        // Only update state if component is still mounted
        if (isMounted) {
          dispatch({ type: "SET_BALANCE", Balance: result });
        }
      } catch (error) {
        if (isMounted) {
          console.error("❌ Error fetching balance:", error);
        }
      } finally {
        // Stop loading spinner once data is handled
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBalance();

    // Cleanup on unmount: prevents updating state on unmounted component
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <LinearGradient
      colors={theme.BalanceCardColor} // Gradient background from theme
      start={{ x: 0.5, y: 0.1 }}
      end={{ x: 1, y: 0.4 }}
      style={styles.card}
      testID="balance-card"
    >
      {/* Title section */}
      <Text style={styles.title} testID="balance-title">
        Birikimlerim
      </Text>

      {/* Content section: shows spinner or balance amount */}
      {loading ? (
        // Loading indicator while fetching balance
        <ActivityIndicator
          testID="loading-indicator"
          color={theme.LoadingIndicatorColor}
        />
      ) : (
        // Display balance and currency symbol
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

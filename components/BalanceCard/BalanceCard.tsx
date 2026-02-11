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
import TrendArrowIcon from "@assets/icons/trendArrow.svg";
import GoalsIcon from "@assets/icons/goals.svg";
import CalendarIcon from "@assets/icons/calendar.svg";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";
import {
  createBalanceCardStyles,
  createBalanceCardIconProps
} from "./styles/BalanceCard.styles";

/* ========== ORIGINAL BALANCE CARD (COMMENTED OUT FOR TESTING) ==========
/**
 * BalanceCard Component
 * ----------------------
 * Displays the user's current balance inside a styled gradient card.
 * It fetches the balance from the API on mount and updates global state.
 * While loading, it shows an ActivityIndicator instead of the amount.
 *
 * Enhanced with useWindowDimensions for dynamic responsive updates.
 */
/*
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
/*
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
      {/* Title section */ /*
      <Text style={styles.title} testID="balance-title">
        Birikimlerim
      </Text>

      {/* Content section: shows spinner or balance amount */ /*
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
*/
/* ========== END OF COMMENTED ORIGINAL BALANCE CARD ========== */
const BalanceCard = () => {
  // Local state to control loading spinner
  const [loading, setLoading] = useState(true);

  // Access global balance and currency from context
  const [{ Balance, Currency }, dispatch] = useDataLayerValue();

  // Get active theme and responsive dimensions
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createBalanceCardStyles(theme, width);
  const iconProps = createBalanceCardIconProps(theme, width, height);

  /**
   * Fetch the current balance from the backend once when component mounts.
   * Safely handles component unmounting to avoid memory leaks.
   */

  return (
    <View style={styles.cardContainer}>
      <View style={styles.savingsContainer}>
        <View style={styles.savings}>
          <Text style={styles.savingsText}>Total Saving</Text>
        </View>
        <View style={styles.savingsDeficit}>
          <TrendArrowIcon {...iconProps.trendArrow} />
          <Text style={styles.savingsDefictPercentage}>+8.4%</Text>
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceAmount}>
          <Text style={styles.balanceUnit}>$</Text>
          <Text style={styles.balanceValue}>12,45.80</Text>
        </View>
      </View>
      <View style={styles.borderLine}></View>
      <View style={styles.cardFooter}>
        <View style={styles.goalsContainer}>
          <View style={styles.goals}>
            <GoalsIcon {...iconProps.goals} />
            <Text style={styles.goalsText}>3 active Goals</Text>
          </View>
        </View>
        <View style={styles.lastUpdate}>
          <CalendarIcon {...iconProps.calendar} />
          <Text style={styles.lastUpdateText}>Updated Today</Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;

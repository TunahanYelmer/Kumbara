import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useState, useEffect } from "react";

type TabType = "all" | "income" | "expense";
import { Transactions, Action } from "@/context/state/stateReducer";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { getTransactions } from "@api/getTransactions";
import { getToken } from "@/utils/auth";
import TransactionList from "@/components/TransactionHistory/TransactionList";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createTransactionHistoryStyles } from "./styles/TranscationHistory.styles";

const { width, height } = Dimensions.get("window");

/**
 * TransactionsHistory Component
 * -----------------------------
 * Displays a filterable list of user transactions with tabs for:
 * - All transactions
 * - Income (deposits)
 * - Expenses (withdrawals)
 *
 * Fetches transaction data from API on mount and updates global state.
 */
const TransactionsHistory = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("all");

  const [isLoading, setIsLoading] = useState(true);
  const [{ Transactions }, dispatch] = useDataLayerValue();
  const [theme] = useTheme();
  const styles = createTransactionHistoryStyles(theme, width, height);

  // Fetch transactions from API on component mount
  useEffect(() => {
    handleRetrievingTransactions();
  }, []);

  /**
   * Fetches transactions from the backend API:
   * 1. Retrieves JWT token from storage
   * 2. Calls API to get user's transactions
   * 3. Maps API response to local interface
   * 4. Updates global state with transactions
   */
  const handleRetrievingTransactions = async () => {
    try {
      setIsLoading(true);

      // Get JWT token from storage
      const token = await getToken();
      if (!token) {
        console.error("❌ No token found");
        return;
      }

      const result = await getTransactions(token);

      // Validate result
      if (!result || !Array.isArray(result)) {
        console.warn("⚠️ Invalid API response:", result);
        dispatch({
          type: "SET_TRANSACTIONS",
          Transactions: []
        } as Action);
        return;
      }

      // Map API response to your TS interface
      const transactions: Transactions[] = result.map((item: any) => {
        return {
          id: item.transaction_id ?? item.id,
          type: item.type,
          amount: item.amount,
          category: item.category || null,
          date: item.created_at
        };
      });

      dispatch({
        type: "SET_TRANSACTIONS",
        Transactions: transactions
      } as Action);
    } catch (error) {
      console.error("❌ Error fetching transactions:", error);
      alert("Error fetching transactions");
      // Set empty array on error
      dispatch({
        type: "SET_TRANSACTIONS",
        Transactions: []
      } as Action);
    } finally {
      setIsLoading(false);
    }
  };

  // Safety check for Transactions
  const safeTransactions = Array.isArray(Transactions) ? Transactions : [];

  // Filter transactions by selected tab
  const filteredTransactions = safeTransactions.filter((item) => {
    if (!item) {
      console.log("❌ Null/undefined item");
      return false;
    }

    const itemType = (item.type || "").toLowerCase();

    if (selectedTab === "all") return true;
    if (selectedTab === "income")
      return itemType === "deposit" || itemType === "income";
    if (selectedTab === "expense")
      return itemType === "withdraw" || itemType === "expense";
    return false;
  });

  /**
   * Updates the selected tab filter
   * @param tab - The tab to select ("all", "income", or "expense")
   */
  const handleSelectedTab = (tab: TabType) => {
    setSelectedTab(tab);
  };

  /**
   * Renders a single transaction item in the FlatList
   * Determines payment type based on transaction type and category
   * @param item - The transaction object to render
   */
  const renderItem = ({ item }: { item: Transactions }) => {
    if (!item) {
      console.warn("⚠️ Undefined item in renderItem");
      return null;
    }

    // Determine payment type based on transaction type and category
    let paymentType: "food" | "market" | "transport" | "bill" | "income";

    const itemType = (item.type || "").toLowerCase();

    if (itemType === "deposit" || itemType === "income") {
      paymentType = "income";
    } else {
      // For withdrawals, use the category or default to "bill"
      paymentType = item.category || "bill";
    }

    return <TransactionList paymentType={paymentType} amount={item.amount} />;
  };

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: height * 0.005
      }}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer} testID="empty-state">
      <Text style={styles.emptyText}>
        {selectedTab === "all"
          ? "Henüz işlem yok"
          : selectedTab === "income"
            ? "Gelir işlemi yok"
            : "Gider işlemi yok"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container} testID="transaction-history">
      {/* Tabs */}
      <View style={styles.tabs}>
        {["all", "income", "expense"].map((tab) => (
          <TouchableOpacity
            key={tab}
            testID={`${tab}-tab`}
            onPress={() =>
              handleSelectedTab(tab as "all" | "income" | "expense")
            }
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === tab && styles.activeTabText
              ]}
            >
              {tab === "all" ? "Tümü" : tab === "income" ? "Gelir" : "Gider"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Loading State */}
      {isLoading ? (
        <View style={styles.loadingContainer} testID="loading-indicator">
          <ActivityIndicator size="large" color={theme.ButtonColor} />
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      ) : (
        <>
          {/* FlatList */}
          <FlatList
            testID="transaction-list"
            data={filteredTransactions.slice(0, 6)}
            keyExtractor={(item, index) => {
              const key = item?.id
                ? `${item.id}-${index}`
                : `transaction-${index}`;
              return key;
            }}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmpty}
            scrollEnabled={true}
          />
        </>
      )}
    </View>
  );
};

export default TransactionsHistory;

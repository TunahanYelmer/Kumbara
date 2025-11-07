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
import { Transactions, Action } from "@/context/state/stateReducer";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { getTransactions } from "@api/getTransactions";
import TransactionList from "@components/TransactionList";
import { useTheme } from "@/context/theme/ThemeProvider";

const { width, height } = Dimensions.get("window");

export const TransactionsHistory = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [{ Transactions }, dispatch] = useDataLayerValue();
    const [theme] = useTheme();

  // Fetch transactions from API
  useEffect(() => {
    handleRetrievingTransactions();
  }, []);

  const handleRetrievingTransactions = async () => {
    try {
      setIsLoading(true);
      const result = await getTransactions();

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

  const handleSelectedTab = (tab: "all" | "income" | "expense") => {
    setSelectedTab(tab);
  };

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
      paymentType = (item.category || "bill") as
        | "food"
        | "market"
        | "transport"
        | "bill"
        | "income";
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
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.BackgroundColor,
      padding: width * 0.04,
      margin: width * 0.025,
      borderRadius: width * 0.025
    },
    tabs: {
      flexDirection: "row",
      marginVertical: height * 0.015
    },
    tabButton: {
      backgroundColor: theme.TabButtonBgColor,
      paddingVertical: height * 0.008,
      paddingHorizontal: width * 0.04,
      borderRadius: width * 0.05,
      marginRight: width * 0.02
    },
    tabButtonText: {
      fontSize: width * 0.04,
      color: theme.TabButtonInactiveColour,
      textAlign: "center"
    },
    activeTabText: {
      color: theme.TabActiveColor,
      fontWeight: "700"
    },
    loadingContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: height * 0.05
    },
    loadingText: {
      marginTop: height * 0.01,
      fontSize: width * 0.035,
      color: theme.TransactionHistoryLoadingColor
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: height * 0.05
    },
    emptyText: {
      fontSize: width * 0.04,
      color: theme.TransactionHistoryEmptyTextColor,
      textAlign: "center"
    }
  });
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

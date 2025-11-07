import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createTransactionListStyles } from "./styles/TransactionList.styles";

type Props = {
  paymentType: "food" | "market" | "transport" | "bill" | "income" | "other";
  amount: number;
};

// Screen dimensions for responsive UI scaling
const { width, height } = Dimensions.get("window");

/**
 * Icon sizes based on screen width.
 * Using consistent sizing ensures proportional icons across devices.
 */
const iconStyles: Record<Props["paymentType"], any> = {
  food: { width: width * 0.08, height: width * 0.08 },
  market: { width: width * 0.08, height: width * 0.08 },
  transport: { width: width * 0.08, height: width * 0.08 },
  bill: { width: width * 0.08, height: width * 0.08 },
  income: { width: width * 0.08, height: width * 0.08 },
  other: { width: width * 0.08, height: width * 0.08 }
};

/**
 * Local image assets for transaction icons.
 * Each payment type corresponds to an icon in the assets folder.
 */
const iconSources: Record<Props["paymentType"], any> = {
  food: require("@assets/food.png"),
  market: require("@assets/market.png"),
  transport: require("@assets/transport.png"),
  bill: require("@assets/bill.png"),
  income: require("@assets/income.png"),
  other: require("@assets/other.png") // Reuses bill icon for "other"
};

/**
 * Display names for each transaction category.
 * Used for user-friendly labels.
 */
const displayNames: Record<Props["paymentType"], string> = {
  food: "Yemek",
  market: "Market",
  transport: "Ulaşım",
  bill: "Fatura",
  other: "Diğer",
  income: "Gelir"
};

// Valid payment type list for input safety
const validTypes: Props["paymentType"][] = [
  "food",
  "market",
  "transport",
  "bill",
  "income",
  "other"
];

/**
 * TransactionList Component
 * -------------------------
 * Displays a single transaction item with:
 * - Icon and background color based on payment type
 * - Category name
 * - Formatted amount (positive or negative)
 * - Currency symbol
 */
const TransactionList: React.FC<Props> = ({ paymentType, amount }) => {
  // Access global state for currency info
  const [{ Currency }] = useDataLayerValue();

  // Get current theme (light/dark) and styles
  const [theme] = useTheme();

  /**
   * Background colors for transaction icons.
   * Defined in theme for color consistency.
   */
  const iconBgColors: Record<Props["paymentType"], string> = {
    food: theme.FoodIconBgColor,
    market: theme.MarketIconBgColor,
    transport: theme.TransportIconBgColor,
    bill: theme.BillIconBgColor,
    income: theme.IncomeIconBgColor,
    other: theme.BillIconBgColor
  };

  // Ensure we use a valid payment type (fallback to "bill" if invalid)
  const finalType = validTypes.includes(paymentType) ? paymentType : "bill";

  // Select icon and background color based on the transaction type
  const iconSource = iconSources[finalType];
  const bgColor = iconBgColors[finalType];

  // Determine if the transaction is income or expense
  const isIncome = finalType === "income";

  // Add "+" for income, "-" for expense
  const sign = isIncome ? "+" : "-";

  // Format amount (always positive in text)
  const formattedAmount = `${sign}${Math.abs(amount)}`;

  // Generate styles based on theme and transaction type
  const styles = createTransactionListStyles(theme, width, height, isIncome);

  return (
    <View
      style={styles.items}
      testID={`transaction-item-${finalType}`}
      accessibilityLabel={`Transaction ${finalType}`}
    >
      {/* Icon Section */}
      <View
        style={[styles.iconBg, { backgroundColor: bgColor }]}
        testID="icon-bg"
      >
        <Image
          source={iconSource}
          style={iconStyles[finalType]}
          resizeMode="contain"
          testID="transaction-icon"
        />
      </View>

      {/* Category Name Section */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title} testID="transaction-title">
          {displayNames[finalType]}
        </Text>
      </View>

      {/* Amount Section */}
      <View style={styles.amount}>
        <Text
          style={[
            styles.amountText,
            {
              color: isIncome
                ? theme.TransactionTextIncomeColor
                : theme.TransactionTextExpenseColor
            }
          ]}
          testID="transaction-amount"
        >
          <Text>{formattedAmount}</Text>{" "}
          <Text>{Currency ? Currency[0].symbol : "₺"}</Text>
        </Text>
      </View>
    </View>
  );
};

export default TransactionList;

import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createTransactionListStyles } from "./styles/TransactionList.styles";

// Define component props for better type safety
type Props = {
  paymentType: "food" | "market" | "transport" | "bill" | "income" | "other";
  amount: number;
};

// Get screen dimensions for responsive sizing
const { width, height } = Dimensions.get("window");

/**

* Icon size definitions — ensures consistent proportional sizing across devices.
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

* Human-readable category labels for display.
  */
const displayNames: Record<Props["paymentType"], string> = {
  food: "Yemek",
  market: "Market",
  transport: "Ulaşım",
  bill: "Fatura",
  income: "Gelir",
  other: "Diğer"
};

// Valid payment types for input safety
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
* ---
* Displays a transaction row with:
* * An icon (based on type)
* * A label (category name)
* * A formatted amount (+/-) and currency symbol
    */
const TransactionList: React.FC<Props> = ({ paymentType, amount }) => {
  // Access global currency data from context
  const [{ Currency }] = useDataLayerValue();

  // Access the current theme (light/dark)
  const [theme] = useTheme();

  /**

* Define icon sources based on theme mode.
* Keeps visuals consistent between dark and light themes.
  */
  const iconSources: Record<Props["paymentType"], any> = !theme.DarkMode
    ? {
        food: require("@assets/food.png"),
        market: require("@assets/market.png"),
        transport: require("@assets/transport.png"),
        bill: require("@assets/bill.png"),
        income: require("@assets/income.png"),
        other: require("@assets/other.png")
      }
    : {
        food: require("@assets/food-white.png"),
        market: require("@assets/market-white.png"),
        transport: require("@assets/transport-white.png"),
        bill: require("@assets/bill-white.png"),
        income: require("@assets/income-white.png"),
        other: require("@assets/other-white.png")
      };

  /**

* Icon background colors are theme-dependent and
* mapped to payment categories for visual distinction.
  */
  const iconBgColors: Record<Props["paymentType"], string> = {
    food: theme.FoodIconBgColor,
    market: theme.MarketIconBgColor,
    transport: theme.TransportIconBgColor,
    bill: theme.BillIconBgColor,
    income: theme.IncomeIconBgColor,
    other: theme.BillIconBgColor
  };

  // Ensure payment type is valid — fallback to "bill" if not
  const finalType = validTypes.includes(paymentType) ? paymentType : "bill";

  // Select appropriate icon and background color
  const iconSource = iconSources[finalType];
  const bgColor = iconBgColors[finalType];

  // Determine if transaction is income or expense
  const isIncome = finalType === "income";

  // Assign + or - sign accordingly
  const sign = isIncome ? "+" : "-";

  // Format display amount (absolute value for clarity)
  const formattedAmount = `${sign}${Math.abs(amount)}`;

  // Create dynamic styles based on theme and income/expense type
  const styles = createTransactionListStyles(theme, width, height, isIncome);

  return (
    <View
      style={styles.items}
      testID={`transaction-item-${finalType}`}
      accessibilityLabel={`Transaction ${finalType}`}
    >
      {/* ───── Icon Section ───── */}
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

      {/* ───── Category Label ───── */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title} testID="transaction-title">
          {displayNames[finalType]}
        </Text>
      </View>

      {/* ───── Amount Section ───── */}
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
          <Text>{formattedAmount}</Text>
          <Text>{Currency ? Currency[0].symbol : "₺"}</Text>
        </Text>
      </View>
    </View>
  );
};

export default TransactionList;

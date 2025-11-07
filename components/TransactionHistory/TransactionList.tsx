import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createTransactionListStyles } from "./styles/TransactionList.styles";

type Props = {
  paymentType: "food" | "market" | "transport" | "bill" | "income" | "other";
  amount: number;
};

const { width, height } = Dimensions.get("window");

// Icon sizes
const iconStyles: Record<Props["paymentType"], any> = {
  food: { width: width * 0.08, height: width * 0.08 },
  market: { width: width * 0.08, height: width * 0.08 },
  transport: { width: width * 0.08, height: width * 0.08 },
  bill: { width: width * 0.08, height: width * 0.08 },
  income: { width: width * 0.08, height: width * 0.08 },
  other: { width: width * 0.08, height: width * 0.08 }
};

const iconSources: Record<Props["paymentType"], any> = {
  food: require("../assets/food.png"),
  market: require("../assets/market.png"),
  transport: require("../assets/transport.png"),
  bill: require("../assets/bill.png"),
  income: require("../assets/income.png"),
  other: require("../assets/bill.png")
};

const displayNames: Record<Props["paymentType"], string> = {
  food: "Yemek",
  market: "Market",
  transport: "Ulaşım",
  bill: "Fatura",
  other: "Diğer",
  income: "Gelir"
};

const validTypes: Props["paymentType"][] = [
  "food",
  "market",
  "transport",
  "bill",
  "income",
  "other"
];

const TransactionList: React.FC<Props> = ({ paymentType, amount }) => {
  const [{ Currency }] = useDataLayerValue();
  const [theme] = useTheme();
  const iconBgColors: Record<Props["paymentType"], string> = {
    food: theme.FoodIconBgColor,
    market: theme.MarketIconBgColor,
    transport: theme.TransportIconBgColor,
    bill: theme.BillIconBgColor,
    income: theme.IncomeIconBgColor,
    other: theme.BillIconBgColor
  };

  const finalType = validTypes.includes(paymentType) ? paymentType : "bill";
  const iconSource = iconSources[finalType];
  const bgColor = iconBgColors[finalType];
  const isIncome = finalType === "income";
  const sign = isIncome ? "+" : "-";
  const formattedAmount = `${sign}${Math.abs(amount)}`;
  const styles = createTransactionListStyles(theme, width, height, isIncome);

  // Background colors

  return (
    <View
      style={styles.items}
      testID={`transaction-item-${finalType}`}
      accessibilityLabel={`Transaction ${finalType}`}
    >
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
      <View style={{ flex: 1 }}>
        <Text style={styles.title} testID="transaction-title">
          {displayNames[finalType]}
        </Text>
      </View>
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

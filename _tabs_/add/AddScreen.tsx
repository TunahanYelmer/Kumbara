import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createAddScreenStyles } from "./styles/AddScreen.styles";

// Import icons
import CheckIcon from "@assets/icons/check.svg";
import BriefcaseIcon from "@assets/icons/briefcase.svg";
import GiftIcon from "@assets/icons/gift.svg";
import ArrowUpRightIcon from "@assets/icons/arrow-up-right.svg";
import ArrowDownRightIcon from "@assets/icons/arrow-down-right.svg";
import ZapIcon from "@assets/icons/zap.svg";
import MoreHorizontalIcon from "@assets/icons/more-horizontal.svg";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import { useNavigationContext } from "@context/navigation/NavigationProvider";

type TransactionType = "income" | "expense";
type CategoryType = "salary" | "bonus" | "side" | "other";

export default function AddScreen() {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createAddScreenStyles(theme, width, height);
  const { navigate } = useNavigationContext();

  const [amount, setAmount] = useState("0");
  const [type, setType] = useState<TransactionType>("income");
  const [category, setCategory] = useState<CategoryType>("salary");

  const handleNumberPress = (num: string) => {
    if (amount === "0") {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDecimalPress = () => {
    if (!amount.includes(".")) {
      setAmount(amount + ".");
    }
  };

  const handleBackspace = () => {
    if (amount.length === 1) {
      setAmount("0");
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    console.log("Transaction:", { amount: parseFloat(amount), type, category });
    // TODO: Submit transaction to API
    // navigate("Home");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigate("Home")}
        accessibilityLabel="Geri"
        accessibilityRole="button"
        accessibilityHint="Ana sayfaya dön"
      >
        <ChevronLeftIcon width={24} height={24} stroke={theme.StatsValueColor} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Para Ekle</Text>
          <Text style={styles.subtitle}>Tasarruflarınızı takip edin</Text>
        </View>

      {/* Amount Input Card */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>MİKTAR</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currencySymbol}>₺</Text>
          <Text style={styles.amountInput}>{amount || "0.00"}</Text>
        </View>
      </View>

      {/* Type Selector */}
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "income" && styles.typeButtonActive,
          ]}
          onPress={() => setType("income")}
          activeOpacity={0.8}
        >
          <ArrowUpRightIcon
            width={20}
            height={20}
            stroke={type === "income" ? theme.StatsHighlightColor : theme.StatsLabelColor}
          />
          <Text
            style={[
              styles.typeButtonText,
              type === "income" && styles.typeButtonTextActive,
            ]}
          >
            Gelir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "expense" && [styles.typeButtonActive, styles.typeButtonExpense],
          ]}
          onPress={() => setType("expense")}
          activeOpacity={0.8}
        >
          <ArrowDownRightIcon
            width={20}
            height={20}
            stroke={type === "expense" ? "#ef4444" : theme.StatsLabelColor}
          />
          <Text
            style={[
              styles.typeButtonText,
              type === "expense" && styles.typeButtonTextExpense,
            ]}
          >
            Gider
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Grid */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>KATEGORİ</Text>
        <View style={styles.categoryGrid}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              category === "salary" && styles.categoryButtonActive,
            ]}
            onPress={() => setCategory("salary")}
            activeOpacity={0.8}
          >
            <BriefcaseIcon
              width={24}
              height={24}
              fill={category === "salary" ? theme.StatsHighlightColor : theme.StatsLabelColor}
              stroke={category === "salary" ? theme.StatsHighlightColor : theme.StatsLabelColor}
            />
            <Text
              style={[
                styles.categoryText,
                category === "salary" && styles.categoryTextActive,
              ]}
            >
              Maaş
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              category === "bonus" && styles.categoryButtonActive,
            ]}
            onPress={() => setCategory("bonus")}
            activeOpacity={0.8}
          >
            <GiftIcon
              width={24}
              height={24}
              fill={category === "bonus" ? theme.StatsHighlightColor : theme.StatsLabelColor}
              stroke={category === "bonus" ? theme.StatsHighlightColor : theme.StatsLabelColor}
            />
            <Text
              style={[
                styles.categoryText,
                category === "bonus" && styles.categoryTextActive,
              ]}
            >
              İkramiye
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              category === "side" && styles.categoryButtonActive,
            ]}
            onPress={() => setCategory("side")}
            activeOpacity={0.8}
          >
            <ZapIcon
              width={24}
              height={24}
              fill={category === "side" ? theme.StatsHighlightColor : theme.StatsLabelColor}
              stroke={category === "side" ? theme.StatsHighlightColor : theme.StatsLabelColor}
            />
            <Text
              style={[
                styles.categoryText,
                category === "side" && styles.categoryTextActive,
              ]}
            >
              Yan Gelir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              category === "other" && styles.categoryButtonActive,
            ]}
            onPress={() => setCategory("other")}
            activeOpacity={0.8}
          >
            <MoreHorizontalIcon
              width={24}
              height={24}
              stroke={category === "other" ? theme.StatsHighlightColor : theme.StatsLabelColor}
            />
            <Text
              style={[
                styles.categoryText,
                category === "other" && styles.categoryTextActive,
              ]}
            >
              Diğer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Number Pad */}
      <View style={styles.numberPad}>
        {/* Row 1 */}
        <View style={styles.numberRow}>
          {["1", "2", "3"].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handleNumberPress(num)}
              activeOpacity={0.7}
            >
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Row 2 */}
        <View style={styles.numberRow}>
          {["4", "5", "6"].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handleNumberPress(num)}
              activeOpacity={0.7}
            >
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Row 3 */}
        <View style={styles.numberRow}>
          {["7", "8", "9"].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handleNumberPress(num)}
              activeOpacity={0.7}
            >
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Row 4 */}
        <View style={styles.numberRow}>
          <TouchableOpacity
            style={styles.numberButton}
            onPress={handleDecimalPress}
            activeOpacity={0.7}
          >
            <Text style={styles.numberText}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.numberButton}
            onPress={() => handleNumberPress("0")}
            activeOpacity={0.7}
          >
            <Text style={styles.numberText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.numberButton}
            onPress={handleBackspace}
            activeOpacity={0.7}
          >
            <ChevronLeftIcon width={24} height={24} stroke={theme.StatsLabelColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.8}
        accessibilityLabel="İşlem Ekle"
        accessibilityRole="button"
        accessibilityHint="Yeni işlem kaydet"
      >
        <CheckIcon width={20} height={20} fill="#FFFFFF" stroke="#FFFFFF" />
        <Text style={styles.submitText}>İşlem Ekle</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

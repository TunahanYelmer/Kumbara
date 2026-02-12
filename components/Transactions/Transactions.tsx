import React, { FC, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import AddMoneyModal from "@/components/AddMoneyModal/AddMoneyModal";
import WithdrawMoneyModal from "@/components/WithDrawMoneyModal/WithdrawMoneyModal";
import { useTheme } from "@/context/theme/ThemeProvider";
import {
  createTransactionsStyles,
  createTransactionsIconProps
} from "./styles/Transactions.styles";

// Import SVG icons
import WalletIcon from "@assets/icons/wallet.svg";
import WithdrawIcon from "@assets/icons/withdraw.svg";
import InfoIcon from "@assets/icons/info.svg";

const { width, height } = Dimensions.get("window");

/* ========== ORIGINAL TRANSACTIONS COMPONENT (COMMENTED OUT FOR REDESIGN) ==========
/**
 * Transactions Component (Original - 2 Buttons)
 * ----------------------
 * Two action buttons: Add Money and Withdraw Money
 * Uses PNG icons and Turkish text
 * Opens modals for each action
 */
/*
const Transactions: FC = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawData, setWithdrawData] = useState<{
    amount: number;
    reason: string;
  } | null>(null);

  const [theme] = useTheme();
  const styles = createTransactionsStyles(theme, width, height);

  // Use correct require() syntax for React Native images
  const AddButtonIcon = theme.DarkMode
    ? require("@assets/icons/add-white.png")
    : require("@assets/icons/add.png");
  const WithdrawButtonIcon = theme.DarkMode
    ? require("@assets/icons/withdraw-white.png")
    : require("@assets/icons/withdraw.png");

  return (
    <View style={styles.container}>
      {/* ----------------- Add Money Section ----------------- *\/
      <View style={styles.add}>
        <TouchableOpacity
          testID="add-money-button"
          style={styles.button}
          onPress={() => setAddModalVisible(true)}
        >
          <AddMoneyModal
            modalVisible={addModalVisible}
            setModalVisible={setAddModalVisible}
          />
          <Image source={AddButtonIcon} style={styles.icon} />
          <Text style={styles.AddbuttonText}>Para Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* ----------------- Withdraw Money Section ----------------- *\/
      <View style={styles.substract}>
        <TouchableOpacity
          testID="withdraw-money-button"
          style={styles.button}
          onPress={() => setWithdrawModalVisible(true)}
        >
          <WithdrawMoneyModal
            modalVisible={withdrawModalVisible}
            setModalVisible={setWithdrawModalVisible}
            onConfirm={(amount, reason) => setWithdrawData({ amount, reason })}
          />
          <Image source={WithdrawButtonIcon} style={styles.icon} />
          <Text style={styles.SubstructButtonText}>Para Çıkar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
*/
/* ========== END OF COMMENTED ORIGINAL TRANSACTIONS COMPONENT ========== */

/**
 * Transactions Component (NEW DESIGN - ekra.png)
 * ----------------------
 * Three action buttons: Add Money, Withdraw Money, Add Goal
 * Matches ekra.png design
 */
const Transactions: FC = () => {
  const [theme] = useTheme();
  const styles = createTransactionsStyles(theme, width, height);
  const iconProps = createTransactionsIconProps(theme, width, height);

  return (
    <View style={styles.container}>
      <View style={styles.quickActionsContainer}>
        {/* Add Money */}
        <View style={[styles.quickActionCard, styles.addMoneyCard]}>
          <View style={styles.addMoneyIconContainer}>
            <WalletIcon {...iconProps.wallet} />
          </View>
          <Text style={[styles.actionText, styles.addMoneyText]}>
            Add Money
          </Text>
        </View>

        {/* Withdraw */}
        <View style={[styles.quickActionCard, styles.withdrawCard]}>
          <View style={styles.withdrawIconContainer}>
            <WithdrawIcon {...iconProps.withdraw} />
          </View>
          <Text style={[styles.actionText, styles.withdrawText]}>Withdraw</Text>
        </View>

        {/* Add Goal */}
        <View style={[styles.quickActionCard, styles.addGoalCard]}>
          <View style={styles.newGoalIconContainer}>
            <InfoIcon {...iconProps.info} />
          </View>
          <Text style={[styles.actionText, styles.addGoalText]}>
            Yeni Hedef
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Transactions;

import React, { FC, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AddMoneyModal from "@/components/AddMoneyModal/AddMoneyModal";
import WithdrawMoneyModal from "@/components/WithDrawMoneyModal/WithdrawMoneyModal";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createTransactionsStyles } from "./styles/Transactions.styles";

const { width, height } = Dimensions.get("window");

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
    ? require("@assets/add-white.png")
    : require("@assets/add.png");
  const WithdrawButtonIcon = theme.DarkMode
    ? require("@assets/withdraw-white.png")
    : require("@assets/withdraw.png");

  return (
    <View style={styles.container}>
      {/* ----------------- Add Money Section ----------------- */}
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

      {/* ----------------- Withdraw Money Section ----------------- */}
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

export default Transactions;

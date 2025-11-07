import React, { FC, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
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

  const styles = createTransactionsStyles(theme , width , height);

 
  return (
    <View style={styles.container}>
      {/* Add Money */}
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
          <Image source={require("@assets/add.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Para Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Withdraw Money */}
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
          <Image
            source={require("@assets/withdraw.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Para Çıkar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Transactions;



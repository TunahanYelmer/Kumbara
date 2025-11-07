import React, { useEffect, useState } from "react";
import { State, Action, Transactions } from "@/context/state/stateReducer";
import { useDataLayerValue } from "@/context/state/StateProvider";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { postBalance } from "@api/postBalance";
import { getBalance } from "@api/getBalance";
import { postTransaction } from "@api/postTransactions";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createAddMoneyModalStyles } from "./styles/AddMoneyModal.styles";

interface AddMoneyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function AddMoneyModal({
  modalVisible,
  setModalVisible
}: Readonly<AddMoneyModalProps>) {
  const [amount, setAmount] = useState<string>("");
  const [{Transactions }, dispatch] = useDataLayerValue();
  const [theme] = useTheme();
  const styles = createAddMoneyModalStyles(theme);

  const handleBalanceUpdate = (newBalance: number) => {
    dispatch({
      type: "SET_BALANCE",
      Balance: newBalance
    } as Action);
  };

  const handleTransactionsUpdate = async (numericAmount: number) => {
    try {
      const newTransaction: Transactions = {
        id: Date.now(),
        type: "deposit",
        amount: numericAmount,
        category: "income",
        date: new Date().toISOString()
      };

      await postTransaction("deposit", numericAmount, "income");

      dispatch({
        type: "SET_TRANSACTIONS",
        Transactions: [newTransaction, ...Transactions]
      } as Action);
    } catch (error) {
      console.error("❌ Error updating transactions:", error);
    }
  };

  const handleAddMoney = async () => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      try {
        const currentBalance = await getBalance();
        await postBalance(currentBalance + numericAmount);

        handleBalanceUpdate(currentBalance + numericAmount);
        await handleTransactionsUpdate(numericAmount);

        Alert.alert("Başarılı ✅", `${numericAmount} eklendi.`);
      } catch (error) {
        console.error("❌ Error posting balance:", error);
        Alert.alert("Hata ❌", "Sunucuya bağlanılamadı.");
      } finally {
        setAmount("");
      }
    } else {
      Alert.alert("Geçersiz miktar", "Lütfen geçerli bir sayı giriniz.");
    }
  };

  

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
      testID="add-money-modal"
    >
      <View testID="modal-overlay" style={styles.modalOverlay}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Miktar Giriniz</Text>
          <TextInput
            testID="amount-input"
            style={styles.input}
            placeholder="Örn: 100"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              testID="add-button"
              style={styles.modalButton}
              onPress={() => {
                handleAddMoney();
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="cancel-button"
              style={[
                styles.modalButton,
                { backgroundColor: theme.ButtonColor }
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

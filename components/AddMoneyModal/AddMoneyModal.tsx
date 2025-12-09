import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createAddMoneyModalStyles } from "./styles/AddMoneyModal.styles";
import { getBalance } from "@api/getBalance";
import { postBalance } from "@api/postBalance";
import { postTransaction } from "@api/postTransactions";
import { Action, Transactions } from "@/context/state/stateReducer";
import { getToken } from "@/utils/auth";

interface AddMoneyModalProps {
  modalVisible: boolean; // Controls whether the modal is shown
  setModalVisible: (visible: boolean) => void; // Function to close or open modal
}

export default function AddMoneyModal({
  modalVisible,
  setModalVisible
}: Readonly<AddMoneyModalProps>) {
  // Local state for the input value
  const [amount, setAmount] = useState("");

  // Access global state and dispatch from context
  const [{ Transactions: transactions }, dispatch] = useDataLayerValue();

  // Get the current app theme and generate styles accordingly
  const [theme] = useTheme();
  const styles = createAddMoneyModalStyles(theme);

  /**
   * Handles adding money:
   * 1. Validates input
   * 2. Updates balance via API
   * 3. Adds a new transaction record
   * 4. Updates global state
   * 5. Displays success or error feedback
   */
  const handleAddMoney = async () => {
    const numericAmount = parseFloat(amount);

    // Input validation
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Geçersiz miktar", "Lütfen geçerli bir sayı giriniz.");
      return;
    }

    try {
      // Get JWT token from storage
      const jwtToken = await getToken();
      if (!jwtToken) {
        Alert.alert("Hata", "Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        return;
      }

      // Fetch the current balance from the server
      const currentBalance = await getBalance(jwtToken);
      const updatedBalance = currentBalance + numericAmount;

      // Update the balance on the server
      await postBalance(updatedBalance, jwtToken);

      // Update global state with the new balance
      dispatch({ type: "SET_BALANCE", Balance: updatedBalance } as Action);

      // Create a new transaction record for history
      const newTransaction: Transactions = {
        id: Date.now(),
        type: "deposit",
        amount: numericAmount,
        category: "income",
        date: new Date().toISOString()
      };

      // Save transaction on the server
      await postTransaction(jwtToken, "deposit", numericAmount, "income");

      // Update transaction list in global state
      dispatch({
        type: "SET_TRANSACTIONS",
        Transactions: [newTransaction, ...transactions]
      } as Action);

      // Notify user of success
      Alert.alert("Başarılı ✅", `${numericAmount} TL eklendi.`);
    } catch (error) {
      // Log and notify on failure
      console.error("❌ Error posting balance or transactions:", error);
      Alert.alert("Hata ❌", "Sunucuya bağlanılamadı.");
    } finally {
      // Always clear input and close modal
      setAmount("");
      setModalVisible(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent
      onRequestClose={() => setModalVisible(false)}
      testID="add-money-modal"
    >
      <View testID="modal-overlay" style={styles.modalOverlay}>
        <View style={styles.modal}>
          {/* Modal Header */}
          <Text style={styles.modalTitle}>Miktar Giriniz</Text>

          {/* Numeric input for deposit amount */}
          <TextInput
            testID="amount-input"
            style={styles.input}
            placeholder="Örn: 100"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Action Buttons */}
          <View style={styles.buttonsRow}>
            {/* Confirm Button */}
            <TouchableOpacity
              testID="add-button"
              style={styles.modalButton}
              onPress={handleAddMoney}
            >
              <Text style={styles.buttonText}>Ekle</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
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

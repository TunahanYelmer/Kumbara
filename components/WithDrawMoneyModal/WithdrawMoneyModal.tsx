import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useWindowDimensions
} from "react-native";
import { getTransactions } from "@api/getTransactions";
import { postTransaction } from "@api/postTransactions";
import { getToken } from "@/utils/auth";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { Transactions, Action } from "@/context/state/stateReducer";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createWithdrawMoneyModalStyles } from "./styles/WithDrawMoneyModal..styles";

/**
 * WithdrawMoneyModal Component
 * ----------------------------
 * A two-step modal for withdrawing money from the user's balance.
 * Step 1: User enters the amount to withdraw
 * Step 2: User selects a reason/category for the withdrawal
 *
 * @param modalVisible - Controls whether the modal is displayed
 * @param setModalVisible - Function to show/hide the modal
 * @param onConfirm - Callback triggered after successful withdrawal
 */
interface WithdrawMoneyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onConfirm: (amount: number, reason: string) => void;
}
type Props = {
  paymentType: "food" | "market" | "transport" | "bill" | "income" | "other";
  amount: number;
};

export default function WithdrawMoneyModal({
  modalVisible,
  setModalVisible,
  onConfirm
}: Readonly<WithdrawMoneyModalProps>) {
  const [step, setStep] = useState<"amount" | "reason">("amount");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [{ Balance }, dispatch] = useDataLayerValue();
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createWithdrawMoneyModalStyles(theme, width, height);

  /**
   * Updates the global balance state after withdrawal
   * @param newBalance - The new balance after withdrawal
   */
  const handleWithdrawBalanceUpdate = (newBalance: number) => {
    dispatch({ type: "SET_BALANCE", Balance: newBalance } as Action);
  };

  /**
   * Fetches updated transactions from API and updates global state
   * @param token - JWT authentication token
   */
  const handleTransactionsUpdate = async (token: string) => {
    const result = await getTransactions(token);
    const transactions: Transactions[] = result.map((item: any) => ({
      id: item.transaction_id,
      type: item.type,
      amount: item.amount,
      category: item.category,
      date: item.created_at
    }));
    dispatch({
      type: "SET_TRANSACTIONS",
      Transactions: transactions
    } as Action);
  };

  /**
   * Validates the entered amount and proceeds to reason selection:
   * 1. Checks if amount is a valid positive number
   * 2. Verifies sufficient balance exists
   * 3. Advances to reason selection step
   */
  const handleNextAmount = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Lütfen geçerli bir miktar giriniz!");
      return;
    }
    if (numericAmount > Balance) {
      Alert.alert("Yetersiz bakiye!");
      return;
    }
    setStep("reason");
  };

  /**
   * Handles the withdrawal confirmation:
   * 1. Validates a reason is selected
   * 2. Retrieves JWT token from storage
   * 3. Posts withdrawal transaction to API
   * 4. Updates local balance and transaction state
   * 5. Resets modal state and closes
   */
  const handleConfirmReason = async () => {
    if (!reason) {
      Alert.alert("Lütfen bir sebep seçin!");
      return;
    }
    setLoading(true);
    try {
      // Get JWT token from storage
      const token = await getToken();
      if (!token) {
        Alert.alert("Hata", "Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        setLoading(false);
        return;
      }

      await postTransaction(token, "withdraw", parseFloat(amount), reason);
      onConfirm(parseFloat(amount), reason);
      handleWithdrawBalanceUpdate(Balance - parseFloat(amount));
      await handleTransactionsUpdate(token);
      setModalVisible(false);
      setStep("amount");
      setAmount("");
      setReason(null);
      setLoading(false);
    } catch (error) {
      Alert.alert("İşlem sırasında bir hata oluştu!");
      setLoading(false);
    }
  };

  /**
   * Resets modal state and closes the modal
   */
  const handleCancel = () => {
    setStep("amount");
    setAmount("");
    setReason(null);
    setModalVisible(false);
  };

  // Available withdrawal reason categories
  const reasons = ["food", "market", "transport", "bill", "other"];
  const reasonsMap: Map<string, string> = new Map([
    ["food", "Yemek"],
    ["market", "Market"],
    ["transport", "Ulaşım"],
    ["bill", "Fatura"],
    ["other", "Diğer"]
  ]);

  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay} testID="modalOverlay">
        <View style={styles.modal}>
          {step === "amount" ? (
            <>
              <Text style={styles.modalTitle}>Miktar Giriniz</Text>
              <TextInput
                testID="amountInput"
                style={styles.input}
                placeholder="Örn: 100"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  testID="nextButton"
                  style={styles.modalButton}
                  onPress={handleNextAmount}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="cancelButton"
                  style={[styles.modalButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Para çekme sebebi</Text>
              {reasons.map((option) => (
                <TouchableOpacity
                  key={option}
                  testID={`reason-${option}`}
                  style={[
                    styles.optionButton,
                    reason === option && styles.selectedOption
                  ]}
                  onPress={() => setReason(option)}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.optionText,
                      reason === option && styles.selectedOptionText
                    ]}
                  >
                    {reasonsMap.get(option)}
                  </Text>
                </TouchableOpacity>
              ))}
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  testID="confirmButton"
                  style={styles.modalButton}
                  onPress={handleConfirmReason}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "..." : "Confirm"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="cancelButtonReason"
                  style={[styles.modalButton]}
                  onPress={handleCancel}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

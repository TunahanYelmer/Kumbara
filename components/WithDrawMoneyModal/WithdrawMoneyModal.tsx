import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { getTransactions } from "@api/getTransactions";
import { postTransaction } from "@api/postTransactions";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { Transactions, Action } from "@/context/state/stateReducer";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createWidthrawMoneyModalStyles } from "./styles/WithDrawMoneyModal..styles";

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
  const styles = createWidthrawMoneyModalStyles(theme);

  const handleWithdrawBalanceUpdate = (newBalance: number) => {
    dispatch({ type: "SET_BALANCE", Balance: newBalance } as Action);
  };

  const handleTransactionsUpdate = async () => {
    const result = await getTransactions();
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

  const handleConfirmReason = async () => {
    if (!reason) {
      Alert.alert("Lütfen bir sebep seçin!");
      return;
    }
    setLoading(true);
    try {
      await postTransaction("withdraw", parseFloat(amount), reason);
      onConfirm(parseFloat(amount), reason);
      handleWithdrawBalanceUpdate(Balance - parseFloat(amount));
      await handleTransactionsUpdate();
      setModalVisible(false);
      setStep("amount");
      setAmount("");
      setReason(null);
      setLoading(false);
    } catch (error) {
      Alert.alert("İşlem sırasında bir hata oluştu!");
    }
  };

  const handleCancel = () => {
    setStep("amount");
    setAmount("");
    setReason(null);
    setModalVisible(false);
  };
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
                  style={[
                    styles.modalButton,
                    { backgroundColor: theme.ButtonColor }
                  ]}
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
                  style={[
                    styles.modalButton,
                    { backgroundColor: theme.ButtonColor }
                  ]}
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

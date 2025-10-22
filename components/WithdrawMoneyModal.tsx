import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { getTransactions } from "../api/getTransactions";
import { postTransaction } from "../api/postTransactions";
import { useDataLayerValue } from "../context/StateProvider";
import { Transactions, Action } from "../context/reducer";

interface WithdrawMoneyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onConfirm: (amount: number, reason: string) => void;
}

export default function WithdrawMoneyModal({
  modalVisible,
  setModalVisible,
  onConfirm,
}: WithdrawMoneyModalProps) {
  const [step, setStep] = useState<"amount" | "reason">("amount");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [{ Balance }, dispatch] = useDataLayerValue();

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
      date: item.created_at,
    }));
    dispatch({
      type: "SET_TRANSACTIONS",
      Transactions: transactions,
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
    } catch (error) {
      Alert.alert("İşlem sırasında bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setStep("amount");
    setAmount("");
    setReason(null);
    setModalVisible(false);
  };

  const reasons = ["Food", "Market", "Transport", "Bill"];

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
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
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
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
                    reason === option && styles.selectedOption,
                  ]}
                  onPress={() => setReason(option)}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.optionText,
                      reason === option && styles.selectedOptionText,
                    ]}
                  >
                    {option}
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
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
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

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "#fff", width: "80%", padding: 20, borderRadius: 10 },
  modalTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, width: "100%" },
  buttonsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  modalButton: { flex: 1, marginHorizontal: 5, padding: 10, backgroundColor: "#243da3", borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center" },
  optionButton: { padding: 10, marginVertical: 5, borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
  selectedOption: { backgroundColor: "#243da3" },
  optionText: { color: "#000" },
  selectedOptionText: { color: "#fff" },
});

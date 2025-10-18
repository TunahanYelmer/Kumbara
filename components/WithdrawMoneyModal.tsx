// WithdrawMoneyModal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import {getTransactions} from "../api/getTransactions";
import { State, Action } from "../context/reducer";
import { Transactions } from "../context/reducer";
import { useDataLayerValue } from "../context/StateProvider";
import { postTransaction } from "../api/postTransactions";

interface WithdrawMoneyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onConfirm: (amount: number, reason: string) => void;
}

export default function WithdrawMoneyModal({
  modalVisible,
  setModalVisible,
  onConfirm
}: WithdrawMoneyModalProps) {
  const [step, setStep] = useState<"amount" | "reason">("amount");
  const [amount, setAmount] = useState<string>("");
  const [reason, setReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const [{ Balance }, dispatch] = useDataLayerValue();
  const handleWithdrawBalanceUpdate = (newBalance: number) => {
    dispatch({
      type: "SET_BALANCE",
      Balance: newBalance
    } as Action);
  }
  const handleTransactionsUpdate = async  () => {
    const result= await getTransactions();
    const transactions: Transactions[] = result.map((item: any) => ({

      id: item.transaction_id,
      type: item.type,
      amount: item.amount,
      category: item.category,
      date: item.created_at,
    }));

    dispatch({
      type: "SET_TRANSACTIONS",
      Transactions: transactions
    } as Action);
  }
  const reasons = ["Food", "Market", "Transport", "Bill"];

  const handleNextAmount = () => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      setStep("reason");
    }
    else if (numericAmount > Balance) {
      alert("Yetersiz bakiye!");
    } 
    else {
      alert("Lütfen geçerli bir miktar giriniz!");
    }
  };

  const handleConfirmReason = async () => {
    if (!reason) {
      alert("Lütfen bir sebep seçin!");
      return;
    }
    setLoading(true);
    try {
      await postTransaction("withdraw", parseFloat(amount), reason);
      onConfirm(parseFloat(amount), reason);
      setStep("amount");
      setAmount("");
      setReason(null);
      setModalVisible(false);
      handleWithdrawBalanceUpdate(Balance - parseFloat(amount));
      await handleTransactionsUpdate();
    } 
   
      

    catch (e) {
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      alert("İşlem sırasında bir hata oluştu!");
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

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          {step === "amount" ? (
            <>
              <Text style={styles.modalTitle}>Miktar Giriniz</Text>
              <TextInput
                style={styles.input}
                placeholder="Örn: 100"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.modalButton} onPress={handleNextAmount}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity
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
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleConfirmReason}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>{loading ? "..." : "Confirm"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlign: "center"
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#243da3",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  optionButton: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    alignItems: "center"
  },
  selectedOption: {
    backgroundColor: "#243da3",
    borderColor: "#243da3"
  },
  optionText: {
    color: "#000",
    fontWeight: "500"
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

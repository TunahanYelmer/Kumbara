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

  const reasons = ["Food", "Market", "Transport", "Bill"];

  const handleNextAmount = () => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      setStep("reason");
    } else {
      alert("Lütfen geçerli bir miktar giriniz!");
    }
  };

  const handleConfirmReason = () => {
    if (!reason) {
      alert("Lütfen bir sebep seçin!");
      return;
    }
    onConfirm(parseFloat(amount), reason);
    setStep("amount");
    setAmount("");
    setReason(null);
    setModalVisible(false);
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
                <TouchableOpacity style={styles.modalButton} onPress={handleConfirmReason}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={handleCancel}
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

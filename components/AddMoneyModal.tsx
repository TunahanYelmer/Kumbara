import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

interface AddMoneyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function AddMoneyModal({ modalVisible, setModalVisible }: AddMoneyModalProps) {
  const [amount, setAmount] = useState<string>("");

  const handleAddMoney = () => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      console.log("Amount added:", numericAmount);
      // TODO: update balance or call API
      setModalVisible(false);
      setAmount(""); // reset input
    } else {
      alert("Lütfen geçerli bir miktar giriniz!");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Miktar Giriniz</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 100"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.modalButton} onPress={handleAddMoney}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#ccc" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    width: "100%"
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
  }
});

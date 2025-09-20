import React, { FC , useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AddMoneyModal from "./AddMoneyModal";
import WithdrawMoneyModal from ".//WithdrawMoneyModal";

type props = {};

const Transactions: React.FC<props> = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);  
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawData, setWithdrawData] = useState<{ amount: number; reason: string } | null>(null);

  const handleAddMoney = () => {
    setAddModalVisible(true);
  };

  const handleWithdrawMoney = () => {
    setWithdrawModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Add Money Card */}
      <View style={styles.add}>
        <TouchableOpacity style={styles.button} onPress={handleAddMoney}>
          <AddMoneyModal
            modalVisible={addModalVisible}
            setModalVisible={setAddModalVisible}
          />
          <Image source={require("../assets/add.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Para Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Withdraw Money Card */}
      <View style={styles.substract}>
        <TouchableOpacity style={styles.button} onPress={handleWithdrawMoney}>
          <WithdrawMoneyModal
            modalVisible={withdrawModalVisible}
            setModalVisible={setWithdrawModalVisible}
            onConfirm={(amount, reason) => {
              setWithdrawData({ amount, reason });
              console.log("Withdrawn:", amount, "Reason:", reason);
            }}
          />
          <Image source={require("../assets/withdraw.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Para Çıkar</Text>
        </TouchableOpacity>
      </View>

      {/* Optional: Show the withdrawn info */}
      {withdrawData && (
        <Text style={{ marginTop: 10, textAlign: "center" }}>
          Çekilen Miktar: {withdrawData.amount} TL, Sebep: {withdrawData.reason}
        </Text>
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10
  },
  add: {
    color: "#213361",
    flexDirection: "row",
    backgroundColor: "#e6ebfe",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  substract: {
    flexDirection: "row",
    backgroundColor: "#e6ebfe",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#213361",
    fontWeight: "500",
    textAlign: "center"
  },
});

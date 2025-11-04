import React, { FC, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AddMoneyModal from "@components/AddMoneyModal";
import WithdrawMoneyModal from "@/components/WithdrawMoneyModal";

const { width, height } = Dimensions.get("window");

const Transactions: FC = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawData, setWithdrawData] = useState<{ amount: number; reason: string } | null>(null);

  return (
    <View style={styles.container}>
      {/* Add Money */}
      <View style={styles.add}>
        <TouchableOpacity
          testID="add-money-button"
          style={styles.button}
          onPress={() => setAddModalVisible(true)}
        >
          <AddMoneyModal modalVisible={addModalVisible} setModalVisible={setAddModalVisible} />
          <Image source={require("../assets/add.png")} style={styles.icon} />
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
          <Image source={require("../assets/withdraw.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Para Çıkar</Text>
        </TouchableOpacity>
      </View>

      {/* Display withdraw data for test */}
      {withdrawData && (
        <Text testID="withdraw-info">
          Çekilen: {withdrawData.amount} ₺, Sebep: {withdrawData.reason}
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
    margin: width * 0.03,
  },
  add: {
    flexDirection: "row",
    backgroundColor: "#e6ebfe",
    padding: width * 0.025,
    borderRadius: width * 0.07,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  substract: {
    flexDirection: "row",
    backgroundColor: "#e6ebfe",
    padding: width * 0.025,
    borderRadius: width * 0.07,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  icon: {
    width: width * 0.08,
    height: width * 0.08,
    marginRight: width * 0.02,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.02,
  },
  buttonText: {
    color: "#213361",
    fontWeight: "500",
    textAlign: "center",
    fontSize: width * 0.04,
  },
});

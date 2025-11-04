import React, { useState } from "react";
import { Text, StyleSheet, View, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDataLayerValue } from "../../context/StateProvider";
import { DarkTheme } from "@react-navigation/native";
import CurrencyModal from "@_tabs_/settings/CurrencyModal";

export default function SettingsScreen() {
  const [
    { Currency, BioEnabled, PinEnabled, GoalReminder, DailyReminder, DarkMode },
    dispatch
  ] = useDataLayerValue();

  const [modalVisible, setModalVisible] = useState(false);
  const handleCurrencySelections = () => {
    setModalVisible(!modalVisible);
    
  };
  const handleThemeToggle = () => {
    dispatch({
      type: "SET_DARK_MODE"
    });
  };
  const handleDailyNotificationToggle = () => {
    dispatch({
      type: "SET_DAILY_REMINDER"
    });
  };
  const handleGoalNotificationToggle = () => {
    dispatch({
      type: "SET_GOAL_REMİNDER"
    });
  };
  const handlePinToggle = () => {
    dispatch({
      type: "SET_PIN_SECURİTY"
    });
  };
  const handleBiometricToggle = () => {
    dispatch({
      type: "SET_BIO_SECURITY"
    });
  };
  const handleModalClose = () => {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <Text style={styles.settingsTitle}>Ayarlar</Text>

      {/* Currency Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Para Birimi</Text>
        <CurrencyModal modalVisible={modalVisible} onClose={handleModalClose} />
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            console.log(modalVisible);
            handleCurrencySelections();
          }}
        >
          <Text>Para Birimi Seç</Text>
          <Text style={styles.settingValue}>
            <Text style={styles.currencySymbol}>
              {Currency ? Currency[0].symbol : "₺"}
            </Text>{" "}
            <Text style={styles.currencyCode}>
              {Currency ? Currency[0].code : "TRY"}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notification Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Bildirimler</Text>
        <View style={styles.settingItem}>
          <Text>Günlük Hatırlatıcı</Text>
          <Switch
            onValueChange={handleDailyNotificationToggle}
            value={DailyReminder}
          />
        </View>
        <View style={styles.settingItem}>
          <Text>Hedef Bildirimleri</Text>
          <Switch
            onValueChange={handleGoalNotificationToggle}
            value={GoalReminder}
          />
        </View>
      </View>

      {/* Display Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Görünüm</Text>
        <View style={styles.settingItem}>
          <Text>Karanlık Mod</Text>
          <Switch onValueChange={handleThemeToggle} value={DarkMode} />
        </View>
      </View>

      {/* Security Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Güvenlik</Text>
        <View style={styles.settingItem}>
          <Text>Pin ile Kilitle</Text>
          <Switch onValueChange={handlePinToggle} value={PinEnabled} />
        </View>
        <View style={styles.settingItem}>
          <Text>Biyometrik Kilit</Text>
          <Switch onValueChange={handleBiometricToggle} value={BioEnabled} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  container: {},
  settingsText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center"
  },
  settingGroup: {
    backgroundColor: "#fff",
    marginVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 12,
    color: "#243da3"
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0"
  },
  settingValue: {
    color: "#666"
  },
  currencySymbol: {
    fontWeight: "bold"
  },
  currencyCode: {
    color: "#999"
  }
});

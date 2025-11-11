import React, { useState } from "react";
import { Text, StyleSheet, View, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDataLayerValue } from "../../context/state/StateProvider";
import {useTheme} from "@/context/theme/ThemeProvider";
import CurrencyModal from "@_tabs_/settings/CurrencyModal";
import { createSettinsSecreenStyles } from "./styles/SettingsScreen.styles";

export default function SettingsScreen() {
  const [
    { Currency, BioEnabled, PinEnabled, GoalReminder, DailyReminder},
    dispatch
  ] = useDataLayerValue();
  const [ theme , setTheme  ] = useTheme();
  const styles = createSettinsSecreenStyles(theme);

  const [modalVisible, setModalVisible] = useState(false);
  const handleCurrencySelections = () => {
    setModalVisible(!modalVisible);
    
  };
  const handleThemeToggle = () => {
    setTheme(
      { type:"SET_DARK_MODE" }
    );
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
          <Text style={styles.settingValue}>Para Birimi Seç</Text>
          <Text style={styles.settingValue}>
            <Text style={styles.currencySymbol}>
              {Currency ? Currency[0].symbol : "₺"}
            </Text>
            <Text style={styles.currencyCode}>
              {" " + (Currency ? Currency[0].code : "TRY")}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notification Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Bildirimler</Text>
        <View style={styles.settingItem}>
          <Text  style={styles.settingValue}>Günlük Hatırlatıcı</Text>
          <Switch
            onValueChange={handleDailyNotificationToggle}
            value={DailyReminder}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingValue}>Hedef Bildirimleri</Text>
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
          <Text style={styles.settingValue}>Karanlık Mod</Text>
          <Switch onValueChange={handleThemeToggle} value={theme.DarkMode} />
        </View>
      </View>

      {/* Security Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Güvenlik</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingValue}>Pin ile Kilitle</Text>
          <Switch onValueChange={handlePinToggle} value={PinEnabled} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingValue}>Biyometrik Kilit</Text>
          <Switch onValueChange={handleBiometricToggle} value={BioEnabled} />
        </View>
      </View>
    </SafeAreaView>
  );
}


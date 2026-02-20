import React, { useState } from "react";
import { Text, View, Switch, TouchableOpacity, useWindowDimensions, ScrollView } from "react-native";
import { useDataLayerValue } from "../../context/state/StateProvider";
import { useTheme } from "@/context/theme/ThemeProvider";
import CurrencyModal from "@_tabs_/settings/CurrencyModal";
import Navbar from "@/navigation/Navbar/Navbar";
import { createSettinsSecreenStyles, createSettingsIconProps } from "./styles/SettingsScreen.styles";

// Import icons
import UserIcon from "@assets/icons/user.svg";
import BellIcon from "@assets/icons/bell.svg";
import LockIcon from "@assets/icons/lock.svg";
import CreditCardIcon from "@assets/icons/credit-card.svg";
import MoonIcon from "@assets/icons/moon.svg";
import GlobeIcon from "@assets/icons/globe.svg";
import HelpCircleIcon from "@assets/icons/help-circle.svg";
import FileTextIcon from "@assets/icons/file-text.svg";
import LogOutIcon from "@assets/icons/log-out.svg";
import ChevronRightIcon from "@assets/icons/chevron-right.svg";

export default function SettingsScreen() {
  const [
    { Currency, BioEnabled, PinEnabled, GoalReminder, DailyReminder, User },
    dispatch
  ] = useDataLayerValue();
  const [theme, setTheme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createSettinsSecreenStyles(theme, width, height);
  const iconProps = createSettingsIconProps(theme, width, height);

  const [modalVisible, setModalVisible] = useState(false);

  const handleCurrencySelections = () => {
    setModalVisible(!modalVisible);
  };

  const handleThemeToggle = () => {
    setTheme({ type: "SET_DARK_MODE" });
  };

  const handleDailyNotificationToggle = () => {
    dispatch({ type: "SET_DAILY_REMINDER" });
  };

  const handleGoalNotificationToggle = () => {
    dispatch({ type: "SET_GOAL_REMINDER" });
  };

  const handlePinToggle = () => {
    dispatch({ type: "SET_PIN_SECURITY" });
  };

  const handleBiometricToggle = () => {
    dispatch({ type: "SET_BIO_SECURITY" });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout pressed");
  };

  const userName = User?.[0]?.givenName || "Kullanıcı";
  const userEmail = User?.[0]?.email || "user@example.com";

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Screen Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Ayarlar</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <UserIcon {...iconProps.user} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
          </View>
          <ChevronRightIcon {...iconProps.chevronRight} />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap</Text>
          <View style={styles.sectionCard}>
            <TouchableOpacity style={[styles.settingItem, styles.settingItemWithBorder]}>
              <View style={styles.iconContainer}>
                <UserIcon {...iconProps.user} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Profili Düzenle</Text>
              </View>
              <ChevronRightIcon {...iconProps.chevronRight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <CreditCardIcon {...iconProps.creditCard} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Hesap Ayarları</Text>
              </View>
              <ChevronRightIcon {...iconProps.chevronRight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tercihler</Text>
          <View style={styles.sectionCard}>
            <View style={[styles.settingItem, styles.settingItemWithBorder]}>
              <View style={styles.iconContainer}>
                <BellIcon {...iconProps.bell} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Bildirimler</Text>
                <Text style={styles.settingValue}>
                  {DailyReminder && GoalReminder ? "Hepsi açık" :
                   DailyReminder || GoalReminder ? "Kısmen açık" : "Kapalı"}
                </Text>
              </View>
              <ChevronRightIcon {...iconProps.chevronRight} />
            </View>

            <CurrencyModal modalVisible={modalVisible} onClose={handleModalClose} />
            <TouchableOpacity
              style={[styles.settingItem, styles.settingItemWithBorder]}
              onPress={handleCurrencySelections}
            >
              <View style={styles.iconContainer}>
                <GlobeIcon {...iconProps.globe} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Para Birimi</Text>
                <Text style={styles.settingValue}>
                  {Currency ? `${Currency[0].symbol} ${Currency[0].code}` : "₺ TRY"}
                </Text>
              </View>
              <ChevronRightIcon {...iconProps.chevronRight} />
            </TouchableOpacity>

            <View style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <MoonIcon {...iconProps.moon} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Karanlık Mod</Text>
              </View>
              <Switch
                onValueChange={handleThemeToggle}
                value={theme.DarkMode}
                trackColor={{ false: "#E5E7EB", true: theme.StatsHighlightColor }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Güvenlik</Text>
          <View style={styles.sectionCard}>
            <View style={[styles.settingItem, styles.settingItemWithBorder]}>
              <View style={styles.iconContainer}>
                <LockIcon {...iconProps.lock} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>PIN Kilidi</Text>
              </View>
              <Switch
                onValueChange={handlePinToggle}
                value={PinEnabled}
                trackColor={{ false: "#E5E7EB", true: theme.StatsHighlightColor }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <LockIcon {...iconProps.lock} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Biyometrik Güvenlik</Text>
              </View>
              <Switch
                onValueChange={handleBiometricToggle}
                value={BioEnabled}
                trackColor={{ false: "#E5E7EB", true: theme.StatsHighlightColor }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destek</Text>
          <View style={styles.sectionCard}>
            <TouchableOpacity style={[styles.settingItem, styles.settingItemWithBorder]}>
              <View style={styles.iconContainer}>
                <HelpCircleIcon {...iconProps.helpCircle} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Yardım Merkezi</Text>
              </View>
              <ChevronRightIcon {...iconProps.chevronRight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <FileTextIcon {...iconProps.fileText} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Gizlilik Politikası</Text>
              </View>
              <ChevronRightIcon {...iconProps.chevronRight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOutIcon {...iconProps.logOut} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </View>
  );
}

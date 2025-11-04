import { Switch, TouchableOpacity } from "react-native";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDataLayerValue } from "../../context/StateProvider";

const handleThemeToggle = () => {
  dispatch({
    type: "SET_DARK_MODE"
  });
};
const handleNotificationToggle = () => {};
const handlePinToggle = () => {};
const handleBiometricToggle = () => {};

export default function settingsScreen() {
  const [{ Currency, DarkMode }, dispatch] = useDataLayerValue();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <Text style={styles.settingsTitle}>Ayarlar</Text>

      {/* Currency Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Para Birimi</Text>
        <View style={styles.settingItem}>
          <Text>Para Birimi Seç</Text>
          <Text style={styles.settingValue}>
            <Text style={styles.currencySymbol}>
              {Currency ? Currency[0].symbol : "₺"}
            </Text>{" "}
            <Text style={styles.currencyCode}>
              {Currency ? Currency[0].code : "TRY"}
            </Text>
          </Text>
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Bildirimler</Text>
        <View style={styles.settingItem}>
          <Text>Günlük Hatırlatıcı</Text>
          <Switch onValueChange={handleNotificationToggle} />
        </View>
        <View style={styles.settingItem}>
          <Text>Hedef Bildirimleri</Text>
          <Switch onValueChange={handleNotificationToggle} />
        </View>
      </View>

      {/* Display Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Görünüm</Text>
        <View style={styles.settingItem}>
          <Text>Karanlık Mod</Text>
          <Switch onValueChange={handleThemeToggle} />
        </View>
      </View>

      {/* Security Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Güvenlik</Text>
        <View style={styles.settingItem}>
          <Text>Pin ile Kilitle</Text>
          <Switch onValueChange={handlePinToggle} />
        </View>
        <View style={styles.settingItem}>
          <Text>Biyometrik Kilit</Text>
          <Switch onValueChange={handleBiometricToggle} value={true} />
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

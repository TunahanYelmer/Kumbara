// App.tsx
import React from "react";
import { Switch, TouchableOpacity } from 'react-native';
import { Image, Text, StyleSheet, StatusBar as RNStatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "./types";
import { StateProvider } from "./context/StateProvider";


// Your components
import User from "./components/User";
import BalanceCard from "./components/BalanceCard";
import Transactions from "./components/Transactions";
import TransactionHistory from "./components/TransactionHistory";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Type-safe navigator
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <RNStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <User />
        <BalanceCard />
        <Transactions />
        {/* TransactionHistory handles its own FlatList scroll */}
        <TransactionHistory />
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <Text style={styles.settingsTitle}>Ayarlar</Text>
      
      {/* Currency Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Para Birimi</Text>
        <View style={styles.settingItem}>
          <Text>Para Birimi Seç</Text>
          <Text style={styles.settingValue}>₺ TRY</Text>
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Bildirimler</Text>
        <View style={styles.settingItem}>
          <Text>Günlük Hatırlatıcı</Text>
          <Switch />
        </View>
        <View style={styles.settingItem}>
          <Text>Hedef Bildirimleri</Text>
          <Switch />
        </View>
      </View>

      {/* Display Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Görünüm</Text>
        <View style={styles.settingItem}>
          <Text>Karanlık Mod</Text>
          <Switch />
        </View>
      </View>

      {/* Security Settings */}
      <View style={styles.settingGroup}>
        <Text style={styles.groupTitle}>Güvenlik</Text>
        <View style={styles.settingItem}>
          <Text>Pin ile Kilitle</Text>
          <Switch />
        </View>
        <View style={styles.settingItem}>
          <Text>Biyometrik Kilit</Text>
          <Switch />
        </View>
      </View>

    </SafeAreaView>
  );
}


export default function App() {
  return (
    <StateProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#243da3",
            tabBarInactiveTintColor: "#9399b1",
            tabBarStyle: {
              backgroundColor: "#fff",
              height: 50,
              paddingBottom: 10
            }
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Ana Sayfa",
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require("./assets/home.png")}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? "#243da3" : "#9399b1"
                  }}
                />
              )
            }}
          />

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: "Ayarlar",
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require("./assets/settings.png")}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? "#243da3" : "#9399b1"
                  }}
                />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
    </StateProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  container: {
  },
  settingsText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50
  }
  ,
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
  }
});

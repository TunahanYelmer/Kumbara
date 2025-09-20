// App.tsx
import React from "react";
import { Image, Text, StyleSheet, StatusBar as RNStatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "./types";

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
      <Text style={styles.settingsText}>Settings Screen</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
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
});

// App.tsx
import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  StatusBar as RNStatusBar,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "./types";
import { StateProvider } from "./context/StateProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./_tabs_/home/HomeScreen";
import SettingsScreen from "./_tabs_/settings/SettingsScreen";

// Type-safe navigator
const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  console.log("React instance:", React);

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
  }
});

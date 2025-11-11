// App.tsx
import React from "react";
import {
  Image,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "./types";
import { StateProvider } from "@context/state/StateProvider";
import { ThemeProvider, useTheme } from "@/context/theme/ThemeProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./_tabs_/home/HomeScreen";
import SettingsScreen from "./_tabs_/settings/SettingsScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
  const [theme] = useTheme();

  const styles = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: theme.BackgroundColor,
      height: 50,
      paddingBottom: 10,
      borderTopColor: theme.HiglightColor,
      borderTopWidth: 1,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.TabActiveColor,
        tabBarInactiveTintColor: theme.TabButtonInactiveColour,
        tabBarStyle: styles.tabBarStyle,
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
                tintColor: focused
                  ? theme.TabIconColour
                  : theme.TabButtonInactiveColour,
              }}
            />
          ),
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
                tintColor: focused
                  ? theme.TabIconColour
                  : theme.TabButtonInactiveColour,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function AppContent() {
  return (
    <StateProvider>
      <GestureHandlerRootView style={{ flex: 1 , }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </StateProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent  />
    </ThemeProvider>
  );
}
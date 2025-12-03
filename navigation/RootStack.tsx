// navigation/RootStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import NotificationScreen from "@/screens/notifications/NotificationScreen";

import { RootStackParamList } from "./NavigationTypes";
import HomeScreen from "@/_tabs_/home/HomeScreen";
import SettingsScreen from "@/_tabs_/settings/SettingsScreen";
import AuthScreen from "@/screens/auth/AuthScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
    >
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

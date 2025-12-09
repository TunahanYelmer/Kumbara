// navigation/RootStack.tsx
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import NotificationScreen from "@/screens/notifications/NotificationScreen";

import { RootStackParamList } from "./NavigationTypes";
import HomeScreen from "@/_tabs_/home/HomeScreen";
import SettingsScreen from "@/_tabs_/settings/SettingsScreen";
import AuthScreen from "@/screens/auth/AuthScreen";
import { isAuthenticated } from "@/utils/auth";
import { ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);
      setIsLoading(false);
    };
    checkAuth();
  }, []);
  if (isLoading) {
    // Show loading screen while checking auth
    return <ActivityIndicator />;
  }
  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "Home" : "AuthScreen"}
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
    >
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

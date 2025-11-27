// navigation/RootStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@/context/theme/ThemeProvider";

import TabNavigator from "./TabNavigator";
import NotificationScreen from "@/screens/notifications/NotificationScreen";

import { RootStackParamList } from "./NavigationTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const [theme] = useTheme();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          headerShown: true,
          title: 'Bildirimler',
          headerStyle: {
            backgroundColor: theme.BalanceCardColor[0], // Use theme color
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

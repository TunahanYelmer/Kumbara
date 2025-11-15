import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "@/navigation/RootStack";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import { StateProvider } from "@context/state/StateProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationProvider } from "./context/navigation/NavigationProvider";
import { navigationRef } from "./navigation/NavigationTypes";

export default function App() {
  return (
    <ThemeProvider>
      <StateProvider>
        <NavigationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer ref={navigationRef}>
              <RootStack />
            </NavigationContainer>
          </GestureHandlerRootView>
        </NavigationProvider>
      </StateProvider>
    </ThemeProvider>
  );
}

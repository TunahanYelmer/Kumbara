import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "@/navigation/RootStack";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import { StateProvider } from "@context/state/StateProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationProvider } from "./context/navigation/NavigationProvider";
import { navigationRef } from "./navigation/NavigationTypes";
import Navbar from "@navigation/Navbar/Navbar";
import User from "@components/User/User";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StateProvider>
          <NavigationProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaView
                style={{ flex: 1 }}
                edges={["top", "left", "right"]}
              >
                <NavigationContainer ref={navigationRef}>
                  <User />
                  <RootStack />
                  <Navbar />
                </NavigationContainer>
              </SafeAreaView>
            </GestureHandlerRootView>
          </NavigationProvider>
        </StateProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

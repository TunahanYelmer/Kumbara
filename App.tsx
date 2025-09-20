import React, { FC } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import User from "./components/User";
import BalanceCard from "./components/BalanceCard";

const App: FC = () => {
  return (
    <View >
      <Text >
        Open up App.tsx to start working on your app!
      </Text>
      <User />
      <BalanceCard />
      <StatusBar  />
    </View>
  );
};

export default App;

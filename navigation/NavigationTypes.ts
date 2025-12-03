import { createNavigationContainerRef } from "@react-navigation/native";

export type RootStackParamList = {
  AuthScreen: undefined;
  Home: undefined;
  Notifications: undefined;
  Settings: undefined;
  Tabs: undefined;
  Profile: undefined;
  // add more here...
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

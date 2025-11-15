import { createNavigationContainerRef } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  Settings: undefined;
  Tabs:undefined;
  Profile: undefined;
  // add more here...
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

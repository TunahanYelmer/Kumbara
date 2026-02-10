import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import React from "react";
import { useTheme } from "@context/theme/ThemeProvider";
import NotificationBellIcon from "@assets/icons/notificationsBell.svg";
import { createNotificationStyles } from "./styles/Notifications.styles";
import { useNavigationContext } from "@context/navigation/NavigationProvider";

const Notifications = () => {
  const { navigate } = useNavigationContext();
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createNotificationStyles(theme, width, height);
  const icon = theme.DarkMode
    ? require("@assets/icons/notification-white.png")
    : require("@assets/icons/notification.png");

  const handleNavigation = () => {
    navigate("Notifications");
  };

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.button} onPress={handleNavigation}>
        <NotificationBellIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Notifications;

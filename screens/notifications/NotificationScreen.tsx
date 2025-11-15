import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createNotificationScreenStyles } from "./styles/NotificationScreen.styles";

const { width, height } = Dimensions.get("window");

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
};

const notificationsData: NotificationItem[] = [
  {
    id: "1",
    title: "New Message",
    description: "You received a new message from John.",
    time: "2 min ago"
  },
  {
    id: "2",
    title: "Payment Received",
    description: "Your payment of $50 has been received.",
    time: "1 hour ago"
  },
  {
    id: "3",
    title: "Update Available",
    description: "A new app version is available. Update now.",
    time: "Yesterday"
  }
  // add more dummy notifications here
];

const NotificationScreen = () => {
  const [theme] = useTheme();
  const styles = createNotificationScreenStyles(theme);

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationScreen;

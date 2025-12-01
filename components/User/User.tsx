import React, { FC } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { createUserStyles } from "./styles/User.styles";
import { useTheme } from "@/context/theme/ThemeProvider";
import Notifications from "@/components/notifications/Notifications";

const { width } = Dimensions.get("window");

const User: FC = () => {
  const [theme] = useTheme();

  const styles = createUserStyles(theme, width);
  return (
    <View style={styles.userContainer}>
      <View style={styles.userIcon}>
        <View>
          <Image
            source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
            style={styles.userImage}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userLabel}>UserName</Text>
          <Text style={styles.userWelcome}>Welcome Back!!</Text>
        </View>
      </View>
      <View>
        <Notifications />
      </View>
    </View>
  );
};

export default User;

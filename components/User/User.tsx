import React, { FC } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { createUserStyles } from "./styles/User.styles";
import { useTheme } from "@/context/theme/ThemeProvider";
import { useDataLayerValue } from "@/context/state/StateProvider";
import Notifications from "@/components/notifications/Notifications";

const { width } = Dimensions.get("window");

const User: FC = () => {
  const [theme] = useTheme();
  const [{ User }] = useDataLayerValue();
  const photo = User?.[0]?.photo;
  const givenName = User?.[0]?.givenName;
  const styles = createUserStyles(theme, width);
  return (
    <View style={styles.userContainer}>
      <View style={styles.userIcon}>
        <View>
          <Image
            source={{ uri: photo ?? undefined }}
            style={styles.userImage}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userLabel}>{givenName}</Text>
          <Text style={styles.userWelcome}>Hoşgeldin !!</Text>
        </View>
      </View>
      <View>
        <Notifications />
      </View>
    </View>
  );
};

export default User;

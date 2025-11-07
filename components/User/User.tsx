import React, { FC } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { createUserStyles } from "./styles/User.styles";

const { width } = Dimensions.get("window");

const User: FC = () => {
  const styles = createUserStyles(width);
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
          style={styles.image}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>UserName</Text>
        <Text style={styles.welcome}>Welcome Back!!</Text>
      </View>
    </View>
  );
};

export default User;

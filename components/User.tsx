import React, { FC } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const User: FC = () => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: width * 0.04, // ✅ responsive margin
  },
  image: {
    width: width * 0.15, // ✅ 15% of screen width
    height: width * 0.15,
    borderRadius: width * 0.075, // ✅ keeps circle shape
    marginRight: width * 0.03,
  },
  info: {
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    fontSize: width * 0.045, // ✅ responsive font
  },
  welcome: {
    fontSize: width * 0.04,
    color: "#555",
  },
});

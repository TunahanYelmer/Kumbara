import React, { FC } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const User: FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: "https://picsum.photos/seed/picsum/200/300" }} // Replace with your image URL
          style={styles.image}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>UserName</Text>
        <Text>Welcome Back!!</Text>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
  },
});

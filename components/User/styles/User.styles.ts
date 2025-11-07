import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createUserStyles = (width : number) =>

       StyleSheet.create({
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

 
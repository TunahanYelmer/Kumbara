import { StyleSheet } from "react-native";
import { Theme}from "@context/theme/themeReducer" // or wherever your Theme type is

export const createUserStyles = (theme : Theme ,width : number) =>

       StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: width * 0.015, // ✅ responsive margin
    backgroundColor:theme.UserBackgroundColor // ✅ responsive margin
  },
  userIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: width * 0.15, // ✅ 15% of screen width
    height: width * 0.15,
    borderRadius: width * 0.075, // ✅ keeps circle shape
    marginRight: width * 0.03,
  },
  userInfo: {
    flexDirection: "column",
  },
  userLabel: {
    fontWeight: "bold",
    fontSize: width * 0.045, // ✅ responsive font
  },
  userWelcome: {
    fontSize: width * 0.04,
    color: "#555",
  },
});

 
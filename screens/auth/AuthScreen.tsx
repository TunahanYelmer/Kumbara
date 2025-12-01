import { Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createAuthScreenStyles } from "./styles/AuthScreen.styles";

const { width } = Dimensions.get("window");

const AuthScreen = () => {
  const [theme] = useTheme();
  const styles = createAuthScreenStyles(theme, width);

  const handleGoogleSignIn = () => {
    console.log("Google Sign In pressed");
    // TODO: Implement Google authentication
  };

  const handleAppleSignIn = () => {
    console.log("Apple Sign In pressed");
    // TODO: Implement Apple authentication
  };

  const handleGuestMode = () => {
    console.log("Continue as guest");
    // TODO: Navigate to main app without auth
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.appName}>Kumbara</Text>
        <Text style={styles.welcomeTitle}>Hoş Geldiniz</Text>
        <Text style={styles.welcomeSubtitle}>
          Tasarruf yolculuğunuza başlamak için giriş yapın
        </Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        {/* Google Sign In Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
        >
          <Text style={styles.googleButtonText}>Google ile Giriş Yap</Text>
        </TouchableOpacity>

        {/* Apple Sign In Button */}
        <TouchableOpacity
          style={styles.appleButton}
          onPress={handleAppleSignIn}
          activeOpacity={0.8}
        >
          <Text style={styles.appleButtonText}>Apple ile Giriş Yap</Text>
        </TouchableOpacity>
      </View>

      {/* Guest Mode Option */}
      <TouchableOpacity
        style={styles.guestButton}
        onPress={handleGuestMode}
        activeOpacity={0.7}
      >
        <Text style={styles.guestButtonText}>Misafir olarak devam et</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

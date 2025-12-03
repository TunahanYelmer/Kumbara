import { Text, View, TouchableOpacity, Dimensions, Alert } from "react-native";
import React from "react";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createAuthScreenStyles } from "./styles/AuthScreen.styles";
import { authenticateWithGoogle } from "@api/googleAuth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";
import { storeToken } from "@/utils/auth";

const { width } = Dimensions.get("window");

const AuthScreen = () => {
  const [theme] = useTheme();
  const styles = createAuthScreenStyles(theme, width);

  const handleGoogleSignIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true
      });

      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      console.log("Google Sign In successful!", userInfo);

      const googleIdToken = userInfo.data?.idToken;
      if (!googleIdToken) {
        throw new Error("No ID token received from Google");
      }

      console.log("Got Google ID token, sending to backend...");
      const jwtToken = await authenticateWithGoogle(googleIdToken);

      await storeToken(jwtToken);
      console.log("Authentication complete! JWT token stored.");

      Alert.alert("Success", "Successfully signed in!");
      // TODO: Navigate to main app
    } catch (error: any) {
      console.error("Google Sign In error:", error);

      if (error.code === 'SIGN_IN_CANCELLED') {
        Alert.alert("Cancelled", "Sign in was cancelled");
      } else if (error.code === 'IN_PROGRESS') {
        Alert.alert("In Progress", "Sign in is already in progress");
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        Alert.alert("Error", "Google Play Services not available");
      } else {
        Alert.alert("Error", `Sign in failed: ${error.message || 'Unknown error'}`);
      }
    }
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

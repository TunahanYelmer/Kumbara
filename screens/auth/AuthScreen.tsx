import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createAuthScreenStyles } from "./styles/AuthScreen.styles";
import { authenticateWithGoogle } from "@api/googleAuth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getToken, storeToken, storeUser } from "@/utils/auth";
import { useNavigationContext } from "@context/navigation/NavigationProvider";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { patchUser } from "@/api/patchUser";
import HomeScreen from "@/_tabs_/home/HomeScreen";
import User from "@/components/User/User";

const { width } = Dimensions.get("window");

/**
 * AuthScreen Component
 * --------------------
 * The authentication screen providing multiple sign-in options:
 * - Google Sign-In (OAuth)
 * - Apple Sign-In (TODO)
 * - Guest mode access
 *
 * Handles the complete Google OAuth flow including token exchange with backend.
 */
const AuthScreen = () => {
  const [theme] = useTheme();
  const styles = createAuthScreenStyles(theme, width);
  const { navigate } = useNavigationContext();
  const [, dispatch] = useDataLayerValue();

  /**
   * Handles Google Sign-In authentication flow:
   * 1. Configures Google Sign-In with web client ID
   * 2. Triggers Google's sign-in UI
   * 3. Receives Google ID token on success
   * 4. Sends token to backend for JWT exchange
   * 5. Stores JWT token locally for authenticated requests
   */
  const handleGoogleSignIn = async () => {
    try {
      const googleWebClientId = Constants.expoConfig?.extra?.googleWebClientId;
      if (!googleWebClientId) {
        Alert.alert("Error", "Google Client ID not configured");
        return;
      }

      GoogleSignin.configure({
        webClientId: googleWebClientId,
        offlineAccess: true
      });

      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
      }

      const user = userInfo.data?.user;
      const email = user?.email;
      const name = user?.name;
      const givenName = user?.givenName;
      const photo = user?.photo;
      const id = user?.id;

      if (user) {
        try {
          await storeUser(email, name, givenName, photo, id);
          dispatch({
            type: "SET_AUTH_USER",
            User: [{ email, name, givenName, photo, id }]
          });
        } catch (error) {
          console.error("Error storing user:", error);
          throw error;
        }
      }

      const googleIdToken = userInfo.data?.idToken;
      if (!googleIdToken) {
        throw new Error("No ID token received from Google");
      }

      const jwtToken = await authenticateWithGoogle(googleIdToken);
      await storeToken(jwtToken);
      if (givenName && photo) {
        await patchUser(givenName, photo, jwtToken);
      }

      Alert.alert("Success", "Successfully signed in!");
      navigate("Home");
    } catch (error: any) {
      console.error("Google Sign In error:", error);

      if (error.code === "SIGN_IN_CANCELLED") {
        Alert.alert("Cancelled", "Sign in was cancelled");
      } else if (error.code === "IN_PROGRESS") {
        Alert.alert("In Progress", "Sign in is already in progress");
      } else if (error.code === "PLAY_SERVICES_NOT_AVAILABLE") {
        Alert.alert("Error", "Google Play Services not available");
      } else {
        Alert.alert(
          "Error",
          `Sign in failed: ${error.message || "Unknown error"}`
        );
      }
    }
  };

  /**
   * Handles Apple Sign-In authentication (not yet implemented)
   * TODO: Implement Apple OAuth flow
   */
  const handleAppleSignIn = () => {
    console.log("Apple Sign In pressed");
    // TODO: Implement Apple authentication
  };

  /**
   * Allows user to continue without authentication
   * TODO: Navigate to main app with limited functionality
   */
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

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useWindowDimensions,
  Animated,
} from "react-native";
import Constants from "expo-constants";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createAuthScreenStyles } from "./styles/AuthScreen.styles";
import { authenticateWithGoogle } from "@api/googleAuth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { storeToken, storeUser } from "@/utils/auth";
import { useNavigationContext } from "@context/navigation/NavigationProvider";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { patchUser } from "@/api/patchUser";

// Import icons
import PiggyBankIcon from "@assets/icons/piggy-bank.svg";
import UserIcon from "@assets/icons/user.svg";
import LockIcon from "@assets/icons/lock.svg";
import CheckIcon from "@assets/icons/check.svg";
import MailIcon from "@assets/icons/mail.svg";
import EyeIcon from "@assets/icons/eye.svg";
import EyeOffIcon from "@assets/icons/eye-off.svg";
import GoogleIcon from "@assets/icons/google.svg";
import AppleIcon from "@assets/icons/apple.svg";

const AuthScreen = () => {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createAuthScreenStyles(theme, width, height);
  const { navigate } = useNavigationContext();
  const [, dispatch] = useDataLayerValue();

  // Form state
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation
  const fadeAnim = useState(new Animated.Value(1))[0];

  const toggleAuthMode = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setIsLogin(!isLogin);
  };

  const isValid = () => {
    if (isLogin) {
      return email.length > 0 && password.length > 0;
    }
    return name.length > 0 && email.length > 0 && password.length > 0 && agreeTerms;
  };

  const handleEmailSignIn = () => {
    setIsLoading(true);
    // TODO: Implement email/password authentication
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Bilgi", "E-posta ile giriş yakında eklenecek");
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleWebClientId = Constants.expoConfig?.extra?.googleWebClientId;
      if (!googleWebClientId) {
        Alert.alert("Hata", "Google Client ID yapılandırılmamış");
        return;
      }

      GoogleSignin.configure({
        webClientId: googleWebClientId,
        offlineAccess: true,
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const user = userInfo.data?.user;
      const email = user?.email;
      const name = user?.name;
      const givenName = user?.givenName;
      const photo = user?.photo;
      const id = user?.id;

      if (user) {
        await storeUser(email, name, givenName, photo, id);
        dispatch({
          type: "SET_AUTH_USER",
          User: [{ email, name, givenName, photo, id }],
        });
      }

      const googleIdToken = userInfo.data?.idToken;
      if (!googleIdToken) {
        throw new Error("Google'dan ID token alınamadı");
      }

      const jwtToken = await authenticateWithGoogle(googleIdToken);
      await storeToken(jwtToken);

      if (givenName && photo) {
        await patchUser(givenName, photo, jwtToken);
      }

      Alert.alert("Başarılı", "Giriş yapıldı!");
      navigate("Home");
    } catch (error: any) {
      console.error("Google Sign In error:", error);

      if (error.code === "SIGN_IN_CANCELLED") {
        Alert.alert("İptal", "Giriş iptal edildi");
      } else if (error.code === "IN_PROGRESS") {
        Alert.alert("İşlem Sürüyor", "Giriş zaten devam ediyor");
      } else if (error.code === "PLAY_SERVICES_NOT_AVAILABLE") {
        Alert.alert("Hata", "Google Play Hizmetleri kullanılamıyor");
      } else {
        Alert.alert("Hata", `Giriş başarısız: ${error.message || "Bilinmeyen hata"}`);
      }
    }
  };

  const handleAppleSignIn = () => {
    Alert.alert("Bilgi", "Apple ile giriş yakında eklenecek");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <PiggyBankIcon width={40} height={40} fill="#FFFFFF" stroke="#FFFFFF" />
          </View>
          <Text style={styles.appName}>Kumbara</Text>
          <Text style={styles.tagline}>
            {isLogin ? "Tekrar hoş geldiniz!" : "Tasarruf yolculuğunuza başlayın"}
          </Text>
        </View>

        {/* Auth Card */}
        <Animated.View style={[styles.authCard, { opacity: fadeAnim }]}>
          {/* Toggle Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.tabActive]}
              onPress={() => !isLogin && toggleAuthMode()}
              accessibilityLabel="Giriş Yap"
              accessibilityRole="tab"
              accessibilityState={{ selected: isLogin }}
            >
              <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.tabActive]}
              onPress={() => isLogin && toggleAuthMode()}
              accessibilityLabel="Kayıt Ol"
              accessibilityRole="tab"
              accessibilityState={{ selected: !isLogin }}
            >
              <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>
                Kayıt Ol
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Field (Register only) */}
            {!isLogin && (
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <UserIcon width={20} height={20} stroke={theme.StatsLabelColor} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Ad Soyad"
                  placeholderTextColor={theme.StatsLabelColor}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  accessibilityLabel="Ad Soyad"
                  accessibilityHint="Tam adınızı girin"
                />
              </View>
            )}

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <MailIcon width={20} height={20} stroke={theme.StatsLabelColor} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="E-posta Adresi"
                placeholderTextColor={theme.StatsLabelColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="E-posta Adresi"
                accessibilityHint="E-posta adresinizi girin"
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <LockIcon width={20} height={20} stroke={theme.StatsLabelColor} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor={theme.StatsLabelColor}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                accessibilityLabel="Şifre"
                accessibilityHint="Şifrenizi girin"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                accessibilityRole="button"
                accessibilityHint="Şifre görünürlüğünü değiştir"
              >
                {showPassword ? (
                  <EyeOffIcon width={20} height={20} stroke={theme.StatsLabelColor} />
                ) : (
                  <EyeIcon width={20} height={20} stroke={theme.StatsLabelColor} />
                )}
              </TouchableOpacity>
            </View>

            {/* Remember Me / Forgot Password */}
            {isLogin ? (
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                  accessibilityLabel="Beni hatırla"
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: rememberMe }}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                    {rememberMe && (
                      <CheckIcon width={12} height={12} fill="#FFFFFF" stroke="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.rememberText}>Beni hatırla</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityLabel="Şifremi Unuttum"
                  accessibilityRole="button"
                  accessibilityHint="Şifre sıfırlama sayfasına git"
                >
                  <Text style={styles.forgotText}>Şifremi Unuttum?</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAgreeTerms(!agreeTerms)}
                accessibilityLabel="Kullanım Şartları ve Gizlilik Politikasını kabul ediyorum"
                accessibilityRole="checkbox"
                accessibilityState={{ checked: agreeTerms }}
              >
                <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
                  {agreeTerms && (
                    <CheckIcon width={12} height={12} fill="#FFFFFF" stroke="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.termsText}>
                  <Text style={styles.termsLink}>Kullanım Şartları</Text> ve{" "}
                  <Text style={styles.termsLink}>Gizlilik Politikası</Text>'nı kabul ediyorum
                </Text>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitBtn,
                !isValid() && styles.submitBtnDisabled,
                isLoading && styles.submitBtnLoading,
              ]}
              onPress={handleEmailSignIn}
              disabled={!isValid() || isLoading}
              accessibilityLabel={isLogin ? "Giriş Yap" : "Hesap Oluştur"}
              accessibilityRole="button"
              accessibilityState={{ disabled: !isValid() || isLoading, busy: isLoading }}
              accessibilityHint={isLogin ? "E-posta ile giriş yap" : "Yeni hesap oluştur"}
            >
              <Text style={styles.submitText}>
                {isLoading ? "Lütfen bekleyin..." : isLogin ? "Giriş Yap" : "Hesap Oluştur"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={handleGoogleSignIn}
              accessibilityLabel="Google ile giriş yap"
              accessibilityRole="button"
              accessibilityHint="Google hesabınız ile giriş yapın"
            >
              <GoogleIcon width={24} height={24} fill={theme.StatsValueColor} stroke={theme.StatsValueColor} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialBtn}
              onPress={handleAppleSignIn}
              accessibilityLabel="Apple ile giriş yap"
              accessibilityRole="button"
              accessibilityHint="Apple hesabınız ile giriş yapın"
            >
              <AppleIcon width={24} height={24} fill={theme.StatsValueColor} stroke={theme.StatsValueColor} />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Bottom Text */}
        <View style={styles.bottomText}>
          <Text style={styles.bottomTextPrimary}>
            {isLogin ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
          </Text>
          <TouchableOpacity
            onPress={toggleAuthMode}
            accessibilityLabel={isLogin ? "Kayıt Ol" : "Giriş Yap"}
            accessibilityRole="button"
            accessibilityHint={isLogin ? "Kayıt ekranına geç" : "Giriş ekranına geç"}
          >
            <Text style={styles.bottomTextLink}>
              {isLogin ? "Kayıt Ol" : "Giriş Yap"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

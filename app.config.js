import "dotenv/config";

export default {
  expo: {
    name: "Kumbara",
    slug: "Kumbara",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tunahanyelmer.kumbara"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.tunahanyelmer.kumbara"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-sqlite",
      [
        "@react-native-google-signin/google-signin",
        // Only include iosUrlScheme if it's defined in .env
        process.env.GOOGLE_IOS_URL_SCHEME
          ? { iosUrlScheme: process.env.GOOGLE_IOS_URL_SCHEME }
          : {}
      ]
    ],
    extra: {
      eas: {
        projectId: "d1e79307-cbde-4bc3-8c05-23b831f6d084"
      },
      googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
      googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      apiBaseUrl: process.env.API_BASE_URL
    }
  }
};

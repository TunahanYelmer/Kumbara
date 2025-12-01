import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { useNavigationContext } from "@context/navigation/NavigationProvider";
import { createNavbarStyles } from "./styles/Navbar.styles";
import { useDataLayerValue } from "@/context/state/StateProvider";

interface NavbarProps {
  component?: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
}

function Navbar() {
  const [theme] = useTheme();
  const { navigate } = useNavigationContext();
  const [{ ActiveTab }, dispatch] = useDataLayerValue();

  const styles = createNavbarStyles(theme, ActiveTab);

  const handleHomeScreenNavigation = () => {
    dispatch({
      type: "SET_ACTIVE_TAB",
      ActiveTab: "Home"
    });
    navigate("Home");
  };
  const handleSettingsScreenNavigation = () => {
    dispatch({
      type: "SET_ACTIVE_TAB",
      ActiveTab: "Settings"
    });
    navigate("Settings");
  };
  const icons = {
    home: !theme.DarkMode
      ? require("@assets/home.png")
      : require("@assets/home-white.png"),
    settings: !theme.DarkMode
      ? require("@assets/settings.png")
      : require("@assets/settings-white.png")
  };

  return (
    <View testID="navbar" style={styles.navbarContainer}>
      <View testID="home-screen" id="Home">
        <TouchableOpacity
          testID="home-button"
          onPress={handleHomeScreenNavigation}
        >
          <View testID={"home-icon-container"} style={styles.homeIconContainer}>
            <Image source={icons.home} style={styles.homeScreenImage} />
            <Text testID="home-icon-text" style={styles.homeIconText}>
              Ana Sayfa
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View testID="settings-screen" id="Settings">
        <TouchableOpacity
          testID="settings-button"
          onPress={handleSettingsScreenNavigation}
        >
          <View
            testID={"settings-icon-container"}
            style={styles.settinsIconContainer}
          >
            <Image source={icons.settings} style={styles.settingsImage} />
            <Text style={styles.settingsIconText}> Ayarlar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Navbar;

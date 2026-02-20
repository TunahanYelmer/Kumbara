import React from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { useNavigationContext } from "@context/navigation/NavigationProvider";
import { createNavbarStyles } from "./styles/Navbar.styles";
import { useDataLayerValue } from "@/context/state/StateProvider";

// Import SVG icons
import HomeIcon from "@assets/icons/home.svg";
import StatsIcon from "@assets/icons/stats.svg";
import GoalsIcon from "@assets/icons/goals.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import PlusIcon from "@assets/icons/plus.svg";

const { width, height } = Dimensions.get("window");

function Navbar() {
  const [theme] = useTheme();
  const { navigate } = useNavigationContext();
  const [{ ActiveTab }, dispatch] = useDataLayerValue();

  const styles = createNavbarStyles(theme, ActiveTab, width, height);

  const handleNavigation = (tab: string) => {
    dispatch({
      type: "SET_ACTIVE_TAB",
      ActiveTab: tab,
    });
    navigate(tab);
  };

  const handleAddAction = () => {
    navigate("Add");
  };

  const isActive = (tab: string) => ActiveTab === tab;

  return (
    <View testID="navbar" style={styles.navbarContainer}>
      {/* Home Tab */}
      <TouchableOpacity
        testID="home-button"
        onPress={() => handleNavigation("Home")}
        style={styles.tabButton}
        activeOpacity={0.7}
        accessibilityLabel="Ana Sayfa"
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive("Home") }}
        accessibilityHint="Ana sayfa ekranına git"
      >
        <View style={[styles.iconContainer, isActive("Home") && styles.activeIconContainer]}>
          <HomeIcon
            width={18}
            height={18}
            fill={isActive("Home") ? theme.NavbarIconActiveColor : theme.NavbarIconInactiveColor}
            stroke={isActive("Home") ? theme.NavbarIconActiveColor : theme.NavbarIconInactiveColor}
          />
        </View>
        <Text style={[styles.tabText, isActive("Home") && styles.activeTabText]}>
          Ana Sayfa
        </Text>
        {isActive("Home") && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      {/* Stats Tab */}
      <TouchableOpacity
        testID="stats-button"
        onPress={() => handleNavigation("Stats")}
        style={styles.tabButton}
        activeOpacity={0.7}
        accessibilityLabel="İstatistik"
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive("Stats") }}
        accessibilityHint="İstatistikler ekranına git"
      >
        <View style={[styles.iconContainer, isActive("Stats") && styles.activeIconContainer]}>
          <StatsIcon
            width={18}
            height={18}
            fill={isActive("Stats") ? theme.NavbarIconActiveColor : theme.NavbarIconInactiveColor}
            stroke={isActive("Stats") ? theme.NavbarIconActiveColor : theme.NavbarIconInactiveColor}
          />
        </View>
        <Text style={[styles.tabText, isActive("Stats") && styles.activeTabText]}>
          İstatistik
        </Text>
        {isActive("Stats") && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      {/* Center FAB - Add Button */}
      <TouchableOpacity
        testID="add-button"
        onPress={handleAddAction}
        style={styles.fabButton}
        activeOpacity={0.8}
        accessibilityLabel="Para Ekle"
        accessibilityRole="button"
        accessibilityHint="Yeni işlem eklemek için dokunun"
      >
        <View style={styles.fabIconContainer}>
          <PlusIcon
            width={24}
            height={24}
            fill="#FFFFFF"
            stroke="#FFFFFF"
          />
        </View>
      </TouchableOpacity>

      {/* Goals Tab */}
      <TouchableOpacity
        testID="goals-button"
        onPress={() => handleNavigation("Goals")}
        style={styles.tabButton}
        activeOpacity={0.7}
        accessibilityLabel="Hedefler"
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive("Goals") }}
        accessibilityHint="Hedefler ekranına git"
      >
        <View style={[styles.iconContainer, isActive("Goals") && styles.activeIconContainer]}>
          <GoalsIcon
            width={18}
            height={18}
            fill={isActive("Goals") ? theme.NavbarIconActiveColor : theme.NavbarIconInactiveColor}
            stroke={isActive("Goals") ? theme.NavbarIconActiveColor : theme.NavbarIconInactiveColor}
          />
        </View>
        <Text style={[styles.tabText, isActive("Goals") && styles.activeTabText]}>
          Hedefler
        </Text>
        {isActive("Goals") && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      {/* Settings Tab */}
      <TouchableOpacity
        testID="settings-button"
        onPress={() => handleNavigation("Settings")}
        style={styles.tabButton}
        activeOpacity={0.7}
        accessibilityLabel="Ayarlar"
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive("Settings") }}
        accessibilityHint="Ayarlar ekranına git"
      >
        <View style={[styles.iconContainer, isActive("Settings") && styles.activeIconContainer]}>
          <SettingsIcon
            width={18}
            height={18}
            fill={isActive("Settings") ? theme.NavbarIconActiveColor : theme.NavbarIconInactiveColor}
            stroke={isActive("Settings") ? theme.NavbarIconActiveColor : theme.NavbarIconInactiveColor}
          />
        </View>
        <Text style={[styles.tabText, isActive("Settings") && styles.activeTabText]}>
          Ayarlar
        </Text>
        {isActive("Settings") && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
}

export default Navbar;

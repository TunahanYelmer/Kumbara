import React, { FC, useState } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Modal
} from "react-native";
import { createUserStyles, createUserIconProps } from "./styles/User.styles";
import { useTheme } from "@/context/theme/ThemeProvider";
import { useAuthContext } from "@/context/auth/AuthProvider";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { useNavigationContext } from "@context/navigation/NavigationProvider";
import { useCalculateSavings } from "@/hooks/useCalculateSavings";
import ChartIcon from "@assets/icons/chart.svg";
import FlameIcon from "@assets/icons/flame.svg";
import TrendArrowIcon from "@assets/icons/trendArrow.svg";
import UserIcon from "@assets/icons/user.svg";
import BellIcon from "@assets/icons/bell.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import LogOutIcon from "@assets/icons/log-out.svg";
import WalletIcon from "@assets/icons/wallet.svg";
import WithdrawIcon from "@assets/icons/withdraw.svg";
import Notifications from "@/components/notifications/Notifications";

/**
 * User Component
 * --------------
 * Displays the user profile header section with personalized information and savings insights.
 *
 * Features:
 * - Personalized welcome message with user's name
 * - Streak counter with animated flame icon showing consecutive savings days
 * - Savings insight displaying percentage increase/decrease in monthly savings
 * - Notification bell icon for accessing notification screen
 * - Fully theme-aware (supports light/dark mode)
 * - Responsive design using design system spacing and typography
 *
 * Design Pattern:
 * - Uses centralized theme provider for all colors
 * - SVG icons configured via createUserIconProps (fill, stroke, size)
 * - All styles defined in separate User.styles.ts file
 * - Follows design system: spacing(), typography(), iconSizes()
 *
 * Data Sources:
 * - Theme: Retrieved from ThemeProvider context
 * - User data: Retrieved from StateProvider global state
 * - Screen dimensions: Retrieved from useWindowDimensions hook
 *
 * Layout Structure:
 * ```
 * userContainer (horizontal layout)
 * ├── userHeader (main content area)
 * │   ├── userGreating (welcome + streak badge)
 * │   │   ├── userWelcome (greeting text)
 * │   │   └── userStreak (flame icon + days count)
 * │   └── userInsight (trend arrow + savings message)
 * └── userIconContainer (notification area)
 *     └── userIcon (notification bell)
 * ```
 *
 * TODO: Replace hardcoded values with dynamic data
 * - "Hi, Alex!" should use actual user's givenName from state
 * - "12 days" should come from backend/database streak calculation
 * - "23%" savings increase should be calculated from transaction history
 *
 * @returns {JSX.Element} User profile header component
 */
const User: FC = () => {
  // Get current theme (light/dark mode) from context
  const [theme] = useTheme();
  const [{ userToken }] = useAuthContext();
  const savings = useCalculateSavings(userToken);

  // Get responsive screen dimensions for design system calculations
  const { width, height } = useWindowDimensions();

  // Extract user data from global state (single-user app, always index 0)
  const [{ User }] = useDataLayerValue();
  const photo = User?.[0]?.photo; // User profile photo URL (currently unused)
  const givenName = User?.[0]?.givenName; // User's first name (currently unused - see TODO below)

  // Navigation context for dropdown menu actions
  const { navigate } = useNavigationContext();

  // Generate responsive styles based on current theme and screen size
  const styles = createUserStyles(theme, width, height);

  // Generate SVG icon props (width, height, fill, stroke) from theme and screen size
  const iconProps = createUserIconProps(theme, width, height);

  // State for dropdown menu visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Get first letter of user's name for avatar
  const userInitial = givenName?.[0]?.toUpperCase() || "U";

  // Get savings message based on change direction
  const getSavingsMessage = () => {
    if (savings.isLoading) {
      return "Hesaplanıyor...";
    }

    const formattedPercentage = Math.round(savings.percentage);

    if (savings.change === "increased") {
      return `Bu ay %${formattedPercentage} daha fazla tasarruf ediyorsunuz`;
    } else if (savings.change === "decreased") {
      return `Bu ay %${formattedPercentage} daha az tasarruf ediyorsunuz`;
    } else {
      return "";
    }
  };

  // Dropdown menu items
  const menuItems = [
    {
      icon: <BellIcon {...iconProps.menuIcon} />,
      label: "Bildirimler",
      onPress: () => {
        setShowDropdown(false);
        navigate("Notifications");
      }
    },
    {
      icon: <SettingsIcon {...iconProps.menuIcon} />,
      label: "Ayarlar",
      onPress: () => {
        setShowDropdown(false);
        navigate("Settings");
      }
    },
    {
      icon: <LogOutIcon {...iconProps.menuIcon} />,
      label: "Çıkış Yap",
      onPress: () => {
        setShowDropdown(false);
        // TODO: Implement logout logic
      }
    }
  ];

  return (
    <View style={styles.userContainer}>
      {/* Main content area containing greeting, streak, and insights */}
      <View style={styles.userHeader}>
        {/* Top row: Welcome message and streak badge */}
        <View style={styles.userGreating}>
          {/* Welcome text */}
          <View style={styles.userWelcome}>
            {/* TODO: Replace hardcoded "Alex" with {givenName} from state */}
            <Text style={styles.userWelcomeText}>
              Hi, {givenName || "Alex"}!{" "}
            </Text>
          </View>

          {/* Streak badge: flame icon + consecutive days count */}
          <View style={styles.userStreak}>
            {/* Flame icon with theme-based colors (fill + stroke) */}
            <FlameIcon {...iconProps.flame} />

            {/* TODO: Replace hardcoded "12 days" with dynamic streak from backend */}
            <Text style={styles.userStreakText}>12 days</Text>
          </View>
        </View>

        {/* Bottom row: Savings insight with trend arrow */}
        <View style={styles.userInsight}>
          {/* Only show arrow when there's a change (not equal) */}
          {savings.change !== "equal" && (
            <Text
              style={[
                styles.userInsightIcon,
                // Rotate arrow down when decreased
                savings.change === "decreased" && {
                  transform: [{ rotate: "180deg" }]
                }
              ]}
            >
              <TrendArrowIcon
                {...iconProps.trendArrow}
                // Override stroke to red when decreased
                stroke={
                  savings.change === "decreased"
                    ? theme.WithdrawIconFillColor
                    : iconProps.trendArrow.stroke
                }
              />
            </Text>
          )}

          {/* Dynamic message based on change direction */}
          <Text style={styles.userInsightText}>{getSavingsMessage()}</Text>
        </View>
      </View>

      {/* Right side: Avatar button with dropdown */}
      <View style={styles.userIconContainer}>
        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => setShowDropdown(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.avatarText}>{userInitial}</Text>
        </TouchableOpacity>

        {/* Dropdown Menu Modal */}
        <Modal
          visible={showDropdown}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDropdown(false)}
        >
          <TouchableOpacity
            style={styles.dropdownOverlay}
            activeOpacity={1}
            onPress={() => setShowDropdown(false)}
          >
            <View style={styles.dropdownMenu}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    index === menuItems.length - 1 && styles.menuItemLast
                  ]}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuIconContainer}>{item.icon}</View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default User;

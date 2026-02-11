import React, { FC } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { createUserStyles, createUserIconProps } from "./styles/User.styles";
import { useTheme } from "@/context/theme/ThemeProvider";
import { useDataLayerValue } from "@/context/state/StateProvider";
import ChartIcon from "@assets/icons/chart.svg";
import FlameIcon from "@assets/icons/flame.svg";
import TrendArrowIcon from "@assets/icons/trendArrow.svg";
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

  // Get responsive screen dimensions for design system calculations
  const { width, height } = useWindowDimensions();

  // Extract user data from global state (single-user app, always index 0)
  const [{ User }] = useDataLayerValue();
  const photo = User?.[0]?.photo; // User profile photo URL (currently unused)
  const givenName = User?.[0]?.givenName; // User's first name (currently unused - see TODO below)

  // Generate responsive styles based on current theme and screen size
  const styles = createUserStyles(theme, width, height);

  // Generate SVG icon props (width, height, fill, stroke) from theme and screen size
  const iconProps = createUserIconProps(theme, width, height);

  return (
    <View style={styles.userContainer}>
      {/* Main content area containing greeting, streak, and insights */}
      <View style={styles.userHeader}>
        {/* Top row: Welcome message and streak badge */}
        <View style={styles.userGreating}>
          {/* Welcome text */}
          <View style={styles.userWelcome}>
            {/* TODO: Replace hardcoded "Alex" with {givenName} from state */}
            <Text style={styles.userWelcomeText}>Hi, Alex! </Text>
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
          {/* Trend arrow icon indicating savings direction */}
          <Text style={styles.userInsightIcon}>
            <TrendArrowIcon {...iconProps.trendArrow} />
          </Text>

          {/* TODO: Replace hardcoded "23%" with calculated savings percentage */}
          <Text style={styles.userInsightText}>
            You're saving %23 more this month
          </Text>
        </View>
      </View>

      {/* Right side: Notification bell icon */}
      <View style={styles.userIconContainer}>
        <View style={styles.userIcon}>
          <Notifications />
        </View>
      </View>
    </View>
  );
};

export default User;

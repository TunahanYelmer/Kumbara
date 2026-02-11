import React, { FC } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { createUserStyles, createUserIconProps } from "./styles/User.styles";
import { useTheme } from "@/context/theme/ThemeProvider";
import { useDataLayerValue } from "@/context/state/StateProvider";
import ChartIcon from "@assets/icons/chart.svg";
import FlameIcon from "@assets/icons/flame.svg";
import TrendArrowIcon from "@assets/icons/trendArrow.svg";
import Notifications from "@/components/notifications/Notifications";

const User: FC = () => {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const [{ User }] = useDataLayerValue();
  const photo = User?.[0]?.photo;
  const givenName = User?.[0]?.givenName;
  const styles = createUserStyles(theme, width, height);
  const iconProps = createUserIconProps(theme, width, height);
  return (
    <View style={styles.userContainer}>
      <View style={styles.userHeader}>
        <View style={styles.userGreating}>
          <View style={styles.userWelcome}>
            <Text style={styles.userWelcomeText}>Hi, Alex! </Text>
          </View>
          <View style={styles.userStreak}>
            <FlameIcon {...iconProps.flame} />

            <Text style={styles.userStreakText}>12 days</Text>
          </View>
        </View>
        <View style={styles.userInsight}>
          <Text style={styles.userInsightIcon}>
            <TrendArrowIcon {...iconProps.trendArrow} />
          </Text>
          <Text style={styles.userInsightText}>
            You're saving %23 more this month
          </Text>
        </View>
      </View>
      <View style={styles.userIconContainer}>
        <View style={styles.userIcon}>
          <Notifications />
        </View>
      </View>
    </View>
  );
};

export default User;

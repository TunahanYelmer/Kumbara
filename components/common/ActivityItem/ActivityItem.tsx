import React, { FC, ReactNode } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createActivityItemStyles } from "./styles/ActivityItem.styles";
import ClockIcon from "@assets/icons/clock.svg";

interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  time: string;
  amount: string;
  type: "income" | "expense";
  onPress?: () => void;
}

/**
 * ActivityItem Component
 *
 * Displays a single activity/transaction item in the recent activity list
 * Shows icon, title, time, and amount with appropriate styling
 */
const ActivityItem: FC<ActivityItemProps> = ({
  icon,
  title,
  time,
  amount,
  type,
  onPress,
}) => {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createActivityItemStyles(theme, width, height);

  const iconBackgroundColor =
    type === "income" ? `${theme.StatsHighlightColor}20` : "#ef444420";
  const amountColor = type === "income" ? theme.StatsHighlightColor : theme.StatsValueColor;

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.timeContainer}>
            <ClockIcon width={12} height={12} stroke={theme.StatsLabelColor} />
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>{amount}</Text>
    </Container>
  );
};

export default ActivityItem;

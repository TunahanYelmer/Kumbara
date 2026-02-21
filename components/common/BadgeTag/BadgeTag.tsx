import React, { FC, ReactNode } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createBadgeTagStyles } from "./styles/BadgeTag.styles";

interface BadgeTagProps {
  icon?: ReactNode;
  text: string;
  variant?: "success" | "warning" | "info" | "neutral";
  customColor?: string;
  customBackgroundColor?: string;
}

/**
 * BadgeTag Component
 *
 * Small badge/tag component for displaying streak, trends, status indicators
 * Supports different variants and custom colors
 */
const BadgeTag: FC<BadgeTagProps> = ({
  icon,
  text,
  variant = "neutral",
  customColor,
  customBackgroundColor
}) => {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createBadgeTagStyles(theme, width, height);

  // Determine colors based on variant
  const getColors = () => {
    if (customColor && customBackgroundColor) {
      return {
        color: customColor,
        backgroundColor: customBackgroundColor
      };
    }

    switch (variant) {
      case "success":
        return {
          color: "#22c55e",
          backgroundColor: "#22c55e20"
        };
      case "warning":
        return {
          color: "#f59e0b",
          backgroundColor: "#f59e0b20"
        };
      case "info":
        return {
          color: theme.StatsHighlightColor,
          backgroundColor: `${theme.StatsHighlightColor}20`
        };
      default:
        return {
          color: theme.StatsLabelColor,
          backgroundColor: theme.StatsPeriodButtonBgColor
        };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: `${colors.color}40`
        }
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, { color: colors.color }]}>{text}</Text>
    </View>
  );
};

export default BadgeTag;

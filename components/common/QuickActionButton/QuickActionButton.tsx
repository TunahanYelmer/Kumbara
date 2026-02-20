import React, { FC, ReactNode } from "react";
import { TouchableOpacity, Text, View, useWindowDimensions } from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createQuickActionButtonStyles } from "./styles/QuickActionButton.styles";

interface QuickActionButtonProps {
  icon: ReactNode;
  label: string;
  onPress: () => void;
  iconBackgroundColor?: string;
}

/**
 * QuickActionButton Component
 *
 * Button used for quick actions on the home screen
 * Displays an icon in a colored circle with a label below
 */
const QuickActionButton: FC<QuickActionButtonProps> = ({
  icon,
  label,
  onPress,
  iconBackgroundColor = "#00d4aa20",
}) => {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createQuickActionButtonStyles(theme, width, height);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default QuickActionButton;

import React, { FC } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import { createSectionHeaderStyles } from "./styles/SectionHeader.styles";
import ArrowRightIcon from "@assets/icons/arrow-right.svg";

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  showSeeAll?: boolean;
}

/**
 * SectionHeader Component
 *
 * Reusable section header with title and optional "See all" button
 * Used throughout the app for consistent section styling
 */
const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  onSeeAll,
  showSeeAll = true
}) => {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createSectionHeaderStyles(theme, width, height);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showSeeAll && onSeeAll && (
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={onSeeAll}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAllText}>Tümünü gör</Text>
          <ArrowRightIcon
            width={16}
            height={16}
            stroke={theme.StatsHighlightColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import {
  createStatsScreenStyles,
  createStatsIconProps,
} from "./styles/StatsScreen.styles";

// Import extracted icons
import PiggyBankIcon from "@assets/icons/piggy-bank.svg";
import CalendarIcon from "@assets/icons/calendar.svg";
import TargetIcon from "@assets/icons/trophy.svg";
import FlameIcon from "@assets/icons/flame.svg";
import TrendUpIcon from "@assets/icons/trend-up.svg";
import CheckIcon from "@assets/icons/check.svg";
import BriefcaseIcon from "@assets/icons/briefcase.svg";
import GiftIcon from "@assets/icons/gift.svg";

// Define TypeScript type for period selector
type Period = "1W" | "1M" | "3M" | "1Y";

export default function StatsScreen() {
  // 1. Get screen dimensions (updates on rotation)
  const { width, height } = useWindowDimensions();

  // 2. Get current theme
  const [theme] = useTheme();

  // 3. Create responsive styles
  const styles = createStatsScreenStyles(theme, width, height);
  const iconProps = createStatsIconProps(theme, width, height);

  // 4. Component state
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("1W");

  // 5. Mock data (replace with real data from context later)
  const stats = [
    {
      icon: PiggyBankIcon,
      iconKey: "piggyBank" as const,
      label: "Toplam Tasarruf",
      value: "₺12,4k",
      change: "+%12 geçen aya göre",
      positive: true,
      showCheck: false,
    },
    {
      icon: CalendarIcon,
      iconKey: "calendar" as const,
      label: "Aylık Ortalama",
      value: "₺1,850",
      change: "+%5 geçen aya göre",
      positive: true,
      showCheck: false,
    },
    {
      icon: TargetIcon,
      iconKey: "target" as const,
      label: "Hedefler",
      value: "2/5",
      change: "%40 tamamlandı",
      positive: true,
      showCheck: true,
    },
    {
      icon: FlameIcon,
      iconKey: "flame" as const,
      label: "Seri",
      value: "12 gün",
      change: "En iyi: 15 gün",
      positive: true,
      showCheck: false,
    },
  ];

  // 6. Period selector data
  const periods: Period[] = ["1W", "1M", "3M", "1Y"];

  // 7. Chart data (mock)
  const chartData = [40, 65, 45, 80, 55, 90, 100];
  const days = ["P", "S", "Ç", "P", "C", "C", "P"];

  // 8. Category data (mock)
  const categories = [
    {
      icon: BriefcaseIcon,
      iconKey: "briefcase" as const,
      name: "Maaş Yatırımları",
      percent: 65,
      color: "#00d4aa",
    },
    {
      icon: GiftIcon,
      iconKey: "gift" as const,
      name: "İkramiye & Hediyeler",
      percent: 25,
      color: "#6366f1",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Screen Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>İstatistikler</Text>
        <Text style={styles.screenSubtitle}>Finansal özet</Text>
      </View>

      {/* Stats Grid - 2x2 layout */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            {/* Stat Header: Icon + Label */}
            <View style={styles.statHeader}>
              <stat.icon {...iconProps[stat.iconKey]} />
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>

            {/* Stat Value */}
            <Text style={styles.statValue}>{stat.value}</Text>

            {/* Stat Change */}
            <View style={styles.statChange}>
              {stat.showCheck ? (
                <CheckIcon {...iconProps.check} />
              ) : (
                <TrendUpIcon {...iconProps.trendUp} />
              )}
              <Text
                style={[
                  styles.statChangeText,
                  { color: stat.positive ? "#22c55e" : "#ef4444" },
                ]}
              >
                {stat.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        {/* Chart Header */}
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Tasarruf Trendi</Text>
          <View style={styles.periodSelector}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.periodButton,
                  selectedPeriod === p && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod(p)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === p && styles.periodButtonTextActive,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bar Chart */}
        <View style={styles.barChart}>
          {chartData.map((height, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={[styles.bar, { height: `${height}%` }]} />
              <Text style={styles.barLabel}>{days[index]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Top Categories Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>En Çok Harcanan</Text>
      </View>

      <View style={{ gap: 8, marginBottom: 40 }}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            {/* Category Header */}
            <View style={styles.categoryHeader}>
              <View style={styles.categoryInfo}>
                <View style={styles.categoryIconContainer}>
                  <category.icon {...iconProps[category.iconKey]} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <Text style={styles.categoryPercent}>{category.percent}%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${category.percent}%`,
                    backgroundColor: category.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

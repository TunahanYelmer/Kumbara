import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import {
  createGoalsScreenStyles,
  createGoalsScreenIconProps,
} from "./styles/GoalsScreen.styles";

// Import icons
import BeachIcon from "@assets/icons/beach.svg";
import CarIcon from "@assets/icons/car.svg";
import ShieldIcon from "@assets/icons/shield.svg";
import HouseIcon from "@assets/icons/house.svg";
import PlaneIcon from "@assets/icons/plane.svg";
import GraduationIcon from "@assets/icons/graduation.svg";
import ClockIcon from "@assets/icons/clock.svg";
import CheckIcon from "@assets/icons/check.svg";
import PlusIcon from "@assets/icons/plus.svg";

// TypeScript types
type GoalIcon = "beach" | "car" | "shield" | "house" | "plane" | "graduation";

interface Goal {
  id: string;
  title: string;
  icon: GoalIcon;
  deadline: string;
  current: number;
  target: number;
  color: string;
  completed: boolean;
}

interface CompletedGoal {
  id: string;
  title: string;
  completedDate: string;
  color: string;
  completed: true;
}

export default function GoalsScreen() {
  const { width, height } = useWindowDimensions();
  const [theme] = useTheme();
  const styles = createGoalsScreenStyles(theme, width, height);
  const iconProps = createGoalsScreenIconProps(theme, width, height);

  // Mock data - Active goals
  const goals: Goal[] = [
    {
      id: "1",
      title: "Yaz Tatili",
      icon: "beach",
      deadline: "3 ay kaldı",
      current: 2400,
      target: 3000,
      color: "#00d4aa",
      completed: false,
    },
    {
      id: "2",
      title: "Yeni Araba",
      icon: "car",
      deadline: "8 ay kaldı",
      current: 8500,
      target: 15000,
      color: "#6366f1",
      completed: false,
    },
    {
      id: "3",
      title: "Acil Fon",
      icon: "shield",
      deadline: "Devam ediyor",
      current: 1550,
      target: 5000,
      color: "#f59e0b",
      completed: false,
    },
    {
      id: "4",
      title: "Yeni Ev",
      icon: "house",
      deadline: "2 yıl kaldı",
      current: 45000,
      target: 80000,
      color: "#ec4899",
      completed: false,
    },
    {
      id: "5",
      title: "Dünya Turu",
      icon: "plane",
      deadline: "1 yıl kaldı",
      current: 3200,
      target: 15000,
      color: "#8b5cf6",
      completed: false,
    },
    {
      id: "6",
      title: "Eğitim",
      icon: "graduation",
      deadline: "4 yıl kaldı",
      current: 12000,
      target: 50000,
      color: "#14b8a6",
      completed: false,
    },
  ];

  // Mock data - Completed goals
  const completedGoals: CompletedGoal[] = [
    {
      id: "7",
      title: "Yeni iPhone",
      completedDate: "Ara 2023",
      color: "#22c55e",
      completed: true,
    },
    {
      id: "8",
      title: "Oyun Bilgisayarı",
      completedDate: "Kas 2023",
      color: "#22c55e",
      completed: true,
    },
  ];

  const getIcon = (iconName: GoalIcon) => {
    const iconComponents = {
      beach: BeachIcon,
      car: CarIcon,
      shield: ShieldIcon,
      house: HouseIcon,
      plane: PlaneIcon,
      graduation: GraduationIcon,
    };
    return iconComponents[iconName];
  };

  const renderGoal = (goal: Goal) => {
    const progress = Math.round((goal.current / goal.target) * 100);
    const IconComponent = getIcon(goal.icon);

    return (
      <TouchableOpacity key={goal.id} style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <View style={styles.goalInfo}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: goal.color + "20" },
              ]}
            >
              <IconComponent {...iconProps[goal.icon]} />
            </View>
            <View>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <View style={styles.deadlineRow}>
                <ClockIcon {...iconProps.clock} />
                <Text style={styles.deadlineText}>{goal.deadline}</Text>
              </View>
            </View>
          </View>
          <View style={styles.amountColumn}>
            <Text style={styles.currentAmount}>
              ₺{goal.current.toLocaleString("tr-TR")}
            </Text>
            <Text style={styles.targetAmount}>
              / ₺{goal.target.toLocaleString("tr-TR")}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: goal.color },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: goal.color }]}>
            {progress}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCompletedGoal = (goal: CompletedGoal) => (
    <TouchableOpacity
      key={goal.id}
      style={[styles.goalCard, styles.completedCard]}
    >
      <View style={styles.goalHeader}>
        <View style={styles.goalInfo}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: "rgba(34, 197, 94, 0.2)" },
            ]}
          >
            <CheckIcon {...iconProps.check} />
          </View>
          <View>
            <Text
              style={[
                styles.goalTitle,
                { textDecorationLine: "line-through", color: "#8b8b9e" },
              ]}
            >
              {goal.title}
            </Text>
            <Text style={styles.deadlineText}>
              Tamamlandı {goal.completedDate}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hedeflerim</Text>
        <Text style={styles.subtitle}>Tasarruf yolculuğunuzu takip edin</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>6</Text>
          <Text style={styles.summaryLabel}>Aktif</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>2</Text>
          <Text style={styles.summaryLabel}>Tamamlandı</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>₺67k</Text>
          <Text style={styles.summaryLabel}>Toplam</Text>
        </View>
      </View>

      {/* Active Goals */}
      <Text style={styles.sectionTitle}>Aktif Hedefler</Text>
      <View style={styles.goalsList}>{goals.map(renderGoal)}</View>

      {/* Completed Goals */}
      <Text style={styles.sectionTitle}>Tamamlananlar</Text>
      <View style={styles.goalsList}>
        {completedGoals.map(renderCompletedGoal)}
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <PlusIcon {...iconProps.plus} />
      </TouchableOpacity>
    </ScrollView>
  );
}

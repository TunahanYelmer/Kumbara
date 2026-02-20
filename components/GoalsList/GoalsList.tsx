import React, { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useTheme } from "@/context/theme/ThemeProvider";
import {
  createGoalsListStyles,
  createGoalsListIconProps
} from "./styles/GoalsList.styles";

// Import SVG icons for goals
import PhoneIcon from "@assets/icons/phone.svg";
import PlaneIcon from "@assets/icons/plane.svg";
import BankIcon from "@assets/icons/bank.svg";
import CalendarIcon from "@assets/icons/calendar.svg";

const { width, height } = Dimensions.get("window");

// Mock data - Replace with real data from state/API later
const MOCK_GOALS = [
  {
    id: "1",
    name: "Yeni Telefon",
    iconType: "phone" as const,
    deadline: "3 ay kaldı",
    targetAmount: 15000,
    currentAmount: 8500,
    color: "#00d4aa"
  },
  {
    id: "2",
    name: "Tatil",
    iconType: "plane" as const,
    deadline: "8 ay kaldı",
    targetAmount: 10000,
    currentAmount: 6200,
    color: "#6366f1"
  },
  {
    id: "3",
    name: "Acil Fon",
    iconType: "bank" as const,
    deadline: "Devam ediyor",
    targetAmount: 20000,
    currentAmount: 12000,
    color: "#f59e0b"
  }
];

interface Goal {
  id: string;
  name: string;
  iconType: "phone" | "plane" | "bank";
  deadline: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
}

interface GoalCardProps {
  goal: Goal;
}

/**
 * Individual Goal Card Component
 */
const GoalCard: FC<GoalCardProps> = ({ goal }) => {
  const [theme] = useTheme();
  const styles = createGoalsListStyles(theme, width, height);
  const iconProps = createGoalsListIconProps(theme, width, height);

  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  // Get the appropriate icon component
  const IconComponent =
    goal.iconType === "phone"
      ? PhoneIcon
      : goal.iconType === "plane"
        ? PlaneIcon
        : BankIcon;

  return (
    <TouchableOpacity style={styles.goalCard} activeOpacity={0.8}>
      {/* Header: (Icon + Title/Deadline) on Left, (Amounts) on Right */}
      <View style={styles.goalHeader}>
        {/* Left side: Icon + Text */}
        <View style={styles.goalInfo}>
          {/* Icon with colored background */}
          <View style={[styles.iconContainer, { backgroundColor: goal.color }]}>
            <IconComponent {...iconProps[goal.iconType]} />
          </View>

          {/* Title and Deadline */}
          <View style={styles.textContainer}>
            <Text style={styles.goalTitle}>{goal.name}</Text>
            <View style={styles.deadlineContainer}>
              <CalendarIcon
                width={12}
                height={12}
                fill={theme.GoalCardDeadlineIconColor}
                stroke={theme.GoalCardDeadlineIconColor}
              />
              <Text style={styles.deadlineText}>{goal.deadline}</Text>
            </View>
          </View>
        </View>

        {/* Right side: Amounts (stacked vertically) */}
        <View style={styles.amountContainer}>
          <Text style={styles.currentAmount}>
            ₺{goal.currentAmount.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}
          </Text>
          <Text style={styles.targetAmount}>
            of ₺{goal.targetAmount.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: goal.color
              }
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Goals List Component
 */
const GoalsList: FC = () => {
  const [theme] = useTheme();
  const styles = createGoalsListStyles(theme, width, height);

  return (
    <View style={styles.container}>
      {/* Goals List - Using map() instead of FlatList to avoid nesting error */}
      {MOCK_GOALS.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </View>
  );
};

export default GoalsList;

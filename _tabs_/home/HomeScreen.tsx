import React from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { useDataLayerValue } from "@/context/state/StateProvider";
import BalanceCard from "@/components/BalanceCard/BalanceCard";
import GoalsList from "@components/GoalsList/GoalsList";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import BadgeTag from "@/components/common/BadgeTag/BadgeTag";
import QuickActionButton from "@/components/common/QuickActionButton/QuickActionButton";
import ActivityItem from "@/components/common/ActivityItem/ActivityItem";
import User from "@/components/User/User";
import { createHomeScreenStyles } from "./styles/HomeScreen.styles";
import { useTheme } from "@/context/theme/ThemeProvider";

// Import icons
import FlameIcon from "@assets/icons/flame.svg";
import TrendUpIcon from "@assets/icons/trend-up.svg";
import WalletIcon from "@assets/icons/wallet.svg";
import BankIcon from "@assets/icons/bank.svg";
import GoalsIcon from "@assets/icons/goals.svg";
import PiggyBankIcon from "@assets/icons/piggy-bank.svg";
import BeachIcon from "@assets/icons/beach.svg";
import GiftIcon from "@assets/icons/gift.svg";

export default function HomeScreen() {
  const [theme] = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createHomeScreenStyles(theme, width, height);
  const [{ User: UserData }] = useDataLayerValue();

  const userName = UserData?.[0]?.givenName || "Kullanıcı";

  const handleSeeAllGoals = () => {
    console.log("See all goals pressed");
  };

  const handleSeeAllActivity = () => {
    console.log("See all activity pressed");
  };

  const handleAddMoney = () => {
    console.log("Add money pressed");
  };

  const handleWithdraw = () => {
    console.log("Withdraw pressed");
  };

  const handleNewGoal = () => {
    console.log("New goal pressed");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* User Header with Avatar and Quick Actions */}
      <User />

      {/* Balance Card */}
      <View style={styles.balanceSection}>
        <BalanceCard />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <QuickActionButton
          icon={<WalletIcon width={24} height={24} fill={theme.StatsHighlightColor} stroke={theme.StatsHighlightColor} />}
          label="Para Ekle"
          onPress={handleAddMoney}
          iconBackgroundColor={`${theme.StatsHighlightColor}20`}
        />
        <QuickActionButton
          icon={<BankIcon width={24} height={24} fill="#6366f1" stroke="#6366f1" />}
          label="Para Çek"
          onPress={handleWithdraw}
          iconBackgroundColor="#6366f120"
        />
        <QuickActionButton
          icon={<GoalsIcon width={24} height={24} fill="#f59e0b" stroke="#f59e0b" />}
          label="Yeni Hedef"
          onPress={handleNewGoal}
          iconBackgroundColor="#f59e0b20"
        />
      </View>

      {/* Goals Section */}
      <View style={styles.section}>
        <SectionHeader
          title="Hedefleriniz"
          onSeeAll={handleSeeAllGoals}
          showSeeAll={true}
        />
        <GoalsList />
      </View>

      {/* Recent Activity Section */}
      <View style={styles.section}>
        <SectionHeader
          title="Son Aktiviteler"
          onSeeAll={handleSeeAllActivity}
          showSeeAll={true}
        />
        <ActivityItem
          icon={<PiggyBankIcon width={20} height={20} fill={theme.StatsHighlightColor} stroke={theme.StatsHighlightColor} />}
          title="Tasarrufa Eklendi"
          time="Bugün, 9:41"
          amount="+₺500.00"
          type="income"
        />
        <ActivityItem
          icon={<BeachIcon width={20} height={20} fill="#6366f1" stroke="#6366f1" />}
          title="Tatil Hedefi"
          time="Dün, 16:20"
          amount="-₺200.00"
          type="expense"
        />
        <ActivityItem
          icon={<GiftIcon width={20} height={20} fill={theme.StatsHighlightColor} stroke={theme.StatsHighlightColor} />}
          title="İkramiye Yatırıldı"
          time="15 Ocak, 14:30"
          amount="+₺1,200.00"
          type="income"
        />
      </View>
    </ScrollView>
  );
}

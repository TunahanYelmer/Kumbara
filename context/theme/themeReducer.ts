/**

* Theme Interface
* ---
* Defines the complete structure of a theme object used across the app.
* Includes both color tokens and mode-specific design variables.
  */
export interface Theme {
  DarkMode: boolean;

  // Global Colors
  LoadingIndicatorColor: string;
  BackgroundColor: string;
  TextColor: string;
  ButtonBorderColor: string;
  ButtonColor: string;
  ButtonTextColor: string;

  // User
  UserBackgroundColor: string;
  UserNameColor: string;
  UserWelcomeTextColor: string;
  UserStreakBorderColor: string;
  UserStreakBackgroundColor: string;
  UserStreakTextColor: string;
  UserStreakFireIconFillColor: string;
  UserStreakFireIconStrokeColor: string;
  UserInsightTextColor: string;
  UserInsightTrendArrowFillColor: string;
  UserInsightTrendArrowStrokeColor: string;

  // Notifications
  NotificationCardBgColor: string;
  NotificationCardTitleColor: string;
  NotificationCardDescriptionColor: string;
  NotificationCardTimeColor: string;

  // Balance Card
  BalanceCardColor: [string, string, ...string[]]; // Gradient (min 2 colors)
  BalanceCardTitleColor: string;
  BalanceCardAmountColor: string;
  BalanceCardDeficitBadgeBackgroundColor: string;
  BalanceCardDeficitPercentageTextColor: string;
  BalanceCardDeficitIconFillColor: string;
  BalanceCardDeficitIconStrokeColor: string;
  BalanceCardBorderLineColor: string;
  BalanceCardGoalsIconFillColor: string;
  BalanceCardGoalsIconStrokeColor: string;
  BalanceCardGoalsTextColor: string;
  BalanceCardCalendarIconFillColor: string;
  BalanceCardCalendarIconStrokeColor: string;
  BalanceCardLastUpdateTextColor: string;

  // Quick Action Cards (Add Money, Withdraw, Add Goal)
  AddMoneyCardBgColor: string;
  AddMoneyTextColor: string;
  AddMoneyIconFillColor: string;
  AddMoneyIconStrokeColor: string;
  AddMoneyIconBgColor: string;

  WithdrawCardBgColor: string;
  WithdrawTextColor: string;
  WithdrawIconFillColor: string;
  WithdrawIconStrokeColor: string;
  WithdrawIconBgColor: string;
  AddGoalCardBgColor: string;
  AddGoalTextColor: string;
  AddGoalIconFillColor: string;
  AddGoalIconStrokeColor: string;
  AddGoalIconBgColor: string;

  // Goals List
  GoalsListHeaderTitleColor: string;
  GoalsListHeaderCountColor: string;
  GoalCardBgColor: string;
  GoalCardNameColor: string;
  GoalCardDeadlineIconColor: string;
  GoalCardDeadlineTextColor: string;
  GoalCardProgressBgColor: string;
  GoalCardProgressFillColor: string;
  GoalCardProgressTextColor: string;
  GoalCardAmountLabelColor: string;
  GoalCardCurrentAmountColor: string;
  GoalCardTargetAmountColor: string;
  GoalCardBorderColor: string;
  GoalCardRemainingLabelColor: string;
  GoalCardRemainingAmountColor: string;

  // Navbar (Bottom Tab Navigation)
  NavbarBgColor: string;
  NavbarBorderColor: string;
  NavbarIconActiveColor: string;
  NavbarIconInactiveColor: string;
  NavbarIconActiveBgColor: string;
  NavbarTextActiveColor: string;
  NavbarTextInactiveColor: string;
  NavbarIndicatorColor: string;

  // Tabs
  TabColour: string;
  TabButtonBgColor: string;
  TabActiveColor: string;
  TabActiveTextColor: string;
  TabIconColour: string;
  TabButtonInactiveColour: string;

  // Transaction / History
  TransactionHistoryLoadingColor: string;
  TransactionHistoryEmptyTextColor: string;
  TransactionTextIncomeColor: string;
  TransactionTextExpenseColor: string;
  TransactionTitleColor: string;
  TransactionButtonBgColor: string;
  SeparatorColor: string;

  // Withdraw Modal
  WitdrawModalSelectedBg: string;
  WitdrawModalOptionText: string;
  WithdrawModalInputBorderColor: string;

  // Highlights
  HiglightColor: string;
  Balance: string;

  // Action Buttons
  AddButtonTextColor: string;
  AddButtonBgColor: string;
  SubstractButtonBgColor: string;
  SubstractButtonTextColor: string;

  // Category Icon Backgrounds
  FoodIconBgColor: string;
  MarketIconBgColor: string;
  TransportIconBgColor: string;
  BillIconBgColor: string;
  IncomeIconBgColor: string;

  // Home Screen
  HomeScreenBgColor: string;
  HomeScreenGroupBackgroundColor: string;
  HomeScreenGroupTitleColor: string;
  HomeScreenItemBorderColor: string;

  // Settings Screen
  SettingsScreenBackgroundColor: string;
  SettingsGroupBackgroundColor: string;
  SettingsGroupTitleColor: string;
  SettingsItemBorderColor: string;
  SettingsItemValueColor: string;
  SettingsCurrencyCodeColor: string;

  // Modals
  ModalOverlayBgColor: string;
  ModalBGColor: string;
  ModalTitleColor: string;
  ModalButtonTextColor: string;
  ModalButtonBGColor: string;
}

/* ──────────────────────────────

* LIGHT THEME CONFIGURATION
* ────────────────────────────── */
export const initialTheme: Theme = {
  DarkMode: false,
  BackgroundColor: "#FFFFFF",
  LoadingIndicatorColor: "#2563EB",
  TextColor: "#1F2937",

  // Buttons
  ButtonBorderColor: "#E5E7EB",
  ButtonColor: "#3B82F6",
  ButtonTextColor: "#FFFFFF",

  // User
  UserBackgroundColor: "rgba(255, 255, 255,0)",
  UserNameColor: "#111827",
  UserWelcomeTextColor: "#6B7280",
  UserStreakBorderColor: "#F59E0B",
  UserStreakBackgroundColor: "#ffffff",
  UserStreakTextColor: "",
  UserStreakFireIconFillColor: "#F59E0B",
  UserStreakFireIconStrokeColor: "#F59E0B",
  UserInsightTextColor: "",
  UserInsightTrendArrowFillColor: "#5cce43",
  UserInsightTrendArrowStrokeColor: "#5cce43",

  // Notifications
  NotificationCardBgColor: "#FFFFFF",
  NotificationCardTitleColor: "#111827",
  NotificationCardDescriptionColor: "#6B7280",
  NotificationCardTimeColor: "#9CA3AF",

  // Balance Card
  BalanceCardColor: ["#3856d9", "#253cb0"],
  BalanceCardTitleColor: "#d5dbf5",
  BalanceCardAmountColor: "#d5dbf5",
  BalanceCardDeficitBadgeBackgroundColor: "#10B981",
  BalanceCardDeficitPercentageTextColor: "#FFFFFF",
  BalanceCardDeficitIconFillColor: "#FFFFFF",
  BalanceCardDeficitIconStrokeColor: "#10B981",
  BalanceCardBorderLineColor: "rgba(213, 219, 245, 0.2)",
  BalanceCardGoalsIconFillColor: "#d5dbf5",
  BalanceCardGoalsIconStrokeColor: "#d5dbf5",
  BalanceCardGoalsTextColor: "#d5dbf5",
  BalanceCardCalendarIconFillColor: "#000000",
  BalanceCardCalendarIconStrokeColor: "#d5dbf5",
  BalanceCardLastUpdateTextColor: "#d5dbf5",

  // Quick Action Cards
  AddMoneyCardBgColor: "#1c1d26", // Emerald green
  AddMoneyTextColor: "#FFFFFF",
  AddMoneyIconFillColor: "",
  AddMoneyIconStrokeColor: "#00d4aa",
  AddMoneyIconBgColor: "#18393b", // White
  WithdrawCardBgColor: "#1c1d26", // Amber orange
  WithdrawTextColor: "#FFFFFF",
  WithdrawIconFillColor: "",
  WithdrawIconStrokeColor: "#6367f0",
  WithdrawIconBgColor: "#262744", // White
  AddGoalCardBgColor: "#1c1d26", // Violet purple
  AddGoalTextColor: "#FFFFFF",
  AddGoalIconFillColor: "",
  AddGoalIconStrokeColor: "#f49e0a",
  AddGoalIconBgColor: "#3c3022",

  // Goals List
  GoalsListHeaderTitleColor: "#111827",
  GoalsListHeaderCountColor: "#6B7280",
  GoalCardBgColor: "#FFFFFF",
  GoalCardNameColor: "#111827",
  GoalCardDeadlineIconColor: "#8b8b9e",
  GoalCardDeadlineTextColor: "#8b8b9e",
  GoalCardProgressBgColor: "#E5E7EB",
  GoalCardProgressFillColor: "#10B981",
  GoalCardProgressTextColor: "#10B981",
  GoalCardAmountLabelColor: "#6B7280",
  GoalCardCurrentAmountColor: "#111827",
  GoalCardTargetAmountColor: "#8b8b9e",
  GoalCardBorderColor: "rgba(255,255,255,0.05)",
  GoalCardRemainingLabelColor: "#6B7280",
  GoalCardRemainingAmountColor: "#F59E0B",

  // Navbar (Bottom Tab Navigation)
  NavbarBgColor: "#FFFFFF",
  NavbarBorderColor: "#E5E7EB",
  NavbarIconActiveColor: "#00d4aa",
  NavbarIconInactiveColor: "#9CA3AF",
  NavbarIconActiveBgColor: "rgba(0, 212, 170, 0.1)",
  NavbarTextActiveColor: "#00d4aa",
  NavbarTextInactiveColor: "#6B7280",
  NavbarIndicatorColor: "#00d4aa",

  // Tabs
  TabButtonBgColor: "#F3F4F6",
  TabColour: "#F3F4F6",
  TabActiveColor: "#0f2ba8",
  TabActiveTextColor: "#0f2ba8",
  TabIconColour: "#0f2ba8",
  TabButtonInactiveColour: "#c4c9d6",

  // Transactions / History
  TransactionHistoryLoadingColor: "#2563EB",
  TransactionHistoryEmptyTextColor: "#9CA3AF",
  TransactionTextIncomeColor: "#536082",
  TransactionTextExpenseColor: "#536082",
  TransactionTitleColor: "#77809a",
  TransactionButtonBgColor: "#FFFFFF",
  SeparatorColor: "#677399",

  // Action Buttons
  AddButtonTextColor: "#677399",
  AddButtonBgColor: "#e7eafe",
  SubstractButtonBgColor: "#e7eafe",
  SubstractButtonTextColor: "#677399",

  // Withdraw Modal
  WitdrawModalSelectedBg: "#3B82F6",
  WitdrawModalOptionText: "#1F2937",
  WithdrawModalInputBorderColor: "#E5E7EB",

  // Highlights
  HiglightColor: "#DBEAFE",
  Balance: "#2563EB",

  // Category Icons
  FoodIconBgColor: "#fff4ad",
  MarketIconBgColor: "#ffb682",
  TransportIconBgColor: "#ff7aa7",
  BillIconBgColor: "#dcb8ff",
  IncomeIconBgColor: "#d9f0a1",

  // Home Screen
  HomeScreenBgColor: "#fefeff",
  HomeScreenGroupBackgroundColor: "#FFFFFF",
  HomeScreenGroupTitleColor: "#1F2937",
  HomeScreenItemBorderColor: "#E5E7EB",

  // Settings Screen
  SettingsScreenBackgroundColor: "#e0f0ff",
  SettingsGroupBackgroundColor: "#FFFFFF",
  SettingsGroupTitleColor: "#0f2ba8",
  SettingsItemBorderColor: "#E5E7EB",
  SettingsItemValueColor: "#000000",
  SettingsCurrencyCodeColor: "#6d7795",

  // Modals
  ModalBGColor: "#FFFFFF",
  ModalOverlayBgColor: "rgba(0,0,0,0.5)",
  ModalTitleColor: "#6d7795",
  ModalButtonTextColor: "#6d7795",
  ModalButtonBGColor: "#5cce43"
};

/* ──────────────────────────────

* DARK THEME CONFIGURATION
* ────────────────────────────── */
export const darkTheme: Theme = {
  DarkMode: true,
  BackgroundColor: "#0F172A",
  LoadingIndicatorColor: "#60A5FA",
  TextColor: "#E0E7FF",

  // Buttons
  ButtonBorderColor: "#1E293B",
  ButtonColor: "#2563EB",
  ButtonTextColor: "#FFFFFF",

  // User
  UserBackgroundColor: "rgba(255, 255, 255,0)",
  UserNameColor: "#F1F5F9",
  UserWelcomeTextColor: "#CBD5E1",
  UserStreakBorderColor: "#F59E0B",
  UserStreakBackgroundColor: "#ffffff",
  UserStreakTextColor: "",
  UserStreakFireIconFillColor: "#F59E0B",
  UserStreakFireIconStrokeColor: "#F59E0B",
  UserInsightTextColor: "",
  UserInsightTrendArrowFillColor: "#5cce43",
  UserInsightTrendArrowStrokeColor: "#5cce43",

  // Notifications
  NotificationCardBgColor: "#1E293B",
  NotificationCardTitleColor: "#F1F5F9",
  NotificationCardDescriptionColor: "#CBD5E1",
  NotificationCardTimeColor: "#94A3B8",

  // Balance Card
  BalanceCardColor: ["#5cce43", "#99FF00"],
  BalanceCardTitleColor: "#E0E7FF",
  BalanceCardAmountColor: "#FACC15",
  BalanceCardDeficitBadgeBackgroundColor: "#10B981",
  BalanceCardDeficitPercentageTextColor: "#FFFFFF",
  BalanceCardDeficitIconFillColor: "#FFFFFF",
  BalanceCardDeficitIconStrokeColor: "#10B981",
  BalanceCardBorderLineColor: "rgba(224, 231, 255, 0.2)",
  BalanceCardGoalsIconFillColor: "#E0E7FF",
  BalanceCardGoalsIconStrokeColor: "#E0E7FF",
  BalanceCardGoalsTextColor: "#E0E7FF",
  BalanceCardCalendarIconFillColor: "",
  BalanceCardCalendarIconStrokeColor: "#E0E7FF",
  BalanceCardLastUpdateTextColor: "#E0E7FF",

  // Quick Action Cards
  AddMoneyCardBgColor: "#059669", // Darker emerald green
  AddMoneyTextColor: "#FFFFFF",
  AddMoneyIconFillColor: "#FFFFFF",
  AddMoneyIconStrokeColor: "#FFFFFF",
  AddMoneyIconBgColor: "#18393b",
  WithdrawCardBgColor: "#D97706", // Darker amber orange
  WithdrawTextColor: "#FFFFFF",
  WithdrawIconFillColor: "",
  WithdrawIconStrokeColor: "",
  WithdrawIconBgColor: "", // White
  AddGoalCardBgColor: "#7C3AED", // Darker violet purple
  AddGoalTextColor: "#FFFFFF",
  AddGoalIconFillColor: "",
  AddGoalIconStrokeColor: "",
  AddGoalIconBgColor: "",

  // Goals List
  GoalsListHeaderTitleColor: "#ffffff",
  GoalsListHeaderCountColor: "#94A3B8",
  GoalCardBgColor: "#1c1c27",
  GoalCardNameColor: "#ffffff",
  GoalCardDeadlineIconColor: "#8b8b9e",
  GoalCardDeadlineTextColor: "#8b8b9e",
  GoalCardProgressBgColor: "rgba(255,255,255,0.08)",
  GoalCardProgressFillColor: "#10B981",
  GoalCardProgressTextColor: "#10B981",
  GoalCardAmountLabelColor: "#8b8b9e",
  GoalCardCurrentAmountColor: "#ffffff",
  GoalCardTargetAmountColor: "#8b8b9e",
  GoalCardBorderColor: "rgba(255,255,255,0.05)",
  GoalCardRemainingLabelColor: "#8b8b9e",
  GoalCardRemainingAmountColor: "#F59E0B",

  // Navbar (Bottom Tab Navigation)
  NavbarBgColor: "#1c1c27",
  NavbarBorderColor: "rgba(255,255,255,0.05)",
  NavbarIconActiveColor: "#00d4aa",
  NavbarIconInactiveColor: "#64748B",
  NavbarIconActiveBgColor: "rgba(0, 212, 170, 0.1)",
  NavbarTextActiveColor: "#00d4aa",
  NavbarTextInactiveColor: "#94A3B8",
  NavbarIndicatorColor: "#00d4aa",

  // Tabs
  TabButtonBgColor: "#1E293B",
  TabColour: "#1E293B",
  TabActiveColor: "#5cce43",
  TabActiveTextColor: "#FFFFFF",
  TabIconColour: "#5cce43",
  TabButtonInactiveColour: "#64748B",

  // Transactions / History
  TransactionHistoryLoadingColor: "#60A5FA",
  TransactionHistoryEmptyTextColor: "#94A3B8",
  TransactionTextIncomeColor: "#ffffff",
  TransactionTextExpenseColor: "#ffffff",
  TransactionTitleColor: "#E0E7FF",
  TransactionButtonBgColor: "#1E293B",
  SeparatorColor: "#334155",

  // Action Buttons
  AddButtonTextColor: "#FFFFFF",
  AddButtonBgColor: "#5cce43",
  SubstractButtonBgColor: "#5cce43",
  SubstractButtonTextColor: "#FFFFFF",

  // Withdraw Modal
  WitdrawModalSelectedBg: "#2563EB",
  WitdrawModalOptionText: "#E0E7FF",
  WithdrawModalInputBorderColor: "#5cce43",

  // Highlights
  HiglightColor: "#1E293B",
  Balance: "#FFffff",

  // Category Icons
  FoodIconBgColor: "#ffbe0b",
  MarketIconBgColor: "#fb5607",
  TransportIconBgColor: "#ff006e",
  BillIconBgColor: "#8338ec",
  IncomeIconBgColor: "#8ac926",

  // Home Screen
  HomeScreenBgColor: "#0F172A",
  HomeScreenGroupBackgroundColor: "#1E293B",
  HomeScreenGroupTitleColor: "#E0E7FF",
  HomeScreenItemBorderColor: "#1E293B",

  // Settings Screen
  SettingsScreenBackgroundColor: "#0F172A",
  SettingsGroupBackgroundColor: "#1E293B",
  SettingsGroupTitleColor: "#E0E7FF",
  SettingsItemBorderColor: "#1E293B",
  SettingsItemValueColor: "#ffffff",
  SettingsCurrencyCodeColor: "#5cce43",

  // Modals
  ModalBGColor: "#1E293B",
  ModalOverlayBgColor: "rgba(0,0,0,0.5)",
  ModalTitleColor: "#FFFFFF",
  ModalButtonTextColor: "#FFFFFF",
  ModalButtonBGColor: "#5cce43"
};

/* ──────────────────────────────

* THEME REDUCER
* Handles toggling between light and dark themes.
* ────────────────────────────── */
export type Action = { type: "SET_DARK_MODE"; payload?: boolean };

const themeReducer = (theme: Theme, action: Action): Theme => {
  if (action.type === "SET_DARK_MODE") {
    const isDark = !theme.DarkMode;
    return isDark ? darkTheme : initialTheme;
  }

  return theme;
};

export default themeReducer;

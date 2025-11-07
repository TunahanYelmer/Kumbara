export interface Theme {
  DarkMode: boolean;

  LoadingIndicatorColor: string;
  BackgroundColor: string;
  TextColor: string;
  BalanceCardColor: [string, string, ...string[]]; // at least 2 colors
  BalanceCardTitleColor: string;
  BalanceCardAmountColor: string;
  ButtonBorderColor: string;
  
  ButtonColor: string;
  ButtonTextColor: string;
  TabColour: string;
  TabButtonBgColor: string;
  TabActiveColor: string;
  TabActiveTextColor: string;
  TabIconColour: string;
  TabButtonInactiveColour: string;
  TransactionHistoryLoadingColor: string;
  TransactionHistoryEmptyTextColor: string;
  TransactionTextIncomeColor: string;
  TransactionTextExpenseColor: string;
  TransactionTitleColor: string;
  SeparatorColor: string;
  WitdrawModalSelectedBg: string;
  WitdrawModalOptionText: string;
  HiglightColor: string;
  TransactionButtonBgColor: string;
  AddButtonTextColor: string;
  AddButtonBgColor: string,
  SubstractButtonBgColor: string,
  SubstractButtonTextColor: string;
  Balance: string;
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

}

export const initialTheme: Theme = {
  // Light Mode - modern, clean, vivid palette
  DarkMode: false,
  BackgroundColor: "#FFFFFF", // soft light gray
  LoadingIndicatorColor: "#2563EB", // vibrant blue
  TextColor: "#1F2937", // dark slate gray, readable
  
  // Buttons & Borders
  ButtonBorderColor: "#E5E7EB", // soft gray
  ButtonColor: "#3B82F6", // bold blue
  ButtonTextColor: "#FFFFFF", // readable white
  
  // Balance Card
  BalanceCardColor: ["#3856d9", "#253cb0"], // deep to vivid blue gradient
  BalanceCardTitleColor: "#d5dbf5", // off-white
  BalanceCardAmountColor: "#d5dbf5",
  
  // Tabs & Action Buttons
  TabButtonBgColor: "#F3F4F6", // soft background for buttons
  TabColour: "#F3F4F6",
  TabActiveColor: "#0f2ba8",
  TabActiveTextColor: "#0f2ba8",
  TabIconColour: "#0f2ba8",
  TabButtonInactiveColour: "#c4c9d6",
  
  // Transaction / History
  TransactionHistoryLoadingColor: "#2563EB",
  TransactionHistoryEmptyTextColor: "#9CA3AF",
  TransactionTextIncomeColor: "#536082", // vivid green for income
  TransactionTextExpenseColor: "#536082", // vivid red for expense
  TransactionTitleColor: "#77809a",
  TransactionButtonBgColor: "#FFFFFF",
  SeparatorColor:"#677399" ,// soft blue for buttons
  
  // Action Buttons
  AddButtonTextColor: "#677399",
  AddButtonBgColor: "#e7eafe",
  SubstractButtonBgColor: "#e7eafe",
  SubstractButtonTextColor: "#677399",

  
  // Withdraw Modal
  WitdrawModalSelectedBg: "#3B82F6",
  WitdrawModalOptionText: "#1F2937",
  
  // Highlights
  HiglightColor: "#DBEAFE",
  Balance: "#2563EB",
  
  // Category Icons
  FoodIconBgColor: "#fff4ad", // yellow pastel
  MarketIconBgColor: "#ffb682", // light blue
  TransportIconBgColor: "#ff7aa7", // sky blue
  BillIconBgColor: "#dcb8ff", // pink/red
  IncomeIconBgColor: "#d9f0a1", // light green
  
  // Home Screen
  HomeScreenBgColor: "#fefeff",
  HomeScreenGroupBackgroundColor: "#FFFFFF",
  HomeScreenGroupTitleColor: "#1F2937",
  HomeScreenItemBorderColor: "#E5E7EB",
  
  // Settings Screen
  SettingsScreenBackgroundColor: "#fefeff",
  SettingsGroupBackgroundColor: "#FFFFFF",
  SettingsGroupTitleColor: "#6d7795",
  SettingsItemBorderColor: "#E5E7EB",
  SettingsItemValueColor: "#6B7280",
  SettingsCurrencyCodeColor: "#6d7795",

  //ModalS
  ModalBGColor: "#FFFFFF",
  ModalOverlayBgColor: "rgba(0,0,0,0.5)" // light gray transparent
, // semi-transparent black
};

export const darkTheme: Theme = {
  // Dark Mode - deep dark, vibrant blue accents
  DarkMode: true,
  BackgroundColor: "#0F172A", // very dark navy
  LoadingIndicatorColor: "#60A5FA", // soft blue
  TextColor: "#E0E7FF", // soft white
  
  // Buttons & Borders
  ButtonBorderColor: "#1E293B",
  ButtonColor: "#2563EB", // bright blue
  ButtonTextColor: "#FFFFFF",
  
  // Balance Card
  BalanceCardColor: ["#1E3A8A", "#3B82F6"], // deep to vivid gradient
  BalanceCardTitleColor: "#E0E7FF",
  BalanceCardAmountColor: "#FACC15", // gold accent
  
  // Tabs & Action Buttons
  TabButtonBgColor: "#1E293B",
  TabColour: "#1E293B",
  TabActiveColor: "#3B82F6",
  TabActiveTextColor: "#FFFFFF",
  TabIconColour: "#F87171", // coral red
  TabButtonInactiveColour: "#64748B",
  
  // Transaction / History
  TransactionHistoryLoadingColor: "#60A5FA",
  TransactionHistoryEmptyTextColor: "#94A3B8",
  TransactionTextIncomeColor: "#22C55E", // vivid green
  TransactionTextExpenseColor: "#F87171", // coral red
  TransactionTitleColor: "#E0E7FF",
  TransactionButtonBgColor: "#1E293B",
  SeparatorColor:"#334155",
  
  // Action Buttons
  AddButtonTextColor: "#60A5FA",
   AddButtonBgColor: "#DBEAFE",
  SubstractButtonBgColor: "#E0E7FF",
  SubstractButtonTextColor: "#F87171",
  
  // Withdraw Modal
  WitdrawModalSelectedBg: "#2563EB",
  WitdrawModalOptionText: "#E0E7FF",
  
  // Highlights
  HiglightColor: "#1E293B",
  Balance: "#FACC15",
  
  // Category Icons
  FoodIconBgColor: "#ffbe0b", // amber
  MarketIconBgColor: "#fb5607", // purple
  TransportIconBgColor: "#ff006e", // sky blue
  BillIconBgColor: "#8338ec", // red
  IncomeIconBgColor: "#8ac926", // green
  
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
  SettingsItemValueColor: "#94A3B8",
  SettingsCurrencyCodeColor: "#60A5FA",

  //ModalS
  ModalBGColor: "#1E293B",
  ModalOverlayBgColor: "rgba(0,0,0,0.5)",


};

export type Action = { type: "SET_DARK_MODE"; payload?: boolean };

const themeReducer = (theme: Theme, action: Action): Theme => {
  switch (action.type) {
    case "SET_DARK_MODE":
      const isDark = !theme.DarkMode;
      return isDark ? darkTheme : initialTheme;

    default:
      return theme;
  }
};

export default themeReducer;

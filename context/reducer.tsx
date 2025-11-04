export interface Transactions {
  id: number;
  type: "deposit" | "withdraw";
  amount: number;
  category?: "food" | "market" | "transport" | "bill" | "income";
  date: string;
}

export interface State {
  DarkMode: boolean;
  BioEnabled: boolean;
  PinEnabled: boolean;
  Balance: number;
  Transactions: Transactions[];
  Currency?: Currency[];
  // Add more state properties if needed
}
export interface Currency {
  code: string;
  symbol: string;
  name: string;
}
export interface NotificationSettings {
  dailyReminder: boolean;
  goalAlerts: boolean;
}
export interface ThemeSettings {
  darkMode: boolean;
}
export interface SecuritySettings {
  pinEnabled: boolean;
  biometricEnabled: boolean;
}

export type Action =
  | { type: "SET_BALANCE"; Balance?: number }
  | {
      type: "SET_TRANSACTIONS";
      Transactions?: Transactions[];
    }
  | { type: "SET_CURRENCY"; Currency?: Currency[] }
  | { type: "SET_PIN_SECURİTY" }
  | { type: "SET_BIO_SECURITY" }
  | { type: "SET_DARK_MODE" };

// Add more action types if needed

export const initialState: State = {
  DarkMode: false,
  BioEnabled: false,
  PinEnabled: false,
  Balance: 0,
  Transactions: [],
  Currency: [{ code: "TRY", symbol: "₺", name: "Turkish Lira" }]
  // Add more state properties if needed
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "SET_BALANCE":
      return {
        ...state,
        Balance: action.Balance ?? state.Balance
      };
    case "SET_TRANSACTIONS":
      return {
        ...state,
        Transactions: action.Transactions ?? state.Transactions
      };
    case "SET_CURRENCY":
      return {
        ...state,
        Currency: action.Currency ?? state.Currency
      };
    case "SET_PIN_SECURİTY":
      return {
        ...state,
        PinEnabled: !state.PinEnabled
      };
    case "SET_BIO_SECURITY":
      return {
        ...state,
        BioEnabled: !state.BioEnabled
      };
    case "SET_DARK_MODE":
      return {
        ...state,
        DarkMode: !state.DarkMode
      };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

export default reducer;

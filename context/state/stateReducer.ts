export interface Transactions {
  id: number;
  type: "deposit" | "withdraw";
  amount: number;
  category?: "food" | "market" | "transport" | "bill" | "income";
  date: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}
export interface SecuritySettings {
  pinEnabled: boolean;
  biometricEnabled: boolean;
}
export interface State {
  DailyReminder: boolean;
  GoalReminder: boolean;
  DarkMode: boolean;
  BioEnabled: boolean;
  PinEnabled: boolean;
  Balance: number;
  Transactions: Transactions[];
  Currency?: Currency[];
  // Add more state properties if needed
}
export const initialState: State = {
  GoalReminder: false,
  DailyReminder: false,
  DarkMode: false,
  BioEnabled: false,
  PinEnabled: false,
  Balance: 0,
  Transactions: [],
  Currency: [{ code: "TRY", symbol: "₺", name: "Turkish Lira" }]
  // Add more state properties if needed
};
export type Action =
  | { type: "SET_BALANCE"; Balance?: number }
  | {
      type: "SET_TRANSACTIONS";
      Transactions?: Transactions[];
    }
  | { type: "SET_CURRENCY"; Currency?: Currency[] }
  | { type: "SET_PIN_SECURITY" }
  | { type: "SET_BIO_SECURITY" }
  | { type: "SET_DARK_MODE" }
  | { type: "SET_GOAL_REMINDER" }
  | { type: "SET_DAILY_REMINDER" };

// Add more action types if needed

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
    case "SET_PIN_SECURITY":
      return {
        ...state,
        PinEnabled: !state.PinEnabled
      };
    case "SET_BIO_SECURITY":
      return {
        ...state,
        BioEnabled: !state.BioEnabled
      };

    case "SET_GOAL_REMINDER":
      return {
        ...state,
        GoalReminder: !state.GoalReminder
      };
    case "SET_DAILY_REMINDER":
      return {
        ...state,
        DailyReminder: !state.DailyReminder
      };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

export default reducer;

export interface Transactions {
  id: number;
  type: "deposit" | "withdraw";
  amount: number;
  category?: "food" | "market" | "transport" | "bill" | "income";
  date: string;
}

export interface State {
  Balance: number;
  Transactions: Transactions[];
  // Add more state properties if needed
}

export type Action =
  | { type: "SET_BALANCE"; Balance?: number }
  | { type: "SET_TRANSACTIONS"; Transactions?: Transactions[] };

// Add more action types if needed

export const initialState: State = {
  Balance: 0,
  Transactions: []
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
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

export default reducer;

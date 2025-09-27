"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import reducer, { initialState, State, Action } from "./reducer";

interface DataProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<
  [State, React.Dispatch<Action>] | undefined
>(undefined);

export const StateProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

export function useDataLayerValue(): [State, React.Dispatch<Action>] {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataLayerValue must be used within a DataProvider");
  }
  return context;
}
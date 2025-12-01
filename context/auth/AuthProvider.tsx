import {} from "react-native";
import React, { ReactNode, useReducer, createContext, useContext } from "react";
import {
  authState,
  authActions,
  authReducer,
  initialState
} from "@context/auth/authReducer";
import { AuthContextError } from "./AuthErrors";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<
  [authState, React.Dispatch<authActions>] | undefined
>(undefined);

export const useAuthContext = (): [authState, React.Dispatch<authActions>] => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new AuthContextError(
      "useAuthContext must be used within an AuthProvider"
    );
  }

  return context;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={[authState, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

// context/navigation/NavigationContext.tsx
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useCallback
} from "react";

import {
  navigationReducer,
  initialState,
  NavigationState,
  NavigationAction
} from "./navigationReducer";

import {
  navigationRef,
  RootStackParamList
} from "@/navigation/NavigationTypes";

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------

interface NavigationContextType {
  state: NavigationState;
  dispatch: React.Dispatch<NavigationAction>;
  navigate: (route: keyof RootStackParamList) => void;
  goBack: () => void;
}

// ---------------------------------------------------------
// Context
// ---------------------------------------------------------

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

// Custom hook to access navigation context safely
export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within NavigationProvider"
    );
  }
  return context;
};

// ---------------------------------------------------------
// Provider
// ---------------------------------------------------------

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  /**
   * Navigate to a screen
   * - Updates internal navigation state (Redux-like)
   * - Calls React Navigation if ready
   */
  const navigate = useCallback(
    (route: keyof RootStackParamList) => {
      dispatch({ type: "NAVIGATE", payload: { route } });

      if (navigationRef.isReady()) {
        navigationRef.navigate(route);
      }
    },
    [dispatch]
  );

  /**
   * Go back to previous screen
   */
  const goBack = useCallback(() => {
    dispatch({ type: "GO_BACK" });

    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  }, [dispatch]);

  return (
    <NavigationContext.Provider
      value={{
        state,
        dispatch,
        navigate,
        goBack
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

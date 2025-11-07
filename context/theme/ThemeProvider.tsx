import React, { createContext, useContext, ReactNode, useReducer } from "react";
import themeReducer, { Theme, initialTheme, Action } from "./themeReducer";

interface ThemeProviderProps {
  children: ReactNode;
}

// Context with [Theme, setTheme] tuple
export const ThemeContext = createContext<[Theme, React.Dispatch<Action>] | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useReducer(themeReducer, initialTheme);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): [Theme, React.Dispatch<Action>] => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

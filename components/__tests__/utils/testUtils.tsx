// test-utils.tsx
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { StateProvider } from "@/context/state/StateProvider";
import { ThemeProvider } from "@/context/theme/ThemeProvider";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <StateProvider>{children}</StateProvider>
  </ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };

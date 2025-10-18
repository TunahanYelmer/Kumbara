import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { StateProvider } from '../../context/StateProvider'; // adjust path

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <StateProvider>{children}</StateProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
import React from "react";
import { render, screen, waitFor, act } from "@components/__tests__/utils/testUtils";
import BalanceCard from "../BalanceCard/BalanceCard";
import * as api from "../../api/getBalance";
import { useDataLayerValue } from "../../context/state/StateProvider";

jest.mock("../../api/getBalance");
jest.mock("../../context/StateProvider", () => ({
  useDataLayerValue: jest.fn(),
  StateProvider: ({ children }: any) => <>{children}</>,
  __esModule: true,
}));
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: any) => <>{children}</>,
}));

const mockGetBalance = api.getBalance as jest.MockedFunction<typeof api.getBalance>;
const mockDispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useDataLayerValue as jest.Mock).mockReturnValue([
    { Balance: 0, Currency: [{ symbol: "₺" }] },
    mockDispatch,
  ]);
});

describe("BalanceCard", () => {
  it("renders loading state then updates with fetched balance", async () => {
    mockGetBalance.mockResolvedValueOnce(1234.56);

    await act(async () => {
      render(<BalanceCard />);
    });

    // Initially show loader
    expect(screen.getByTestId("loading-indicator")).toBeTruthy();

    // Wait for async update
    await act(async () => {
      await waitFor(() =>
        expect(screen.queryByTestId("loading-indicator")).toBeNull()
      );
    });

    const balanceText = screen.getByTestId("balance-amount");
    expect(balanceText.props.children).toBe("1234.56");
  });

  it("displays fallback balance when API returns null", async () => {
    mockGetBalance.mockResolvedValueOnce(null as unknown as number);

    await act(async () => {
      render(<BalanceCard />);
    });

    await act(async () => {
      await waitFor(() =>
        expect(screen.queryByTestId("loading-indicator")).toBeNull()
      );
    });

    const element = screen.getByTestId("balance-amount");
    expect(element.props.children).toBe("0.00");

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_BALANCE",
      Balance: null as unknown as number,
    });
  });

  it("handles API error gracefully", async () => {
    mockGetBalance.mockRejectedValueOnce(new Error("API Error"));

    await act(async () => {
      render(<BalanceCard />);
    });

    await act(async () => {
      await waitFor(() =>
        expect(screen.queryByTestId("loading-indicator")).toBeNull()
      );
    });

    const element = screen.getByTestId("balance-amount");
    expect(element.props.children).toBe("0.00");
  });
});

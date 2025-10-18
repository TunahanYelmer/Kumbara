import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import BalanceCard from "../BalanceCard";
import * as api from "../../api/getBalance";
import { useDataLayerValue } from "../../context/StateProvider";

// Mock API and Context
jest.mock("../../api/getBalance");
jest.mock("../../context/StateProvider");

const getTextString = (node: any): string => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return node.toString();
  if (Array.isArray(node)) return node.map(getTextString).join("");
  return "";
};

const mockGetBalance = api.getBalance as jest.MockedFunction<
  typeof api.getBalance
>;

// We'll track balance changes in the test
let balanceState = { value: 0 };
const mockDispatch = jest.fn((action) => {
  if (action.type === "SET_BALANCE") {
    balanceState.value = action.Balance;
  }
});

// Mock the context hook to return current balance and dispatch
(useDataLayerValue as jest.Mock).mockImplementation(() => [
  { Balance: balanceState.value },
  mockDispatch
]);

describe("BalanceCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    balanceState = { value: 0 };
  });

  it("renders loading indicator initially", () => {
    render(<BalanceCard />);
    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  it("fetches balance and updates context", async () => {
    mockGetBalance.mockResolvedValue(1234.56);

    render(<BalanceCard />);

    await waitFor(() => {
      const element = screen.getByTestId("balance-amount");
      const text = getTextString(element.props.children);
      expect(text.replace(/[$₺]/g, "")).toContain("1234.56");
    });

    expect(mockGetBalance).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_BALANCE",
      Balance: 1234.56
    });
  });

  it("displays fallback balance when Balance is null", async () => {
    mockGetBalance.mockResolvedValue(null as unknown as number);

    render(<BalanceCard />);

    await waitFor(() => {
      const element = screen.getByTestId("balance-amount");
      const text = element.props.children as string;
      expect(text).toContain("0.00");
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_BALANCE",
      Balance: null as unknown as number
    });
  });

  it("handles API error gracefully", async () => {
    mockGetBalance.mockRejectedValue(new Error("API Error"));

    render(<BalanceCard />);

    await waitFor(() => {
      const element = screen.getByTestId("balance-amount");
      const text = element.props.children as string;
      expect(text).toContain("0.00");
    });

    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: "SET_BALANCE",
      Balance: expect.any(Number)
    });
  });
});

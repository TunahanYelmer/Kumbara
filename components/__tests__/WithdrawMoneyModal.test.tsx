import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import WithdrawMoneyModal from "@components/WithdrawMoneyModal";
import { useDataLayerValue } from "@/context/state/StateProvider";
import { postTransaction } from "@api/postTransactions";
import { getTransactions } from "@api/getTransactions";

jest.mock("../../api/postTransactions");
jest.mock("../../api/getTransactions");
jest.mock("../../context/StateProvider", () => ({
  useDataLayerValue: jest.fn(),
  StateProvider: ({ children }: any) => <>{children}</>,
  __esModule: true,
}));


describe("WithdrawMoneyModal", () => {
  const mockDispatch = jest.fn();
  const mockSetModalVisible = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDataLayerValue as jest.Mock).mockReturnValue([
      { Balance: 500 },
      mockDispatch,
    ]);
    (postTransaction as jest.Mock).mockResolvedValue({});
    (getTransactions as jest.Mock).mockResolvedValue([
      { transaction_id: 1, type: "withdraw", amount: 100, category: "Food", created_at: "2025-01-01" },
    ]);
  });

  it("renders correctly in amount step", () => {
    const { getByTestId, getByText } = render(
      <WithdrawMoneyModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        onConfirm={mockOnConfirm}
      />
    );

    expect(getByText("Miktar Giriniz")).toBeTruthy();
    expect(getByTestId("amountInput")).toBeTruthy();
  });

  it("switches to reason step when valid amount entered", () => {
    const { getByTestId, getByText, queryByText } = render(
      <WithdrawMoneyModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        onConfirm={mockOnConfirm}
      />
    );

    const input = getByTestId("amountInput");
    fireEvent.changeText(input, "100");
    fireEvent.press(getByTestId("nextButton"));

    expect(queryByText("Para çekme sebebi")).toBeTruthy();
  });

  it("calls onConfirm and closes modal after confirming reason", async () => {
    const { getByTestId, getByText } = render(
      <WithdrawMoneyModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        onConfirm={mockOnConfirm}
      />
    );

    fireEvent.changeText(getByTestId("amountInput"), "100");
    fireEvent.press(getByTestId("nextButton"));
    fireEvent.press(getByTestId("reason-Food"));
    fireEvent.press(getByTestId("confirmButton"));

    await waitFor(() => expect(postTransaction).toHaveBeenCalledWith("withdraw", 100, "Food"));
    expect(mockOnConfirm).toHaveBeenCalledWith(100, "Food");
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });

  it("resets when cancel button pressed", () => {
    const { getByTestId } = render(
      <WithdrawMoneyModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        onConfirm={mockOnConfirm}
      />
    );

    fireEvent.press(getByTestId("cancelButton"));
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });
});

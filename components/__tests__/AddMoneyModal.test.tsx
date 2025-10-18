import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import AddMoneyModal from "../AddMoneyModal";

// ----------------------
// Mock APIs
// ----------------------
jest.mock("../../api/getBalance", () => ({
  getBalance: jest.fn(),
}));
jest.mock("../../api/postBalance", () => ({
  postBalance: jest.fn(),
}));
jest.mock("../../api/postTransactions", () => ({
  postTransaction: jest.fn(),
}));

import { getBalance } from "../../api/getBalance";
import { postBalance } from "../../api/postBalance";
import { postTransaction } from "../../api/postTransactions";

// Cast to jest mocks
const mockGetBalance = getBalance as jest.MockedFunction<typeof getBalance>;
const mockPostBalance = postBalance as jest.MockedFunction<typeof postBalance>;
const mockPostTransaction = postTransaction as jest.MockedFunction<typeof postTransaction>;

// ----------------------
// Mock context
// ----------------------
jest.mock("../../context/StateProvider", () => ({
  useDataLayerValue: () => [
    { Balance: 1000, Transactions: [] },
    jest.fn(),
  ],
}));

// ----------------------
// Mock Alert
// ----------------------
const alertMock = jest.spyOn(require("react-native").Alert, "alert").mockImplementation(() => {});

// Silence console.error
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
  alertMock.mockRestore();
});

describe("AddMoneyModal", () => {
  const setModalVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetBalance.mockResolvedValue(1000);
    mockPostBalance.mockResolvedValue(undefined);
    mockPostTransaction.mockResolvedValue(undefined);
  });

  it("renders modal and inputs", () => {
    render(<AddMoneyModal modalVisible={true} setModalVisible={setModalVisible} />);
    expect(screen.getByText("Miktar Giriniz")).toBeTruthy();
    expect(screen.getByPlaceholderText("Örn: 100")).toBeTruthy();
    expect(screen.getByText("Add")).toBeTruthy();
    expect(screen.getByText("Cancel")).toBeTruthy();
  });

  it("closes when cancel button is pressed", () => {
    render(<AddMoneyModal modalVisible={true} setModalVisible={setModalVisible} />);
    fireEvent.press(screen.getByText("Cancel"));
    expect(setModalVisible).toHaveBeenCalledWith(false);
  });

  it("adds money and updates balance successfully", async () => {
    render(<AddMoneyModal modalVisible={true} setModalVisible={setModalVisible} />);
    const input = screen.getByPlaceholderText("Örn: 100");

    fireEvent.changeText(input, "500");
    fireEvent.press(screen.getByText("Add"));

    await waitFor(() => {
      expect(mockGetBalance).toHaveBeenCalled();
      expect(mockPostBalance).toHaveBeenCalledWith(1500); // 1000 + 500
      expect(mockPostTransaction).toHaveBeenCalledWith("deposit", 500, "income");
      expect(alertMock).toHaveBeenCalledWith("Başarılı ✅", "500 eklendi.");
      expect(input.props.value).toBe("");
    });
  });

  it("shows error alert when API fails", async () => {
    mockPostBalance.mockRejectedValueOnce(new Error("fail"));

    render(<AddMoneyModal modalVisible={true} setModalVisible={setModalVisible} />);
    const input = screen.getByPlaceholderText("Örn: 100");

    fireEvent.changeText(input, "500");
    fireEvent.press(screen.getByText("Add"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Hata ❌", "Sunucuya bağlanılamadı.");
    });
  });

  it("does nothing for invalid input", async () => {
    render(<AddMoneyModal modalVisible={true} setModalVisible={setModalVisible} />);
    const input = screen.getByPlaceholderText("Örn: 100");

    fireEvent.changeText(input, "abc");
    fireEvent.press(screen.getByText("Add"));

    await waitFor(() => {
      expect(mockGetBalance).not.toHaveBeenCalled();
      expect(mockPostBalance).not.toHaveBeenCalled();
      expect(mockPostTransaction).not.toHaveBeenCalled();
      expect(alertMock).not.toHaveBeenCalled();
    });
  });

  it("auto-adds money when modal closes with input value", async () => {
    const Wrapper: React.FC = () => {
      const [modalVisible, setModalVisibleState] = React.useState(true);
      return <AddMoneyModal modalVisible={modalVisible} setModalVisible={setModalVisibleState} />;
    };

    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Örn: 100");
    fireEvent.changeText(input, "300");

    // Simulate modal closing
    fireEvent(screen.getByTestId("modal-overlay"), "onRequestClose");

    await waitFor(() => {
      expect(mockPostBalance).toHaveBeenCalledWith(1300); // 1000 + 300
      expect(mockPostTransaction).toHaveBeenCalledWith("deposit", 300, "income");
      expect(alertMock).toHaveBeenCalledWith("Başarılı ✅", "300 eklendi.");
    });
  });
});

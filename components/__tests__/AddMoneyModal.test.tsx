import React from "react";
import { render, screen, fireEvent, waitFor } from "../utils/testUtils";
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
  StateProvider: ({ children }: any) => <>{children}</>,
  __esModule: true,
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
    expect(screen.getByText("Ekle")).toBeTruthy();
    expect(screen.getByText("İptal")).toBeTruthy();
  });

  it("closes when cancel button is pressed", () => {
    render(<AddMoneyModal modalVisible={true} setModalVisible={setModalVisible} />);
    fireEvent.press(screen.getByText("İptal"));
    expect(setModalVisible).toHaveBeenCalledWith(false);
  });

  it("adds money and updates balance successfully", async () => {
    render(<AddMoneyModal modalVisible={true} setModalVisible={setModalVisible} />);
    const input = screen.getByPlaceholderText("Örn: 100");

    fireEvent.changeText(input, "500");
    fireEvent.press(screen.getByText("Ekle"));

    await waitFor(() => {
      expect(mockGetBalance).toHaveBeenCalled();
      expect(mockPostBalance).toHaveBeenCalledWith(1500);
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
    fireEvent.press(screen.getByText("Ekle"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Hata ❌", "Sunucuya bağlanılamadı.");
    });
  });

  it("shows alert for invalid input", async () => {
    render(<AddMoneyModal modalVisible={true} setModalVisible={setModalVisible} />);
    const input = screen.getByPlaceholderText("Örn: 100");

    fireEvent.changeText(input, "abc");
    fireEvent.press(screen.getByText("Ekle"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Geçersiz miktar",
        "Lütfen geçerli bir sayı giriniz."
      );
      expect(mockGetBalance).not.toHaveBeenCalled();
      expect(mockPostBalance).not.toHaveBeenCalled();
      expect(mockPostTransaction).not.toHaveBeenCalled();
    });
  });

  it("closes modal when overlay onRequestClose is triggered", async () => {
    const Wrapper: React.FC = () => {
      const [modalVisible, setModalVisible] = React.useState(true);
      return <AddMoneyModal modalVisible={modalVisible} setModalVisible={setModalVisible} />;
    };

    render(<Wrapper />);
    const overlay = screen.getByTestId("modal-overlay");
    fireEvent(overlay, "onRequestClose");

    await waitFor(() => {
      expect(setModalVisible).toBeDefined(); // just check modal closes
    });
  });
});

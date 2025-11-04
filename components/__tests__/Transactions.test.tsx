import React from "react";
import { render, fireEvent, screen } from "@components/__tests__/utils/testUtils";
import { Text } from "react-native";
import Transactions from "../Transactions";

// --- Mock Modals ---
jest.mock("../AddMoneyModal", () => {
  return ({ modalVisible }: { modalVisible: boolean }) => {
    return modalVisible ? <Text testID="add-modal">Add Modal Open</Text> : null;
  };
});

jest.mock("../WithdrawMoneyModal", () => {
  return ({
    modalVisible,
    onConfirm,
  }: {
    modalVisible: boolean;
    onConfirm: (amount: number, reason: string) => void;
  }) => {
    return modalVisible ? (
      <Text
        testID="withdraw-modal"
        onPress={() => onConfirm(50, "Test reason")}
      >
        Withdraw Modal Open
      </Text>
    ) : null;
  };
});

describe("💰 Transactions Component", () => {
  it("renders both Add and Withdraw buttons", () => {
    render(<Transactions />);
    expect(screen.getByTestId("add-money-button")).toBeTruthy();
    expect(screen.getByTestId("withdraw-money-button")).toBeTruthy();
    expect(screen.getByText("Para Ekle")).toBeTruthy();
    expect(screen.getByText("Para Çıkar")).toBeTruthy();
  });

  it("opens AddMoneyModal when 'Para Ekle' button is pressed", () => {
    render(<Transactions />);
    fireEvent.press(screen.getByTestId("add-money-button"));
    expect(screen.getByTestId("add-modal")).toBeTruthy();
  });

  it("opens WithdrawMoneyModal when 'Para Çıkar' button is pressed", () => {
    render(<Transactions />);
    fireEvent.press(screen.getByTestId("withdraw-money-button"));
    expect(screen.getByTestId("withdraw-modal")).toBeTruthy();
  });

  it("updates withdrawData when onConfirm is called from WithdrawMoneyModal", () => {
    render(<Transactions />);

    fireEvent.press(screen.getByTestId("withdraw-money-button"));
    fireEvent.press(screen.getByTestId("withdraw-modal"));

    const withdrawInfo = screen.getByTestId("withdraw-info");
    expect(withdrawInfo.props.children.join("")).toContain(
      "Çekilen: 50 ₺, Sebep: Test reason"
    );
  });
});

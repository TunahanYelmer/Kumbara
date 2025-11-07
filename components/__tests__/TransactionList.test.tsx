import React from "react";
import { render, screen } from "@components/__tests__/utils/testUtils";
import TransactionList from "../TransactionHistory/TransactionList";

describe("TransactionList Component", () => {
  it("renders correctly for income type", () => {
    render(<TransactionList paymentType="income" amount={500} />);
    expect(screen.getByTestId("transaction-title").props.children).toBe("Gelir");
    expect(screen.getByTestId("transaction-amount").props.children).toContain("+500 ₺");
    expect(screen.getByTestId("transaction-amount").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "#4CAF50" })])
    );
  });

  it("renders correctly for expense types (e.g., food)", () => {
    render(<TransactionList paymentType="food" amount={120} />);
    expect(screen.getByTestId("transaction-title").props.children).toBe("Yemek");
    expect(screen.getByTestId("transaction-amount").props.children).toContain("-120 ₺");
    expect(screen.getByTestId("transaction-amount").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "#213361" })])
    );
  });

  it("uses 'bill' as fallback for invalid type", () => {
    // @ts-expect-error testing invalid case
    render(<TransactionList paymentType="unknown" amount={100} />);
    expect(screen.getByTestId("transaction-title").props.children).toBe("Fatura");
  });

  it("renders the correct icon background color", () => {
    render(<TransactionList paymentType="transport" amount={90} />);
    const iconBg = screen.getByTestId("icon-bg");
    const bgColor = iconBg.props.style.find((s: any) => s.backgroundColor);
    expect(bgColor.backgroundColor).toBe("#E0F7FA");
  });
});

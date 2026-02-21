import { useState, useEffect } from "react"; // Add useState!

import {
  getMonthYear,
  getPreviousMonthYear,
  isSameMonth
} from "@/utils/dateHelper";
import { getTransactions } from "@/api/getTransactions";
import { Transactions } from "@/context/state/stateReducer";

type ChangeDirection = "increased" | "decreased" | "equal";

export const useCalculateSavings = (userToken: string | null) => {
  // ✅ Fixed syntax
  // 1. State for results
  const [percentage, setPercentage] = useState<number>(0);
  const [change, setChange] = useState<ChangeDirection>("equal");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 2. Get auth token

  // 3. Effect to calculate
  useEffect(() => {
    const calculate = async () => {
      // async function INSIDE useEffect
      if (!userToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch transactions
        const transactions = await getTransactions(userToken);
        const date = new Date(); // ✅ Added parentheses

        // Get current month info
        const current = getMonthYear(date);
        const previous = getPreviousMonthYear(date);

        // ✅ Use .filter() instead of loop
        const currentMonthTransactions = transactions.filter((transaction) => {
          const transDate = new Date(transaction.date);
          return isSameMonth(transDate, current.month, current.year);
        });

        const previousMonthTransactions = transactions.filter((transaction) => {
          const transDate = new Date(transaction.date);
          return isSameMonth(transDate, previous.month, previous.year);
        });
        const previousSavings = calculateTotal(previousMonthTransactions);
        const currentSavings = calculateTotal(currentMonthTransactions);

        // Handle edge cases first (division by zero scenarios)

        // Edge case 1: Previous was zero, but now have savings (first month)
        if (previousSavings === 0 && currentSavings > 0) {
          setPercentage(100); // Treat as 100% increase
          setChange("increased");
        }
        // Edge case 2: Had savings, now have zero (depleted all savings)
        else if (currentSavings === 0 && previousSavings > 0) {
          setPercentage(100); // Lost all savings = 100% decrease
          setChange("decreased");
        }
        // Edge case 3: Both zero (no savings in either month)
        else if (previousSavings === 0 && currentSavings === 0) {
          setPercentage(0);
          setChange("equal");
        }
        // Normal case: Both have values, calculate percentage change
        else {
          const difference = currentSavings - previousSavings;
          const percentageValue = Math.abs(
            (difference / previousSavings) * 100
          );

          setPercentage(percentageValue);

          // Determine direction based on difference
          if (difference > 0) {
            setChange("increased");
          } else if (difference < 0) {
            setChange("decreased");
          } else {
            // difference === 0 (same amount in both months)
            setChange("equal");
          }
        }
      } catch (error) {
        console.warn("Error calculating savings:", error);
        setPercentage(0);
      } finally {
        setIsLoading(false);
      }
    };

    calculate();
    // Call the async function
  }, [userToken]);

  // 4. Return values
  return { percentage, change, isLoading };
};
const calculateTotal = (transactions: Transactions[]): number => {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === "deposit") {
      return total + transaction.amount;
    } else if (transaction.type === "withdraw") {
      return total - transaction.amount;
    }
    return total; // Default case
  }, 0); // Start with 0
};

// db.ts
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("kumbara.db");

// Initialize tables
export function initDB() {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS accounts (
      account_id INTEGER PRIMARY KEY AUTOINCREMENT,
      balance REAL NOT NULL DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL,
      type TEXT CHECK(type IN ('deposit', 'withdraw')) NOT NULL,
      category TEXT,
      amount REAL NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (account_id) REFERENCES accounts(account_id)
    );
  `);
}

// Add money
export async function addMoney(amount: number) {
  // Validation
  if (!amount || amount <= 0) {
    throw new Error("Amount must be a positive number");
  }
  if (!Number.isFinite(amount)) {
    throw new Error("Amount must be a valid number");
  }

  try {
    await db.runAsync("UPDATE accounts SET balance = balance + ? WHERE account_id = 1", [amount]);
    await db.runAsync(
      "INSERT INTO transactions (account_id, type, amount) VALUES (?, 'deposit', ?)",
      [1, amount]
    );
  } catch (error) {
    console.error("Error adding money:", error);
    throw new Error("Failed to add money to account");
  }
}

// Withdraw money
export async function withdrawMoney(amount: number, category: string) {
  // Validation
  if (!amount || amount <= 0) {
    throw new Error("Amount must be a positive number");
  }
  if (!Number.isFinite(amount)) {
    throw new Error("Amount must be a valid number");
  }
  if (!category || category.trim() === "") {
    throw new Error("Category is required for withdrawals");
  }

  try {
    // Check if sufficient balance exists
    const currentBalance = await getBalance();
    if (currentBalance < amount) {
      throw new Error(`Insufficient balance. Current balance: ${currentBalance}, Requested: ${amount}`);
    }

    await db.runAsync("UPDATE accounts SET balance = balance - ? WHERE account_id = 1", [amount]);
    await db.runAsync(
      "INSERT INTO transactions (account_id, type, category, amount) VALUES (?, 'withdraw', ?, ?)",
      [1, category, amount]
    );
  } catch (error) {
    console.error("Error withdrawing money:", error);
    // Re-throw the error if it's already a known error, otherwise wrap it
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to withdraw money from account");
  }
}

// Get balance
export async function getBalance() {
  try {
    const result = await db.getFirstAsync<{ balance: number }>(
      "SELECT balance FROM accounts WHERE account_id = 1"
    );
    return result?.balance ?? 0;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw new Error("Failed to fetch account balance");
  }
}

// Get all transactions
export async function getTransactions() {
  try {
    return await db.getAllAsync(
      "SELECT * FROM transactions WHERE account_id = 1 ORDER BY created_at DESC"
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export default db;

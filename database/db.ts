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
  await db.runAsync("UPDATE accounts SET balance = balance + ? WHERE account_id = 1", [amount]);
  await db.runAsync(
    "INSERT INTO transactions (account_id, type, amount) VALUES (?, 'deposit', ?)",
    [1, amount]
  );
}

// Withdraw money
export async function withdrawMoney(amount: number, category: string) {
  await db.runAsync("UPDATE accounts SET balance = balance - ? WHERE account_id = 1", [amount]);
  await db.runAsync(
    "INSERT INTO transactions (account_id, type, category, amount) VALUES (?, 'withdraw', ?, ?)",
    [1, category, amount]
  );
}

// Get balance
export async function getBalance() {
  const result = await db.getFirstAsync<{ balance: number }>(
    "SELECT balance FROM accounts WHERE account_id = 1"
  );
  return result?.balance ?? 0;
}

// Get all transactions
export async function getTransactions() {
  return await db.getAllAsync(
    "SELECT * FROM transactions WHERE account_id = 1 ORDER BY created_at DESC"
  );
}

export default db;

package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func initDB() {
	var err error
	db, err = sql.Open("sqlite3", "../database/database.db")
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}

	// Create balance table (single row)
	_, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS balance (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            amount REAL NOT NULL DEFAULT 0
        )
    `)
	if err != nil {
		log.Fatal("Failed to create balance table:", err)
	}

	// Ensure balance row exists
	_, err = db.Exec(`INSERT OR IGNORE INTO balance(id, amount) VALUES (1, 0)`)
	if err != nil {
		log.Fatal("Failed to insert initial balance:", err)
	}

	// Create transactions table
	_, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT CHECK(type IN ('deposit', 'withdraw')) NOT NULL,
            category TEXT,
            amount REAL NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `)
	if err != nil {
		log.Fatal("Failed to create transactions table:", err)
	}
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Println("Failed to write JSON response:", err)
	}
}

func getBalance(w http.ResponseWriter, r *http.Request) {
	var amount float64
	err := db.QueryRow("SELECT amount FROM balance WHERE id = 1").Scan(&amount)
	if err != nil {
		if err == sql.ErrNoRows {
			writeJSON(w, http.StatusNotFound, map[string]string{"error": "Balance not found"})
			return
		}
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Database error"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]float64{"balance": amount})
}

func postBalance(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Balance float64 `json:"balance"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
		return
	}
	_, err := db.Exec("UPDATE balance SET amount = ? WHERE id = 1", req.Balance)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to update balance"})
		return
	}
	writeJSON(w, http.StatusNoContent, nil)
}

func getTransactions(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, type, category, amount, date FROM transactions ORDER BY date DESC")
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to fetch transactions"})
		return
	}
	defer rows.Close()

	var txs []map[string]interface{}
	for rows.Next() {
		var id int
		var typ string
		var category sql.NullString
		var amount float64
		var date string

		if err := rows.Scan(&id, &typ, &category, &amount, &date); err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read transaction"})
			return
		}

		txs = append(txs, map[string]interface{}{
			"transaction_id": id,
			"type":           typ,
			"category":       category.String,
			"amount":         amount,
			"created_at":     date,
		})
	}
	writeJSON(w, http.StatusOK, txs)
}

func postTransaction(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Type     string  `json:"type"`     // "deposit" or "withdraw"
		Category string  `json:"category"` // optional
		Amount   float64 `json:"amount"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
		return
	}

	if req.Amount <= 0 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Amount must be positive"})
		return
	}

	if req.Type != "deposit" && req.Type != "withdraw" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid type"})
		return
	}

	tx, err := db.Begin()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to begin transaction"})
		return
	}
	defer tx.Rollback()

	// Check balance for withdrawal
	if req.Type == "withdraw" {
		var balance float64
		if err := tx.QueryRow("SELECT amount FROM balance WHERE id = 1").Scan(&balance); err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read balance"})
			return
		}
		if balance < req.Amount {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Insufficient balance"})
			return
		}
	}

	// Update balance
	balanceSQL := "UPDATE balance SET amount = amount + ? WHERE id = 1"
	if req.Type == "withdraw" {
		req.Amount = -req.Amount
	}
	if _, err := tx.Exec(balanceSQL, req.Amount); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to update balance"})
		return
	}

	// Insert transaction
	_, err = tx.Exec("INSERT INTO transactions (type, category, amount) VALUES (?, ?, ?)", req.Type, req.Category, req.Amount)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to insert transaction"})
		return
	}

	if err := tx.Commit(); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to commit transaction"})
		return
	}

	writeJSON(w, http.StatusCreated, map[string]string{"status": "Transaction completed"})
}

func main() {
	initDB()

	http.HandleFunc("/balance", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getBalance(w, r)
		case http.MethodPost:
			postBalance(w, r)
		default:
			writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		}
	})

	http.HandleFunc("/transactions", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getTransactions(w, r)
		case http.MethodPost:
			postTransaction(w, r)
		default:
			writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		}
	})

	log.Println("API server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

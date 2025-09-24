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
		log.Fatal(err)
	}
	// Create balance table (single row)
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS balance (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        amount REAL NOT NULL DEFAULT 0
    )`)
	if err != nil {
		log.Fatal(err)
	}
	// Ensure balance row exists
	_, err = db.Exec(`INSERT OR IGNORE INTO balance(id, amount) VALUES (1, 0)`)
	if err != nil {
		log.Fatal(err)
	}
	// Create transactions table
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS transactions (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT CHECK(type IN ('deposit', 'withdraw')) NOT NULL,
        category TEXT,
        amount REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)
	if err != nil {
		log.Fatal(err)
	}
}

func getBalance(w http.ResponseWriter, r *http.Request) {
	row := db.QueryRow("SELECT amount FROM balance WHERE id = 1")
	var amount float64
	if err := row.Scan(&amount); err != nil {
		http.Error(w, "Balance not found", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(map[string]float64{"balance": amount})
}

func postBalance(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Balance float64 `json:"balance"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	_, err := db.Exec("UPDATE balance SET amount = ? WHERE id = 1", req.Balance)
	if err != nil {
		http.Error(w, "Failed to update balance", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func getTransactions(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT transaction_id, type, category, amount, created_at FROM transactions ORDER BY created_at DESC")
	if err != nil {
		http.Error(w, "Failed to get transactions", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var txs []map[string]interface{}
	for rows.Next() {
		var id int
		var typ, category string
		var amount float64
		var createdAt string
		rows.Scan(&id, &typ, &category, &amount, &createdAt)
		txs = append(txs, map[string]interface{}{
			"transaction_id": id,
			"type":           typ,
			"category":       category,
			"amount":         amount,
			"created_at":     createdAt,
		})
	}
	json.NewEncoder(w).Encode(txs)
}

func postTransaction(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Type     string  `json:"type"`     // "deposit" or "withdraw"
		Category string  `json:"category"` // optional
		Amount   float64 `json:"amount"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	tx, err := db.Begin()
	if err != nil {
		http.Error(w, "Failed to begin transaction", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	// Update balance
	var balanceUpdate string
	if req.Type == "deposit" {
		balanceUpdate = "UPDATE balance SET amount = amount + ? WHERE id = 1"
	} else if req.Type == "withdraw" {
		balanceUpdate = "UPDATE balance SET amount = amount - ? WHERE id = 1"
	} else {
		http.Error(w, "Invalid type", http.StatusBadRequest)
		return
	}
	_, err = tx.Exec(balanceUpdate, req.Amount)
	if err != nil {
		http.Error(w, "Failed to update balance", http.StatusInternalServerError)
		return
	}
	// Insert transaction
	_, err = tx.Exec(
		"INSERT INTO transactions (type, category, amount) VALUES (?, ?, ?)",
		req.Type, req.Category, req.Amount,
	)
	if err != nil {
		http.Error(w, "Failed to insert transaction", http.StatusInternalServerError)
		return
	}
	if err := tx.Commit(); err != nil {
		http.Error(w, "Failed to commit transaction", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
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
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	http.HandleFunc("/transactions", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getTransactions(w, r)
		case http.MethodPost:
			postTransaction(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	log.Println("API server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

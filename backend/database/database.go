package database

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func InitDB() {
	var err error
	db, err = sql.Open("sqlite3", "../database/database.db")
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}

	// Create balance table (single row)
	_, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS balance (
            id INTEGER PRIMARY KEY CHECK (id = 1),
			user_id INTEGER NOT NULL,
            amount REAL NOT NULL DEFAULT 0,
			Foreign KEY(user_id) REFERENCES users(id)
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
			user_id INTEGER NOT NULL,
            type TEXT CHECK(type IN ('deposit', 'withdraw')) NOT NULL,
            category TEXT,
            amount REAL NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			Foreign KEY(user_id) REFERENCES users(id)

        )
    `)
	if err != nil {
		log.Fatal("Failed to create transactions table:", err)
	}
	// Create users table
	_, err = db.Exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        name TEXT,
        provider TEXT CHECK(provider IN ('google', 'apple', 'email')),
        provider_user_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(provider, provider_user_id)
    )
`)
	if err != nil {
		log.Fatal("Failed to create users table:", err)
	}

}

func GetDB() *sql.DB {
	if db == nil {
		log.Fatal("Database not initialized. Call InitDB() first.")
	}

	return db
}

func WriteJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Println("Failed to write JSON response:", err)
	}
}

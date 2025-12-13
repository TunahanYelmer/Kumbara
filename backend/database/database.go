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

	// 1️⃣ Create users table FIRST (no dependencies)
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT NOT NULL,
			name TEXT,
			provider TEXT CHECK(provider IN ('google', 'apple', 'email')),
			provider_user_id TEXT,
			givenName TEXT,
			photoUrl TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			UNIQUE(provider, provider_user_id)
		)
	`)
	if err != nil {
		log.Fatal("Failed to create users table:", err)
	}

	// 2️⃣ Create balance table SECOND (depends on users)
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS balance (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL,
			amount REAL NOT NULL DEFAULT 0,
			UNIQUE(user_id),
			FOREIGN KEY(user_id) REFERENCES users(id)
		)
	`)
	if err != nil {
		log.Fatal("Failed to create balance table:", err)
	}

	// 3️⃣ Create transactions table THIRD (depends on users)
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS transactions (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL,
			type TEXT CHECK(type IN ('deposit', 'withdraw')) NOT NULL,
			category TEXT,
			amount REAL NOT NULL,
			date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY(user_id) REFERENCES users(id)
		)
	`)
	if err != nil {
		log.Fatal("Failed to create transactions table:", err)
	}
}

func GetDB() *sql.DB {
	if db == nil {
		log.Fatal("Database not initialized. Call InitDB() first.")
	}

	return db
}
func CheckUser(user_id string, provider string) (int64, error) {
	var userID int64
	err := db.QueryRow(`SELECT id  FROM users  WHERE provider_user_id = ? AND provider = ?`, user_id, provider).Scan(&userID)
	if err != nil {
		return 0, err
	}
	return userID, nil

}

func WriteJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Println("Failed to write JSON response:", err)
	}
}

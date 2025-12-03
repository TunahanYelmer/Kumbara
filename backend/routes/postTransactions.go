package routes

import (
	"encoding/json"
	"net/http"

	"backend/auth"
	"backend/database"
)

func PostTransaction(w http.ResponseWriter, r *http.Request) {
	db := database.GetDB()

	// Extract user_id from JWT context (NOT from request body!)
	userID, ok := r.Context().Value(auth.UserIDKey).(int64)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req struct {
		Type     string  `json:"type"`     // "deposit" or "withdraw"
		Category string  `json:"category"` // optional
		Amount   float64 `json:"amount"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		database.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
		return
	}

	if req.Amount <= 0 {
		database.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "Amount must be positive"})
		return
	}

	if req.Type != "deposit" && req.Type != "withdraw" {
		database.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid type"})
		return
	}

	tx, err := db.Begin()
	if err != nil {
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to begin transaction"})
		return
	}
	defer tx.Rollback()

	// Check balance for withdrawal
	if req.Type == "withdraw" {
		var balance float64
		if err := tx.QueryRow("SELECT balance FROM balance WHERE user_id = ?", userID).Scan(&balance); err != nil {
			database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read balance"})
			return
		}
		if balance < req.Amount {
			database.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "Insufficient balance"})
			return
		}
	}

	// Update balance
	amount := req.Amount
	if req.Type == "withdraw" {
		amount = -req.Amount
	}
	if _, err := tx.Exec("UPDATE balance SET balance = balance + ? WHERE user_id = ?", amount, userID); err != nil {
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to update balance"})
		return
	}

	// Insert transaction
	_, err = tx.Exec("INSERT INTO transactions (user_id, type, category, amount) VALUES (?, ?, ?, ?)", userID, req.Type, req.Category, amount)
	if err != nil {
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to insert transaction"})
		return
	}

	if err := tx.Commit(); err != nil {
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to commit transaction"})
		return
	}

	database.WriteJSON(w, http.StatusCreated, map[string]string{"status": "Transaction completed"})
}

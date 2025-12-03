package routes

import (
	"database/sql"
	"net/http"

	"backend/auth"
	"backend/database"
)

func GetBalance(w http.ResponseWriter, r *http.Request) {
	var amount float64
	db := database.GetDB()
	userID, ok := r.Context().Value(auth.UserIDKey).(int64)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return

	}

	err := db.QueryRow("SELECT amount FROM balance WHERE id = ?", userID).Scan(&amount)
	if err != nil {
		if err == sql.ErrNoRows {
			database.WriteJSON(w, http.StatusNotFound, map[string]string{"error": "Balance not found"})
			return
		}
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Database error"})
		return
	}
	database.WriteJSON(w, http.StatusOK, map[string]float64{"balance": amount})
}

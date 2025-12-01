package routes

import (
	"database/sql"
	"net/http"

	"backend/database"
)

func GetBalance(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var amount float64
	err := db.QueryRow("SELECT amount FROM balance WHERE id = 1").Scan(&amount)
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

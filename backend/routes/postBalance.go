package routes

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"backend/database"
)

func PostBalance(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var req struct {
		Balance float64 `json:"balance"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		database.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
		return
	}
	_, err := db.Exec("UPDATE balance SET amount = ? WHERE id = 1", req.Balance)
	if err != nil {
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to update balance"})
		return
	}
	database.WriteJSON(w, http.StatusNoContent, nil)
}

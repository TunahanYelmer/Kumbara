package routes

import (
	"encoding/json"
	"net/http"

	"backend/auth"
	"backend/database"
)

func PostBalance(w http.ResponseWriter, r *http.Request) {

	db := database.GetDB()
	var req struct {
		Balance float64 `json:"balance"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		database.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
		return
	}
	userID, ok := r.Context().Value(auth.UserIDKey).(int64)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	_, err := db.Exec("UPDATE balance SET amount = ? WHERE user_id = ?", req.Balance, userID)
	if err != nil {
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to update balance"})
		return
	}
	database.WriteJSON(w, http.StatusNoContent, nil)
}

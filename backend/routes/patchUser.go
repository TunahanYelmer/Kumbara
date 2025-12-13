package routes

import (
	"encoding/json"
	"log"
	"net/http"

	"backend/auth"
	"backend/database"
)

func PatchUser(w http.ResponseWriter, r *http.Request) {

	db := database.GetDB()
	var req struct {
		GivenName string `json:"givenName"`
		PhotoUrl  string `json:"photoUrl"`
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
	_, err := db.Exec("UPDATE users SET givenName = ? , photoUrl = ? WHERE id = ?", req.GivenName, req.PhotoUrl, userID)
	if err != nil {
		log.Printf("SQL Error: %v", err) // Add this line to see the SQL error
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to update user"})
		return
	}
	database.WriteJSON(w, http.StatusOK, "User updated succesfully")

}

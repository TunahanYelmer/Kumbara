package google

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"

	"google.golang.org/api/idtoken"

	"backend/auth"
	"backend/database"
)

func GoogleAuth(w http.ResponseWriter, r *http.Request) {
	googleClientID := os.Getenv("GOOGLE_CLIENT_ID")

	var req struct {
		IDToken string `json:"id_token"`
	}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "invalid Request Body", http.StatusBadRequest)
		return
	}

	ctx := r.Context()

	payload, err := idtoken.Validate(ctx, req.IDToken, googleClientID)
	if err != nil {
		http.Error(w, "Token validation error", http.StatusUnauthorized)
		return
	}
	claims := payload.Claims
	googleUserID, ok := claims["sub"].(string)
	if !ok {
		http.Error(w, "Invalid token claims", http.StatusBadRequest)
		return
	}
	email, _ := claims["email"].(string)
	name, _ := claims["name"].(string)

	userID, err := database.CheckUser(googleUserID, "google")
	db := database.GetDB()
	if err == sql.ErrNoRows {
		result, err := db.Exec(`INSERT INTO users (email, name, provider, provider_user_id) VALUES (?, ?, 'google', ?)`, email, name, googleUserID)
		if err != nil {
			http.Error(w, "Database Error", http.StatusInternalServerError)
			return
		}
		userID, _ = result.LastInsertId()

		_, err = db.Exec(`INSERT INTO balance (user_id, balance) VALUES (?, 0)`, userID)
		if err != nil {
			http.Error(w, "Failed to create balance", http.StatusInternalServerError)
			return
		}
	} else if err != nil {
		http.Error(w, "Database query error", http.StatusInternalServerError)
		return
	}

	jwtSecretKey := os.Getenv("JWT_SECRET")
	token, err := auth.GenerateJWT(userID, email, jwtSecretKey)
	if err != nil {
		http.Error(w, "Token Generation failed", http.StatusInternalServerError)
		return
	}

	database.WriteJSON(w, http.StatusOK, map[string]string{
		"token": token,
	})
}

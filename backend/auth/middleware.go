package auth

import (
	"context"
	"net/http"
	"os"
	"strings"
)

type contextKey string

const UserIDKey contextKey = "user_id"

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		authHeader := r.Header.Get("Authorization")
		if !strings.HasPrefix(authHeader, "Bearer ") {

			//No token! Reject the request
			http.Error(w, "unauthorized", 401)
			return

		}
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		jwtSecretKey := os.Getenv("JWT_SECRET")
		if jwtSecretKey == "" {
			http.Error(w, "Server configuration error", http.StatusInternalServerError)
			return
		}
		token, err := VerifyJWT(tokenString, jwtSecretKey)
		if err != nil {
			http.Error(w, "Unauthorized: Invalid token", http.StatusUnauthorized)
			return

		}
		claims, ok := ExtractClaims(token)
		if !ok {
			http.Error(w, "Unauthorized : Invalid token", http.StatusUnauthorized)
			return
		}
		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			http.Error(w, "Unauthorized : Missin user_id in token", http.StatusUnauthorized)
			return

		}
		userID := int64(userIDFloat)

		ctx := context.WithValue(r.Context(), UserIDKey, userID)
		r = r.WithContext(ctx)
		next(w, r)

	}

}

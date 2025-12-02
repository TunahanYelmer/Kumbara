package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"

	"backend/auth/google"
	"backend/database"
	"backend/routes"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	database.InitDB()
	db := database.GetDB()

	http.HandleFunc("/balance", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			routes.GetBalance(w, r, db)
		case http.MethodPost:
			routes.PostBalance(w, r, db)
		default:
			database.WriteJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		}
	})

	http.HandleFunc("/transactions", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			routes.GetTransactions(w, r, db)
		case http.MethodPost:
			routes.PostTransaction(w, r, db)
		default:
			database.WriteJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		}
	})
	http.HandleFunc("/auth/google", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			google.GoogleAuth(w, r)
		default:
			database.WriteJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})

		}

	})

	log.Println("API server running at http://localhost:8082")
	log.Fatal(http.ListenAndServe("0.0.0.0:8082", nil))

}

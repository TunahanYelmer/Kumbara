package main

import (
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"

	"backend/database"
	"backend/routes"
)

func main() {
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

	log.Println("API server running at http://localhost:8082")
	log.Fatal(http.ListenAndServe("0.0.0.0:8082", nil))

}

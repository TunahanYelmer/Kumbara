package routes

import (
	"database/sql"
	"net/http"

	"backend/database"
)

func GetTransactions(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	rows, err := db.Query("SELECT id, type, category, amount, date FROM transactions ORDER BY date DESC")
	if err != nil {
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to fetch transactions"})
		return
	}
	defer rows.Close()

	var txs []map[string]interface{}
	for rows.Next() {
		var id int
		var typ string
		var category sql.NullString
		var amount float64
		var date string

		if err := rows.Scan(&id, &typ, &category, &amount, &date); err != nil {
			database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to read transaction"})
			return
		}

		txs = append(txs, map[string]interface{}{
			"transaction_id": id,
			"type":           typ,
			"category":       category.String,
			"amount":         amount,
			"created_at":     date,
		})
	}
	database.WriteJSON(w, http.StatusOK, txs)
}

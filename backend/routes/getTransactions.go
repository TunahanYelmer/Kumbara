package routes

import (
	"database/sql"
	"net/http"

	"backend/auth"
	"backend/database"
)

func GetTransactions(w http.ResponseWriter, r *http.Request) {

	db := database.GetDB()
	userID, ok := r.Context().Value(auth.UserIDKey).(int64)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return

	}

	rows, err := db.Query("SELECT id, type, category, amount, date FROM transactions WHERE user_id = ? ORDER BY date DESC", userID)
	if err != nil {
		database.WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to fetch transactions"})
		return
	}
	defer rows.Close()

	txs := make([]map[string]interface{}, 0)
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

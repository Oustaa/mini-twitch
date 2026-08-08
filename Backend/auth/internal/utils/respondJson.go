package utils

import (
	"encoding/json"
	"net/http"
)

func WriteJSON(w http.ResponseWriter, body any) {
	w.Header().Add("content-type", "application/json")

	err := json.NewEncoder(w).Encode(body)
	if err != nil {
		http.Error(w, "Error While Formating the responce", http.StatusInternalServerError)
	}
}

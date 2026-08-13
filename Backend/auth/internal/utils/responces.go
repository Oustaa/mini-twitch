package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func SuccessResponceJSON(w http.ResponseWriter, body any) {
	w.Header().Add("content-type", "application/json")

	err := json.NewEncoder(w).Encode(body)
	if err != nil {
		http.Error(w, "Error While Formating the responce", http.StatusInternalServerError)
		ServerErrorResponceJSON(w, fmt.Sprintf("Error While Formating the responce, Error: %s", err.Error()))
	}
}

func BadRequestJSON(w http.ResponseWriter, body any) {
	w.Header().Add("content-type", "application/json")
	w.WriteHeader(http.StatusBadRequest)

	err := json.NewEncoder(w).Encode(map[string]any{
		"code":    http.StatusBadRequest,
		"message": "Validation error",
		"body":    body,
	})
	if err != nil {
		http.Error(w, "Error While Formating the responce", http.StatusInternalServerError)
	}
}

func ServerErrorResponceJSON(w http.ResponseWriter, message ...string) {
	if len(message) > 0 {
		http.Error(w, message[0], http.StatusInternalServerError)
	} else {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

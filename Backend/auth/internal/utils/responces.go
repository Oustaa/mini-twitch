package utils

import (
	"encoding/json"
	"net/http"
)

type apiResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
	Body    any    `json:"body,omitempty"`
	Errors  any    `json:"errors,omitempty"`
	Debug   string `json:"debug,omitempty"`
}

func writeJSON(w http.ResponseWriter, statusCode int, resp apiResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(resp)
}

func SuccessResponceJSON(w http.ResponseWriter, body any) {
	writeJSON(w, http.StatusOK, apiResponse{Success: true, Body: body})
}

func BadRequestJSON(w http.ResponseWriter, message string) {
	if message == "" {
		message = "Bad Request"
	}

	writeJSON(w, http.StatusBadRequest, apiResponse{
		Success: false,
		Message: message,
	})
}

func ValidationErrorJson(w http.ResponseWriter, errs any) {
	writeJSON(w, http.StatusBadRequest, apiResponse{
		Success: false,
		Errors:  errs,
	})
}

func InternalErrorJSON(w http.ResponseWriter, err error) {
	resp := apiResponse{Success: false, Message: "Internal Server Error"}
	resp.Debug = err.Error()

	writeJSON(w, http.StatusInternalServerError, resp)
}

func JSONResponce(w http.ResponseWriter, statusCode int, message string) {
	writeJSON(w, statusCode, apiResponse{Success: statusCode < 400, Message: message})
}

package utils

import (
	"encoding/json"
	"net/http"
)

type apiResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
	Errors  any    `json:"errors,omitempty"`
}

func WriteJSON(w http.ResponseWriter, statusCode int, resp apiResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(resp)
}

func SuccessResponceJSON(w http.ResponseWriter, data any) {
	WriteJSON(w, http.StatusOK, apiResponse{Success: true, Data: data})
}

func BadRequestJSON(w http.ResponseWriter, errs any) {
	WriteJSON(w, http.StatusBadRequest, apiResponse{
		Success: false,
		Message: "Validation error",
		Errors:  errs,
	})
}

func ServerErrorResponceJSON(w http.ResponseWriter, message ...string) {
	msg := "Internal Server Error"
	if len(message) > 0 {
		msg = message[0]
	}
	WriteJSON(w, http.StatusInternalServerError, apiResponse{Success: false, Message: msg})
}

func JSONResponce(w http.ResponseWriter, statusCode int, message string) {
	WriteJSON(w, statusCode, apiResponse{Success: statusCode < 400, Message: message})
}

/**
  This Should have the following:
		- SuccessJson: sends message + possible body
		- BadRequestJson: sends messaga
		- ValidationErrorJson: sends messaga + errors
		- ServerError: sends message + error stack ( for api-gateway loggin later )
*/

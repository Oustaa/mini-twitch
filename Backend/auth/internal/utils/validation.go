package utils

import (
	"errors"
	"net/http"

	"github.com/go-playground/validator"
)

func ValidateAndSendResponce(w http.ResponseWriter, body any) bool {
	validate := validator.New()

	err := validate.Struct(body)
	if err != nil {
		var invalidValidationError *validator.InvalidValidationError

		if errors.As(err, &invalidValidationError) {
			ServerErrorResponceJSON(w, err.Error())
			return false
		}

		validationErrors := make(map[string][]string)
		for _, err := range err.(validator.ValidationErrors) {
			fieldName := err.Field()
			validationErrors[fieldName] = append(validationErrors[fieldName], err.Tag())
		}

		BadRequestJSON(w, validationErrors)

		return false
	}

	return true
}

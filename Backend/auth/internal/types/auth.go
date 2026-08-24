// Package types
package types

import (
	"os"
)

type SignupBody struct {
	Username    string  `json:"username" validate:"required"`
	Email       string  `json:"email" validate:"required,email"`
	Password    string  `json:"password" validate:"required,min=8"`
	Phone       string  `json:"phone"`
	ISStreamer  bool    `json:"is_streamer"`
	Avatar      os.File `json:"avatar"`
	Description string  `json:"description"`
	BirthDay    string  `json:"birth_day" validate:"required"`
}

type LoginBody struct {
	Login    string `json:"login" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`
}

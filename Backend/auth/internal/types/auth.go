// Package types
package types

import "os"

type SigninBody struct {
	Username             string  `json:"username" validate:"required"`
	Email                string  `json:"email" validate:"required,email"`
	Password             string  `json:"password" validate:"required,min=8"`
	PasswordConfirmation string  `json:"password_confirmation" validate:"required,eqfield=Password"`
	Phone                string  `json:"phone"`
	ISStreamer           bool    `json:"is_streamer"`
	Avatar               os.File `json:"avatar"`
	Description          string  `json:"description"`
}

type LoginBody struct {
	Login    string `json:"login" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`
}

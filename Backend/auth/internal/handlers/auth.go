// Package handlers
package handlers

import (
	"encoding/json"
	"net/http"
	"os"

	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/services"
	"twitch.ousta.dev/auth/internal/utils"
)

type AuthHandler struct {
	db       *gorm.DB
	services services.AuthServices
}

func GetAuthHandlers(db *gorm.DB) *AuthHandler {
	return &AuthHandler{
		db:       db,
		services: *services.GetAuthServices(db),
	}
}

type SigninBody struct {
	Username             string  `json:"username"`
	Email                string  `json:"email"`
	Passowrd             string  `json:"password"`
	PassowrdConfirmation string  `json:"password_confirmation"`
	Phone                string  `json:"phone"`
	ISStreamer           bool    `json:"is_streamer"`
	Avatar               os.File `json:"avatar"`
	Description          string  `json:"description"`
}

type LoginBody struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

func (ah AuthHandler) Signin(w http.ResponseWriter, r *http.Request) {
	var signinBody SigninBody

	json.NewDecoder(r.Body).Decode(&signinBody)

	utils.WriteJSON(w, signinBody)
}

func (ah AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var loginBody LoginBody

	json.NewDecoder(r.Body).Decode(&loginBody)

	utils.WriteJSON(w, loginBody)
}

func (ah AuthHandler) LogOut(w http.ResponseWriter, r *http.Request) {
}

func (ah AuthHandler) VerifyToken(w http.ResponseWriter, r *http.Request) {}

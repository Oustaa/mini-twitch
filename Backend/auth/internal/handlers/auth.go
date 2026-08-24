// Package handlers
package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"time"

	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/middleware"
	"twitch.ousta.dev/auth/internal/services"
	"twitch.ousta.dev/auth/internal/types"
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

func (ah AuthHandler) Signup(w http.ResponseWriter, r *http.Request) {
	var signupBody types.SignupBody

	if err := json.NewDecoder(r.Body).Decode(&signupBody); err != nil {
		utils.BadRequestJSON(w, map[string]any{"message": "Invalid request body"})
		return
	}
	defer r.Body.Close()

	// validate date
	isValide := utils.ValidateAndSendResponce(w, signupBody)
	if !isValide {
		return
	}
	// send data to the service and get the responce
	createdUser, err := ah.services.CreateUser(signupBody)
	// give the user the feedback
	if err != nil {
		utils.ServerErrorResponceJSON(w, err.Error())
		return
	}

	// if user send avatar, send it to the storage service //upload_avatar avatar
	// alse send create_folder username

	// JWT
	token, err := utils.GenerateToken(createdUser.ID)
	if err != nil {
		utils.ServerErrorResponceJSON(w, err.Error())
	}

	utils.SuccessResponceJSON(
		w,
		map[string]any{"user": createdUser, "token": token},
	)
}

func (ah AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var loginBody types.LoginBody
	json.NewDecoder(r.Body).Decode(&loginBody)

	isValid := utils.ValidateAndSendResponce(w, loginBody)
	if !isValid {
		return
	}

	user, err := ah.services.GetUserByLogIn(loginBody.Login)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			utils.BadRequestJSON(
				w,
				map[string]any{"message": "Credential are not valide"},
			)
			return
		}

		utils.ServerErrorResponceJSON(w, err.Error())
		return
	}

	// validate password
	passwordCheck := utils.CheckPasswordHash(loginBody.Password, user.PassowrdHash)
	if !passwordCheck {
		utils.BadRequestJSON(
			w,
			map[string]any{"message": "Credential are not valide"},
		)
		return
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		utils.ServerErrorResponceJSON(w, err.Error())
	}

	// cookie := http.Cookie{
	// 	Name:     "session_token",
	// 	Value:    token,
	// 	Path:     "/",
	// 	Expires:  time.Now().Add(7 * 24 * time.Hour),
	// 	HttpOnly: true,
	// 	Secure:   true,
	// 	SameSite: http.SameSiteLaxMode,
	// }
	//
	// http.SetCookie(w, &cookie)

	utils.SuccessResponceJSON(
		w,
		map[string]any{"user": user, "token": token},
	)
}

func (ah AuthHandler) LogOut(w http.ResponseWriter, r *http.Request) {
	cookie := http.Cookie{
		Name:     "session_token",
		Value:    "",
		Path:     "/",
		Expires:  time.Now().Add(1 * time.Second),
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}
	http.SetCookie(w, &cookie)

	utils.SuccessResponceJSON(w, map[string]string{"message": "User was logged out with success"})
}

func (ah AuthHandler) VerifyToken(w http.ResponseWriter, r *http.Request) {
	id := middleware.GetIDFromContext(r)

	valUint, err := strconv.ParseUint(id, 10, 16)
	if err != nil {
		return
	}

	user, err := ah.services.GetUserByID(uint(valUint))
	if err != nil {
		utils.ServerErrorResponceJSON(w, err.Error())
		return
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		utils.ServerErrorResponceJSON(w, err.Error())
	}

	cookie := http.Cookie{
		Name:     "session_token",
		Value:    token,
		Path:     "/",
		Expires:  time.Now().Add(12 * time.Hour),
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}
	http.SetCookie(w, &cookie)

	utils.SuccessResponceJSON(w, user)
}

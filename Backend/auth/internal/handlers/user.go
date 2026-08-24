package handlers

import (
	"fmt"
	"net/http"

	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/services"
	"twitch.ousta.dev/auth/internal/utils"
)

type UserHandler struct {
	db       *gorm.DB
	services services.UserServices
}

func GetUserHandlers(db *gorm.DB) *UserHandler {
	return &UserHandler{
		db:       db,
		services: *services.GetUserServices(db),
	}
}

func (uh UserHandler) ValidateUniqueUsername(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")

	fmt.Println(username)

	if username == "" {
		utils.JSONResponce(w, http.StatusBadRequest, "username query parameter is required")
		return
	}

	exist, err := uh.services.CheckUniqeUsername(username)
	if err != nil {
		utils.JSONResponce(w, http.StatusInternalServerError, fmt.Sprintf("User Handler (ValidateUniqueUsername): %s", err.Error()))
		return
	}

	if exist {
		utils.JSONResponce(w, http.StatusBadRequest, fmt.Sprintf("Username %s Already in use.", username))
		return
	}
	utils.JSONResponce(w, http.StatusOK, "Username available")
}

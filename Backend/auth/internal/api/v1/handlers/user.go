package handlers_v1

import (
	"fmt"
	"net/http"

	"gorm.io/gorm"
	services_V1 "twitch.ousta.dev/auth/internal/api/v1/services"
	"twitch.ousta.dev/auth/internal/utils"
)

type UserHandler struct {
	db       *gorm.DB
	services services_V1.UserServices
}

func GetUserHandlers(db *gorm.DB) *UserHandler {
	return &UserHandler{
		db:       db,
		services: *services_V1.GetUserServices(db),
	}
}

func (uh UserHandler) ValidateUniqueUsername(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")

	fmt.Println(username)

	if username == "" {
		utils.BadRequestJSON(w, "username query parameter is required")
		return
	}

	exist, err := uh.services.CheckUniqeUsername(username)
	if err != nil {
		utils.InternalErrorJSON(w, err)
		return
	}

	if exist {
		utils.ValidationErrorJson(w,
			map[string]any{"username": false, "message": fmt.Sprintf("Username %s already in use, Try another one", username)},
		)
		return
	}
	utils.SuccessResponceJSON(w, "Username available")
}

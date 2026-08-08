// Package services
package services

import (
	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/models"
)

type AuthServices struct {
	Database *gorm.DB
}

func GetAuthServices(db *gorm.DB) *AuthServices {
	return &AuthServices{
		Database: db,
	}
}

func (us AuthServices) GetUserByID(id int64) *models.User {
	return &models.User{}
}

func (us AuthServices) GetUserByLogIn(login string) *models.User {
	return &models.User{}
}

func (us AuthServices) CreateUser() {}

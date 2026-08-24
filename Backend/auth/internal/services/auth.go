// Package services
package services

import (
	"context"
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/models"
	"twitch.ousta.dev/auth/internal/types"
	"twitch.ousta.dev/auth/internal/utils"
)

type AuthServices struct {
	db *gorm.DB
}

func GetAuthServices(db *gorm.DB) *AuthServices {
	return &AuthServices{
		db: db,
	}
}

func (as AuthServices) GetUserByID(id uint) (*models.User, error) {
	ctx := context.Background()
	user, err := gorm.G[models.User](as.db).Where("id = ?", id).First(ctx)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (as AuthServices) GetUserByLogIn(login string) (*models.User, error) {
	ctx := context.Background()
	user, err := gorm.G[models.User](as.db).Where("email = ?", strings.ToLower(login)).Or("username = ?", strings.ToLower(login)).First(ctx)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (as AuthServices) CreateUser(userInfo types.SignupBody) (*models.User, error) {
	passwordHash, err := utils.HashPassword(userInfo.Password)
	if err != nil {
		return nil, err
	}

	birthDay, err := time.Parse("02-01-2006", userInfo.BirthDay)
	if err != nil {
		return nil, fmt.Errorf("invalid birth_day format: %w", err)
	}

	user := models.User{
		Username:          strings.ToLower(userInfo.Username),
		DisplayedUsername: userInfo.Username,
		BirthDay:          birthDay,
		Email:             strings.ToLower(userInfo.Email),
		PassowrdHash:      passwordHash,

		Phone:        userInfo.Phone,
		FolloweCount: 0,
		Description:  userInfo.Description,
	}

	ctx := context.Background()
	result := gorm.WithResult()
	err = gorm.G[models.User](as.db, result).Create(ctx, &user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

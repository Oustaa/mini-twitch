// Package services
package services

import (
	"context"
	"strings"

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

func (us AuthServices) GetUserByID(id uint) (*models.User, error) {
	ctx := context.Background()
	user, err := gorm.G[models.User](us.db).Where("id = ?", id).First(ctx)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (us AuthServices) GetUserByLogIn(login string) (*models.User, error) {
	ctx := context.Background()
	user, err := gorm.G[models.User](us.db).Where("email = ?", login).Or("username = ?", login).First(ctx)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (us AuthServices) CreateUser(userInfo types.SigninBody) (*models.User, error) {
	passwordHash, err := utils.HashPassword(userInfo.Password)
	if err != nil {
		return nil, err
	}

	user := models.User{
		Username:          strings.ToLower(userInfo.Username),
		DisplayedUsername: userInfo.Username,
		Email:             userInfo.Email,
		PassowrdHash:      passwordHash,

		Phone:        userInfo.Phone,
		FolloweCount: 0,
		Description:  userInfo.Description,
	}

	ctx := context.Background()
	result := gorm.WithResult()
	err = gorm.G[models.User](us.db, result).Create(ctx, &user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

package services

import (
	"context"
	"strings"

	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/models"
)

type UserServices struct {
	db *gorm.DB
}

func GetUserServices(db *gorm.DB) *UserServices {
	return &UserServices{
		db: db,
	}
}

func (us UserServices) CheckUniqeUsername(username string) (bool, error) {
	ctx := context.Background()

	count, err := gorm.G[models.User](us.db).
		Where("username = ?", strings.ToLower(username)).
		Count(ctx, "*")
	if err != nil {
		return false, err
	}

	return count > 0, nil
}

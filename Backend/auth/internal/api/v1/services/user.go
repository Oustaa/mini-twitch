package services_v1

import (
	"log"

	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/models"
	"twitch.ousta.dev/auth/internal/utils"
)

type UserServices struct {
	db            *gorm.DB
	usernameIndex *utils.Node
}

func GetUserServices(db *gorm.DB) *UserServices {
	us := &UserServices{
		db:            db,
		usernameIndex: utils.NewSearchTree(),
	}

	err := us.warmIndexes()
	if err != nil {
		log.Fatal(err)
	}

	return us
}

func (us UserServices) warmIndexes() error {
	var usernames []string
	if err := us.db.Model(&models.User{}).Pluck("username", &usernames).Error; err != nil {
		return err
	}
	for _, username := range usernames {
		us.usernameIndex.Add(username)
	}

	return nil
}

func (us UserServices) CheckUniqeUsername(username string) bool {
	return us.usernameIndex.Search(username)
}

func (us UserServices) UsernameSuggestion(term string) []string {
	return us.usernameIndex.Suggestions(term)
}

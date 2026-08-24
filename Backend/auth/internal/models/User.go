// Package models
package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID                   uint           `json:"id" gorm:"primaryKey"`
	Username             string         `json:"username" gorm:"uniqueIndex;size:255"`
	DisplayedUsername    string         `json:"displayed_username"`
	BirthDay             time.Time      `json:"birth_day"`
	LastTimeUnameUpdated *time.Time     `json:"last_time_uname_updated"`
	Email                string         `json:"email" gorm:"uniqueIndex;size:255"`
	PassowrdHash         string         `json:"-"`
	Phone                string         `json:"phone"`
	Avatar               string         `json:"avatar"`
	Banner               string         `json:"banner"`
	FolloweCount         int32          `json:"followe_count" gorm:"default:0"`
	Description          string         `json:"description"`
	AccentColor          string         `json:"accent_color"`
	SocialLink           []SocialLink   `json:"social_links" gorm:"foreignKey:UserRef;references:ID"`
	CreatedAt            time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt            time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt            gorm.DeletedAt `json:"-" gorm:"index"`
}

// Package models
package models

import "time"

type User struct {
	ID                   uint         `json:"id" gorm:"primaryKey"`
	Username             string       `json:"username" gorm:"uniqueIndex;size:255"`
	DisplayedUsername    string       `json:"displayed_username"`
	LastTimeUnameUpdated time.Time    `json:"last_time_uname_updated"`
	Email                string       `json:"email" gorm:"uniqueIndex;size:255"`
	PassowrdHash         string       `json:"-"`
	Phone                string       `json:"phone"`
	Avatar               string       `json:"avatar"` // nullable, file
	Banner               string       `json:"banner"` // nullable, file
	FolloweCount         int32        `json:"followe_count" gorm:"default:0"`
	Description          string       `json:"description"`
	AccentColor          string       `json:"accent_color"`
	SocialLink           []SocialLink `gorm:"foreignKey:UserRef;references:ID" json:"social_links"`
}

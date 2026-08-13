// Package models
package models

type User struct {
	ID           uint   `json:"id" gorm:"primaryKey"`
	Username     string `json:"username" gorm:"uniqueIndex;size:255"`
	Email        string `json:"email" gorm:"uniqueIndex;size:255"`
	PassowrdHash string `json:"-"`
	Phone        string `json:"phone"`
	ISStreamer   bool   `json:"is_streamer"`
	Avatar       string `json:"avatar"`
	FolloweCount int32  `json:"followe_count" gorm:"default:0"`
	Description  string `json:"description"`
}

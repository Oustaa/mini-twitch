// Package models
package models

type User struct {
	Username     string `json:"username"`
	Email        string `json:"email"`
	PassowrdHash string `json:"_"`
	Phone        string `json:"phone"`
	ISStreamer   bool   `json:"is_streamer"`
	Avatar       string `json:"avatar"`

	FolloweCount int32  `json:"followe_count"`
	Description  string `json:"description"`
}

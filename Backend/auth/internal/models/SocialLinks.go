package models

type SocialLink struct {
	ID      uint   `json:"id"`
	Title   string `json:"title"`
	Link    string `json:"link"`
	UserRef uint   `gorm:"column:user_refer;type:bigint(20) unsigned" json:"user_refer"`
}

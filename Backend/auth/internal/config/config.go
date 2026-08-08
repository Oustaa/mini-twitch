// Package config
package config

import (
	"fmt"
	"os"
)

type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
}

func GetDBConfigFromEnv() (DBConfig, error) {
	cfg := DBConfig{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_USER_PASSWORD"),
		Name:     os.Getenv("DB_NAME"),
	}

	if cfg.Host == "" || cfg.Port == "" || cfg.User == "" || cfg.Name == "" {
		return DBConfig{}, fmt.Errorf("missing required DB env vars")
	}

	return cfg, nil
}

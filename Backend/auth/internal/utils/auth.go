// Package utils
package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func CheckPasswordHash(password string, passowrdHash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(passowrdHash), []byte(password))

	return err == nil
}

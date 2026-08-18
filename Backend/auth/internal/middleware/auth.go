// Package middleware
package middleware

import (
	"context"
	"net/http"
	"strings"

	"twitch.ousta.dev/auth/internal/utils"
)

type ContextKey string

const UserIDKey ContextKey = "userID"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")

		if authHeader == "" {
			http.Error(w, "Unauthorized: Missing or invalid token", http.StatusUnauthorized)
			return
		}

		const prefix = "Bearer "

		if !strings.HasPrefix(authHeader, prefix) {
			http.Error(w, "Invalid authorization format", http.StatusUnauthorized)
			return
		}

		token := strings.TrimPrefix(authHeader, prefix)

		userID, isValid := utils.ValidateToken(token)
		if isValid != nil {
			http.Error(w, "Unauthorized: Invalid or expired token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, userID.UserID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetIDFromContext(r *http.Request) string {
	userID, ok := r.Context().Value(UserIDKey).(string)
	if !ok {
		return ""
	}

	return userID
}

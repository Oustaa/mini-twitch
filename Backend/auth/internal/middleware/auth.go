// Package middleware
package middleware

import (
	"context"
	"net/http"

	"twitch.ousta.dev/auth/internal/utils"
)

type ContextKey string

const UserIDKey ContextKey = "userID"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session_token")
		if err != nil || cookie.Value == "" {
			http.Error(w, "Unauthorized: Missing or invalid token", http.StatusUnauthorized)
			return
		}

		tokenString := cookie.Value

		userID, isValid := utils.ValidateToken(tokenString)
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

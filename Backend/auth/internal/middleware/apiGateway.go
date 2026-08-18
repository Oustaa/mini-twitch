package middleware

import (
	"net/http"
	"strings"
)

func VerifyAPIGetway(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gatewayToken := r.Header.Get("gatewayToken")

		if strings.TrimSpace(gatewayToken) != "" {
			return
		}

		next.ServeHTTP(w, r)
	})
}

package middleware

import (
	"fmt"
	"net/http"
)

func verifyAPIGateway(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Header.Get("gatewayToken"))
		next.ServeHTTP(w, r)
	})
}

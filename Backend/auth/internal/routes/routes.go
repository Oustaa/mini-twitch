// Package routes
package routes

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/handlers"
	"twitch.ousta.dev/auth/internal/middleware"
)

func FuncPlaholder(w http.ResponseWriter, r *http.Request) {
	id := middleware.GetIDFromContext(r)
	fmt.Fprintf(w, "Hello, It reloaded, user id = %s", id)
}

func verifyAPIGateway(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Header.Get("gatewayToken"))
		next.ServeHTTP(w, r)
	})
}

func GetRouter(db *gorm.DB) *chi.Mux {
	r := chi.NewRouter()

	uh := handlers.GetAuthHandlers(db)

	r.Get("/", FuncPlaholder)

	r.Post("/signin", uh.Signin)

	r.Group(func(r chi.Router) {
		r.Use(verifyAPIGateway)
		r.Post("/login", uh.Login)
	})

	r.Group(func(r chi.Router) {
		r.Use(middleware.AuthMiddleware)

		r.Post("/logout", uh.LogOut)
		r.Post("/verify", uh.VerifyToken)

		r.Route("/profile", ProfileRoutes)
	})

	return r
}

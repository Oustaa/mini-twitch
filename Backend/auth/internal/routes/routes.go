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

func funcPlaceholder(w http.ResponseWriter, r *http.Request) {
	id := middleware.GetIDFromContext(r)
	fmt.Fprintf(w, "Hello, It reloaded, user id = %s", id)
}

func GetRouter(db *gorm.DB) *chi.Mux {
	r := chi.NewRouter()

	uh := handlers.GetAuthHandlers(db)

	r.Get("/", funcPlaceholder)

	r.Post("/signin", uh.Signin)
	r.Post("/login", uh.Login)

	r.Group(func(r chi.Router) {
		r.Use(middleware.AuthMiddleware)

		r.Post("/logout", uh.LogOut)
		r.Post("/verify", uh.VerifyToken)

		r.Route("/profile", func(r chi.Router) {
			r.Get("/", funcPlaceholder)
			r.Patch("/", funcPlaceholder)
			r.Get("/request-delete", funcPlaceholder)
			r.Delete("/", funcPlaceholder)
		})
	})

	return r
}

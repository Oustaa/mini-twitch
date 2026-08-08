// Package routes
package routes

import (
	"net/http"

	"github.com/go-chi/chi"
	"gorm.io/gorm"
	"twitch.ousta.dev/auth/internal/handlers"
)

func funcPlaceholder(w http.ResponseWriter, r *http.Request) {}

func GetRouter(db *gorm.DB) *chi.Mux {
	r := chi.NewRouter()

	uh := handlers.GetAuthHandlers(db)

	r.Post("/signin", uh.Signin)
	r.Post("/login", uh.Login)
	r.Post("/logout", uh.LogOut)
	r.Post("/verify", uh.VerifyToken)

	r.Route("/profile", func(r chi.Router) {
		r.Get("/", funcPlaceholder)
		r.Patch("/", funcPlaceholder)
		r.Get("/request-delete", funcPlaceholder)
		r.Delete("/", funcPlaceholder)
	})

	return r
}

// Package routes
package routes

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"gorm.io/gorm"
	routesV1 "twitch.ousta.dev/auth/internal/api/v1/routes"
	"twitch.ousta.dev/auth/internal/middleware"
)

func FuncPlaholder(w http.ResponseWriter, r *http.Request) {
	id := middleware.GetIDFromContext(r)
	fmt.Fprintf(w, "Hello, It reloaded, user id = %s", id)
}

func GetRouter(db *gorm.DB) *chi.Mux {
	r := chi.NewRouter()

	r.Get("/", FuncPlaholder)

	v1Routes := routesV1.GetV1Routes(db)

	r.Mount("/api/v1", v1Routes)

	r.Group(func(r chi.Router) {
		r.Route("/profile", ProfileRoutes)
	})

	return r
}

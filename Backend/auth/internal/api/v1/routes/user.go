package routesV1

import (
	"github.com/go-chi/chi"
	"gorm.io/gorm"
	handlers_v1 "twitch.ousta.dev/auth/internal/api/v1/handlers"
)

func UserRouter(r *chi.Mux, db *gorm.DB) {
	uh := handlers_v1.GetUserHandlers(db)

	r.Post("/verify-username", uh.ValidateUniqueUsername)
}

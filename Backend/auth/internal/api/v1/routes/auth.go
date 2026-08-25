package routesV1

import (
	"github.com/go-chi/chi"
	"gorm.io/gorm"
	handlers_v1 "twitch.ousta.dev/auth/internal/api/v1/handlers"
	"twitch.ousta.dev/auth/internal/middleware"
)

func AuthRouter(r *chi.Mux, db *gorm.DB) {
	ah := handlers_v1.GetAuthHandlers(db)

	r.Post("/signup", ah.Signup)
	r.Post("/login", ah.Login)

	r.Group(func(r chi.Router) {
		r.Use(middleware.AuthMiddleware)

		r.Post("/logout", ah.LogOut)
		r.Post("/verify", ah.VerifyToken)
	})
}

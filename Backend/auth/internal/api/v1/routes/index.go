// Package routesV1
package routesV1

import (
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func GetV1Routes(db *gorm.DB) *chi.Mux {
	r := chi.NewRouter()

	AuthRouter(r, db)
	UserRouter(r, db)

	return r
}

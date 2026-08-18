package routes

import "github.com/go-chi/chi"

func ProfileRoutes(r chi.Router) {
	r.Get("/", FuncPlaholder)
	r.Patch("/", FuncPlaholder)
	r.Delete("/", FuncPlaholder)
	r.Patch("/", FuncPlaholder)

	r.Get("/request-delete", FuncPlaholder)
	r.Put("/username", FuncPlaholder)
	r.Put("/settings", FuncPlaholder)
}

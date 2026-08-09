package main

import (
	"fmt"
	"log"
	"net/http"

	"twitch.ousta.dev/auth/internal/config"
	"twitch.ousta.dev/auth/internal/db"
	"twitch.ousta.dev/auth/internal/routes"
)

func main() {
	cfg, err := config.GetDBConfigFromEnv()
	if err != nil {
		log.Fatalf("Error getting configs: %v\n", err)
	}

	database, err := db.Open(cfg)
	if err != nil {
		log.Fatalf("Error Connecting to the database: %v\n", err)
	}

	router := routes.GetRouter(database)

	server := http.Server{
		Addr:    ":3000",
		Handler: router,
	}

	fmt.Println("App listing on port 3000")

	err = server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

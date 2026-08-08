package main

import (
	"log"
	"net/http"

	"github.com/lpernett/godotenv"
	"twitch.ousta.dev/auth/internal/config"
	"twitch.ousta.dev/auth/internal/db"
	"twitch.ousta.dev/auth/internal/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

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
		Addr:    ":9000",
		Handler: router,
	}

	err = server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

package main

import (
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func init() {
	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
		AddSource: true,
		Level:     slog.LevelInfo,
	})))
	slog.Info("Logger initialized")
}

func main() {
	slog.Info("Starting echo server...")
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", func(c echo.Context) error {
		currentTime := time.Now()
		return c.String(200, fmt.Sprintf("Hello BookService!\n%s", currentTime.Format("2006-01-02 15:04:05")))
	})

	e.Logger.Fatal(e.Start(":8080"))
	slog.Info("Echo server started")
}

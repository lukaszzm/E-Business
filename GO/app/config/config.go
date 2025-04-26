package config

import (
	"io"
	"os"
	"time"

	"gorm.io/gorm/logger"
)

type Config struct {
	Server    ServerConfig
	Client    ClientConfig
	DB        DBConfig
	LogOutput io.Writer
}

type ServerConfig struct {
	Port int
}

type ClientConfig struct {
	Url string
}

type DBConfig struct {
	DSN           string
	LogLevel      logger.LogLevel
	SlowThreshold time.Duration
}

func New() *Config {
	return &Config{
		Server: ServerConfig{
			Port: 8080,
		},
		Client: ClientConfig{
			Url: "http://localhost:3000",
		},
		DB: DBConfig{
			DSN:           "go-commerce.db",
			LogLevel:      logger.Info,
			SlowThreshold: time.Second,
		},
		LogOutput: os.Stdout,
	}
}

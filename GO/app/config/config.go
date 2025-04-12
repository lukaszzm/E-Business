package config

import (
	"io"
	"os"
	"time"

	"gorm.io/gorm/logger"
)

type Config struct {
	Server    ServerConfig
	DB        DBConfig
	LogOutput io.Writer
}

type ServerConfig struct {
	Port int
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
		DB: DBConfig{
			DSN:           "go-commerce.db",
			LogLevel:      logger.Info,
			SlowThreshold: time.Second,
		},
		LogOutput: os.Stdout,
	}
}

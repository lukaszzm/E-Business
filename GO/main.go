package main

import (
	"fmt"
	"gorm.io/gorm/logger"
	"log"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"go-commerce/app/config"
	"go-commerce/app/handler"
	"go-commerce/app/model"
	"go-commerce/app/repository"
	"go-commerce/app/service"
)

func main() {
	cfg := config.New()

	db, err := initDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	userRepo := repository.NewUserRepository(db)
	productRepo := repository.NewProductRepository(db)
	categoryRepo := repository.NewCategoryRepository(db)
	cartRepo := repository.NewCartRepository(db)

	productService := service.NewProductService(productRepo, categoryRepo)
	categoryService := service.NewCategoryService(categoryRepo)
	cartService := service.NewCartService(cartRepo, productRepo, userRepo)

	productHandler := handler.NewProductHandler(productService)
	categoryHandler := handler.NewCategoryHandler(categoryService)
	cartHandler := handler.NewCartHandler(cartService)

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{cfg.Client.Url},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.POST("/products", productHandler.Create)
	e.GET("/products", productHandler.GetAll)
	e.GET("/products/:id", productHandler.GetByID)
	e.PUT("/products/:id", productHandler.Update)
	e.DELETE("/products/:id", productHandler.Delete)

	e.POST("/categories", categoryHandler.Create)
	e.GET("/categories", categoryHandler.GetAll)
	e.GET("/categories/:id", categoryHandler.GetByID)
	e.GET("/categories/:id/products", categoryHandler.GetProducts)

	e.POST("/carts", cartHandler.Create)
	e.GET("/carts/:id", cartHandler.GetByID)
	e.POST("/carts/:id/place-order", cartHandler.PlaceOrder)
	e.POST("/carts/:id/items", cartHandler.AddProduct)
	e.PUT("/carts/:id/items/:itemId", cartHandler.UpdateCartItem)
	e.DELETE("/carts/:id/items/:itemId", cartHandler.RemoveProduct)

	serverPort := strconv.Itoa(cfg.Server.Port)
	e.Logger.Fatal(e.Start(":" + serverPort))
}

func initDB(cfg *config.Config) (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(cfg.DB.DSN), &gorm.Config{
		Logger: logger.Default.LogMode(cfg.DB.LogLevel),
	})
	if err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(
		&model.User{},
		&model.Product{},
		&model.Category{},
		&model.Cart{},
		&model.LineItem{},
	); err != nil {
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}

	return db, nil
}

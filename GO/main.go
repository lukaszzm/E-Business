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

	const ProductsRoute = "/products"
	const ProductByIdRoute = "/products/:id"

	e.POST(ProductsRoute, productHandler.Create)
	e.GET(ProductsRoute, productHandler.GetAll)
	e.GET(ProductByIdRoute, productHandler.GetByID)
	e.PUT(ProductByIdRoute, productHandler.Update)
	e.DELETE(ProductByIdRoute, productHandler.Delete)

	const CategoriesRoute = "/categories"
	const CategoryByIdRoute = "/categories/:id"

	e.POST(CategoriesRoute, categoryHandler.Create)
	e.GET(CategoriesRoute, categoryHandler.GetAll)
	e.GET(CategoryByIdRoute, categoryHandler.GetByID)
	e.GET(CategoryByIdRoute, categoryHandler.GetProducts)

	const CartsRoute = "/carts"
	const CartByIdRoute = "/carts/:id"
	const PlaceOrderRoute = "/carts/:id/place-order"
	const LineItemsRoute = "/carts/:id/items"
	const LineItemByIdRoute = "/carts/:id/items/:itemId"

	e.POST(CartsRoute, cartHandler.Create)
	e.GET(CartByIdRoute, cartHandler.GetByID)
	e.POST(PlaceOrderRoute, cartHandler.PlaceOrder)
	e.POST(LineItemsRoute, cartHandler.AddProduct)
	e.PUT(LineItemByIdRoute, cartHandler.UpdateCartItem)
	e.DELETE(LineItemByIdRoute, cartHandler.RemoveProduct)

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

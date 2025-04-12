package repository

import (
	"go-commerce/app/model"
	"gorm.io/gorm"
)

type ProductQueryParams struct {
	CategoryID *uint
	MinPrice   *float64
	MaxPrice   *float64
	SortBy     string
	SortDir    string
	Page       int
	PageSize   int
}

type ProductRepository interface {
	Create(product *model.Product) error
	FindAll(params ProductQueryParams) ([]model.Product, error)
	FindByID(id uint) (*model.Product, error)
	Update(product *model.Product) error
	Delete(id uint) error
}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{
		db: db,
	}
}

func withCategoryFilter(categoryID *uint) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if categoryID != nil && *categoryID > 0 {
			return db.Where("category_id = ?", *categoryID)
		}
		return db
	}
}

func withPriceRange(minPrice, maxPrice *float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if minPrice != nil {
			db = db.Where("price >= ?", *minPrice)
		}
		if maxPrice != nil {
			db = db.Where("price <= ?", *maxPrice)
		}
		return db
	}
}

func withSorting(sortBy, sortDir string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if sortBy != "" {
			direction := "asc"
			if sortDir == "desc" {
				direction = "desc"
			}
			return db.Order(sortBy + " " + direction)
		}
		return db.Order("id asc")
	}
}

func withPagination(page, pageSize int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if page <= 0 {
			page = 1
		}
		if pageSize <= 0 {
			pageSize = 10
		}
		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}

func (r *productRepository) Create(product *model.Product) error {
	return r.db.Create(product).Error
}

func (r *productRepository) FindAll(params ProductQueryParams) ([]model.Product, error) {
	var products []model.Product

	err := r.db.Scopes(
		withCategoryFilter(params.CategoryID),
		withPriceRange(params.MinPrice, params.MaxPrice),
		withSorting(params.SortBy, params.SortDir),
		withPagination(params.Page, params.PageSize),
	).Preload("Category").Find(&products).Error

	return products, err
}

func (r *productRepository) FindByID(id uint) (*model.Product, error) {
	var product model.Product
	err := r.db.Preload("Category").First(&product, id).Error
	return &product, err
}

func (r *productRepository) Update(product *model.Product) error {
	return r.db.Save(product).Error
}

func (r *productRepository) Delete(id uint) error {
	return r.db.Delete(&model.Product{}, id).Error
}

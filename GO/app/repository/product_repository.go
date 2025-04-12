package repository

import (
	"go-commerce/app/model"

	"gorm.io/gorm"
)

type ProductRepository interface {
	Create(product *model.Product) error
	FindAll(params ProductQueryParams) ([]model.Product, error)
	FindByID(id uint) (*model.Product, error)
	Update(product *model.Product) error
	Delete(id uint) error
}

type ProductQueryParams struct {
	CategoryID *uint
	MinPrice   *float64
	MaxPrice   *float64
	SortBy     string
	SortDir    string
	Page       int
	PageSize   int
}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{db: db}
}

func (r *productRepository) Create(product *model.Product) error {
	return r.db.Create(product).Error
}

func (r *productRepository) FindAll(params ProductQueryParams) ([]model.Product, error) {
	var products []model.Product
	query := r.db.Model(&model.Product{})

	if params.CategoryID != nil {
		query = query.Where("category_id = ?", *params.CategoryID)
	}

	if params.MinPrice != nil && params.MaxPrice != nil {
		query = query.Where("price BETWEEN ? AND ?", *params.MinPrice, *params.MaxPrice)
	} else if params.MinPrice != nil {
		query = query.Where("price >= ?", *params.MinPrice)
	} else if params.MaxPrice != nil {
		query = query.Where("price <= ?", *params.MaxPrice)
	}

	if params.SortBy != "" {
		direction := "ASC"
		if params.SortDir == "desc" {
			direction = "DESC"
		}
		query = query.Order(params.SortBy + " " + direction)
	}

	if params.Page > 0 && params.PageSize > 0 {
		offset := (params.Page - 1) * params.PageSize
		query = query.Offset(offset).Limit(params.PageSize)
	}

	err := query.Preload("Category").Find(&products).Error
	return products, err
}

func (r *productRepository) FindByID(id uint) (*model.Product, error) {
	var product model.Product
	err := r.db.Preload("Category").First(&product, id).Error
	if err != nil {
		return nil, err
	}
	return &product, nil
}

func (r *productRepository) Update(product *model.Product) error {
	return r.db.Save(product).Error
}

func (r *productRepository) Delete(id uint) error {
	return r.db.Delete(&model.Product{}, id).Error
}

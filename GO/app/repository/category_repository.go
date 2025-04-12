package repository

import (
	"go-commerce/app/model"

	"gorm.io/gorm"
)

type CategoryRepository interface {
	Create(category *model.Category) error
	FindAll() ([]model.Category, error)
	FindByID(id uint) (*model.Category, error)
	FindProductsByCategoryID(id uint) ([]model.Product, error)
}

type categoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

func (r *categoryRepository) Create(category *model.Category) error {
	return r.db.Create(category).Error
}

func (r *categoryRepository) FindAll() ([]model.Category, error) {
	var categories []model.Category
	err := r.db.Find(&categories).Error
	return categories, err
}

func (r *categoryRepository) FindByID(id uint) (*model.Category, error) {
	var category model.Category
	err := r.db.First(&category, id).Error
	if err != nil {
		return nil, err
	}
	return &category, nil
}

func (r *categoryRepository) FindProductsByCategoryID(id uint) ([]model.Product, error) {
	var products []model.Product
	err := r.db.Where("category_id = ?", id).Preload("Category").Find(&products).Error
	return products, err
}

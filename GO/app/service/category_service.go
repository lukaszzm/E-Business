package service

import (
	"errors"

	"go-commerce/app/model"
	"go-commerce/app/repository"
)

type CategoryService interface {
	CreateCategory(category *model.Category) error
	GetAllCategories() ([]model.Category, error)
	GetCategoryByID(id uint) (*model.Category, error)
	GetProductsByCategory(id uint) ([]model.Product, error)
}

type categoryService struct {
	categoryRepo repository.CategoryRepository
}

func NewCategoryService(categoryRepo repository.CategoryRepository) CategoryService {
	return &categoryService{
		categoryRepo: categoryRepo,
	}
}

func (s *categoryService) CreateCategory(category *model.Category) error {
	if category.Name == "" {
		return errors.New("category name is required")
	}

	return s.categoryRepo.Create(category)
}

func (s *categoryService) GetAllCategories() ([]model.Category, error) {
	return s.categoryRepo.FindAll()
}

func (s *categoryService) GetCategoryByID(id uint) (*model.Category, error) {
	return s.categoryRepo.FindByID(id)
}

func (s *categoryService) GetProductsByCategory(id uint) ([]model.Product, error) {
	_, err := s.categoryRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("category not found")
	}

	return s.categoryRepo.FindProductsByCategoryID(id)
}

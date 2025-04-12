package service

import (
	"errors"
	"go-commerce/app/model"
	"go-commerce/app/repository"
)

type ProductService interface {
	CreateProduct(product *model.Product) error
	GetAllProducts(params repository.ProductQueryParams) ([]model.Product, error)
	GetProductByID(id uint) (*model.Product, error)
	UpdateProduct(id uint, product *model.Product) error
	DeleteProduct(id uint) error
}

type productService struct {
	productRepo  repository.ProductRepository
	categoryRepo repository.CategoryRepository
}

func NewProductService(productRepo repository.ProductRepository, categoryRepo repository.CategoryRepository) ProductService {
	return &productService{
		productRepo:  productRepo,
		categoryRepo: categoryRepo,
	}
}

func (s *productService) CreateProduct(product *model.Product) error {
	if product.Name == "" {
		return errors.New("product name is required")
	}

	if product.Price <= 0 {
		return errors.New("product price is required")
	}

	if product.CategoryID > 0 {
		_, err := s.categoryRepo.FindByID(product.CategoryID)
		if err != nil {
			return errors.New("category not found")
		}
	}

	return s.productRepo.Create(product)
}

func (s *productService) GetAllProducts(params repository.ProductQueryParams) ([]model.Product, error) {
	return s.productRepo.FindAll(params)
}

func (s *productService) GetProductByID(id uint) (*model.Product, error) {
	return s.productRepo.FindByID(id)
}

func (s *productService) UpdateProduct(id uint, product *model.Product) error {
	existingProduct, err := s.productRepo.FindByID(id)
	if err != nil {
		return errors.New("product not found")
	}

	if product.Name == "" {
		return errors.New("product name is required")
	}

	if product.Price <= 0 {
		return errors.New("product price is required")
	}

	if product.CategoryID > 0 && product.CategoryID != existingProduct.CategoryID {
		_, err := s.categoryRepo.FindByID(product.CategoryID)
		if err != nil {
			return errors.New("category not found")
		}
	}

	existingProduct.Name = product.Name
	existingProduct.Description = product.Description
	existingProduct.Price = product.Price

	if product.CategoryID > 0 {
		existingProduct.CategoryID = product.CategoryID
	}

	return s.productRepo.Update(existingProduct)
}

func (s *productService) DeleteProduct(id uint) error {
	_, err := s.productRepo.FindByID(id)
	if err != nil {
		return errors.New("product not found")
	}

	return s.productRepo.Delete(id)
}

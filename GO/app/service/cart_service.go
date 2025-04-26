package service

import (
	"errors"

	"go-commerce/app/model"
	"go-commerce/app/repository"
)

type CartService interface {
	CreateCart(cart *model.Cart) error
	ClearCart(cartID uint) error
	GetCartByID(id uint) (*model.Cart, error)
	AddProductToCart(cartID, productID uint, quantity int) (*model.LineItem, error)
	RemoveProductFromCart(cartID, itemID uint) error
	UpdateLineItemQuantity(cartID, itemID uint, quantity int) (*model.LineItem, error)
}

type cartService struct {
	cartRepo    repository.CartRepository
	productRepo repository.ProductRepository
	userRepo    repository.UserRepository
}

func NewCartService(
	cartRepo repository.CartRepository,
	productRepo repository.ProductRepository,
	userRepo repository.UserRepository,
) CartService {
	return &cartService{
		cartRepo:    cartRepo,
		productRepo: productRepo,
		userRepo:    userRepo,
	}
}

func (s *cartService) CreateCart(cart *model.Cart) error {
	_, err := s.userRepo.FindByID(cart.UserID)
	if err != nil {
		return errors.New("user not found")
	}

	return s.cartRepo.Create(cart)
}

func (s *cartService) ClearCart(cartID uint) error {
	cart, err := s.cartRepo.FindByID(cartID)
	if err != nil {
		return errors.New("cart not found")
	}

	for i := range cart.LineItems {
		lineItem := cart.LineItems[i]

		err := s.cartRepo.DeleteLineItem(lineItem.ID)
		if err != nil {
			return err
		}
	}

	return nil
}

func (s *cartService) GetCartByID(id uint) (*model.Cart, error) {
	return s.cartRepo.FindByID(id)
}

func (s *cartService) AddProductToCart(cartID, productID uint, quantity int) (*model.LineItem, error) {
	if quantity <= 0 {
		return nil, errors.New("quantity must be more than 0")
	}

	_, err := s.cartRepo.FindByID(cartID)
	if err != nil {
		return nil, errors.New("cart not found")
	}

	product, err := s.productRepo.FindByID(productID)
	if err != nil {
		return nil, errors.New("product not found")
	}

	existingItem, err := s.cartRepo.FindLineItemByProductID(cartID, productID)
	if err == nil {
		existingItem.Quantity += quantity
		existingItem.Price = product.Price * float64(existingItem.Quantity)

		if err := s.cartRepo.UpdateLineItem(existingItem); err != nil {
			return nil, err
		}

		if err := s.cartRepo.UpdateCartTotal(cartID); err != nil {
			return nil, err
		}

		return existingItem, nil
	}

	newItem := &model.LineItem{
		CartID:    cartID,
		ProductID: productID,
		Quantity:  quantity,
		Price:     product.Price * float64(quantity),
	}

	if err := s.cartRepo.AddLineItem(newItem); err != nil {
		return nil, err
	}

	if err := s.cartRepo.UpdateCartTotal(cartID); err != nil {
		return nil, err
	}

	return newItem, nil
}

func (s *cartService) RemoveProductFromCart(cartID, itemID uint) error {
	_, err := s.cartRepo.FindLineItem(cartID, itemID)
	if err != nil {
		return errors.New("cart line item not found")
	}

	if err := s.cartRepo.DeleteLineItem(itemID); err != nil {
		return err
	}

	return s.cartRepo.UpdateCartTotal(cartID)
}

func (s *cartService) UpdateLineItemQuantity(cartID, itemID uint, quantity int) (*model.LineItem, error) {
	if quantity <= 0 {
		return nil, errors.New("quantity must be more than 0")
	}

	item, err := s.cartRepo.FindLineItem(cartID, itemID)
	if err != nil {
		return nil, errors.New("cart line item not found")
	}

	product, err := s.productRepo.FindByID(item.ProductID)
	if err != nil {
		return nil, errors.New("product not found")
	}

	item.Quantity = quantity
	item.Price = product.Price * float64(quantity)

	if err := s.cartRepo.UpdateLineItem(item); err != nil {
		return nil, err
	}

	if err := s.cartRepo.UpdateCartTotal(cartID); err != nil {
		return nil, err
	}

	return item, nil
}

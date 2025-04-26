package repository

import (
	"go-commerce/app/model"

	"gorm.io/gorm"
)

type CartRepository interface {
	Create(cart *model.Cart) error
	Delete(cart *model.Cart) error
	FindByID(id uint) (*model.Cart, error)
	AddLineItem(item *model.LineItem) error
	FindLineItem(cartID, itemID uint) (*model.LineItem, error)
	FindLineItemByProductID(cartID, productID uint) (*model.LineItem, error)
	UpdateLineItem(item *model.LineItem) error
	DeleteLineItem(itemID uint) error
	UpdateCartTotal(cartID uint) error
}

type cartRepository struct {
	db *gorm.DB
}

func NewCartRepository(db *gorm.DB) CartRepository {
	return &cartRepository{db: db}
}

func (r *cartRepository) Create(cart *model.Cart) error {
	return r.db.Create(cart).Error
}

func (r *cartRepository) Delete(cart *model.Cart) error {
	return r.db.Delete(cart).Error
}

func (r *cartRepository) FindByID(id uint) (*model.Cart, error) {
	var cart model.Cart
	err := r.db.Preload("LineItems").Preload("LineItems.Product").First(&cart, id).Error
	if err != nil {
		return nil, err
	}
	return &cart, nil
}

func (r *cartRepository) AddLineItem(item *model.LineItem) error {
	return r.db.Create(item).Error
}

func (r *cartRepository) FindLineItem(cartID, itemID uint) (*model.LineItem, error) {
	var item model.LineItem
	err := r.db.Where("cart_id = ? AND id = ?", cartID, itemID).First(&item).Error
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *cartRepository) FindLineItemByProductID(cartID, productID uint) (*model.LineItem, error) {
	var item model.LineItem
	err := r.db.Where("cart_id = ? AND product_id = ?", cartID, productID).First(&item).Error
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *cartRepository) UpdateLineItem(item *model.LineItem) error {
	return r.db.Save(item).Error
}

func (r *cartRepository) DeleteLineItem(itemID uint) error {
	return r.db.Delete(&model.LineItem{}, itemID).Error
}

func (r *cartRepository) UpdateCartTotal(cartID uint) error {
	var totalSum float64
	err := r.db.Model(&model.LineItem{}).Where("cart_id = ?", cartID).Select("COALESCE(SUM(price), 0)").Row().Scan(&totalSum)
	if err != nil {
		return err
	}
	return r.db.Model(&model.Cart{}).Where("id = ?", cartID).Update("total", totalSum).Error
}

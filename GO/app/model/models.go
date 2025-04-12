package model

import "time"

type Base struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt time.Time `json:"deleted_at"`
}

type Product struct {
	Base
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Price       float64    `json:"price"`
	CategoryID  uint       `json:"category_id"`
	Category    Category   `json:"category,omitempty" gorm:"foreignKey:CategoryID"`
	LineItems   []LineItem `json:"-"`
}

type Category struct {
	Base
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Products    []Product `json:"products,omitempty" gorm:"foreignKey:CategoryID"`
}

type Cart struct {
	Base
	UserID    uint       `json:"user_id"`
	User      User       `json:"-" gorm:"foreignKey:UserID"`
	LineItems []LineItem `json:"line_items,omitempty" gorm:"foreignKey:CartID"`
	Total     float64    `json:"total"`
}

type LineItem struct {
	Base
	CartID    uint    `json:"cart_id"`
	ProductID uint    `json:"product_id"`
	Product   Product `json:"product,omitempty" gorm:"foreignKey:ProductID"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

type User struct {
	Base
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"uniqueIndex"`
	Password string `json:"-"`
	Carts    []Cart `json:"carts,omitempty" gorm:"foreignKey:UserID"`
}

func (Product) TableName() string {
	return "products"
}

func (Category) TableName() string {
	return "categories"
}

func (Cart) TableName() string {
	return "carts"
}

func (LineItem) TableName() string {
	return "line_items"
}

func (User) TableName() string {
	return "users"
}

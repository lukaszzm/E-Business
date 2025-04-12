package handler

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"go-commerce/app/model"
	"go-commerce/app/service"
)

type CartHandler struct {
	cartService service.CartService
}

func NewCartHandler(cartService service.CartService) *CartHandler {
	return &CartHandler{
		cartService: cartService,
	}
}

func (h *CartHandler) Create(c echo.Context) error {
	cart := new(model.Cart)
	if err := c.Bind(cart); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart data"})
	}

	if err := h.cartService.CreateCart(cart); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, cart)
}

func (h *CartHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart ID"})
	}

	cart, err := h.cartService.GetCartByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Cart not found"})
	}

	return c.JSON(http.StatusOK, cart)
}

func (h *CartHandler) AddProduct(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart ID"})
	}

	type AddItemRequest struct {
		ProductID uint `json:"product_id"`
		Quantity  int  `json:"quantity"`
	}

	request := new(AddItemRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart data"})
	}

	cartItem, err := h.cartService.AddProductToCart(uint(cartID), request.ProductID, request.Quantity)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, cartItem)
}

func (h *CartHandler) RemoveProduct(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart ID"})
	}

	itemID, err := strconv.Atoi(c.Param("itemId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid item ID"})
	}

	if err := h.cartService.RemoveProductFromCart(uint(cartID), uint(itemID)); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "Product deleted successfully"})
}

func (h *CartHandler) UpdateCartItem(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart ID"})
	}

	itemID, err := strconv.Atoi(c.Param("itemId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid item ID"})
	}

	type UpdateItemRequest struct {
		Quantity int `json:"quantity"`
	}

	request := new(UpdateItemRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart data"})
	}

	cartItem, err := h.cartService.UpdateLineItemQuantity(uint(cartID), uint(itemID), request.Quantity)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, cartItem)
}

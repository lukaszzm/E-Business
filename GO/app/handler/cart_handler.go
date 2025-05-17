package handler

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"go-commerce/app/constants"
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
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidCartData})
	}

	if err := h.cartService.CreateCart(cart); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, cart)
}

func (h *CartHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidCartId})
	}

	cart, err := h.cartService.GetCartByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": constants.CartNotFound})
	}

	return c.JSON(http.StatusOK, cart)
}

func (h *CartHandler) AddProduct(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidCartId})
	}

	type AddItemRequest struct {
		ProductID uint `json:"product_id"`
		Quantity  int  `json:"quantity"`
	}

	request := new(AddItemRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidCartData})
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
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidCartId})
	}

	itemID, err := strconv.Atoi(c.Param("itemId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidLineItemId})
	}

	if err := h.cartService.RemoveProductFromCart(uint(cartID), uint(itemID)); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": constants.ProductDeleted})
}

func (h *CartHandler) UpdateCartItem(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidCartId})
	}

	itemID, err := strconv.Atoi(c.Param("itemId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidLineItemId})
	}

	type UpdateItemRequest struct {
		Quantity int `json:"quantity"`
	}

	request := new(UpdateItemRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidCartData})
	}

	cartItem, err := h.cartService.UpdateLineItemQuantity(uint(cartID), uint(itemID), request.Quantity)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, cartItem)
}

func (h *CartHandler) PlaceOrder(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": constants.InvalidCartId})
	}

	if err := h.cartService.ClearCart(uint(cartID)); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": constants.OrderPlaced})
}

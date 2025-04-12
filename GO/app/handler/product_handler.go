package handler

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"go-commerce/app/model"
	"go-commerce/app/repository"
	"go-commerce/app/service"
)

type ProductHandler struct {
	productService service.ProductService
}

func NewProductHandler(productService service.ProductService) *ProductHandler {
	return &ProductHandler{
		productService: productService,
	}
}

func (h *ProductHandler) Create(c echo.Context) error {
	product := new(model.Product)
	if err := c.Bind(product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product data"})
	}

	if err := h.productService.CreateProduct(product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, product)
}

func (h *ProductHandler) GetAll(c echo.Context) error {
	params := repository.ProductQueryParams{
		SortBy:  c.QueryParam("sort_by"),
		SortDir: c.QueryParam("sort_dir"),
	}

	if categoryID, err := strconv.Atoi(c.QueryParam("category_id")); err == nil && categoryID > 0 {
		categoryIDUint := uint(categoryID)
		params.CategoryID = &categoryIDUint
	}

	if minPrice, err := strconv.ParseFloat(c.QueryParam("min_price"), 64); err == nil && minPrice > 0 {
		params.MinPrice = &minPrice
	}

	if maxPrice, err := strconv.ParseFloat(c.QueryParam("max_price"), 64); err == nil && maxPrice > 0 {
		params.MaxPrice = &maxPrice
	}

	if page, err := strconv.Atoi(c.QueryParam("page")); err == nil && page > 0 {
		params.Page = page
	}

	if pageSize, err := strconv.Atoi(c.QueryParam("page_size")); err == nil && pageSize > 0 {
		params.PageSize = pageSize
	}

	products, err := h.productService.GetAllProducts(params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, products)
}

func (h *ProductHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid Product ID"})
	}

	product, err := h.productService.GetProductByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	return c.JSON(http.StatusOK, product)
}

func (h *ProductHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid Product ID"})
	}

	product := new(model.Product)
	if err := c.Bind(product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid product data"})
	}

	if err := h.productService.UpdateProduct(uint(id), product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, product)
}

func (h *ProductHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid Product ID"})
	}

	if err := h.productService.DeleteProduct(uint(id)); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "Product deleted successfully"})
}

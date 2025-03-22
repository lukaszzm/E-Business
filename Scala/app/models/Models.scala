package models

import play.api.libs.json._

case class Product(
                    id: Long,
                    name: String,
                    description: String,
                    price: BigDecimal,
                    categoryId: Option[Long] = None
                  )

object Product {
  implicit val productFormat: Format[Product] = Json.format[Product]

  var products: List[Product] = List(
    Product(1L, "Laptop", "High performance laptop", BigDecimal(1200.00), Some(1L)),
    Product(2L, "Smartphone", "Latest smartphone model", BigDecimal(800.00), Some(1L)),
    Product(3L, "Coffee Machine", "Automatic coffee machine", BigDecimal(300.00), Some(2L))
  )
}

case class Category(
                     id: Long,
                     name: String,
                     description: String
                   )

object Category {
  implicit val categoryFormat: Format[Category] = Json.format[Category]

  var categories: List[Category] = List(
    Category(1L, "Electronics", "Electronic devices and gadgets"),
    Category(2L, "Home Appliances", "Devices for home use"),
    Category(3L, "Books", "Books and publications")
  )
}

// Cart model
case class CartItem(
                     id: Long,
                     productId: Long,
                     quantity: Int
                   )

object CartItem {
  implicit val cartItemFormat: Format[CartItem] = Json.format[CartItem]

  var cartItems: List[CartItem] = List(
    CartItem(1L, 1L, 2),
    CartItem(2L, 3L, 1)
  )
}

case class Cart(
                 id: Long,
                 items: List[CartItem]
               )

object Cart {
  implicit val cartFormat: Format[Cart] = Json.format[Cart]

  var carts: List[Cart] = List(
    Cart(1L, List(CartItem(1L, 1L, 2), CartItem(2L, 3L, 1)))
  )
}
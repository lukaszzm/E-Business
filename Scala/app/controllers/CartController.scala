package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.{Cart, CartItem}

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents)
  extends BaseController {

  def getAll: Action[AnyContent] = Action { implicit request =>
    Ok(Json.toJson(Cart.carts))
  }

  def getById(id: Long): Action[AnyContent] = Action { implicit request =>
    Cart.carts.find(_.id == id) match {
      case Some(cart) => Ok(Json.toJson(cart))
      case None => NotFound(Json.obj("message" -> s"Cart with id $id not found"))
    }
  }

  def add(): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[Cart] match {
      case JsSuccess(cart, _) =>
        if (Cart.carts.exists(_.id == cart.id)) {
          BadRequest(Json.obj("message" -> s"Cart with id ${cart.id} already exists"))
        } else {
          val createdCart = cart.copy(id = cart.id)
          Cart.carts = Cart.carts :+ cart
          Created(Json.toJson(createdCart))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
    }
  }

  def update(id: Long): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[Cart] match {
      case JsSuccess(cart, _) =>
        Cart.carts.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("message" -> s"Cart with id $id not found"))
          case index =>
            val updatedCart = cart.copy(id = id)
            Cart.carts = Cart.carts.updated(index, updatedCart)
            Ok(Json.toJson(updatedCart))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
    }
  }

  def delete(id: Long): Action[AnyContent] = Action { implicit request =>
    Cart.carts.find(_.id == id) match {
      case Some(_) =>
        Cart.carts = Cart.carts.filterNot(_.id == id)
        NoContent
      case None =>
        NotFound(Json.obj("message" -> s"Cart with id $id not found"))
    }
  }

  def getCartItems(id: Long): Action[AnyContent] = Action { implicit request =>
    Cart.carts.find(_.id == id) match {
      case Some(cart) => Ok(Json.toJson(cart.items))
      case None => NotFound(Json.obj("message" -> s"Cart with id $id not found"))
    }
  }

  def addCartItem(id: Long): Action[JsValue] = Action(parse.json) { implicit request =>
    Cart.carts.indexWhere(_.id == id) match {
      case -1 => NotFound(Json.obj("message" -> s"Cart with id $id not found"))
      case cartIndex =>
        request.body.validate[CartItem] match {
          case JsSuccess(item, _) =>
            val cart = Cart.carts(cartIndex)
            if (cart.items.exists(_.id == item.id)) {
              BadRequest(Json.obj("message" -> s"Item with id ${item.id} already exists in cart"))
            } else {
              val createdItem = item.copy(id = item.id)
              val updatedItems = cart.items :+ item
              val updatedCart = cart.copy(items = updatedItems)
              Cart.carts = Cart.carts.updated(cartIndex, updatedCart)
              Created(Json.toJson(createdItem))
            }
          case JsError(errors) =>
            BadRequest(Json.obj("message" -> JsError.toJson(errors)))
        }
    }
  }

  def removeCartItem(cartId: Long, itemId: Long): Action[AnyContent] = Action { implicit request =>
    Cart.carts.indexWhere(_.id == cartId) match {
      case -1 => NotFound(Json.obj("message" -> s"Cart with id $cartId not found"))
      case cartIndex =>
        val cart = Cart.carts(cartIndex)
        if (cart.items.exists(_.id == itemId)) {
          val updatedItems = cart.items.filterNot(_.id == itemId)
          val updatedCart = cart.copy(items = updatedItems)
          Cart.carts = Cart.carts.updated(cartIndex, updatedCart)
          NoContent
        } else {
          NotFound(Json.obj("message" -> s"Item with id $itemId not found in cart"))
        }
    }
  }
}
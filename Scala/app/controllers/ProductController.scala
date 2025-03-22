package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Product

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents)
  extends BaseController {

  def getAll: Action[AnyContent] = Action { implicit request =>
    Ok(Json.toJson(Product.products))
  }

  def getById(id: Long): Action[AnyContent] = Action { implicit request =>
    Product.products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("message" -> s"Product with id $id not found"))
    }
  }

  def add(): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[Product] match {
      case JsSuccess(product, _) =>
        if (Product.products.exists(_.id == product.id)) {
          BadRequest(Json.obj("message" -> s"Product with id ${product.id} already exists"))
        } else {
          Product.products = Product.products :+ product
          val createdProduct = product.copy(id = product.id)
          Created(Json.toJson(createdProduct)) 
        }
      case JsError(errors) =>
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
    }
  }

  def update(id: Long): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[Product] match {
      case JsSuccess(product, _) =>
        Product.products.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("message" -> s"Product with id $id not found"))
          case index =>
            val updatedProduct = product.copy(id = id)
            Product.products = Product.products.updated(index, updatedProduct)
            Ok(Json.toJson(updatedProduct))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
    }
  }

  def delete(id: Long): Action[AnyContent] = Action { implicit request =>
    Product.products.find(_.id == id) match {
      case Some(_) =>
        Product.products = Product.products.filterNot(_.id == id)
        NoContent
      case None =>
        NotFound(Json.obj("message" -> s"Product with id $id not found"))
    }
  }
}

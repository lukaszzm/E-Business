package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Category

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents)
  extends BaseController {

  def getAll: Action[AnyContent] = Action { implicit request =>
    Ok(Json.toJson(Category.categories))
  }

  def getById(id: Long): Action[AnyContent] = Action { implicit request =>
    Category.categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound(Json.obj("message" -> s"Category with id $id not found"))
    }
  }

  def add(): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[Category] match {
      case JsSuccess(category, _) =>
        if (Category.categories.exists(_.id == category.id)) {
          BadRequest(Json.obj("message" -> s"Category with id ${category.id} already exists"))
        } else {
          val createdCategory = category.copy(id = category.id)
          Category.categories = Category.categories :+ category
          Created(Json.toJson(createdCategory))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
    }
  }

  def update(id: Long): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[Category] match {
      case JsSuccess(category, _) =>
        Category.categories.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("message" -> s"Category with id $id not found"))
          case index =>
            val updatedCategory = category.copy(id = id)
            Category.categories = Category.categories.updated(index, updatedCategory)
            Ok(Json.toJson(updatedCategory))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
    }
  }

  def delete(id: Long): Action[AnyContent] = Action { implicit request =>
    Category.categories.find(_.id == id) match {
      case Some(_) =>
        Category.categories = Category.categories.filterNot(_.id == id)
        NoContent
      case None =>
        NotFound(Json.obj("message" -> s"Category with id $id not found"))
    }
  }
}
package org.example

import dev.kord.core.Kord
import dev.kord.core.entity.channel.TextChannel
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable

@Serializable
data class Product(val id: Int, val name: String, val categoryId: Int, val price: Double)

@Serializable
data class Category(val id: Int, val name: String)

fun main() = runBlocking {
    val kord = Kord("<your_discord_bot_token>")
    val productService = ProductService()

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on

        val content = message.content

        if (!content.startsWith("!")) return@on

        val channel = message.channel.asChannel() as? TextChannel ?: return@on

        when {
            content.equals("!categories", ignoreCase = true) -> {
                val categories = productService.getCategories()
                val responseText = if (categories.isEmpty()) {
                    "No categories available."
                } else {
                    "List of available categories: \n" + categories.joinToString("\n") { "- ${it.name}" }
                }
                channel.createMessage(responseText)
            }

            content.startsWith("!products ", ignoreCase = true) -> {
                val categoryName = content.substring("!products ".length).trim()
                val products = productService.getProductsByCategory(categoryName)

                val responseText = if (products.isEmpty()) {
                    "No products available in the category or the specified category does not exist."
                } else {
                    "List of products in the category '$categoryName':\n" + products.joinToString("\n") {
                        "- ${it.name} (£${it.price})"
                    }
                }
                channel.createMessage(responseText)
            }

            content.equals("!help", ignoreCase = true) -> {
                val helpText = """
                    Available commands:
                    !categories - displays a list of available categories
                    !products [category_name] - displays a list of products in the specified category
                    !help - displays this help message
                """.trimIndent()
                channel.createMessage(helpText)
            }
        }
    }

    println("Bot is running!")

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}

class ProductService {
    private val categories = listOf(
        Category(1, "Wearable Technology"),
        Category(2, "Headphones"),
        Category(3, "Computers & Accessories"),
        Category(4, "Smartphones & Accessories")
    )

    private val products = listOf(
        Product(1, "Google Fitbit Inspire 3", 1, 59.99),
        Product(2, "Google Fitbit Charge 6", 1, 118.99),
        Product(3, "Samsung Galaxy Fit3", 1, 49.00),
        Product(4, "Garmin Forerunner 255 GPS", 1, 176.07),
        Product(5, "Apple Airpods Pro 2", 2, 177.00),
        Product(6, "Apple Airpods 4", 2, 129.00),
        Product(7, "Soundcore by Anker Q20i", 2, 49.99),
        Product(8, "Sony WH-CH520", 2, 36.00),
        Product(9, "Lenovo IdeaPad Slim 3", 3, 199.99),
        Product(10, "Asus Vivobook 16", 3, 320.09),
        Product(11, "Asus Zenbook 14 OLED", 3, 794.99),
        Product(12, "Apple Macbook Air 13 M4", 3, 929.97),
        Product(13, "Samsung Galaxy A05", 4, 65.49),
        Product(14, "Apple iPhone 12", 4, 185.00),
        Product(15, "Apple iPhone 13", 4, 404.10),
        Product(16, "Apple iPhone 16", 4, 709.44)
        )

    private fun getCategoryIdByName(categoryName: String): Int? {
        return categories.find { it.name.equals(categoryName, ignoreCase = true) }?.id
    }

    fun getCategories(): List<Category> = categories

    fun getProductsByCategory(categoryName: String): List<Product> {
        val categoryId = getCategoryIdByName(categoryName) ?: return emptyList()
        return products.filter { it.categoryId == categoryId }
    }
}
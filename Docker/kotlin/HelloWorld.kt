import java.sql.Connection
import java.sql.DriverManager

fun main() {
    println("Hello, World!")
    connectToSQLite()
}

fun connectToSQLite() {
    var connection: Connection? = null
    
    try {
        connection = DriverManager.getConnection("jdbc:sqlite::memory:")
        
        val metaData = connection.metaData
        println("SQLite connection successful!")
        println("SQLite version: ${metaData.driverVersion}")
        
    } catch (e: Exception) {
        println("Error connecting to SQLite: ${e.message}")
    } finally {
        connection?.close()
    }
}
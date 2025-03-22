plugins {
    kotlin("jvm") version "2.0.21"
    kotlin("plugin.serialization") version "1.9.0"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core:3.1.0")
    implementation("io.ktor:ktor-server-netty:3.1.0")
    implementation("io.ktor:ktor-client-content-negotiation:3.1.0")
    implementation("io.ktor:ktor-serialization-kotlinx-json:3.1.0")

    implementation("dev.kord:kord-core:0.15.0")

    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")

    implementation("org.slf4j:slf4j-simple:2.0.7")

    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.1")
}

application {
    mainClass.set("org.example.MainKt")
}
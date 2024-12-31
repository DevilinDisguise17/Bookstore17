package com.example

import com.example.routes.bookRoutes
import com.example.utils.FirebaseInitializer
import io.ktor.application.*
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.routing.routing
import io.ktor.serialization.json
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun Application.module() {
    // Inicializa o Firebase
    FirebaseInitializer.initialize()

    // Instala o ContentNegotiation para suportar JSON
    install(ContentNegotiation) {
        json()
    }

    // Configura tratamento global de erros
    install(StatusPages) {
        exception<Throwable> { cause ->
            call.respond(HttpStatusCode.InternalServerError, cause.localizedMessage)
        }
    }

    // Define as rotas da aplicação
    routing {
        bookRoutes() // Rotas relacionadas aos livros
    }
}

fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

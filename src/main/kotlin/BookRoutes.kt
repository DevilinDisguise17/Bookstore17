package com.example.routes

import com.example.models.Book
import com.example.services.FirebaseService
import io.ktor.application.*
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.delete
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.put
import io.ktor.routing.route

fun Route.bookRoutes() {
    val firebaseService = FirebaseService()

    route("/books") {
        get {
            val books = firebaseService.getBooks()
            call.respond(books)
        }

        post {
            val book = call.receive<Book>()
            firebaseService.addBook(book)
            call.respond(HttpStatusCode.Created, book)
        }

        put {
            val book = call.receive<Book>()
            firebaseService.updateBook(book)
            call.respond(HttpStatusCode.OK, book)
        }

        delete("{id}") {
            val id = call.parameters["id"]!!
            firebaseService.deleteBook(id)
            call.respond(HttpStatusCode.NoContent)
        }
    }
}

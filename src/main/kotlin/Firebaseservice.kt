package com.example.services

import com.example.models.Book
import com.google.firebase.database.FirebaseDatabase
import kotlinx.coroutines.tasks.await

class FirebaseService {
    private val database = FirebaseDatabase.getInstance().reference

    suspend fun addBook(book: Book) {
        database.child("books").child(book.id).setValue(book).await()
    }

    suspend fun getBooks(): List<Book> {
        val snapshot = database.child("books").get().await()
        return snapshot.children.mapNotNull { it.getValue(Book::class.java) }
    }

    suspend fun updateBook(book: Book) {
        database.child("books").child(book.id).setValue(book).await()
    }

    suspend fun deleteBook(bookId: String) {
        database.child("books").child(bookId).removeValue().await()
    }
}

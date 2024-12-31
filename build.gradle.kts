import com.google.-firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.auth.oauth2.GoogleCredentials
import java.io.FileInputStream

// Initialize Firebase
fun initializeFirebase() {
    try {
        val options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(FileInputStream("/users/diogomartins/ideaprojects/bookstore/resources/books-4269f-default-rtdb-export.json")))
            .setDatabaseUrl("https://books-4269f-default-rtdb.europe-west1.firebasedatabase.app")
            .build()

        FirebaseApp.initializeApp(options)
        println("Firebase initialized successfully.")
    } catch (e: Exception) {
        e.printStackTrace()
        println("Error initializing Firebase.")
    }
}

// Main function to test Firebase
fun main() {
    // Initialize Firebase
    initializeFirebase()

    // Add your Firebase-related logic here, such as interacting with Firestore, Realtime Database, etc.
}

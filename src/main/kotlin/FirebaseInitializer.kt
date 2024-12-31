package com.example.utils

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import java.io.FileInputStream

object FirebaseInitializer {
    fun initialize() {
        try {
            val options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(FileInputStream("src/main/resources/firebase/firebase-config.json")))
                .setDatabaseUrl("https://books-4269f-default-rtdb.europe-west1.firebasedatabase.app")
                .build()

            FirebaseApp.initializeApp(options)
            println("Firebase inicializado com sucesso.")
        } catch (e: Exception) {
            e.printStackTrace()
            println("Erro ao inicializar o Firebase.")
        }
    }
}

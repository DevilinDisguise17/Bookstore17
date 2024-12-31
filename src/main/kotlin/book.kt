package com.example.models // Declaração do pacote onde a classe está localizada

import kotlinx.serialization.Serializable // Importa a anotação necessária para serialização de objetos

// A anotação @Serializable indica que a classe Book pode ser convertida para e de formatos como JSON
@Serializable
data class Book(
    // A propriedade 'id' representa um identificador único para o livro (geralmente uma string ou UUID)
    val id: String,

    // A propriedade 'title' contém o título do livro
    val title: String,

    // A propriedade 'author' armazena o nome do autor do livro
    val author: String,

    // A propriedade 'genre' armazena o gênero do livro, como "Ficção", "Romance", etc.
    val genre: String
)

// Gerenciar login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Obtém os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se o login é válido
    if (username === 'admin' && password === '1234') {
        // Exibe a página principal e esconde a página de login
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
    } else {
        // Exibe a mensagem de erro se o login for inválido
        document.getElementById('errorMessage').style.display = 'block';
    }
});

// Adiciona um ouvinte de evento ao formulário para lidar com o envio de um novo livro
document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede que o formulário recarregue a página

    // Obtém os valores dos campos de entrada
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const pdfFile = document.getElementById('pdfFile').files[0]; // Obtém o arquivo PDF enviado

    // Verifica se o arquivo PDF foi enviado
    if (!pdfFile) {
        alert('Please upload a PDF file.'); // Exibe um alerta caso o PDF não tenha sido enviado
        return; // Interrompe a execução se o PDF não for fornecido
    }

    // Cria um novo item de lista para exibir o livro
    const listItem = document.createElement('li');
    listItem.textContent = `${title} by ${author} - Genre: ${genre}`; // Exibe o título, autor e gênero
    listItem.dataset.author = author.toLowerCase(); // Armazena o autor em formato minúsculo para facilitar a busca
    listItem.dataset.genre = genre.toLowerCase(); // Armazena o gênero em formato minúsculo para facilitar a busca

    // Cria um link para o arquivo PDF
    const pdfLink = document.createElement('a');
    pdfLink.textContent = 'Open PDF'; // Define o texto do link
    pdfLink.href = URL.createObjectURL(pdfFile); // Cria uma URL temporária para o arquivo PDF
    pdfLink.target = '_blank'; // Abre o PDF em uma nova aba
    pdfLink.classList.add('pdf-link'); // Adiciona uma classe CSS para o link (opcional)

    // Adiciona o link do PDF ao item da lista
    listItem.appendChild(pdfLink);

    // Cria um botão de exclusão para remover o livro da lista
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; // Define o texto do botão
    deleteButton.classList.add('delete-button'); // Adiciona uma classe CSS ao botão

    // Cria um botão de edição para modificar os dados do livro
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit'; // Define o texto do botão de edição
    editButton.classList.add('edit-button'); // Adiciona uma classe CSS ao botão de edição

    // Adiciona o botão de edição e exclusão ao item da lista
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Adiciona o novo item de lista à lista de livros
    document.getElementById('bookList').appendChild(listItem);

    // Adiciona um ouvinte de evento para excluir o livro quando o botão for clicado
    deleteButton.addEventListener('click', function() {
        listItem.remove(); // Remove o livro da lista
    });

    // Adiciona um ouvinte de evento para editar os dados do livro diretamente na lista
    editButton.addEventListener('click', function() {
        // Torna os campos editáveis
        let editableTitle = prompt("Edit Title:", title); // Exibe uma caixa de prompt para editar o título
        let editableAuthor = prompt("Edit Author:", author); // Exibe uma caixa de prompt para editar o autor
        let editableGenre = prompt("Edit Genre:", genre); // Exibe uma caixa de prompt para editar o gênero

        // Se o usuário fornecer novos valores, atualiza os dados
        if (editableTitle !== null && editableAuthor !== null && editableGenre !== null) {
            // Atualiza o texto na lista, sem remover os botões e o link do PDF
            listItem.firstChild.textContent = `${editableTitle} by ${editableAuthor} - Genre: ${editableGenre}`;
            listItem.dataset.author = editableAuthor.toLowerCase(); // Atualiza o autor
            listItem.dataset.genre = editableGenre.toLowerCase(); // Atualiza o gênero

            // Mantém o link do PDF sem alterações, a menos que o usuário decida trocar o PDF
            const newPdfFile = document.createElement('input');
            newPdfFile.type = 'file';
            newPdfFile.accept = '.pdf';
            newPdfFile.addEventListener('change', function() {
                const newPdf = newPdfFile.files[0];
                if (newPdf) {
                    pdfLink.href = URL.createObjectURL(newPdf); // Atualiza o link do PDF com o novo arquivo
                    pdfLink.textContent = 'Open New PDF'; // Atualiza o texto do link
                }
            });

            // Adiciona o novo campo de upload de PDF sem substituir os botões
            listItem.appendChild(newPdfFile);
        }
    });

    // Limpa os campos de entrada após o envio
    document.getElementById('title').value = ''; // Limpa o campo de título
    document.getElementById('author').value = ''; // Limpa o campo de autor
    document.getElementById('genre').value = ''; // Limpa o campo de gênero
    document.getElementById('pdfFile').value = ''; // Limpa o campo de arquivo PDF
});

// Funcionalidade de busca
document.getElementById('searchBar').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase(); // Obtém o termo de pesquisa em minúsculas
    const books = document.querySelectorAll('#bookList li'); // Obtém todos os itens da lista de livros

    books.forEach(book => {
        const author = book.dataset.author; // Obtém o autor do livro armazenado no atributo data
        const genre = book.dataset.genre; // Obtém o gênero do livro armazenado no atributo data

        // Exibe o livro se ele corresponder ao termo de pesquisa no autor ou gênero
        if (author.includes(searchTerm) || genre.includes(searchTerm)) {
            book.style.display = ''; // Exibe o livro
        } else {
            book.style.display = 'none'; // Oculta o livro
        }
    });
});

// Função para criar o modal Bootstrap dinâmico
function createCustomModal(news) {
    // Criando o conteúdo do modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('custom-modal', 'modal-dialog', 'modal-dialog-centered');

    // Conteúdo do modal
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-content');

    // Botão de fechar
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('close');
    closeButton.setAttribute('data-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

    // Título do modal
    const modalTitle = document.createElement('h4');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = news.titulo;

    // Corpo do modal
    const modalBodyContent = document.createElement('div');
    modalBodyContent.classList.add('modal-body');
    modalBodyContent.innerHTML = `<p>${news.conteudo}</p><p class="text-muted">${news.detalhe}</p>`;

    // Montando a estrutura do modal
    modalBody.appendChild(closeButton);
    modalBody.appendChild(modalTitle);
    modalBody.appendChild(modalBodyContent);
    modalContent.appendChild(modalBody);

    return modalContent;
}

// Função para carregar notícias e criar modais
function loadAndDisplayNews() {
    fetch(`${baseExtUrl}/ext/news/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar notícias');
            }
            return response.json();
        })
        .then(newsArray => {
            // Criando um contêiner para armazenar os modais
            const modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-container');

            // Criando e adicionando modais ao contêiner para cada notícia
            newsArray.forEach(news => {
                const modal = createCustomModal(news);
                modalContainer.appendChild(modal);
            });

            // Adicionando o contêiner ao corpo do documento
            document.body.appendChild(modalContainer);

            // Adicionando evento de clique para fechar os modais
            modalContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('modal-container')) {
                    document.body.removeChild(modalContainer);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar notícias:', error);
        });
}

// Exemplo de uso
loadAndDisplayNews();

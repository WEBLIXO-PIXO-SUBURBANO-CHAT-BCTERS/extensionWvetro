// // shits by user
let nomeVendedor = 'ana carolina'
let isAdmin = false
let isPacific = false

// shits static
// let baseExtUrl = 'http://127.0.0.1:5000'
let baseExtUrl = 'https://friendly-computing-machine-production.up.railway.app/'
let baseExtUrlFlask = 'https://flask-production-2cb1.up.railway.app/'
let isModalOn = false


let isPacificUrl = isPacific ? 'pacifico' : 'competitivo'


// document.addEventListener("DOMContentLoaded", function() {
    //     // Coloque aqui o código que deseja executar após o carregamento do DOM
    //     setupPcpInterface('dento')
    //     });
function stylizeBigButton(button){
    button.type = 'button';
    button.style.width = '100%';
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';
    button.style.fontWeight = 600;
    button.style.fontSize = '28px';
    return button
}
function setupPcpInterface(headerLeftDiv){
    console.log('trygado')
    
    
    if (headerLeftDiv == undefined){
        setTimeout(verificaHeader, 500); // Verifica novamente após um intervalo de tempo
        return
    }

    const pageWrapper = document.querySelector('#page-wrapper')
    if (pageWrapper) {
        pageWrapper.style.paddingTop = '100px';
    }
    // Criando um novo elemento de botão
    function generateBigButton(label){
        let button = document.createElement('button');
        button.textContent = label; // Define o texto do botão como 'PCP'
        button.classList.add(label+'-button');
        button = stylizeBigButton(button)
        return button
    }    
    // Adicionando o botão à div 'header-left'
    let mainButton = generateBigButton('PCP')
    headerLeftDiv.appendChild(mainButton);
    
    // Criando um container para as opções
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    // Altere as linhas a seguir no seu código JS
    optionsContainer.style.opacity = '0';

    button.addEventListener('click', () => {
    optionsContainer.style.opacity = (optionsContainer.style.opacity === '0') ? '1' : '0';
    });

    

    // Adicionando as opções ao container
    const option1 = document.createElement('button');
    option1.style.width = '100%';
    option1.type = 'button';
    option1.textContent = 'Visualizar meu ranking';
    option1.classList.add('option-button');
    option1.addEventListener('click', () => {
        console.log('Opção 1 visualizar ranking');
        window.open(`${baseExtUrlFlask}sellers/${nomeVendedor}/${isPacificUrl}`, '_blank');
    });
    
    const option2 = document.createElement('button');
    option2.style.width = '100%';
    option2.type = 'button';
    option2.textContent = 'Relatar Problema para o PCP';
    option2.classList.add('option-button');
    option2.addEventListener('click', async () => {
        const erro = prompt('Por favor, descreva o problema.\nExemplos: no orç. 12345 o preço está zerado \n precisa adicionar X variavel \n preço do espelho foi atualizado')
        if (erro !== null && erro.trim() !== '') {
            fetch(`${baseExtUrl}report/relatarProblema/${nomeVendedor}`, {
            method: 'POST',
            body: JSON.stringify({ problema: erro }),
            headers: {'Content-Type': 'application/json'}
            })
            .then(response => {
            if (response.ok) {
                alert('Erro relatado com sucesso!');
            } else {
                throw new Error('Erro ao relatar problema');
            }
            })
            .catch(error => {
            console.error('Erro ao relatar problema:', error);
            });
        }
        // console.log('Problema Relatado:', problema);
        // console.log('Estimativa de Pedidos na Frente:', pedidosNaFrente);
    });
    
    
    // Adicionando as opções ao container
    const option3 = document.createElement('button');
    option3.style.width = '100%';
    option3.type = 'button';
    option3.textContent = 'vendas do mês';
    option3.classList.add('option-button');
    option3.addEventListener('click', () => {
        console.log('Opção 3 visualizar ranking');
        window.open(`${baseExtUrlFlask}sellers/admin`, '_blank');
    });
    
    // Adicionando as opções ao container
    const option4 = document.createElement('button');
    option4.style.width = '100%';
    option4.type = 'button';
    option4.textContent = 'Visualizar Notícias!';
    option4.classList.add('option-button');
    option4.addEventListener('click', () => {
        if (!isModalOn){
            displayNews()
            isModalOn = true
        }else{
            removeModalJornal() 
            isModalOn = false
        }
        
    });
    
    optionsContainer.appendChild(option1);
    optionsContainer.appendChild(option2);
    optionsContainer.appendChild(option4);
    if (isAdmin){optionsContainer.appendChild(option3)}

    // Ocultando as opções inicialmente
    optionsContainer.style.display = 'none';

    // Adicionando o container de opções à div 'header-left'
    headerLeftDiv.appendChild(optionsContainer);

    // Adicionando um evento para exibir/ocultar as opções ao clicar no botão
    button.addEventListener('click', () => {
        optionsContainer.style.display = (optionsContainer.style.display === 'none') ? 'block' : 'none';
    });
    
}

function verificaURL() {
    console.log('testing')
    if (window.location.href.includes('login')) {
        setTimeout(() => {
            verificaURL(); // Verifica novamente após um intervalo de tempo
        }, 1000); // Espera 1 segundo (1000 milissegundos) antes de verificar novamente
    } else {
        // document.addEventListener('DOMContentLoaded',()=>{
            console.log('lets tryg')
            setupPcpInterface(); // Chama a função setupPcpInterface quando 'login' não estiver mais na URL
        // })
    }
}
function verificaHeader() {
    const headerLeftDiv = document.querySelector('.header-left');
    if (headerLeftDiv !== null) {
        console.log('Verificou header');
        setupPcpInterface(headerLeftDiv); // Chama setupPcpInterface se headerLeftDiv for encontrado
        // injectStyles(cssStyles);
    } else {
      console.log('Elemento .header-left não encontrado, tentando novamente.');
      setTimeout(verificaHeader, 500); // Verifica novamente após um intervalo de tempo
    }
  }

    function createJournalFinish() {
        let button = document.createElement('button') 
        button = stylizeBigButton(button)
        
    }
  
    function createCustomModal(news) {
      // Criando o conteúdo do modal
      const modalContent = document.createElement('div');
      modalContent.classList.add('custom-modal', 'modal-dialog', 'modal-dialog-centered');
  
      // Conteúdo do modal
      const modalBody = document.createElement('div');
      modalBody.classList.add('modal-content');
      modalBody.style.padding = '10px'
  
      // Botão de fechar
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.classList.add('close');
      closeButton.setAttribute('data-dismiss', 'modal');
      closeButton.setAttribute('aria-label', 'Close');
      closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
      closeButton.addEventListener('click', ()=>{modalContent.style.display = 'none'})
  
      // Título do modal
      const modalTitle = document.createElement('h4');
      modalTitle.classList.add('modal-title');
      modalTitle.textContent = news.title;
  
      // Corpo do modal
      const modalBodyContent = document.createElement('div');
      modalBodyContent.classList.add('modal-body');
      modalBodyContent.innerHTML = `<p>${news.content}</p>`;
      // modalBodyContent.innerHTML = `<p>${news.conteudo}</p><p class="text-muted">${news.detalhe}</p>`;
  
      // Montando a estrutura do modal
      modalBody.appendChild(closeButton);
      modalBody.appendChild(modalTitle);
      modalBody.appendChild(modalBodyContent);
      modalContent.appendChild(modalBody);
  
      return modalContent;
  }

  // Função para carregar notícias e criar modais
    function displayNews(){
        let storedNewsArray = localStorage.getItem('newsArray')
    const newsArray = JSON.parse(storedNewsArray)
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modalJornal'
    modalContainer.classList.add('modal-container');
    modalContainer.style.position = 'absolute'
    modalContainer.style.top = '150px'
    modalContainer.style.margin = '0px 35%'
    // Criando e adicionando modais ao contêiner para cada notícia
    newsArray.forEach(news => {
        const modal = createCustomModal(news);
        console.log(modal)
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
}   
function removeModalJornal() {
    const modalContainer = document.getElementById('modalJornal');
    if (modalContainer) {
        document.body.removeChild(modalContainer);
    }
}    

verificaURL(); // Inicia a verificação da URL
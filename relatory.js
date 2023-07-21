import { adicionarRelatorio } from './database.js'



function showRelatory() {
    const dailyReport = document.getElementsByClassName('daily-report')[0];
    const btnShowRelatory = document.getElementById('btn-show-relatory')
    dailyReport.style.display = 'block';
    btnShowRelatory.style.display = 'None'
}

const colegas = ['selecione alguem!', 'tiago', 'tatiane', 'luciana', 'stefane', 'valter', 'pcp', 'michele', 'daniel', 'produção', 'entrega', 'wvetro'];

// Restante do código permanece o mesmo
// ...

function updateName(event) {
    const title = document.getElementById('seller-id-name');
    title.textContent = event.target.value;
  }
function gerarOpcoesSelect() {
    const select = document.getElementById('colega-select');
    let innorHtml = '<select id="colega-select"> '
    const finishHtml = '</select>'

  colegas.forEach(colega => {
    innorHtml += "<option>"+colega+"</option>"
});
    innorHtml += finishHtml
    select.innerHTML = innorHtml
    select.addEventListener('change', updateName)
}

gerarOpcoesSelect();

let colegaIndex = 0;

function limparCampos() {
    // Selecionar os elementos do DOM
    const notaInput = document.getElementById('nota-input');
    const comentarioInput = document.getElementById('comentario-input');
  
    // Limpar os valores dos campos
    notaInput.value = '';
    comentarioInput.value = '';
  }
  

function sendRelatory() {
    const colega = document.getElementById('seller-id-name').textContent
    const nota = document.getElementById("nota-input").value
    const comentario = document.getElementById("comentario-input").value
    
    const relatory = {autor:'desconhecido' ,colega, nota, comentario} 

    adicionarRelatorio(relatory)
    alert('Relatório guardado com sucesso!')
    
    limparCampos()

    const dailyReport = document.getElementsByClassName('daily-report')[0];
    const btnShowRelatory = document.getElementById('btn-show-relatory')
    dailyReport.style.display = 'None';
    btnShowRelatory.style.display = 'block'
}



function openRelatoryPage() {
    // Nome do arquivo HTML que está no mesmo diretório
    let nomeArquivo = 'relatorios.html';
    // Obtém o caminho completo da página atual
    let caminhoPaginaAtual = window.location.href;
    // Remove o nome do arquivo da página atual
    let caminhoDiretorioAtual = caminhoPaginaAtual.substring(0, caminhoPaginaAtual.lastIndexOf('/') + 1);
    // Constrói a URL completa do arquivo na mesma pasta
    let urlNovaAba = caminhoDiretorioAtual + nomeArquivo;
    // Abre a nova aba com a URL especificada
    window.open(urlNovaAba, '_blank');
}

function openFullScreen() {
    // Nome do arquivo HTML que está no mesmo diretório
    let nomeArquivo = 'popup.html';
    // Obtém o caminho completo da página atual
    let caminhoPaginaAtual = window.location.href;
    // Remove o nome do arquivo da página atual
    let caminhoDiretorioAtual = caminhoPaginaAtual.substring(0, caminhoPaginaAtual.lastIndexOf('/') + 1);
    // Constrói a URL completa do arquivo na mesma pasta
    let urlNovaAba = caminhoDiretorioAtual + nomeArquivo;
    // Abre a nova aba com a URL especificada
    window.open(urlNovaAba, '_blank');
}
function addingEventsListener(){
    const btnShowRelatory = document.getElementById('btn-show-relatory')
    const btnSendRelatory = document.getElementById('btn-send-relatory')
    const btnViewRelatory = document.getElementById('btn-view-relatory')
    const btnFullScreen = document.getElementById('btn-open-full-screen')
    
    btnShowRelatory.addEventListener('click', showRelatory)
    btnSendRelatory.addEventListener('click', sendRelatory)
    btnViewRelatory.addEventListener('click', openRelatoryPage)
    btnFullScreen.addEventListener('click', openFullScreen)
}


    addingEventsListener()




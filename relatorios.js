const database = localStorage.getItem('database')
const container = document.querySelector('.containerOfRelatorys')


const datajson = JSON.parse(database)
const relatories = datajson.relatorios

// Função para criar um elemento <div> com a classe e o texto fornecidos
function createDivWithClass(className, text) {
    let div = document.createElement('div');
    div.className = className;
    div.textContent = text;
    return div;
}

// Função para criar o DOM com base na lista de relatórios
function renderRelatories() {
    let container = document.querySelector('.container-relatorys');

    relatories.forEach(relatory => {
        let relatoryDiv = document.createElement('div');
        relatoryDiv.className = 'relatory';

        let colegaDiv = createDivWithClass('colega', 'Colega: ' + relatory.colega);
        let comentarioDiv = createDivWithClass('comentario', 'Comentário: ' + relatory.comentario);
        let notaDiv = createDivWithClass('nota', 'Nota: ' + relatory.nota);

        relatoryDiv.appendChild(colegaDiv);
        relatoryDiv.appendChild(comentarioDiv);
        relatoryDiv.appendChild(notaDiv);

        container.appendChild(relatoryDiv);
    });
}

// Chama a função para renderizar os relatórios no carregamento da página
window.onload = function () {
    renderRelatories();
};

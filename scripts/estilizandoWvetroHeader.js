// // shits by user
// let nomeVendedor = 'ana carolina'

let isVendedor = localStorage.getItem('pcpData-userCargo') == 'vendedor'

let nomeVendedor = ''

if (isVendedor) {
    nomeVendedor = localStorage.getItem('pcpData-nomeVendedor').toLowerCase()
}

// console.log('nome vendedor -> ' + nomeVendedor)
let isAdminLocal = localStorage.getItem('pcpData-isAdmin')

let isAdmin = isAdminLocal == 'false' ? false : true
let isPacific = false


// shits static
// let baseExtUrl = 'http://127.0.0.1:5000/'
let baseExtUrl = 'https://friendly-computing-machine-development.up.railway.app/'
let baseExtUrlFlask = 'https://flask-production-2cb1.up.railway.app/'
let isModalOn = false


let isPacificUrl = isPacific ? 'pacifico' : 'competitivo'

// =================================================================================
// Basic generative Interface
// ================================================================================= 

function generateBasicButton(label = '', classe = null){
    let button = document.createElement('button');
    button.type = 'button';
    button.textContent = label; 
    button.style.width = '100%';
    button.style.height = '25px'
    if (classe){
        button.classList.add(classe)
    }
    return button
}
function stylizeBigButton(button){
    button.style.width = '100%';
    button.style.height = '50px'
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';
    button.style.fontWeight = 600;
    button.style.fontSize = '28px';
    return button
}

function generateBtnEsquecerPedido(idPedidoEsquecido){
    // Adiciona o botão 'Esquecer Pedido' com efeito hover
    let btnEsquecerPedido = document.createElement('button');
    btnEsquecerPedido.textContent = 'Esquecer Pedido';
    btnEsquecerPedido.style.display = 'none'; // Inicialmente oculto

    // Define o estilo do botão
    btnEsquecerPedido.style.backgroundColor = 'red';
    btnEsquecerPedido.style.color = 'white';
    btnEsquecerPedido.style.position = 'relative';
    // btnEsquecerPedido.style.top = '-60px'; // Posiciona acima do container
    btnEsquecerPedido.style.left = '50%'; // Centraliza horizontalmente
    btnEsquecerPedido.style.transform = 'translateX(-50%)'; // Centraliza horizontalmente
    btnEsquecerPedido.style.padding = '5px 10px';
    btnEsquecerPedido.style.border = 'none';
    btnEsquecerPedido.style.borderRadius = '5px';
    btnEsquecerPedido.style.cursor = 'pointer';
    

    btnEsquecerPedido.addEventListener('click',()=>{
        let localPedidos = JSON.parse(localStorage.getItem('pcpData-historicoPedidos'))
        let newLocalPedidos = localPedidos.map(pedido=>{return pedido['numero'] != idPedidoEsquecido })
        let newLocalPedidosStr = JSON.stringify(newLocalPedidos)
        localStorage.setItem('pcpData-historicoPedidos', newLocalPedidosStr)
        resetPedidosRedirectUrl()
    })

    return btnEsquecerPedido
}

function generateRedirectButton(label, href, id){
    let redirecter = document.createElement('p')
    redirecter.href = href
    redirecter.style.color = 'white'
    redirecter.style.height = '500'
    redirecter.textContent = label
    redirecter.style.width = 'fit-content'
    
    let containerRedirecter = document.createElement('div')
    containerRedirecter.style.backgroundColor = 'darkblue'
    // containerRedirecter.style.color = 'darkblue'
    containerRedirecter.style.height = 'fit-content'
    containerRedirecter.style.width = 'fit-content'
    containerRedirecter.style.cursor = 'pointer'    
    containerRedirecter.style.padding = '5px'    
    containerRedirecter.style.borderLeft = '5px solid lightgray'    
    containerRedirecter.style.borderRadius = '5px'    
    containerRedirecter.style.transitionDuration = '1s'
    containerRedirecter.classList.add('redirecters')
    containerRedirecter.id = id 

    containerRedirecter.appendChild(redirecter)
    
    // let btnEsquecerPedido = generateBtnEsquecerPedido(id)

    // containerRedirecter.appendChild(btnEsquecerPedido);

    // Adiciona o evento de hover para exibir o botão ao passar o mouse sobre o contêiner
    containerRedirecter.addEventListener('mouseover', function() {
        containerRedirecter.style.backgroundColor = '#33c'
    });

    // Adiciona o evento para esconder o botão ao retirar o mouse do contêiner
    containerRedirecter.addEventListener('mouseout', function() {
        containerRedirecter.style.backgroundColor = 'darkBlue'
    });




    containerRedirecter.addEventListener('click', function() {
        window.location.href = href; // Redireciona para o href ao clicar na div
    });
    return containerRedirecter
}

function generateLastPedidosRedirect(tagDestiny){
    // console.log('generatin listo pedids')
    let strPedidos = localStorage.getItem('pcpData-historicoPedidos')
    let pedidos = JSON.parse(strPedidos)
    if (pedidos==null){ pedidos = []}

    let divContainer = document.createElement('div')
    divContainer.style.display = 'flex'
    divContainer.style.flexWrap = 'no-wrap'
    divContainer.style.whiteSpace = 'nowrap';
    divContainer.style.overflowX = 'auto';

    divContainer.style.backgroundColor = '#77f'
    divContainer.style.gap = '10px'
    divContainer.style.padding = '5px'
    divContainer.style.color = '#000'
    divContainer.style.borderLeft = '4px solid blue'
    divContainer.style.position = 'absolute'
    divContainer.style.top = '55px'
    divContainer.style.right = '0px'
    divContainer.style.width = '80vw'

    pedidos.forEach(element => {
        let labelzin = element['numero'] + ' - ' + element['cliente'].split(' ')[0]
        let href = element['url']
        let idPedido = 'pcpIdElement-' + element['numero'] 

        let taqNavigation = generateRedirectButton(labelzin, href, idPedido)
        divContainer.appendChild(taqNavigation)
    });
    // console.log('tagDestiny', tagDestiny)
    // console.log('divContainer', divContainer)
    tagDestiny.appendChild(divContainer)
}

// =================================================================================
// lado esquerdo construção
// ================================================================================= 
function generateBigButton(label){
    let button = generateBasicButton(label)
    button = stylizeBigButton(button)
    button.id = 'pcpBigButton'
    return button
}    

function generatePerfilButton(tagDestiny){
    let classe = 'gotoPerfil-button' 
    let button = generateBasicButton('perfil', classe)

    button.addEventListener('click', ()=>{
        window.open(`${baseExtUrl}vendedores/perfil/${nomeVendedor}/`, '_blank')
    })

    tagDestiny.appendChild(button)
}

function generateRankingButton(tagDestiny){
    let classe = 'option-button'
    let btnRank = generateBasicButton('ver Ranking', classe)
    btnRank.addEventListener('click', () => {
        // console.log('Opção 1 visualizar ranking');
        window.open(`${baseExtUrlFlask}sellers/${nomeVendedor}/${isPacificUrl}`, '_blank');
    });

    tagDestiny.appendChild(btnRank)

}

function generateBeautyAdminRankingButton(tagDestiny){
    let classe = 'btnAdmin-button'
    let btnAdmin = generateBasicButton('g e r e n c i a', classe)
    btnAdmin.style.backgroundColor = 'lightBlue'
   
    btnAdmin.addEventListener('click', () => {
        // console.log('Opção 3 visualizar ranking');
        window.open(`${baseExtUrl}/admin`, '_blank');
    });
    
    tagDestiny.appendChild(btnAdmin)

}
function generateAdminRankingButton(tagDestiny){
    let classe = 'btnAdmin-button'
    let btnAdmin = generateBasicButton('ranking Geral', classe)
   
    btnAdmin.addEventListener('click', () => {
        // console.log('Opção 3 visualizar ranking');
        window.open(`${baseExtUrlFlask}sellers/admin`, '_blank');
    });
    
    tagDestiny.appendChild(btnAdmin)

}

function setupLeftInterface(headerLeftDiv){
 
    if (headerLeftDiv == undefined){
        setTimeout(verificaHeaderLeft, 500); // Verifica novamente após um intervalo de tempo
        return
    }

    const pageWrapper = document.querySelector('#page-wrapper')
    let notExpandedPagWrap = '100px'
    if (pageWrapper) {
        pageWrapper.style.paddingTop = notExpandedPagWrap;
    }
    
    let mainButton = generateBigButton('pcp')
    headerLeftDiv.appendChild(mainButton)

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    optionsContainer.style.display = 'none';

    if (isVendedor){
        let btnRank = generateRankingButton(optionsContainer)
        let btnPerfil = generatePerfilButton(optionsContainer)
    }
    if (isAdmin){
        let btnAdmin = generateAdminRankingButton(optionsContainer)
        let btnBeauty = generateBeautyAdminRankingButton(optionsContainer)
    }

    mainButton.addEventListener('click', () => {
    if (optionsContainer.style.display === 'none'){
        optionsContainer.style.display = 'block' 
        qtdBtns = optionsContainer.childElementCount
        // console.log(qtdBtns)
        qtdPixelsExpand = qtdBtns * 25 + 100
        pageWrapper.style.paddingTop = qtdPixelsExpand + 'px'
        
    }else {
        optionsContainer.style.display = 'none'
        pageWrapper.style.paddingTop = notExpandedPagWrap
    }
    });

    headerLeftDiv.appendChild(optionsContainer);


}


function setupRightInterface(tagDestiny){
    generateLastPedidosRedirect(tagDestiny)
}
// =================================================================================
// controle de Url e criação de DOM
// ================================================================================= 

function verificaURL() {
    // console.log('verificaUrl')
    if (window.location.href.includes('login')) {
        setTimeout(() => {
            verificaURL(); // Verifica novamente após um intervalo de tempo
        }, 1000);
    } else {
            // console.log('lets tryg')
            setupHeaderInfo()
        // })
    }
}

function setupHeaderInfo(){
    let headerSection = document.querySelector('.header-section')
    if (headerSection){
        // console.log('headerSetup')
        verificaHeaderRight(); // Chama a função setupPcpInterface quando 'login' não estiver mais na URL
        verificaHeaderLeft(); // Chama a função setupPcpInterface quando 'login' não estiver mais na URL
    }else{
        setInterval(()=>{setupHeaderInfo()},500)
    }

}


function verificaHeaderRight(){
    const headerRightDiv = document.querySelector('.header-right')

    if (headerRightDiv !== null) {
        // console.log('header-right Pronto');
        setupRightInterface(headerRightDiv)

    } else {
    //   console.log('Elemento .header-Right não encontrado, tentando novamente.');
      setTimeout(verificaHeaderRight, 500); 
    }
}


function verificaHeaderLeft() {
    const headerLeftDiv = document.querySelector('.header-left');
    
    if (headerLeftDiv !== null) {
        // console.log('header-left Pronto');
        setupLeftInterface(headerLeftDiv);

    } else {
    //   console.log('Elemento .header-left não encontrado, tentando novamente.');
      setTimeout(verificaHeaderLeft, 500); 
    }
  }
// console.log('gogoletsGo')
verificaURL()
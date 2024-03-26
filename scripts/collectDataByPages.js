// ***********************************************************************
// DETALHE ORCAMENTO SHITS
// ***********************************************************************
function getPedidoFromHtmlDetalheOrc() {
    console.log('colecting data')
    let infosPedidoStr = document.querySelector('#Title_DVPANEL_PANELDETALHEContainer').textContent.toLowerCase()
    let numeroMatch = infosPedidoStr.split(' cliente:')[0].split(':')[1];
    let numero = numeroMatch.replaceAll(' ', '')
    
    let clienteMatch = infosPedidoStr.split('cliente: ')[1].split(' vendedor:')[0];
    let cliente = clienteMatch

    let currentURL = window.location.href
    urlForHref = currentURL.split('/wvetro/')[1]
   
    let situacaoTagValue = document.querySelector('[id$=BTNGRAVARNOVASITUACAO]').value
    let situacao = situacaoTagValue == 'CONFIRMAR VENDA' ? 'orcando' : 'vendido'

    // let pedido = {'numero': numero, 'cliente':cliente, 'vendedor': vendedor, 'url': urlForHref}
    let horarioColeta = getHorarioAtual()
    let pedido = {'numero':numero, 'cliente': cliente, 'url':urlForHref, 'situacao':situacao, 'horarioColeta':horarioColeta}
    return pedido
}


// let counterUpdateAtivation = 0
function updateHistoricNewPedido(pedido){
    // console.log('counterUpdateAtivation: '+ counterUpdateAtivation)
    // salvando storage
    let pedidoString = JSON.stringify(pedido)
    localStorage.setItem('pcpData-ultimoPedido', pedidoString)
   
    let viewLocal = localStorage.getItem('pcpData-historicoPedidos')
    
    console.log(viewLocal)

    addDictToArrLS('pcpData-historicoPedidos', pedido, true, 'numero', 9);

    viewLocal = localStorage.getItem('pcpData-historicoPedidos')
    console.log(viewLocal)
    
    isDetalheTrygged = true
}
function updateGuideLinesHistoricPedidos(){
    let pedidosHistorico = JSON.parse(localStorage.getItem('pcpData-historicoPedidos'))
    
    pedidosHistorico.forEach(pedido=>{
        if (pedido['situacao']=='vendido'){

        }
    })
}


let isDetalheTrygged = false
let trygCounter = 0
function trygaDetalheOrcamento(){
    trygCounter++
    // console.log(trygCounter)
    if (checkTag('#Title_DVPANEL_PANELDETALHEContainer')){
        let pedido = getPedidoFromHtmlDetalheOrc()
        updateHistoricNewPedido(pedido)
        updateGuideLinesHistoricPedidos()
        cleanPedidosLinks()
    }
    else{
        callThisLater(trygaDetalheOrcamento)
    }
}



// ***********************************************************************
// OBSERVER URL
// ***********************************************************************


let previousUrlCollecting = '';
const observerCollecting = new MutationObserver(function(mutations) {
    let currentURL = window.location.href
    if (currentURL !== previousUrlCollecting) {
        previousUrlCollecting = currentURL

        if (window.location.href.includes('detalheorcamento')) {
        // console.log('scripto collectData')

            if (!isDetalheTrygged){
                // console.log('tryged script')
                trygaDetalheOrcamento()
            }
        }
    }
});

observerCollecting.observe(document, { childList: true, subtree: true });


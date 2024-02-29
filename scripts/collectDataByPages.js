function callThisLater(yourFunc){
    setTimeout(() => {
        yourFunc()
    }, 1000);
}
function checkTag(query){
    return !!document.querySelector(query)
}

function getPedidoFromHtmlDetalheOrc() {
    console.log('colecting data')
    let infosPedidoStr = document.querySelector('#Title_DVPANEL_PANELDETALHEContainer').textContent.toLowerCase()
    let numeroMatch = infosPedidoStr.split(' cliente:')[0].split(':')[1];
    let numero = numeroMatch.replaceAll(' ', '')
    
    // Encontrar o nome do cliente
    let clienteMatch = infosPedidoStr.split('cliente: ')[1].split(' vendedor:')[0];
    let cliente = clienteMatch
    
    // Encontrar o nome do vendedor
    let vendedorMatch = infosPedidoStr.split('vendedor: ')[1].split(' cel:')[0];
    let vendedor = vendedorMatch
    
    let currentURL = window.location.href
    urlForHref = currentURL.split('/wvetro/')[1]
   
    let situacaoTagValue = document.querySelector('#W0088W0002BTNGRAVARNOVASITUACAO').value
    let situacao = situacaoTagValue == 'CONFIRMAR VENDA' ? 'orcando' : 'vendido'

    // let pedido = {'numero': numero, 'cliente':cliente, 'vendedor': vendedor, 'url': urlForHref}
    let pedido = {'numero':numero, 'cliente': cliente, 'url':urlForHref, 'situacao':situacao}
    return pedido
}


// let counterUpdateAtivation = 0
function updateHistoricNewPedido(pedido){
    // console.log('counterUpdateAtivation: '+ counterUpdateAtivation)
    // counterUpdateAtivation++

    // salvando storage
    let pedidoString = JSON.stringify(pedido)
    localStorage.setItem('pcpData-ultimoPedido', pedidoString)
    
    addDictToArrLS('pcpData-historicoPedidos', pedido)
    
    isDetalheTrygged = true
    // let oldPedidosString = localStorage.getItem('pcpData-historicoPedidos')
    // if (!oldPedidosString){
    //     oldPedidosString = JSON.stringify([pedido])
    //     localStorage.setItem('pcpData-historicoPedidos', oldPedidosString)
    // }

    
    
    // let oldPedidos = JSON.parse(oldPedidosString)
    // let numerosPedido = oldPedidos.map((pedido)=>{
    //     return pedido['numero']
    // })
    
    
    // if (numerosPedido.includes(pedido['numero'])) {
    //     oldPedidos = oldPedidos.filter((pedidoAtual)=>{
    //         return pedido['numero'] != pedidoAtual['numero'] 
    //     })
    // }
    // oldPedidos.unshift(pedido)

    
    // let newPedidosString = JSON.stringify(oldPedidos)
    // localStorage.setItem('pcpData-historicoPedidos', newPedidosString)
    let hist = localStorage.getItem('pcpData-ultimoPedido')
    let last = localStorage.getItem('pcpData-historicoPedidos')
    console.log(hist , last)
}

function addDictToArrLS(lsKey, data, uniqueItens = true, defaultId = 'numero'){
    let oldDataStr = localStorage.getItem(lsKey)
    let myIdData = data[defaultId]

    if (oldDataStr){
        let arrData = JSON.parse(oldDataStr)

        if (uniqueItens) {
            let existingIndex = arrData.findIndex(item => item[defaultId] === myIdData);
            if (existingIndex !== -1) {
                arrData.splice(existingIndex, 1);
            }
        }
        arrData.unshift(data)
        let newArrData = JSON.stringify(arrData)
        localStorage.setItem(lsKey, newArrData)
    }else {
        let newDataStr = JSON.stringify([data])
        localStorage.setItem(lsKey, newDataStr)
    }
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
    console.log(trygCounter)
    if (checkTag('#Title_DVPANEL_PANELDETALHEContainer')){
        let pedido = getPedidoFromHtmlDetalheOrc()
        updateHistoricNewPedido(pedido)
        updateGuideLinesHistoricPedidos()
    }
    else{
        callThisLater(trygaDetalheOrcamento)
    }
}


let previousUrlCollecting = '';
const observerCollecting = new MutationObserver(function(mutations) {
    let currentURL = window.location.href
    if (currentURL !== previousUrlEasyNavigation) {
        if (window.location.href.includes('detalheorcamento')) {
        console.log('scripto collectData')
            if (!isDetalheTrygged){
                console.log('tryged script')
                trygaDetalheOrcamento()
            }
        }
    }
});

observerCollecting.observe(document, { childList: true, subtree: true });


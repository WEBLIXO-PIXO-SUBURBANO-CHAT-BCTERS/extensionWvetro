
mySellerName = localStorage.getItem('pcpData-VendedorNome')
mySellerId = localStorage.getItem('pcpData-idVendedor')

let bookOfTrygo = {
    'isTryggedCadastro': false,
    'isTryggedCoreOrcamento': false
}

let isTryggedCadastro = false
let isTryggedCoreOrcamento = false



function selectName(){
    const selectElement = document.getElementById("vVENDEDORID");
    console.log('select' + selectElement)
    if (selectElement) {
        selectElement.value = mySellerId;
    const changeEvent = new Event('change', { bubbles: true });
    selectElement.dispatchEvent(changeEvent);
    console.log('SELECTED',)
  }else{
    setTimeout(selectName, 500)
  }
}

function apertarBotao(query, keyBookOfTrygo = null){
    console.log('pertao botao')
    const element = document.querySelector(query)
    if (element == null){
        setTimeout(()=>{apertarBotao(query, keyBookOfTrygo)}, 500)
    }else {
        element.click()
        if (keyBookOfTrygo != null){
            bookOfTrygo[keyBookOfTrygo] = true
        }

    }
}



function coreOrcamentoCheck(currentURL){
    let elementLoaded = document.querySelector('#BTN_SEARCH')
    
    if(!elementLoaded){
        setTimeout(()=>{coreOrcamentoCheck(currentURL)}, 500)
    }else{        
        apertarBotao('#BTN_SEARCH', isTryggedCoreOrcamento)    
        if (currentURL.includes("app.core.wworcamento")){
            console.log('coreOrcamentoCheck tryg')
            
        let inputsListAddEvents = ['#vORCAMENTOID1','#vORCAMENTOSITUACAO', '#vCLIENTENOMERAZAO', '#vVENDEDORNOME', '#vORCAMENTODATACADASTRO', '#vORCAMENTODATACADASTRO_TO' ]
        
        inputNumero = document.querySelector('#vORCAMENTOID1')
        // Usar o evento input em vez do evento change
        
        inputNumero.addEventListener('input', ()=>{
            if (inputNumero.value.length == 5) {
                apertarBotao('#BTN_SEARCH')
            }
        });

        
        inputsListAddEvents.forEach((inputQuery)=>{
            let input = document.querySelector(inputQuery)
            if (input != null){
                input.addEventListener('change', () => {
                    apertarBotao('#BTN_SEARCH')
                })
            }
        })        
        console.log('TRUE | app.core.wworcamento | '+currentURL)
        }else if(!currentURL.includes("app.core.wworcamento")){
            isTryggedCoreOrcamento = false
            // console.log('FALSE | app.core.wworcamento | '+currentURL)
        }
    }
}

function cadastrarOrcamentoCheck(currentURL){
    if (currentURL.includes("app.wvetro.cadastrarorcamentonovo") && !isTryggedCadastro){
        selectName()    
        isTryggedCadastro  = true
    }else if(!currentURL.includes("app.wvetro.cadastrarorcamentonovo")){
        isTryggedCadastro = false
    }
}

let antigaUrl = ''
function monitorURLChange() {
    // console.log('urlCheck')
    let currentURL = window.location.href;
    if (currentURL != antigaUrl){
        antigaUrl = currentURL
        cadastrarOrcamentoCheck(currentURL)
        coreOrcamentoCheck(currentURL)
    }
}

setInterval(() => {
    monitorURLChange()
}, 500);

// let previousUrlEasyNavigation = '';

// let markerControllerObserver = ''

// const observerEasyNavigation = new MutationObserver(function(mutations) {
//     // console.log('observeer tryg')
//     let currentURL = window.location.href
//     // console.log(`${currentURL} - ${previousUrlEasyNavigation}`)
//     lastUrl = localStorage.getItem('pcpData-lastUrl')
//     if(lastUrl != currentURL){
    //         console.log('tryago')
    //         coreOrcamentoCheck(currentURL)
//         cadastrarOrcamentoCheck(currentURL)

//         localStorage.setItem('pcpData-lastUrl', lastUrl)
//     }

// if (currentURL != previousUrlEasyNavigation) {
    // console.log('currentUrl !== previousUrlNavigarion')
    //         previousUrl = window.location.href;
    //         // console.log(`URL changed from ${previousUrl} to ${window.location.href}`);
    //         if (window.location.href.includes('detalheorcamento')) {
        //             addSomNoBotao();
    //             console.log('detailOrc')
    //             waiterForOcult();
    //     }
    // }else{
        // console.log('igualUrl')
        // }
        // previousUrlEasyNavigation = currentURL
        
    // });
        // observerEasyNavigation.observe(document, { childList: true, subtree: true });
        
        


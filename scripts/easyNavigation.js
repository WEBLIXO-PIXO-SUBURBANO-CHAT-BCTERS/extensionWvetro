
mySellerName = localStorage.getItem('pcpData-VendedorNome')
mySellerId = localStorage.getItem('pcpData-idVendedor')

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
  }
}

function apertarBotao(query){
    console.log('pertao botao')
    const element = document.querySelector(query)
    if (element == null){
        setTimeout(()=>{apertarBotao(query)}, 500)
    }else {
        element.click()
    }
    
}




function coreOrcamentoCheck(currentURL){
    
    let elementLoaded = document.querySelector('#vCLIENTENOMERAZAO')

    if (currentURL.includes("app.core.wworcamento") && !isTryggedCoreOrcamento && elementLoaded){
            
            apertarBotao('#BTN_SEARCH')    
            let inputsListAddEvents = ['#vORCAMENTOSITUACAO', '#vCLIENTENOMERAZAO', '#vVENDEDORNOME', '#vORCAMENTODATACADASTRO', '#vORCAMENTODATACADASTRO_TO', '#vORCAMENTOID1']
            
            inputsListAddEvents.forEach((inputQuery)=>{
                let input = document.querySelector(inputQuery)
                if (input != null){
                    
                    
                    input.addEventListener('change', () => {
                        apertarBotao('#BTN_SEARCH')
                    })
                }
            })        
            
        isTryggedCoreOrcamento  = true
        console.log('TRUE | app.core.wworcamento | '+currentURL)
    }else if(!currentURL.includes("app.core.wworcamento")){
        isTryggedCoreOrcamento = false
        // console.log('FALSE | app.core.wworcamento | '+currentURL)
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


// function monitorURLChange() {
//     // console.log('urlCheck')
//     const currentURL = window.location.href;
//     cadastrarOrcamentoCheck(currentURL)
//     coreOrcamentoCheck(currentURL)
// }

// setInterval(() => {
//     monitorURLChange()
// }, 500);



let previousUrlEasyNavigation = '';
const observerEasyNavigation = new MutationObserver(function(mutations) {
    let currentURL = window.location.href
    if (currentURL !== previousUrlEasyNavigation) {
    coreOrcamentoCheck(currentURL)
    cadastrarOrcamentoCheck(currentURL)
    //         previousUrl = window.location.href;
    //         // console.log(`URL changed from ${previousUrl} to ${window.location.href}`);
    //         if (window.location.href.includes('detalheorcamento')) {
    //             addSomNoBotao();
    //             console.log('detailOrc')
    //             waiterForOcult();
    //     }
    }
});

observerEasyNavigation.observe(document, { childList: true, subtree: true });




    // isAdminLimiting = JSON.parse(localStorage.getItem('pcpData-isAdmin'))
    // console.log('runscript')

    // setInterval(()=>{
    //     let inputo = document.querySelector('#gxp0_b') 
    //     // let input = document.createElement('input')

    //     console.log(inputo)
    //     console.log('intervo')
    //     if(inputo != null){
    //         console.log('inputosim')
    //         if (!isAdminLimiting){

    //             console.log('isAdminNot')
    //             inputo.disabled = true
    //         }
    //     }
    // }, 500)


// // ***********************************************************************
// // SET CONFIGURATIONS
// // ***********************************************************************

// let isLockedTrygged = false



// // ***********************************************************************
// // LOCKING VENDEDOR
// // ***********************************************************************
// function blockerSelectRepeater(){
//     let selecto = document.querySelector('#vOPCAO')
//     console.log('blockSelector', selecto)
//     if (selecto != null){
//         console.log('GETED')
//     }else{
//         setTimeout(()=>{blockerSelectRepeater()}, 1000)
//     }
// }

// function lockVendedoresPackDetalheOrcamento(){
//     isLockedTrygged = true
//     let isAdmin = JSON.parse(localStorage.getItem('pcpData-isAdmin'))
//     if(!isAdmin){
//         console.log('lockVendedorAtivado')

//         blockerSelectRepeater()

//         // let trs = document.querySelector('#W0088W0002GridContainerTbl').querySelectorAll('tr')
//         // console.log(trs)
//         // let anchors = []
//         // trs.forEach(tr=>{
//         //     let as = tr.querySelectorAll('span')
//         //     anchors.push(as)    
//         // })
//         // console.log(anchors)  
//         //     function querMexerPreco(){
//         //         let painelModificaPedidosPreco = document.querySelector('#DVPANEL_TABLEATTRIBUTESContainerTableAttributes')
//         //         let selectTag = painelModificaPedidosPreco.querySelector('select')

//         //         if (painelModificaPedidosPreco){
//         //             console.log('achado painel! achado')
//         //             console.log(painelModificaPedidosPreco)
//         //         }
                
//         //         selectTag.addEventListener('change', ()=>{
//         //             if (selectTag.value == 3){
//         //                 painelModificaPedidosPreco.style.backgroundColor = 'red'
//         //             }
//         //             console.log()
//         //         })
                
//         //     } 
        
//     }

// }



// // ***********************************************************************
// // OBSERVER
// // ***********************************************************************

// // let previousUrlLimiting = '';
// // const observerLimiting = new MutationObserver(function(mutations) {
// //     let currentURL = window.location.href
// //     if (currentURL.includes('detalheorcamento')){
// //     }
// // });

// // observerLimiting.observe(document, { childList: true, subtree: true });


// let alreadyTrigged = false

// function monitorURLChange() {
//     const currentURL = 'window.location.href';
//     console.log('preScriptLimit')
//     if (currentURL.includes("detalheorcamento") && !alreadyTrigged){
//         console.log('scripto limiting')
//         if (!isLockedTrygged){
//             lockVendedoresPackDetalheOrcamento()
//         }
//     alreadyTrigged = true
//     } else if(!currentURL.includes("detalheorcamento")){
//     alreadyTrigged = false
//     }
// }

// setInterval(() => {
//     console.log('setInterva')
//     monitorURLChange()
// }, 500);
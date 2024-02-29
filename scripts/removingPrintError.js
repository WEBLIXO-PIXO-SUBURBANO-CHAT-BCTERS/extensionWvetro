let querysForOcult = [
'#menu_414',
'#menu_388',
'#menu_406',
'#menu_408',
'#menu_410',
'#menu_411',
'#menu_1158',
'#menu_412',
'#menu_416',
'#menu_1054',
'#menu_1066'
]
console.log('removingPrintsErro')
function ocultLi(query){
    liErrada = document.querySelector(query)
    liErrada.style.display = 'none'
}
function oculter(){
    // console.log('oculter')
    tagTeste = document.querySelector('#menu_414')
    if(tagTeste == null || tagTeste.style.display == 'none'){
        setTimeout(()=>{
                oculter()                    
            }, 500)
        }else{
            querysForOcult.forEach(query=>ocultLi(query))
            ulzonas = document.querySelectorAll('ul')
            // console.log(ulzonas)
            relatoriosUl = ulzonas[4]
            // console.log(relatoriosUl)
            lisOfUl = relatoriosUl.querySelectorAll('li')
        }

}
function waiterForOcult(){
    // console.log('waiter')
    let btnRelatorio = document.querySelector('#TABLEICONS_0003')
    // console.log(btnRelatorio)    
    if (btnRelatorio == null){setTimeout(waiterForOcult, 500)}
    btnRelatorio.addEventListener('click', ()=>{oculter()})

    
    
}

function addSomNoBotao(){
    // console.log('somBotaoADDED')
    let button = document.getElementById('W0088W0002BTNGRAVARNOVASITUACAO');
    // Adiciona um evento de clique ao botão
    button.addEventListener('click', function() {
        var soundUrl = chrome.runtime.getURL('sons/vendaSom.mp3');
        let audio = new Audio(soundUrl);
        audio.play();
    });
}


let previousUrl = '';
const observer = new MutationObserver(function(mutations) {
    if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        // console.log(`URL changed from ${previousUrl} to ${window.location.href}`);
        if (window.location.href.includes('detalheorcamento')) {
            addSomNoBotao();
            // console.log('detailOrc')
            waiterForOcult();
    }
}});

observer.observe(document, { childList: true, subtree: true });

mySellerId = sellersId['BEATRIZ BOSCHETTI']




sellersId = {'BEATRIZ BOSCHETTI':15730,
'BIANCA BOSCHETTI':12839,
'ELAINE APARECIDA':24508,
'FERNANDO BOSCHETTI':21758,
'LUCIANA ROCHA':20811,
'MICHELLE BOSCHETTI':9810,
'PIQUI':10117,
'TATIANE BROCKVELD':15292,
'VALTER SOUZA':21098,
'WILLIAN SOUZA':24181}



function selectName(){
    const selectElement = document.getElementById("vVENDEDORID");
    if (selectElement) {
        selectElement.value = mySellerId;
    const changeEvent = new Event('change', { bubbles: true });
    selectElement.dispatchEvent(changeEvent);
    console.log('SELECTED',)
  }
}
selectName()
console.log('scripted')


let alreadyTrigged = false

function monitorURLChange() {
const currentURL = window.location.href;
if (currentURL.includes("app.wvetro.cadastrarorcamentonovo") && !alreadyTrigged){
    selectName()    
    alreadyTrigged = true
}else if(!currentURL.includes("app.wvetro.cadastrarorcamentonovo")){
  alreadyTrigged = false
}
}

setInterval(() => {
monitorURLChange()
}, 500);

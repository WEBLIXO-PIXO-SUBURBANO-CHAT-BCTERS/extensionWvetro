// ***********************************************************************
// UTILITIES FUNCTIONS
// ***********************************************************************
function callThisLater(yourFunc){
    setTimeout(() => {
        yourFunc()
    }, 1000);
}
function checkTag(query){
    return !!document.querySelector(query)
}
function getHorarioAtual() {
    let agora = new Date();
    return agora;
}

// ***********************************************************************
// LOCAL STORAGE FUNCTIONS
// ***********************************************************************
function removeDictFromArrLS(lsKey, dictKey, value) {
    let oldDataStr = localStorage.getItem(lsKey);
    if (!oldDataStr) {
        console.log(`No data found for key: ${lsKey}`);
        return;
    }
    let oldDataArray = JSON.parse(oldDataStr);
    let newDataArray = oldDataArray.filter(data => {
        return data.hasOwnProperty(dictKey) && data[dictKey] != value;
    });
    localStorage.setItem(lsKey, JSON.stringify(newDataArray));
}

function addDictToArrLS(lsKey, data, uniqueItens = true, defaultId = 'numero', max = null){
    let oldDataStr = localStorage.getItem(lsKey)
    let myIdData = data[defaultId]
    console.log('Tamanho do array antes de adicionar:', oldDataStr ? JSON.parse(oldDataStr).length : 0, max);

    if (oldDataStr){
        let arrData = JSON.parse(oldDataStr)

        if (uniqueItens) {
            let existingIndex = arrData.findIndex(item => item[defaultId] === myIdData);
            if (existingIndex !== -1) {
                arrData.splice(existingIndex, 1);
            }
        }
        if (max != null){
            if (arrData.length >= max){
                while (arrData.length >= max){
                    arrData.pop()
                }
            }   
        }
        arrData.unshift(data)
        
        let newArrData = JSON.stringify(arrData)
        localStorage.setItem(lsKey, newArrData)
    }else {
        let newDataStr = JSON.stringify([data])
        localStorage.setItem(lsKey, newDataStr)
    }

    let newLength = JSON.parse(localStorage.getItem(lsKey)).length;
    console.log('Tamanho do array depois de adicionar:', newLength);
}


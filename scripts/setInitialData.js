// ################################################################################################################################################################################################################
// A LOTS OF DATA
// ################################################################################################################################################################################################################
let idVendedorGuide = {
    'ANA CAROLINA':24841,
    'BEATRIZ BOSCHETTI':15730,
'BIANCA BOSCHETTI':12839,
'ELAINE APARECIDA':24508,
'FERNANDO BOSCHETTI':21758,
    'LUCIANA ROCHA':20811,
    'MICHELLE BOSCHETTI':9810,
    'PIQUI':10117,
    'TATIANE BROCKVELD':15292,
    'VALTER SOUZA':21098,
    'WILLIAN SOUZA':24181
}
    
let nomeVendedorGuide = {
    'fernando boschetti': 'FERNANDO BOSCHETTI',
    'michelle boschetti': 'MICHELLE BOSCHETII',
    'luciana rocha': 'LUCIANA ROCHA',
    'valter neto': 'VALTER SOUZA',
    'tatiane brockveld': 'TATIANE BROCKVELD',
    'beatriz boschetti': 'BEATRIZ BOSCHETTI',
    'ana carolina': 'ANA CAROLINA',
    'willian sousa': 'WILLIAN SOUZA',
    'tiago boschetti': 'NAO VENDEDOR',
    'matheus florentino de carvalho': 'VALTER SOUZA'
    }
let cargoGuide = {
    'fernando boschetti': 'vendedor',
    'michelle boschetti': 'vendedor',
    'luciana rocha': 'vendedor',
    'valter neto': 'vendedor',
    'bianca boschetti': 'financeiro',
    'tatiane brockveld': 'vendedor',
    'beatriz boschetti': 'vendedor',
    'ana carolina': 'vendedor',
    'willian sousa': 'producao',
    'tiago boschetti': 'producao',
    // 'matheus florentino de carvalho': 'vendedor'
    'matheus florentino de carvalho': 'programador'
}

let isAdminUserList = ['michelle boschetti', 'matheus florentino de carvalho', 'bianca boschetti', 'willian sousa']
// localStorage.setItem('pcpData-isCleanedPedidos', 'false')

// ################################################################################################################################################################################################################
// URL SHITS
// ################################################################################################################################################################################################################


function verificaURL() {
    // console.log('setInitialData->verificaUrl()')
    
    if (window.location.href.includes('login')) {
        setTimeout(() => {
            verificaURL(); // Verifica novamente após um intervalo de tempo
        }, 1000);
    } else {
        setHeaderInformation()
        cleanPedidosLinks()
    }
}


// ################################################################################################################################################################################################################
// CLEANING PEDIDOS LINKS
// ################################################################################################################################################################################################################
// Função para limpar os links dos pedidos que estão inválidos, usando a função checkLink
async function checkLink(url) {
    // Usar o fetch API para obter o status do link, usando o método HEAD
    return fetch(url, {
      method: "GET"
    })
    .then(response => response.status) // Retornar o código do status
    .catch(error => false); // Mostrar o erro no console
  }

async function checkPedido(pedido){
    let link = pedido["url"];
    let status = await checkLink(link);
    console.log('controle de links -> ', link, status, pedido['numero'])
    if (status < 300) {
        return true; // retorna true para qualquer outro status
    } else {
        return false; // retorna false se o status for 403 (Forbidden)
    }
}


let isCleaned = false
async function cleanPedidosLinks() {
    if(!isCleaned){

        isCleaned = true
        let neededToBeClean = false
        let pedidosValidos = [];

    
        let pedidos = JSON.parse(localStorage.getItem("pcpData-historicoPedidos"));
    
        if (pedidos != null){
            console.log('cleanando',pedidos)        
            
            pedidos.forEach(async pedido => {
                let check = await checkPedido(pedido)
                if (check) {
                    pedidosValidos.unshift(pedido);
                    console.log(check, pedido, pedidosValidos)
                } else {
                    neededToBeClean = true
                    delete pedido["url"];
                    addDictToArrLS("pcpData-pedidosExcluidos", pedido);
                    console.log('ERRADO', pedido)
                }
                
            });
            
            let json = JSON.stringify(pedidosValidos);
            if (neededToBeClean){
                localStorage.setItem("pcpData-historicoPedidos", json);
                console.log("Links limpos com sucesso!", pedidosValidos); 
            }else{
                console.log('links estavam limpinho')
            }
        }
    }
}
    
    // ################################################################################################################################################################################################################
// GETTING PROCESSING SAVEING DATA
// ################################################################################################################################################################################################################
function setHeaderInformation(){
    try {
        cleanPedidosLinks()
        let userName = document.querySelector('.user-name').querySelector('p').textContent.toLowerCase();
        let userCargo = cargoGuide[userName];
        
        localStorage.setItem('pcpData-userName', userName)
        localStorage.setItem('pcpData-userCargo', userCargo)
        // console.log(userName + ' ' + userCargo)
        if (userCargo == 'vendedor'){
            nomeDeVendedor = nomeVendedorGuide[userName]
            idDeVendedor = idVendedorGuide[nomeDeVendedor]
            
            localStorage.setItem('pcpData-nomeVendedor', nomeDeVendedor)
            localStorage.setItem('pcpData-idVendedor', idDeVendedor)
            // console.log(nomeDeVendedor + ' ' + idDeVendedor)
        }else {
            localStorage.removeItem('pcpData-nomeVendedor')
            localStorage.removeItem('pcpData-idVendedor')
        }
        
        if (isAdminUserList.includes(userName)){
            localStorage.setItem('pcpData-isAdmin', true)
            // console.log(isAdminUserList + ' ' + userName + '|' + isAdminUserList.includes(userName))
        }else{
            // console.log('isNotAdmin')
            localStorage.setItem('pcpData-isAdmin', false)
        }
        
    } catch (error) {
        console.error(error);
        setTimeout(() => {
            console.log('chamando setHeaderInfo')
            setHeaderInformation();
        }, 1500);
    }
        
    }
    
verificaURL()




















// nomeVendedor = 'ana carolina'

// function loadNews() {
    //     fetch(`${baseExtUrl}ext/news/${nomeVendedor}`)
    //         .then(response => {
        //             console.log(response)
        //             if (response.status == 404) {
            //                 let newsArray = [{
                //                     'title': 'não foi possivel resgatar noticias de pcp :/',
                //                     'content': 'basicamente deu algum problema na api, mas em breve vou tentar arrumar :D'
                //                 }]
//                 localStorage.setItem('newsArray', JSON.stringify(newsArray))
//                 localStorage.setItem('newsId', 'erro')
//                 console.log('salvobackup')
//             }
//             if (!response.ok) {
//                 throw new Error('Erro ao carregar notícias');
//             }
//             return response.json();
//         })
//         .then(jsonBody => {

//             let newsArray = jsonBody.news
//             let newsId = jsonBody.news_storage_id

//             localStorage.setItem('newsArray', JSON.stringify(newsArray))
//             localStorage.setItem('newsId', newsId)

//         })
//         .catch(error => {
//             console.error('Erro ao carregar notícias:', error);
//         });
// }

// loadNews()

//     fetch(`${baseExtUrl}ext/htmx/saquinhosDeOuro/${nome}/header/`, {
//         method: 'GET',
//         mode: 'cors', // Modo CORS para permitir requisições entre origens
//         headers: {
//             'Content-Type': 'application/json', // Exemplo de cabeçalho adicional
//             // Adicione mais cabeçalhos conforme necessário
//             'Access-Control-Allow-Origin':true}
//     })
//     .then(response => {
//         console.log(response)
//         if (!response.ok) {
//             throw new Error('Erro ao carregar notícias');
//         }
//         console.log('response:' + response.text())
//         return response.text();
//     })
//     .then(data => {
//         containerForSaquinhos.innerHTML = data
//     })
//     .catch(error => {
//         console.error('Erro ao carregar notícias:', error);
//     });
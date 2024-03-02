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
        cleanPedidosLinks()
        setTimeout(() => {
            verificaURL(); // Verifica novamente após um intervalo de tempo
        }, 1000);
    } else {
    setHeaderInformation()
    }
}

async function checkLink(url) {
    // Usar o fetch API para obter o status do link, usando o método HEAD
    return fetch(url, {
      method: "GET"
    })
    .then(response => !response.url.includes('notauthorized')) // Retornar o código do status
    .catch(error => false); // Mostrar o erro no console
  }

// ################################################################################################################################################################################################################
// CLEANING PEDIDOS LINKS
// ################################################################################################################################################################################################################
// Função para limpar os links dos pedidos que estão inválidos, usando a função checkLink

async function checkPedido(pedido){
    // console.log('pedido')
    // console.log(pedido)
    let link = pedido["url"];
    let status = await checkLink(link);
    if (status) {
        return true; // retorna true para qualquer outro status
    } else {
        return false; // retorna false se o status for 403 (Forbidden)
    }
}


let isCleaned = false
async function cleanPedidosLinks() {
    if(!isCleaned){

        isCleaned = true
        let pedidosValidos = [];
    
        let pedidos = JSON.parse(localStorage.getItem("pcpData-historicoPedidos"));
        
        let lenPedido = pedidos.length    
        // console.log('pedidos: estudo -1', pedidos[lenPedido -1])
        // console.log('pedidos: estudo', pedidos[1])
        
        // if (!checkPedido(pedidos[lenPedido -1])){
            for (let pedido of pedidos) {
                check = await checkPedido(pedido)
                console.log(check)
                if (check) {
                pedidosValidos.unshift(pedido);
            } else {
                delete pedido["url"];
                addDictToArrLS("pcpData-pedidosExcluidos", pedido);
            }
        }
        
        let json = JSON.stringify(pedidosValidos);
        
        localStorage.setItem("pcpData-historicoPedidos", json);
        console.log("Links limpos com sucesso!"); 
        // console.log(json); 
        // }else{
            
        // console.log('todos links estavam funcionando')
        // }
    }
}
    
    // ################################################################################################################################################################################################################
// GETTING PROCESSING SAVEING DATA
// ################################################################################################################################################################################################################
function setHeaderInformation(){
    // let userNameTag = document.querySelector('.user-name')
    // if (!userNameTag){
    //     setTimeout(() => {
    //         setHeaderInformation()
    //     }, 500);
    // } else {return 'deu nao'}
    // let userName = userNameTag.querySelector('p').textContent.toLowerCase()
    // let userCargo = cargoGuide[userName]

    try {
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
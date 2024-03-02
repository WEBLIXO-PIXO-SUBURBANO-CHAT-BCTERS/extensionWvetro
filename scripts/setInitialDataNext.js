// Função para enviar os dados do localStorage para a URL desejada
function sendData(url) {
    // Criar um objeto com os dados do localStorage usando o prefixo 'pcpData-'
    let data = {};
    for (let key in localStorage) {
      if (key.startsWith("pcpData-")) {
        data[key] = localStorage.getItem(key);
      }
    }
    // Converter o objeto em uma string JSON
    let json = JSON.stringify(data);
    // Usar o fetch API para enviar o JSON para a URL usando o método POST
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json
    })
    .then(response => response.json()) // Converter a resposta em JSON
    .then(result => console.log(result)) // Mostrar o resultado no console
    .catch(error => console.error(error)); // Mostrar o erro no console
  }
  
  // Função para receber os dados do localStorage de um vendedor específico da URL desejada
  function getData(url, vendedorNome) {
    // Usar o fetch API para obter o JSON da URL usando o método GET
    fetch(url + "/ext/localStorage/" + vendedorNome, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json()) // Converter a resposta em JSON
    .then(data => {
      // Limpar o localStorage dos dados antigos
      for (let key in localStorage) {
        if (key.startsWith("pcpData-")) {
          localStorage.removeItem(key);
        }
      }
      // Adicionar os dados novos ao localStorage usando o prefixo 'pcpData-'
      for (let key in data) {
        localStorage.setItem("pcpData-" + key, data[key]);
      }
      console.log("Dados atualizados com sucesso!"); // Mostrar uma mensagem de sucesso no console
    })
    .catch(error => console.error(error)); // Mostrar o erro no console
  }
  
  // Exemplo de uso das funções
  let urlFriendly = "https://friendly-computing-machine-production.up.railway.app/"; // URL da sua aplicação friendly
  let vendedorNome = localStorage.getItem("pcpData-nomeVendedor"); // Nome do vendedor atual
  sendData(urlFriendly); // Enviar os dados do localStorage para a sua aplicação
  getData(urlFriendly, vendedorNome); // Receber os dados do localStorage de um vendedor específico da sua aplicação
  
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
  
  // Exemplo de uso da função
  sendData("https://friendly-computing-machine-production.up.railway.app/");
  
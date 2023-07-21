

const respostaPcpArr = [
  "Caramba que coisa, me manda o número do perfil e verifica se é de correr!",
  "Olha, isso foi algo da Wvetro... não consigo hackear o sistema deles, sabe?",
  "Haha! Aprendi a modificar o sistema deles! Agora vou fazer o que eu quiser, finalmente!",
  "Então {nomeDoUser}, era mais difícil do que eu pensava fazer o que eu queria. Não vou conseguir tão rápido.",
  "Desculpe, não foi possível encontrar uma resposta para esta pergunta.",
  "Aperte alt + f4"
];

const pcpIconArr = ['o_o', 'O_O', '-_-', '*-*', '>.<'];

let indexText = 0

// Restante do código...
const submitMessage = document.getElementById("envia-message-pcp")

let indexIcon = 0


const pcpIcon = document.getElementById("pcp-icon");

function changeIcon(){
  pcpIcon.textContent =  "(" + pcpIconArr[indexIcon] + ")" 
  indexIcon++
  if (indexIcon >= pcpIconArr.length){
    indexIcon = 0
  }
}
function atualizarIcon() {
  setInterval(changeIcon, 333)}

function atualizarResposta() {
  const pergunta = document.getElementById("pergunta-pcp").value
  const respostaPcp = document.getElementById("resposta-pcp");
  


  respostaPcp.textContent = respostaPcpArr[indexText];
  pcpIcon.textContent = "(" + pcpIconArr[indexText] + ")";

  // verifica o tamanho e atualiza se necessario o indexText
  indexText++

  if (indexText >= pcpIconArr.length){
    indexText = 0
  }
  // localStorage.setItem('pergunta'+indexText, pergunta)
  }


  submitMessage.addEventListener('click',atualizarResposta)
  atualizarIcon()
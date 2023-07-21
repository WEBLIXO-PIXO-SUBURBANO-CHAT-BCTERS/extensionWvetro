// background.js

// Função para abrir a outra aba
function abrirOutraAba() {
    chrome.tabs.create({ url: 'relatorios.html' });
  }
  
  // Adicionar um listener para o clique do botão
  chrome.action.onClicked.addListener(abrirOutraAba);
  
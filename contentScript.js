class TextDisplay {
  constructor() {
    this.textElement = document.createElement("div");
    this.textElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      padding: 35px;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: 10px;
      font-family: Arial, sans-serif;
      font-size: 20px;
      text-align: center;
      z-index: 9999;
    `;
  }

  displayText(text, duration = 2000) {
    this.textElement.textContent = text;
    document.body.appendChild(this.textElement);

    setTimeout(() => {
      this.textElement.remove();
    }, duration);
  }
}

let textObject = {
  wait: "Espera um pouco!",
  welcome: "Bem-vinda matheusito!",
};

const globalText = new TextDisplay

class WorkManager {
  constructor() {
    this.pageIsFounded;
    this.isBudgetPage = false;
    this.isHomePage = false;
    this.safesPages = ["app.core.wworcamento", "app.wvetro.detalheorcamento"];
    this.url = window.location.href; // Obter a URL inicial e armazenar na propriedade this.url
    this.manualOfButtons = [{'name': 'analisar colega', 'function': 'redirectRepo', 'href': 'popup.html'},
        {'name': 'descanso', 'function': 'redirectWeb', 'href': 'https://ball-time.vercel.app/'},
        {'name': 'minhas analises', 'function': 'redirectRepo', 'href': 'myAnalises.html'},
        {'name': 'remover algo', 'function': 'modify'}];
  }

  checkOrcments(){

    if (this.url.includes("app.core.wworcamento") ) {
      this.pageIsFounded = true
      if (!this.isBudgetPage){
        this.pressButton();
        this.checkInputs();
        this.isBudgetPage = true
        console.log('PRIMEIRO', this.isBudgetPage)
      }
    
    }
  }

  checkHomes(){
    if (this.url.includes("app.wvetro.home")) {
      this.pageIsFounded = true
      this.isBudgetPage = false
      if (this.isHomePage == false){
        this.isHomePage = true
        this.renderizeButtonsHome()
      }
    } 
  }

  // checkList de funcionamento
  // 1. atualização da pagina de orçamento
  // 2. verificar se os botoes aparecem e redirecionam

  checkURL() {
    this.pageIsFounded = false
    this.url = window.location.href; // Atualizar a URL antes de verificar
    console.log('é né checkando', this.url)
    this.checkOrcments()
    this.checkHomes() 
    if (!this.pageIsFounded){
      this.isBudgetPage = false
    }
  }
  
  addButtonsOnProfile() {
    const profileHtml = document.querySelector('#WIDGETPROFILE');

    const contBtn = document.createElement('div')

    this.manualOfButtons.forEach(buttonInfo => {
        const button = document.createElement('button');
        button.textContent = buttonInfo.name;
        button.style.width = '100%'
        button.style.height = '100%'
        
        if (buttonInfo.function === 'redirectWeb') {
          button.addEventListener('click', () => window.open(buttonInfo.href, '_blank'));
        } else if (buttonInfo.function === 'redirectRepo') { 
          button.addEventListener('click', () => {
            const redirectURL = chrome.runtime.getURL(buttonInfo.href);
            window.open(redirectURL, '_blank');
          });
        }
        contBtn.append(button)
      });  
        // Adiciona os botões antes do conteúdo existente do widget
      profileHtml.insertBefore(contBtn, profileHtml.firstChild);
    }
  renderizeButtonsHome(){
    this.addButtonsOnProfile();
    }

    

  startWork() {
    this.checkURL(); // Verificar a URL inicialmente
    this.welcome()
    setInterval(() => {
      this.checkURL(); // Verificar a URL repetidamente a cada intervalo
    }, 5000);
  }

  pressButton() {
    const button = document.getElementById("BTN_SEARCH");
    if (button) {
      button.click();
      globalText.displayText(textObject.wait);
    }
  }

  checkInputs() { 
    const inputs = document.querySelectorAll("input");
    let timer;

    function checkFilling() {
      clearTimeout(timer);
      timer = setTimeout(this.pressButton.bind(this), 1000);
    }

    inputs.forEach((input) => {
      input.addEventListener("input", checkFilling.bind(this));
    });
  }

  welcome() {
    globalText.displayText(textObject.welcome)
  }
 
}
function main() {
  const workManager = new WorkManager();
  workManager.startWork();
  console.log('main')
}

console.log('solto')
main()
document.addEventListener('DOMContentLoaded', function() {
    var enableUtilitiesFunctionsCheckbox = document.getElementById('enableUtilitiesFunctions');
    var enableSetInitialDataCheckbox = document.getElementById('enableSetInitialData');
    // Adicione variáveis para outros scripts aqui

    // Carrega o estado anterior dos checkboxes do localStorage
    var isEnabledUtilitiesFunctions = JSON.parse(localStorage.getItem('pcpData-enableUtilitiesFunctions')) || false;
    var isEnabledSetInitialData = JSON.parse(localStorage.getItem('pcpData-enableSetInitialData')) || false;
    // Adicione variáveis para outros scripts aqui
    enableUtilitiesFunctionsCheckbox.checked = isEnabledUtilitiesFunctions;
    enableSetInitialDataCheckbox.checked = isEnabledSetInitialData;
    // Adicione atribuições para outros scripts aqui

    // Adiciona listeners para salvar o estado dos checkboxes no localStorage
    enableUtilitiesFunctionsCheckbox.addEventListener('change', function() {
        localStorage.setItem('pcpData-enableUtilitiesFunctions', enableUtilitiesFunctionsCheckbox.checked);
    });
    enableSetInitialDataCheckbox.addEventListener('change', function() {
        localStorage.setItem('pcpData-enableSetInitialData', enableSetInitialDataCheckbox.checked);
    });
    // Adicione listeners para outros scripts aqui
});

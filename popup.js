// 15730	BEATRIZ BOSCHETTI
// 12839	BIANCA BOSCHETTI
// 24508	ELAINE APARECIDA
// 21758	FERNANDO BOSCHETTI
// 20811	LUCIANA ROCHA
// 9810	MICHELLE BOSCHETTI
// 10117	PIQUI
// 15292	TATIANE BROCKVELD
// 21098	VALTER SOUZA
// 24181	WILLIAN SOUZA
var nomeVendedor = 'valter souza'

// baseExtUrl = 'https://friendly-computing-machine-production.up.railway.app/ext'
baseExtUrl = 'http://127.0.0.1:5000/ext'


function showResume() {
    // alert('shoReusme tryged')
    fetch(`${baseExtUrl}/getResume/${nomeVendedor}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.text())
    .then(htmlContent => {
        // alert(htmlContent)
        // console.log('Informações Recebidas:', data);
        let container = document.querySelector('.contentPopup')
        container.innerHTML = htmlContent

        // alert('Informações Recebidas:\n' + JSON.stringify(data));
    })
    .catch(error => {
        console.error('Erro ao buscar informações:', error);
        alert('Erro ao buscar informações. Verifique o console para detalhes.');
    });
}
showResume()
// if (nomeVendedor) {
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('visualizarInfo').addEventListener('click', showResume);
    
    document.getElementById('redirecionarFlask').addEventListener('click', function() {

    window.open(`https://flask-production-2cb1.up.railway.app/sellers/${nomeVendedor}`, '_blank');
    });

    document.getElementById('reportarErro').addEventListener('click', function() {
    var erro = prompt('Descreva o problema:');
    if (erro !== null && erro.trim() !== '') {
        fetch(`${baseExtUrl}/relatarProblema/${nomeVendedor}`, {
        method: 'POST',
        body: JSON.stringify({ problema: erro }),
        headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
        if (response.ok) {
            alert('Erro relatado com sucesso!');
        } else {
            throw new Error('Erro ao relatar problema');
        }
        })
        .catch(error => {
        console.error('Erro ao relatar problema:', error);
        alert('Erro ao relatar problema. Verifique o console para detalhes.');
        });
    }
    });

    document.getElementById('propostaMelhoria').addEventListener('click', function() {
    var proposta = prompt('Digite sua sugestão de melhoria:');
    if (proposta !== null && proposta.trim() !== '') {
        fetch(`${baseExtUrl}/propostaMelhoria/${nomeVendedor}`, {
        method: 'POST',
        body: JSON.stringify({ sugestao: proposta }),
        headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
        if (response.ok) {
            alert('Melhoria proposta com sucesso!');
        } else {
            throw new Error('Erro ao propor melhoria');
        }
        })
        .catch(error => {
        console.error('Erro ao propor melhoria:', error);
        alert('Erro ao propor melhoria. Verifique o console para detalhes.');
        });
    }
    });
});
// } else {
// alert('Nome do vendedor não encontrado. Por favor, selecione um vendedor nas opções.');
// }
// });
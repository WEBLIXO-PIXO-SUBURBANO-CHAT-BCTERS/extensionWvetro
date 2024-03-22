// let nomeVendedor = localStorage.getItem('pcpData-nomeVendedor')
let url = "http://127.0.0.1:5000/ext/basicData/" + nomeVendedor + '/'

fetch(url).then(response=>{
    console.log(response)
}).catch(
    resp=>console.log(resp)
)
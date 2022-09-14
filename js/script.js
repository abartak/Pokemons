var formulario = document.querySelector('form')

formulario.addEventListener('submit', function (event) {

  //Bloqueia o refresh da pagina
  event.preventDefault()
  //Url da pesquisa
  let urlForm = "https://pokeapi.co/api/v2/pokemon/";

  //valor do inputName
  let name = document.getElementById('name')

  //concatena a url com o valor do inputName
  urlForm = urlForm + this.name.value;

  //Transforma em minusculo
  urlForm = urlForm.toLowerCase();


  //ID Content
  let resposta = document.getElementById('content')

  //ID imgPokemon
  let imagem = document.getElementById('imgPokemon')

  //Resposta em HTML
  let html = ""

  //Faz a requisição
  fetch(urlForm)
    .then(resposta => resposta.json())
    .then(function (data) {
      console.log(data)
      html = 'Nome: ' + maiuscula(data.name) + '<br>'
      html = html + 'Tipo: ' + maiuscula(data.types[0].type.name) + '<br>' + "Peso: " + data.weight + "kg"
      resposta.innerHTML = html

      imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"

    }).catch(function (err) {
      if (err == 'SyntaxError: Unexpected token N in JSON at position 0') {
        html = "Pokemon não encontrado 😥"
      }else{
        html = "Erro: " + err
      }
      resposta.innerHTML = html
    })
})

function maiuscula(val) {
  return val[0].toUpperCase() + val.substr(1)
}
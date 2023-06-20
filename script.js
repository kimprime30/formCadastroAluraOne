async function buscaEndereco(cep) {
  let mensagemErro = document.getElementById("erro")
  mensagemErro.innerHTML = ""
  try {
    let consultarCep = await fetch(`https://viacep.com.br/ws//${cep}/json/`);
    let consultarCepConvertida = await consultarCep.json();
    if (consultarCepConvertida.erro) {
      throw Error("CEP inexistente!");
    }

    let cidade = document.getElementById('cidade')
    let logradouro = document.getElementById('endereco')
    let estado = document.getElementById('estado')
    let bairro = document.getElementById("bairro");

    cidade.value = consultarCepConvertida.localidade
    logradouro.value = consultarCepConvertida.logradouro
    estado.value = consultarCepConvertida.uf
    bairro.value = consultarCepConvertida.bairro
    console.log(consultarCepConvertida);
    return consultarCepConvertida
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
    console.log(erro);
  }
}

let cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))
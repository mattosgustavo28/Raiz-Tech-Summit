// Busca endereço na API ViaCEP quando o usuário sai do campo CEP
const cepInput = document.getElementById('cep');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');
const cepStatus = document.getElementById('cepStatus');

cepInput.addEventListener('blur', async () => {
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length !== 8) {
    cepStatus.textContent = '';
    return;
  }

  cepStatus.textContent = 'Buscando endereço...';

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      cepStatus.textContent = 'CEP não encontrado.';
      cidadeInput.value = '';
      estadoInput.value = '';
      return;
    }

    cidadeInput.value = dados.localidade;
    estadoInput.value = dados.uf;
    cepStatus.textContent = 'Endereço encontrado!';
  } catch (erro) {
    cepStatus.textContent = 'Erro ao buscar o CEP.';
  }
});

// Ação do botão de envio: mostra mensagem de agradecimento
const form = document.getElementById('formInscricao');
const agradecimento = document.getElementById('agradecimento');
const nomeConfirmado = document.getElementById('nomeConfirmado');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome').value;
  nomeConfirmado.textContent = nome;

  form.hidden = true;
  agradecimento.hidden = false;
});

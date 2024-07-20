// Lista de números já sorteados para não gerar repetição
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;



// Parametros para a função e ao ser chamada, ela pede esses atriutos
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rat:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

}


// Funções descritivas para ações do programa
function verificarChute() {
    let chute = document.querySelector('input').value; // Pega o valor
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');

        // Verifica se house mais de uma tentativa, caso não, retorna apenas 'tentativa' para seguir com o correto na lingua
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        // Passa a mensagem por parâmetro, que por sua vez, recebe variaveis para exibir na tela
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto ) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;

        // Limpa campo do chute
        limpaCampo();
    }
}

// Gera um valor aleatório e retorna ele com o 'return' para quem chamou ela
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    // Verifica se o valor gerado já existe ou não na lista (exclusivo JS)
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }

}

// Torna o campo de input vazio após uma tentativa
function limpaCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Reseta os campos do jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limpaCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

exibirMensagemInicial();
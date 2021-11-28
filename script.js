const balls = document.getElementsByClassName('ball');
const button = document.getElementById('reset-game');
const rgb = document.getElementById('rgb-color');
const allBalls = document.getElementById('cores');
const answer = document.getElementById('answer');
const placar = document.getElementById('score');
let activePlay = true;

let cores;
let corEscolhida;

// Função para aplicar cores de forma randômica no circulos.

function colorBalls() {
  cores = [];
  for (let i = 0; i < balls.length; i += 1) {
    const r = String(Math.trunc(Math.random() * 256));
    const g = String(Math.trunc(Math.random() * 256));
    const b = String(Math.trunc(Math.random() * 256));
    const cor = (`${'rgb('}${r}, ${g}, ${b})`);
    cores.push(cor);
    balls[i].style.backgroundColor = cor;
  }
}

// Função para definir de forma randômica uma única cor para ser adivinhada em cada rodada.

function secretColor() {
  const playDice = Math.trunc(Math.random() * 6);
  corEscolhida = cores.splice(playDice, 1);
  const onlyNumbers = corEscolhida[0].slice(3);
  rgb.innerText = onlyNumbers;
}

// Função para reiniciar o jogo sem alterar o placar.

function playAgain() {
  answer.innerText = 'Escolha uma cor';
  activePlay = true;
  colorBalls();
  secretColor();
}

// Função para verificar se o usuário acertou ou errou a sua escolha.

function result(event) {
  const ballClicked = event.target;

  if (ballClicked.style.backgroundColor === corEscolhida[0] && activePlay === true) {
    placar.innerText = parseInt(placar.innerText, 10) + 3;
    answer.innerText = 'Acertou!';
    activePlay = false;
  } else if (activePlay === true) {
    answer.innerText = 'Errou! Tente novamente!';
    placar.innerText = parseInt(placar.innerText, 10) - 1;
    activePlay = false;
  }
}

colorBalls();
secretColor();
button.addEventListener('click', playAgain);
allBalls.addEventListener('click', result);

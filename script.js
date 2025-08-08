// Lista de links de imagens que você enviou
const images = [
  'https://upload.wikimedia.org/wikipedia/commons/b/bb/Cherry_Stella444.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuf8X67AZyLwPlIdj9a_qKo7SRVOQGy5gz-Q&s',
  'https://cdn.prod-careers.stackoverflow.com/media/original/2023/07/13/0d9b22b2-0b36-420f-8cda-8b6f0dd2791d.png',
  'https://images.tcdn.com.br/img/imgprod/607601/001_12_5_2020_15_07_37_0_20201231154940.jpg',
  'https://images.tcdn.com.br/img/imgprod/607601/001_12_5_2020_15_07_37_0_20201231154940.jpg', // repeti a mesma imagem
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuf8X67AZyLwPlIdj9a_qKo7SRVOQGy5gz-Q&s'
];

// Criar a lista de pares (duas vezes cada imagem)
let cardImages = [...images, ...images];

// Função para embaralhar a lista (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Embaralhar as cartas
shuffle(cardImages);

// Agora, 'cardImages' está com todas as imagens em pares, embaralhadas
console.log(cardImages);

// Variáveis do jogo
const gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Criar as cartas
function createCards() {
    shuffle(cardImages);
    cardImages.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.image = imgSrc;

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';

        // Você pode colocar uma imagem ou texto na parte de trás da carta
        // Aqui vamos deixar uma cor sólida e um "?" para indicar que é uma carta
        cardBack.textContent = '?';

        // Opcional: colocar uma imagem na frente
        const img = document.createElement('img');
        img.src = imgSrc; // coloque suas imagens na pasta e atualize o caminho
        img.alt = 'Carta';
        cardFront.appendChild(img);

        // Montar a carta
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // Evento de clique
        card.addEventListener('click', flipCard);

        // Adicionar ao tabuleiro
        gameBoard.appendChild(card);
    });
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Verificar se as cartas são iguais
function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === images.length) {
            alert('Parabéns! Você ganhou!');
        }
    } else {
        unflipCards();
    }
}

// Desabilitar as cartas que combinaram
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Reverter as cartas que não combinaram
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Resetar variáveis do jogo
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Inicializar o jogo
createCards();

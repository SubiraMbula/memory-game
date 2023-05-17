// Array of cards (replace with your desired content)
const cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];

// Array to store flipped cards
let flippedCards = [];

// Function to create the game board
function createGameBoard() {
  const gameBoard = document.getElementById('game-board');

  // Shuffle the cards
  const shuffledCards = shuffle(cards.concat(cards));

  // Create a card element for each card
  shuffledCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = card;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);

    cardElement.addEventListener('click', () => flipCard(cardElement));

    gameBoard.appendChild(cardElement);
  });
}

// Function to flip a card
function flipCard(card) {
  if (
    !card.classList.contains('flipped') &&
    !card.classList.contains('matched') &&
    flippedCards.length < 2
  ) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      incrementMoves();
      checkForMatch();
    }
  }
}

// Function to increment the moves counter
function incrementMoves() {
  const movesElement = document.getElementById('moves');
  const moves = parseInt(movesElement.textContent);
  movesElement.textContent = moves + 1;
}

// Function to check if the flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.textContent === card2.textContent) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];

    updateMatchedPairs();

    if (document.querySelectorAll('.matched').length === cards.length * 2) {
      setTimeout(() => {
        alert('Congratulations! You won the game!');
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Function to update the matched pairs counter
function updateMatchedPairs() {
  const matchedPairsElement = document.getElementById('matched-pairs');
  const matchedPairs = parseInt(matchedPairsElement.textContent);
  matchedPairsElement.textContent = matchedPairs + 1;
}

// Function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Reset the game
function resetGame() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  const movesElement = document.getElementById('moves');
  movesElement.textContent = '0';

  const matchedPairsElement = document.getElementById('matched-pairs');
  matchedPairsElement.textContent = '0';

  flippedCards = [];

  createGameBoard();
}

// Event listener for the reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

// Initialize the game
createGameBoard();

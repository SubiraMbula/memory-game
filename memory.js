// Array to store the cards
const cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐮', '🐷'];

// Array to store flipped cards
let flippedCards = [];

// Variables to keep track of moves and matched pairs
let moves = 0;
let matchedPairs = 0;

// Function to create the game board
function createGameBoard() {
  const gameBoard = document.getElementById('game-board');

  // Shuffle the cards
  const shuffledCards = shuffle(cards.concat(cards));

  // Create a card element for each card
  shuffledCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = card;
    cardElement.addEventListener('click', () => flipCard(cardElement));
    gameBoard.appendChild(cardElement);
  });
}

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to flip a card
function flipCard(card) {
    if (!card.classList.contains('flipped') && !card.classList.contains('matched')) {
      card.classList.add('flipped');
      flippedCards.push(card);
  
      if (flippedCards.length === 2) {
        incrementMoves();
        checkForMatch();
      }
    }
  }

// Function to increment the moves count and update the UI
function incrementMoves() {
  moves++;
  const movesElement = document.getElementById('moves');
  movesElement.textContent = moves;
}

// Function to check if flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.innerHTML === card2.innerHTML) {
    // Match found
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];

    incrementMatchedPairs();
    checkWinCondition();
  } else {
    // Not a match, flip the cards back after a short delay
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Function to increment the matched pairs count and update the UI
function incrementMatchedPairs() {
  matchedPairs++;
  const matchedPairsElement = document.getElementById('matched-pairs');
  matchedPairsElement.textContent = matchedPairs;
}

// Function to check if all cards are matched
function checkWinCondition() {
  const matchedCards = document.querySelectorAll('.matched');
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert('Congratulations! You have won the game!');
      resetGame();
    }, 500);
  }
}

// Function to reset the game
function resetGame() {
  const gameBoard = document.getElementById('game-board');
  const movesElement = document.getElementById('moves');
  const matchedPairsElement = document.getElementById('matched-pairs');

  gameBoard.innerHTML = '';
  flippedCards = [];
  moves = 0;
  matchedPairs = 0;
  movesElement.textContent = moves;
  matchedPairsElement.textContent = matchedPairs;

  createGameBoard();
}

// Event listener for the reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

// Initialize the game
createGameBoard();

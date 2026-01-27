// Deck of cards (simplified - one of each rank)
const deck = [
    { rank: 2, suit: '♠️', value: 2 },
    { rank: 3, suit: '♠️', value: 3 },
    { rank: 4, suit: '♠️', value: 4 },
    { rank: 5, suit: '♠️', value: 5 },
    { rank: 6, suit: '♠️', value: 6 },
    { rank: 7, suit: '♠️', value: 7 },
    { rank: 8, suit: '♠️', value: 8 },
    { rank: 9, suit: '♠️', value: 9 },
    { rank: 10, suit: '♠️', value: 10 },
    { rank: 'J', suit: '♠️', value: 11 },
    { rank: 'Q', suit: '♠️', value: 12 },
    { rank: 'K', suit: '♠️', value: 13 },
    { rank: 'A', suit: '♠️', value: 14 }
];

let computerCard, userCard, userCardFlipped = false;

// Get random card
function getRandomCard() {
    return deck[Math.floor(Math.random() * deck.length)];
}

// Initialize game
function initGame() {
    computerCard = getRandomCard();
    userCard = getRandomCard();

    document.getElementById('computerCard').textContent = '🎴';
    document.getElementById('computerCard').className = 'card back';
    document.getElementById('userCard').textContent = '🎴';
    document.getElementById('userCard').className = 'card back';
    document.getElementById('result').textContent = '';
    document.getElementById('resetBtn').style.display = 'none';

    userCardFlipped = false;
    document.getElementById('userCard').onclick = flipUserCard;
}

// Flip user card and reveal both
function flipUserCard() {
    if (userCardFlipped) return;

    document.getElementById('userCard').textContent = userCard.rank + userCard.suit;
    document.getElementById('computerCard').textContent = computerCard.rank + computerCard.suit;

    userCardFlipped = true;
    determineWinner();
}

// Determine winner
function determineWinner() {
    const resultElement = document.getElementById('result');

    if (userCard.value > computerCard.value) {
        resultElement.textContent = 'You Win!';
    } else if (userCard.value < computerCard.value) {
        resultElement.textContent = 'Computer Wins!';
    } else {
        resultElement.textContent = "It's a Tie!";
    }

    document.getElementById('resetBtn').style.display = 'inline-block';
}

// Setup reset button and start game
document.getElementById('resetBtn').onclick = initGame;
initGame();

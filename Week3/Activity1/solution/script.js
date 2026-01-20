
const box = document.getElementById('box');
const scoreEl = document.getElementById('score');
let score = 0;

// Function declaration: increaseScore
function increaseScore() {
  score += 1;
  scoreEl.textContent = String(score);
}

// Function declaration: moveBox
function moveBox() {
  const maxX = Math.max(0, window.innerWidth - 100);
  const maxY = Math.max(0, window.innerHeight - 140);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  box.style.left = x + 'px';
  box.style.top = y + 'px';
}

// Function expression: handleClick
const handleClick = function () {
  increaseScore();
  moveBox();
  // optional visual feedback
  box.style.background = `hsl(${Math.floor(Math.random()*360)}, 70%, 55%)`;
};

box.addEventListener('click', handleClick);

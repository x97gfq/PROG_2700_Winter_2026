//declare variables (get references to box, score)
let scoreEl = document.getElementById("score");
let boxEl = document.getElementById("box");

//set initial score to 0
let score = 0;

// Function declaration: increaseScore
function increaseScore() {
    //console.log("increaseScore called");
    score++;
    scoreEl.textContent = score;
}

// Function declaration: moveBox
function moveBox() {
    //console.log("moveBox called")
    const maxX = Math.max(0, window.innerWidth-100);
    const maxY = Math.max(0, window.innerHeight-100)
    
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    boxEl.style.left = x + 'px';
    boxEl.style.top = y + 'px';
}

function changeBoxColour() {
    //console.log("changeBoxColour called");
    boxEl.style.background = `hsl(${Math.floor(Math.random()*360)}, 70%, 55%)`;
}

// Function expression: handleClick
const handleClick = function () {
    //console.log("handleClick==----------------------------------")
    increaseScore();
    changeBoxColour();
    moveBox(); 
};

box.addEventListener('click', handleClick);

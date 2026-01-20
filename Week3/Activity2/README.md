# Timed Click Counter Arena — Activity 2

An expanded version of Activity 1 that adds a **countdown timer** to challenge players to get the highest score possible before time runs out!

## Learning Targets
- Practice **function declarations** and **function expressions**
- Use **setTimeout** to delay game start
- Use **setInterval** to update a countdown timer
- Use **clearInterval** to stop the timer when game ends
- Manage game state (not started, playing, game over)

## Files
- `index.html` — HTML with timer display and game states
- `style.css` — enhanced styles with gradient background
- `script.js` — game logic with timer functionality

## How to Play
1. Click the "Start Game" button
2. The box will appear and you have 30 seconds to click it as many times as possible
3. Each click increases your score and moves the box to a random position
4. Try to get the highest score before time runs out!

## Run
Just open `index.html` in your browser (or use VS Code Live Server).

## Steps to Complete

### Part 1: Variables and Basic Functions
1. Get references to all DOM elements:
   - `box`, `scoreEl`, `timerEl`, `startBtn`, `restartBtn`, `gameOver`, `finalScoreEl`
2. Create variables for:
   - `score` (number, starts at 0)
   - `timeLeft` (number, starts at 30)
   - `timerInterval` (will hold the interval ID)

3. Write `increaseScore()` function declaration:
   - Increment score by 1
   - Update the score display

4. Write `moveBox()` function declaration:
   - Calculate random x and y positions within window bounds
   - Update box position
   - Optional: change box color with HSL

### Part 2: Timer Functions
5. Write `updateTimer()` function declaration:
   - Decrease `timeLeft` by 1
   - Update timer display
   - If time reaches 0, call `endGame()`

6. Write `startGame()` function declaration:
   - Reset score to 0
   - Reset timeLeft to 30
   - Hide start button and game over screen
   - Show the box
   - Use **setInterval** to call `updateTimer()` every 1000ms (1 second)
   - Store interval ID in `timerInterval`

7. Write `endGame()` function declaration:
   - Use **clearInterval** to stop the timer
   - Hide the box
   - Update final score display
   - Show game over screen

### Part 3: Event Handlers
8. Complete the `handleClick` function expression:
   - Call `increaseScore()`
   - Call `moveBox()`

9. Add event listeners:
   - `startBtn` click → call `startGame`
   - `restartBtn` click → call `startGame`
   - `box` click → call `handleClick`

## Stretch Ideas
- Change the game duration (20 seconds, 60 seconds, etc.)
- Make the box get smaller as time runs out
- Add sound effects for clicks and game over
- Add difficulty levels (box moves faster or is smaller)
- Keep track of high score using localStorage
- Add a countdown "3... 2... 1... GO!" before starting (using **setTimeout**)

## Key Concepts
- **setInterval(function, milliseconds)**: Calls a function repeatedly at specified intervals
- **clearInterval(intervalId)**: Stops an interval from running
- **setTimeout(function, milliseconds)**: Calls a function once after a delay
- Function declarations vs function expressions (review from Activity 1)

## Notes for Instructors
- This builds directly on Activity 1's concepts
- Focus on the timer trio: setTimeout, setInterval, clearInterval
- Emphasize storing the interval ID so you can clear it later
- Common mistake: forgetting to clear the interval, causing multiple timers
- Stretch idea: add a 3-second countdown using setTimeout before the game starts

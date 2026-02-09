# Activity 2: jQuery Pokemon Roulette

## Goal
Create a small web page that fetches a random Pokemon from our API when a button is clicked.

## Instructions
1.  Open `index.html` in your browser.
2.  Open `script.js` in VS Code.
3.  **Your Task**:
    -   Use `$(document).ready()` to wait for the page to load.
    -   Add a click listener: `$('#get-random-btn').click(...)`.
    -   **Step A**: Generate a random number between 1 and 5 (we know we have 5 pokemon in the DB).
    -   **Step B**: Fetch the specific Pokemon using that ID (`GET /pokemon/:id`).
    -   Display the details in the `#result-area`.

## Hints
-   Random ID (1-5): `Math.floor(Math.random() * 5) + 1`
-   Request: `$.get('http://localhost:3000/pokemon/' + randomId, function(data) { ... })`

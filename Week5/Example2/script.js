// Sample game data (JavaScript object)
const game = {
    title: "Space Adventure",
    price: 49.99,
    platform: "PC",
    developer: {
        name: "Indie Studios",
        country: "Canada"
    },
    tags: ["Action", "Adventure", "Sci-Fi"]
};

// Display initial data
document.getElementById('gameData').textContent = JSON.stringify(game, null, 2);

// Dot notation example
document.getElementById('dotBtn').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.innerHTML = `
<strong>✓ Using Dot Notation:</strong>
game.title = "${game.title}"
game.developer.name = "${game.developer.name}"
game.tags[0] = "${game.tags[0]}"
    `;
});

// Bracket notation example
document.getElementById('bracketBtn').addEventListener('click', () => {
    const output = document.getElementById('output');
    const prop = "platform"; // Dynamic property name
    output.innerHTML = `
<strong>✓ Using Bracket Notation:</strong>
game["title"] = "${game["title"]}"
game["developer"]["country"] = "${game["developer"]["country"]}"

When property name is in a variable:
const prop = "${prop}";
game[prop] = "${game[prop]}"
    `;
});

// Update data example
document.getElementById('updateBtn').addEventListener('click', () => {
    game.price = 39.99; // Modify the object
    document.getElementById('gameData').textContent = JSON.stringify(game, null, 2);
    document.getElementById('output').innerHTML = `<strong>✓ Price updated to $${game.price}</strong>`;
});

# Week 4: JavaScript Literals and Array Methods

## What is a JavaScript Literal?

A **JavaScript literal** is a fixed value that you provide directly in your code. Unlike variables that can change, literals represent concrete data values.

### Types of Literals:

- **Object Literal**: `{ name: "John", age: 25 }`
- **Array Literal**: `[1, 2, 3, 4, 5]`
- **String Literal**: `"Hello World"`
- **Number Literal**: `42` or `3.14`
- **Boolean Literal**: `true` or `false`

### Example:
```javascript
// Array of object literals
const students = [
    { name: "Alice", grade: 92 },
    { name: "Bob", grade: 85 },
    { name: "Charlie", grade: 78 }
];
```

In this example:
- The array `[]` is an **array literal**
- Each `{ name: "...", grade: ... }` is an **object literal**
- The strings and numbers inside are **string and number literals**

---

## Example 1: Array Methods Demo

**Location**: `Week4/Example1/`

### Purpose
Demonstrates essential JavaScript array methods using a product inventory.

### What You'll Learn
- `forEach()` - Execute a function for each element
- `filter()` - Create a new array with elements that pass a test
- `map()` - Transform each element into something new
- `reduce()` - Reduce an array to a single value

### Key Code
```javascript
const products = [
    { id: 1, name: "Laptop", price: 899.99, inStock: true },
    { id: 2, name: "Desk Chair", price: 149.99, inStock: true }
    // ... more products
];

// forEach - iterate over each product
products.forEach(function(product) {
    console.log(product.name);
});

// filter - get affordable products
const affordable = products.filter(function(product) {
    return product.price < 50;
});

// map - extract names
const names = products.map(function(product) {
    return product.name;
});

// reduce - calculate total
const total = products.reduce(function(sum, product) {
    return sum + product.price;
}, 0);
```

---

## Example 2: Student Cards with forEach

**Location**: `Week4/Example2/`

### Purpose
Generate Bootstrap cards dynamically using JavaScript and the `forEach()` method.

### What You'll Learn
- Creating HTML dynamically with JavaScript
- Using template literals for HTML generation
- Iterating with `forEach()`
- Working with Bootstrap components

### Key Code
```javascript
const students = [
    { name: "Emma Johnson", program: "Computer Programming", year: 2, gpa: 3.8 },
    // ... more students
];

const cardContainer = document.getElementById('studentCards');

students.forEach(function(student) {
    const cardHTML = `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-header">
                    <h5>${student.name}</h5>
                </div>
                <div class="card-body">
                    <p><strong>Program:</strong> ${student.program}</p>
                    <p><strong>Year:</strong> ${student.year}</p>
                    <p><strong>GPA:</strong> ${student.gpa}</p>
                </div>
            </div>
        </div>
    `;
    cardContainer.innerHTML += cardHTML;
});
```

---

## Example 3: Array Sort Method

**Location**: `Week4/Example3/`

### Purpose
Demonstrate how to sort arrays of objects using custom comparison functions.

### What You'll Learn
- Using the `sort()` method
- Writing comparison functions
- Sorting strings alphabetically
- Sorting numbers in descending order
- Non-destructive sorting with spread operator

### Key Code
```javascript
const students = [
    { name: "Charlie", score: 85 },
    { name: "Alice", score: 92 },
    { name: "Bob", score: 78 }
];

// Sort alphabetically by name
const sortedByName = [...students].sort(function(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});

// Sort by score (descending)
const sortedByScore = [...students].sort(function(a, b) {
    return b.score - a.score;
});
```

---

## Activity 1: High Card Game

**Location**: `Week4/Activity1/`

### Objective
Build an interactive card game where the user competes against the computer to see who draws the higher card.

### Learning Outcomes
- Work with array literals (deck of cards)
- Generate random selections from arrays
- Handle user interactions with click events
- Manipulate the DOM dynamically
- Implement game logic with conditional statements

### Features
- Click to flip your card
- Both cards reveal simultaneously
- Winner determined automatically
- Play again functionality

### Starter Code Provided
```javascript
const deck = [
    { rank: 2, suit: '♠️', value: 2 },
    { rank: 3, suit: '♠️', value: 3 },
    // ... complete the deck
];
```

### Your Tasks
1. Complete the `getRandomCard()` function
2. Implement the `initGame()` function to set up the game
3. Create the `flipUserCard()` function for user interaction
4. Write the `determineWinner()` function to compare cards

---

## Activity 2: Movie Rating System

**Location**: `Week4/Activity2/`

### Objective
Create a movie database that filters and displays movies based on ratings using array methods.

### Learning Outcomes
- Use `forEach()` to display all items
- Use `filter()` to find items meeting criteria
- Use `map()` to extract specific properties
- Build dynamic HTML interfaces

### Features
- Display all movies with ratings
- Filter highly-rated movies (4+ stars)
- Extract and display just movie titles

### Starter Code Provided
```javascript
const movies = [
    { title: "The Matrix", genre: "Sci-Fi", rating: 5 },
    { title: "Inception", genre: "Thriller", rating: 5 },
    // ... more movies
];
```

### Your Tasks
1. Use `forEach()` to display all movies
2. Use `filter()` to find movies with rating >= 4
3. Use `map()` to create an array of just titles
4. Display results in the HTML elements provided

---

## Quick Reference: Array Methods

| Method | Purpose | Returns | Mutates Original? |
|--------|---------|---------|-------------------|
| `forEach()` | Execute function for each element | `undefined` | No |
| `filter()` | Get elements that pass a test | New array | No |
| `map()` | Transform each element | New array | No |
| `reduce()` | Reduce to single value | Single value | No |
| `sort()` | Sort elements | Sorted array | **Yes** |

### Tips
- Use spread operator `[...array]` to avoid mutating when sorting
- `filter()` and `map()` always return new arrays
- `reduce()` needs an initial value (usually `0` or `[]`)
- Comparison functions for `sort()` should return -1, 0, or 1

---

## Running the Examples

1. Navigate to the example/activity folder
2. Open `index.html` in your browser
3. Open the browser console (F12) to see detailed output
4. For activities, complete the TODO sections in `script.js`

---

## Additional Resources

- [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info - Arrays](https://javascript.info/array-methods)
- [W3Schools Array Reference](https://www.w3schools.com/js/js_array_methods.asp)

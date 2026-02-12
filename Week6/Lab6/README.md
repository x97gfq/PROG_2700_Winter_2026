# Lab 6 - Random Quote Generator

## Overview
This lab demonstrates jQuery, Bootstrap, and API integration by creating a random quote generator application.

## Features
- Fetch random quotes from the Quotable API
- Store quotes in a JavaScript array
- Display quotes using Bootstrap cards
- Dismiss individual quotes
- **BONUS**: Persist quotes in local storage

## Technologies Used
- **jQuery**: DOM manipulation and AJAX requests
- **Bootstrap 5**: Responsive UI components and styling
- **Quotable API**: Random quote generation
- **Local Storage**: Data persistence

## Instructions

### Getting Started
1. Open `index.html` in a web browser
2. Click "Get Random Quote" to fetch a quote from the API
3. Each quote will be added to the display
4. Click "Dismiss" on any quote to remove it
5. Quotes persist across page refreshes (local storage)

### Key Concepts Demonstrated

#### 1. jQuery AJAX
```javascript
$.ajax({
    url: 'https://api.quotable.io/random',
    method: 'GET',
    success: function(data) { ... }
});
```

#### 2. Array Management
- Adding items: `quotes.push(quote)`
- Removing items: `quotes.filter()`
- Iterating: `quotes.forEach()`

#### 3. DOM Manipulation with jQuery
- Selecting elements: `$('#elementId')`
- Event handling: `.on('click', function)`
- Dynamic content: `.append()`, `.empty()`

#### 4. Bootstrap Components
- Cards for quote display
- Buttons with styling classes
- Responsive grid layout

#### 5. Local Storage (Bonus)
- Save: `localStorage.setItem()`
- Load: `localStorage.getItem()`
- JSON serialization: `JSON.stringify()` / `JSON.parse()`

## Expected Time
30 minutes

## Learning Outcomes
- Make AJAX requests with jQuery
- Manipulate arrays in JavaScript
- Dynamically render content to the DOM
- Handle user events
- Persist data with local storage

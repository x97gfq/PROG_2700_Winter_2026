# PROG 2700 — Client-Side Programming
# Lab 04 — Array Methods + Error Handling

**Week 4** | **Duration**: ~60 minutes (in-class Friday)

## Objectives

- Use `map()`, `filter()`, and `reduce()` array methods
- Add `try/catch` for error handling and validation
- Improve console diagnostics
- Build a filterable contact list application

## Prerequisites

- Understanding of JavaScript arrays and objects
- Basic DOM manipulation knowledge
- Familiarity with array methods from Week 4 examples

## Setup

1. Open the `Lab` folder in VS Code
2. Open `index.html` in your browser
3. Open the browser DevTools console (F12)

## Application Overview

You'll be working with a contact management application that displays a list of people with their information. Your task is to refactor the code to use modern array methods, add filtering capabilities, compute statistics, and implement proper error handling.

## Steps

### Step 1: Refactor List Rendering with `map()`
Currently, the contacts are rendered using a traditional loop. Refactor the `renderContacts()` function to use the `map()` method to produce DOM nodes.

**Hint**: Use `map()` to transform the contacts array into an array of HTML strings, then join and set `innerHTML`.

### Step 2: Add Filter UI
Implement a search filter that allows users to filter contacts by name. Use the `filter()` method to create a filtered array before rendering.

**Requirements**:
- Filter should be case-insensitive
- Filter should search in the name field
- Update results as user types

### Step 3: Use `reduce()` to Compute Statistics
Add a statistics display that shows:
- Total number of contacts
- Number of unique email domains (e.g., `gmail.com`, `yahoo.com`)

Use the `reduce()` method to compute the unique email domains.

### Step 4: Add Error Handling with `try/catch`
Wrap risky operations in `try/catch` blocks:
- JSON parsing (if loading from external source)
- Array operations that might fail
- DOM manipulation

Log meaningful error messages to the console.

### Step 5: Add Input Validation
Implement validation for adding new contacts:
- Name must not be empty
- Email must be in valid format
- Phone must be in valid format (optional)

Show toast-style messages for validation errors and success.

## Deliverables (submit to Brightspace)

Submit a ZIP file containing:
1. `index.html`
2. `script.js` (refactored with all requirements)
3. `style.css`
4. Screenshot showing the working application with filters and stats

## Completion Checklist

| Item | Done |
|------|------|
| `map()`, `filter()`, `reduce()` used | [ ] |
| Validation paths exist | [ ] |
| `try/catch` present | [ ] |
| No uncaught errors in console | [ ] |
| Filter UI works correctly | [ ] |
| Stats display correctly | [ ] |

## Stretch Goals (if time remains)

- [ ] Debounce the filter input (wait 300ms after typing stops)
- [ ] Add sorting options (by name, email)
- [ ] Add ability to delete contacts
- [ ] Store contacts in `localStorage`
- [ ] Add dark mode toggle

## Testing Your Work

1. Open the browser console - there should be no errors
2. Test the filter with various search terms
3. Verify statistics update when contacts change
4. Try to add invalid contacts and verify validation messages appear
5. Add valid contacts and verify success message appears

## Tips

- Use `console.log()` liberally to debug
- Test edge cases (empty arrays, invalid inputs)
- Chrome DevTools can help identify errors
- The `Array.prototype` methods are chainable!

---

**Note**: This lab is designed for approximately 1 hour. Focus on completing the core requirements before attempting stretch goals.

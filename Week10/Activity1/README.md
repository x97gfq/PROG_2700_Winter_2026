# Activity 1 — ES6+ Modernization

## Overview

You have a working weather data processor written in old-style ES5 JavaScript. It uses `var`, `for` loops, string concatenation, and verbose function expressions.

**Your job:** Rewrite `starter/app.js` using modern ES6+ syntax without changing what the code does or outputs.

## Why This Matters in the Real World

This is not a contrived exercise. Most working developers encounter exactly this situation:

- **Legacy codebases** — Companies that have been around for 10+ years often have JavaScript written before 2015. Refactoring to modern syntax is one of the most common junior dev tasks.
- **Readability** — The ES6+ version is noticeably shorter and easier to read. Code is read far more often than it is written.
- **React compatibility** — React is written entirely in ES6+. Understanding the modern patterns is a prerequisite for working with it.
- **Code reviews** — Writing `var` or a `for` loop where `.filter()` would work will get flagged in a code review at any modern company.

## Prerequisites

Open `starter/index.html` in your browser. You should see weather summaries rendered on the page. Use this as your reference — the output must look the same after your rewrite.

---

## Your Tasks

### TODO 1 — Variables

Replace all `var` declarations with `const` (for values that don't change) or `let` (for values that get reassigned).

**Real-world rule:** Start with `const` everywhere. Change to `let` only if the linter complains or you know it needs to be reassigned. Never use `var`.

```js
// Before
var weatherData = [...];

// After
const weatherData = [...];   // array reference never changes
```

### TODO 2 — Arrow Functions

Convert all `function` declarations and `function` expressions to arrow functions where appropriate.

Note: short single-expression arrow functions can omit `return` and braces.

```js
// Before
function add(a, b) { return a + b; }

// After (full)
const add = (a, b) => { return a + b; };

// After (concise — expression body, implicit return)
const add = (a, b) => a + b;
```

**Real-world context:** Every React component, every event handler, and every `.map()` / `.filter()` callback you write in your career will use arrow function syntax.

### TODO 3 — Template Literals

Replace all string concatenation with template literals:

```js
// Before
return city + ': ' + temp + '°C, ' + condition;

// After
return `${city}: ${temp}°C, ${condition}`;
```

**Real-world context:** Template literals are standard in API URL construction, notification messages, and any dynamic HTML generation:
```js
const url = `${API_BASE}/users/${userId}/posts?page=${page}`;
```

### TODO 4 — Destructuring

In `buildSummary`, destructure the object parameter directly instead of pulling out properties manually:

```js
// Before
function buildSummary(cityObj) {
    var city      = cityObj.city;
    var temp      = cityObj.temp;
    var condition = cityObj.condition;
    var wind      = cityObj.wind;
    ...
}

// After — extract only what you need, right in the signature
const buildSummary = ({ city, temp, condition, wind }) => ...
```

**Real-world context:** Every React component destructures its props this way:
```js
function WeatherCard({ city, temp, condition }) { ... }
```

### TODO 5 — Spread & Array Methods

- Replace `getCitiesByCondition`'s `for` loop with `.filter()` + `.map()`
- Replace `addFeelsLike`'s `for` loop with `.map()` using **spread** to copy each object:

```js
data.map(city => ({
    ...city,                                           // copy all existing fields
    feelsLike: Math.round(city.temp - city.wind / 10)  // add the new one
}))
```

- Replace `getHottestCity`'s loop with `.reduce()`

**Real-world context:** The spread pattern for adding/updating a field is how React state updates work:
```js
// Update just the email without losing the rest of the user object
setUser(prev => ({ ...prev, email: newEmail }));
```

### TODO 6 — Template Literal in render()

Rewrite the `render()` function's `innerHTML` assignment using a single template literal instead of string concatenation.

**Real-world context:** This pattern — building an HTML string with nested `.map()` calls inside a template literal — is exactly how React's JSX works under the hood.

---

## Solution

The complete solution is in `solution/`. Try it yourself first!

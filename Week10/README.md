# Week 10: Advanced Vanilla JS & Small Libraries

## Overview

This is the final vanilla JavaScript week before we move into React. We wrap up with modern ES6+ syntax, clean async patterns, and three lightweight libraries that appear constantly in real-world projects.

Everything covered this week is used **directly** in React — the same syntax, the same patterns, the same libraries. This week is the bridge.

---

## Real-World Context

| Topic | Where you'll see it |
|-------|---------------------|
| ES6+ syntax (`const`, destructuring, spread, `?.`, `??`) | Every React component, Redux reducer, and modern JS codebase |
| Template literals | API URL construction, dynamic HTML, notification messages |
| Arrow functions + array methods | React list rendering, data filtering/sorting/aggregating |
| Promises + `async/await` | All data fetching in React (`useEffect`), background jobs, form submissions |
| `Promise.all()` | Dashboard pages loading multiple data sources simultaneously |
| Axios | The most popular HTTP client in React apps — same `axios.create()` + interceptors pattern |
| Lodash | Analytics dashboards, admin panels, any app that transforms arrays of objects |
| Day.js | Social feeds ("3 hours ago"), booking apps, invoice dates, overdue task detection |

---

## Topics Covered

### Session 1
- ES6+ Features (arrow functions, destructuring, spread/rest, optional chaining, nullish coalescing)
- Promises: `.then()`, `.catch()`, `.all()`, `.allSettled()`, `.race()`
- Async/Await with `try/catch/finally`
- Axios for HTTP requests

### Session 2
- Lodash for data transformation
- Day.js for date formatting
- Exploring third-party library documentation

---

## Libraries (CDN)

| Library | CDN | npm |
|---------|-----|-----|
| Axios   | `https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js` | `npm install axios` |
| Lodash  | `https://cdn.jsdelivr.net/npm/lodash/lodash.min.js` | `npm install lodash` |
| Day.js  | `https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js` | `npm install dayjs` |

---

## Examples

### [Example 1: ES6+ Features](Example1/)
A visual showcase of modern JavaScript syntax: destructuring, spread/rest, optional chaining, nullish coalescing, template literals, and functional array methods — with real-world usage examples for each.

### [Example 2: Promises & Promise.all()](Example2/)
A deep-dive into the Promise object: states, `.then()` chaining, `Promise.all()`, `Promise.allSettled()`, and `Promise.race()` — with interactive live demos for each concept.

### [Example 3: Axios](Example3/)
Using Axios instead of `fetch` — shared instances, request/response interceptors (logging, auth tokens), concurrent requests, and structured error handling.

### [Example 4: Lodash + Day.js](Example4/)
Transforming a dataset with Lodash (`_.orderBy`, `_.groupBy`, `_.meanBy`) and formatting dates with Day.js (`.format()`, `.fromNow()`, `.diff()`).

---

## Activities

### [Activity 1: ES6+ Modernization](Activity1/)
Refactor old-style ES5 code into clean, modern ES6+ JavaScript without changing what it does. The same task developers do when updating legacy codebases.

### [Activity 2: Axios + Async/Await](Activity2/)
Fetch book data from the real Open Library API using Axios and render the results as cards. The same fetch → render pattern used in every content or search feature on the web.

### [Activity 3: Lodash + Day.js Pipeline](Activity3/)
Process a dataset of job postings — group by category, sort within each group, and format dates. The same pipeline used in job boards, admin panels, and analytics dashboards.

---

## Lab 10: Hacker News Reader

**Location:** `Week10/Lab10/`

Build a live Hacker News front-page reader using Axios (fetch), Day.js (relative timestamps), and Lodash (sort + stats). A simplified but structurally identical version of Reddit, Product Hunt, or HN itself.

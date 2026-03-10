# Activity 2 — Axios + Async/Await: Book Search

## Overview

In Example 3 you saw Axios used with a fake API. Now you will use it with a **real, live public API** to fetch and display a list of programming books.

**Your job:** Complete `starter/app.js` so it fetches books from the Open Library API and renders them as cards.

## Why This Matters in the Real World

The pattern you build here — **button click → show loading → fetch with Axios → render results → handle errors** — is the exact same data-fetching pattern used in:

- Product search on e-commerce sites (Amazon, Shopify storefronts)
- Movie/TV search on streaming apps (Netflix, Prime Video)
- Job search on career platforms (LinkedIn, Indeed)
- Article search on content platforms (Medium, Dev.to)

The only difference between this activity and a production app is the source of the data. The code structure is identical.

---

## The API

```
https://openlibrary.org/search.json?q=javascript&fields=title,author_name,first_publish_year,number_of_pages_median&limit=10
```

This is a real, freely accessible API provided by the Internet Archive's [Open Library](https://openlibrary.org) project. It returns an object with a `docs` array. Each book looks like:

```json
{
  "title": "JavaScript: The Good Parts",
  "author_name": ["Douglas Crockford"],
  "first_publish_year": 2008,
  "number_of_pages_median": 172
}
```

> Note: `author_name` is an **array** (a book can have multiple authors).
> Note: `number_of_pages_median` may be `undefined` for some books — handle with `??`.

---

## Prerequisites

Open `starter/index.html` in your browser. You should see the page title and a "Load Books" button. Nothing loads yet — that is your job.

---

## Your Tasks

### TODO 1 — Fetch with Axios

Inside `loadBooks()`:

1. Show a loading message (`status.textContent = 'Loading…'`)
2. Disable the button so it can't be clicked twice (`btnLoad.disabled = true`)
3. Call `axios.get(API)` with `await`
4. The parsed data is at `response.data` — the books are in `response.data.docs`
5. `console.log(response.data)` first — inspect the structure in DevTools
6. Update the status with how many books were found
7. Call `renderBooks(books)` with the array
8. Wrap everything in `try/catch` — show `err.message` in `#results` on error
9. Re-enable the button in a `finally` block

**Hint — destructure the response:**
```js
const { data } = await axios.get(API);
const books = data.docs;
```

**Real-world equivalent:** This is how every "search" button works on the web. The same pattern in a job site:
```js
const { data } = await axios.get(`/api/jobs?q=${searchQuery}&location=${city}`);
renderJobListings(data.results);
```

### TODO 2 — Render the Books

Inside `renderBooks(books)`, build HTML to display each book as a card.

Each card should show:
- Title in an `<h3>`
- Authors joined with `', '` (or `'Unknown author'` if `author_name` is missing)
- First published year (or `'N/A'` — use `??`)
- Page count (or `'N/A'` — use `??`)

**Hint:** Use optional chaining + nullish coalescing to handle missing data safely:
```js
author_name?.join(', ') ?? 'Unknown author'
```

**Real-world equivalent:** This is exactly how a product card is rendered from an API response. Not every product has all fields filled in — APIs always have missing/null data in the real world:
```js
// Spotify track card — not every track has an explicit label or preview URL
`<div class="track">
    <img src="${track.album?.images?.[0]?.url ?? '/default-cover.png'}">
    <h3>${track.name}</h3>
    <p>${track.artists?.map(a => a.name).join(', ') ?? 'Unknown artist'}</p>
    <p>${track.duration_ms ? formatDuration(track.duration_ms) : 'N/A'}</p>
</div>`
```

---

## Solution

The complete solution is in `solution/`. Try it yourself first!

---

## References

- [Open Library API docs](https://openlibrary.org/developers/api)
- [Axios docs — GET requests](https://axios-http.com/docs/api_intro)
- [MDN — Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN — Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

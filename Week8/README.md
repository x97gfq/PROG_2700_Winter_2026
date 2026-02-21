# Week 8: CRUD with a REST API Frontend

## Overview

This week we connect a **vanilla JavaScript frontend** to the REST API we built in Week 6. We cover how the browser uses `fetch()` to perform full CRUD operations, how Bootstrap modals structure a clean UX, and how to think about the relationship between HTTP methods and data operations.

We also revisit the Week 6 backend to identify and fix real bugs — a practical lesson in reading code critically.

---

## Topics Covered

- The full CRUD cycle in a browser (GET, POST, PUT, DELETE)
- `fetch()` API with `async/await`
- Bootstrap 5 modals for UI interaction
- REST API conventions: routes, HTTP verbs, status codes
- Debugging a backend: why `findByIdAndUpdate()` was wrong and how it was fixed
- Swagger / OpenAPI documentation

---

## Prerequisites

- Docker Desktop installed and running
- Week 6 backend up to date (`git pull`)

---

## Starting the Backend

The frontend needs the Week 6 API running first.

```bash
cd Week6
docker-compose up --build
```

Wait for:
```
Connected to MongoDB
Server is running on port 3000
```

---

## Example 1 — CRUD Frontend

**Location:** `Week8/Example1/`

Open `index.html` directly in your browser (no server needed — just a static file).

| File | Purpose |
|------|---------|
| `index.html` | Bootstrap UI — table, edit modal, add modal |
| `app.js` | ~90 lines of vanilla JS — all CRUD operations |

**What it demonstrates:**
- Fetching all records and rendering to a table (GET)
- Clicking a row loads that record into a modal (GET by id)
- Editing fields and saving (PUT)
- Deleting a record from the modal (DELETE)
- Adding a new record via a second modal (POST)
- Every write operation refreshes the table automatically

---

## Week 6 Backend Bug Fixes

When building the Week 8 frontend, three bugs in the Week 6 backend were discovered and fixed. Pull the latest code to get these fixes.

### Bug 1 — PUT using wrong id field
`findByIdAndUpdate()` searches by MongoDB's internal `_id` (a long hex string), but our route `/pokemon/:id` uses the custom numeric `id` field. The fix uses `findOneAndUpdate({ id: parseInt(req.params.id) })`.

### Bug 2 — DELETE using wrong id field
Same problem as PUT. Fixed with `findOneAndDelete({ id: parseInt(req.params.id) })`.

### Bug 3 — POST not assigning a numeric id
The Pokemon schema requires a unique numeric `id` field, but the original POST handler never set it. The fix queries for the highest existing `id` and increments it:
```js
const last  = await Pokemon.findOne().sort({ id: -1 });
const nextId = last ? last.id + 1 : 1;
```
> In production you'd use a dedicated auto-increment counter or let MongoDB generate IDs, but this approach is simple and clear for learning.

---

## Activity 1 — Complete the CRUD Frontend

**Location:** `Week8/Activity1/`

You're given a mostly-working frontend. Read `Activity1/README.md` for full instructions.

**Your tasks:** Implement `deletePokemon()` and `addPokemon()` in `starter/app.js`.

---

## API Reference

The full Swagger docs are available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) while the backend is running.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pokemon` | Get all pokemon |
| GET | `/pokemon/:id` | Get one pokemon by id |
| POST | `/pokemon` | Create a new pokemon |
| PUT | `/pokemon/:id` | Update a pokemon |
| DELETE | `/pokemon/:id` | Delete a pokemon |

---

## Part 2: Maps, Charts & Public APIs

After the CRUD recap, the class moves into advanced API consumption:

### [Example 2: Google Maps](Example2/)
Basic integration with Google Maps using the RestCountries API to place markers for country capitals in the Americas.

### [Example 3: Chart.js](Example3/)
Using Chart.js to create a weather dashboard (Max/Min temp + Precipitation) using the keyless Open-Meteo API.

### [Example 4: Combined Dashboard](Example4/)
The "Full Pattern": One `fetch()` call to RestCountries that populates a map and a linked bar chart simultaneously.

### [Activity 2: Map & Chart Tweaks](Activity2/)
Student activity to modify the Example 4 marker colours and chart data fields.

### [Lab 8: Earthquake Mapper](Lab8/)
Guided coding lab using the USGS Global Earthquake Feed. Students implement `fetch`, markers, and charts from a blank starter.

### [Assignment 4: Public API project](../Assignment4/)
Students pick their own API and build a custom Map/Chart dashboard.

### Presentation Slides
- [Part 1: CRUD & Modals](slides.pptx)
- [Part 2: Visualising API Data](slides_part2.pptx)


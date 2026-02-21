# Activity 1 — Complete the CRUD Frontend

## Objective

You have been given a working Pokemon Manager frontend that connects to the Week 6 Docker API. The **GET** and **PUT** functions are already implemented. Your job is to implement the two missing functions.

## Prerequisites

1. Make sure you have run `git pull` to get the latest code — the Week 6 backend had some bugs that were fixed:
   - `PUT` and `DELETE` were using MongoDB's internal `_id` instead of the custom numeric `id` field → fixed using `findOneAndUpdate` / `findOneAndDelete`
   - `POST` had no auto-increment logic → fixed to assign the next available numeric `id`
2. Start the Week 6 Docker backend:
   ```bash
   cd Week6
   docker-compose up --build
   ```
3. Open `Activity1/starter/index.html` directly in your browser.

## Your Tasks

Open `starter/app.js` and find the two `TODO` comments.

### TODO 1 — `deletePokemon()`
This function is called when the user clicks the **Delete** button inside the edit modal.

- Get the pokemon's `id` from the hidden input field: `document.getElementById('edit-id').value`
- Call `fetch()` with `method: 'DELETE'` to the URL `http://localhost:3000/pokemon/{id}`
- After the request completes, hide the modal and call `loadPokemon()` to refresh the table

### TODO 2 — `addPokemon()`
This function is called when the user clicks **Add Pokemon** in the Add New modal.

- Read the values from the six `add-*` input fields (`add-name`, `add-type`, `add-hp`, `add-attack`, `add-defense`, `add-speed`)
- Build a body object with those values (convert numeric fields with `Number()`)
- Call `fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })`
- After the request completes, hide the modal and call `loadPokemon()` to refresh the table

## API Reference

| Method | URL | Description |
|--------|-----|-------------|
| GET | `http://localhost:3000/pokemon` | Get all pokemon |
| GET | `http://localhost:3000/pokemon/:id` | Get one pokemon by id |
| POST | `http://localhost:3000/pokemon` | Create a new pokemon |
| PUT | `http://localhost:3000/pokemon/:id` | Update a pokemon |
| DELETE | `http://localhost:3000/pokemon/:id` | Delete a pokemon |

Full API docs are available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Solution

The completed solution is in the `solution/` folder. Try not to peek until you've given it a shot!

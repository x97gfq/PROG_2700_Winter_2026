# PROG 2700 — Client-Side Programming
## Lab 05 — JSON Load, Validate & Persist

**Week 5** | **~60 minutes** (in-class Friday)

---

## 🎯 Objectives

- Fetch JSON data from PokeAPI
- Parse JSON responses
- Transform API data to application format
- Persist data to localStorage
- Rehydrate data on page load
- Manage UI state with button enable/disable logic

---

## 📋 Prerequisites

- Completed Week 4 lab
- Understanding of JSON structure
- Basic knowledge of `fetch()` API
- Familiarity with localStorage

---

## 🚀 Setup

1. Open your Week 5 Lab5 folder
2. Ensure VS Code or your editor is running
3. Open the browser DevTools console
4. Open `index.html` in Live Server

---

## 📝 Steps

### 1. Set Up Variables and Event Listeners

Create references to all three buttons:
- `loadApiBtn` - Load from API button
- `saveBtn` - Save to localStorage button
- `clearBtn` - Clear localStorage button

Create a variable to store the current Pokemon data:
- `let currentPokemon = null;`

Add event listeners for all buttons and set up `DOMContentLoaded` to call `loadFromStorage()`.

### 2. Fetch Pikachu from PokeAPI

In the `loadFromAPI()` function:
- Use `fetch()` to get Pikachu from: `https://pokeapi.co/api/v2/pokemon/25`
- Parse the JSON response with `.json()`
- Use `async/await` syntax

**Example:**
```javascript
const response = await fetch('https://pokeapi.co/api/v2/pokemon/25');
const data = await response.json();
```

### 3. Transform the API Data

Store the transformed data in the `currentPokemon` variable:

```javascript
currentPokemon = {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    hp: data.stats.find(s => s.stat.name === 'hp').base_stat
};
```

**Note:** We're NOT validating the data - we trust the PokeAPI to return valid data.

### 4. Render the Pokemon Card

Create a `renderPokemon(pokemon)` function that:
- Clears the grid: `document.getElementById('pokemonGrid').innerHTML = ''`
- Creates a card with:
  - Pokemon ID
  - Sprite image
  - Name
  - Types (as badges)
  - HP value

**Example card HTML:**
```javascript
card.innerHTML = `
    <p class="id">#${pokemon.id}</p>
    <img src="${pokemon.sprite}" alt="${pokemon.name}">
    <h3>${pokemon.name}</h3>
    <div>
        ${pokemon.types.map(type => `<span class="type">${type}</span>`).join('')}
    </div>
    <p class="hp">HP: ${pokemon.hp}</p>
`;
```

### 5. Save to localStorage

Create a `savePokemon()` function that:
- Checks if `currentPokemon` exists
- Saves to localStorage: `localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPokemon))`
- Calls `updateButtonStates()` to update the UI

### 6. Load from localStorage on Page Load

Create a `loadFromStorage()` function that:
- Gets data from localStorage: `localStorage.getItem(STORAGE_KEY)`
- Checks if data exists
- Parses the JSON string and stores in `currentPokemon`
- Renders the Pokemon if data exists
- Calls `updateButtonStates()` at the end

This function is called automatically when the page loads.

### 7. Clear localStorage

Create a `clearStorage()` function that:
- Removes data: `localStorage.removeItem(STORAGE_KEY)`
- Clears the grid
- Resets `currentPokemon` to `null`
- Calls `updateButtonStates()`

### 8. Update Button States

Create an `updateButtonStates()` function that manages button enable/disable logic:

```javascript
const hasStoredData = localStorage.getItem(STORAGE_KEY) !== null;
const hasCurrentData = currentPokemon !== null;

// Load from API: enabled when no data in localStorage
loadApiBtn.disabled = hasStoredData;

// Save: enabled when we have current data but it's not saved yet
saveBtn.disabled = !hasCurrentData || hasStoredData;

// Clear: enabled when localStorage has data
clearBtn.disabled = !hasStoredData;
```

---

## 📦 Deliverables (submit to Brightspace)

Submit a ZIP file containing:
- [ ] `index.html`
- [ ] `styles.css`
- [ ] `script.js`

---

## ✅ Completion Checklist

| Item | Done |
|------|------|
| Button references created | [ ] |
| Event listeners set up | [ ] |
| Pikachu fetched from API | [ ] |
| Data transformed correctly | [ ] |
| Pokemon card renders properly | [ ] |
| Save to localStorage works | [ ] |
| Data loaded on page load | [ ] |
| Clear function works | [ ] |
| Button states update correctly | [ ] |

---

## 🎨 Expected Behavior

### Initial State (No localStorage Data)
- ✅ "Load from API" button: **Enabled**
- ❌ "Save to localStorage" button: **Disabled**
- ❌ "Clear localStorage" button: **Disabled**
- Grid is empty

### After Clicking "Load from API"
- Pikachu appears in the grid
- ❌ "Load from API" button: **Disabled** (can't load again)
- ✅ "Save to localStorage" button: **Enabled** (can now save)
- ❌ "Clear localStorage" button: **Disabled** (nothing saved yet)

### After Clicking "Save to localStorage"
- Data saved to localStorage
- ❌ "Load from API" button: **Disabled** (data exists)
- ❌ "Save to localStorage" button: **Disabled** (already saved)
- ✅ "Clear localStorage" button: **Enabled** (can now clear)

### After Page Refresh (With Saved Data)
- Pikachu appears automatically from localStorage
- ❌ "Load from API" button: **Disabled** (data exists)
- ❌ "Save to localStorage" button: **Disabled** (already saved)
- ✅ "Clear localStorage" button: **Enabled** (can clear)

### After Clicking "Clear localStorage"
- Grid clears
- ✅ "Load from API" button: **Enabled** (back to initial state)
- ❌ "Save to localStorage" button: **Disabled**
- ❌ "Clear localStorage" button: **Disabled**

---

## 🧪 Testing Your Code

1. **Test Initial Load:**
   - Open page in browser
   - Verify only "Load from API" is enabled
   - Grid should be empty

2. **Test API Loading:**
   - Click "Load from API"
   - Pikachu should appear
   - "Save to localStorage" should become enabled
   - "Load from API" should become disabled

3. **Test Save:**
   - Click "Save to localStorage"
   - Check DevTools → Application → Local Storage
   - "Clear localStorage" should become enabled
   - "Save to localStorage" should become disabled

4. **Test Auto-Load:**
   - Refresh the page
   - Pikachu should appear automatically
   - Check console - should see "Loaded from localStorage"
   - Button states should match "After Page Refresh" above

5. **Test Clear:**
   - Click "Clear localStorage"
   - Grid should clear
   - All buttons should return to initial state
   - localStorage should be empty in DevTools

---

## 🌟 Stretch Goals (if time remains)

If you finish early, try these enhancements:

1. **Different Pokemon**
   - Modify the code to fetch a different Pokemon
   - Try IDs: 1 (Bulbasaur), 4 (Charmander), 7 (Squirtle)

2. **Pokemon Selector**
   - Add an input field for Pokemon ID or name
   - Fetch the user's chosen Pokemon
   - Update button logic to handle dynamic Pokemon

3. **Multiple Pokemon**
   - Store an array of Pokemon instead of just one
   - Add "Add to Team" functionality
   - Display all saved Pokemon
   - Limit team to 6 Pokemon

4. **Error Handling**
   - Handle invalid Pokemon IDs
   - Show user-friendly error messages
   - Add loading indicators during fetch

5. **Enhanced Display**
   - Add more Pokemon stats (Attack, Defense, Speed)
   - Show Pokemon abilities
   - Add Pokemon description/flavor text
   - Display Pokemon height and weight

---

## 💡 Hints

### Fetching Pikachu:
```javascript
const response = await fetch('https://pokeapi.co/api/v2/pokemon/25');
const data = await response.json();
```

### Storing Current Pokemon:
```javascript
currentPokemon = {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    hp: data.stats.find(s => s.stat.name === 'hp').base_stat
};
```

### localStorage Operations:
```javascript
// Save
localStorage.setItem('pikachuData', JSON.stringify(currentPokemon));

// Load
const stored = localStorage.getItem('pikachuData');
if (stored) {
    currentPokemon = JSON.parse(stored);
}

// Remove
localStorage.removeItem('pikachuData');
```

### Extracting HP from Stats:
```javascript
const hp = data.stats.find(s => s.stat.name === 'hp').base_stat;
```

### Mapping Types:
```javascript
const types = data.types.map(t => t.type.name);
```

### Button State Logic:
```javascript
const hasStoredData = localStorage.getItem(STORAGE_KEY) !== null;
const hasCurrentData = currentPokemon !== null;

loadApiBtn.disabled = hasStoredData;
saveBtn.disabled = !hasCurrentData || hasStoredData;
clearBtn.disabled = !hasStoredData;
```

---

## 🐛 Common Issues

**API not loading?**
- Check your internet connection
- Open Network tab to see requests
- Verify API URL is correct: `https://pokeapi.co/api/v2/pokemon/25`
- Check for CORS errors (shouldn't happen with PokeAPI)

**localStorage not persisting?**
- Verify you're calling `JSON.stringify()` when saving
- Check Application tab in DevTools
- Make sure you're using the same key for get/set (`'pikachuData'`)

**Pokemon not displaying?**
- Check console for errors
- Verify sprite URL is valid
- Make sure you're appending card to the grid
- Check that grid element exists

**Buttons not enabling/disabling?**
- Make sure `updateButtonStates()` is called after every state change
- Check that button references are correct
- Verify `hasStoredData` and `hasCurrentData` logic
- Use console.log to debug button states

**Auto-load not working?**
- Make sure `DOMContentLoaded` listener is set up
- Verify `loadFromStorage()` is being called
- Check console for any errors
- Ensure localStorage has data before refresh

---

## 📊 Grading Rubric

| Criteria | Points |
|----------|--------|
| API fetch works correctly | 15 |
| Data transformation correct | 15 |
| Save to localStorage works | 20 |
| Auto-load on page load works | 15 |
| Pokemon displays properly | 15 |
| Button states update correctly | 20 |
| **Total** | **100** |

---

## 📚 Resources

- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [PokeAPI Pokemon Endpoint](https://pokeapi.co/api/v2/pokemon/)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.find()](https://developer.mozilla.org/en-docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [MDN: DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
- [MDN: Button disabled attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#disabled)

---

**Good luck! 🍀**

*This lab reinforces API integration, JSON parsing, data transformation, client-side persistence, and UI state management - essential skills for modern web development!*

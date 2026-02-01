# PROG 2700 — Client-Side Programming
## Lab 05 — JSON Load, Validate & Persist

**Week 5** | **~60 minutes** (in-class Friday)

---

## 🎯 Objectives

- Parse JSON data
- Validate data against a schema
- Persist data to localStorage
- Rehydrate data on page load

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

### 1. Load Sample JSON Dataset
- Use `fetch()` to load `pokemon-data.json`
- Parse the JSON response
- Log the data to console

### 2. Validate Each Item
- Define a schema object with required fields: `id`, `name`, `types`, `hp`, `sprite`
- Create a `validateItem()` function
- Check each item against the schema
- Separate valid and invalid items

### 3. Render Valid Items
- Display each valid Pokemon as a card
- Show Pokemon image, name, types, and HP
- Update count of valid items
- Display count of invalid items rejected

###4. Persist to localStorage
- Save the valid Pokemon array to localStorage
- Use key: `'validPokemon'`
- Convert array to JSON string before storing

### 5. Rehydrate on Page Load
- Check localStorage when page loads
- If data exists, parse and display it
- Update counts accordingly

---

## 📦 Deliverables (submit to Brightspace)

Submit a ZIP file containing:
- [ ] `index.html`
- [ ] `styles.css`
- [ ] `script.js`
- [ ] `pokemon-data.json`

---

## ✅ Completion Checklist

| Item | Done |
|------|------|
| JSON parsed from file | [ ] |
| Schema validation implemented | [ ] |
| Invalid items counted/handled | [ ] |
| Valid items displayed | [ ] |
| localStorage set on load | [ ] |
| localStorage get on page load | [ ] |
| DOM updates correctly | [ ] |
| Counts display properly | [ ] |

---

## 🎨 Expected Behavior

1. **On First Load:**
   - Page shows 0 valid, 0 invalid
   - Click "Load Pokemon Data"
   - Fetches and validates data
   - Shows 6 valid Pokemon, 2 invalid items
   - Saves to localStorage

2. **On Page Refresh:**
   - Page automatically loads from localStorage
   - Shows 6 valid Pokemon (rehydrated)
   - Click "Clear localStorage" to reset

---

## 🧪 Testing Your Code

1. **Load Data:** Click "Load Pokemon Data" button
2. **Check Console:** Should see validation logs
3. **Inspect localStorage:** DevTools → Application → Local Storage
4. **Refresh Page:** Data should persist and reload
5. **Clear Data:** Should reset everything

---

## 🌟 Stretch Goals (if time remains)

If you finish early, try these enhancements:

1. **Export to JSON**
   - Add "Download JSON" button
   - Create downloadable file of valid Pokemon
   - Use `Blob` and `URL.createObjectURL()`

2. **Add Pokemon**
   - Create form to add new Pokemon
   - Validate before adding
   - Update localStorage

3. **Filter by Type**
   - Add dropdown to filter by Pokemon type
   - Show only matching Pokemon

4. **Edit HP Values**
   - Make HP editable
   - Update localStorage on change

---

## 💡 Hints

### Validation Example:
```javascript
function validateItem(item, schema) {
    return schema.requiredFields.every(field => 
        item.hasOwnProperty(field) && item[field]
    );
}
```

### localStorage Example:
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const stored = localStorage.getItem('key');
const data = stored ? JSON.parse(stored) : [];
```

### Fetch Example:
```javascript
const response = await fetch('pokemon-data.json');
const data = await response.json();
```

---

## 🐛 Common Issues

**Data not loading?**
- Check file path in fetch()
- Open Network tab to see request

**Validation not working?**
- Log each item to see structure
- Check schema matches actual data

**localStorage not persisting?**
- Verify you're calling `JSON.stringify()`
- Check Application tab in DevTools

**Page not rehydrating?**
- Ensure DOMContentLoaded event fires
- Check if localStorage key exists

---

## 📊 Grading Rubric

| Criteria | Points |
|----------|--------|
| JSON loads successfully | 20 |
| Validation logic correct | 25 |
| Valid items display properly | 20 |
| Invalid items counted | 10 |
| localStorage save works | 15 |
| localStorage load works | 10 |
| **Total** | **100** |

---

## 📚 Resources

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [W3Schools: JSON](https://www.w3schools.com/js/js_json.asp)

---

**Good luck! 🍀**

*This lab reinforces JSON parsing, data validation, and client-side persistence - essential skills for modern web development!*

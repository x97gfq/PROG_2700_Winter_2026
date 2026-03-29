# React useEffect & Data Fetching — Countries Activity

This activity builds directly on the Sign-In app from Lecture 1. After the user signs in, the `Main` component will fetch real country data from a public API and display it as a list of cards. Next week you will take this same data and visualize it on a chart or map.

---

## Activity Goals

By the end of this guided activity, you will be able to:

- Use `useEffect` to run code when a component first mounts.
- Fetch data from a public API with `fetch`.
- Store an array of data in state with `useState`.
- Handle a loading state while data is being fetched.
- Render a list of components using `.map()` with a `key`.

---

## Starting Point

Use the app you built in Activity 1 (Sign-In app). Your file structure should look like this:

```
src/
  App.jsx
  App.css
  components/
    SignIn.jsx
    Main.jsx
```

You will only be modifying `Main.jsx` and adding one new component — `CountryCard.jsx`.

---

## The API

We will use the **REST Countries API** — free, no API key required.

```
https://restcountries.com/v3.1/all?fields=name,population,region,flags
```

Each country object in the response looks like this:

```json
{
  "name": { "common": "Canada" },
  "population": 38005238,
  "region": "Americas",
  "flags": { "svg": "https://..." }
}
```

---

## Step 1 — Update `Main.jsx` to Fetch Data

Replace your current `Main.jsx` with this:

```jsx
import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

function Main({ user, setUser }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,population,region,flags")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main">
      <div className="main-header">
        <h1>Hello, {user}!</h1>
        <button onClick={() => setUser(null)}>Sign Out</button>
      </div>

      {loading ? (
        <p className="loading">Loading countries...</p>
      ) : (
        <div className="card-grid">
          {countries.map((country) => (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              population={country.population}
              region={country.region}
              flag={country.flags.svg}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
```

**Teaching moments:**
- `useEffect(() => { ... }, [])` — the empty `[]` means this runs **once**, when the component first appears on screen.
- `loading` state gives the user feedback while the request is in flight.
- The API returns 250 countries — we store all of them in the `countries` array.
- Each `<CountryCard>` gets a `key` — React needs this to efficiently update lists.

---

## Step 2 — Create the `CountryCard` Component

Create `src/components/CountryCard.jsx`:

```jsx
function CountryCard({ name, population, region, flag }) {
  return (
    <div className="card">
      <img src={flag} alt={`Flag of ${name}`} />
      <h3>{name}</h3>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
    </div>
  );
}

export default CountryCard;
```

**Teaching moments:**
- This is a pure **presentational component** — it only receives props and renders them, no state of its own.
- `toLocaleString()` formats large numbers with commas (e.g. `38,005,238`).

---

## Step 3 — Update `App.css`

Add styles for the new layout. Keep your existing `.signin` styles and add:

```css
.main {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.card img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.card h3 {
  margin: 0.4rem 0;
  font-size: 0.95rem;
}

.card p {
  margin: 0.2rem 0;
  font-size: 0.85rem;
  color: #555;
}
```

---

## Step 4 — Check Your File Structure

```
src/
  App.jsx               ← unchanged from Activity 1
  App.css               ← updated with new styles
  components/
    SignIn.jsx          ← unchanged from Activity 1
    Main.jsx            ← updated with useEffect + fetch
    CountryCard.jsx     ← new
```

Sign in and you should see a grid of country cards load in.

---

## Mini Challenges

### Challenge 1 — Filter by Region
Add a `<select>` dropdown above the grid that lets the user filter countries by region (Africa, Americas, Asia, Europe, Oceania).

> Hint: add a `region` state, filter the `countries` array before `.map()`.

### Challenge 2 — Sort by Population
Add a button that sorts the countries from most to least populated.

> Hint: use `.sort()` on a copy of the array — never mutate state directly.

### Challenge 3 — Search by Name
Add a text input that filters the list as the user types.

> Hint: `country.name.common.toLowerCase().includes(search.toLowerCase())`

---

## Wrap-Up

You have now:

- Used `useEffect` to fetch data when a component mounts.
- Managed an array of data in state.
- Handled a loading state.
- Rendered a dynamic list with `.map()` and `key`.
- Built a dedicated presentational component (`CountryCard`).

**Next week:** we will take this country data — specifically the `population` values — and visualize it using a chart library. The fetch + state pattern you used today is exactly how chart data gets loaded.

---

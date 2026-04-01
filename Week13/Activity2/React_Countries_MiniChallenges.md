# React Countries — Mini Challenges

Solutions for the three mini challenges from [React_Countries_Activity.md](React_Countries_Activity.md). All three are implemented together in `Main.jsx`.

---

## Challenge 1 — Filter by Region

Add a `region` state and a `<select>` dropdown. Filter the countries array before `.map()`.

```jsx
const [region, setRegion] = useState("All");

// In the render, before .map():
let displayed = [...countries];
if (region !== "All") {
  displayed = displayed.filter((c) => c.region === region);
}
```

```jsx
<select value={region} onChange={(e) => setRegion(e.target.value)}>
  <option>All</option>
  <option>Africa</option>
  <option>Americas</option>
  <option>Asia</option>
  <option>Europe</option>
  <option>Oceania</option>
</select>
```

**Why it works:** When the user picks a region, `setRegion` updates state, React re-renders, and the filter runs again on the full `countries` array.

---

## Challenge 2 — Sort by Population

Add a boolean `sortByPop` state and a toggle button. Sort a copy of the array — never mutate state directly.

```jsx
const [sortByPop, setSortByPop] = useState(false);

// Applied after the region filter:
if (sortByPop) {
  displayed.sort((a, b) => b.population - a.population);
}
```

```jsx
<button onClick={() => setSortByPop((prev) => !prev)}>
  {sortByPop ? "Unsort" : "Sort by Population"}
</button>
```

**Why it works:** `[...countries]` creates a shallow copy so `.sort()` does not mutate the `countries` state. The boolean toggle means a second click restores the original order.

---

## Challenge 3 — Search by Name

Add a `search` state and a text input. Use `.toLowerCase().includes()` on both sides for case-insensitive matching.

```jsx
const [search, setSearch] = useState("");

// Applied after the region filter, before sort:
if (search) {
  displayed = displayed.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );
}
```

```jsx
<input
  type="text"
  placeholder="Search by name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

**Why it works:** Every keystroke updates `search`, triggering a re-render. The filter runs on the already-region-filtered array, so both constraints apply at once.

---

## Complete `Main.jsx`

```jsx
import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

function Main({ user, setUser }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("All");
  const [sortByPop, setSortByPop] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,population,region,flags")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  let displayed = [...countries];

  if (region !== "All") {
    displayed = displayed.filter((c) => c.region === region);
  }

  if (search) {
    displayed = displayed.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sortByPop) {
    displayed.sort((a, b) => b.population - a.population);
  }

  return (
    <div className="main">
      <div className="main-header">
        <h1>Hello, {user}!</h1>
        <button onClick={() => setUser(null)}>Sign Out</button>
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option>All</option>
        <option>Africa</option>
        <option>Americas</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>

      <button onClick={() => setSortByPop((prev) => !prev)}>
        {sortByPop ? "Unsort" : "Sort by Population"}
      </button>

      {loading ? (
        <p className="loading">Loading countries...</p>
      ) : (
        <div className="card-grid">
          {displayed.map((country) => (
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

---

## Order of Operations

The filter/sort pipeline runs in this order each render:

1. Start with a copy of all 250 countries
2. Filter by region (if not "All")
3. Filter by search text (if not empty)
4. Sort by population (if toggled on)

This means sort only applies to the currently visible subset, which is the expected behaviour.

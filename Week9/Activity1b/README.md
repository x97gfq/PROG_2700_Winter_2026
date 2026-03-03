# Activity 1b — Capital City Weather (Chained Fetches)

## Overview

This activity builds on Activity 1. Instead of one API call, you'll make **two rounds** of `fetch` requests: first get a list of countries, then fetch the current weather for each capital city.

This is a very common real-world pattern — fetch a list, then fetch details for each item.

---

## Key Concept: `Promise.all()`

### The Problem — `forEach` + `async` Doesn't Work

You might think you can do this:

```js
// ❌ BAD — forEach does NOT wait for async functions
data.forEach(async (country) => {
    const weather = await fetch(`.../${country.capital}`);
    // This runs, but forEach won't wait for it to finish.
    // All fetches fire at once with no coordination.
});
console.log('Done!');  // This runs BEFORE any fetch finishes!
```

`forEach` ignores the returned Promises. The loop finishes instantly, and your code continues before any of the fetch calls complete. This is a **very common mistake**.

### The Solution — `Promise.all()` + `map()`

`Promise.all()` takes an **array of Promises** and waits until **all of them** resolve. Combined with `map()`, it's the correct pattern:

```js
// ✅ GOOD — Promise.all waits for every fetch to finish
const weatherPromises = countries.map(country =>
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m`)
        .then(res => res.json())
);

const weatherResults = await Promise.all(weatherPromises);
// Now ALL fetches are done, and weatherResults is an array of responses
```

### How It Works — Step by Step

1. **`countries.map(...)`** creates an array of Promises (one `fetch` per country)
2. **`Promise.all([...])`** waits until every Promise in the array resolves
3. **`await`** pauses execution until `Promise.all` is done
4. **`weatherResults`** is an array in the same order as `countries`

### Visual Diagram

```
countries:        [France,   Germany,   Spain  ]
                     ↓          ↓          ↓
map() creates:    [fetch(),  fetch(),   fetch()]   ← array of Promises
                     ↓          ↓          ↓
Promise.all():    waits for ALL to finish...
                     ↓          ↓          ↓
result:           [weather1, weather2, weather3]   ← array of results
```

### Error Handling (Bonus)

If **any** fetch fails, `Promise.all` rejects immediately. For more resilience, you can use `Promise.allSettled()` which waits for all — even failures:

```js
const results = await Promise.allSettled(promises);
results.forEach(r => {
    if (r.status === 'fulfilled') console.log(r.value);
    if (r.status === 'rejected')  console.log('Failed:', r.reason);
});
```

---

## Prerequisites

Open `starter/index.html` in your browser. The map should load with European country markers (similar to Activity 1). The weather data is **not** loaded yet — that's your job.

## Your Tasks

### TODO 1 — Fetch Weather for Each Capital

Inside `loadCountries()`, after the first fetch returns the list of countries, use `Promise.all()` with `map()` to fetch the current weather for each country's capital.

The Open-Meteo API URL for current temperature is:

```
https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LNG&current=temperature_2m,wind_speed_10m
```

Use each country's `latlng[0]` and `latlng[1]` as the latitude and longitude.

### TODO 2 — Display Weather in the InfoWindow

After you have the weather results, add the current temperature and wind speed to each marker's InfoWindow:

```
🌡️ 12.3 °C  |  💨 15.2 km/h
```

**Hint:** `weatherResults[i].current.temperature_2m` and `weatherResults[i].current.wind_speed_10m`

## Solution

The complete solution is in `solution/`. Try it yourself first!

# Assignment 4: Public API Map + Chart

**Due:** One week from today  
**Worth:** Check course outline

---

## Overview

Build a single-page web app that:

1. Makes **one `fetch()` call** to a public API (no auth key required, or you supply your own)
2. Places **markers on a Google Map** based on latitude/longitude from the data
3. Draws a **Chart.js chart** (any type) using numerical data from the same API response
4. Includes a short `README.md` explaining your API choice and what the app shows

---

## Requirements

| # | Requirement |
|---|-------------|
| 1 | Single `fetch()` call feeds both the map and the chart |
| 2 | Google Map with at least 5 meaningful markers |
| 3 | Info window on marker click shows relevant data |
| 4 | Chart.js chart with labelled axes and a title |
| 5 | Charts and markers use the same dataset |
| 6 | Clean, readable HTML and JavaScript (separate files) |
| 7 | `README.md` explaining API, what data is shown, and how to run it |

---

## Suggested APIs (no key required)

| API | URL | What's in it |
|-----|-----|--------------|
| **RestCountries** | `https://restcountries.com/v3.1/all` | Countries — lat/lng, population, area |
| **USGS Earthquakes** | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson` | Real quakes — lat/lng, magnitude |
| **Open-Meteo** | `https://api.open-meteo.com/v1/forecast` | Weather — temperature, precipitation |
| **Open Notify** | `http://api.open-notify.org/iss-now.json` | Current ISS location |
| **Open Library** | `https://openlibrary.org/search.json?q=...` | Books — author, year, subjects |
| **NASA EONET** | `https://eonet.gsfc.nasa.gov/api/v3/events` | Natural events — lat/lng, category |

You may use a different API with instructor approval.

---

## Grading Rubric

| Criteria | Marks |
|----------|-------|
| Working `fetch()` with valid API response | 20 |
| Google Map with labelled markers + info windows | 25 |
| Chart.js chart — correct data, labels, axes | 25 |
| Map and chart use the **same** dataset | 10 |
| Code quality — clean, readable, commented | 10 |
| README.md — API explanation + run instructions | 10 |
| **Total** | **100** |

---

## Submission

Submit your folder containing:
- `index.html`
- `app.js`
- `README.md`

Do **not** include `node_modules`. If your API requires a key, add a note in your README about where to put it — do not commit your actual key.

---

## Notes

- You do **not** need a backend — this is a pure frontend assignment
- Use the pattern from Week 8 Example 4 as your starting point
- Your Google Maps API key goes in the `<script>` tag in `index.html` — keep it off GitHub

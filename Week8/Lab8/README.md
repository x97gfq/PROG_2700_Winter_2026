# Lab 8 — Significant Earthquakes: Map + Chart

## Overview

In this lab you will build a page from scratch (using the provided HTML) that:

1. Fetches real earthquake data from the USGS GeoJSON feed (no API key required)
2. Places a marker on a Google Map for each earthquake
3. Draws a Chart.js bar chart showing magnitude for the top 15 events

You'll need a **Google Maps API key** — paste it into the `<script>` tag in `index.html`.

## The API

```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson
```

This returns a **GeoJSON FeatureCollection**. Each feature looks like:

```json
{
  "geometry": {
    "coordinates": [-122.5, 37.8, 10.0]
  },
  "properties": {
    "title": "M 6.2 - 40km SE of ...",
    "place": "40km SE of ...",
    "mag": 6.2,
    "url": "https://earthquake.usgs.gov/earthquakes/eventpage/..."
  }
}
```

> **Note:** GeoJSON coordinates are `[longitude, latitude, depth]` — that's `[lng, lat]`, not `[lat, lng]`. Google Maps expects `{ lat, lng }`.

---

## Step 1 — Fetch the Data

Inside `initMap()` (which Google Maps calls automatically when it loads):

1. Call `fetch(API)`
2. Parse the response with `.then(res => res.json())`
3. `console.log` the result — inspect the structure in DevTools
4. Call `placeMarkers(data)` and `drawChart(data)` with the result

---

## Step 2 — Place Map Markers

In `placeMarkers(data)`, loop through `data.features` and for each one:

1. Destructure the coordinates: `const [lng, lat] = feature.geometry.coordinates`
2. Create a `google.maps.Marker` at `{ lat, lng }` on the map
3. Create a `google.maps.InfoWindow` with the title and magnitude
4. Add a `'click'` listener on the marker to open the info window

**Bonus:** Use the Google Maps `SymbolPath.CIRCLE` icon and scale it by magnitude to make bigger quakes appear larger.

---

## Step 3 — Draw the Chart

In `drawChart(data)`:

1. Sort `data.features` by `properties.mag` descending
2. Take the first 15
3. Build `labels` from `feature.properties.place`
4. Build `data` values from `feature.properties.mag`
5. Create a horizontal bar chart (`indexAxis: 'y'`) using Chart.js

---

## Step 4 (Bonus) — Colour by Severity

- Magnitude ≥ 7: red bars and markers
- Magnitude < 7: orange bars and markers

---

## Solution

The complete solution is in `solution/`. Work through the steps yourself first!

# Activity 2 — Modify the Map + Chart

## Overview

You have a working app that fetches countries in the Americas from the [RestCountries API](https://restcountries.com) and displays them on a Google Map with a Chart.js bar chart.

**Your job:** Make two small modifications to the code in `starter/app.js`.

## Prerequisites

Open `starter/index.html` in your browser and confirm the map and chart load correctly. You need a Google Maps API key in the `<script>` tag in `index.html`.

## Your Tasks

### TODO 1 — Colour Markers by Population

Right now all markers use the default Google Maps pin. Change the marker `icon` so that:
- Countries with a population **greater than 10,000,000** use a **red** marker
- All other countries use a **blue** marker

**Hint:** Add an `icon` property to the marker options:
```js
icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
```

### TODO 2 — Switch the Chart to Show Area

Right now the chart shows the top 10 countries by **population**. Change it to show the top 10 countries by **area (km²)**.

You'll need to:
1. Sort by `c.area` instead of `c.population`
2. Use `c.area` as the chart data values
3. Update the chart dataset `label` to `'Area (km²)'`
4. Update the tick formatter (the `x` axis) — area values are in km², so format them as `'X.X M km²'`
5. Update the `<h2>` heading text (you can do this with JS: `document.getElementById('chart-title').textContent = '...'`)

## Solution

The complete solution is in `solution/`. Try it yourself first!

# Week 9: Advanced API Consumption (Maps & Charts)

## Overview

This week focuses on visualising data from public APIs using **Google Maps** and **Chart.js**. We explore how to handle real-world datasets, coordinate markers, and dynamic charting.

---

## Topics Covered

- Consuming Public APIs (no auth / API keys)
- Google Maps JavaScript API
- Placing dynamic markers and InfoWindows
- Data visualisation with Chart.js
- Linking Map interaction with Chart updates

---

## Examples

### [Example 1: Google Maps](Example1/)
Basic integration with Google Maps using the RestCountries API to place markers for country capitals in the Americas.

### [Example 2: Chart.js](Example2/)
Using Chart.js to create a weather dashboard (Max/Min temp + Precipitation) using the keyless Open-Meteo API.

### [Example 3: Combined Dashboard](Example3/)
The "Full Pattern": One `fetch()` call to RestCountries that populates a map and a linked bar chart simultaneously.

---

## Activities

### [Activity 1: European Countries Map](Activity1/)
Modify Example 1 to show European countries instead of the Americas, and add flag images to InfoWindows.

### [Activity 1b: Capital City Weather (Chained Fetches)](Activity1b/)
Build on Activity 1 — use `Promise.all()` to fetch current weather for each European capital. Teaches chained API calls and the `map` + `Promise.all` pattern.

### [Activity 2: Population Doughnut Chart](Activity2/)
Use the RestCountries API with Chart.js to create a doughnut chart of South American population distribution.

### [Activity 3: Map & Chart Tweaks](Activity3/)
Modify the Example 3 combined dashboard — colour markers by population and switch the chart to show area instead.

---

## Lab 9: Earthquake Mapper

**Location:** `Week9/Lab9/`

Guided coding lab using the USGS Global Earthquake Feed. Students implement `fetch`, markers, and charts from a blank starter.

---

## Presentation Slides
- [Part 2: Visualising API Data](slides_part2.pptx)

---

## Assignment 4: Public API project

**Location:** `../Assignment4/`

Students pick their own API and build a custom Map/Chart dashboard. See the [Assignment 4 README](../Assignment4/README.md) for details.

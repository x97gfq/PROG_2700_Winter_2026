# Activity 2 — Population Doughnut Chart

## Overview

In Example 2 you saw Chart.js used to plot a weather **line + bar** chart. In this activity you'll use a completely different chart type — a **doughnut chart** — and a different data source.

You'll fetch countries from the [RestCountries API](https://restcountries.com) and plot the population distribution of the **top 8 South American countries** as a doughnut chart.

## Prerequisites

Open `starter/index.html` in your browser. You should see the page title and an empty chart area. The `<canvas>` element and Chart.js CDN are already included.

## Your Tasks

### TODO 1 — Fetch and Prepare the Data

In `app.js`, the API URL is already provided. You need to:

1. Use `fetch()` to get the data
2. Sort the countries by population (descending)
3. Take the top 8
4. Build two arrays:
   - `labels` — an array of country names
   - `values` — an array of population numbers

```js
const top8 = data
    .sort((a, b) => b.population - a.population)
    .slice(0, 8);
const labels = top8.map(c => c.name.common);
const values = top8.map(c => c.population);
```

### TODO 2 — Create the Doughnut Chart

Create a new `Chart` using the `'doughnut'` type. A doughnut chart needs:

- `type: 'doughnut'`
- A `data` object with `labels` and one `datasets` entry
- A `backgroundColor` array with one colour per slice

**Hint — colour palette:**
```js
const colors = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
];
```

**Hint — chart config:**
```js
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels,
        datasets: [{
            data: values,
            backgroundColor: colors
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'right' },
            title: { display: true, text: 'Population by Country', font: { size: 16 } }
        }
    }
});
```

## Solution

The complete solution is in `solution/`. Try it yourself first!

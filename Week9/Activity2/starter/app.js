const API = 'https://restcountries.com/v3.1/region/south%20america?fields=name,population';

async function loadChart() {
    // ─────────────────────────────────────────────────────────────
    // TODO 1: Fetch the data and prepare it for the chart.
    //
    //  1. Use fetch() to get the JSON from the API
    //  2. Sort the results by population, descending
    //  3. Take the top 8
    //  4. Build a 'labels' array of country names  (c.name.common)
    //  5. Build a 'values' array of populations     (c.population)
    // ─────────────────────────────────────────────────────────────
    const res = await fetch(API);
    const data = await res.json();

    // Your code here...
    const labels = [];   // ← fill this with country names
    const values = [];   // ← fill this with population numbers

    // ─────────────────────────────────────────────────────────────
    // TODO 2: Create a DOUGHNUT chart.
    //
    //  Use:  new Chart(document.getElementById('popChart'), { ... })
    //
    //  Config:
    //    type: 'doughnut'
    //    data.labels:  your labels array
    //    data.datasets: [{ data: values, backgroundColor: colors }]
    //
    //  Colour palette (one per slice):
    const colors = [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
        '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
    ];
    //
    //  Options (optional but nice):
    //    plugins.legend.position = 'right'
    //    plugins.title = { display: true, text: 'Population by Country' }
    // ─────────────────────────────────────────────────────────────

    // Your chart code here...
}

loadChart();

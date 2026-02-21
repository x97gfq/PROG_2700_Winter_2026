const API = 'https://restcountries.com/v3.1/region/americas?fields=name,population,area,capital,latlng,flags';

let map;
let chart;
let chartCountries = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 10, lng: -75 }
    });
    loadData();
}

async function loadData() {
    const res = await fetch(API);
    const data = await res.json();
    placeMarkers(data);
    drawChart(data);
}

function placeMarkers(countries) {
    countries.forEach(country => {
        if (!country.latlng || country.latlng.length < 2) return;

        // TODO 1: Change marker colour based on population
        // Countries with population > 10,000,000 should use a red marker.
        // Hint: use the 'icon' property on the marker options object.
        // Red:  'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        // Blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        const marker = new google.maps.Marker({
            position: { lat: country.latlng[0], lng: country.latlng[1] },
            map,
            title: country.name.common
            // icon: ???
        });

        const info = new google.maps.InfoWindow({
            content: `<strong>${country.name.common}</strong><br>
                      Capital: ${country.capital?.[0] ?? 'N/A'}<br>
                      Population: ${country.population.toLocaleString()}`
        });

        marker.addListener('click', () => {
            info.open(map, marker);
            highlightBar(country.name.common);
        });
    });
}

function drawChart(countries) {
    // TODO 2: Change the chart to show AREA (km²) instead of population.
    // 1. Sort by area descending instead of population
    // 2. Update the dataset to use c.area instead of c.population
    // 3. Update the chart label and the h2 heading in index.html (or via JS)
    chartCountries = [...countries]
        .sort((a, b) => b.population - a.population)
        .slice(0, 10);

    const labels = chartCountries.map(c => c.name.common);
    const values = chartCountries.map(c => c.population);   // ← change this
    const colors = chartCountries.map(() => 'rgba(26,115,232,0.75)');

    chart = new Chart(document.getElementById('popChart'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{ label: 'Population', data: values, backgroundColor: colors }]  // ← change label too
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { ticks: { callback: v => (v / 1e6).toFixed(0) + 'M' } } }  // ← update tick formatter
        }
    });
}

function highlightBar(countryName) {
    if (!chart) return;
    const idx = chartCountries.findIndex(c => c.name.common === countryName);
    const colors = chartCountries.map((_, i) =>
        i === idx ? 'rgba(234,67,53,0.9)' : 'rgba(26,115,232,0.75)'
    );
    chart.data.datasets[0].backgroundColor = colors;
    chart.update();
}

const API = 'https://restcountries.com/v3.1/region/americas?fields=name,population,area,capital,latlng,flags';

let map;
let chart;
let chartCountries = []; // top 10 kept for marker highlighting

// Called by Google Maps script when it's ready
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

// ── Map ───────────────────────────────────────────────────────────────────────
function placeMarkers(countries) {
    countries.forEach(country => {
        if (!country.latlng || country.latlng.length < 2) return;

        const marker = new google.maps.Marker({
            position: { lat: country.latlng[0], lng: country.latlng[1] },
            map,
            title: country.name.common
        });

        const info = new google.maps.InfoWindow({
            content: `<strong>${country.name.common}</strong><br>
                      Capital: ${country.capital?.[0] ?? 'N/A'}<br>
                      Population: ${country.population.toLocaleString()}<br>
                      Area: ${country.area?.toLocaleString() ?? 'N/A'} km²`
        });

        marker.addListener('click', () => {
            info.open(map, marker);
            highlightBar(country.name.common);
        });
    });
}

// ── Chart ─────────────────────────────────────────────────────────────────────
function drawChart(countries) {
    // Sort descending by population, take top 10
    chartCountries = [...countries]
        .sort((a, b) => b.population - a.population)
        .slice(0, 10);

    const labels = chartCountries.map(c => c.name.common);
    const population = chartCountries.map(c => c.population);
    const colors = chartCountries.map(() => 'rgba(26,115,232,0.75)');

    chart = new Chart(document.getElementById('popChart'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{ label: 'Population', data: population, backgroundColor: colors }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { ticks: { callback: v => (v / 1e6).toFixed(0) + 'M' } } }
        }
    });
}

// Highlight the bar that matches the clicked map marker
function highlightBar(countryName) {
    if (!chart) return;
    const idx = chartCountries.findIndex(c => c.name.common === countryName);
    const colors = chartCountries.map((_, i) =>
        i === idx ? 'rgba(234,67,53,0.9)' : 'rgba(26,115,232,0.75)'
    );
    chart.data.datasets[0].backgroundColor = colors;
    chart.update();
}

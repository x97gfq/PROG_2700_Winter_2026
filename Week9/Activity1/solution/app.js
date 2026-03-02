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

        // TODO 1 SOLUTION: Red marker for population > 10M, blue otherwise
        const icon = country.population > 10_000_000
            ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

        const marker = new google.maps.Marker({
            position: { lat: country.latlng[0], lng: country.latlng[1] },
            map,
            title: country.name.common,
            icon
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
    // TODO 2 SOLUTION: Sort by area, chart area instead of population
    document.getElementById('chart-title').textContent = 'Top 10 by Area (km²)';

    chartCountries = [...countries]
        .filter(c => c.area)
        .sort((a, b) => b.area - a.area)
        .slice(0, 10);

    const labels = chartCountries.map(c => c.name.common);
    const values = chartCountries.map(c => c.area);
    const colors = chartCountries.map(() => 'rgba(26,115,232,0.75)');

    chart = new Chart(document.getElementById('popChart'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{ label: 'Area (km²)', data: values, backgroundColor: colors }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { ticks: { callback: v => (v / 1e6).toFixed(1) + 'M km²' } } }
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

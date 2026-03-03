const COUNTRIES_API = 'https://restcountries.com/v3.1/region/europe?fields=name,capital,latlng,flags';

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: { lat: 50, lng: 15 }
    });
    loadCountries();
}

async function loadCountries() {
    const loadingEl = document.getElementById('loading');
    loadingEl.style.display = 'block';

    // Step 1: Fetch the list of European countries
    const res = await fetch(COUNTRIES_API);
    const countries = await res.json();

    // Filter to countries that have valid coordinates
    const valid = countries.filter(c => c.latlng && c.latlng.length >= 2);

    // SOLUTION — TODO 1: Use Promise.all to fetch weather for every capital
    const weatherResults = await Promise.all(
        valid.map(c =>
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.latlng[0]}&longitude=${c.latlng[1]}&current=temperature_2m,wind_speed_10m`)
                .then(r => r.json())
                .catch(() => null)   // gracefully handle individual failures
        )
    );

    loadingEl.style.display = 'none';

    // Step 3: Place markers with country + weather info
    valid.forEach((country, i) => {
        const marker = new google.maps.Marker({
            position: { lat: country.latlng[0], lng: country.latlng[1] },
            map,
            title: country.name.common
        });

        // SOLUTION — TODO 2: Show weather data in InfoWindow
        const weather = weatherResults[i];
        const weatherText = weather?.current
            ? `🌡️ ${weather.current.temperature_2m} °C  |  💨 ${weather.current.wind_speed_10m} km/h`
            : 'Weather: N/A';

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <img src="${country.flags.png}" width="60" style="display:block; margin-bottom:4px">
                <strong>${country.name.common}</strong><br>
                Capital: ${country.capital?.[0] ?? 'N/A'}<br>
                ${weatherText}
            `
        });

        marker.addListener('click', () => infoWindow.open(map, marker));
    });
}

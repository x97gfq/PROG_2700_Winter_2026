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

    // ─────────────────────────────────────────────────────────────────
    // TODO 1: Fetch the current weather for EACH country's capital.
    //
    // Use Promise.all() with valid.map() to create one fetch per country.
    // The Open-Meteo API URL for each country is:
    //
    //   `https://api.open-meteo.com/v1/forecast?latitude=${c.latlng[0]}&longitude=${c.latlng[1]}&current=temperature_2m,wind_speed_10m`
    //
    // Each fetch returns a Promise.  map() creates an array of Promises.
    // Promise.all() waits for ALL of them to resolve.
    //
    // Example:
    //   const weatherResults = await Promise.all(
    //       valid.map(c => fetch(`URL_HERE`).then(r => r.json()))
    //   );
    //
    // After this, weatherResults[i] corresponds to valid[i].
    // ─────────────────────────────────────────────────────────────────
    const weatherResults = [];  // ← Replace this with your Promise.all() call

    loadingEl.style.display = 'none';

    // Step 3: Place markers with country + weather info
    valid.forEach((country, i) => {
        const marker = new google.maps.Marker({
            position: { lat: country.latlng[0], lng: country.latlng[1] },
            map,
            title: country.name.common
        });

        // TODO 2: Update the InfoWindow content to include weather data.
        //
        // If weatherResults[i] exists and has a .current property, show:
        //   🌡️  weatherResults[i].current.temperature_2m °C
        //   💨  weatherResults[i].current.wind_speed_10m km/h
        //
        // If weather data is not available, show "Weather: N/A"
        const weather = weatherResults[i];
        const weatherText = 'Weather: not loaded yet';  // ← Replace with real data

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

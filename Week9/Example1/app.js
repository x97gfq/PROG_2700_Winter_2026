const API = 'https://restcountries.com/v3.1/region/americas?fields=name,population,area,capital,latlng,flags';

let map;

// Called by Google Maps script when it's ready
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 10, lng: -75 }
    });
    loadCountries();
}

async function loadCountries() {
    const res = await fetch(API);
    const data = await res.json();

    data.forEach(country => {
        if (!country.latlng || country.latlng.length < 2) return;

        const marker = new google.maps.Marker({
            position: { lat: country.latlng[0], lng: country.latlng[1] },
            map,
            title: country.name.common
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <strong>${country.name.common}</strong><br>
                Capital: ${country.capital?.[0] ?? 'N/A'}<br>
                Population: ${country.population.toLocaleString()}
            `
        });

        marker.addListener('click', () => infoWindow.open(map, marker));
    });
}

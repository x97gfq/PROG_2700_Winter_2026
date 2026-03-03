// SOLUTION: API changed to Europe region
const API = 'https://restcountries.com/v3.1/region/europe?fields=name,population,area,capital,latlng,flags';

let map;

function initMap() {
    // SOLUTION: Map centred on Europe with appropriate zoom
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: { lat: 50, lng: 15 }
    });
    loadCountries();
}

async function loadCountries() {
    const res = await fetch(API);
    const data = await res.json();

    data.forEach(country => {
        if (!country.latlng || country.latlng.length < 2) return;

        // SOLUTION: Use the country flag as the marker icon
        const marker = new google.maps.Marker({
            position: { lat: country.latlng[0], lng: country.latlng[1] },
            map,
            title: country.name.common,
            icon: {
                url: country.flags.png,
                scaledSize: new google.maps.Size(30, 20)
            }
        });

        // SOLUTION: Flag image added to InfoWindow
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <img src="${country.flags.png}" width="60" style="display:block; margin-bottom:4px">
                <strong>${country.name.common}</strong><br>
                Capital: ${country.capital?.[0] ?? 'N/A'}<br>
                Population: ${country.population.toLocaleString()}
            `
        });

        marker.addListener('click', () => infoWindow.open(map, marker));
    });
}

// TODO 1: Change the API URL to fetch European countries instead of Americas.
//         Also update the map centre and zoom below so Europe is visible.
//         Hint: Change 'americas' to 'europe' in the URL,
//               and use  center: { lat: 50, lng: 15 }, zoom: 3
const API = 'https://restcountries.com/v3.1/region/americas?fields=name,population,area,capital,latlng,flags';

let map;

// Called by Google Maps script when it's ready
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 10, lng: -75 }   // TODO 1: change to Europe centre
    });
    loadCountries();
}

async function loadCountries() {
    const res = await fetch(API);
    const data = await res.json();

    data.forEach(country => {
        if (!country.latlng || country.latlng.length < 2) return;

        // TODO 2: Use the country's flag as the marker icon.
        //         The flag URL is at country.flags.png
        //         Add an 'icon' property to the marker options:
        //         icon: {
        //             url: country.flags.png,
        //             scaledSize: new google.maps.Size(30, 20)
        //         }
        const marker = new google.maps.Marker({
            position: { lat: country.latlng[0], lng: country.latlng[1] },
            map,
            title: country.name.common
            // icon: ???
        });

        // TODO 3 (Bonus): Also add the flag as an <img> in the InfoWindow.
        //         <img src="${country.flags.png}" width="60" style="display:block; margin-bottom:4px">
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

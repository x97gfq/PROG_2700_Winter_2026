const API = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 20, lng: 0 }
    });

    // STEP 1: Fetch the USGS earthquake GeoJSON
    // - Call fetch(API)
    // - Parse the response with .json()
    // - console.log the result so you can see the data structure
    // - Then call placeMarkers(data) and drawChart(data)
    //
    // Your code here:

}

// STEP 2: Place a marker on the map for each earthquake
// Each feature has:
//   feature.geometry.coordinates  → [longitude, latitude, depth]
//   feature.properties.title      → e.g. "M 6.2 - 40km SE of..."
//   feature.properties.mag        → magnitude (number)
//   feature.properties.url        → USGS event page link
//
// Loop through data.features and add a google.maps.Marker for each.
// Add a google.maps.InfoWindow that shows title and magnitude on click.
function placeMarkers(data) {
    // Your code here

}

// STEP 3: Draw a bar chart showing magnitude for each earthquake
// - Sort data.features by magnitude descending, take first 15
// - Labels = feature.properties.place (short name)
// - Data = feature.properties.mag
// Use Chart.js to draw a horizontal bar chart (indexAxis: 'y')
function drawChart(data) {
    // Your code here

}

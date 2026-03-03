# Activity 1 — European Countries Map

## Overview

You have a working app (from Example 1) that fetches countries in the **Americas** from the [RestCountries API](https://restcountries.com) and places markers on a Google Map.

**Your job:** Modify `starter/app.js` so the map shows **European** countries instead.

## Prerequisites

Open `starter/index.html` in your browser. Confirm the map loads (it will show the Americas with markers). You need the Google Maps API key already in the `<script>` tag.

## Your Tasks

### TODO 1 — Change the API Region & Re-Centre the Map

Right now the app fetches `/region/americas`. Change it to fetch `/region/europe` instead.

You also need to **re-centre the map** so Europe is visible:

```js
center: { lat: 50, lng: 15 }   // roughly central Europe
zoom: 3
```

After this step, markers should appear across Europe.

### TODO 2 — Use the Flag as the Marker Icon

Instead of the default red pin, display each country's **flag** as the marker on the map.

The API response includes a `flags` object with image URLs. Add an `icon` property to the marker options:

```js
icon: {
    url: country.flags.png,
    scaledSize: new google.maps.Size(30, 20)
}
```

`scaledSize` shrinks the flag to 30×20 pixels so they don't overlap.

### TODO 3 (Bonus) — Add the Flag to the InfoWindow Too

Also add the flag image inside the InfoWindow popup that appears on click:

```html
<img src="..." width="60" style="display:block; margin-bottom:4px">
```

## Solution

The complete solution is in `solution/`. Try it yourself first!

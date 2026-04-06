# Instructor Notes — Charts and Maps in React

## Connecting to Week 9

Students already know Chart.js and Google Maps conceptually. Frame the whole lecture as:

> "Same ideas, different API. Instead of calling constructors and updating DOM elements,
> we drop in JSX components and let React handle updates."

Draw this on the board before you start:

```
Week 9                      Week 14
──────────────────────────────────────────
new Chart(canvas, config)  →  <BarChart data={...}>
new google.maps.Map(div)   →  <MapContainer center={...}>
chart.update()             →  (automatic — state change → re-render)
API key required           →  No key (OpenStreetMap)
```

The upgrade story is compelling: less code, automatic updates, free map tiles.

---

## The `dataKey` Concept

This trips students up. Explain it clearly:

```jsx
const data = [
  { month: "Jan", mm: 128 },
  { month: "Feb", mm: 111 },
];

<XAxis dataKey="month" />   // reads the "month" property for axis labels
<Bar dataKey="mm" />        // reads the "mm" property for bar heights
```

`dataKey` is just a string that tells the component which property to look at.
If you rename `mm` to `rainfall` in your data, you change `dataKey="mm"` to `dataKey="rainfall"` — nothing else changes.

---

## CircleMarker vs Marker

There's a well-known issue with the default Leaflet `<Marker>` component in Vite/webpack projects — the PNG icon files aren't found because of how bundlers handle asset URLs.

We use `<CircleMarker>` to sidestep this entirely. It looks clean and has no asset dependency.

If a student asks "why not use the pin icon?" — it's fine to explain the workaround:
```jsx
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: ..., shadowUrl: ... });
```
But don't spend class time on it. `CircleMarker` is the right choice for a teaching context.

---

## The `leaflet/dist/leaflet.css` Import

This is easy to forget and the result is a broken-looking map with tiles in the wrong place. Make sure it's in `StationsMap.jsx`:

```jsx
import "leaflet/dist/leaflet.css";
```

If students' maps look wrong, this is almost always the reason.

---

## Live Edit During Demo

The most compelling moment: edit a value in the `data` array while Vite's HMR is running. The chart updates instantly on save. This is the "aha" moment — students immediately understand why React state-driven charts are better than imperative `chart.update()` calls.

Do the same with the map: add a new station object to the `stations` array, save, and a new dot appears on the map.

---

## Timing

| Section | Time |
|---------|------|
| From plain JS to React (comparison) | 5 min |
| Recharts bar chart walkthrough | 10 min |
| Other chart types (line, pie) | 5 min |
| React Leaflet map walkthrough | 10 min |
| Mapping data to markers (.map()) | 5 min |
| Demo: NS Weather Dashboard | 10 min |
| Activity 2 intro + work time | 20 min |
| **Total** | **~65 min** |

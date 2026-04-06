# Week 14 — Lecture 2: Charts and Maps in React
# Slide Outline · PROG 2700

---

## SLIDE 1 — Title

**Charts and Maps in React**
PROG 2700 — Week 14, Lecture 2

> You used Chart.js and Google Maps in plain JavaScript in Week 9.
> Today we use the React equivalents — same ideas, React component model.

---

## SLIDE 2 — From Plain JS to React

| Week 9 (plain JS) | Today (React) |
|-------------------|---------------|
| `new Chart(canvas, config)` | `<BarChart data={...}>` |
| Google Maps `new google.maps.Map(div, options)` | `<MapContainer center={[lat, lng]}>` |
| Manually update DOM | State change → chart re-renders automatically |
| API key required (Google Maps) | No API key needed (OpenStreetMap) |

**Libraries today:**
- **Recharts** — React-native chart library (JSX components, built on D3)
- **React Leaflet** — Leaflet.js wrapped in React components (free, open-source tiles)

```bash
npm install recharts react-leaflet leaflet
```

> Key shift: instead of calling a constructor and managing a canvas/div ourselves,
> we just drop in JSX components. React handles updates automatically when data changes.

---

## SLIDE 3 — Recharts: A Bar Chart in JSX

```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", mm: 128 },
  { month: "Feb", mm: 111 },
  { month: "Mar", mm: 107 },
];

function RainfallChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="mm" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

- `ResponsiveContainer` — makes the chart fill its parent width
- `dataKey` — tells each component which property from the data objects to use
- Everything is a JSX component — no canvas, no imperative API

> Compare to Chart.js: new Chart(canvas, { type: 'bar', data: { datasets: [...] } })
> Recharts is all components — much more React-native feeling.

---

## SLIDE 4 — Other Recharts Chart Types

Swap `<BarChart>` + `<Bar>` for any of these:

```jsx
import { LineChart, Line, ... } from "recharts";
<LineChart data={data}>
  <Line dataKey="mm" stroke="#4f46e5" />
</LineChart>

import { PieChart, Pie, Cell } from "recharts";
<PieChart>
  <Pie data={data} dataKey="mm" nameKey="month">
    {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
  </Pie>
</PieChart>
```

The data shape stays the same — only the outer components change.

> One of the nicest things about Recharts: you can swap chart types by changing
> two component names. The data doesn't change at all.

---

## SLIDE 5 — React Leaflet: A Map with Markers

```jsx
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";  // required!

function StationsMap() {
  return (
    <MapContainer center={[45.2, -63.2]} zoom={6} style={{ height: "300px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker center={[44.65, -63.57]} radius={10}>
        <Popup>Halifax — 1137 mm/yr</Popup>
      </CircleMarker>
    </MapContainer>
  );
}
```

- `MapContainer` — replaces `new google.maps.Map(...)`
- `TileLayer` — the map imagery (OpenStreetMap, free, no API key)
- `CircleMarker` — a dot on the map; avoids icon file issues in Vite
- `Popup` — the click popup, rendered as JSX

> We use CircleMarker instead of Marker to avoid a known Vite/Leaflet icon path issue.
> In production you'd fix the icon path — for today CircleMarker looks clean and just works.

---

## SLIDE 6 — Mapping Data to Markers

Just like rendering a list — use `.map()`:

```jsx
const stations = [
  { id: 1, name: "Halifax",  lat: 44.65, lng: -63.57 },
  { id: 2, name: "Sydney",   lat: 46.14, lng: -60.19 },
  { id: 3, name: "Yarmouth", lat: 43.84, lng: -66.12 },
];

{stations.map((s) => (
  <CircleMarker key={s.id} center={[s.lat, s.lng]} radius={10}
    pathOptions={{ color: "#4f46e5", fillColor: "#4f46e5", fillOpacity: 0.7 }}>
    <Popup>{s.name}</Popup>
  </CircleMarker>
))}
```

Same pattern as rendering cards — `key`, `.map()`, props from data.

> The bridge to what students already know: this is the same .map() pattern
> from Weeks 12-13. The only difference is the component you're rendering.

---

## SLIDE 7 — Demo: NS Weather Dashboard

> Open Week14/Lecture2/sample-code/  →  npm install recharts react-leaflet leaflet && npm run dev
>
> 1. Show the bar chart — point out ResponsiveContainer, dataKey, the data array
> 2. Edit one value in the data array live — chart updates immediately on save
> 3. Show the map — click a CircleMarker to open its Popup
> 4. Add a fifth station to the stations array — new dot appears on map
> 5. Open RainfallChart.jsx — trace: data → BarChart → Bar (dataKey="mm")
> 6. Open StationsMap.jsx — trace: stations.map() → CircleMarker → Popup

---

## SLIDE 8 — Activity 2

**Activity 2 — NSCC Campus Dashboard** (`Week14/Activity2/`)

Pre-built with six campuses. Your job:

- Swap the bar chart for a **line chart** (just change the component names)
- Add **two more campuses** to the data in both components
- Change the **map's starting zoom and center** so all campuses are visible
- Try a **pie chart** for the enrollment data

Mini challenges: colour bars by enrollment size (Cell), add a `<Tooltip>` with custom formatting

> ~20 min. The goal is fluency with data props and swapping chart types.
> The pattern is already working — students are just customising it.

---

## SLIDE 9 — Summary

- Recharts: drop-in JSX chart components — `<BarChart>`, `<LineChart>`, `<PieChart>`
- `dataKey` connects a component to a property in your data array
- `ResponsiveContainer` makes any chart fill its parent
- React Leaflet: `<MapContainer>` + `<TileLayer>` + markers — no API key needed
- `CircleMarker` → `<Popup>` for clickable markers
- Data → markers: same `.map()` pattern as rendering any list
- Charts re-render automatically when state changes — no manual `chart.update()` call

---

*End of Lecture 2*

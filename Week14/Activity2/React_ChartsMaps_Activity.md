# Week 14 — Activity 2: NSCC Campus Dashboard

## What You're Building

A two-panel dashboard showing NSCC campus data:
- Left: a bar chart of enrollment numbers
- Right: a map with markers at each campus location

The sample code is already working — your job is to customise and extend it.

---

## Setup

```bash
npm create vite@latest nscc-dashboard -- --template react
cd nscc-dashboard
npm install recharts react-leaflet leaflet
npm install
npm run dev
```

Copy in the files from `sample-code/`.

---

## Task 1 — Swap the Chart Type (5 min)

Open `EnrollmentChart.jsx`. Change the bar chart to a **line chart**:

```jsx
// Change these imports:
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Change the JSX:
<LineChart data={data} ...>
  <Line dataKey="students" stroke="#4f46e5" strokeWidth={2} dot={{ r: 5 }} />
</LineChart>
```

The data stays exactly the same — only the outer components change.

---

## Task 2 — Add Two More Campuses (10 min)

Add these campuses to **both** components (chart data AND map locations):

| Campus | City | Enrollment | Lat | Lng |
|--------|------|-----------|-----|-----|
| Lunenburg | Lunenburg | 620 | 44.378 | -64.317 |
| Strait Area | Port Hawkesbury | 890 | 45.619 | -61.347 |

In `EnrollmentChart.jsx` — add to the `data` array:
```js
{ campus: "Lunenburg",   students: 620 },
{ campus: "Strait Area", students: 890 },
```

In `CampusMap.jsx` — add to the `campuses` array:
```js
{ id: 7, name: "Lunenburg Campus",   city: "Lunenburg",         lat: 44.378, lng: -64.317 },
{ id: 8, name: "Strait Area Campus", city: "Port Hawkesbury",   lat: 45.619, lng: -61.347 },
```

---

## Task 3 — Adjust the Map View (5 min)

The new campuses might be cut off. Adjust `MapContainer` so all 8 are visible:

```jsx
<MapContainer center={[45.2, -63.8]} zoom={6} ...>
```

Try different `zoom` values (5–8) until all markers fit.

---

## Mini Challenges

### Challenge 1 — Colour Bars by Enrollment
Use `<Cell>` to colour bars differently based on whether enrollment is above or below 1000:

```jsx
import { Bar, Cell } from "recharts";

<Bar dataKey="students" radius={[4, 4, 0, 0]}>
  {data.map((entry, i) => (
    <Cell key={i} fill={entry.students >= 1000 ? "#4f46e5" : "#a5b4fc"} />
  ))}
</Bar>
```

### Challenge 2 — Try a Pie Chart
Replace the line/bar chart with a pie chart showing enrollment proportions:

```jsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLOURS = ["#4f46e5","#7c3aed","#a21caf","#be185d","#b45309","#047857","#0369a1","#374151"];

<PieChart>
  <Pie data={data} dataKey="students" nameKey="campus" outerRadius={120}>
    {data.map((_, i) => <Cell key={i} fill={COLOURS[i % COLOURS.length]} />)}
  </Pie>
  <Tooltip formatter={(v) => [v.toLocaleString(), "Students"]} />
  <Legend />
</PieChart>
```

### Challenge 3 — Custom Popup Content
Add enrollment numbers to each map popup:

```jsx
<Popup>
  <strong>{c.name}</strong><br />
  {c.city}<br />
  Enrollment: {c.students?.toLocaleString() ?? "N/A"}
</Popup>
```

This requires adding a `students` field to each campus object in `CampusMap.jsx`.

---

## Wrap-Up

- Recharts chart type = just swap the outer component names
- `dataKey` connects the chart to a property in your data
- Adding data = add to the array → chart and map update automatically
- `.map()` over data to render markers — same pattern as rendering cards

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const stations = [
  { id: 1, name: "Halifax",  lat: 44.65, lng: -63.57, avg: "1137 mm/yr" },
  { id: 2, name: "Truro",    lat: 45.36, lng: -63.27, avg: "1098 mm/yr" },
  { id: 3, name: "Sydney",   lat: 46.14, lng: -60.19, avg: "1374 mm/yr" },
  { id: 4, name: "Yarmouth", lat: 43.84, lng: -66.12, avg: "1380 mm/yr" },
];

function StationsMap() {
  return (
    <div>
      <h2>Weather Stations</h2>
      <MapContainer
        center={[45.2, -63.2]}
        zoom={6}
        style={{ height: "280px", borderRadius: "8px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {stations.map((s) => (
          <CircleMarker
            key={s.id}
            center={[s.lat, s.lng]}
            radius={10}
            pathOptions={{ color: "#4f46e5", fillColor: "#4f46e5", fillOpacity: 0.7 }}
          >
            <Popup>
              <strong>{s.name}</strong><br />
              Annual average: {s.avg}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default StationsMap;

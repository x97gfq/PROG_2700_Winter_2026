import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const campuses = [
  { id: 1, name: "Waterfront Campus", city: "Halifax",    lat: 44.646, lng: -63.573 },
  { id: 2, name: "IT Campus",         city: "Halifax",    lat: 44.668, lng: -63.615 },
  { id: 3, name: "Pictou Campus",     city: "Pictou",     lat: 45.677, lng: -62.706 },
  { id: 4, name: "Truro Campus",      city: "Truro",      lat: 45.364, lng: -63.257 },
  { id: 5, name: "Kingstec Campus",   city: "Kentville",  lat: 45.075, lng: -64.494 },
  { id: 6, name: "Burridge Campus",   city: "Yarmouth",   lat: 43.837, lng: -66.102 },
];

function CampusMap() {
  return (
    <div>
      <h2>Campus Locations</h2>
      <MapContainer
        center={[45.0, -63.5]}
        zoom={6}
        style={{ height: "280px", borderRadius: "8px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {campuses.map((c) => (
          <CircleMarker
            key={c.id}
            center={[c.lat, c.lng]}
            radius={10}
            pathOptions={{ color: "#4f46e5", fillColor: "#4f46e5", fillOpacity: 0.75 }}
          >
            <Popup>
              <strong>{c.name}</strong><br />{c.city}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CampusMap;

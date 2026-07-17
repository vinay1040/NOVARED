import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const JODHPUR_CENTER = [26.2389, 73.0243];

function BloodMap({ showCamps = false, showBank = true }) {
  const [banks, setBanks] = useState([]);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    if (showBank) {
      fetch("http://127.0.0.1:5000/api/map/blood-banks")
        .then((res) => res.json())
        .then((data) => setBanks(data))
        .catch(() => setBanks([]));
    }

    if (showCamps) {
      fetch("http://127.0.0.1:5000/api/map/camps")
        .then((res) => res.json())
        .then((data) => setCamps(data))
        .catch(() => setCamps([]));
    }
  }, [showCamps, showBank]);

  return (
    <div className="rounded-[20px] overflow-hidden border border-ink/10" style={{ height: "480px" }}>
      <MapContainer center={JODHPUR_CENTER} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showBank && banks.map((bank) => (
          <Marker key={`bank-${bank.id}`} position={[bank.lat, bank.lng]}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{bank.name}</p>
                <p className="text-xs text-stone-500">{bank.city}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {showCamps &&
          camps.map((camp) => (
            <Marker key={`camp-${camp.id}`} position={[camp.lat, camp.lng]}>
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{camp.title}</p>
                  <p className="text-xs text-stone-500">{camp.date} · {camp.time}</p>
                  <p className="text-xs text-stone-500">{camp.venue}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default BloodMap;
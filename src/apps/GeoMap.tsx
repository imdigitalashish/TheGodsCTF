import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { servers } from "@/data/world";
import { useGame } from "@/store/gameStore";

interface Pin { lat: number; lng: number; label: string }

function Flyer({ target }: { target: Pin | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 11, { duration: 0.8 });
  }, [target, map]);
  return null;
}

export function GeoMap() {
  const showToast = useGame((s) => s.showToast);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [pins, setPins] = useState<Pin[]>([]);
  const [target, setTarget] = useState<Pin | null>(null);
  const [showServers, setShowServers] = useState(false);

  const plot = () => {
    const la = parseFloat(lat), ln = parseFloat(lng);
    if (Number.isNaN(la) || Number.isNaN(ln)) { showToast("Enter a valid lat, lng"); return; }
    const pin: Pin = { lat: la, lng: ln, label: `${la.toFixed(4)}, ${ln.toFixed(4)}` };
    setPins((p) => [...p, pin]);
    setTarget(pin);
  };

  return (
    <div className="map">
      <div className="map-bar">
        <input placeholder="lat e.g. 28.5869" value={lat} onChange={(e) => setLat(e.target.value)} style={{ width: 150 }} />
        <input placeholder="lng e.g. 77.1922" value={lng} onChange={(e) => setLng(e.target.value)} style={{ width: 150 }} />
        <button onClick={plot}>PLOT</button>
        <button onClick={() => { setShowServers((v) => !v); showToast(showServers ? "Servers hidden" : "Plotted 25 servers — the red one is the leak."); }}>
          {showServers ? "hide servers" : "show servers"}
        </button>
        <span style={{ color: "var(--ink-dim)", fontSize: 11 }}>drop decoded coords to find the scene</span>
      </div>
      <MapContainer className="leaflet" center={[23.5, 80]} zoom={5} zoomControl attributionControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <Flyer target={target} />
        {pins.map((p, i) => (
          <CircleMarker key={i} center={[p.lat, p.lng]} radius={9} pathOptions={{ color: "#ff3b46", fillColor: "#ff3b46", fillOpacity: 0.6 }}>
            <Tooltip permanent direction="top">{p.label}</Tooltip>
          </CircleMarker>
        ))}
        {showServers && servers.map((s) => (
          <CircleMarker
            key={s.id}
            center={[s.lat, s.lng]}
            radius={s.hidden ? 11 : 4 + s.txGbps / 30}
            pathOptions={{ color: s.hidden ? "#ff3b46" : "#36e0c8", fillColor: s.hidden ? "#ff3b46" : "#36e0c8", fillOpacity: 0.5, weight: s.hidden ? 2 : 1 }}
            eventHandlers={{ click: () => s.hidden && showToast("Anomaly: Noida, Phase-2, Dadri Road", "win") }}
          >
            <Tooltip direction="top">{s.id} · {s.city} · {s.txGbps}Gbps{s.hidden ? " ⚠" : ""}</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

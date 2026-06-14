import { useState } from "react";
import { elements } from "@/data/world";
import { useWindows } from "@/store/windowStore";

const keys = Object.keys(elements);

function coordFrom(symbol: string): string {
  const e = elements[symbol]!;
  return `${e.z}.${String(e.w).replace(".", "").slice(0, 4)}`;
}
function caesar(s: string, k: number): string {
  return s.replace(/[a-z]/gi, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + k + 26) % 26) + base);
  });
}
function atbash(s: string): string {
  return s.replace(/[a-z]/gi, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(base + 25 - (ch.charCodeAt(0) - base));
  });
}

export function Lab(_props: { focusTool?: string }) {
  const open = useWindows((s) => s.open);
  const [latEl, setLatEl] = useState("Ni");
  const [lngEl, setLngEl] = useState("Ir");
  const [eltOut, setEltOut] = useState("—");
  const [cipIn, setCipIn] = useState("");
  const [cipMode, setCipMode] = useState("caesar");
  const [cipShift, setCipShift] = useState(3);
  const [cipOut, setCipOut] = useState("—");

  const lat = coordFrom(latEl), lng = coordFrom(lngEl);
  const isTarget = lat === "28.5869" && lng === "77.1922";

  const decode = () => {
    if (cipMode === "caesar") setCipOut(caesar(cipIn, -cipShift));
    else if (cipMode === "atbash") setCipOut(atbash(cipIn));
    else setCipOut(cipIn.split("").reverse().join(""));
  };

  return (
    <div className="lab">
      <div className="panel">
        <h3>🧬 PERIODIC DECODER</h3>
        <p style={{ color: "var(--ink-dim)", fontSize: 11.5, margin: "0 0 8px" }}>
          Killers hide coordinates in trace elements: <b style={{ color: "var(--amber)" }}>atomic number . digits-of-atomic-weight</b>. Pick two elements to build a coordinate.
        </p>
        <div className="row">
          <span>LAT:</span>
          <select value={latEl} onChange={(e) => setLatEl(e.target.value)}>
            {keys.map((k) => <option key={k} value={k}>{k} (Z={elements[k]!.z})</option>)}
          </select>
          <span>LNG:</span>
          <select value={lngEl} onChange={(e) => setLngEl(e.target.value)}>
            {keys.map((k) => <option key={k} value={k}>{k} (Z={elements[k]!.z})</option>)}
          </select>
        </div>
        <div className="out">→ <b>{lat}, {lng}</b> {isTarget ? "✔ resolves to Delhi — that's the DEAD MAN'S CIPHER flag!" : "(plot it on the map to confirm)"}</div>
        <div className="ptable">
          {keys.map((k) => (
            <div key={k} className="elt" onClick={() => setEltOut(`${k} = ${elements[k]!.name} · Z=${elements[k]!.z} · weight ${elements[k]!.w}`)}>
              <div className="sym">{k}</div>
              <div className="z">Z={elements[k]!.z}</div>
              <div className="w">{elements[k]!.w}</div>
            </div>
          ))}
        </div>
        <div className="out">{eltOut}</div>
      </div>

      <div className="panel">
        <h3>🔡 CIPHER BENCH</h3>
        <div className="row">
          <input placeholder="text…" value={cipIn} onChange={(e) => setCipIn(e.target.value)} style={{ flex: 1 }} />
          <select value={cipMode} onChange={(e) => setCipMode(e.target.value)}>
            <option value="caesar">Caesar shift</option>
            <option value="atbash">Atbash</option>
            <option value="rev">Reverse</option>
          </select>
          <input type="number" value={cipShift} onChange={(e) => setCipShift(parseInt(e.target.value) || 0)} style={{ width: 64 }} />
        </div>
        <div className="row"><button onClick={decode}>DECODE</button><div className="out">{cipOut}</div></div>
      </div>

      <div className="panel">
        <h3>📐 COORD → SUBMIT</h3>
        <p style={{ color: "var(--ink-dim)", fontSize: 11.5, margin: "0 0 8px" }}>
          Built a coordinate? Open the Map to confirm the city, then submit it as the mission flag.
        </p>
        <div className="row">
          <button onClick={() => open({ id: "map", title: "GEO-MAP", icon: "🗺" })}>🗺 open map</button>
          <button onClick={() => open({ id: "cases", title: "CAMPAIGN", icon: "🗂", w: 860, h: 560 })}>🗂 campaign</button>
        </div>
      </div>
    </div>
  );
}

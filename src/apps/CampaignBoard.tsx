import { type CSSProperties } from "react";
import { acts, missions, characters } from "@/data/campaign";
import { useGame } from "@/store/gameStore";
import { useWindows } from "@/store/windowStore";
import type { Mission } from "@/types";

const charById = Object.fromEntries(characters.map((c) => [c.id, c]));
const roman = ["", "I", "II", "III", "IV"];

export function CampaignBoard() {
  const solved = useGame((s) => s.solved);
  const open = useWindows((s) => s.open);

  const openMission = (m: Mission) =>
    open({ id: `mission:${m.code}`, title: `${m.codename}`, icon: "🔎", payload: m.code, w: 900, h: 600 });

  return (
    <div className="camp">
      {acts.map((act) => (
        <div className="act" key={act.id}>
          <div className="act-h">
            <span className="num">ACT {roman[act.order]}</span>
            <span className="ti">{act.title}</span>
          </div>
          <div className="act-sub">{act.subtitle}</div>
          <div className="mission-row">
            {missions
              .filter((m) => m.actId === act.id)
              .map((m) => {
                const ch = charById[m.characterId]!;
                const done = solved.includes(m.code);
                const style = { "--c": ch.color } as CSSProperties;
                return (
                  <div key={m.code} className={`mcard${done ? " solved" : ""}`} style={style} onClick={() => openMission(m)}>
                    <div className="op">OPERATION</div>
                    <div className="cn">{m.codename}</div>
                    <div className="src">“{m.title}”</div>
                    <div className="by"><span>{ch.glyph}</span><span>{ch.name}</span></div>
                    <div className="meta">
                      <span className={`tag ${m.difficulty}`}>{m.difficulty}</span>
                      {m.labTool !== "none" && <span className="tag">🧪 {m.labTool}</span>}
                    </div>
                    <div className="pts">{m.points}pt</div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

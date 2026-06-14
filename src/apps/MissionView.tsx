import { useMemo, useState, type CSSProperties } from "react";
import type { Mission } from "@/types";
import { characters } from "@/data/campaign";
import { useGame } from "@/store/gameStore";
import { useWindows } from "@/store/windowStore";

const charById = Object.fromEntries(characters.map((c) => [c.id, c]));

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (i * 7 + seed) % (i + 1);
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function MissionView({ mission }: { mission: Mission }) {
  const mode = useGame((s) => s.mode);
  const solvedList = useGame((s) => s.solved);
  const capture = useGame((s) => s.capture);
  const buyHint = useGame((s) => s.buyHint);
  const open = useWindows((s) => s.open);

  const solved = solvedList.includes(mission.code);
  const pro = mode === "pro";
  const ch = charById[mission.characterId]!;
  const cstyle = { "--c": ch.color } as CSSProperties;

  const [value, setValue] = useState(solved ? mission.flag : "");
  const [verdict, setVerdict] = useState<null | "ok" | "no">(solved ? "ok" : null);
  const [hints, setHints] = useState<string[]>([]);
  const [walk, setWalk] = useState(false);
  const mcq = useMemo(() => shuffle(mission.mcqOptions, mission.order + 3), [mission]);

  const submit = (val: string) => {
    const res = capture(mission, val);
    if (res.correct) { setValue(mission.flag); setVerdict("ok"); }
    else setVerdict("no");
  };

  const useHint = () => {
    const r = buyHint(mission);
    if (!r) { setHints((h) => [...h, "— no more hints —"]); return; }
    setHints((h) => [...h, `💡 (-${r.cost}pts) ${r.text}`]);
  };

  const tools = (
    <div className="toolbar">
      {mission.labTool !== "none" && (
        <button className="tool-btn" onClick={() => open({ id: "lab", title: "FORENSIC LAB", icon: "🧪", payload: mission.labTool })}>
          🧪 open {mission.labTool}
        </button>
      )}
      {mission.code === "S2E07" && (
        <button className="tool-btn" onClick={() => open({ id: "network", title: "SERVER MAP · SPELL NOTION", icon: "🌐" })}>🌐 server map</button>
      )}
      {(mission.labTool === "map" || mission.code === "S1E07") && (
        <button className="tool-btn" onClick={() => open({ id: "map", title: "GEO-MAP", icon: "🗺" })}>🗺 geo-map</button>
      )}
      <button className="tool-btn hint" onClick={useHint}>💡 hint</button>
      <button className="tool-btn" onClick={() => setWalk(true)}>📖 reveal walkthrough</button>
    </div>
  );

  return (
    <div className="mv" style={cstyle}>
      <div className="op">OPERATION</div>
      <h2>{mission.codename}</h2>
      <div className="src">based on “{mission.title}”</div>
      <div className="byline">
        <span className="av">{ch.glyph}</span>
        <span>Playing as <b>{ch.name}</b> · {ch.role} · <span className={`tag ${mission.difficulty}`}>{mission.difficulty}</span> · {mission.points} pts</span>
      </div>

      <div className="intro">{mission.intro}</div>
      <div className="brief">{mission.briefing}</div>

      <div className="sec-h">EVIDENCE BOARD{pro ? " · professional (no markers)" : ""}</div>
      <div className="evgrid">
        {mission.evidence.map((e) => {
          const herr = e.redHerring && !pro;
          return (
            <div key={e.id} className={`ev${herr ? " herring" : ""}`}>
              {herr && <span className="herald">⚑ possible red herring</span>}
              <div className="lab"><span>{e.label}</span><span className={`typ ${e.type}`}>{e.type}</span></div>
              <div className="txt">{e.text}</div>
            </div>
          );
        })}
      </div>

      {tools}

      <div className="hints">
        {hints.map((h, i) => <div className="hintline" key={i}>{h}</div>)}
        {walk && (
          <div className="hintline walk">
            <b>WALKTHROUGH</b>
            {mission.solutionSteps.map((s, i) => <div key={i}>{i + 1}. {s}</div>)}
          </div>
        )}
      </div>

      <div className="flagbox">
        <div className="q">🚩 {mission.flagQuestion}</div>
        <div className="fmt">format: {mission.flagFormat}</div>
        <div className="flag-row">
          <input
            value={value}
            disabled={solved}
            placeholder="enter flag…"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit(value); }}
          />
          <button className="submit" disabled={solved} onClick={() => submit(value)}>CAPTURE</button>
        </div>
        {!pro && !solved && (
          <div className="mcq">
            {mcq.map((o) => <button key={o} onClick={() => submit(o)}>{o}</button>)}
          </div>
        )}
        {verdict === "ok" && <div className="verdict ok">✔ FLAG CAPTURED — {mission.flag}</div>}
        {verdict === "no" && <div className="verdict no">✘ Incorrect. Cross-reference the evidence and try again.</div>}
      </div>

      {solved && <div className="outro" style={{ marginTop: 18 }}>{mission.outro}</div>}
    </div>
  );
}

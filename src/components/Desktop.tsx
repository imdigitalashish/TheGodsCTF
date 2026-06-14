import { useEffect, useState } from "react";
import { useGame } from "@/store/gameStore";
import { useWindows, type AppId, type WinState } from "@/store/windowStore";
import { rankFor, nextRank } from "@/data/world";
import { missions } from "@/data/campaign";
import { WindowFrame } from "@/components/WindowFrame";
import { Terminal } from "@/apps/Terminal";
import { CampaignBoard } from "@/apps/CampaignBoard";
import { MissionView } from "@/apps/MissionView";
import { ServerMap } from "@/apps/ServerMap";
import { GeoMap } from "@/apps/GeoMap";
import { Lab } from "@/apps/Lab";

const LAUNCHER: { app: AppId; icon: string; label: string; title: string }[] = [
  { app: "terminal", icon: "🖥", label: "Terminal", title: "TERMINAL" },
  { app: "cases", icon: "🗂", label: "Campaign", title: "CAMPAIGN" },
  { app: "network", icon: "🌐", label: "Server Map", title: "SERVER MAP · SPELL NOTION" },
  { app: "map", icon: "🗺", label: "Geo-Map", title: "GEO-MAP" },
  { app: "lab", icon: "🧪", label: "Forensic Lab", title: "FORENSIC LAB" },
];

function renderContent(win: WinState) {
  if (win.id === "terminal") return <Terminal />;
  if (win.id === "cases") return <CampaignBoard />;
  if (win.id === "network") return <ServerMap />;
  if (win.id === "map") return <GeoMap />;
  if (win.id === "lab") return <Lab focusTool={win.payload} />;
  if (typeof win.id === "string" && win.id.startsWith("mission:")) {
    const mission = missions.find((m) => m.code === win.payload);
    if (mission) return <MissionView mission={mission} />;
  }
  return null;
}

export function Desktop() {
  const score = useGame((s) => s.score);
  const solved = useGame((s) => s.solved);
  const mode = useGame((s) => s.mode);
  const muted = useGame((s) => s.muted);
  const toggleMute = useGame((s) => s.toggleMute);
  const reset = useGame((s) => s.reset);
  const { windows, open, toggleMin, focus } = useWindows();
  const [clock, setClock] = useState("");

  // open signature apps once on entry
  useEffect(() => {
    open({ id: "terminal", title: "TERMINAL", icon: "🖥", w: 720, h: 440 });
    open({ id: "cases", title: "CAMPAIGN", icon: "🗂", w: 860, h: 560 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => setClock(new Date(Date.now()).toLocaleTimeString()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const rank = rankFor(score);
  const next = nextRank(score);
  const topZ = Math.max(0, ...windows.map((w) => w.z));

  const launch = (l: (typeof LAUNCHER)[number]) =>
    open({ id: l.app, title: l.title, icon: l.icon, ...(l.app === "cases" ? { w: 860, h: 560 } : {}) });

  return (
    <div className="desktop">
      <div className="topbar">
        <span className="brand">ASUR<b>OS</b></span>
        <span className="pill rank">rank <b>{rank.icon} {rank.name}</b></span>
        <span className="pill">score <b>{score} pts</b></span>
        <span className="pill">missions <b>{solved.length}/{missions.length}</b></span>
        <span className="pill">mode <b>{mode === "pro" ? "PRO" : "STUDENT"}</b></span>
        <span className="pill">{next ? `next: ${next.name} @ ${next.min}` : "MAX RANK"}</span>
        <span className="spacer" />
        <span className="pill click" onClick={toggleMute}>{muted ? "🔇 off" : "🔊 on"}</span>
        <span className="clock">{clock}</span>
      </div>

      <div className="stage">
        <div className="launcher">
          {LAUNCHER.map((l) => (
            <div key={l.app} className="dicon" onClick={() => launch(l)}>
              <span className="g">{l.icon}</span>
              <span className="lbl">{l.label}</span>
            </div>
          ))}
        </div>

        <div className="wm-mark">
          <div className="big">🜲 ASUR</div>
          WELCOME TO YOUR DARK SIDE<br />PROJECT EQUILIBRIUM
        </div>

        {windows.map((win) => (
          <WindowFrame key={win.id} win={win} focused={win.z === topZ}>
            {renderContent(win)}
          </WindowFrame>
        ))}
      </div>

      <div className="taskbar">
        <button className="start" onClick={() => launch(LAUNCHER[1]!)}>⊞ CAMPAIGN</button>
        {windows.map((win) => (
          <button
            key={win.id}
            className={`task${win.z === topZ && !win.minimized ? " active" : ""}`}
            onClick={() => (win.minimized ? (toggleMin(win.id), focus(win.id)) : win.z === topZ ? toggleMin(win.id) : focus(win.id))}
          >
            <span>{win.icon}</span>
            <span>{win.title}</span>
          </button>
        ))}
        <span className="spacer" />
        <span className="hint">dbl-click bar to maximise · `help` in terminal</span>
        <button className="start" style={{ color: "var(--ink-dim)" }} onClick={() => { if (confirm("Wipe all progress and restart?")) reset(); }}>⟲ reset</button>
      </div>
    </div>
  );
}

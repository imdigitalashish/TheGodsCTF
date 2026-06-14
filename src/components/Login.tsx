import { useState, type CSSProperties } from "react";
import { useGame } from "@/store/gameStore";
import { characters } from "@/data/campaign";
import type { CharacterId, Mode } from "@/types";
import { audio } from "@/engine/audio";

export function Login() {
  const enter = useGame((s) => s.enter);
  const shubhUnlocked = useGame((s) => s.shubhUnlocked);
  const savedMode = useGame((s) => s.mode);
  const savedChar = useGame((s) => s.activeCharacter);
  const [mode, setMode] = useState<Mode>(savedMode);
  const [char, setChar] = useState<CharacterId>(savedChar === "shubh" && !shubhUnlocked ? "nikhil" : savedChar);

  return (
    <div className="login">
      <div className="mask">🜲</div>
      <div className="crest">
        THE GODS CTF
        <small>FORENSIC DEDUCTION ENGINE · ASUROS</small>
      </div>

      <h2>SELECT YOUR INVESTIGATOR</h2>
      <p className="lead">Each operative reads the evidence differently. You can switch between missions.</p>

      <div className="char-grid">
        {characters.map((c) => {
          const locked = c.locked && !shubhUnlocked;
          const style = { "--c": c.color } as CSSProperties;
          return (
            <div
              key={c.id}
              className={`char${char === c.id ? " sel" : ""}${locked ? " locked" : ""}`}
              style={style}
              onClick={() => {
                if (locked) return;
                audio.tick();
                setChar(c.id);
              }}
            >
              {locked && <span className="lockbadge">🔒 LOCKED</span>}
              <div className="glyph">{c.glyph}</div>
              <div className="nm">{c.name}</div>
              <div className="role">{c.role}</div>
              <div className="tag">{c.tagline}</div>
              <span className="lens">{c.lens}</span>
              <div className="lensd">{locked ? "Clear the campaign to unlock." : c.lensDescription}</div>
            </div>
          );
        })}
      </div>

      <div className="modes">
        <div className={`mode student${mode === "student" ? " active" : ""}`} onClick={() => { audio.tick(); setMode("student"); }}>
          <div className="t">STUDENT</div>
          <div className="d">Red herrings flagged · multiple-choice assist · cheaper hints.</div>
        </div>
        <div className={`mode pro${mode === "pro" ? " active" : ""}`} onClick={() => { audio.tick(); setMode("pro"); }}>
          <div className="t">PROFESSIONAL</div>
          <div className="d">Raw evidence · no markers · free-text flags only. Earn your rank.</div>
        </div>
      </div>

      <button className="btn" onClick={() => enter(mode, char)}>▶ ENTER ASUROS</button>
      <div style={{ color: "var(--ink-dim)", fontSize: 11, letterSpacing: 2 }}>"THE DEAD CAN TALK."</div>
    </div>
  );
}

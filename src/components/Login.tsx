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
      {/* Dynamic scoped styles for the button animation */}
      <style>{`
        .btn-animated {
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          overflow: hidden;
        }

        .btn-animated .arrow {
          display: inline-block;
          transition: transform 0.3s ease;
          margin-right: 6px;
        }

        /* Hover State */
        .btn-animated:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 15px var(--c, rgba(255, 255, 255, 0.3));
          letter-spacing: 3px;
          filter: brightness(1.2);
        }

        .btn-animated:hover .arrow {
          transform: translateX(4px);
        }

        /* Active/Click State */
        .btn-animated:active {
          transform: translateY(1px) scale(0.98);
          box-shadow: 0 0 5px var(--c, rgba(255, 255, 255, 0.1));
        }
      `}</style>

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

      {/* Enhanced Button */}
      <button 
        className="btn btn-animated" 
        onClick={() => enter(mode, char)}
        style={{ "--c": "var(--ink-main)" } as CSSProperties} // Optional fallback if your CSS uses specific theme variables
      >
        <span className="arrow">▶</span> ENTER ASUROS
      </button>

      <div style={{ color: "var(--ink-dim)", fontSize: 11, letterSpacing: 2 }}>"THE DEAD CAN TALK."</div>
    </div>
  );
}
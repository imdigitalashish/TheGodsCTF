import { useGame } from "@/store/gameStore";
import { missions } from "@/data/campaign";
import { rankFor } from "@/data/world";

export function Victory() {
  const victory = useGame((s) => s.victory);
  const score = useGame((s) => s.score);
  const mode = useGame((s) => s.mode);
  const dismiss = useGame((s) => s.dismissVictory);
  if (!victory) return null;
  const rank = rankFor(score);

  return (
    <div className="victory">
      <div className="vic">
        <div className="mask" style={{ fontSize: 62 }}>🜲</div>
        <div className="vt">OPERATION EQUILIBRIUM</div>
        <div className="vs">— C O M P L E T E —</div>
        <div className="vic-stats">
          <div className="s"><div className="n">{score}</div><div className="l">FINAL SCORE</div></div>
          <div className="s"><div className="n">{rank.icon}</div><div className="l">{rank.name.toUpperCase()}</div></div>
          <div className="s"><div className="n">{missions.length}/{missions.length}</div><div className="l">MISSIONS</div></div>
          <div className="s"><div className="n">{mode.toUpperCase()}</div><div className="l">MODE</div></div>
        </div>
        <div className="vq">"For Kali, every ending is a new beginning."</div>
        <div className="unlock">🜲 NEW INVESTIGATOR UNLOCKED — replay the hunt as SHUBH</div>
        <button className="btn ghost" onClick={dismiss}>▣ RETURN TO ASUROS</button>
      </div>
    </div>
  );
}

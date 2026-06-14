import { useEffect, useState } from "react";
import { useGame } from "@/store/gameStore";
import { BOOT_LINES } from "@/data/world";
import { audio } from "@/engine/audio";

export function Boot() {
  const setPhase = useGame((s) => s.setPhase);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= BOOT_LINES.length) {
      const t = window.setTimeout(() => setPhase("login"), 500);
      return () => window.clearTimeout(t);
    }
    const line = BOOT_LINES[n]!;
    audio.bootLine();
    const t = window.setTimeout(() => setN((v) => v + 1), 130 + Math.min(180, line.length * 4));
    return () => window.clearTimeout(t);
  }, [n, setPhase]);

  return (
    <div className="boot" onClick={() => setPhase("login")}>
      {BOOT_LINES.slice(0, n).join("\n")}
      {"\n"}
      <span className="cursor" />
    </div>
  );
}

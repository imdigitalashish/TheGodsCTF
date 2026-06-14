import { useRef, type ReactNode, type CSSProperties } from "react";
import { useWindows, type WinState } from "@/store/windowStore";

export function WindowFrame({ win, focused, children }: { win: WinState; focused: boolean; children: ReactNode }) {
  const { focus, close, toggleMin, toggleMax, move } = useWindows();
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  const onBarDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("win-dot")) return;
    focus(win.id);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y };
    const onMove = (ev: MouseEvent) => {
      if (!drag.current) return;
      const nx = Math.max(-40, Math.min(drag.current.ox + ev.clientX - drag.current.sx, window.innerWidth - 80));
      const ny = Math.max(0, Math.min(drag.current.oy + ev.clientY - drag.current.sy, window.innerHeight - 110));
      move(win.id, nx, ny);
    };
    const onUp = () => {
      drag.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const style: CSSProperties = win.maximized
    ? { left: 8, top: 6, width: "calc(100vw - 16px)", height: "calc(100vh - 90px)", zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  if (win.minimized) return null;

  return (
    <div className={`win${focused ? " focus" : ""}`} style={style} onMouseDown={() => focus(win.id)}>
      <div className="win-bar" onMouseDown={onBarDown} onDoubleClick={() => toggleMax(win.id)}>
        <span className="ic">{win.icon}</span>
        <span className="ti">{win.title}</span>
        <span className="grow" />
        <button className="win-dot d-min" title="minimise" onClick={(e) => { e.stopPropagation(); toggleMin(win.id); }} />
        <button className="win-dot d-max" title="maximise" onClick={(e) => { e.stopPropagation(); toggleMax(win.id); }} />
        <button className="win-dot d-close" title="close" onClick={(e) => { e.stopPropagation(); close(win.id); }} />
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}

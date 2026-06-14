import { useEffect, useRef, useState } from "react";
import { servers } from "@/data/world";
import { useGame } from "@/store/gameStore";
import { useWindows } from "@/store/windowStore";

const LAT0 = 7, LAT1 = 32, LNG0 = 68, LNG1 = 93;

interface Tip { x: number; y: number; html: string }

export function ServerMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const showToast = useGame((s) => s.showToast);
  const open = useWindows((s) => s.open);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const maxTx = Math.max(...servers.map((s) => s.txGbps));
    let raf = 0;
    let t = 0;
    let dims = { w: 0, h: 0 };

    const fit = () => {
      const r = canvas.getBoundingClientRect();
      dims = { w: r.width, h: r.height };
      canvas.width = r.width * devicePixelRatio;
      canvas.height = r.height * devicePixelRatio;
    };
    const project = () =>
      servers.map((s) => ({
        s,
        x: 40 + ((s.lng - LNG0) / (LNG1 - LNG0)) * (dims.w - 80),
        y: 40 + (1 - (s.lat - LAT0) / (LAT1 - LAT0)) * (dims.h - 80),
      }));
    let nodes = project();

    const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
    const quad = (a: number, b: number, c: number, p: number) => {
      const m = 1 - p;
      return m * m * a + 2 * m * p * b + p * p * c;
    };

    const draw = () => {
      const { w, h } = dims;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const hub = { x: w / 2, y: h * 0.5 };
      t += 0.03;

      nodes.forEach((n) => {
        const lw = 0.4 + (n.s.txGbps / maxTx) * 4;
        ctx.strokeStyle = n.s.hidden ? `rgba(255,59,70,${0.5 + 0.3 * Math.sin(t * 2)})` : "rgba(54,224,200,0.10)";
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.quadraticCurveTo((n.x + hub.x) / 2, (n.y + hub.y) / 2 - 18, hub.x, hub.y);
        ctx.stroke();
        if (n.s.hidden) {
          const p = (t * 0.25) % 1;
          ctx.fillStyle = "#ff3b46";
          ctx.beginPath();
          ctx.arc(lerp(n.x, hub.x, p), quad(n.y, (n.y + hub.y) / 2 - 18, hub.y, p), 3, 0, 7);
          ctx.fill();
        }
      });

      ctx.fillStyle = "#1a2a2e";
      ctx.beginPath(); ctx.arc(hub.x, hub.y, 9, 0, 7); ctx.fill();
      ctx.strokeStyle = "#36e0c8"; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = "#6f8c89"; ctx.font = "10px JetBrains Mono"; ctx.textAlign = "center";
      ctx.fillText("exfil endpoint", hub.x, hub.y + 22);

      nodes.forEach((n) => {
        const base = 4 + (n.s.txGbps / maxTx) * 14;
        if (n.s.hidden) {
          const pulse = base + 6 + 4 * Math.sin(t * 3);
          ctx.fillStyle = "rgba(255,59,70,0.18)";
          ctx.beginPath(); ctx.arc(n.x, n.y, pulse + 8, 0, 7); ctx.fill();
          ctx.fillStyle = "#ff3b46";
        } else {
          ctx.fillStyle = n.s.size === "big" ? "#36e0c8" : "#2b6b62";
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, n.s.hidden ? base + 4 : base, 0, 7); ctx.fill();
        if (n.s.size === "big" || n.s.hidden) {
          ctx.fillStyle = n.s.hidden ? "#ffd3d6" : "#8ff3e7"; ctx.font = "9px JetBrains Mono";
          ctx.fillText(n.s.id, n.x, n.y - base - 6);
        }
      });
      raf = requestAnimationFrame(draw);
    };

    const hit = (mx: number, my: number) => {
      const anomaly = nodes.find((n) => n.s.hidden);
      if (anomaly && Math.hypot(anomaly.x - mx, anomaly.y - my) < 24) return anomaly;
      let best: (typeof nodes)[number] | null = null;
      let bd = 15;
      nodes.forEach((n) => { const d = Math.hypot(n.x - mx, n.y - my); if (d < bd) { bd = d; best = n; } });
      return best;
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const n = hit(e.clientX - r.left, e.clientY - r.top);
      if (n) {
        canvas.style.cursor = "pointer";
        setTip({
          x: e.clientX - r.left + 14,
          y: e.clientY - r.top + 14,
          html: `<b>${n.s.id}</b> · ${n.s.size}<br>${n.s.city}<br>outgoing: <b>${n.s.txGbps} Gbps</b>${n.s.hidden ? "<br><span class='tr'>⚠ 10× anomaly — click to TRACE</span>" : ""}`,
        });
      } else { canvas.style.cursor = "default"; setTip(null); }
    };
    const onLeave = () => setTip(null);
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const n = hit(e.clientX - r.left, e.clientY - r.top);
      if (!n) return;
      if (n.s.hidden) {
        showToast(`🎯 Traced ${n.s.id} → <b>${n.s.city}</b>`, "win");
        open({ id: "mission:S2E07", title: "THE INVISIBLE FIFTH", icon: "🔎", payload: "S2E07", w: 900, h: 600 });
      } else {
        showToast(`${n.s.id} (${n.s.city}) — traffic nominal.`);
      }
    };

    const onResize = () => { fit(); nodes = project(); };

    fit();
    nodes = project();
    draw();
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);
    const ro = new ResizeObserver(onResize);
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
      ro.disconnect();
    };
  }, [showToast, open]);

  return (
    <div className="net" ref={wrapRef}>
      <div className="net-head">
        Spell Notion fleet — <b>25 nodes</b> · outgoing traffic = node size &amp; glow. One node bleeds{" "}
        <b>~10× data</b> to an unknown endpoint. Click it to trace and capture <b>THE INVISIBLE FIFTH</b>.
      </div>
      <canvas ref={canvasRef} />
      {tip && <div className="net-tip" style={{ left: tip.x, top: tip.y }} dangerouslySetInnerHTML={{ __html: tip.html }} />}
    </div>
  );
}

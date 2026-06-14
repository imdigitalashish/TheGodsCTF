import { useEffect, useRef, useState } from "react";
import { useGame } from "@/store/gameStore";
import { useWindows } from "@/store/windowStore";
import { missions } from "@/data/campaign";
import { servers, elements, rankFor } from "@/data/world";
import type { Mission } from "@/types";

const CMDS = ["help", "whoami", "clear", "ls", "cd", "cat", "missions", "open", "scan", "trace", "decode", "elements", "hint", "submit", "status"];

function esc(s: string): string {
  return s.replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]!));
}
function pad(s: string | number, n: number): string {
  const str = String(s);
  return str.length >= n ? str + " " : str + " ".repeat(n - str.length);
}
function findMission(code?: string): Mission | undefined {
  if (!code) return undefined;
  return missions.find((m) => m.code.toLowerCase() === code.toLowerCase() || m.codename.toLowerCase() === code.toLowerCase());
}

export function Terminal() {
  const [lines, setLines] = useState<string[]>([
    `<span class="dim">AsurOS shell — type </span><span class="acc">help</span><span class="dim"> to begin. Tools: open missions|network|map|lab</span>`,
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("/");
  const history = useRef<string[]>([]);
  const hIdx = useRef(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useWindows((s) => s.open);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const print = (html: string) => setLines((l) => [...l, html]);

  const fsDirs: Record<string, Record<string, string>> = {
    "/": {
      "readme.txt": "AGENT — type `help`. Work each mission in /cases, study /evidence, then `submit <CODE> <flag>`.",
      "manifest.txt": "Operation PROJECT EQUILIBRIUM · Adversary: 'Shubh' (Kali) · AI backbone: Spell Notion.",
    },
    "/cases": Object.fromEntries(
      missions.map((m) => [
        `${m.code}.case`,
        `${m.codename} — “${m.title}” [${m.difficulty}, ${m.points}pt]\nQ: ${m.flagQuestion}\nformat: ${m.flagFormat}`,
      ]),
    ),
    "/evidence": Object.fromEntries(
      missions.map((m) => [`${m.code}.txt`, m.evidence.map((e) => `[${e.type}] ${e.label}: ${e.text}`).join("\n\n")]),
    ),
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    print(`<span class="pr">nikhil@asur:${cwd}$</span> <span class="usr">${esc(cmd)}</span>`);
    if (!cmd) return;
    history.current.push(cmd);
    hIdx.current = -1;
    const parts = cmd.match(/(?:[^\s"]+|"[^"]*")+/g)?.map((s) => s.replace(/^"|"$/g, "")) ?? [];
    const c = (parts[0] ?? "").toLowerCase();
    const a = parts.slice(1);
    const g = useGame.getState();

    switch (c) {
      case "help":
        [
          ["help", "this list"],
          ["whoami / status", "operator identity & rank"],
          ["missions", "list every operation"],
          ["open <app>", "terminal|missions|network|map|lab"],
          ["ls / cd / cat <f>", "browse the evidence filesystem"],
          ["scan spellnotion", "enumerate the Spell Notion fleet"],
          ["trace <SN-id>", "geo-locate a server node"],
          ["elements", "trace elements for coordinate decode"],
          ["decode coords Ni Ir", "build GPS coords from two elements"],
          ["hint <CODE>", "buy a hint (costs points)"],
          ["submit <CODE> <flag>", 'capture a flag, e.g. submit S2E07 "Noida, Phase-2, Dadri Road"'],
        ].forEach(([k, v]) => print(`<span class="acc">${pad(k!, 26)}</span><span class="dim">${esc(v!)}</span>`));
        break;
      case "clear":
        setLines([]);
        break;
      case "whoami":
        print(`<span class="ok">Agent NIKHIL NAIR · CBI Forensic Cyber Division · clearance OMEGA</span>`);
        break;
      case "status":
        print(`<span class="acc">Rank: ${rankFor(g.score).icon} ${rankFor(g.score).name}   Score: ${g.score} pts   Solved: ${g.solved.length}/${missions.length}</span>`);
        break;
      case "missions":
        missions.forEach((m) => {
          const done = g.solved.includes(m.code);
          print(`<span class="${done ? "ok" : "acc"}">${pad(m.code, 7)}</span><span class="dim">${pad(m.difficulty, 13)}${pad(m.points + "pt", 7)}</span><span class="${done ? "ok" : ""}"> ${m.codename}${done ? "  ✔" : ""}</span>`);
        });
        break;
      case "ls": {
        const dir = fsDirs[a[0] ?? cwd];
        if (!dir) { print(`<span class="err">ls: no such directory</span>`); break; }
        Object.keys(dir).forEach((k) => print(`<span>${pad(k, 26)}</span>`));
        break;
      }
      case "cd": {
        const p = a[0];
        if (!p || p === "/" || p === "..") { setCwd("/"); break; }
        const tgt = p.startsWith("/") ? p : "/" + p;
        if (fsDirs[tgt]) setCwd(tgt);
        else print(`<span class="err">cd: not a directory: ${esc(p)}</span>`);
        break;
      }
      case "cat": {
        const f = a[0];
        if (!f) { print(`<span class="err">usage: cat <file></span>`); break; }
        const dir = fsDirs[cwd] ?? fsDirs["/"]!;
        const content = dir[f];
        print(content != null ? `<span>${esc(content)}</span>` : `<span class="err">cat: ${esc(f)}: no such file</span>`);
        break;
      }
      case "open": {
        const map: Record<string, { id: string; title: string; icon: string }> = {
          terminal: { id: "terminal", title: "TERMINAL", icon: "🖥" },
          missions: { id: "cases", title: "CAMPAIGN", icon: "🗂" },
          cases: { id: "cases", title: "CAMPAIGN", icon: "🗂" },
          network: { id: "network", title: "SERVER MAP · SPELL NOTION", icon: "🌐" },
          map: { id: "map", title: "GEO-MAP", icon: "🗺" },
          lab: { id: "lab", title: "FORENSIC LAB", icon: "🧪" },
        };
        const t = map[(a[0] ?? "").toLowerCase()];
        if (!t) { print(`<span class="err">open: unknown app</span>`); break; }
        open(t as never);
        print(`<span class="dim">opening ${esc(a[0]!)} …</span>`);
        break;
      }
      case "scan": {
        if (!(a[0] ?? "").toLowerCase().includes("spell")) { print(`<span class="err">usage: scan spellnotion</span>`); break; }
        const max = Math.max(...servers.map((s) => s.txGbps));
        servers.forEach((s) => {
          const bars = Math.round((s.txGbps / max) * 22);
          const bar = "█".repeat(bars) + "·".repeat(22 - bars);
          const cls = s.hidden ? "err" : "dim";
          print(`<span class="${s.hidden ? "err" : "acc"}">${pad(s.id, 7)}</span><span class="${cls}">${pad(s.size, 8)}${bar} ${pad(s.txGbps + "Gbps", 9)}${s.hidden ? "  ⚠ ANOMALY (10x)" : ""}</span>`);
        });
        print(`<span class="acc">1 node shows ~10× outgoing traffic. \`trace ${servers.find((s) => s.hidden)!.id}\` to locate it.</span>`);
        break;
      }
      case "trace": {
        const id = a[0];
        if (!id) { print(`<span class="err">usage: trace <SN-id></span>`); break; }
        const s = servers.find((x) => x.id.toLowerCase() === id.toLowerCase());
        if (!s) { print(`<span class="err">trace: unknown node ${esc(id)}</span>`); break; }
        if (s.hidden) {
          print(`<span class="ok">► LOCK ACQUIRED: ${s.city}</span>`);
          print(`<span class="acc">  lat ${s.lat}  lng ${s.lng}   outgoing ${s.txGbps}Gbps — submit S2E07 "${s.city}"</span>`);
          open({ id: "mission:S2E07", title: "THE INVISIBLE FIFTH", icon: "🔎", payload: "S2E07", w: 900, h: 600 });
        } else {
          print(`<span class="dim">  ${s.city} — ${s.size} node, ${s.txGbps}Gbps. Traffic nominal.</span>`);
        }
        break;
      }
      case "elements":
        Object.keys(elements).forEach((k) =>
          print(`<span class="acc">${pad(k, 4)}${pad(elements[k]!.name, 12)}</span><span class="dim">Z=${pad(elements[k]!.z, 5)}weight=${elements[k]!.w}</span>`),
        );
        print(`<span class="dim">Hint: a coordinate can hide as  &lt;atomic number&gt;.&lt;digits of weight&gt;.</span>`);
        break;
      case "decode": {
        if ((a[0] ?? "").toLowerCase() !== "coords" || !a[1] || !a[2]) { print(`<span class="err">usage: decode coords <e1> <e2>  (e.g. decode coords Ni Ir)</span>`); break; }
        const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        const e1 = elements[cap(a[1])], e2 = elements[cap(a[2])];
        if (!e1 || !e2) { print(`<span class="err">decode: unknown element (try \`elements\`)</span>`); break; }
        const lat = e1.z + "." + String(e1.w).replace(".", "").slice(0, 4);
        const lng = e2.z + "." + String(e2.w).replace(".", "").slice(0, 4);
        print(`<span class="ok">Decoded → ${lat}, ${lng}</span><span class="dim">  (plot on the Map, or submit it)</span>`);
        break;
      }
      case "hint": {
        const m = findMission(a[0]);
        if (!m) { print(`<span class="err">hint: no mission ${esc(a[0] ?? "")}</span>`); break; }
        const r = g.buyHint(m);
        print(r ? `<span class="acc">HINT (-${r.cost}pts): ${esc(r.text)}</span>` : `<span class="dim">No more hints for ${m.code}.</span>`);
        break;
      }
      case "submit": {
        const m = findMission(a[0]);
        const flag = a.slice(1).join(" ");
        if (!m || !flag) { print(`<span class="err">usage: submit <CODE> "<flag>"</span>`); break; }
        const res = g.capture(m, flag);
        if (res.correct) {
          print(res.already ? `<span class="dim">Already captured ${m.code}.</span>` : `<span class="ok">✔ FLAG CAPTURED — ${m.codename}  +${res.gain}pts</span>`);
        } else print(`<span class="err">✘ Incorrect flag for ${m.code}. Re-examine the evidence.</span>`);
        break;
      }
      default:
        print(`<span class="err">command not found: ${esc(c)}   (try \`help\`)</span>`);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); recall(1); }
    else if (e.key === "ArrowDown") { e.preventDefault(); recall(-1); }
    else if (e.key === "Tab") { e.preventDefault(); complete(); }
  };
  const recall = (dir: number) => {
    const h = history.current;
    if (!h.length) return;
    hIdx.current = Math.max(-1, Math.min(h.length - 1, hIdx.current + dir));
    setInput(hIdx.current === -1 ? "" : h[h.length - 1 - hIdx.current]!);
  };
  const complete = () => {
    const v = input.trim();
    if (!v) return;
    const m = CMDS.filter((x) => x.startsWith(v));
    if (m.length === 1) setInput(m[0] + " ");
    else if (m.length > 1) print(`<span class="dim">${m.join("  ")}</span>`);
  };

  return (
    <div className="term" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) => <div className="ln" key={i} dangerouslySetInnerHTML={{ __html: l }} />)}
      <div className="term-input">
        <span className="pr">nikhil@asur:{cwd}$</span>
        <input ref={inputRef} autoFocus value={input} spellCheck={false} autoComplete="off" onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} />
      </div>
    </div>
  );
}

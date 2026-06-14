<div align="center">

# 🜲 THE GODS CTF

### A forensic-deduction Capture-The-Flag game — hunt the Asur inside a simulated investigation OS.

*Built from the world of* **Asur: Welcome to Your Dark Side**.

</div>

---

**THE GODS CTF** drops you into **AsurOS**, a fictional CBI forensic workstation, to hunt a serial
killer who believes humanity is inherently evil — and is building an AI to prove it. You don't answer
a quiz; you *investigate*. Read real evidence (with red herrings), operate forensic tools, and **capture
the flag** for each mission by deducing the answer.

It's a **4-act campaign** of codenamed operations, and you **switch between playable investigators**, each
with a different lens on the evidence.

## ✨ Features

- **Campaign, not a checklist** — 14 codenamed operations (`COLD OPEN`, `DEAD MAN'S CIPHER`, `THE INVISIBLE FIFTH`, `GOD MODE` …) across 4 narrative acts, each with intro/outro story beats.
- **Playable characters** — Nikhil (forensics), Nusrat (field), DJ (authority), and a hidden 4th that unlocks on completion.
- **A real investigation OS** — draggable windowed desktop: a scriptable **Terminal**, an animated **Server Map** (canvas), an interactive **Geo-Map** (Leaflet), a **Forensic Lab** (periodic-table coordinate decoder + cipher bench), and an evidence board.
- **Two modes** — **Student** (red herrings flagged, MCQ assist, cheap hints) vs **Professional** (raw evidence, free-text flags only).
- **Real deduction puzzles** — e.g. decode atomic numbers into GPS coordinates, or trace a 10×-traffic anomaly to a hidden server.
- **Ranks & progress** — Rookie → God Slayer, persisted in `localStorage`.

## 🕹 Play

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build && npm run preview
```

Deploys as a static site to Vercel / Netlify / GitHub Pages (`dist/`).

## 🧰 Tech

- **React 18 + TypeScript** (strict) + **Vite**
- **Zustand** for game + window-manager state (persisted)
- **react-leaflet / Leaflet** for the geo-map; HTML5 **Canvas** for the server graph
- Synthesised **WebAudio** SFX (no asset files)
- Zero backend — 100% client-side

## 🗂 Structure

```
src/
  types/         domain models (Mission, Character, Act, …)
  data/          campaign.ts (14 missions · 4 acts · 4 characters), world.ts
  store/         gameStore.ts (score/rank/progress), windowStore.ts
  engine/        flag.ts (normalisation + checking), audio.ts (SFX)
  components/    Boot · Login · Desktop · WindowFrame · Toast · Victory
  apps/          Terminal · CampaignBoard · MissionView · ServerMap · GeoMap · Lab
  styles/        theme.css (AsurOS CRT/forensic aesthetic)
legacy-vanilla/  the original no-build prototype, preserved
```

## 📝 Content & copyright

Mission forensic data is derived from the source transcripts and verified against them; only short
evidence quotes ship in `src/data/campaign.ts`. The **full transcripts are intentionally not committed**
(see `.gitignore`) as they are copyrighted. This is a non-commercial fan project.

---

<div align="center"><sub>"The dead can talk. The more you listen, the more they talk."</sub></div>

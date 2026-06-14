# THE GODS CTF — AsurOS Forensic Deduction Engine

A browser-based **Capture-The-Flag detective game** built from the transcripts of
*Asur: Welcome to Your Dark Side* (Seasons 1 & 2). You play Agent Nikhil Nair inside
a simulated investigation OS ("AsurOS"): read real evidence, operate forensic tools,
and **capture the flag** for each case by deducing the answer.

Designed for students & professionals — the kind of clue-hunting that makes your brain wire.

## Run it

No build step. Serve the folder over HTTP (the geo-map needs `http://`, not `file://`):

```bash
cd TheGodsCTF
python3 -m http.server 8777
# open http://localhost:8777
```

Deploy anywhere static (Vercel / Netlify / GitHub Pages) by dropping the folder.

## How to play

1. **Boot → Login.** Pick a mode:
   - **STUDENT** — red herrings flagged, multiple-choice assist, cheaper hints.
   - **PROFESSIONAL** — raw evidence, no markers, free-text flags only.
2. Open apps from the desktop (or the **Terminal**):
   - 🖥 **Terminal** — `help`, `cases`, `scan spellnotion`, `trace SN-05`, `decode coords Ni Ir`, `hint S2E07`, `submit S2E07 "Noida, Phase-2, Dadri Road"`
   - 🗂 **Case Files** — the 14 cases; open one for its evidence board + flag box
   - 🌐 **Server Map** — the Spell Notion fleet; spot the 10× traffic anomaly, click to trace
   - 🗺 **Geo-Map** — plot decoded coordinates on a real map (Leaflet)
   - 🧪 **Forensic Lab** — periodic-table coordinate decoder + cipher bench
3. **Submit the flag.** Score climbs through ranks: Rookie → Field Agent → Investigator → Profiler → Asur Hunter → God Slayer. Progress is saved in your browser.

## The 14 cases

Season 1: E01 The Dead Can Talk · E02 Rabbit Hole · E03 Peek-a-boo · E06 The Firewall ·
E07 Let There Be Darkness · E08 End Is the Beginning.
Season 2: E01–E08 (The Dance of Death → The God's Dilemma).
(S1 E04/E05 aren't hosted on the source site, so they're not included.)

Each case = a briefing, 5–8 evidence cards (some red herrings), 3 progressive hints,
a full walkthrough, and one flag. Two are puzzle cases: **S1E07** (decode atomic
numbers → GPS coordinates) and **S2E07** (trace the hidden server → Noida).

## Project layout

```
index.html            boot · login · desktop shell
css/theme.css         dark CRT / forensic-terminal theme
data/world.js         Spell Notion server fleet, ranks, periodic table, filesystem
data/challenges.js    the 14 cases (auto-generated from transcripts, quotes verified)
js/wm.js              window manager (drag / focus / minimise / taskbar)
js/terminal.js        scriptable shell (the core investigation interface)
js/apps.js            Case board, Server Map (canvas), Geo-Map (Leaflet), Lab
js/main.js            game state, scoring, flag-checking, save/load, boot lifecycle
Asur_Transcripts/     the 14 source transcripts (the clue bank)
```

## Notes
- Original art only (CSS/SVG/canvas) — no copyrighted show assets.
- Leaflet loads from CDN; offline it degrades to a graceful fallback.
- All flag matching is normalised + fuzzy, so spacing/punctuation is forgiving.

/* ============================================================
   THE GODS CTF — apps.js
   The desktop applications: Cases / Evidence board, Server Map
   (canvas force-graph), Geo-Map (Leaflet), Forensic Lab.
   ============================================================ */
(function () {
  const APPS = {
    open(name) {
      switch ((name || "").toLowerCase()) {
        case "terminal": return this.terminal();
        case "cases": return this.cases();
        case "network": case "servers": case "servermap": return this.network();
        case "map": case "geo": return this.map();
        case "lab": return this.lab();
        case "evidence": return this.cases();
        default: window.GAME && window.GAME.toast("Unknown app: " + name);
      }
    },

    /* ---------------- TERMINAL ---------------- */
    terminal() {
      WM.open({ id: "terminal", title: "TERMINAL", icon: "🖥", width: 760, height: 460,
        render: (b) => { new window.Terminal(b); } });
    },

    /* ---------------- CASES + EVIDENCE ---------------- */
    cases() {
      WM.open({ id: "cases", title: "CASE FILES", icon: "🗂", width: 820, height: 540,
        render: (b) => this.renderCaseList(b),
        onFocus: (b) => this.renderCaseList(b) });
    },
    renderCaseList(b) {
      const G = window.GAME;
      const wrap = document.createElement("div"); wrap.className = "cases-wrap";
      window.CHALLENGES.forEach((c) => {
        const solved = G.solved.includes(c.code);
        const card = document.createElement("div");
        card.className = "case-card " + (solved ? "solved" : "");
        card.innerHTML =
          '<div class="code">' + c.code + "</div>" +
          '<div class="nm">' + c.title + "</div>" +
          '<div class="meta"><span class="tag ' + c.difficulty + '">' + c.difficulty + "</span>" +
          (c.labTool && c.labTool !== "none" ? '<span class="tag">🧪 ' + c.labTool + "</span>" : "") + "</div>" +
          '<div class="pts">' + c.points + "pt</div>";
        card.addEventListener("click", () => this.caseDetail(c));
        wrap.appendChild(card);
      });
      b.innerHTML = ""; b.appendChild(wrap);
    },

    caseDetail(c) {
      const id = "case-" + c.code;
      WM.open({ id, title: c.code + " · " + c.title.toUpperCase(), icon: "🔎",
        width: 900, height: 600, render: (b) => this.renderCase(b, c) });
    },
    renderCase(b, c) {
      const G = window.GAME;
      const pro = G.mode === "pro";
      const solved = G.solved.includes(c.code);
      const el = document.createElement("div"); el.className = "cd";

      // evidence: in pro mode, hide the red-herring badge
      const evCards = c.evidence.map((e) => {
        const herr = e.redHerring && !pro;
        return '<div class="ev ' + (herr ? "herring" : "") + '">' +
          (herr ? '<span class="flag-herring">⚑ possible red herring</span>' : "") +
          '<div class="lab"><span>' + e.label + '</span><span class="typ ' + e.type + '">' + e.type + "</span></div>" +
          '<div class="txt">' + esc(e.text) + "</div></div>";
      }).join("");

      const labBtn = (c.labTool && c.labTool !== "none")
        ? '<button class="tool-btn" data-lab="' + c.labTool + '">🧪 open ' + c.labTool + "</button>" : "";
      const netBtn = c.code === "S2E07" ? '<button class="tool-btn" data-app="network">🌐 server map</button>' : "";
      const mapBtn = (c.labTool === "map" || c.code === "S1E07") ? '<button class="tool-btn" data-app="map">🗺 geo-map</button>' : "";

      // student mode gets MCQ assist
      const mcq = (!pro && c.mcqOptions) ?
        '<div class="mcq">' + shuffle(c.mcqOptions.slice()).map((o) =>
          '<button data-mcq="' + esc(o) + '">' + esc(o) + "</button>").join("") + "</div>" : "";

      el.innerHTML =
        "<h2>" + c.title + "</h2>" +
        '<div class="sub">CASE ' + c.code + " · Season " + c.season + " Episode " + c.episode +
          " · <span class='tag " + c.difficulty + "'>" + c.difficulty + "</span> · " + c.points + " pts</div>" +
        '<div class="brief">' + esc(c.briefing) + "</div>" +
        '<div class="sec-h">EVIDENCE BOARD' + (pro ? " · professional (no markers)" : "") + "</div>" +
        '<div class="evgrid">' + evCards + "</div>" +
        '<div class="toolbar">' + labBtn + netBtn + mapBtn +
          '<button class="tool-btn hint" data-hint="1">💡 hint</button>' +
          '<button class="tool-btn" data-walk="1">📖 reveal walkthrough</button></div>' +
        '<div class="hints"></div>' +
        '<div class="flagbox">' +
          '<div class="q">🚩 ' + esc(c.flagQuestion) + "</div>" +
          '<div class="fmt">format: ' + esc(c.flagFormat) + "</div>" +
          '<div class="flag-row"><input type="text" placeholder="enter flag…" ' + (solved ? "value='" + esc(c.flag) + "' disabled" : "") + '><button class="submit">CAPTURE</button></div>' +
          mcq +
          '<div class="verdict ' + (solved ? "ok" : "") + '">' + (solved ? "✔ FLAG ALREADY CAPTURED — " + esc(c.flag) : "") + "</div>" +
        "</div>";

      b.innerHTML = ""; b.appendChild(el);

      const input = el.querySelector(".flag-row input");
      const verdict = el.querySelector(".verdict");
      const hintsBox = el.querySelector(".hints");
      const self = this;

      function tryFlag(val) {
        const res = G.checkFlag(c, val);
        if (res.correct) {
          verdict.className = "verdict ok";
          verdict.textContent = res.already ? "✔ Already captured." : "✔ FLAG CAPTURED  +" + res.gain + " pts  — " + c.flag;
          input.value = c.flag; input.disabled = true;
          el.querySelectorAll(".mcq button").forEach((x) => x.disabled = true);
          self.refreshAllCaseLists();
        } else {
          verdict.className = "verdict no";
          verdict.textContent = "✘ Incorrect. Cross-reference the evidence and try again.";
        }
      }

      el.querySelector(".submit").addEventListener("click", () => tryFlag(input.value));
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") tryFlag(input.value); });
      el.querySelectorAll(".mcq button").forEach((btn) =>
        btn.addEventListener("click", () => tryFlag(btn.dataset.mcq)));

      el.querySelector("[data-hint]").addEventListener("click", () => {
        const r = G.useHint(c);
        if (r.done) { this.flash(hintsBox, "No more hints available."); return; }
        const line = document.createElement("div");
        line.className = "hintline"; line.textContent = "💡 (-" + r.cost + "pts) " + r.text;
        hintsBox.appendChild(line);
      });
      el.querySelector("[data-walk]").addEventListener("click", function () {
        if (this._shown) return; this._shown = true;
        const w = document.createElement("div"); w.className = "hintline";
        w.style.borderColor = "var(--violet)"; w.style.color = "var(--violet)";
        w.innerHTML = "<b>WALKTHROUGH</b><br>" + c.solutionSteps.map((s, i) => (i + 1) + ". " + esc(s)).join("<br>");
        hintsBox.appendChild(w);
      });
      el.querySelectorAll("[data-lab]").forEach((btn) => btn.addEventListener("click", () => this.lab(btn.dataset.lab)));
      el.querySelectorAll("[data-app]").forEach((btn) => btn.addEventListener("click", () => this.open(btn.dataset.app)));
    },

    refreshAllCaseLists() {
      if (WM.wins["cases"]) this.renderCaseList(WM.wins["cases"].body);
    },
    flash(box, msg) {
      const l = document.createElement("div"); l.className = "hintline"; l.textContent = msg;
      box.appendChild(l); setTimeout(() => l.remove(), 2500);
    },

    /* ---------------- SERVER MAP (canvas force graph) ---------------- */
    network() {
      WM.open({ id: "network", title: "SERVER MAP · SPELL NOTION", icon: "🌐",
        width: 760, height: 560,
        render: (b) => this.renderNet(b),
        onResize: (b) => { const c = b.querySelector("#netCanvas"); if (c) this.fitCanvas(c); } });
    },
    renderNet(b) {
      b.innerHTML =
        '<div class="net-wrap"><div class="net-head">Spell Notion fleet — <b>25 nodes</b> · ' +
        'outgoing traffic = node size & glow. One node bleeds <b>~10× data</b> to an unknown endpoint. ' +
        'Click a node to inspect · trace the anomaly to capture <b>S2E07</b>.</div>' +
        '<canvas id="netCanvas"></canvas></div><div class="net-tip" id="netTip"></div>';
      const canvas = b.querySelector("#netCanvas");
      const tip = b.querySelector("#netTip");
      this.fitCanvas(canvas);
      this.runNet(canvas, tip, b);
    },
    fitCanvas(c) {
      const r = c.getBoundingClientRect();
      c.width = r.width * devicePixelRatio; c.height = r.height * devicePixelRatio;
      c._w = r.width; c._h = r.height;
    },
    runNet(canvas, tip, root) {
      const ctx = canvas.getContext("2d");
      const sv = window.ASUR.servers;
      // geo -> screen (equirectangular within India bounds)
      const LAT0 = 7, LAT1 = 32, LNG0 = 68, LNG1 = 93;
      function project() {
        const W = canvas._w, H = canvas._h, pad = 40;
        return sv.map((s) => ({
          s,
          x: pad + ((s.lng - LNG0) / (LNG1 - LNG0)) * (W - 2 * pad),
          y: pad + (1 - (s.lat - LAT0) / (LAT1 - LAT0)) * (H - 2 * pad),
        }));
      }
      let nodes = project();
      const maxTx = Math.max(...sv.map((s) => s.txGbps));
      const hub = { x: 0, y: 0 };
      let t = 0, raf;
      const self = this;

      function draw() {
        const W = canvas._w, H = canvas._h;
        ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        ctx.clearRect(0, 0, W, H);
        hub.x = W / 2; hub.y = H * 0.5;
        t += 0.03;
        // edges (node -> exfil hub) thickness by traffic
        nodes.forEach((n) => {
          const w = 0.4 + (n.s.txGbps / maxTx) * 4;
          ctx.strokeStyle = n.s.hidden ? "rgba(255,59,70," + (0.5 + 0.3 * Math.sin(t * 2)) + ")" : "rgba(54,224,200,0.10)";
          ctx.lineWidth = w;
          ctx.beginPath(); ctx.moveTo(n.x, n.y);
          ctx.quadraticCurveTo((n.x + hub.x) / 2, (n.y + hub.y) / 2 - 18, hub.x, hub.y);
          ctx.stroke();
          if (n.s.hidden) {
            // animated packet
            const p = (t * 0.25) % 1;
            const px = lerp(n.x, hub.x, p), py = quad(n.y, (n.y + hub.y) / 2 - 18, hub.y, p);
            ctx.fillStyle = "#ff3b46"; ctx.beginPath(); ctx.arc(px, py, 3, 0, 7); ctx.fill();
          }
        });
        // exfil hub
        ctx.fillStyle = "#1a2a2e"; ctx.beginPath(); ctx.arc(hub.x, hub.y, 9, 0, 7); ctx.fill();
        ctx.strokeStyle = "#36e0c8"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = "#6f8c89"; ctx.font = "10px JetBrains Mono"; ctx.textAlign = "center";
        ctx.fillText("exfil endpoint", hub.x, hub.y + 22);
        // nodes
        nodes.forEach((n) => {
          const base = 4 + (n.s.txGbps / maxTx) * 14;
          if (n.s.hidden) {
            const pulse = base + 6 + 4 * Math.sin(t * 3);
            ctx.fillStyle = "rgba(255,59,70,0.18)"; ctx.beginPath(); ctx.arc(n.x, n.y, pulse + 8, 0, 7); ctx.fill();
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
      }
      draw();

      // interaction — the anomaly gets a larger, prioritised hit area
      // (Noida overlaps Delhi geographically, so the red node must win).
      function hit(mx, my) {
        const anomaly = nodes.find((n) => n.s.hidden);
        if (anomaly && Math.hypot(anomaly.x - mx, anomaly.y - my) < 24) return anomaly;
        let best = null, bd = 15;
        nodes.forEach((n) => { const d = Math.hypot(n.x - mx, n.y - my); if (d < bd) { bd = d; best = n; } });
        return best;
      }
      canvas.onmousemove = (e) => {
        const r = canvas.getBoundingClientRect();
        const n = hit(e.clientX - r.left, e.clientY - r.top);
        if (n) {
          canvas.style.cursor = "pointer";
          tip.style.display = "block";
          tip.style.left = (e.clientX - r.left + 14) + "px";
          tip.style.top = (e.clientY - r.top + 14) + "px";
          tip.innerHTML = "<b>" + n.s.id + "</b> · " + n.s.size + "<br>" + n.s.city +
            "<br>outgoing: <b>" + n.s.txGbps + " Gbps</b>" +
            (n.s.hidden ? "<br><span class='trace'>⚠ 10× anomaly — click to TRACE</span>" : "");
        } else { tip.style.display = "none"; canvas.style.cursor = "default"; }
      };
      canvas.onmouseleave = () => { tip.style.display = "none"; };
      canvas.onclick = (e) => {
        const r = canvas.getBoundingClientRect();
        const n = hit(e.clientX - r.left, e.clientY - r.top);
        if (!n) return;
        if (n.s.hidden) {
          self.markServerFound();
          window.GAME.toast("🎯 Traced " + n.s.id + " → <b>" + n.s.city + "</b>");
          const c = findCase("S2E07");
          if (c && !window.GAME.solved.includes("S2E07")) self.caseDetail(c);
        } else {
          window.GAME.toast(n.s.id + " (" + n.s.city + ") — traffic nominal.");
        }
      };
      // stop animation when window closes
      const obs = new MutationObserver(() => { if (!document.body.contains(canvas)) { cancelAnimationFrame(raf); obs.disconnect(); } });
      obs.observe(document.body, { childList: true, subtree: true });
      window.addEventListener("resize", () => { self.fitCanvas(canvas); nodes = project(); });
    },
    markServerFound() { window.GAME && window.GAME.toast("Anomaly located: <b>Noida, Phase-2, Dadri Road</b>"); },

    /* ---------------- GEO-MAP (Leaflet) ---------------- */
    map() {
      WM.open({ id: "map", title: "GEO-MAP", icon: "🗺", width: 720, height: 560,
        render: (b) => this.renderMap(b),
        onResize: () => { if (this._leaflet) setTimeout(() => this._leaflet.invalidateSize(), 50); } });
    },
    renderMap(b) {
      b.innerHTML =
        '<div class="map-wrap"><div class="map-bar">' +
        '<input id="mLat" placeholder="lat e.g. 28.5869" style="width:140px">' +
        '<input id="mLng" placeholder="lng e.g. 77.1922" style="width:140px">' +
        '<button id="mPlot">PLOT</button>' +
        '<button id="mServers">show servers</button>' +
        '<span style="color:var(--ink-dim);font-size:11px">drop decoded coords to find the scene</span>' +
        '</div><div id="leaflet"></div></div>';
      const host = b.querySelector("#leaflet");
      if (typeof L === "undefined") {
        host.outerHTML = '<div class="map-fallback">🗺 Offline — map tiles unavailable.<br>' +
          'Decoded coordinates still resolve in the Lab &amp; terminal.<br>' +
          'S1E07 → 28.5869, 77.1922 (Delhi) · S2E07 → Noida, Phase-2, Dadri Road</div>';
        return;
      }
      const map = L.map(host, { zoomControl: true, attributionControl: false }).setView([23.5, 80], 5);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { maxZoom: 19 }).addTo(map);
      this._leaflet = map;
      setTimeout(() => map.invalidateSize(), 60);
      const self = this;
      const redIcon = (txt) => L.divIcon({ className: "", html:
        '<div style="background:#ff3b46;color:#fff;font:700 10px/16px JetBrains Mono;padding:2px 7px;border-radius:10px;white-space:nowrap;box-shadow:0 0 12px #ff3b46aa">' + txt + "</div>" });
      function plot(lat, lng, label) {
        if (isNaN(lat) || isNaN(lng)) { window.GAME.toast("Enter valid lat,lng"); return; }
        L.marker([lat, lng], { icon: redIcon(label || (lat.toFixed(4) + ", " + lng.toFixed(4))) }).addTo(map);
        map.setView([lat, lng], 11);
      }
      b.querySelector("#mPlot").addEventListener("click", () =>
        plot(parseFloat(b.querySelector("#mLat").value), parseFloat(b.querySelector("#mLng").value)));
      b.querySelector("#mServers").addEventListener("click", () => {
        window.ASUR.servers.forEach((s) => {
          const m = L.circleMarker([s.lat, s.lng], {
            radius: s.hidden ? 11 : 4 + s.txGbps / 30,
            color: s.hidden ? "#ff3b46" : "#36e0c8", fillOpacity: 0.55, weight: s.hidden ? 2 : 1,
          }).addTo(map);
          m.bindTooltip(s.id + " · " + s.city + " · " + s.txGbps + "Gbps" + (s.hidden ? " ⚠" : ""));
          if (s.hidden) m.on("click", () => self.markServerFound());
        });
        map.setView([26, 79], 5);
        window.GAME.toast("Plotted 25 servers. The red one is the leak.");
      });
    },

    /* ---------------- FORENSIC LAB ---------------- */
    lab(focus) {
      WM.open({ id: "lab", title: "FORENSIC LAB", icon: "🧪", width: 720, height: 560,
        render: (b) => this.renderLab(b) });
      if (focus === "map") this.map();
    },
    renderLab(b) {
      const E = window.ASUR.elements;
      const ptable = Object.keys(E).map((k) =>
        '<div class="elt" data-sym="' + k + '"><div class="sym">' + k + '</div><div class="z">Z=' + E[k].z +
        '</div><div class="w">' + E[k].w + "</div></div>").join("");
      b.innerHTML =
        '<div class="lab">' +
        '<div class="panel"><h3>🧬 PERIODIC DECODER</h3>' +
        '<p style="color:var(--ink-dim);font-size:11.5px;margin:0 0 8px">Killers hide coordinates in trace elements: ' +
        '<b style="color:var(--amber)">atomic number . digits-of-atomic-weight</b>. Pick two elements to build a coordinate.</p>' +
        '<div class="row"><span>LAT:</span><select id="labLat"></select><span>LNG:</span><select id="labLng"></select>' +
        '<button id="labBuild">BUILD COORD</button></div>' +
        '<div class="out" id="labOut">—</div>' +
        '<div class="ptable">' + ptable + "</div></div>" +

        '<div class="panel"><h3>🔡 CIPHER BENCH</h3>' +
        '<div class="row"><input id="cipIn" placeholder="text…" style="flex:1">' +
        '<select id="cipMode"><option value="caesar">Caesar shift</option><option value="atbash">Atbash</option><option value="rev">Reverse</option></select>' +
        '<input id="cipShift" type="number" value="3" style="width:64px" title="shift"></div>' +
        '<div class="row"><button id="cipGo">DECODE</button><div class="out" id="cipOut">—</div></div></div>' +

        '<div class="panel"><h3>📐 COORD → SUBMIT</h3>' +
        '<p style="color:var(--ink-dim);font-size:11.5px;margin:0 0 8px">Built a coordinate? Open the Map to confirm the city, then submit it as the S1E07 flag.</p>' +
        '<div class="row"><button id="labMap">🗺 open map</button><button id="labCases">🗂 open cases</button></div></div>' +
        "</div>";

      const latSel = b.querySelector("#labLat"), lngSel = b.querySelector("#labLng");
      Object.keys(E).forEach((k) => {
        latSel.insertAdjacentHTML("beforeend", '<option value="' + k + '">' + k + " (Z=" + E[k].z + ")</option>");
        lngSel.insertAdjacentHTML("beforeend", '<option value="' + k + '">' + k + " (Z=" + E[k].z + ")</option>");
      });
      latSel.value = "Ni"; lngSel.value = "Ir";
      const out = b.querySelector("#labOut");
      function build() {
        const a = E[latSel.value], c = E[lngSel.value];
        const lat = a.z + "." + String(a.w).replace(".", "").slice(0, 4);
        const lng = c.z + "." + String(c.w).replace(".", "").slice(0, 4);
        out.innerHTML = "→ <b>" + lat + ", " + lng + "</b>  " +
          (lat === "28.5869" && lng === "77.1922" ? "✔ resolves to Delhi — that's the S1E07 flag!" : "(plot it on the map to confirm)");
      }
      b.querySelector("#labBuild").addEventListener("click", build); build();
      b.querySelectorAll(".elt").forEach((e) => e.addEventListener("click", () => {
        out.innerHTML = e.dataset.sym + " = " + E[e.dataset.sym].name + " · Z=" + E[e.dataset.sym].z + " · weight " + E[e.dataset.sym].w;
      }));

      const ci = b.querySelector("#cipIn"), cm = b.querySelector("#cipMode"), cs = b.querySelector("#cipShift"), co = b.querySelector("#cipOut");
      b.querySelector("#cipGo").addEventListener("click", () => {
        const txt = ci.value, mode = cm.value, sh = parseInt(cs.value) || 0;
        co.textContent = mode === "caesar" ? caesar(txt, -sh) : mode === "atbash" ? atbash(txt) : txt.split("").reverse().join("");
      });
      b.querySelector("#labMap").addEventListener("click", () => this.map());
      b.querySelector("#labCases").addEventListener("click", () => this.cases());
    },
  };

  /* helpers */
  function findCase(code) { return window.CHALLENGES.find((c) => c.code.toLowerCase() === code.toLowerCase()); }
  function esc(s) { return String(s).replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m])); }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = (i * 7 + 3) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function quad(a, b, c, t) { const m = 1 - t; return m * m * a + 2 * m * t * b + t * t * c; }
  function caesar(s, k) { return s.replace(/[a-z]/gi, (ch) => { const base = ch <= "Z" ? 65 : 97; return String.fromCharCode((ch.charCodeAt(0) - base + k + 26) % 26 + base); }); }
  function atbash(s) { return s.replace(/[a-z]/gi, (ch) => { const base = ch <= "Z" ? 65 : 97; return String.fromCharCode(base + 25 - (ch.charCodeAt(0) - base)); }); }

  window.APPS = APPS;
})();

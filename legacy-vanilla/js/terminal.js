/* ============================================================
   THE GODS CTF — terminal.js
   A scriptable fake shell. Commands drive the whole investigation:
   ls/cat, scan/trace the Spell Notion fleet, decode, hint, submit.
   ============================================================ */
(function () {
  function Terminal(body) {
    this.body = body;
    this.history = [];
    this.hi = -1;
    this.cwd = "/";
    body.classList.add("term");
    body.innerHTML = "";
    this.out = document.createElement("div");
    body.appendChild(this.out);
    this.makeInput();
    this.banner();
  }

  Terminal.prototype.banner = function () {
    this.print("AsurOS shell — type ", "dim", true);
    this.print("help", "acc", true);
    this.print(" to begin. Tools: open cases|network|map|lab|evidence", "dim");
  };

  Terminal.prototype.makeInput = function () {
    const row = document.createElement("div");
    row.className = "term-input";
    row.innerHTML = '<span class="pr">nikhil@asur:' + this.cwd + "$</span>";
    const inp = document.createElement("input");
    inp.autocomplete = "off"; inp.spellcheck = false;
    row.appendChild(inp);
    this.body.appendChild(row);
    this.inputRow = row; this.input = inp;
    const self = this;
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { self.run(inp.value); inp.value = ""; self.hi = -1; }
      else if (e.key === "ArrowUp") { e.preventDefault(); self.recall(1); }
      else if (e.key === "ArrowDown") { e.preventDefault(); self.recall(-1); }
      else if (e.key === "Tab") { e.preventDefault(); self.complete(); }
    });
    setTimeout(() => inp.focus(), 30);
    this.body.addEventListener("click", () => inp.focus());
  };

  Terminal.prototype.recall = function (dir) {
    if (!this.history.length) return;
    this.hi = Math.max(-1, Math.min(this.history.length - 1, this.hi + dir));
    this.input.value = this.hi === -1 ? "" : this.history[this.history.length - 1 - this.hi];
  };

  Terminal.prototype.complete = function () {
    const cmds = ["help", "whoami", "clear", "ls", "cat", "cd", "cases", "open", "scan", "trace", "decode", "hint", "submit", "score", "rank", "status", "elements"];
    const v = this.input.value.trim();
    if (!v) return;
    const m = cmds.filter((c) => c.startsWith(v));
    if (m.length === 1) this.input.value = m[0] + " ";
    else if (m.length > 1) this.print(m.join("  "), "dim");
  };

  Terminal.prototype.print = function (text, cls, inline) {
    let el;
    if (inline && this.out.lastChild && this.out.lastChild._inline) { el = this.out.lastChild; }
    else { el = document.createElement("div"); el.className = "ln"; el._inline = inline; this.out.appendChild(el); }
    const span = document.createElement("span");
    if (cls) span.className = cls;
    span.textContent = text;
    el.appendChild(span);
    this.body.scrollTop = this.body.scrollHeight;
  };

  Terminal.prototype.echo = function (cmd) {
    const el = document.createElement("div"); el.className = "ln";
    el.innerHTML = '<span class="pr" style="color:var(--red)">nikhil@asur:' + this.cwd + '$</span> <span style="color:#fff">' + esc(cmd) + "</span>";
    this.out.appendChild(el);
  };

  Terminal.prototype.run = function (raw) {
    const cmd = (raw || "").trim();
    this.echo(cmd);
    window.SFX && window.SFX.tick();
    if (!cmd) return;
    this.history.push(cmd);
    const parts = cmd.match(/(?:[^\s"]+|"[^"]*")+/g).map((s) => s.replace(/^"|"$/g, ""));
    const c = parts[0].toLowerCase();
    const a = parts.slice(1);
    const G = window.GAME;
    try {
      switch (c) {
        case "help": this.help(); break;
        case "clear": this.out.innerHTML = ""; break;
        case "whoami":
          this.print("Agent NIKHIL NAIR · CBI Forensic Cyber Division · clearance OMEGA", "ok"); break;
        case "status": case "score": case "rank":
          this.print("Rank: " + G.rank().icon + " " + G.rank().name + "   Score: " + G.score + " pts   Solved: " + G.solved.length + "/" + window.CHALLENGES.length, "acc"); break;
        case "cases": this.listCases(); break;
        case "ls": this.ls(a[0]); break;
        case "cd": this.cd(a[0]); break;
        case "cat": this.cat(a[0]); break;
        case "open": window.APPS.open(a[0]); this.print("opening " + (a[0] || "?") + " ...", "dim"); break;
        case "scan": this.scan(a[0]); break;
        case "trace": this.trace(a[0]); break;
        case "elements": this.elements(); break;
        case "decode": this.decode(a); break;
        case "hint": this.hint(a[0]); break;
        case "submit": this.submit(a[0], a.slice(1).join(" ")); break;
        case "exit": this.print("Nice try. The Asur never logs off.", "dim"); break;
        default: this.print("command not found: " + c + "   (try `help`)", "err");
      }
    } catch (err) { this.print("error: " + err.message, "err"); }
  };

  Terminal.prototype.help = function () {
    const rows = [
      ["help", "this list"],
      ["whoami / status", "operator identity & current rank"],
      ["cases", "list every active case file"],
      ["open <app>", "launch terminal|cases|network|map|lab|evidence"],
      ["ls / cd / cat <f>", "browse the evidence filesystem"],
      ["scan spellnotion", "enumerate the Spell Notion server fleet"],
      ["trace <SN-id>", "geo-locate a server node"],
      ["elements", "list trace elements (for coordinate decode)"],
      ["decode coords Ni Ir", "build GPS coords from two elements"],
      ["hint <CODE>", "buy a hint for a case (costs points)"],
      ["submit <CODE> <flag>", 'capture a flag, e.g. submit S2E07 "Noida, Phase-2, Dadri Road"'],
    ];
    rows.forEach((r) => { this.print(pad(r[0], 26), "acc", true); this.print(r[1], "dim"); });
  };

  Terminal.prototype.listCases = function () {
    window.CHALLENGES.forEach((c) => {
      const done = window.GAME.solved.includes(c.code);
      this.print(pad(c.code, 8), done ? "ok" : "acc", true);
      this.print(pad(c.difficulty, 14) + pad(c.points + "pt", 7), "dim", true);
      this.print(" " + c.title + (done ? "  ✔" : ""), done ? "ok" : "");
    });
    this.print("Use `open cases` for the visual board, or `submit <CODE> <flag>`.", "dim");
  };

  Terminal.prototype.ls = function (p) {
    const dir = window.GAME.fsDir(p || this.cwd);
    if (!dir) return this.print("ls: no such directory", "err");
    Object.keys(dir).forEach((k) => {
      const isDir = typeof dir[k] === "object";
      this.print(pad(k, 28), isDir ? "acc" : "", true);
      this.print(isDir ? "<dir>" : "", "dim");
    });
  };
  Terminal.prototype.cd = function (p) {
    if (!p || p === "/") { this.cwd = "/"; this.refreshPrompt(); return; }
    if (p === "..") { this.cwd = "/"; this.refreshPrompt(); return; }
    const target = p.startsWith("/") ? p : "/" + p.replace(/^\//, "");
    if (window.GAME.fsDir(target)) { this.cwd = target; this.refreshPrompt(); }
    else this.print("cd: not a directory: " + p, "err");
  };
  Terminal.prototype.refreshPrompt = function () {
    this.input.parentNode.querySelector(".pr").textContent = "nikhil@asur:" + this.cwd + "$";
  };
  Terminal.prototype.cat = function (f) {
    if (!f) return this.print("usage: cat <file>", "err");
    const content = window.GAME.fsFile(this.cwd, f);
    if (content == null) return this.print("cat: " + f + ": no such file", "err");
    this.print(content, "");
  };

  Terminal.prototype.scan = function (target) {
    if ((target || "").toLowerCase().indexOf("spell") < 0)
      return this.print("usage: scan spellnotion", "err");
    this.print("Enumerating Spell Notion fleet via TAO uplink ...", "dim");
    const sv = window.ASUR.servers;
    const max = Math.max(...sv.map((s) => s.txGbps));
    sv.forEach((s) => {
      const bars = Math.round((s.txGbps / max) * 22);
      const bar = "█".repeat(bars) + "·".repeat(22 - bars);
      const anom = s.hidden;
      this.print(pad(s.id, 7), anom ? "err" : "acc", true);
      this.print(pad(s.size, 8) + bar + " ", anom ? "err" : "dim", true);
      this.print(pad(s.txGbps + "Gbps", 9) + (anom ? "  ⚠ ANOMALY (10x)" : ""), anom ? "err" : "dim");
    });
    this.print("24 nodes nominal. 1 node shows outgoing traffic ~10x the rest. `trace " +
      sv.find((s) => s.hidden).id + "` to locate it.", "acc");
  };

  Terminal.prototype.trace = function (id) {
    if (!id) return this.print("usage: trace <SN-id>", "err");
    const s = window.ASUR.servers.find((x) => x.id.toLowerCase() === id.toLowerCase());
    if (!s) return this.print("trace: unknown node " + id, "err");
    this.print("Tracing " + s.id + " ...", "dim");
    if (s.hidden) {
      this.print("► LOCK ACQUIRED: " + s.city, "ok");
      this.print("  lat " + s.lat + "  lng " + s.lng + "   outgoing " + s.txGbps + "Gbps", "acc");
      this.print("  This is Shubh's data conduit. Flag the location: submit S2E07 \"" + s.city + "\"", "acc");
      if (window.APPS) window.APPS.markServerFound();
    } else {
      this.print("  " + s.city + " — " + s.size + " node, " + s.txGbps + "Gbps. Traffic nominal.", "dim");
    }
  };

  Terminal.prototype.elements = function () {
    const E = window.ASUR.elements;
    Object.keys(E).forEach((k) => {
      this.print(pad(k, 4) + pad(E[k].name, 12), "acc", true);
      this.print("Z=" + pad(String(E[k].z), 5) + "weight=" + E[k].w, "dim");
    });
    this.print("Hint: a coordinate can hide as  <atomic number>.<digits of atomic weight>.", "dim");
  };

  Terminal.prototype.decode = function (a) {
    // decode coords Ni Ir   -> 28.5869, 77.1922
    if ((a[0] || "").toLowerCase() !== "coords" || !a[1] || !a[2])
      return this.print("usage: decode coords <elemLat> <elemLng>   e.g. decode coords Ni Ir", "err");
    const E = window.ASUR.elements;
    const e1 = E[cap(a[1])], e2 = E[cap(a[2])];
    if (!e1 || !e2) return this.print("decode: unknown element (try `elements`)", "err");
    const lat = e1.z + "." + String(e1.w).replace(".", "").slice(0, 4);
    const lng = e2.z + "." + String(e2.w).replace(".", "").slice(0, 4);
    this.print("Decoded → " + lat + ", " + lng, "ok");
    this.print("Open the Map and plot it, or submit it as the flag.", "dim");
  };

  Terminal.prototype.hint = function (code) {
    if (!code) return this.print("usage: hint <CODE>", "err");
    const c = findCase(code);
    if (!c) return this.print("hint: no case " + code, "err");
    const r = window.GAME.useHint(c);
    if (r.done) return this.print("No more hints for " + c.code + ".", "dim");
    this.print("HINT (-" + r.cost + "pts): " + r.text, "acc");
  };

  Terminal.prototype.submit = function (code, flag) {
    if (!code || !flag) return this.print('usage: submit <CODE> "<flag>"', "err");
    const c = findCase(code);
    if (!c) return this.print("submit: no case " + code, "err");
    const res = window.GAME.checkFlag(c, flag);
    if (res.correct) {
      if (res.already) this.print("Already captured " + c.code + ".", "dim");
      else { this.print("✔ FLAG CAPTURED — " + c.code + "  +" + res.gain + "pts", "ok");
             this.print("  " + c.title + ": " + c.flag, "ok"); }
    } else this.print("✘ Incorrect flag for " + c.code + ". Re-examine the evidence.", "err");
  };

  function findCase(code) {
    if (!code) return null;
    return window.CHALLENGES.find((c) => c.code.toLowerCase() === code.toLowerCase());
  }
  function pad(s, n) { s = String(s); return s.length >= n ? s + " " : s + " ".repeat(n - s.length); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }
  function esc(s) { return s.replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m])); }

  window.Terminal = Terminal;
})();

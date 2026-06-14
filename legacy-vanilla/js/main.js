/* ============================================================
   THE GODS CTF — main.js
   Game state, scoring, flag checking, save/load, and the
   boot → login → desktop lifecycle.
   ============================================================ */
(function () {
  const SAVE_KEY = "asur_ctf_save_v1";

  const GAME = {
    score: 0,
    solved: [],
    hintsUsed: {},      // code -> count
    mode: "student",    // student | pro

    /* ---- persistence ---- */
    load() {
      try {
        const s = JSON.parse(localStorage.getItem(SAVE_KEY));
        if (s) { this.score = s.score || 0; this.solved = s.solved || []; this.hintsUsed = s.hintsUsed || {}; this.mode = s.mode || "student"; }
      } catch (e) {}
    },
    save() {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ score: this.score, solved: this.solved, hintsUsed: this.hintsUsed, mode: this.mode }));
    },
    reset() { localStorage.removeItem(SAVE_KEY); location.reload(); },

    /* ---- ranks ---- */
    rank() { return window.ASUR.rankFor(this.score); },

    /* ---- flag normalisation & checking ---- */
    norm(s) {
      return String(s).toLowerCase().trim()
        .replace(/[‘’']/g, "")
        .replace(/[^a-z0-9. ,]/g, " ")
        .replace(/\s+/g, " ").trim();
    },
    checkFlag(c, answer) {
      const a = this.norm(answer);
      const accepts = [this.norm(c.flag), ...(c.acceptedAnswers || []).map((x) => this.norm(x))];
      // exact-ish: also accept comma/space-insensitive coordinate compare
      const aCompact = a.replace(/[ ,]/g, "");
      const ok = accepts.some((x) => x === a || x.replace(/[ ,]/g, "") === aCompact);
      if (!ok) { window.SFX && SFX.error(); return { correct: false }; }
      if (this.solved.includes(c.code)) return { correct: true, already: true };
      const penalty = (this.hintsUsed[c.code] || 0) > 0 ? this._hintCost(c) : 0;
      const gain = Math.max(20, c.points - penalty);
      this.solved.push(c.code); this.score += gain; this.save();
      this.updateHUD();
      window.SFX && SFX.success();
      this.toast("✔ <b>" + c.code + "</b> captured  +" + gain + " pts", "win");
      this._checkRankUp();
      this._checkComplete();
      return { correct: true, gain };
    },
    _hintCost(c) {
      const used = this.hintsUsed[c.code] || 0;
      return (c.hints || []).slice(0, used).reduce((s, h) => s + (h.cost || 0), 0);
    },

    /* ---- hints ---- */
    useHint(c) {
      const used = this.hintsUsed[c.code] || 0;
      if (used >= (c.hints || []).length) return { done: true };
      window.SFX && SFX.hint();
      const h = c.hints[used];
      this.hintsUsed[c.code] = used + 1;
      if (!this.solved.includes(c.code)) { this.score = Math.max(0, this.score - (h.cost || 0)); }
      this.save(); this.updateHUD();
      return { text: h.text, cost: h.cost || 0 };
    },

    _lastRank: null,
    _checkRankUp() {
      const r = this.rank();
      if (this._lastRank && r.name !== this._lastRank) {
        setTimeout(() => { window.SFX && SFX.rankup(); }, 500);
        this.toast("⬆ RANK UP — " + r.icon + " " + r.name, "win");
      }
      this._lastRank = r.name;
    },
    _checkComplete() {
      if (this.solved.length < window.CHALLENGES.length) return;
      const v = document.getElementById("victory");
      const stats = document.getElementById("vicStats");
      stats.innerHTML =
        '<div class="s"><div class="n">' + this.score + '</div><div class="l">FINAL SCORE</div></div>' +
        '<div class="s"><div class="n">' + this.rank().icon + '</div><div class="l">' + this.rank().name.toUpperCase() + '</div></div>' +
        '<div class="s"><div class="n">' + window.CHALLENGES.length + '/' + window.CHALLENGES.length + '</div><div class="l">CASES CAPTURED</div></div>' +
        '<div class="s"><div class="n">' + this.mode.toUpperCase() + '</div><div class="l">MODE</div></div>';
      setTimeout(() => { v.classList.add("show"); window.SFX && SFX.complete(); }, 900);
    },

    /* ---- fake filesystem (terminal) ---- */
    _fs: null,
    buildFS() {
      const fs = JSON.parse(JSON.stringify(window.ASUR.fs));
      const cases = {};
      window.CHALLENGES.forEach((c) => {
        cases[c.code + ".case"] =
          "CASE " + c.code + " — " + c.title + "  [" + c.difficulty + ", " + c.points + "pt]\n" +
          "Q: " + c.flagQuestion + "\n" +
          "format: " + c.flagFormat + "\n" +
          "evidence items: " + c.evidence.length + "  (open `cases` for the board)\n" +
          (this.solved.includes(c.code) ? "STATUS: ✔ CAPTURED\n" : "STATUS: open\n");
      });
      fs["/"]["cases"] = cases;
      const ev = {};
      window.CHALLENGES.forEach((c) => { ev[c.code + ".txt"] = c.evidence.map((e) => "[" + e.type + "] " + e.label + ": " + e.text).join("\n\n"); });
      fs["/"]["evidence"] = ev;
      this._fs = fs;
    },
    fsDir(path) {
      if (!this._fs) this.buildFS();
      if (!path || path === "/") return this._fs["/"];
      const key = path.replace(/^\//, "").replace(/\/$/, "");
      const node = this._fs["/"][key];
      return (node && typeof node === "object") ? node : null;
    },
    fsFile(cwd, name) {
      if (!this._fs) this.buildFS();
      const dir = this.fsDir(cwd) || this._fs["/"];
      const v = dir[name];
      return typeof v === "string" ? v : (v ? "[directory]" : null);
    },

    /* ---- HUD ---- */
    updateHUD() {
      const r = this.rank();
      const next = window.ASUR.nextRank(this.score);
      set("scoreVal", this.score + " pts");
      set("rankVal", r.icon + " " + r.name);
      set("solvedVal", this.solved.length + "/" + window.CHALLENGES.length);
      const nt = document.getElementById("nextRank");
      if (nt) nt.textContent = next ? "next: " + next.name + " @ " + next.min : "MAX RANK";
      if (this._fs) this.buildFS(); // refresh case statuses
    },

    toast(html, cls) {
      const t = document.getElementById("toast");
      t.className = "show " + (cls || ""); t.innerHTML = html;
      clearTimeout(this._tt); this._tt = setTimeout(() => t.className = "", 2600);
    },
  };
  window.GAME = GAME;

  function set(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }

  /* ====================== BOOT ====================== */
  function boot() {
    GAME.load();
    const bootEl = document.getElementById("boot");
    const lines = window.ASUR.os.boot;
    let i = 0;
    bootEl.innerHTML = "";
    const cur = '<span class="cursor"></span>';
    function next() {
      if (i < lines.length) {
        bootEl.innerHTML = lines.slice(0, i + 1).join("\n") + "\n" + cur;
        window.SFX && SFX.bootLine();
        i++;
        setTimeout(next, 130 + Math.min(180, lines[i - 1].length * 4));
      } else {
        setTimeout(() => { bootEl.style.display = "none"; showLogin(); }, 600);
      }
    }
    next();
    // allow skip
    bootEl.addEventListener("click", () => { bootEl.style.display = "none"; showLogin(); });
  }

  function showLogin() {
    const login = document.getElementById("login");
    login.classList.add("show");
    // mode selection
    let mode = GAME.mode;
    const studentEl = document.getElementById("modeStudent");
    const proEl = document.getElementById("modePro");
    function paint() {
      studentEl.classList.toggle("active", mode === "student");
      proEl.classList.toggle("active", mode === "pro");
    }
    studentEl.onclick = () => { mode = "student"; paint(); };
    proEl.onclick = () => { mode = "pro"; paint(); };
    paint();
    document.getElementById("enterBtn").onclick = () => {
      window.SFX && SFX.init();          // resume audio on first user gesture
      window.SFX && SFX.open();
      GAME.mode = mode; GAME.save();
      login.classList.remove("show");
      startDesktop();
    };
    document.getElementById("modeStudent").addEventListener("click", () => window.SFX && SFX.tick());
    document.getElementById("modePro").addEventListener("click", () => window.SFX && SFX.tick());
  }

  function startDesktop() {
    const d = document.getElementById("desktop");
    d.classList.add("show");
    WM.init();
    GAME._lastRank = GAME.rank().name;
    GAME.buildFS();
    GAME.updateHUD();
    set("modeVal", GAME.mode === "pro" ? "PRO" : "STUDENT");
    // clock
    setInterval(() => {
      const now = new Date(Date.now());
      set("clock", now.toLocaleTimeString());
    }, 1000);
    // launcher icons
    document.querySelectorAll(".dicon").forEach((ic) =>
      ic.addEventListener("dblclick", () => APPS.open(ic.dataset.app)));
    document.querySelectorAll(".dicon").forEach((ic) =>
      ic.addEventListener("click", () => APPS.open(ic.dataset.app)));
    // start menu
    document.getElementById("startBtn").onclick = () => {
      APPS.open("cases");
    };
    document.getElementById("resetBtn").onclick = () => {
      if (confirm("Wipe all progress and restart?")) GAME.reset();
    };
    // mute toggle
    const mutePill = document.getElementById("mutePill");
    set("muteVal", window.SFX && SFX.muted ? "off" : "on");
    mutePill.firstChild.textContent = window.SFX && SFX.muted ? "🔇 " : "🔊 ";
    mutePill.onclick = () => {
      const muted = window.SFX ? SFX.toggleMute() : true;
      set("muteVal", muted ? "off" : "on");
      mutePill.firstChild.textContent = muted ? "🔇 " : "🔊 ";
    };
    // victory close
    document.getElementById("vicClose").onclick = () =>
      document.getElementById("victory").classList.remove("show");
    // open the two signature tools to set the scene
    APPS.terminal();
    APPS.cases();
    GAME.toast("Welcome back, Agent Nair. " + GAME.solved.length + " case(s) captured.");
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

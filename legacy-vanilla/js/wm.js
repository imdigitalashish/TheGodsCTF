/* ============================================================
   THE GODS CTF — wm.js  (tiny window manager)
   Draggable, focusable, minimisable windows + taskbar sync.
   ============================================================ */
(function () {
  const WM = {
    wins: {},
    z: 10,
    stage: null,
    taskbar: null,

    init() {
      this.stage = document.getElementById("stage");
      this.taskbar = document.getElementById("tasks");
    },

    /* open or focus a window keyed by id. spec.render(bodyEl) fills it. */
    open(spec) {
      if (this.wins[spec.id]) {
        const w = this.wins[spec.id];
        w.el.classList.remove("min");
        this.focus(spec.id);
        if (spec.onFocus) spec.onFocus(w.body);
        return w;
      }
      const el = document.createElement("div");
      el.className = "win";
      const w = Math.min(spec.width || 720, this.stage.clientWidth - 40);
      const h = Math.min(spec.height || 460, this.stage.clientHeight - 40);
      el.style.width = w + "px";
      el.style.height = h + "px";
      const count = Object.keys(this.wins).length;
      el.style.left = (spec.x != null ? spec.x : 90 + count * 26) + "px";
      el.style.top = (spec.y != null ? spec.y : 40 + count * 22) + "px";
      el.style.zIndex = ++this.z;

      el.innerHTML =
        '<div class="win-bar">' +
          '<span class="ic">' + (spec.icon || "▣") + "</span>" +
          '<span class="ti">' + spec.title + "</span>" +
          '<span class="grow"></span>' +
          '<button class="win-dot d-min" title="minimise"></button>' +
          '<button class="win-dot d-max" title="maximise"></button>' +
          '<button class="win-dot d-close" title="close"></button>' +
        "</div>" +
        '<div class="win-body"></div>';

      this.stage.appendChild(el);
      const body = el.querySelector(".win-body");
      const bar = el.querySelector(".win-bar");
      const rec = { id: spec.id, el, body, bar, title: spec.title, icon: spec.icon, max: false, prev: null };
      this.wins[spec.id] = rec;

      el.addEventListener("mousedown", () => this.focus(spec.id));
      el.querySelector(".d-close").addEventListener("click", (e) => { e.stopPropagation(); this.close(spec.id); });
      el.querySelector(".d-min").addEventListener("click", (e) => { e.stopPropagation(); el.classList.add("min"); this.syncTasks(); });
      el.querySelector(".d-max").addEventListener("click", (e) => { e.stopPropagation(); this.toggleMax(spec.id); });
      this.makeDraggable(rec);

      if (spec.render) spec.render(body);
      window.SFX && window.SFX.open();
      this.focus(spec.id);
      this.syncTasks();
      if (spec.onResize) {
        rec.onResize = spec.onResize;
      }
      return rec;
    },

    toggleMax(id) {
      const r = this.wins[id]; if (!r) return;
      if (!r.max) {
        r.prev = { left: r.el.style.left, top: r.el.style.top, width: r.el.style.width, height: r.el.style.height };
        r.el.style.left = "8px"; r.el.style.top = "6px";
        r.el.style.width = (this.stage.clientWidth - 16) + "px";
        r.el.style.height = (this.stage.clientHeight - 14) + "px";
        r.max = true;
      } else {
        Object.assign(r.el.style, r.prev); r.max = false;
      }
      if (r.onResize) r.onResize(r.body);
    },

    makeDraggable(r) {
      let sx, sy, ox, oy, drag = false;
      r.bar.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("win-dot")) return;
        drag = true; sx = e.clientX; sy = e.clientY;
        ox = parseInt(r.el.style.left); oy = parseInt(r.el.style.top);
        document.body.style.cursor = "move";
      });
      window.addEventListener("mousemove", (e) => {
        if (!drag) return;
        let nx = ox + (e.clientX - sx), ny = oy + (e.clientY - sy);
        nx = Math.max(-40, Math.min(nx, this.stage.clientWidth - 80));
        ny = Math.max(0, Math.min(ny, this.stage.clientHeight - 36));
        r.el.style.left = nx + "px"; r.el.style.top = ny + "px";
      });
      window.addEventListener("mouseup", () => { drag = false; document.body.style.cursor = ""; });
    },

    focus(id) {
      const r = this.wins[id]; if (!r) return;
      r.el.style.zIndex = ++this.z;
      Object.values(this.wins).forEach((w) => w.el.classList.toggle("focus", w === r));
      this.syncTasks();
    },

    close(id) {
      const r = this.wins[id]; if (!r) return;
      r.el.remove(); delete this.wins[id]; this.syncTasks();
    },

    syncTasks() {
      if (!this.taskbar) return;
      this.taskbar.innerHTML = "";
      Object.values(this.wins).forEach((w) => {
        const t = document.createElement("button");
        t.className = "task" + (w.el.classList.contains("focus") && !w.el.classList.contains("min") ? " active" : "");
        t.innerHTML = '<span>' + (w.icon || "▣") + "</span><span>" + w.title + "</span>";
        t.addEventListener("click", () => {
          if (w.el.classList.contains("min")) { w.el.classList.remove("min"); this.focus(w.id); }
          else if (w.el.classList.contains("focus")) { w.el.classList.add("min"); this.syncTasks(); }
          else this.focus(w.id);
        });
        this.taskbar.appendChild(t);
      });
    },
  };
  window.WM = WM;
})();

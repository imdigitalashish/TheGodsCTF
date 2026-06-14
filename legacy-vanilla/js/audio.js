/* ============================================================
   THE GODS CTF — audio.js
   Tiny WebAudio SFX engine. No asset files — every sound is
   synthesised. Respects a mute flag persisted in localStorage.
   ============================================================ */
(function () {
  const SFX = {
    ctx: null,
    muted: localStorage.getItem("asur_muted") === "1",

    init() {
      if (this.ctx) { if (this.ctx.state === "suspended") this.ctx.resume(); return; }
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { this.ctx = null; }
    },
    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem("asur_muted", this.muted ? "1" : "0");
      if (!this.muted) { this.init(); this.blip(660, 0.05); }
      return this.muted;
    },

    /* one oscillator note */
    note(freq, dur, type, vol, when) {
      if (this.muted || !this.ctx) return;
      const t0 = this.ctx.currentTime + (when || 0);
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol || 0.18, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(g); g.connect(this.ctx.destination);
      osc.start(t0); osc.stop(t0 + dur + 0.02);
    },
    blip(freq, dur) { this.note(freq || 440, dur || 0.06, "square", 0.06); },
    tick() { this.note(1200, 0.018, "square", 0.025); },
    bootLine() { this.note(320 + Math.round(140 * fakeRand()), 0.05, "square", 0.04); },
    open() { this.note(520, 0.05, "triangle", 0.05); this.note(780, 0.05, "triangle", 0.04, 0.04); },
    error() { this.note(180, 0.18, "sawtooth", 0.10); this.note(120, 0.22, "sawtooth", 0.09, 0.06); },
    success() { [523, 659, 784, 1046].forEach((f, i) => this.note(f, 0.18, "triangle", 0.10, i * 0.08)); },
    rankup() { [392, 523, 659, 784, 1046, 1318].forEach((f, i) => this.note(f, 0.22, "square", 0.08, i * 0.07)); },
    hint() { this.note(880, 0.08, "sine", 0.06); this.note(660, 0.10, "sine", 0.05, 0.07); },
    complete() { [523, 659, 784, 1046, 784, 1046, 1318].forEach((f, i) => this.note(f, 0.3, "triangle", 0.11, i * 0.16)); },
  };
  // deterministic pseudo-random (Math.random-free for boot variety)
  let _seed = 7;
  function fakeRand() { _seed = (_seed * 9301 + 49297) % 233280; return _seed / 233280; }

  window.SFX = SFX;
})();

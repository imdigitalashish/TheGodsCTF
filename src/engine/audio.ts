/* ============================================================
   THE GODS CTF — synthesised SFX engine (no asset files)
   ============================================================ */
class AudioEngine {
  private ctx: AudioContext | null = null;
  muted = false;

  constructor() {
    this.muted = localStorage.getItem("asur_muted") === "1";
  }

  /** Must be called from a user gesture to satisfy autoplay policy. */
  init(): void {
    if (this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return;
    }
    try {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
    } catch {
      this.ctx = null;
    }
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    localStorage.setItem("asur_muted", this.muted ? "1" : "0");
    if (!this.muted) {
      this.init();
      this.note(660, 0.05, "square", 0.06);
    }
    return this.muted;
  }

  private note(freq: number, dur: number, type: OscillatorType, vol: number, when = 0): void {
    if (this.muted || !this.ctx) return;
    const t0 = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  private chord(freqs: number[], dur: number, type: OscillatorType, vol: number, step: number): void {
    freqs.forEach((f, i) => this.note(f, dur, type, vol, i * step));
  }

  tick(): void { this.note(1200, 0.018, "square", 0.025); }
  open(): void { this.note(520, 0.05, "triangle", 0.05); this.note(780, 0.05, "triangle", 0.04, 0.04); }
  error(): void { this.note(180, 0.18, "sawtooth", 0.1); this.note(120, 0.22, "sawtooth", 0.09, 0.06); }
  hint(): void { this.note(880, 0.08, "sine", 0.06); this.note(660, 0.1, "sine", 0.05, 0.07); }
  success(): void { this.chord([523, 659, 784, 1046], 0.18, "triangle", 0.1, 0.08); }
  rankup(): void { this.chord([392, 523, 659, 784, 1046, 1318], 0.22, "square", 0.08, 0.07); }
  complete(): void { this.chord([523, 659, 784, 1046, 784, 1046, 1318], 0.3, "triangle", 0.11, 0.16); }
  bootLine(): void { this.note(360, 0.04, "square", 0.035); }
}

export const audio = new AudioEngine();

/* ============================================================
   THE GODS CTF — game store (zustand, persisted)
   ============================================================ */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CharacterId, Mode, Mission } from "@/types";
import { missions } from "@/data/campaign";
import { rankFor } from "@/data/world";
import { isFlagCorrect } from "@/engine/flag";
import { audio } from "@/engine/audio";

export type Phase = "boot" | "login" | "desktop";
export interface Toast { id: number; msg: string; kind: "" | "win" }

export interface CaptureResult { correct: boolean; already?: boolean; gain?: number }

interface GameState {
  phase: Phase;
  mode: Mode;
  activeCharacter: CharacterId;
  score: number;
  solved: string[];
  hintsUsed: Record<string, number>;
  shubhUnlocked: boolean;
  muted: boolean;
  toast: Toast | null;
  victory: boolean;

  setPhase: (p: Phase) => void;
  enter: (mode: Mode, character: CharacterId) => void;
  setCharacter: (id: CharacterId) => void;
  capture: (mission: Mission, answer: string) => CaptureResult;
  buyHint: (mission: Mission) => { text: string; cost: number } | null;
  showToast: (msg: string, kind?: "" | "win") => void;
  clearToast: () => void;
  toggleMute: () => void;
  dismissVictory: () => void;
  reset: () => void;
}

let toastSeq = 0;

function hintPenalty(mission: Mission, used: number): number {
  return mission.hints.slice(0, used).reduce((s, h) => s + h.cost, 0);
}

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      phase: "boot",
      mode: "student",
      activeCharacter: "nikhil",
      score: 0,
      solved: [],
      hintsUsed: {},
      shubhUnlocked: false,
      muted: audio.muted,
      toast: null,
      victory: false,

      setPhase: (p) => set({ phase: p }),

      enter: (mode, character) => {
        audio.init();
        audio.open();
        set({ mode, activeCharacter: character, phase: "desktop" });
      },

      setCharacter: (id) => {
        audio.tick();
        set({ activeCharacter: id });
      },

      capture: (mission, answer) => {
        const { solved, hintsUsed, score } = get();
        if (!isFlagCorrect(mission, answer)) {
          audio.error();
          return { correct: false };
        }
        if (solved.includes(mission.code)) return { correct: true, already: true };

        const used = hintsUsed[mission.code] ?? 0;
        const gain = Math.max(20, mission.points - hintPenalty(mission, used));
        const newScore = score + gain;
        const newSolved = [...solved, mission.code];

        const rankedUp = rankFor(newScore).name !== rankFor(score).name;
        const complete = newSolved.length >= missions.length;

        set({ score: newScore, solved: newSolved });
        audio.success();
        get().showToast(`✔ ${mission.codename} captured  +${gain} pts`, "win");

        if (rankedUp) {
          window.setTimeout(() => audio.rankup(), 500);
          const r = rankFor(newScore);
          window.setTimeout(() => get().showToast(`⬆ RANK UP — ${r.icon} ${r.name}`, "win"), 1200);
        }
        if (complete) {
          set({ shubhUnlocked: true });
          window.setTimeout(() => {
            set({ victory: true });
            audio.complete();
          }, 1400);
        }
        return { correct: true, gain };
      },

      buyHint: (mission) => {
        const { hintsUsed, score, solved } = get();
        const used = hintsUsed[mission.code] ?? 0;
        if (used >= mission.hints.length) return null;
        const hint = mission.hints[used]!;
        audio.hint();
        set({
          hintsUsed: { ...hintsUsed, [mission.code]: used + 1 },
          score: solved.includes(mission.code) ? score : Math.max(0, score - hint.cost),
        });
        return { text: hint.text, cost: hint.cost };
      },

      showToast: (msg, kind = "") => set({ toast: { id: ++toastSeq, msg, kind } }),
      clearToast: () => set({ toast: null }),

      toggleMute: () => set({ muted: audio.toggleMute() }),

      dismissVictory: () => set({ victory: false }),

      reset: () => {
        localStorage.removeItem("asur_ctf_save_v2");
        set({ score: 0, solved: [], hintsUsed: {}, shubhUnlocked: false, victory: false, phase: "login" });
      },
    }),
    {
      name: "asur_ctf_save_v2",
      partialize: (s) => ({
        mode: s.mode,
        activeCharacter: s.activeCharacter,
        score: s.score,
        solved: s.solved,
        hintsUsed: s.hintsUsed,
        shubhUnlocked: s.shubhUnlocked,
      }),
    },
  ),
);

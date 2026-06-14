/* ============================================================
   THE GODS CTF — window manager store (zustand)
   ============================================================ */
import { create } from "zustand";
import { audio } from "@/engine/audio";

export type AppId =
  | "terminal"
  | "cases"
  | "network"
  | "map"
  | "lab"
  | `mission:${string}`;

export interface WinState {
  id: AppId;
  title: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** Optional payload, e.g. the mission code for a mission window. */
  payload?: string;
}

interface WindowStore {
  windows: WinState[];
  topZ: number;
  open: (spec: { id: AppId; title: string; icon: string; w?: number; h?: number; payload?: string }) => void;
  close: (id: AppId) => void;
  focus: (id: AppId) => void;
  toggleMin: (id: AppId) => void;
  toggleMax: (id: AppId) => void;
  move: (id: AppId, x: number, y: number) => void;
  closeAll: () => void;
}

export const useWindows = create<WindowStore>((set, get) => ({
  windows: [],
  topZ: 10,

  open: ({ id, title, icon, w = 760, h = 520, payload }) => {
    const existing = get().windows.find((win) => win.id === id);
    const z = get().topZ + 1;
    if (existing) {
      set((s) => ({
        topZ: z,
        windows: s.windows.map((win) =>
          win.id === id ? { ...win, minimized: false, z, payload: payload ?? win.payload } : win,
        ),
      }));
      return;
    }
    const count = get().windows.length;
    const stageW = window.innerWidth;
    const stageH = window.innerHeight;
    const win: WinState = {
      id, title, icon, payload,
      w: Math.min(w, stageW - 40),
      h: Math.min(h, stageH - 120),
      x: Math.min(110 + count * 28, stageW - 360),
      y: 54 + (count % 5) * 24,
      z, minimized: false, maximized: false,
    };
    audio.open();
    set((s) => ({ windows: [...s.windows, win], topZ: z }));
  },

  close: (id) => set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focus: (id) => {
    const z = get().topZ + 1;
    set((s) => ({ topZ: z, windows: s.windows.map((w) => (w.id === id ? { ...w, z } : w)) }));
  },

  toggleMin: (id) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)) })),

  toggleMax: (id) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)) })),

  move: (id, x, y) => set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)) })),

  closeAll: () => set({ windows: [] }),
}));

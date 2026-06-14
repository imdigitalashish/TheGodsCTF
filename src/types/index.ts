/* ============================================================
   THE GODS CTF — domain types
   ============================================================ */

export type Difficulty = "rookie" | "investigator" | "profiler" | "mastermind";
export type EvidenceType = "transcript" | "forensic" | "intercept" | "profile" | "cipher";
export type LabTool = "none" | "periodic-table" | "coordinate-plotter" | "cipher-decoder" | "map";
export type CharacterId = "nikhil" | "nusrat" | "dj" | "shubh";
export type Mode = "student" | "pro";

export interface Evidence {
  id: string;
  type: EvidenceType;
  label: string;
  text: string;
  /** Plausible but misleading. Surfaced as a marker only in Student mode. */
  redHerring: boolean;
}

export interface Hint {
  cost: number;
  text: string;
}

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  tagline: string;
  /** One-word play-style label. */
  lens: string;
  lensDescription: string;
  color: string;
  glyph: string;
  locked: boolean;
}

export interface Act {
  id: string;
  title: string;
  subtitle: string;
  order: number;
}

export interface Mission {
  /** Stable legacy id (e.g. "S2E07") — used for save data + cross-refs. */
  code: string;
  /** Operation codename shown to the player, e.g. "THE INVISIBLE FIFTH". */
  codename: string;
  /** Original source title, shown small for context. */
  title: string;
  order: number;
  actId: string;
  characterId: CharacterId;
  difficulty: Difficulty;
  points: number;
  labTool: LabTool;
  /** Narrative beat shown before the briefing. */
  intro: string;
  /** Narrative beat shown after the flag is captured. */
  outro: string;
  briefing: string;
  flagQuestion: string;
  flag: string;
  acceptedAnswers: string[];
  flagFormat: string;
  evidence: Evidence[];
  solutionSteps: string[];
  hints: Hint[];
  mcqOptions: string[];
}

export interface ServerNode {
  id: string;
  city: string;
  lat: number;
  lng: number;
  size: "mid" | "big" | "hidden";
  txGbps: number;
  hidden?: boolean;
}

export interface Rank {
  min: number;
  name: string;
  icon: string;
}

export interface ElementInfo {
  z: number;
  w: number;
  name: string;
}

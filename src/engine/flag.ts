/* ============================================================
   THE GODS CTF — flag normalisation & checking
   ============================================================ */
import type { Mission } from "@/types";

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[‘’']/g, "")
    .replace(/[^a-z0-9. ,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Forgiving match: punctuation/spacing-insensitive against the flag
    and all accepted variants. */
export function isFlagCorrect(mission: Mission, answer: string): boolean {
  const a = normalize(answer);
  if (!a) return false;
  const aCompact = a.replace(/[ ,]/g, "");
  const accepts = [mission.flag, ...mission.acceptedAnswers].map(normalize);
  return accepts.some((x) => x === a || x.replace(/[ ,]/g, "") === aCompact);
}

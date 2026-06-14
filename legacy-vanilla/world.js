/* ============================================================
   THE GODS CTF — world.js
   Static "world" data for the AsurOS investigation environment:
   the Spell Notion server fleet, agent ranks, intro lore, and the
   in-terminal fake filesystem. (Case content lives in challenges.js)
   ============================================================ */

window.ASUR = window.ASUR || {};

/* ---- Operator / lore ---------------------------------------- */
window.ASUR.os = {
  name: "AsurOS",
  version: "2.0.4",
  org: "CBI · Forensic Cyber Division",
  operator: "Nikhil Nair",
  clearance: "OMEGA",
  boot: [
    "AsurOS 2.0.4  (kernel 5.18.0-asur)  © CBI Forensic Cyber Division",
    "POST .......... OK",
    "Mounting /evidence ........ OK",
    "Mounting /cases ........... OK",
    "Loading forensic toolkit .. OK",
    "Establishing secure uplink to N.I.C. ... OK",
    "Decrypting operator profile ... OK",
    "",
    "  \"The dead can talk. The more you listen, the more they talk.\"",
    "",
  ],
};

/* ---- Agent ranks (by score) --------------------------------- */
window.ASUR.ranks = [
  { min: 0,    name: "Rookie",        icon: "🔰" },
  { min: 250,  name: "Field Agent",   icon: "🪪" },
  { min: 700,  name: "Investigator",  icon: "🔎" },
  { min: 1500, name: "Profiler",      icon: "🧠" },
  { min: 2600, name: "Asur Hunter",   icon: "🗡" },
  { min: 4000, name: "God Slayer",    icon: "⚡" },
];

window.ASUR.rankFor = function (score) {
  let r = window.ASUR.ranks[0];
  for (const rank of window.ASUR.ranks) if (score >= rank.min) r = rank;
  return r;
};
window.ASUR.nextRank = function (score) {
  return window.ASUR.ranks.find((r) => r.min > score) || null;
};

/* ---- Spell Notion server fleet (S2E07 flagship hunt) --------
   25 nodes across India. The hidden node SN-05 (Noida) carries
   ~10x the outgoing traffic of every other node — that anomaly
   is what the player must spot in the Server Map app.        */
window.ASUR.servers = [
  { id: "SN-01", city: "Mumbai",        lat: 19.0760, lng: 72.8777, size: "big",    txGbps: 94 },
  { id: "SN-02", city: "Delhi",         lat: 28.6139, lng: 77.2090, size: "big",    txGbps: 88 },
  { id: "SN-03", city: "Bengaluru",     lat: 12.9716, lng: 77.5946, size: "big",    txGbps: 91 },
  { id: "SN-04", city: "Chennai",       lat: 13.0827, lng: 80.2707, size: "big",    txGbps: 79 },
  { id: "SN-05", city: "Noida, Phase-2, Dadri Road", lat: 28.5700, lng: 77.3400, size: "hidden", txGbps: 947, hidden: true },
  { id: "SN-06", city: "Hyderabad",     lat: 17.3850, lng: 78.4867, size: "mid",    txGbps: 31 },
  { id: "SN-07", city: "Kolkata",       lat: 22.5726, lng: 88.3639, size: "mid",    txGbps: 28 },
  { id: "SN-08", city: "Pune",          lat: 18.5204, lng: 73.8567, size: "mid",    txGbps: 35 },
  { id: "SN-09", city: "Ahmedabad",     lat: 23.0225, lng: 72.5714, size: "mid",    txGbps: 22 },
  { id: "SN-10", city: "Gurugram",      lat: 28.4595, lng: 77.0266, size: "mid",    txGbps: 40 },
  { id: "SN-11", city: "Jaipur",        lat: 26.9124, lng: 75.7873, size: "mid",    txGbps: 18 },
  { id: "SN-12", city: "Lucknow",       lat: 26.8467, lng: 80.9462, size: "mid",    txGbps: 16 },
  { id: "SN-13", city: "Nagpur",        lat: 21.1458, lng: 79.0882, size: "mid",    txGbps: 14 },
  { id: "SN-14", city: "Indore",        lat: 22.7196, lng: 75.8577, size: "mid",    txGbps: 19 },
  { id: "SN-15", city: "Bhopal",        lat: 23.2599, lng: 77.4126, size: "mid",    txGbps: 12 },
  { id: "SN-16", city: "Chandigarh",    lat: 30.7333, lng: 76.7794, size: "mid",    txGbps: 21 },
  { id: "SN-17", city: "Kochi",         lat: 9.9312,  lng: 76.2673, size: "mid",    txGbps: 11 },
  { id: "SN-18", city: "Visakhapatnam", lat: 17.6868, lng: 83.2185, size: "mid",    txGbps: 9  },
  { id: "SN-19", city: "Coimbatore",    lat: 11.0168, lng: 76.9558, size: "mid",    txGbps: 13 },
  { id: "SN-20", city: "Surat",         lat: 21.1702, lng: 72.8311, size: "mid",    txGbps: 17 },
  { id: "SN-21", city: "Patna",         lat: 25.5941, lng: 85.1376, size: "mid",    txGbps: 8  },
  { id: "SN-22", city: "Bhubaneswar",   lat: 20.2961, lng: 85.8245, size: "mid",    txGbps: 10 },
  { id: "SN-23", city: "Guwahati",      lat: 26.1445, lng: 91.7362, size: "mid",    txGbps: 7  },
  { id: "SN-24", city: "Mysuru",        lat: 12.2958, lng: 76.6394, size: "mid",    txGbps: 15 },
  { id: "SN-25", city: "Mohali",        lat: 30.7046, lng: 76.7179, size: "mid",    txGbps: 20 },
];

/* ---- Periodic table subset for the Forensic Lab decoder ----- */
window.ASUR.elements = {
  Ni: { z: 28, w: 58.693,  name: "Nickel" },
  Ir: { z: 77, w: 192.217, name: "Iridium" },
  C:  { z: 6,  w: 12.011,  name: "Carbon" },
  O:  { z: 8,  w: 15.999,  name: "Oxygen" },
  Fe: { z: 26, w: 55.845,  name: "Iron" },
  Pb: { z: 82, w: 207.2,   name: "Lead" },
  As: { z: 33, w: 74.922,  name: "Arsenic" },
  K:  { z: 19, w: 39.098,  name: "Potassium" },
  Na: { z: 11, w: 22.990,  name: "Sodium" },
  Hg: { z: 80, w: 200.592, name: "Mercury" },
};

/* ---- Fake filesystem for the terminal (`ls`, `cat`, `cd`) ----
   Folders are filled dynamically from CHALLENGES at boot; this is
   the static skeleton.                                          */
window.ASUR.fs = {
  "/": {
    "readme.txt":
      "AGENT NIKHIL NAIR — clearance OMEGA\n" +
      "Type `help` for the command list. Your job: work each CASE in /cases,\n" +
      "study the evidence, and `submit <CODE> <flag>` to capture it.\n" +
      "Tools: `open terminal|cases|network|map|lab|evidence`.",
    "manifest.txt":
      "Active operation: PROJECT EQUILIBRIUM\n" +
      "Adversary: 'Shubh' (alias Kali). AI backbone: Spell Notion.\n" +
      "Mandate: trace, attribute, and shut down each attack vector.",
  },
};

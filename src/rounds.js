export const ROUNDS = [
  {
    id: 1,
    label: "1ª Rodada — Fase de Grupos",
    startDate: "2026-06-11",
    matches: [
      { id: "m1",  home: "México",       away: "África do Sul",  date: "11/06", time: "16h",    city: "Cidade do México", group: "A", result: { home: 2, away: 1 } },
      { id: "m2",  home: "Coreia do Sul", away: "Rep. Tcheca",   date: "11/06", time: "23h",    city: "Guadalajara",      group: "A", result: { home: 1, away: 1 } },
      { id: "m3",  home: "Canadá",       away: "Bósnia",         date: "12/06", time: "16h",    city: "Toronto",          group: "B", result: { home: 3, away: 0 } },
      { id: "m4",  home: "EUA",          away: "Paraguai",       date: "12/06", time: "22h",    city: "Los Angeles",      group: "D", result: { home: 1, away: 0 } },
      { id: "m5",  home: "Qatar",        away: "Suíça",          date: "13/06", time: "16h",    city: "San Francisco",    group: "B", result: { home: 0, away: 2 } },
      { id: "m6",  home: "Brasil",       away: "Marrocos",       date: "13/06", time: "19h",    city: "Nova York/NJ",     group: "C", result: { home: 2, away: 0 } },
      { id: "m7",  home: "Haiti",        away: "Escócia",        date: "13/06", time: "22h",    city: "Boston",           group: "C", result: { home: 1, away: 3 } },
    ],
  },
  {
    id: 2,
    label: "2ª Rodada — Fase de Grupos",
    startDate: "2026-06-17",
    matches: [
      { id: "m8",  home: "Rep. Tcheca",  away: "África do Sul",  date: "18/06", time: "13h",    city: "Atlanta",          group: "A", result: null },
      { id: "m9",  home: "Brasil",       away: "Haiti",          date: "19/06", time: "21h30",  city: "Philadelphia",     group: "C", result: null },
      { id: "m10", home: "México",       away: "Coreia do Sul",  date: "18/06", time: "22h",    city: "Guadalajara",      group: "A", result: null },
      { id: "m11", home: "Escócia",      away: "Marrocos",       date: "19/06", time: "16h",    city: "Boston",           group: "C", result: null },
    ],
  },
  {
    id: 3,
    label: "3ª Rodada — Fase de Grupos",
    startDate: "2026-06-24",
    matches: [
      { id: "m12", home: "Brasil",       away: "Escócia",        date: "26/06", time: "20h",    city: "Seattle",          group: "C", result: null },
      { id: "m13", home: "Marrocos",     away: "Haiti",          date: "26/06", time: "20h",    city: "Houston",          group: "C", result: null },
    ],
  },
]

export function getOutcome(h, a) {
  if (h > a) return "home"; if (a > h) return "away"; return "draw";
}

export function calcPoints(pick, result) {
  if (!result || pick.home == null || pick.away == null) return null;
  const po = getOutcome(pick.home, pick.away), ro = getOutcome(result.home, result.away);
  if (po !== ro) return 0;
  if (pick.home === result.home && pick.away === result.away) return 5;
  return 1;
}

export function isRoundOpen(startDate) {
  const today = new Date(); today.setHours(0,0,0,0);
  return today >= new Date(startDate + "T00:00:00");
}

export function isRoundFinished(round) {
  return round.matches.every(m => !!m.result);
}

export function formatDateBR(ds) {
  if (!ds) return ""; const [,m,d] = ds.split("-"); return `${d}/${m}`;
}

export function stringColor(str) {
  const colors = ["#1A8C4E","#2563EB","#7C3AED","#B45309","#BE185D","#0E7490","#15803D"];
  let h = 0; for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

export function initials(name) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

export function formatDob(dob) {
  if (!dob) return "";
  const [y,m,d] = dob.split("-"); return `${d}/${m}/${y}`;
}

export const FLAGS = {
  "México":         "🇲🇽",
  "África do Sul":  "🇿🇦",
  "Coreia do Sul":  "🇰🇷",
  "Rep. Tcheca":    "🇨🇿",
  "Canadá":         "🇨🇦",
  "Bósnia":         "🇧🇦",
  "Qatar":          "🇶🇦",
  "Suíça":          "🇨🇭",
  "EUA":            "🇺🇸",
  "Paraguai":       "🇵🇾",
  "Austrália":      "🇦🇺",
  "Turquia":        "🇹🇷",
  "Alemanha":       "🇩🇪",
  "Curaçao":        "🇨🇼",
  "Costa do Marfim":"🇨🇮",
  "Equador":        "🇪🇨",
  "Países Baixos":  "🇳🇱",
  "Japão":          "🇯🇵",
  "Suécia":         "🇸🇪",
  "Tunísia":        "🇹🇳",
  "Bélgica":        "🇧🇪",
  "Egito":          "🇪🇬",
  "Irã":            "🇮🇷",
  "Nova Zelândia":  "🇳🇿",
  "Espanha":        "🇪🇸",
  "Cabo Verde":     "🇨🇻",
  "Arábia Saudita": "🇸🇦",
  "Uruguai":        "🇺🇾",
  "França":         "🇫🇷",
  "Senegal":        "🇸🇳",
  "Iraque":         "🇮🇶",
  "Noruega":        "🇳🇴",
  "Argentina":      "🇦🇷",
  "Argélia":        "🇩🇿",
  "Áustria":        "🇦🇹",
  "Jordânia":       "🇯🇴",
  "Portugal":       "🇵🇹",
  "Congo (RD)":     "🇨🇩",
  "Uzbequistão":    "🇺🇿",
  "Colômbia":       "🇨🇴",
  "Inglaterra":     "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Croácia":        "🇭🇷",
  "Gana":           "🇬🇭",
  "Panamá":         "🇵🇦",
  "Brasil":         "🇧🇷",
  "Marrocos":       "🇲🇦",
  "Haiti":          "🇭🇹",
  "Escócia":        "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
}

// kickoff = horário de Brasília (BRT = UTC-3)
export const ROUNDS = [
  {
    id: 1,
    label: "1ª Rodada — Fase de Grupos",
    startDate: "2026-06-11",
    matches: [
      { id: "m1",  home: "México",         away: "África do Sul",   date: "11/06", time: "16h",    city: "Cidade do México", group: "A", kickoff: "2026-06-11T16:00", result: { home: 2, away: 1 } },
      { id: "m2",  home: "Coreia do Sul",  away: "Rep. Tcheca",     date: "11/06", time: "23h",    city: "Guadalajara",      group: "A", kickoff: "2026-06-11T23:00", result: { home: 1, away: 1 } },
      { id: "m3",  home: "Canadá",         away: "Bósnia",          date: "12/06", time: "16h",    city: "Toronto",          group: "B", kickoff: "2026-06-12T16:00", result: { home: 3, away: 0 } },
      { id: "m4",  home: "Qatar",          away: "Suíça",           date: "13/06", time: "16h",    city: "San Francisco",    group: "B", kickoff: "2026-06-13T16:00", result: { home: 0, away: 2 } },
      { id: "m5",  home: "Brasil",         away: "Marrocos",        date: "13/06", time: "19h",    city: "Nova York/NJ",     group: "C", kickoff: "2026-06-13T19:00", result: { home: 2, away: 0 } },
      { id: "m6",  home: "Haiti",          away: "Escócia",         date: "13/06", time: "22h",    city: "Boston",           group: "C", kickoff: "2026-06-13T22:00", result: { home: 1, away: 3 } },
      { id: "m7",  home: "EUA",            away: "Paraguai",        date: "12/06", time: "22h",    city: "Los Angeles",      group: "D", kickoff: "2026-06-12T22:00", result: { home: 1, away: 0 } },
      { id: "m8",  home: "Austrália",      away: "Turquia",         date: "14/06", time: "01h",    city: "Vancouver",        group: "D", kickoff: "2026-06-14T01:00", result: { home: 1, away: 2 } },
      { id: "m9",  home: "Alemanha",       away: "Curaçao",         date: "14/06", time: "14h",    city: "Houston",          group: "E", kickoff: "2026-06-14T14:00", result: { home: 4, away: 0 } },
      { id: "m10", home: "Costa do Marfim",away: "Equador",         date: "14/06", time: "20h",    city: "Philadelphia",     group: "E", kickoff: "2026-06-14T20:00", result: { home: 1, away: 1 } },
      { id: "m11", home: "Países Baixos",  away: "Japão",           date: "14/06", time: "17h",    city: "Dallas",           group: "F", kickoff: "2026-06-14T17:00", result: { home: 2, away: 2 } },
      { id: "m12", home: "Suécia",         away: "Tunísia",         date: "14/06", time: "23h",    city: "Monterrey",        group: "F", kickoff: "2026-06-14T23:00", result: { home: 3, away: 0 } },
      { id: "m13", home: "Bélgica",        away: "Egito",           date: "15/06", time: "16h",    city: "Seattle",          group: "G", kickoff: "2026-06-15T16:00", result: { home: 1, away: 0 } },
      { id: "m14", home: "Irã",            away: "Nova Zelândia",   date: "15/06", time: "22h",    city: "Los Angeles",      group: "G", kickoff: "2026-06-15T22:00", result: { home: 2, away: 0 } },
      { id: "m15", home: "Espanha",        away: "Cabo Verde",      date: "15/06", time: "13h",    city: "Atlanta",          group: "H", kickoff: "2026-06-15T13:00", result: { home: 3, away: 0 } },
      { id: "m16", home: "Arábia Saudita", away: "Uruguai",         date: "15/06", time: "19h",    city: "Miami",            group: "H", kickoff: "2026-06-15T19:00", result: { home: 0, away: 2 } },
      { id: "m17", home: "França",         away: "Senegal",         date: "16/06", time: "16h",    city: "Nova York/NJ",     group: "I", kickoff: "2026-06-16T16:00", result: { home: 2, away: 1 } },
      { id: "m18", home: "Iraque",         away: "Noruega",         date: "16/06", time: "19h",    city: "Boston",           group: "I", kickoff: "2026-06-16T19:00", result: { home: 0, away: 3 } },
      { id: "m19", home: "Argentina",      away: "Argélia",         date: "16/06", time: "22h",    city: "Kansas City",      group: "J", kickoff: "2026-06-16T22:00", result: { home: 2, away: 0 } },
      { id: "m20", home: "Áustria",        away: "Jordânia",        date: "17/06", time: "01h",    city: "San Francisco",    group: "J", kickoff: "2026-06-17T01:00", result: { home: 2, away: 1 } },
      { id: "m21", home: "Portugal",       away: "Congo (RD)",      date: "17/06", time: "14h",    city: "Houston",          group: "K", kickoff: "2026-06-17T14:00", result: { home: 3, away: 0 } },
      { id: "m22", home: "Uzbequistão",    away: "Colômbia",        date: "17/06", time: "23h",    city: "Cidade do México", group: "K", kickoff: "2026-06-17T23:00", result: { home: 0, away: 1 } },
      { id: "m23", home: "Inglaterra",     away: "Croácia",         date: "17/06", time: "17h",    city: "Dallas",           group: "L", kickoff: "2026-06-17T17:00", result: { home: 1, away: 0 } },
      { id: "m24", home: "Gana",           away: "Panamá",          date: "17/06", time: "20h",    city: "Toronto",          group: "L", kickoff: "2026-06-17T20:00", result: { home: 2, away: 1 } },
    ],
  },
  {
    id: 2,
    label: "2ª Rodada — Fase de Grupos",
    startDate: "2026-06-17",
    matches: [
      { id: "m25", home: "Rep. Tcheca",    away: "África do Sul",   date: "18/06", time: "13h",    city: "Atlanta",          group: "A", kickoff: "2026-06-18T13:00", result: { home: 1, away: 1 } },
      { id: "m26", home: "México",         away: "Coreia do Sul",   date: "18/06", time: "22h",    city: "Guadalajara",      group: "A", kickoff: "2026-06-18T22:00", result: { home: 1, away: 0 } },
      { id: "m27", home: "Suíça",          away: "Bósnia",          date: "18/06", time: "16h",    city: "Los Angeles",      group: "B", kickoff: "2026-06-18T16:00", result: { home: 4, away: 1 } },
      { id: "m28", home: "Canadá",         away: "Qatar",           date: "18/06", time: "19h",    city: "Vancouver",        group: "B", kickoff: "2026-06-18T19:00", result: { home: 6, away: 0 } },
      { id: "m29", home: "Escócia",        away: "Marrocos",        date: "19/06", time: "16h",    city: "Boston",           group: "C", kickoff: "2026-06-19T16:00", result: { home: 0, away: 1 } },
      { id: "m30", home: "Brasil",         away: "Haiti",           date: "19/06", time: "21h30",  city: "Philadelphia",     group: "C", kickoff: "2026-06-19T21:30", result: { home: 3, away: 0 } },
      { id: "m31", home: "EUA",            away: "Austrália",       date: "19/06", time: "16h",    city: "Seattle",          group: "D", kickoff: "2026-06-19T16:00", result: { home: 2, away: 0 } },
      { id: "m32", home: "Turquia",        away: "Paraguai",        date: "20/06", time: "00h",    city: "San Francisco",    group: "D", kickoff: "2026-06-20T00:00", result: { home: 0, away: 1 } },
      { id: "m33", home: "Alemanha",       away: "Costa do Marfim", date: "20/06", time: "17h",    city: "Toronto",          group: "E", kickoff: "2026-06-20T17:00", result: { home: 2, away: 1 } },
      { id: "m34", home: "Equador",        away: "Curaçao",         date: "20/06", time: "21h",    city: "Kansas City",      group: "E", kickoff: "2026-06-20T21:00", result: { home: 0, away: 0 } },
      { id: "m35", home: "Países Baixos",  away: "Suécia",          date: "20/06", time: "14h",    city: "Houston",          group: "F", kickoff: "2026-06-20T14:00", result: { home: 5, away: 1 } },
      { id: "m36", home: "Tunísia",        away: "Japão",           date: "21/06", time: "01h",    city: "Monterrey",        group: "F", kickoff: "2026-06-21T01:00", result: { home: 0, away: 4 } },
      { id: "m37", home: "Bélgica",        away: "Irã",             date: "21/06", time: "16h",    city: "Los Angeles",      group: "G", kickoff: "2026-06-21T16:00", result: { home: 0, away: 0 } },
      { id: "m38", home: "Nova Zelândia",  away: "Egito",           date: "21/06", time: "22h",    city: "Vancouver",        group: "G", kickoff: "2026-06-21T22:00", result: null },
      { id: "m39", home: "Espanha",        away: "Arábia Saudita",  date: "21/06", time: "13h",    city: "Atlanta",          group: "H", kickoff: "2026-06-21T13:00", result: { home: 4, away: 0 } },
      { id: "m40", home: "Uruguai",        away: "Cabo Verde",      date: "21/06", time: "19h",    city: "Miami",            group: "H", kickoff: "2026-06-21T19:00", result: null },
      { id: "m41", home: "França",         away: "Iraque",          date: "22/06", time: "13h",    city: "Nova York/NJ",     group: "I", kickoff: "2026-06-22T13:00", result: null },
      { id: "m42", home: "Noruega",        away: "Senegal",         date: "22/06", time: "19h",    city: "Boston",           group: "I", kickoff: "2026-06-22T19:00", result: null },
      { id: "m43", home: "Argentina",      away: "Áustria",         date: "22/06", time: "14h",    city: "Dallas",           group: "J", kickoff: "2026-06-22T14:00", result: null },
      { id: "m44", home: "Jordânia",       away: "Argélia",         date: "22/06", time: "22h",    city: "San Francisco",    group: "J", kickoff: "2026-06-22T22:00", result: null },
      { id: "m45", home: "Portugal",       away: "Uzbequistão",     date: "23/06", time: "14h",    city: "Kansas City",      group: "K", kickoff: "2026-06-23T14:00", result: null },
      { id: "m46", home: "Colômbia",       away: "Congo (RD)",      date: "23/06", time: "17h",    city: "Miami",            group: "K", kickoff: "2026-06-23T17:00", result: null },
      { id: "m47", home: "Inglaterra",     away: "Panamá",          date: "23/06", time: "20h",    city: "Houston",          group: "L", kickoff: "2026-06-23T20:00", result: null },
      { id: "m48", home: "Croácia",        away: "Gana",            date: "23/06", time: "23h",    city: "Seattle",          group: "L", kickoff: "2026-06-23T23:00", result: null },
    ],
  },
  {
    id: 3,
    label: "3ª Rodada — Fase de Grupos",
    startDate: "2026-06-24",
    matches: [
      { id: "m49", home: "África do Sul",  away: "Coreia do Sul",   date: "26/06", time: "16h",    city: "Guadalajara",      group: "A", kickoff: "2026-06-26T16:00", result: null },
      { id: "m50", home: "Rep. Tcheca",    away: "México",          date: "26/06", time: "16h",    city: "Cidade do México", group: "A", kickoff: "2026-06-26T16:00", result: null },
      { id: "m51", home: "Bósnia",         away: "Qatar",           date: "26/06", time: "20h",    city: "San Francisco",    group: "B", kickoff: "2026-06-26T20:00", result: null },
      { id: "m52", home: "Suíça",          away: "Canadá",          date: "26/06", time: "20h",    city: "Toronto",          group: "B", kickoff: "2026-06-26T20:00", result: null },
      { id: "m53", home: "Brasil",         away: "Escócia",         date: "26/06", time: "20h",    city: "Seattle",          group: "C", kickoff: "2026-06-26T20:00", result: null },
      { id: "m54", home: "Marrocos",       away: "Haiti",           date: "26/06", time: "20h",    city: "Houston",          group: "C", kickoff: "2026-06-26T20:00", result: null },
      { id: "m55", home: "Paraguai",       away: "Austrália",       date: "27/06", time: "16h",    city: "Vancouver",        group: "D", kickoff: "2026-06-27T16:00", result: null },
      { id: "m56", home: "Turquia",        away: "EUA",             date: "27/06", time: "16h",    city: "Los Angeles",      group: "D", kickoff: "2026-06-27T16:00", result: null },
      { id: "m57", home: "Curaçao",        away: "Costa do Marfim", date: "27/06", time: "20h",    city: "Kansas City",      group: "E", kickoff: "2026-06-27T20:00", result: null },
      { id: "m58", home: "Equador",        away: "Alemanha",        date: "27/06", time: "20h",    city: "Philadelphia",     group: "E", kickoff: "2026-06-27T20:00", result: null },
      { id: "m59", home: "Japão",          away: "Suécia",          date: "27/06", time: "16h",    city: "Dallas",           group: "F", kickoff: "2026-06-27T16:00", result: null },
      { id: "m60", home: "Tunísia",        away: "Países Baixos",   date: "27/06", time: "16h",    city: "Monterrey",        group: "F", kickoff: "2026-06-27T16:00", result: null },
      { id: "m61", home: "Egito",          away: "Irã",             date: "24/06", time: "16h",    city: "Seattle",          group: "G", kickoff: "2026-06-24T16:00", result: null },
      { id: "m62", home: "Nova Zelândia",  away: "Bélgica",         date: "24/06", time: "16h",    city: "Los Angeles",      group: "G", kickoff: "2026-06-24T16:00", result: null },
      { id: "m63", home: "Cabo Verde",     away: "Uruguai",         date: "24/06", time: "20h",    city: "Miami",            group: "H", kickoff: "2026-06-24T20:00", result: null },
      { id: "m64", home: "Arábia Saudita", away: "Espanha",         date: "24/06", time: "20h",    city: "Atlanta",          group: "H", kickoff: "2026-06-24T20:00", result: null },
      { id: "m65", home: "Senegal",        away: "Iraque",          date: "25/06", time: "16h",    city: "Kansas City",      group: "I", kickoff: "2026-06-25T16:00", result: null },
      { id: "m66", home: "Noruega",        away: "França",          date: "25/06", time: "16h",    city: "Nova York/NJ",     group: "I", kickoff: "2026-06-25T16:00", result: null },
      { id: "m67", home: "Argélia",        away: "Áustria",         date: "25/06", time: "20h",    city: "Dallas",           group: "J", kickoff: "2026-06-25T20:00", result: null },
      { id: "m68", home: "Jordânia",       away: "Argentina",       date: "25/06", time: "20h",    city: "San Francisco",    group: "J", kickoff: "2026-06-25T20:00", result: null },
      { id: "m69", home: "Congo (RD)",     away: "Portugal",        date: "26/06", time: "16h",    city: "Houston",          group: "K", kickoff: "2026-06-26T16:00", result: null },
      { id: "m70", home: "Colômbia",       away: "Uzbequistão",     date: "26/06", time: "16h",    city: "Miami",            group: "K", kickoff: "2026-06-26T16:00", result: null },
      { id: "m71", home: "Panamá",         away: "Croácia",         date: "26/06", time: "20h",    city: "Vancouver",        group: "L", kickoff: "2026-06-26T20:00", result: null },
      { id: "m72", home: "Gana",           away: "Inglaterra",      date: "26/06", time: "20h",    city: "Atlanta",          group: "L", kickoff: "2026-06-26T20:00", result: null },
    ],
  },
]

// Retorna true se ainda é possível palpitar (mais de 8h antes do kickoff)
export function isPickAllowed(match) {
  if (match.result) return false // já tem resultado
  if (!match.kickoff) return true // sem kickoff definido, libera
  const kickoff = new Date(match.kickoff + ":00-03:00") // BRT = UTC-3
  const now = new Date()
  const hoursUntilKickoff = (kickoff - now) / (1000 * 60 * 60)
  return hoursUntilKickoff > 8
}

// Retorna quantas horas faltam pro bloqueio (para exibir aviso)
export function hoursUntilLock(match) {
  if (!match.kickoff) return null
  const kickoff = new Date(match.kickoff + ":00-03:00")
  const now = new Date()
  return (kickoff - now) / (1000 * 60 * 60) - 8
}

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

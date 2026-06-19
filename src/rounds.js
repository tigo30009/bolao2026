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

export const ROUNDS = [
  {
    id: 1,
    label: "1ª Rodada — Fase de Grupos",
    startDate: "2026-06-11",
    matches: [
      // Grupo A
      { id: "m1",  home: "México",        away: "África do Sul",  date: "11/06", time: "16h",   city: "Cidade do México", group: "A", result: { home: 2, away: 1 } },
      { id: "m2",  home: "Coreia do Sul", away: "Rep. Tcheca",    date: "11/06", time: "23h",   city: "Guadalajara",      group: "A", result: { home: 1, away: 1 } },
      // Grupo B
      { id: "m3",  home: "Canadá",        away: "Bósnia",         date: "12/06", time: "16h",   city: "Toronto",          group: "B", result: { home: 3, away: 0 } },
      { id: "m4",  home: "Qatar",         away: "Suíça",          date: "13/06", time: "16h",   city: "San Francisco",    group: "B", result: { home: 0, away: 2 } },
      // Grupo C
      { id: "m5",  home: "Brasil",        away: "Marrocos",       date: "13/06", time: "19h",   city: "Nova York/NJ",     group: "C", result: { home: 2, away: 0 } },
      { id: "m6",  home: "Haiti",         away: "Escócia",        date: "13/06", time: "22h",   city: "Boston",           group: "C", result: { home: 1, away: 3 } },
      // Grupo D
      { id: "m7",  home: "EUA",           away: "Paraguai",       date: "12/06", time: "22h",   city: "Los Angeles",      group: "D", result: { home: 1, away: 0 } },
      { id: "m8",  home: "Austrália",     away: "Turquia",        date: "14/06", time: "01h",   city: "Vancouver",        group: "D", result: { home: 1, away: 2 } },
      // Grupo E
      { id: "m9",  home: "Alemanha",      away: "Curaçao",        date: "14/06", time: "14h",   city: "Houston",          group: "E", result: { home: 4, away: 0 } },
      { id: "m10", home: "Costa do Marfim",away: "Equador",       date: "14/06", time: "20h",   city: "Philadelphia",     group: "E", result: { home: 1, away: 1 } },
      // Grupo F
      { id: "m11", home: "Países Baixos", away: "Japão",          date: "14/06", time: "17h",   city: "Dallas",           group: "F", result: { home: 2, away: 2 } },
      { id: "m12", home: "Suécia",        away: "Tunísia",        date: "14/06", time: "23h",   city: "Monterrey",        group: "F", result: { home: 3, away: 0 } },
      // Grupo G
      { id: "m13", home: "Bélgica",       away: "Egito",          date: "15/06", time: "16h",   city: "Seattle",          group: "G", result: { home: 1, away: 0 } },
      { id: "m14", home: "Irã",           away: "Nova Zelândia",  date: "15/06", time: "22h",   city: "Los Angeles",      group: "G", result: { home: 2, away: 0 } },
      // Grupo H
      { id: "m15", home: "Espanha",       away: "Cabo Verde",     date: "15/06", time: "13h",   city: "Atlanta",          group: "H", result: { home: 3, away: 0 } },
      { id: "m16", home: "Arábia Saudita",away: "Uruguai",        date: "15/06", time: "19h",   city: "Miami",            group: "H", result: { home: 0, away: 2 } },
      // Grupo I
      { id: "m17", home: "França",        away: "Senegal",        date: "16/06", time: "16h",   city: "Nova York/NJ",     group: "I", result: { home: 2, away: 1 } },
      { id: "m18", home: "Iraque",        away: "Noruega",        date: "16/06", time: "19h",   city: "Boston",           group: "I", result: { home: 0, away: 3 } },
      // Grupo J
      { id: "m19", home: "Argentina",     away: "Argélia",        date: "16/06", time: "22h",   city: "Kansas City",      group: "J", result: { home: 2, away: 0 } },
      { id: "m20", home: "Áustria",       away: "Jordânia",       date: "17/06", time: "01h",   city: "San Francisco",    group: "J", result: { home: 2, away: 1 } },
      // Grupo K
      { id: "m21", home: "Portugal",      away: "Congo (RD)",     date: "17/06", time: "14h",   city: "Houston",          group: "K", result: { home: 3, away: 0 } },
      { id: "m22", home: "Uzbequistão",   away: "Colômbia",       date: "17/06", time: "23h",   city: "Cidade do México", group: "K", result: { home: 0, away: 1 } },
      // Grupo L
      { id: "m23", home: "Inglaterra",    away: "Croácia",        date: "17/06", time: "17h",   city: "Dallas",           group: "L", result: { home: 1, away: 0 } },
      { id: "m24", home: "Gana",          away: "Panamá",         date: "17/06", time: "20h",   city: "Toronto",          group: "L", result: { home: 2, away: 1 } },
    ],
  },
  {
    id: 2,
    label: "2ª Rodada — Fase de Grupos",
    startDate: "2026-06-17",
    matches: [
      // Grupo A
      { id: "m25", home: "Rep. Tcheca",   away: "África do Sul",  date: "18/06", time: "13h",   city: "Atlanta",          group: "A", result: { home: 1, away: 1 } },
      { id: "m26", home: "México",        away: "Coreia do Sul",  date: "18/06", time: "22h",   city: "Guadalajara",      group: "A", result: { home: 1, away: 0 } },
      // Grupo B
      { id: "m27", home: "Suíça",         away: "Bósnia",         date: "18/06", time: "16h",   city: "Los Angeles",      group: "B", result: { home: 4, away: 1 } },
      { id: "m28", home: "Canadá",        away: "Qatar",          date: "18/06", time: "19h",   city: "Vancouver",        group: "B", result: { home: 6, away: 0 } },
      // Grupo C
      { id: "m29", home: "Escócia",       away: "Marrocos",       date: "19/06", time: "16h",   city: "Boston",           group: "C", result: null },
      { id: "m30", home: "Brasil",        away: "Haiti",          date: "19/06", time: "21h30", city: "Philadelphia",     group: "C", result: null },
      // Grupo D
      { id: "m31", home: "EUA",           away: "Austrália",      date: "19/06", time: "16h",   city: "Seattle",          group: "D", result: null },
      { id: "m32", home: "Turquia",       away: "Paraguai",       date: "20/06", time: "00h",   city: "San Francisco",    group: "D", result: null },
      // Grupo E
      { id: "m33", home: "Alemanha",      away: "Costa do Marfim",date: "20/06", time: "17h",   city: "Toronto",          group: "E", result: null },
      { id: "m34", home: "Equador",       away: "Curaçao",        date: "20/06", time: "21h",   city: "Kansas City",      group: "E", result: null },
      // Grupo F
      { id: "m35", home: "Países Baixos", away: "Suécia",         date: "20/06", time: "14h",   city: "Houston",          group: "F", result: null },
      { id: "m36", home: "Tunísia",       away: "Japão",          date: "21/06", time: "01h",   city: "Monterrey",        group: "F", result: null },
      // Grupo G
      { id: "m37", home: "Bélgica",       away: "Irã",            date: "21/06", time: "16h",   city: "Los Angeles",      group: "G", result: null },
      { id: "m38", home: "Nova Zelândia", away: "Egito",          date: "21/06", time: "22h",   city: "Vancouver",        group: "G", result: null },
      // Grupo H
      { id: "m39", home: "Espanha",       away: "Arábia Saudita", date: "21/06", time: "13h",   city: "Atlanta",          group: "H", result: null },
      { id: "m40", home: "Uruguai",       away: "Cabo Verde",     date: "21/06", time: "19h",   city: "Miami",            group: "H", result: null },
      // Grupo I
      { id: "m41", home: "França",        away: "Iraque",         date: "22/06", time: "13h",   city: "Nova York/NJ",     group: "I", result: null },
      { id: "m42", home: "Noruega",       away: "Senegal",        date: "22/06", time: "19h",   city: "Boston",           group: "I", result: null },
      // Grupo J
      { id: "m43", home: "Argentina",     away: "Áustria",        date: "22/06", time: "14h",   city: "Dallas",           group: "J", result: null },
      { id: "m44", home: "Jordânia",      away: "Argélia",        date: "22/06", time: "22h",   city: "San Francisco",    group: "J", result: null },
      // Grupo K
      { id: "m45", home: "Portugal",      away: "Uzbequistão",    date: "23/06", time: "14h",   city: "Kansas City",      group: "K", result: null },
      { id: "m46", home: "Colômbia",      away: "Congo (RD)",     date: "23/06", time: "17h",   city: "Miami",            group: "K", result: null },
      // Grupo L
      { id: "m47", home: "Inglaterra",    away: "Panamá",         date: "23/06", time: "20h",   city: "Houston",          group: "L", result: null },
      { id: "m48", home: "Croácia",       away: "Gana",           date: "23/06", time: "23h",   city: "Seattle",          group: "L", result: null },
    ],
  },
  {
    id: 3,
    label: "3ª Rodada — Fase de Grupos",
    startDate: "2026-06-24",
    matches: [
      // Grupo A
      { id: "m49", home: "África do Sul", away: "Coreia do Sul",  date: "26/06", time: "16h",   city: "Guadalajara",      group: "A", result: null },
      { id: "m50", home: "Rep. Tcheca",   away: "México",         date: "26/06", time: "16h",   city: "Cidade do México", group: "A", result: null },
      // Grupo B
      { id: "m51", home: "Bósnia",        away: "Qatar",          date: "26/06", time: "20h",   city: "San Francisco",    group: "B", result: null },
      { id: "m52", home: "Suíça",         away: "Canadá",         date: "26/06", time: "20h",   city: "Toronto",          group: "B", result: null },
      // Grupo C
      { id: "m53", home: "Brasil",        away: "Escócia",        date: "26/06", time: "20h",   city: "Seattle",          group: "C", result: null },
      { id: "m54", home: "Marrocos",      away: "Haiti",          date: "26/06", time: "20h",   city: "Houston",          group: "C", result: null },
      // Grupo D
      { id: "m55", home: "Paraguai",      away: "Austrália",      date: "27/06", time: "16h",   city: "Vancouver",        group: "D", result: null },
      { id: "m56", home: "Turquia",       away: "EUA",            date: "27/06", time: "16h",   city: "Los Angeles",      group: "D", result: null },
      // Grupo E
      { id: "m57", home: "Curaçao",       away: "Costa do Marfim",date: "27/06", time: "20h",   city: "Kansas City",      group: "E", result: null },
      { id: "m58", home: "Equador",       away: "Alemanha",       date: "27/06", time: "20h",   city: "Philadelphia",     group: "E", result: null },
      // Grupo F
      { id: "m59", home: "Japão",         away: "Suécia",         date: "27/06", time: "16h",   city: "Dallas",           group: "F", result: null },
      { id: "m60", home: "Tunísia",       away: "Países Baixos",  date: "27/06", time: "16h",   city: "Monterrey",        group: "F", result: null },
      // Grupo G
      { id: "m61", home: "Egito",         away: "Irã",            date: "24/06", time: "16h",   city: "Seattle",          group: "G", result: null },
      { id: "m62", home: "Nova Zelândia", away: "Bélgica",        date: "24/06", time: "16h",   city: "Los Angeles",      group: "G", result: null },
      // Grupo H
      { id: "m63", home: "Cabo Verde",    away: "Uruguai",        date: "24/06", time: "20h",   city: "Miami",            group: "H", result: null },
      { id: "m64", home: "Arábia Saudita",away: "Espanha",        date: "24/06", time: "20h",   city: "Atlanta",          group: "H", result: null },
      // Grupo I
      { id: "m65", home: "Senegal",       away: "Iraque",         date: "25/06", time: "16h",   city: "Kansas City",      group: "I", result: null },
      { id: "m66", home: "Noruega",       away: "França",         date: "25/06", time: "16h",   city: "Nova York/NJ",     group: "I", result: null },
      // Grupo J
      { id: "m67", home: "Argélia",       away: "Áustria",        date: "25/06", time: "20h",   city: "Dallas",           group: "J", result: null },
      { id: "m68", home: "Jordânia",      away: "Argentina",      date: "25/06", time: "20h",   city: "San Francisco",    group: "J", result: null },
      // Grupo K
      { id: "m69", home: "Congo (RD)",    away: "Portugal",       date: "26/06", time: "16h",   city: "Houston",          group: "K", result: null },
      { id: "m70", home: "Colômbia",      away: "Uzbequistão",    date: "26/06", time: "16h",   city: "Miami",            group: "K", result: null },
      // Grupo L
      { id: "m71", home: "Panamá",        away: "Croácia",        date: "26/06", time: "20h",   city: "Vancouver",        group: "L", result: null },
      { id: "m72", home: "Gana",          away: "Inglaterra",     date: "26/06", time: "20h",   city: "Atlanta",          group: "L", result: null },
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

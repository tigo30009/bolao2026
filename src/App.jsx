import { useState, useEffect, useCallback } from "react"
import { supabase } from "./supabase.js"
import {
  ROUNDS, FLAGS, calcPoints, isRoundOpen, isRoundFinished,
  isPickAllowed, hoursUntilLock,
  formatDateBR, formatDob, stringColor, initials
} from "./rounds.js"

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Orbitron:wght@700;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #F4F6FA; --surface: #FFFFFF; --card: #FFFFFF;
    --border: #E2E8F0; --border-md: #CBD5E1;
    --green: #15803D; --green-light: #16A34A; --green-bg: #DCFCE7; --green-border: #BBF7D0;
    --gold: #B45309; --gold-bg: #FEF3C7; --gold-border: #FDE68A;
    --red: #DC2626; --red-bg: #FEE2E2; --red-border: #FECACA;
    --blue: #1D4ED8;
    --text: #1E293B; --text-muted: #64748B; --text-light: #94A3B8;
    --radius: 14px; --radius-sm: 8px;
    --shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
  }
  html, body { height: 100%; background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; font-size: 15px; -webkit-font-smoothing: antialiased; }
  #root { min-height: 100dvh; display: flex; flex-direction: column; }
  .app { display: flex; flex-direction: column; min-height: 100dvh; max-width: 480px; margin: 0 auto; background: var(--bg); }
  .header { position: sticky; top: 0; z-index: 100; background: var(--surface); border-bottom: 1px solid var(--border); box-shadow: var(--shadow); padding-top: env(safe-area-inset-top, 0); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; }
  .header-logo { font-family: 'Orbitron', monospace; font-size: 13px; font-weight: 900; color: var(--green); letter-spacing: 0.04em; line-height: 1.2; }
  .header-logo span { display: block; font-size: 9px; color: var(--text-muted); font-family: 'Inter', sans-serif; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; }
  .header-user { display: flex; align-items: center; gap: 8px; cursor: pointer; background: var(--bg); border: 1px solid var(--border); border-radius: 20px; padding: 6px 12px 6px 8px; transition: border-color 0.15s, box-shadow 0.15s; }
  .header-user:hover { border-color: var(--border-md); box-shadow: var(--shadow); }
  .avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }
  .header-user-name { font-size: 13px; font-weight: 600; color: var(--text); max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 480px; z-index: 100; background: var(--surface); border-top: 1px solid var(--border); box-shadow: 0 -2px 8px rgba(0,0,0,0.06); display: flex; padding-bottom: env(safe-area-inset-bottom, 0); }
  .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px 4px 8px; border: none; background: none; cursor: pointer; color: var(--text-light); font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; transition: color 0.15s; -webkit-tap-highlight-color: transparent; }
  .nav-btn.active { color: var(--green); }
  .nav-btn svg { width: 22px; height: 22px; }
  .content { flex: 1; padding: 16px 16px 90px; overflow-y: auto; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); }
  .round-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #F8FAFC; border-bottom: 1px solid var(--border); }
  .round-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); }
  .round-badge { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 10px; letter-spacing: 0.05em; text-transform: uppercase; }
  .badge-open   { background: var(--green-bg); color: var(--green); border: 1px solid var(--green-border); }
  .badge-locked { background: #F1F5F9; color: var(--text-light); border: 1px solid var(--border); }
  .picks-filter { display: flex; background: #F1F5F9; border-radius: 10px; padding: 3px; margin-bottom: 16px; gap: 2px; }
  .picks-filter-btn { flex: 1; padding: 8px 10px; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; background: transparent; color: var(--text-muted); -webkit-tap-highlight-color: transparent; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .picks-filter-btn.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .picks-filter-count { font-size: 11px; font-weight: 700; padding: 1px 6px; border-radius: 8px; }
  .picks-filter-btn.active .picks-filter-count { background: var(--green-bg); color: var(--green); }
  .picks-filter-btn:not(.active) .picks-filter-count { background: #E2E8F0; color: var(--text-light); }
  .match-item { padding: 14px; border-bottom: 1px solid var(--border); transition: background 0.15s; }
  .match-item:last-child { border-bottom: none; }
  .match-item.match-done { background: #F8FAFC; }
  .match-item.match-done .team-name { color: var(--text-muted); }
  .match-item.match-done .vs-badge { background: #F1F5F9; color: var(--text-light); border-color: var(--border); }
  .match-item.match-done .score-sep { color: var(--text-light); }
  .match-meta { font-size: 11px; color: var(--text-light); margin-bottom: 8px; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
  .group-tag { font-size: 10px; font-weight: 700; background: #EFF6FF; color: var(--blue); border-radius: 4px; padding: 2px 6px; border: 1px solid #BFDBFE; }
  .match-item.match-done .group-tag { background: #F1F5F9; color: var(--text-light); border-color: var(--border); }
  .match-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--text-light); flex-shrink: 0; }
  .match-teams { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
  .team-name { flex: 1; font-size: 14px; font-weight: 700; color: var(--text); }
  .team-name.away { text-align: right; }
  .team-flag { font-size: 22px; line-height: 1; flex-shrink: 0; }
  .vs-badge { font-size: 11px; font-weight: 700; color: var(--text-light); padding: 4px 8px; background: var(--bg); border-radius: 6px; border: 1px solid var(--border); white-space: nowrap; flex-shrink: 0; }
  .real-result-row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; padding: 8px 12px; background: var(--green-bg); border-radius: 8px; border: 1px solid var(--green-border); }
  .real-result-label { font-size: 10px; text-transform: uppercase; font-weight: 700; color: var(--green); letter-spacing: 0.08em; flex-shrink: 0; }
  .real-score { font-family: 'Orbitron', monospace; font-size: 18px; font-weight: 700; color: #14532D; flex: 1; text-align: center; letter-spacing: 0.1em; }
  .pick-row { display: flex; align-items: center; gap: 10px; }
  .pick-score-group { flex: 1; display: flex; align-items: center; gap: 6px; }
  .score-input { width: 48px; height: 48px; border-radius: var(--radius-sm); border: 1.5px solid var(--border-md); background: var(--bg); color: var(--text); font-family: 'Orbitron', monospace; font-size: 20px; font-weight: 700; text-align: center; outline: none; -webkit-appearance: none; -moz-appearance: textfield; appearance: none; transition: border-color 0.15s, box-shadow 0.15s; }
  .score-input::-webkit-outer-spin-button, .score-input::-webkit-inner-spin-button { -webkit-appearance: none; }
  .score-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(21,128,61,0.12); }
  .score-input:disabled { opacity: 0.45; cursor: not-allowed; background: #F8FAFC; }
  .score-sep { font-family: 'Orbitron', monospace; font-size: 18px; color: var(--text-muted); font-weight: 700; }
  .pick-divider { width: 1px; height: 36px; background: var(--border); flex-shrink: 0; }
  .pick-status { display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 52px; flex-shrink: 0; }
  .pts-label { font-size: 10px; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
  .pts-value { font-family: 'Orbitron', monospace; font-size: 20px; font-weight: 700; }
  .pts-0 { color: var(--text-light); } .pts-1 { color: var(--gold); } .pts-5 { color: var(--green-light); }
  .pts-pending { color: var(--text-light); font-size: 14px; }
  .save-btn { margin-top: 12px; width: 100%; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent; }
  .save-btn.default { background: var(--green); color: #fff; }
  .save-btn.default:hover { background: var(--green-light); }
  .save-btn.default:active { transform: scale(0.98); }
  .save-btn.default:disabled { opacity: 0.4; cursor: not-allowed; }
  .save-btn.locked { background: #F8FAFC; color: var(--text-light); border: 1px solid var(--border); cursor: default; font-size: 13px; }
  .locked-notice { margin-top: 10px; padding: 8px 12px; background: #FFFBEB; border: 1px solid var(--gold-border); border-radius: 8px; font-size: 12px; color: #92400E; font-weight: 500; text-align: center; }
  .ranking-header { padding: 14px; border-bottom: 1px solid var(--border); background: #F8FAFC; }
  .ranking-title { font-family: 'Orbitron', monospace; font-size: 13px; font-weight: 700; color: var(--text); letter-spacing: 0.04em; }
  .rank-item { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-bottom: 1px solid var(--border); }
  .rank-item:last-child { border-bottom: none; }
  .rank-pos { font-family: 'Orbitron', monospace; font-size: 16px; font-weight: 900; color: var(--text-light); width: 28px; text-align: center; flex-shrink: 0; }
  .rank-pos.top1 { color: #D97706; } .rank-pos.top2 { color: #64748B; } .rank-pos.top3 { color: #B45309; }
  .rank-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: #fff; flex-shrink: 0; }
  .rank-info { flex: 1; min-width: 0; }
  .rank-name { font-size: 15px; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rank-detail { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
  .rank-pts { text-align: right; flex-shrink: 0; }
  .rank-pts-val { font-family: 'Orbitron', monospace; font-size: 22px; font-weight: 900; color: var(--green); }
  .rank-pts-label { font-size: 10px; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
  .rank-me { background: #F0FDF4; border-left: 3px solid var(--green); }
  .history-match { padding: 14px; border-bottom: 1px solid var(--border); }
  .history-match:last-child { border-bottom: none; }
  .history-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 8px; }
  .history-game { font-size: 14px; font-weight: 700; color: var(--text); }
  .history-date { font-size: 11px; color: var(--text-light); margin-top: 2px; }
  .history-scores { display: flex; gap: 16px; align-items: flex-start; }
  .score-col { display: flex; flex-direction: column; align-items: center; gap: 3px; }
  .score-col-label { font-size: 10px; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
  .score-col-val { font-family: 'Orbitron', monospace; font-size: 18px; font-weight: 700; }
  .score-col-val.real { color: var(--green); } .score-col-val.pick-done { color: var(--gold); } .score-col-val.pick-pending { color: var(--text-light); }
  .pts-chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 700; white-space: nowrap; }
  .pts-chip.c0 { background: #F1F5F9; color: var(--text-muted); } .pts-chip.c1 { background: var(--gold-bg); color: var(--gold); } .pts-chip.c5 { background: var(--green-bg); color: var(--green); } .pts-chip.cp { background: #F1F5F9; color: var(--text-light); }
  .galera-match { border-bottom: 1px solid var(--border); }
  .galera-match:last-child { border-bottom: none; }
  .galera-match-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px 10px; cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; transition: background 0.1s; }
  .galera-match-header:hover { background: #F8FAFC; }
  .galera-match-title { font-size: 14px; font-weight: 700; color: var(--text); }
  .galera-match-sub { font-size: 11px; color: var(--text-light); margin-top: 2px; }
  .galera-match-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .galera-result-pill { font-family: 'Orbitron', monospace; font-size: 13px; font-weight: 700; padding: 4px 10px; border-radius: 8px; background: var(--green-bg); color: #14532D; border: 1px solid var(--green-border); }
  .galera-result-pill.pending { background: #F1F5F9; color: var(--text-light); border-color: var(--border); font-family: 'Inter', sans-serif; font-size: 11px; }
  .chevron-icon { color: var(--text-light); font-size: 18px; transition: transform 0.2s; }
  .chevron-icon.open { transform: rotate(180deg); }
  .galera-count-badge { font-size: 11px; font-weight: 700; background: #F1F5F9; color: var(--text-muted); border-radius: 10px; padding: 2px 8px; border: 1px solid var(--border); }
  .galera-picks-list { padding: 0 14px 12px; display: flex; flex-direction: column; gap: 8px; }
  .galera-pick-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border); background: var(--bg); }
  .galera-pick-row.pts-5 { background: #F0FDF4; border-color: var(--green-border); }
  .galera-pick-row.pts-1 { background: #FFFBEB; border-color: var(--gold-border); }
  .galera-pick-row.pts-0 { background: #FFF1F2; border-color: var(--red-border); }
  .galera-pick-row.pts-me { box-shadow: 0 0 0 2px var(--green); }
  .galera-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }
  .galera-user-name { font-size: 13px; font-weight: 700; color: var(--text); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .galera-you-tag { font-size: 10px; font-weight: 700; color: var(--green); background: var(--green-bg); border-radius: 4px; padding: 1px 5px; margin-left: 4px; flex-shrink: 0; }
  .galera-score { font-family: 'Orbitron', monospace; font-size: 16px; font-weight: 700; color: var(--text); flex-shrink: 0; }
  .galera-pts-badge { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 8px; flex-shrink: 0; }
  .galera-pts-badge.b5 { background: var(--green-bg); color: var(--green); } .galera-pts-badge.b1 { background: var(--gold-bg); color: var(--gold); } .galera-pts-badge.b0 { background: var(--red-bg); color: var(--red); } .galera-pts-badge.bp { background: #F1F5F9; color: var(--text-light); }
  .round-filter { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px; margin-bottom: 14px; scrollbar-width: none; }
  .round-filter::-webkit-scrollbar { display: none; }
  .round-filter-btn { flex-shrink: 0; padding: 7px 14px; border-radius: 20px; border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; -webkit-tap-highlight-color: transparent; }
  .round-filter-btn.active { background: var(--green); color: #fff; border-color: var(--green); }
  .auth-screen { display: flex; flex-direction: column; align-items: center; min-height: 100dvh; padding: 48px 24px 32px; background: var(--bg); }
  .auth-hero { text-align: center; margin-bottom: 32px; }
  .auth-trophy { font-size: 48px; margin-bottom: 12px; }
  .auth-title { font-family: 'Orbitron', monospace; font-size: 26px; font-weight: 900; color: var(--green); line-height: 1.15; margin-bottom: 6px; }
  .auth-subtitle { font-size: 14px; color: var(--text-muted); }
  .auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; width: 100%; max-width: 380px; box-shadow: var(--shadow-md); }
  .auth-section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 12px; }
  .user-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; max-height: 220px; overflow-y: auto; }
  .user-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s; -webkit-tap-highlight-color: transparent; }
  .user-item:hover { border-color: var(--green); box-shadow: 0 0 0 2px rgba(21,128,61,0.08); }
  .user-item-name { font-size: 15px; font-weight: 600; color: var(--text); }
  .user-item-dob { font-size: 12px; color: var(--text-muted); }
  .chevron-right { margin-left: auto; color: var(--text-light); font-size: 18px; }
  .divider { display: flex; align-items: center; gap: 10px; margin: 16px 0; }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-text { font-size: 11px; color: var(--text-light); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
  .field-label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; display: block; }
  .field-input { width: 100%; padding: 12px 14px; background: var(--bg); border: 1.5px solid var(--border-md); border-radius: 10px; color: var(--text); font-size: 15px; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.15s, box-shadow 0.15s; margin-bottom: 12px; }
  .field-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(21,128,61,0.1); }
  .primary-btn { width: 100%; padding: 14px; border: none; border-radius: 10px; background: var(--green); color: #fff; font-size: 15px; font-weight: 800; cursor: pointer; transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent; }
  .primary-btn:hover { background: var(--green-light); }
  .primary-btn:active { transform: scale(0.98); }
  .primary-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .toast { position: fixed; bottom: 84px; left: 50%; transform: translateX(-50%); background: var(--text); border-radius: 10px; padding: 10px 18px; font-size: 13px; font-weight: 600; color: #fff; z-index: 999; white-space: nowrap; animation: toastIn 0.2s ease, toastOut 0.2s ease 1.8s forwards; }
  .toast.success { background: var(--green); } .toast.error { background: var(--red); }
  @keyframes toastIn  { from { opacity:0; transform:translateX(-50%) translateY(8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
  @keyframes toastOut { to { opacity:0; transform:translateX(-50%) translateY(8px); } }
  .section-hd { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .section-hd-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); white-space: nowrap; }
  .section-hd-line { flex: 1; height: 1px; background: var(--border); }
  .empty-state { text-align: center; padding: 48px 20px; color: var(--text-muted); }
  .empty-state-icon { font-size: 40px; margin-bottom: 10px; }
  .empty-state-text { font-size: 14px; line-height: 1.6; }

  /* ── MATA-MATA BRACKET ── */
  .bracket-outer { overflow-x: auto; padding: 8px 0 16px; -webkit-overflow-scrolling: touch; }
  .bracket { display: flex; align-items: stretch; gap: 0; width: max-content; padding: 0 12px; }
  .b-phase { display: flex; flex-direction: column; }
  .b-phase-hdr { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); text-align: center; padding: 0 4px 6px; white-space: nowrap; }
  .b-matches { display: flex; flex-direction: column; justify-content: space-around; flex: 1; }
  .b-match { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--surface); width: 96px; margin: 2px 0; }
  .b-match.final { border-color: #15803D; width: 100px; }
  .b-date { font-size: 9px; color: var(--text-light); background: #F8FAFC; padding: 2px 5px; border-bottom: 1px solid var(--border); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .b-team { display: flex; align-items: center; gap: 3px; padding: 5px 5px; }
  .b-team:first-of-type { border-bottom: 1px solid var(--border); }
  .b-team.tbd { opacity: 0.4; }
  .b-team.winner { background: #F0FDF4; }
  .b-team.winner .b-name { color: #15803D; font-weight: 700; }
  .b-team.loser .b-name { color: var(--text-light); }
  .b-flag { font-size: 12px; flex-shrink: 0; line-height: 1; }
  .b-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10px; color: var(--text); }
  .b-score { font-size: 10px; font-weight: 700; flex-shrink: 0; color: var(--text-muted); min-width: 10px; text-align: right; }
  /* SVG-based connectors */
  .b-conn-svg { flex-shrink: 0; align-self: stretch; overflow: visible; margin-top: 22px; }
  .loading-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100dvh; gap: 16px; color: var(--text-muted); font-size: 14px; }
  .spinner { width: 32px; height: 32px; border: 3px solid var(--border); border-top-color: var(--green); border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`

// ─── ICONS ───────────────────────────────────────────────────────────────────
const IconBall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
)
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
)
const IconHistory = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>
  </svg>
)
const IconBracket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h4v12H3"/><path d="M17 6h4v12h-4"/>
    <path d="M7 12h10"/><path d="M7 8h3v8H7"/><path d="M14 8h3v8h-3"/>
  </svg>
)
const IconGroup = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [users, setUsers]           = useState([])
  const [picks, setPicks]           = useState({})
  const [currentUser, setCurrentUser] = useState(null)
  const [tab, setTab]               = useState("picks")
  const [toast, setToast]           = useState(null)
  const [loading, setLoading]       = useState(true)
  const [newName, setNewName]       = useState("")
  const [saving, setSaving]         = useState(false)

  // ── load all users + picks on mount ──
  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data: usersData } = await supabase.from("users").select("*").order("name")
      const { data: picksData }  = await supabase.from("picks").select("*")

      if (usersData) setUsers(usersData)

      // build picks map: { userId: { matchId: { home, away } } }
      if (picksData) {
        const map = {}
        picksData.forEach(p => {
          if (!map[p.user_id]) map[p.user_id] = {}
          map[p.user_id][p.match_id] = { home: p.home, away: p.away }
        })
        setPicks(map)
      }

      // restore session
      const saved = localStorage.getItem("bolao2026_user")
      if (saved) {
        const u = JSON.parse(saved)
        // confirm user still exists in db
        const found = usersData?.find(x => x.id === u.id)
        if (found) setCurrentUser(found)
        else localStorage.removeItem("bolao2026_user")
      }

      setLoading(false)
    }
    load()
  }, [])

  const showToast = useCallback((msg, type = "") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 2200)
  }, [])

  async function handleRegister() {
    if (!newName.trim() || saving) return
    setSaving(true)
    const { data, error } = await supabase
      .from("users")
      .insert({ name: newName.trim() })
      .select()
      .single()
    if (error) { showToast("Erro ao cadastrar. Tente novamente.", "error"); setSaving(false); return }
    setUsers(p => [...p, data])
    setCurrentUser(data)
    localStorage.setItem("bolao2026_user", JSON.stringify(data))
    setNewName("")
    showToast("Bem-vindo, " + data.name + "! 🎉", "success")
    setSaving(false)
  }

  function handleLogout() {
    setCurrentUser(null)
    localStorage.removeItem("bolao2026_user")
  }

  async function savePick(matchId, home, away) {
    if (!currentUser) return
    const { error } = await supabase.from("picks").upsert(
      { user_id: currentUser.id, match_id: matchId, home, away },
      { onConflict: "user_id,match_id" }
    )
    if (error) { showToast("Erro ao salvar palpite.", "error"); return }
    setPicks(prev => ({
      ...prev,
      [currentUser.id]: { ...(prev[currentUser.id] || {}), [matchId]: { home, away } }
    }))
    showToast("Palpite salvo! ✅", "success")
  }

  function getUserStats(userId) {
    const up = picks[userId] || {}
    let total = 0, exact = 0, outcome = 0, pending = 0
    // fase de grupos
    ROUNDS.forEach(r => r.matches.forEach(m => {
      const p = up[m.id]; if (!p) return
      const pts = calcPoints(p, m.result)
      if (pts === null) pending++
      else if (pts === 5) { total += 5; exact++ }
      else if (pts === 1) { total += 1; outcome++ }
    }))
    // eliminatórias — todos os jogos do KNOCKOUT
    const allKnockout = [
      ...KNOCKOUT.r16,
      ...KNOCKOUT.qf,
      ...KNOCKOUT.sf,
      ...KNOCKOUT.semi,
      ...KNOCKOUT.final,
    ]
    allKnockout.forEach(m => {
      const p = up[m.id]; if (!p) return
      // pênaltis: resultado para pontuação é o placar do tempo regulamentar
      const result = m.result ? { home: m.result.home, away: m.result.away } : null
      const pts = calcPoints(p, result)
      if (pts === null) pending++
      else if (pts === 5) { total += 5; exact++ }
      else if (pts === 1) { total += 1; outcome++ }
    })
    return { total, exact, outcome, pending }
  }

  function getRanking() {
    return users.map(u => ({ ...u, ...getUserStats(u.id) }))
      .sort((a, b) => b.total - a.total || b.exact - a.exact)
  }

  if (loading) return (
    <>
      <style>{css}</style>
      <div className="loading-screen">
        <div className="spinner" />
        Carregando o bolão...
      </div>
    </>
  )

  if (!currentUser) return (
    <>
      <style>{css}</style>
      <div className="auth-screen">
        <div className="auth-hero">
          <div className="auth-trophy">⚽</div>
          <div className="auth-title">BOLÃO<br />COPA 2026</div>
          <div className="auth-subtitle">Faça seus palpites e dispute com amigos</div>
        </div>
        <div className="auth-card">
          {users.length > 0 && (<>
            <div className="auth-section-title">Selecione seu perfil</div>
            <div className="user-list">
              {users.map(u => (
                <div key={u.id} className="user-item" onClick={() => { setCurrentUser(u); localStorage.setItem("bolao2026_user", JSON.stringify(u)) }}>
                  <div className="avatar" style={{ background: stringColor(u.name) }}>{initials(u.name)}</div>
                  <div className="user-item-name">{u.name}</div>
                  <span className="chevron-right">›</span>
                </div>
              ))}
            </div>
            <div className="divider"><div className="divider-line" /><span className="divider-text">ou cadastre-se</span><div className="divider-line" /></div>
          </>)}
          <label className="field-label">Nome completo</label>
          <input className="field-input" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Seu nome" />
          <button className="primary-btn" onClick={handleRegister} disabled={!newName.trim() || saving}>
            {saving ? "Cadastrando..." : "Criar perfil e entrar"}
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <div className="header-inner">
            <div className="header-logo">BOLÃO 2026<span>Copa do Mundo FIFA</span></div>
            <div className="header-user" onClick={handleLogout}>
              <div className="avatar" style={{ background: stringColor(currentUser.name) }}>{initials(currentUser.name)}</div>
              <span className="header-user-name">{currentUser.name}</span>
            </div>
          </div>
        </div>
        <div className="content">
          {tab === "picks"    && <PicksTab    currentUser={currentUser} picks={picks} savePick={savePick} />}
          {tab === "galera"   && <GaleraTab   currentUser={currentUser} picks={picks} users={users} />}
          {tab === "ranking"  && <RankingTab  ranking={getRanking()} currentUser={currentUser} />}
          {tab === "mataмata" && <MataMataTab />}
          {tab === "history"  && <HistoryTab  currentUser={currentUser} picks={picks} />}
        </div>
        <nav className="bottom-nav">
          <button className={`nav-btn ${tab === "picks"    ? "active" : ""}`} onClick={() => setTab("picks")}   ><IconBall />Palpites</button>
          <button className={`nav-btn ${tab === "galera"   ? "active" : ""}`} onClick={() => setTab("galera")}  ><IconGroup />Galera</button>
          <button className={`nav-btn ${tab === "ranking"  ? "active" : ""}`} onClick={() => setTab("ranking")} ><IconTrophy />Ranking</button>
          <button className={`nav-btn ${tab === "mataмata" ? "active" : ""}`} onClick={() => setTab("mataмata")}><IconBracket />Mata-Mata</button>
          <button className={`nav-btn ${tab === "history"  ? "active" : ""}`} onClick={() => setTab("history")} ><IconHistory />Histórico</button>
        </nav>
        {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      </div>
    </>
  )
}


// ─── MATA-MATA TAB ────────────────────────────────────────────────────────────
const KNOCKOUT = {
  r16: [
    // ── LADO ESQUERDO (top) ──
    { id:'k1',  date:'28/06', home:{name:'África do Sul', flag:'🇿🇦'}, away:{name:'Canadá',     flag:'🇨🇦'}, result:{ home: 0, away: 1 } },
    { id:'k4',  date:'29/06', home:{name:'Holanda',       flag:'🇳🇱'}, away:{name:'Marrocos',    flag:'🇲🇦'}, result:{ home: 1, away: 1, pen: '2-3', winner: 'away' } },
    { id:'k3',  date:'29/06', home:{name:'Alemanha',      flag:'🇩🇪'}, away:{name:'Paraguai',    flag:'🇵🇾'}, result:{ home: 1, away: 1, pen: '3-4', winner: 'away' } },
    { id:'k6',  date:'30/06', home:{name:'França',        flag:'🇫🇷'}, away:{name:'Suécia',      flag:'🇸🇪'}, result:{ home: 3, away: 0 } },
    { id:'k11', date:'02/07', home:{name:'Espanha',       flag:'🇪🇸'}, away:{name:'Áustria',     flag:'🇦🇹'}, result:{ home: 3, away: 0 } },
    { id:'k12', date:'02/07', home:{name:'Portugal',      flag:'🇵🇹'}, away:{name:'Croácia',     flag:'🇭🇷'}, result:{ home: 2, away: 1 } },
    { id:'k10', date:'01/07', home:{name:'EUA',           flag:'🇺🇸'}, away:{name:'Bósnia',      flag:'🇧🇦'}, result:{ home: 2, away: 0 } },
    { id:'k9',  date:'01/07', home:{name:'Bélgica',       flag:'🇧🇪'}, away:{name:'Senegal',     flag:'🇸🇳'}, result:{ home: 3, away: 2, pen: 'ET', winner: 'home' } },
    // ── LADO DIREITO (bottom) ──
    { id:'k2',  date:'29/06', home:{name:'Brasil',        flag:'🇧🇷'}, away:{name:'Japão',       flag:'🇯🇵'}, result:{ home: 2, away: 1 } },
    { id:'k5',  date:'30/06', home:{name:'C. do Marfim',  flag:'🇨🇮'}, away:{name:'Noruega',     flag:'🇳🇴'}, result:{ home: 1, away: 2 } },
    { id:'k7',  date:'30/06', home:{name:'México',        flag:'🇲🇽'}, away:{name:'Equador',     flag:'🇪🇨'}, result:{ home: 2, away: 0 } },
    { id:'k8',  date:'01/07', home:{name:'Inglaterra',    flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'}, away:{name:'Congo (RD)',  flag:'🇨🇩'}, result:{ home: 2, away: 1 } },
    { id:'k15', date:'03/07', home:{name:'Argentina',     flag:'🇦🇷'}, away:{name:'Cabo Verde',  flag:'🇨🇻'}, result:{ home: 3, away: 2, pen: 'ET', winner: 'home' } },
    { id:'k14', date:'03/07', home:{name:'Austrália',     flag:'🇦🇺'}, away:{name:'Egito',       flag:'🇪🇬'}, result:{ home: 1, away: 1, pen: '2-4', winner: 'away' } },
    { id:'k13', date:'03/07', home:{name:'Suíça',         flag:'🇨🇭'}, away:{name:'Argélia',     flag:'🇩🇿'}, result:{ home: 2, away: 0 } },
    { id:'k16', date:'03/07', home:{name:'Colômbia',      flag:'🇨🇴'}, away:{name:'Gana',        flag:'🇬🇭'}, result:{ home: 1, away: 0 } },
  ],
  qf: [
    // ── LADO ESQUERDO ──
    { id:"q1", date:"04/07", time:"14h",    kickoff:"2026-07-04T14:00", home:{name:"Canadá",    flag:"🇨🇦"}, away:{name:"Marrocos",  flag:"🇲🇦"}, result:{ home: 0, away: 3 } }, // Oit.1
    { id:"q2", date:"04/07", time:"18h",    kickoff:"2026-07-04T19:00", home:{name:"Paraguai",  flag:"🇵🇾"}, away:{name:"França",    flag:"🇫🇷"}, result:null }, // Oit.2
    { id:"q3", date:"06/07", time:"16h",    kickoff:"2026-07-06T16:00", home:{name:"Portugal",  flag:"🇵🇹"}, away:{name:"Espanha",   flag:"🇪🇸"}, result:null }, // Oit.3
    { id:"q4", date:"06/07", time:"21h",    kickoff:"2026-07-06T21:00", home:{name:"EUA",       flag:"🇺🇸"}, away:{name:"Bélgica",   flag:"🇧🇪"}, result:null }, // Oit.4
    // ── LADO DIREITO ──
    { id:"q5", date:"05/07", time:"17h",    kickoff:"2026-07-05T17:00", home:{name:"Brasil",    flag:"🇧🇷"}, away:{name:"Noruega",   flag:"🇳🇴"}, result:null }, // Oit.5
    { id:"q6", date:"05/07", time:"21h",    kickoff:"2026-07-05T21:00", home:{name:"México",    flag:"🇲🇽"}, away:{name:"Inglaterra",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"}, result:null }, // Oit.6
    { id:"q7", date:"07/07", time:"13h",    kickoff:"2026-07-07T13:00", home:{name:"Argentina", flag:"🇦🇷"}, away:{name:"Egito",     flag:"🇪🇬"}, result:null }, // Oit.7
    { id:"q8", date:"07/07", time:"17h",    kickoff:"2026-07-07T17:00", home:{name:"Suíça",     flag:"🇨🇭"}, away:{name:"Colômbia",  flag:"🇨🇴"}, result:null }, // Oit.8
  ],
  sf: [
    // ── LADO ESQUERDO ──
    { id:'s1', date:'09/07', home:{name:'Venc. Oit.1', flag:''}, away:{name:'Venc. Oit.2', flag:''}, result:null }, // Qrt.1
    { id:'s2', date:'10/07', home:{name:'Venc. Oit.3', flag:''}, away:{name:'Venc. Oit.4', flag:''}, result:null }, // Qrt.2
    // ── LADO DIREITO ──
    { id:'s3', date:'11/07', home:{name:'Venc. Oit.5', flag:''}, away:{name:'Venc. Oit.6', flag:''}, result:null }, // Qrt.3
    { id:'s4', date:'11/07', home:{name:'Venc. Oit.7', flag:''}, away:{name:'Venc. Oit.8', flag:''}, result:null }, // Qrt.4
  ],
  semi: [
    { id:'se1', date:'14/07', home:{name:'Venc. Qrt.1', flag:''}, away:{name:'Venc. Qrt.2', flag:''}, result:null },
    { id:'se2', date:'15/07', home:{name:'Venc. Qrt.3', flag:''}, away:{name:'Venc. Qrt.4', flag:''}, result:null },
  ],
  final: [
    { id:'f1', date:'19/07', home:{name:'Venc. Semi 1', flag:''}, away:{name:'Venc. Semi 2', flag:''}, result:null },
  ],
}

// helper: extrai string do time (pode ser string ou {name,flag})
function teamName(t) { return typeof t === 'string' ? t : t?.name || '' }
function teamFlag(t) { return FLAGS[teamName(t)] || '' }

// ─── PICKS TAB ───────────────────────────────────────────────────────────────
function PicksTab({ currentUser, picks, savePick }) {
  // Monta pseudo-rodada das eliminatórias — normaliza {name,flag} → string
  const knockoutRound = {
    id: 99,
    label: "Eliminatórias",
    startDate: "2026-06-28",
    matches: [
      ...KNOCKOUT.r16, ...KNOCKOUT.qf, ...KNOCKOUT.sf,
      ...KNOCKOUT.semi, ...KNOCKOUT.final,
    ].map(m => ({
      ...m,
      home: m.home.name,
      away: m.away.name,
      group: "–",
      time: m.time || "",
      city: m.city || "",
      kickoff: m.kickoff || null,
    })),
  }

  const allRounds = [...ROUNDS, knockoutRound]

  const [draft, setDraft] = useState(() => {
    const d = {}
    allRounds.forEach(r => r.matches.forEach(m => {
      const p = (picks[currentUser.id] || {})[m.id]
      if (p) d[m.id] = { ...p }
    }))
    return d
  })
  const [saving, setSaving] = useState({})
  const [view, setView] = useState("current")

  function isKnockoutRoundFinished(round) {
    return round.matches.every(m => !!m.result)
  }

  const pastRounds    = allRounds.filter(r => r.id === 99 ? isKnockoutRoundFinished(r) : isRoundFinished(r))
  const currentRounds = allRounds.filter(r => r.id === 99 ? !isKnockoutRoundFinished(r) : !isRoundFinished(r))
  const visibleRounds = view === "current" ? currentRounds : pastRounds

  function setScore(matchId, side, val) {
    const num = val === "" ? "" : Math.max(0, Math.min(20, parseInt(val) || 0))
    setDraft(p => ({ ...p, [matchId]: { ...p[matchId], [side]: num } }))
  }

  async function handleSave(matchId) {
    const p = draft[matchId]
    if (p?.home === "" || p?.away === "" || p?.home == null || p?.away == null) return
    setSaving(prev => ({ ...prev, [matchId]: true }))
    await savePick(matchId, +p.home, +p.away)
    setSaving(prev => ({ ...prev, [matchId]: false }))
  }

  return (
    <div>
      <div className="picks-filter">
        <button className={`picks-filter-btn ${view === "current" ? "active" : ""}`} onClick={() => setView("current")}>
          🗓 Atual / Próximas <span className="picks-filter-count">{currentRounds.length}</span>
        </button>
        <button className={`picks-filter-btn ${view === "past" ? "active" : ""}`} onClick={() => setView("past")}>
          ✅ Anteriores <span className="picks-filter-count">{pastRounds.length}</span>
        </button>
      </div>

      {visibleRounds.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">{view === "past" ? "📋" : "⏳"}</div>
          <div className="empty-state-text">{view === "past" ? "Nenhuma rodada encerrada ainda." : "Nenhuma rodada em andamento."}</div>
        </div>
      )}

      {visibleRounds.map(round => {
        const open = isRoundOpen(round.startDate)
        const isKnockout = round.id === 99
        return (
          <div key={round.id} className="card" style={{ marginBottom: 16 }}>
            <div className="round-header">
              <span className="round-title">{round.label}</span>
              <span className={`round-badge ${open ? "badge-open" : "badge-locked"}`}>
                {open
                  ? (isKnockout ? isKnockoutRoundFinished(round) : isRoundFinished(round)) ? "Encerrada" : "Aberta"
                  : `Abre ${formatDateBR(round.startDate)}`}
              </span>
            </div>
            {round.matches.map(match => {
              const savedPick   = (picks[currentUser.id] || {})[match.id]
              const p           = draft[match.id] || {}
              // para pênaltis, calcular pontos só pelo placar regulamentar
              const resultForPts = match.result ? { home: match.result.home, away: match.result.away } : null
              const pts         = savedPick ? calcPoints(savedPick, resultForPts) : null
              const hasResult   = !!match.result
              const pickAllowed = isPickAllowed(match) && !savedPick
              const pickLocked  = !pickAllowed
              const showSaveBtn = !hasResult && !savedPick
              const isDone      = hasResult && !!savedPick
              const isSaving    = saving[match.id]
              const hrsToLock   = hoursUntilLock(match)
              const closingSoon = !hasResult && !savedPick && hrsToLock !== null && hrsToLock <= 2 && hrsToLock > 0
              const penInfo     = match.result?.pen ? ` (P: ${match.result.pen})` : ''

              return (
                <div key={match.id} className={`match-item${isDone ? " match-done" : ""}`}>
                  <div className="match-meta">
                    {!isKnockout && <><span className="group-tag">Grupo {match.group}</span><span className="match-meta-dot" /></>}
                    <span>{match.date}{match.time ? ` · ${match.time}` : ''}</span>
                    {match.city && <><span className="match-meta-dot" /><span>{match.city}</span></>}
                  </div>
                  <div className="match-teams">
                    <span className="team-flag">{FLAGS[match.home] || ''}</span>
                    <span className="team-name">{match.home}</span>
                    <span className="vs-badge">vs</span>
                    <span className="team-name away">{match.away}</span>
                    <span className="team-flag">{FLAGS[match.away] || ''}</span>
                  </div>
                  {hasResult && (
                    <div className="real-result-row">
                      <span className="real-result-label">Resultado real</span>
                      <span className="real-score">{match.result.home} – {match.result.away}{penInfo}</span>
                    </div>
                  )}
                  <div className="pick-row">
                    <div className="pick-score-group">
                      <input className="score-input" type="number" min="0" max="20" inputMode="numeric"
                        value={p.home ?? ""} onChange={e => setScore(match.id, "home", e.target.value)} disabled={pickLocked} />
                      <span className="score-sep">:</span>
                      <input className="score-input" type="number" min="0" max="20" inputMode="numeric"
                        value={p.away ?? ""} onChange={e => setScore(match.id, "away", e.target.value)} disabled={pickLocked} />
                    </div>
                    <div className="pick-divider" />
                    <div className="pick-status">
                      <span className="pts-label">Pts</span>
                      {pts === 5 ? <span className="pts-value pts-5">5</span>
                        : pts === 1 ? <span className="pts-value pts-1">1</span>
                        : pts === 0 ? <span className="pts-value pts-0">0</span>
                        : <span className="pts-pending pts-value">–</span>}
                    </div>
                  </div>

                  {closingSoon && (
                    <div className="locked-notice" style={{ background: "#FFF7ED", borderColor: "#FED7AA", color: "#C2410C" }}>
                      ⚠️ Fecha em {Math.floor(hrsToLock)}h — palpite logo!
                    </div>
                  )}
                  {showSaveBtn && pickAllowed && (
                    <button className="save-btn default" onClick={() => handleSave(match.id)}
                      disabled={isSaving || p.home === "" || p.away === "" || p.home == null || p.away == null}>
                      {isSaving ? "Salvando..." : "Salvar palpite"}
                    </button>
                  )}
                  {showSaveBtn && !pickAllowed && !hasResult && (
                    <div className="locked-notice">🔒 Prazo encerrado — palpites fechados 1h antes do jogo</div>
                  )}
                  {savedPick && !hasResult && (
                    <button className="save-btn locked" disabled>✓ Palpite salvo</button>
                  )}
                  {hasResult && !savedPick && <div className="locked-notice">⏱ Jogo encerrado — palpite não registrado</div>}
                  {hasResult && savedPick && <div className="locked-notice" style={{ background: "#F0FDF4", borderColor: "#BBF7D0", color: "#166534" }}>🔒 Palpite registrado — resultado apurado</div>}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// ─── GALERA TAB ──────────────────────────────────────────────────────────────
function GaleraTab({ currentUser, picks, users }) {
  const [selectedRound, setSelectedRound] = useState(0)

  const allKnockoutMatches = [
    ...KNOCKOUT.r16, ...KNOCKOUT.qf, ...KNOCKOUT.sf,
    ...KNOCKOUT.semi, ...KNOCKOUT.final,
  ]

  const visibleGroupRounds = ROUNDS.filter(r =>
    isRoundOpen(r.startDate) || r.matches.some(m => users.some(u => (picks[u.id] || {})[m.id]))
  )

  const knockoutVisible = isRoundOpen("2026-06-28") ||
    allKnockoutMatches.some(m => users.some(u => (picks[u.id] || {})[m.id]))

  const knockoutSection = knockoutVisible ? [{
    id: 99,
    label: "Eliminatórias",
    matches: allKnockoutMatches,
  }] : []

  const allSections = [...visibleGroupRounds, ...knockoutSection]
  const firstMatchId = allSections[0]?.matches[0]?.id
  const [expandedMatch, setExpandedMatch] = useState(firstMatchId || null)

  const filteredSections = selectedRound === 0
    ? allSections
    : allSections.filter(r => r.id === selectedRound)

  if (!allSections.length) return (
    <div className="empty-state">
      <div className="empty-state-icon">🔒</div>
      <div className="empty-state-text">Os palpites da galera ficam visíveis quando a rodada abre.</div>
    </div>
  )

  function MatchItem({ match }) {
    const isExpanded   = expandedMatch === match.id
    const pickersCount = users.filter(u => (picks[u.id] || {})[match.id]).length
    const pickers      = users.filter(u => (picks[u.id] || {})[match.id])
      .sort((a, b) => a.id === currentUser.id ? -1 : b.id === currentUser.id ? 1 : a.name.localeCompare(b.name))
    const resultDisplay = match.result
      ? match.result.pen
        ? `${match.result.home}–${match.result.away} (P)`
        : `${match.result.home}–${match.result.away}`
      : null

    return (
      <div className="galera-match">
        <div className="galera-match-header" onClick={() => setExpandedMatch(isExpanded ? null : match.id)}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="galera-match-title">
              {teamFlag(match.home)} {teamName(match.home)} vs {teamName(match.away)} {teamFlag(match.away)}
            </div>
            <div className="galera-match-sub">{match.date}{match.city ? ` · ${match.city}` : ''}</div>
          </div>
          <div className="galera-match-right">
            {resultDisplay
              ? <span className="galera-result-pill">{resultDisplay}</span>
              : <span className="galera-result-pill pending">Aguardando</span>}
            {pickersCount > 0 && <span className="galera-count-badge">{pickersCount}</span>}
            <span className={`chevron-icon ${isExpanded ? "open" : ""}`}>⌄</span>
          </div>
        </div>
        {isExpanded && (
          <div className="galera-picks-list">
            {pickers.length === 0
              ? <div style={{padding:"16px 14px",fontSize:13,color:"var(--text-muted)",textAlign:"center"}}>Nenhum palpite registrado.</div>
              : pickers.map(user => {
                  const p = (picks[user.id] || {})[match.id]
                  const result = match.result ? { home: match.result.home, away: match.result.away } : null
                  const pts = calcPoints(p, result)
                  const isMe = user.id === currentUser.id
                  const rowClass = pts === 5 ? "pts-5" : pts === 1 ? "pts-1" : pts === 0 ? "pts-0" : ""
                  return (
                    <div key={user.id} className={`galera-pick-row ${rowClass} ${isMe ? "pts-me" : ""}`}>
                      <div className="galera-avatar" style={{ background: stringColor(user.name) }}>{initials(user.name)}</div>
                      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 4 }}>
                        <span className="galera-user-name">{user.name}</span>
                        {isMe && <span className="galera-you-tag">você</span>}
                      </div>
                      <span className="galera-score">{p.home}–{p.away}</span>
                      <GaleraPtsBadge pts={pts} />
                    </div>
                  )
                })
            }
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="round-filter">
        <button className={`round-filter-btn ${selectedRound === 0 ? "active" : ""}`} onClick={() => setSelectedRound(0)}>Todas</button>
        {visibleGroupRounds.map(r => (
          <button key={r.id} className={`round-filter-btn ${selectedRound === r.id ? "active" : ""}`} onClick={() => setSelectedRound(r.id)}>
            {r.id}ª Rodada
          </button>
        ))}
        {knockoutVisible && (
          <button className={`round-filter-btn ${selectedRound === 99 ? "active" : ""}`} onClick={() => setSelectedRound(99)}>
            Eliminatórias
          </button>
        )}
      </div>
      {filteredSections.map(section => (
        <div key={section.id} className="card" style={{ marginBottom: 16 }}>
          <div className="round-header"><span className="round-title">{section.label}</span></div>
          {section.matches.map(match => <MatchItem key={match.id} match={match} />)}
        </div>
      ))}
    </div>
  )
}

function GaleraPtsBadge({ pts }) {
  if (pts === 5) return <span className="galera-pts-badge b5">+5</span>
  if (pts === 1) return <span className="galera-pts-badge b1">+1</span>
  if (pts === 0) return <span className="galera-pts-badge b0"> 0</span>
  return              <span className="galera-pts-badge bp">–</span>
}

// ─── RANKING TAB ─────────────────────────────────────────────────────────────
function RankingTab({ ranking, currentUser }) {
  return (
    <div>
      <div className="section-hd"><span className="section-hd-title">Classificação geral</span><div className="section-hd-line" /></div>
      <div className="card">
        <div className="ranking-header"><div className="ranking-title">🏆 Ranking do Bolão</div></div>
        {ranking.map((u, i) => (
          <div key={u.id} className={`rank-item ${u.id === currentUser.id ? "rank-me" : ""}`}>
            <div className={`rank-pos ${i === 0 ? "top1" : i === 1 ? "top2" : i === 2 ? "top3" : ""}`}>
              {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
            </div>
            <div className="rank-avatar" style={{ background: stringColor(u.name) }}>{initials(u.name)}</div>
            <div className="rank-info">
              <div className="rank-name">{u.name}{u.id === currentUser.id ? " (você)" : ""}</div>
              <div className="rank-detail">✅ {u.exact} placar · 🎯 {u.outcome} resultado · ⏳ {u.pending} pend.</div>
            </div>
            <div className="rank-pts">
              <div className="rank-pts-val">{u.total}</div>
              <div className="rank-pts-label">pontos</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ padding: "14px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Pontuação</div>
          {[{ pts: 5, label: "Placar exato", color: "var(--green)" }, { pts: 1, label: "Resultado certo (vitória/empate)", color: "var(--gold)" }, { pts: 0, label: "Resultado errado", color: "var(--text-light)" }].map(r => (
            <div key={r.pts} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontFamily: "Orbitron,monospace", fontSize: 20, fontWeight: 900, color: r.color, width: 24, textAlign: "center", flexShrink: 0 }}>{r.pts}</span>
              <span style={{ fontSize: 13, color: "var(--text)" }}>{r.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── HISTORY TAB ─────────────────────────────────────────────────────────────
function HistoryTab({ currentUser, picks }) {
  const userPicks = picks[currentUser.id] || {}

  const allKnockout = [
    ...KNOCKOUT.r16, ...KNOCKOUT.qf, ...KNOCKOUT.sf,
    ...KNOCKOUT.semi, ...KNOCKOUT.final,
  ]

  const groupMade = ROUNDS.flatMap(r => r.matches).filter(m => userPicks[m.id])
  const knockMade = allKnockout.filter(m => userPicks[m.id])

  if (!groupMade.length && !knockMade.length) return (
    <div className="empty-state">
      <div className="empty-state-icon">📋</div>
      <div className="empty-state-text">Você ainda não fez nenhum palpite.<br />Vá para Palpites para começar!</div>
    </div>
  )

  function MatchRow({ match, city }) {
    const p = userPicks[match.id]
    const result = match.result ? { home: match.result.home, away: match.result.away } : null
    const pts = calcPoints(p, result)
    const penInfo = match.result?.pen ? ` (P: ${match.result.pen})` : ''
    return (
      <div className="history-match">
        <div className="history-header">
          <div>
            <div className="history-game">{teamFlag(match.home)} {teamName(match.home)} vs {teamName(match.away)} {teamFlag(match.away)}</div>
            <div className="history-date">{match.date}{city ? ` · ${city}` : ''}</div>
          </div>
          <PtsChip pts={pts} />
        </div>
        <div className="history-scores">
          <div className="score-col">
            <span className="score-col-label">Seu palpite</span>
            <span className={`score-col-val ${pts !== null ? "pick-done" : "pick-pending"}`}>{p.home} – {p.away}</span>
          </div>
          {match.result ? (
            <>
              <div style={{ width: 1, background: "var(--border)", alignSelf: "stretch" }} />
              <div className="score-col">
                <span className="score-col-label">Real</span>
                <span className="score-col-val real">{match.result.home} – {match.result.away}{penInfo}</span>
              </div>
            </>
          ) : (
            <div className="score-col">
              <span className="score-col-label">Real</span>
              <span className="score-col-val pick-pending">Aguard.</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="section-hd"><span className="section-hd-title">Seus palpites</span><div className="section-hd-line" /></div>

      {/* Fase de grupos */}
      {ROUNDS.map(round => {
        const roundPicks = round.matches.filter(m => userPicks[m.id])
        if (!roundPicks.length) return null
        return (
          <div key={round.id} className="card" style={{ marginBottom: 14 }}>
            <div className="round-header"><span className="round-title">{round.label}</span></div>
            {roundPicks.map(match => <MatchRow key={match.id} match={match} city={match.city} />)}
          </div>
        )
      })}

      {/* Eliminatórias */}
      {knockMade.length > 0 && (
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="round-header"><span className="round-title">Eliminatórias</span></div>
          {knockMade.map(match => <MatchRow key={match.id} match={match} />)}
        </div>
      )}
    </div>
  )
}


// Match card: date(18) + team(24) + team(24) = 66px
const MH = 66  // match height px
const GAP = 4  // gap between matches in same phase

// Total height for N matches in a column (matches + gaps between them)
function colH(n) { return n * MH + (n - 1) * GAP }

// Center Y of match i (0-indexed) within a column of n matches
function matchCY(i, n) {
  return i * (MH + GAP) + MH / 2
}

function BMatch({ m, isFinal }) {
  const hasResult = !!m.result
  const hasPen = hasResult && !!m.result.pen
  // winner: if penalties, use pen winner; otherwise higher score
  const homeWin = hasResult && (hasPen ? m.result.winner === 'home' : m.result.home > m.result.away)
  const awayWin = hasResult && (hasPen ? m.result.winner === 'away' : m.result.away > m.result.home)
  const isTbd = !m.home.flag
  return (
    <div className={`b-match${isFinal ? " final" : ""}`} style={{ height: MH, flexShrink: 0 }}>
      <div className="b-date">{m.date}{hasPen ? ' (P)' : ''}</div>
      <div className={`b-team${isTbd ? " tbd" : ""}${homeWin ? " winner" : ""}${hasResult && !homeWin ? " loser" : ""}`}>
        {m.home.flag && <span className="b-flag">{m.home.flag}</span>}
        <span className="b-name">{m.home.name}</span>
        {hasResult && <span className="b-score">{m.result.home}{hasPen ? `(${m.result.pen.split('-')[0]})` : ''}</span>}
      </div>
      <div className={`b-team${isTbd ? " tbd" : ""}${awayWin ? " winner" : ""}${hasResult && !awayWin ? " loser" : ""}`}>
        {m.away.flag && <span className="b-flag">{m.away.flag}</span>}
        <span className="b-name">{m.away.name}</span>
        {hasResult && <span className="b-score">{m.result.away}{hasPen ? `(${m.result.pen.split('-')[1]})` : ''}</span>}
      </div>
    </div>
  )
}

// Connector SVG between two phases
// leftN = matches on left, rightN = matches on right, totalH = full column height
// leftN matches are evenly spaced in totalH, rightN matches are evenly spaced in totalH
// draws: right edge of left match → horizontal → vertical bracket → horizontal → left edge of right match
function BConn({ leftN, rightN, totalH, direction = 'ltr' }) {
  const W = 14
  const lines = []
  // group left matches into pairs, each pair connects to one right match
  const ratio = leftN / rightN  // how many left matches per right match
  for (let r = 0; r < rightN; r++) {
    // center Y of right match r
    const rightSlotH = totalH / rightN
    const rcy = r * rightSlotH + rightSlotH / 2

    // center Ys of the left matches that feed into right match r
    const leftStart = r * ratio
    const leftSlotH = totalH / leftN
    const lcy1 = leftStart * leftSlotH + leftSlotH / 2
    const lcy2 = (leftStart + ratio - 1) * leftSlotH + leftSlotH / 2

    if (direction === 'ltr') {
      // left→right: from right edge of left matches to left edge of right match
      lines.push(
        <line key={`l1-${r}`} x1={0} y1={lcy1} x2={W/2} y2={lcy1} stroke="#CBD5E1" strokeWidth="1"/>,
        <line key={`l2-${r}`} x1={0} y1={lcy2} x2={W/2} y2={lcy2} stroke="#CBD5E1" strokeWidth="1"/>,
        <line key={`v-${r}`}  x1={W/2} y1={lcy1} x2={W/2} y2={lcy2} stroke="#CBD5E1" strokeWidth="1"/>,
        <line key={`r-${r}`}  x1={W/2} y1={rcy} x2={W} y2={rcy} stroke="#CBD5E1" strokeWidth="1"/>,
      )
    } else {
      // right→left: mirrored
      lines.push(
        <line key={`l1-${r}`} x1={W} y1={lcy1} x2={W/2} y2={lcy1} stroke="#CBD5E1" strokeWidth="1"/>,
        <line key={`l2-${r}`} x1={W} y1={lcy2} x2={W/2} y2={lcy2} stroke="#CBD5E1" strokeWidth="1"/>,
        <line key={`v-${r}`}  x1={W/2} y1={lcy1} x2={W/2} y2={lcy2} stroke="#CBD5E1" strokeWidth="1"/>,
        <line key={`r-${r}`}  x1={W/2} y1={rcy} x2={0} y2={rcy} stroke="#CBD5E1" strokeWidth="1"/>,
      )
    }
  }
  return (
    <svg width={W} height={totalH} style={{ flexShrink: 0, display: 'block', marginTop: 20 }}>
      {lines}
    </svg>
  )
}

function BCol({ label, matches, totalH }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div className="b-phase-hdr" style={{ height: 20, marginBottom: 0 }}>{label}</div>
      <div style={{ height: totalH, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        {matches.map(m => <BMatch key={m.id} m={m} />)}
      </div>
    </div>
  )
}

function MataMataTab() {
  const { r16, qf, sf, semi, final } = KNOCKOUT
  const r16L = r16.slice(0,8),  r16R = r16.slice(8,16)
  const qfL  = qf.slice(0,4),   qfR  = qf.slice(4,8)
  const sfL  = sf.slice(0,2),   sfR  = sf.slice(2,4)

  // Total content height — based on 8 matches with gaps
  const TOTAL_H = colH(8)  // 8*66 + 7*4 = 556px

  return (
    <div>
      <div className="section-hd" style={{ marginBottom: 8 }}>
        <span className="section-hd-title">Chaveamento</span>
        <div className="section-hd-line" />
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-light)', marginBottom: 8, textAlign: 'center' }}>
        ← deslize para ver o chaveamento completo →
      </div>
      <div className="bracket-outer">
        <div style={{ display: 'flex', alignItems: 'flex-start', width: 'max-content', padding: '0 12px' }}>

          {/* ── LEFT SIDE ── */}
          <BCol label="Rodada 16" matches={r16L} totalH={TOTAL_H} />
          <BConn leftN={8} rightN={4} totalH={TOTAL_H} direction="ltr" />
          <BCol label="Oitavas" matches={qfL} totalH={TOTAL_H} />
          <BConn leftN={4} rightN={2} totalH={TOTAL_H} direction="ltr" />
          <BCol label="Quartas" matches={sfL} totalH={TOTAL_H} />
          <BConn leftN={2} rightN={1} totalH={TOTAL_H} direction="ltr" />
          <BCol label="Semi" matches={semi.slice(0,1)} totalH={TOTAL_H} />
          <BConn leftN={1} rightN={1} totalH={TOTAL_H} direction="ltr" />

          {/* ── FINAL CENTER ── */}
          <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <div className="b-phase-hdr" style={{ height: 20, color: '#15803D', textAlign: 'center' }}>🏆 Final</div>
            <div style={{ height: TOTAL_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BMatch m={final[0]} isFinal />
            </div>
          </div>

          {/* ── RIGHT SIDE (mirrored) ── */}
          <BConn leftN={1} rightN={1} totalH={TOTAL_H} direction="rtl" />
          <BCol label="Semi" matches={semi.slice(1,2)} totalH={TOTAL_H} />
          <BConn leftN={2} rightN={1} totalH={TOTAL_H} direction="rtl" />
          <BCol label="Quartas" matches={sfR} totalH={TOTAL_H} />
          <BConn leftN={4} rightN={2} totalH={TOTAL_H} direction="rtl" />
          <BCol label="Oitavas" matches={qfR} totalH={TOTAL_H} />
          <BConn leftN={8} rightN={4} totalH={TOTAL_H} direction="rtl" />
          <BCol label="Rodada 16" matches={r16R} totalH={TOTAL_H} />

        </div>
      </div>
    </div>
  )
}

function PtsChip({ pts }) {
  if (pts === null) return <span className="pts-chip cp">⏳ pendente</span>
  if (pts === 5)    return <span className="pts-chip c5">⭐ +5 pts</span>
  if (pts === 1)    return <span className="pts-chip c1">✓ +1 pt</span>
  return                  <span className="pts-chip c0">✗ 0 pts</span>
}

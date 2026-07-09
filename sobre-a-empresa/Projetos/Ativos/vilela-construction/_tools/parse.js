// Parser oficial da NOVA planilha Vilela (versão 2026-07-09).
// Produz: dados/planilha-vilela.json (dump completo, legível) + planilha-vilela.min.json (denso).
// Reaproveita padrões do to-json.js antigo, mas adaptado à nova estrutura (5 sheets).

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const XLSX_PATH = path.join(ROOT, 'dados', '_raw', 'planilha-vilela.xlsx');
const OUT = path.join(ROOT, 'dados', 'planilha-vilela.json');
const OUT_MIN = path.join(ROOT, 'dados', 'planilha-vilela.min.json');

const wb = XLSX.readFile(XLSX_PATH);

function money(v) {
  if (v === null || v === undefined || v === '') return null;
  const s = String(v).replace(/[$,\s]/g, '');
  const n = Number(s);
  return isNaN(n) ? String(v) : n;
}

function isEmpty(row) {
  return !row || row.every(c => c === null || c === undefined || c === '');
}

// -------- Price Book --------
// Colunas: Category | Service | Description | Unit | Economy | Standard | Premium |
//          Material Included? | Typical Minimum | Notes
const pb = XLSX.utils.sheet_to_json(wb.Sheets['Price Book'], { header: 1, defval: null, raw: false });
const priceBookHeader = pb[0];
const priceBook = [];
for (let i = 1; i < pb.length; i++) {
  const r = pb[i];
  if (isEmpty(r)) continue;
  priceBook.push({
    row: i + 1,
    category: r[0],
    service: r[1],
    description: r[2],
    unit: r[3],
    economy: money(r[4]),
    standard: money(r[5]),
    premium: money(r[6]),
    materialIncluded: r[7],
    typicalMinimum: money(r[8]),
    notes: r[9],
  });
}

// -------- Estimate Builder --------
// Colunas 0..9 = linha de item; 11..12 = resumo lateral.
// Colunas item: Line # | Category | Service | Description | Unit | Qty | Tier |
//               Unit Price | Line Total | Notes
const eb = XLSX.utils.sheet_to_json(wb.Sheets['Estimate Builder'], { header: 1, defval: null, raw: false });
const estimateItems = [];
const estimateSummary = [];
for (let i = 1; i < eb.length; i++) {
  const r = eb[i];
  if (isEmpty(r)) continue;
  // Linha de item: presença de Line # na col 0
  if (r[0] !== null && r[0] !== '' && r[0] !== undefined) {
    estimateItems.push({
      lineNumber: r[0],
      category: r[1],
      service: r[2],
      description: r[3],
      unit: r[4],
      qty: money(r[5]),
      tier: r[6],
      unitPrice: money(r[7]),
      lineTotal: money(r[8]),
      notes: r[9],
    });
  }
  // Sumário lateral (cols 11, 12): captura mesmo quando col 0 vazia
  if (r[11]) {
    estimateSummary.push({ label: r[11], value: money(r[12]) !== null ? money(r[12]) : r[12] });
  }
}

// -------- Dashboard --------
const db = XLSX.utils.sheet_to_json(wb.Sheets['Dashboard'], { header: 1, defval: null, raw: false });
const dashboard = [];
for (const r of db) {
  if (isEmpty(r)) continue;
  dashboard.push({ label: r[0], value: r[1] });
}

// -------- Settings --------
const st = XLSX.utils.sheet_to_json(wb.Sheets['Settings'], { header: 1, defval: null, raw: false });
const settings = [];
for (let i = 1; i < st.length; i++) {
  const r = st[i];
  if (isEmpty(r)) continue;
  settings.push({ setting: r[0], value: r[1], notes: r[2] });
}

// -------- Notes --------
const nt = XLSX.utils.sheet_to_json(wb.Sheets['Notes'], { header: 1, defval: null, raw: false });
const notes = [];
for (const r of nt) {
  if (isEmpty(r)) continue;
  notes.push(r[0]);
}

// -------- Meta --------
const stats = fs.statSync(XLSX_PATH);
const meta = {
  source: 'Google Drive fileId 1COD0FEHHXjDoaUGYt630Y61rl-VUgOZG',
  originalFilename: 'Vilela_Construction_MA_Professional_Price_Book.xlsx',
  downloadedAt: new Date().toISOString(),
  fileSizeBytes: stats.size,
  sheets: wb.SheetNames,
  counts: {
    priceBook: priceBook.length,
    estimateItems: estimateItems.length,
    estimateSummary: estimateSummary.length,
    dashboard: dashboard.length,
    settings: settings.length,
    notes: notes.length,
  },
};

const out = {
  meta,
  priceBookHeader,
  priceBook,
  estimateItems,
  estimateSummary,
  dashboard,
  settings,
  notes,
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
fs.writeFileSync(OUT_MIN, JSON.stringify(out));

console.log('OK — parser rodou.');
console.log('Wrote:', OUT);
console.log('Wrote:', OUT_MIN);
console.log('Sheets:', wb.SheetNames);
console.log('Counts:', meta.counts);

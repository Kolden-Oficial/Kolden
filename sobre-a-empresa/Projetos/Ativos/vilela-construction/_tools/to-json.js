const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const wb = XLSX.readFile(path.join(__dirname, '..', '_temp-precos.xlsx'));

function money(v) {
  if (v === null || v === undefined || v === '') return null;
  const s = String(v).replace(/[$,\s]/g, '');
  const n = Number(s);
  return isNaN(n) ? String(v) : n;
}

// Price Book
const pb = XLSX.utils.sheet_to_json(wb.Sheets['Price Book'], { header: 1, defval: null, raw: false });
const priceBook = [];
for (let i = 3; i < pb.length; i++) {
  const r = pb[i];
  if (!r || !r[1]) continue;
  priceBook.push({
    category: r[0],
    service: r[1],
    description: r[2],
    unit: r[3],
    economy: money(r[4]),
    standard: money(r[5]),
    premium: money(r[6]),
    material: r[7],
    typicalMinimum: money(r[8]),
    notes: r[9],
  });
}

// Choose Your Project
const cp = XLSX.utils.sheet_to_json(wb.Sheets['Choose Your Project'], { header: 1, defval: null, raw: false });
const projects = [];
let currentProject = null;
for (let i = 3; i < cp.length; i++) {
  const r = cp[i];
  if (!r) continue;
  if (r[0]) {
    currentProject = { type: r[0], bestFor: r[7], tiers: [] };
    projects.push(currentProject);
  }
  if (!currentProject) continue;
  if (r[1]) {
    currentProject.tiers.push({
      tier: r[1],
      included: r[2],
      unit: r[3],
      unitPrice: money(r[4]),
      typicalSize: r[5],
      examplePrice: money(r[6]),
    });
  }
}

// Settings
const st = XLSX.utils.sheet_to_json(wb.Sheets['Settings'], { header: 1, defval: null, raw: false });
const settings = {};
for (let i = 2; i < st.length; i++) {
  const r = st[i];
  if (r && r[0]) settings[r[0]] = { value: r[1], notes: r[2] };
}

// Sales Dashboard project navigator (starting prices)
const sd = XLSX.utils.sheet_to_json(wb.Sheets['Sales Dashboard'], { header: 1, defval: null, raw: false });
const startingPrices = [];
for (let i = 8; i < sd.length; i++) {
  const r = sd[i];
  if (r && r[0]) startingPrices.push({
    projectType: r[0],
    from: money(r[1]),
    typical: money(r[2]),
    premium: money(r[3]),
  });
}

const out = { priceBook, projects, settings, startingPrices };
fs.writeFileSync(path.join(__dirname, '..', '_temp-catalog.json'), JSON.stringify(out, null, 2));
console.log('Wrote _temp-catalog.json:');
console.log('  priceBook:', priceBook.length, 'services');
console.log('  projects:', projects.length, 'project types');
console.log('  settings:', Object.keys(settings).length, 'settings');
console.log('  startingPrices:', startingPrices.length, 'entries');

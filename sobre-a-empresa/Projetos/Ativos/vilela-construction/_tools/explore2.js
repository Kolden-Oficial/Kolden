// Segundo scan: contagem real de linhas não-vazias por sheet + categorias distintas
const XLSX = require('xlsx');
const path = require('path');

const xlsxPath = path.join(__dirname, '..', 'dados', '_raw', 'planilha-vilela.xlsx');
const wb = XLSX.readFile(xlsxPath);

function isEmpty(row) {
  return !row || row.every(c => c === null || c === undefined || c === '');
}

for (const name of wb.SheetNames) {
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: null, raw: false });
  const nonEmpty = rows.filter(r => !isEmpty(r)).length;
  console.log(`${name}: ${rows.length} total, ${nonEmpty} não-vazias`);
}

console.log('');
console.log('--- Price Book: categorias distintas + linhas por categoria ---');
const pb = XLSX.utils.sheet_to_json(wb.Sheets['Price Book'], { header: 1, defval: null, raw: false });
const byCat = {};
for (let i = 1; i < pb.length; i++) {
  const r = pb[i];
  if (isEmpty(r)) continue;
  const cat = r[0] || '(sem categoria)';
  byCat[cat] = (byCat[cat] || 0) + 1;
}
const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
for (const [c, n] of cats) console.log(`  ${c}: ${n}`);
console.log(`Total categorias: ${cats.length}`);
console.log(`Total serviços: ${cats.reduce((s, [, n]) => s + n, 0)}`);

console.log('');
console.log('--- Settings inteiro ---');
const st = XLSX.utils.sheet_to_json(wb.Sheets['Settings'], { header: 1, defval: null, raw: false });
for (const r of st) {
  if (isEmpty(r)) continue;
  console.log(' ', JSON.stringify(r));
}

console.log('');
console.log('--- Notes inteiro ---');
const nt = XLSX.utils.sheet_to_json(wb.Sheets['Notes'], { header: 1, defval: null, raw: false });
for (const r of nt) {
  if (isEmpty(r)) continue;
  console.log(' ', JSON.stringify(r));
}

console.log('');
console.log('--- Dashboard inteiro ---');
const db = XLSX.utils.sheet_to_json(wb.Sheets['Dashboard'], { header: 1, defval: null, raw: false });
for (const r of db) {
  if (isEmpty(r)) continue;
  console.log(' ', JSON.stringify(r));
}

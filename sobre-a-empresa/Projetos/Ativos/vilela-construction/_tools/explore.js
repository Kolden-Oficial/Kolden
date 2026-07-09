// Exploratório: lista sheets e dimensões da nova planilha
const XLSX = require('xlsx');
const path = require('path');

const xlsxPath = path.join(__dirname, '..', 'dados', '_raw', 'planilha-vilela.xlsx');
const wb = XLSX.readFile(xlsxPath);

console.log('Sheets:', wb.SheetNames);
console.log('');

for (const name of wb.SheetNames) {
  const sh = wb.Sheets[name];
  const ref = sh['!ref'] || '(vazio)';
  const rows = XLSX.utils.sheet_to_json(sh, { header: 1, defval: null, raw: false });
  console.log(`=== ${name} ===`);
  console.log('  ref:', ref);
  console.log('  rows:', rows.length);
  console.log('  preview (primeiras 6 linhas):');
  for (let i = 0; i < Math.min(6, rows.length); i++) {
    console.log('   ', i, JSON.stringify(rows[i]));
  }
  console.log('');
}

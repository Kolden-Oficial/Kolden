const XLSX = require('xlsx');
const path = require('path');
const wb = XLSX.readFile(path.join(__dirname, '..', '_temp-precos.xlsx'));
for (const name of wb.SheetNames) {
  const ws = wb.Sheets[name];
  const range = ws['!ref'] || 'empty';
  console.log('=== SHEET:', name, '| range:', range);
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, raw: false });
  console.log('rows:', rows.length);
  for (let i = 0; i < rows.length; i++) {
    console.log(i, JSON.stringify(rows[i]));
  }
}

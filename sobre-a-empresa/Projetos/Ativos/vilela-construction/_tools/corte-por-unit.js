// Gera o recorte "projetos-fechados-vs-unitarios.md" a partir do JSON parseado.
// Agrupa por unit (Job vs SF/LF/Each/etc.), ordena por preço Standard desc.

const fs = require('fs');
const path = require('path');
const n = require(path.join(__dirname, '..', 'dados', 'planilha-vilela.json'));
const OUT = path.join(__dirname, '..', 'recortes', 'projetos-fechados-vs-unitarios.md');

const byUnit = {};
for (const r of n.priceBook) {
  const u = r.unit || '(sem)';
  if (!byUnit[u]) byUnit[u] = [];
  byUnit[u].push(r);
}

const lines = [];
lines.push('# Recorte — Projetos fechados (Job) vs. Unitários (SF/LF/Each)');
lines.push('');
lines.push('> **Fonte:** `dados/planilha-vilela.json`.');
lines.push('> **Corte:** agrupamento por coluna `Unit`. A leitura "preço médio" só faz sentido dentro de cada unit (comparar $/SF de tape com $/Job de kitchen é enganoso).');
lines.push('');
lines.push('## Legenda das unidades');
lines.push('');
lines.push('| Unit    | Significado                                             |');
lines.push('|---------|---------------------------------------------------------|');
lines.push('| SF      | Square Foot — preço por pé quadrado                     |');
lines.push('| LF      | Linear Foot — preço por pé linear                       |');
lines.push('| Each    | Por peça / unidade instalada                            |');
lines.push('| Job     | Projeto fechado, escopo definido em `Description`       |');
lines.push('| Step    | Por degrau                                              |');
lines.push('| Percent | Percentual do subtotal (aplicado sobre outros itens)    |');
lines.push('| Door    | Por porta                                               |');
lines.push('| Patch   | Por remendo isolado                                     |');
lines.push('');
lines.push('---');
lines.push('');

const fmt = v => typeof v === 'number' ? '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : (v == null ? '—' : String(v));

for (const [u, rows] of Object.entries(byUnit).sort((a, b) => b[1].length - a[1].length)) {
  const std = rows.map(r => r.standard).filter(v => typeof v === 'number');
  const avg = std.length ? std.reduce((s, v) => s + v, 0) / std.length : null;
  const mn = std.length ? Math.min(...std) : null;
  const mx = std.length ? Math.max(...std) : null;

  lines.push(`## ${u} — ${rows.length} serviços`);
  lines.push('');
  lines.push(`- Standard médio: **${fmt(avg)}**`);
  lines.push(`- Standard min → max: ${fmt(mn)} → ${fmt(mx)}`);
  lines.push('');
  lines.push('| Categoria | Serviço | Economy | Standard | Premium | Material |');
  lines.push('|---|---|---|---|---|---|');
  rows.sort((a, b) => (b.standard || 0) - (a.standard || 0));
  for (const r of rows) {
    lines.push(`| ${r.category} | ${r.service} | ${fmt(r.economy)} | ${fmt(r.standard)} | ${fmt(r.premium)} | ${r.materialIncluded || '—'} |`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
}

lines.push('## Leitura');
lines.push('');
lines.push('- **Job (19 serviços):** projetos fechados, alto ticket ($500 a $65k). Concentração em Kitchens, Bathrooms, Roofing repair, Basement finish. **Aqui é a venda consultiva** — CRM, proposta, prova social.');
lines.push('- **SF (44 serviços):** por área. **Aqui a calculadora pública funciona** — o prospect entende $/SF, o cliente ganha lead qualificado.');
lines.push('- **LF (18 serviços):** por comprimento. Trim, base, deck railing, siding transitions. Também elegível para calculadora.');
lines.push('- **Each (25 serviços):** peça por peça. Bom para "add-on shopping" no bottom-of-funnel (smart switch, motion sensor, storm door).');
lines.push('- **Percent (2 serviços):** overhead sobre subtotal. Não é serviço vendido isolado.');
lines.push('');
lines.push('_Argos, 2026-07-09._');

fs.writeFileSync(OUT, lines.join('\n'));
console.log('Wrote:', OUT);
console.log('Units:', Object.keys(byUnit).length);

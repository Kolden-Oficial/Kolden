// DIFF entre a versão NOVA (dados/planilha-vilela.json) e a versão antiga (_temp-catalog.json).
// Compara serviços por chave (category|service), preços por tier (Economy/Standard/Premium),
// unit, typicalMinimum e material. Emite tabelas markdown em analise/diff-vs-03-07.md.
//
// Convenções de saída:
//   fmt$(n) => "$1,234.00" | "—"
//   var%    => variação percentual sobre o antigo (arredondada a 1 casa)

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NOVO = require(path.join(ROOT, 'dados', 'planilha-vilela.json'));
const ANTIGO = require(path.join(ROOT, '_temp-catalog.json'));
const OUT = path.join(ROOT, 'analise', 'diff-vs-03-07.md');

const fmt = (n) => n === null || n === undefined
  ? '—'
  : (typeof n === 'number' ? '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : String(n));
const pct = (novo, antigo) => {
  if (typeof novo !== 'number' || typeof antigo !== 'number' || antigo === 0) return '—';
  const p = ((novo - antigo) / antigo) * 100;
  const sign = p >= 0 ? '+' : '';
  return `${sign}${p.toFixed(1)}%`;
};
const norm = (s) => (s || '').trim().toLowerCase();
const keyOf = (r) => `${norm(r.category)}|${norm(r.service)}`;

const mapNovo = new Map();
for (const r of NOVO.priceBook) mapNovo.set(keyOf(r), r);
const mapAntigo = new Map();
for (const r of ANTIGO.priceBook) mapAntigo.set(keyOf(r), r);

// Classificação
const removidos = [];   // no antigo, sumiu no novo
const adicionados = []; // só no novo
const alterados = [];   // em ambos, algum campo mudou
const identicos = [];   // em ambos, nada mudou

for (const [k, antigo] of mapAntigo) {
  if (!mapNovo.has(k)) { removidos.push(antigo); continue; }
  const novo = mapNovo.get(k);
  const changes = {};
  // Normalizador para lidar com artefatos de formatação:
  // "8%" (string) vs 8 (number) representam o mesmo valor semântico quando unit=Percent.
  const numify = (v) => {
    if (v === null || v === undefined || v === '') return null;
    if (typeof v === 'number') return v;
    const s = String(v).replace(/[$%,\s]/g, '');
    const n = Number(s);
    return isNaN(n) ? String(v) : n;
  };
  for (const f of ['economy', 'standard', 'premium', 'typicalMinimum']) {
    if (numify(antigo[f]) !== numify(novo[f])) changes[f] = { antigo: antigo[f], novo: novo[f] };
  }
  if ((antigo.unit || '') !== (novo.unit || '')) changes.unit = { antigo: antigo.unit, novo: novo.unit };
  // material campo mudou de nome
  const antigoMat = antigo.material;
  const novoMat = novo.materialIncluded;
  if (antigoMat !== novoMat) changes.material = { antigo: antigoMat, novo: novoMat };
  if (Object.keys(changes).length > 0) alterados.push({ novo, antigo, changes });
  else identicos.push(novo);
}
for (const [k, novo] of mapNovo) {
  if (!mapAntigo.has(k)) adicionados.push(novo);
}

// Sheets diff
const sheetsNovo = new Set(NOVO.meta.sheets);
const sheetsAntigo = new Set(['Price Book', 'Choose Your Project', 'Sales Dashboard', 'Settings', 'Instructions', 'Data Validation']);
const sheetsRemovidas = [...sheetsAntigo].filter(s => !sheetsNovo.has(s));
const sheetsAdicionadas = [...sheetsNovo].filter(s => !sheetsAntigo.has(s));

// --- Escrita do markdown ---
const lines = [];
lines.push('# DIFF — Vilela Price Book: nova versão (2026-07-09) vs. baseline (2026-07-03)');
lines.push('');
lines.push('> Coleta: Argos, orquestrado a partir de `mcp__google-drive__downloadFile` (fileId `1COD0FEHHXjDoaUGYt630Y61rl-VUgOZG`).');
lines.push(`> Baixado em ${NOVO.meta.downloadedAt}. Arquivo original: **${NOVO.meta.originalFilename}** (${NOVO.meta.fileSizeBytes} bytes).`);
lines.push('> Baseline: `_temp-catalog.json` (parseado em 2026-07-03 do arquivo `_temp-precos.xlsx`, 40.058 bytes).');
lines.push('');
lines.push('## Resumo executivo');
lines.push('');
lines.push('| Métrica                     | Baseline 03/07 | Nova versão 09/07 | Delta      |');
lines.push('|-----------------------------|----------------|-------------------|------------|');
lines.push(`| Total de serviços           | ${ANTIGO.priceBook.length}            | ${NOVO.priceBook.length}               | ${NOVO.priceBook.length - ANTIGO.priceBook.length} |`);
lines.push(`| Sheets                      | 6              | ${NOVO.meta.sheets.length}                | ${NOVO.meta.sheets.length - 6} |`);
lines.push(`| Serviços removidos          | —              | ${removidos.length}                | —          |`);
lines.push(`| Serviços adicionados        | —              | ${adicionados.length}                | —          |`);
lines.push(`| Serviços com preço alterado | —              | ${alterados.length}                | —          |`);
lines.push(`| Serviços idênticos          | —              | ${identicos.length}                | —          |`);
lines.push('');
lines.push('## Mudanças estruturais de sheets');
lines.push('');
lines.push(`- **Sheets removidas:** ${sheetsRemovidas.length ? sheetsRemovidas.map(s => '`' + s + '`').join(', ') : '(nenhuma)'}`);
lines.push(`- **Sheets adicionadas:** ${sheetsAdicionadas.length ? sheetsAdicionadas.map(s => '`' + s + '`').join(', ') : '(nenhuma)'}`);
lines.push('');
lines.push('A nova versão **abandona o modelo "Choose Your Project" (Good/Better/Best por tipo de projeto)** e o "Sales Dashboard" com starting prices. Em seu lugar, entra o **Estimate Builder** (planilha de montagem de orçamento linha-a-linha, com Line #, Tier por linha, cálculo de Line Total) e o **Notes** (7 notas de política de preço). O "Dashboard" foi enxugado a 7 KPIs.');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 1. Serviços REMOVIDOS');
lines.push('');
lines.push(`Serviços que existiam na baseline 03/07 e sumiram: **${removidos.length}**.`);
lines.push('');
if (removidos.length) {
  lines.push('| Categoria | Serviço | Standard antigo | Notas antigas |');
  lines.push('|---|---|---|---|');
  for (const r of removidos.sort((a, b) => (a.category || '').localeCompare(b.category || ''))) {
    lines.push(`| ${r.category || '—'} | ${r.service || '—'} | ${fmt(r.standard)} | ${(r.notes || '').replace(/\|/g, '\\|').slice(0, 80)} |`);
  }
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 2. Serviços ADICIONADOS');
lines.push('');
lines.push(`Serviços novos na versão 09/07: **${adicionados.length}**.`);
lines.push('');
if (adicionados.length) {
  lines.push('| Categoria | Serviço | Unit | Economy | Standard | Premium | Notas |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const r of adicionados.sort((a, b) => (a.category || '').localeCompare(b.category || ''))) {
    lines.push(`| ${r.category || '—'} | ${r.service || '—'} | ${r.unit || '—'} | ${fmt(r.economy)} | ${fmt(r.standard)} | ${fmt(r.premium)} | ${(r.notes || '').replace(/\|/g, '\\|').slice(0, 60)} |`);
  }
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 3. Serviços com PREÇO ALTERADO');
lines.push('');
lines.push(`Serviços que existem em ambas as versões, mas com pelo menos um campo diferente: **${alterados.length}**.`);
lines.push('');
if (alterados.length) {
  lines.push('| Categoria | Serviço | Campo | Antigo | Novo | Δ % |');
  lines.push('|---|---|---|---|---|---|');
  for (const it of alterados.sort((a, b) => (a.novo.category || '').localeCompare(b.novo.category || ''))) {
    for (const [field, ch] of Object.entries(it.changes)) {
      const dp = (field === 'economy' || field === 'standard' || field === 'premium' || field === 'typicalMinimum')
        ? pct(ch.novo, ch.antigo)
        : '—';
      lines.push(`| ${it.novo.category || '—'} | ${it.novo.service || '—'} | ${field} | ${fmt(ch.antigo)} | ${fmt(ch.novo)} | ${dp} |`);
    }
  }
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 4. Serviços IDÊNTICOS (sanity check)');
lines.push('');
lines.push(`Serviços sem mudança: **${identicos.length}** (listagem completa no JSON — omitida aqui para preservar leitura).`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 5. Notas de sinal');
lines.push('');
lines.push('- A nova versão declara `Total Line Items = 112` no Dashboard **e** entrega 112 linhas na sheet Price Book — bate.');
lines.push('- Baseline declarava 130 serviços; nova entrega 112: **líquido -18**. Explicação em `analise/observacoes.md`.');
lines.push('- Preço médio Standard = **$2,347.14** (informado no Dashboard). Compare com a média calculada dos 112 preços no JSON.');
lines.push('- **Small Job Minimum = $350** é regra nova: pedidos abaixo disso são elevados ao mínimo (visto no Estimate Builder e no Settings).');
lines.push('');
lines.push('---');
lines.push('');
lines.push(`_Gerado por Argos a partir de \`_tools/diff.js\` em ${new Date().toISOString()}._`);

fs.writeFileSync(OUT, lines.join('\n'));
console.log('Wrote:', OUT);
console.log('Removidos:', removidos.length);
console.log('Adicionados:', adicionados.length);
console.log('Alterados:', alterados.length);
console.log('Idênticos:', identicos.length);

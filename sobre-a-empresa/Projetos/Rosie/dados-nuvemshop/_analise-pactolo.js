// Análise financeira Pactolo — Rosie (Nuvemshop)
// Executa: node _analise-pactolo.js

const fs = require('fs');
const path = require('path');

const DIR = __dirname;

// ---------- CSV parser tolerante a quotes ----------
function parseCSV(text, sep = ';') {
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === sep) { row.push(field); field = ''; }
      else if (c === '\r') { /* ignora */ }
      else if (c === '\n') { row.push(field); rows.push(row); field = ''; row = []; }
      else field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function readCSV(file) {
  const buf = fs.readFileSync(path.join(DIR, file));
  const text = new TextDecoder('windows-1252').decode(buf);
  const rows = parseCSV(text);
  const header = rows[0];
  const data = rows.slice(1).filter(r => r.length > 1 && r.some(v => v && v.trim() !== ''));
  return { header, data };
}

// ---------- Helpers ----------
function num(v) {
  if (v === undefined || v === null || v === '') return 0;
  const s = String(v).replace(/\./g, '').replace(',', '.'); // BR
  // Nuvemshop já vem em ponto decimal — vamos detectar
  const raw = String(v).trim();
  if (/^-?\d+(\.\d+)?$/.test(raw)) return parseFloat(raw);
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

function parseDate(s) {
  if (!s) return null;
  // dd/mm/yyyy hh:mm:ss OR dd/mm/yyyy
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?/);
  if (!m) return null;
  const [_, dd, mm, yyyy, hh = '0', mi = '0', ss = '0'] = m;
  return new Date(+yyyy, +mm - 1, +dd, +hh, +mi, +ss);
}

function fmtBRL(v) { return `R$ ${v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`; }

function pct(n, d) { return d === 0 ? '0%' : `${(100 * n / d).toFixed(1)}%`; }

function median(arr) {
  if (arr.length === 0) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function quantile(arr, q) {
  if (arr.length === 0) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const pos = (s.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return s[base + 1] !== undefined ? s[base] + rest * (s[base + 1] - s[base]) : s[base];
}

// ---------- Load ----------
const vendas = readCSV('vendas.csv');
const clientes = readCSV('clientes.csv');

// Índice de coluna → nome
const H = vendas.header;
const idx = (name) => H.findIndex(h => h === name);
const iPed = idx('Número do Pedido');
const iEmail = idx('E-mail');
const iData = idx('Data');
const iStatusPed = idx('Status do Pedido');
const iStatusPag = idx('Status do Pagamento');
const iSubtotal = idx('Subtotal');
const iDesconto = idx('Desconto');
const iFrete = idx('Valor do Frete');
const iTotal = idx('Total');
const iNome = idx('Nome do comprador');
const iCidade = idx('Cidade');
const iEstado = idx('Estado');
const iEntrega = idx('Forma de Entrega');
const iFormaPag = idx('Forma de Pagamento');
const iCupom = idx('Cupom de Desconto');
const iAnotacoes = idx('Anotações do Comprador');
const iDataPag = idx('Data de pagamento');
const iProduto = idx('Nome do Produto');
const iValorProduto = idx('Valor do Produto');
const iQtd = idx('Quantidade Comprada');
const iSKU = idx('SKU');
const iCanal = idx('Canal');
const iParcelas = idx('Parcelas');
const iJuros = idx('Juros');
const iTotalLiq = idx('Total líquido');
const iMeio = idx('Meio de pagamento');
const iCancelData = idx('Data e hora do cancelamento');

// Agrupar por número do pedido: 1ª linha tem header, demais têm só produto
const pedidos = new Map();
for (const row of vendas.data) {
  const numPed = row[iPed]?.trim();
  if (!numPed) continue;
  if (!pedidos.has(numPed)) {
    pedidos.set(numPed, {
      numero: numPed,
      email: row[iEmail],
      data: parseDate(row[iData]),
      status: row[iStatusPed],
      statusPag: row[iStatusPag],
      subtotal: num(row[iSubtotal]),
      desconto: num(row[iDesconto]),
      frete: num(row[iFrete]),
      total: num(row[iTotal]),
      nome: row[iNome],
      cidade: row[iCidade],
      estado: row[iEstado],
      entrega: row[iEntrega],
      formaPag: row[iFormaPag],
      cupom: row[iCupom]?.trim() || null,
      anotacoes: row[iAnotacoes]?.trim() || null,
      dataPag: parseDate(row[iDataPag]),
      canal: row[iCanal],
      parcelas: num(row[iParcelas]) || 1,
      juros: num(row[iJuros]),
      totalLiq: num(row[iTotalLiq]),
      meioPag: row[iMeio]?.trim() || null,
      cancelData: parseDate(row[iCancelData]),
      itens: []
    });
  }
  const p = pedidos.get(numPed);
  const prod = row[iProduto]?.trim();
  if (prod) {
    p.itens.push({
      produto: prod,
      valor: num(row[iValorProduto]),
      qtd: num(row[iQtd]) || 1,
      sku: row[iSKU]?.trim() || ''
    });
  }
}

const todosPedidos = [...pedidos.values()];

// Excluir pedidos-teste óbvios
const isTeste = (p) => (p.email || '').toLowerCase().includes('teste') || (p.nome || '').toLowerCase().includes('teste');

const pedidosValidos = todosPedidos.filter(p => !isTeste(p));

// Classificação por status
const pagos = pedidosValidos.filter(p => (p.statusPag || '').toLowerCase() === 'confirmado' && !p.cancelData);
const cancelados = pedidosValidos.filter(p => p.cancelData || (p.status || '').toLowerCase() === 'cancelado');
const abertos = pedidosValidos.filter(p => !pagos.includes(p) && !cancelados.includes(p));

console.log('=== INVENTÁRIO ===');
console.log(`Total de linhas (itens): ${vendas.data.length}`);
console.log(`Pedidos únicos (todos): ${todosPedidos.length}`);
console.log(`Pedidos teste excluídos: ${todosPedidos.filter(isTeste).length}`);
console.log(`Pedidos válidos: ${pedidosValidos.length}`);
console.log(`  - Pagos/confirmados: ${pagos.length}`);
console.log(`  - Cancelados: ${cancelados.length}`);
console.log(`  - Abertos/pendentes: ${abertos.length}`);

// Período
const datas = pedidosValidos.map(p => p.data).filter(d => d).sort((a, b) => a - b);
console.log(`\n=== PERÍODO ===`);
console.log(`Primeira venda: ${datas[0]?.toISOString().slice(0, 10)}`);
console.log(`Última venda:  ${datas[datas.length - 1]?.toISOString().slice(0, 10)}`);
const diasCorridos = datas.length > 0 ? Math.round((datas[datas.length - 1] - datas[0]) / (1000 * 60 * 60 * 24)) + 1 : 0;
console.log(`Janela: ${diasCorridos} dias`);

// Faturamento
const totalPagos = pagos.reduce((s, p) => s + p.total, 0);
const totalLiquidoPagos = pagos.reduce((s, p) => s + (p.totalLiq || p.total), 0);
const totalGeral = pedidosValidos.reduce((s, p) => s + p.total, 0);
console.log(`\n=== FATURAMENTO ===`);
console.log(`Bruto pagos: ${fmtBRL(totalPagos)}`);
console.log(`Líquido pagos (após taxas): ${fmtBRL(totalLiquidoPagos)}`);
console.log(`Bruto todos (inclui abertos): ${fmtBRL(totalGeral)}`);

// AOV
const totaisPagos = pagos.map(p => p.total);
const totaisTodos = pedidosValidos.filter(p => !cancelados.includes(p)).map(p => p.total);
console.log(`\n=== AOV ===`);
console.log(`AOV (pagos): ${fmtBRL(totalPagos / pagos.length)}`);
console.log(`AOV (não-cancelados): ${fmtBRL(totaisTodos.reduce((s, v) => s + v, 0) / totaisTodos.length)}`);
console.log(`Mediana: ${fmtBRL(median(totaisPagos))}`);
console.log(`p25: ${fmtBRL(quantile(totaisPagos, 0.25))}`);
console.log(`p75: ${fmtBRL(quantile(totaisPagos, 0.75))}`);
console.log(`Máximo: ${fmtBRL(Math.max(...totaisPagos))}`);
console.log(`Mínimo: ${fmtBRL(Math.min(...totaisPagos))}`);

// AOV últimos 30 dias
const now = datas[datas.length - 1] || new Date();
const cutoff30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
const pagos30 = pagos.filter(p => p.data && p.data >= cutoff30);
console.log(`\nÚltimos 30d — pedidos pagos: ${pagos30.length}`);
console.log(`AOV últimos 30d: ${fmtBRL(pagos30.reduce((s, p) => s + p.total, 0) / (pagos30.length || 1))}`);

// Itens por pedido
const itensPorPedido = pagos.map(p => p.itens.reduce((s, i) => s + i.qtd, 0));
const totalItens = itensPorPedido.reduce((s, v) => s + v, 0);
console.log(`\n=== ITENS POR PEDIDO ===`);
console.log(`Total itens em pedidos pagos: ${totalItens}`);
console.log(`Média itens/pedido: ${(totalItens / pagos.length).toFixed(2)}`);
console.log(`Mediana itens/pedido: ${median(itensPorPedido)}`);

// Top produtos
const contProduto = new Map();
const receitaProduto = new Map();
const contSKU = new Map();
const receitaSKU = new Map();
for (const p of pagos) {
  for (const it of p.itens) {
    // agrupar produto ignorando cor/tamanho — pega antes do primeiro "("
    const prodBase = it.produto.split('(')[0].trim();
    contProduto.set(prodBase, (contProduto.get(prodBase) || 0) + it.qtd);
    receitaProduto.set(prodBase, (receitaProduto.get(prodBase) || 0) + it.qtd * it.valor);
    // sku
    contSKU.set(it.sku, (contSKU.get(it.sku) || 0) + it.qtd);
    receitaSKU.set(it.sku, (receitaSKU.get(it.sku) || 0) + it.qtd * it.valor);
  }
}
console.log(`\n=== TOP 10 PRODUTOS (por quantidade) ===`);
[...contProduto.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([k, v]) => {
  console.log(`  ${v}x — ${k} — ${fmtBRL(receitaProduto.get(k))}`);
});
console.log(`\n=== TOP 10 PRODUTOS (por receita) ===`);
[...receitaProduto.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([k, v]) => {
  console.log(`  ${fmtBRL(v)} — ${k} — (${contProduto.get(k)}x)`);
});
console.log(`\n=== TOP 10 SKUs ===`);
[...contSKU.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([k, v]) => {
  console.log(`  ${v}x — ${k} — ${fmtBRL(receitaSKU.get(k))}`);
});

// Receita por dia
const receitaDia = new Map();
for (const p of pagos) {
  if (!p.data) continue;
  const key = p.data.toISOString().slice(0, 10);
  receitaDia.set(key, (receitaDia.get(key) || 0) + p.total);
}
console.log(`\n=== RECEITA POR DIA (pagos) ===`);
[...receitaDia.entries()].sort().forEach(([k, v]) => {
  console.log(`  ${k}: ${fmtBRL(v)}`);
});

// Método de pagamento
const meioCont = new Map();
const meioReceita = new Map();
const meioParcelas = new Map();
for (const p of pagos) {
  const m = p.meioPag || 'Desconhecido';
  meioCont.set(m, (meioCont.get(m) || 0) + 1);
  meioReceita.set(m, (meioReceita.get(m) || 0) + p.total);
  if (!meioParcelas.has(m)) meioParcelas.set(m, []);
  meioParcelas.get(m).push(p.parcelas || 1);
}
console.log(`\n=== MÉTODO DE PAGAMENTO ===`);
[...meioCont.entries()].sort((a, b) => b[1] - a[1]).forEach(([m, c]) => {
  const rec = meioReceita.get(m);
  const parc = meioParcelas.get(m);
  const avgParc = parc.reduce((s, v) => s + v, 0) / parc.length;
  console.log(`  ${m}: ${c} pedidos (${pct(c, pagos.length)}) — AOV ${fmtBRL(rec / c)} — média parcelas ${avgParc.toFixed(2)}`);
});

// Cupom
const comCupom = pagos.filter(p => p.cupom);
const semCupom = pagos.filter(p => !p.cupom);
console.log(`\n=== CUPOM ===`);
console.log(`Com cupom: ${comCupom.length} (${pct(comCupom.length, pagos.length)}) — AOV ${fmtBRL(comCupom.reduce((s, p) => s + p.total, 0) / (comCupom.length || 1))}`);
console.log(`Sem cupom: ${semCupom.length} (${pct(semCupom.length, pagos.length)}) — AOV ${fmtBRL(semCupom.reduce((s, p) => s + p.total, 0) / (semCupom.length || 1))}`);
const cuponsUsados = new Map();
comCupom.forEach(p => cuponsUsados.set(p.cupom, (cuponsUsados.get(p.cupom) || 0) + 1));
console.log(`Cupons únicos e frequência:`);
[...cuponsUsados.entries()].sort((a, b) => b[1] - a[1]).forEach(([c, n]) => console.log(`  ${c}: ${n}x`));

// Canal
const canalCont = new Map();
const canalReceita = new Map();
for (const p of pagos) {
  const c = p.canal || 'Desconhecido';
  canalCont.set(c, (canalCont.get(c) || 0) + 1);
  canalReceita.set(c, (canalReceita.get(c) || 0) + p.total);
}
console.log(`\n=== CANAL DE COMPRA ===`);
[...canalCont.entries()].sort((a, b) => b[1] - a[1]).forEach(([c, n]) => {
  console.log(`  ${c}: ${n} (${pct(n, pagos.length)}) — AOV ${fmtBRL(canalReceita.get(c) / n)}`);
});

// Estado / cidade
const estadoCont = new Map();
const estadoReceita = new Map();
const cidadeCont = new Map();
for (const p of pagos) {
  estadoCont.set(p.estado, (estadoCont.get(p.estado) || 0) + 1);
  estadoReceita.set(p.estado, (estadoReceita.get(p.estado) || 0) + p.total);
  cidadeCont.set(`${p.cidade}/${p.estado}`, (cidadeCont.get(`${p.cidade}/${p.estado}`) || 0) + 1);
}
console.log(`\n=== TOP ESTADOS ===`);
[...estadoCont.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([e, n]) => {
  console.log(`  ${e}: ${n} pedidos (${pct(n, pagos.length)}) — ${fmtBRL(estadoReceita.get(e))}`);
});
console.log(`\n=== TOP CIDADES ===`);
[...cidadeCont.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([c, n]) => console.log(`  ${c}: ${n}`));

// Frete
const fretes = pagos.map(p => p.frete);
const freteGratis = pagos.filter(p => p.frete === 0).length;
const totalFrete = fretes.reduce((s, v) => s + v, 0);
console.log(`\n=== FRETE ===`);
console.log(`Frete médio: ${fmtBRL(totalFrete / pagos.length)}`);
console.log(`Frete grátis: ${freteGratis} (${pct(freteGratis, pagos.length)})`);
console.log(`Mediana frete: ${fmtBRL(median(fretes))}`);
console.log(`Máximo frete: ${fmtBRL(Math.max(...fretes))}`);

// Anotações — extrair
console.log(`\n=== ANOTAÇÕES DO COMPRADOR (todas as não-vazias) ===`);
pagos.filter(p => p.anotacoes).forEach(p => {
  console.log(`[Pedido ${p.numero}] ${p.anotacoes.slice(0, 250)}${p.anotacoes.length > 250 ? '...' : ''}`);
});

// ---------- Clientes ----------
const HC = clientes.header;
const cIdx = (n) => HC.findIndex(h => h === n);
const cTotalCons = cIdx('Total Consumido (BRL)');
const cNumCompras = cIdx('Número de Compras');
const cEstado = cIdx('Estado');
const cCidade = cIdx('Cidade');
const cUltima = cIdx('Última Compra');
const cGenero = cIdx('Gênero');
const cNews = cIdx('Inscrição para newsletter');
const cMkt = cIdx('Marketing');

console.log(`\n=== CLIENTES ===`);
console.log(`Total clientes: ${clientes.data.length}`);
const totalConsumidos = clientes.data.map(r => num(r[cTotalCons]));
const numComprasCli = clientes.data.map(r => num(r[cNumCompras]));
console.log(`Soma total consumida: ${fmtBRL(totalConsumidos.reduce((s, v) => s + v, 0))}`);
console.log(`Média consumida por cliente: ${fmtBRL(totalConsumidos.reduce((s, v) => s + v, 0) / clientes.data.length)}`);
console.log(`Cliente que mais gastou: ${fmtBRL(Math.max(...totalConsumidos))}`);
console.log(`Média nº compras por cliente: ${(numComprasCli.reduce((s, v) => s + v, 0) / clientes.data.length).toFixed(2)}`);
console.log(`Clientes com >1 compra (recorrência): ${numComprasCli.filter(v => v > 1).length}`);

// Newsletter/marketing
const optIn = clientes.data.filter(r => r[cNews] === 'SIM').length;
const mktAceita = clientes.data.filter(r => r[cMkt] === 'SIM').length;
console.log(`Opt-in newsletter: ${optIn} (${pct(optIn, clientes.data.length)})`);
console.log(`Opt-in marketing: ${mktAceita} (${pct(mktAceita, clientes.data.length)})`);

// Duplicidade vendas x clientes
const emailsCli = new Set(clientes.data.map(r => r[cIdx('E-mail')]?.toLowerCase().trim()));
const emailsVendas = new Set(pagos.map(p => p.email?.toLowerCase().trim()));
const emailsOverlap = [...emailsVendas].filter(e => emailsCli.has(e)).length;
console.log(`Emails de pagantes na base de clientes: ${emailsOverlap}/${emailsVendas.size}`);

// Estados clientes (para comparar com vendas)
const cliEstado = new Map();
clientes.data.forEach(r => cliEstado.set(r[cEstado], (cliEstado.get(r[cEstado]) || 0) + 1));
console.log(`\n=== TOP ESTADOS (BASE DE CLIENTES) ===`);
[...cliEstado.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([e, n]) => {
  console.log(`  ${e}: ${n} (${pct(n, clientes.data.length)})`);
});

console.log('\n=== FIM ===');

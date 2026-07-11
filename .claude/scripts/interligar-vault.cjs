#!/usr/bin/env node
/**
 * interligar-vault.cjs — constrói a rede do vault Obsidian Kolden.
 *
 * Escopo: cérebro (sobre-a-empresa) + frota (agents) + memórias.
 * Camada 1 — frontmatter por PATH, merge cirúrgico (só insere chaves ausentes,
 *            nunca reescreve/reordena o frontmatter existente).
 * Camada 2 — MOCs (mapas de conteúdo) com wikilinks PATH-BASED (colisão de nomes)
 *            e aliases legíveis.
 *
 * Uso:  node .claude/scripts/interligar-vault.cjs           (dry-run, não escreve)
 *       node .claude/scripts/interligar-vault.cjs --apply    (aplica)
 *
 * Idempotente: re-rodar não duplica chaves nem corrompe frontmatter.
 */
'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd(); // esperado: C:\Kolden
const APPLY = process.argv.includes('--apply');

// ---------------------------------------------------------------- util git
function gitList(patterns) {
  const args = patterns.map(p => `"${p}"`).join(' ');
  const out = execSync(`git -c core.quotepath=false ls-files -z -- ${args}`, {
    cwd: ROOT, maxBuffer: 1 << 28,
  });
  return out.toString('utf8').split('\0').filter(Boolean);
}

// ---------------------------------------------------------------- escopo
const cerebro  = gitList(['sobre-a-empresa/**/*.md']);
const agentes  = gitList(['**/agents/*.md']);
const memorias = gitList(['**/agent-memory/*.md', 'MEMORY.md', '**/MEMORY.md']);
const escopo = [...new Set([...cerebro, ...agentes, ...memorias])]
  .filter(f => !path.basename(f).startsWith('_MOC'))          // nunca tratar um MOC como folha
  .filter(f => !/(^|\/)(_staging|quarentena)\//.test(f));     // higiene: fora quarentena/staging

// ---------------------------------------------------------------- inferência path→props
function inferir(f) {
  const segs = f.split('/');
  const p = {};

  // --- Cérebro ---
  if (f.startsWith('sobre-a-empresa/Kolden/_historico/')) {
    return { tipo: 'historico', up: '[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]' };
  }
  if (f.startsWith('sobre-a-empresa/Kolden/')) {
    const area = segs[2];
    if (segs.length === 3) // arquivo solto direto em Kolden/ (não é uma área)
      return { tipo: 'nota', area: 'cerebro', up: '[[sobre-a-empresa/_MOC-cerebro]]' };
    return { tipo: 'nota', area, up: `[[sobre-a-empresa/Kolden/${area}/_MOC-${area}]]` };
  }
  if (f.startsWith('sobre-a-empresa/Projetos/')) {
    const cliente = segs[3] || segs[2]; // {Ativos,Inativos,_modelo}/<Cliente>/...
    return { tipo: 'projeto', projeto: cliente, up: '[[sobre-a-empresa/Projetos/_MOC-projetos]]' };
  }
  if (f.startsWith('sobre-a-empresa/Ferramentas/')) {
    return { tipo: 'ferramenta', area: 'ferramentas', up: '[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]' };
  }
  if (f.startsWith('sobre-a-empresa/Socios/')) {
    return { tipo: 'nota', area: 'socios', up: '[[sobre-a-empresa/Socios/_MOC-socios]]' };
  }
  if (f.startsWith('sobre-a-empresa/')) {
    return { tipo: 'nota', area: 'cerebro', up: '[[sobre-a-empresa/_MOC-cerebro]]' };
  }

  // --- Memórias (antes de frota: um agent-memory nunca é agente) ---
  if (path.basename(f) === 'MEMORY.md' || /(^|\/)agent-memory\/[^/]+\.md$/.test(f)) {
    const squad = segs[0] === '.claude' ? 'kolden-os' : segs[0];
    p.tipo = 'memoria'; if (segs.length > 1) p.squad = squad;
    p.up = '[[_MOC-memorias]]';
    return p;
  }

  // --- Frota ---
  if (/(^|\/)agents\/[^/]+\.md$/.test(f)) {
    const squad = segs[0] === '.claude' ? 'kolden-os' : segs[0];
    return { tipo: 'agente', squad, up: '[[_MOC-frota]]' };
  }

  return null;
}

// ---------------------------------------------------------------- frontmatter merge
function fmtValor(v) {
  if (/^\[\[/.test(v)) return `"${v}"`;               // wikilink -> quotar (senão vira array YAML)
  if (/[:#{}\[\],&*!|>'"%@`\s]/.test(v)) return JSON.stringify(v);
  return v;
}
function jaTemChave(bloco, k) {
  return new RegExp('^' + k + '\\s*:', 'm').test(bloco); // chave top-level já presente?
}
const ORDEM = ['tipo', 'area', 'squad', 'projeto', 'up'];

function aplicarFrontmatter(f, props) {
  const orig = fs.readFileSync(f, 'utf8');
  const pares = ORDEM.filter(k => props[k] != null).map(k => [k, props[k]]);
  const hasFM = orig.startsWith('---\n') || orig.startsWith('---\r\n');

  if (hasFM) {
    const firstEol = orig.indexOf('\n');
    const after = orig.slice(firstEol);
    const cm = after.match(/\r?\n---[ \t]*(?=\r?\n|$)/); // fechamento
    if (!cm) return { status: 'fm-nao-fechado' };
    const closeAt = firstEol + cm.index;                 // quebra ANTES do --- de fechamento
    const bloco = orig.slice(firstEol + 1, closeAt);
    const eol = orig.slice(firstEol, firstEol + 2) === '\r\n' ? '\r\n' : '\n';
    const add = pares.filter(([k]) => !jaTemChave(bloco, k)).map(([k, v]) => `${k}: ${fmtValor(v)}`);
    if (!add.length) return { status: 'ja-completo' };
    const novo = orig.slice(0, closeAt) + eol + add.join(eol) + orig.slice(closeAt);
    if (APPLY) fs.writeFileSync(f, novo);
    return { status: 'merge', add };
  } else {
    const eol = orig.includes('\r\n') ? '\r\n' : '\n';
    const fm = ['---', ...pares.map(([k, v]) => `${k}: ${fmtValor(v)}`), '---', ''].join(eol);
    if (APPLY) fs.writeFileSync(f, fm + eol + orig);
    return { status: 'criado', add: pares.map(([k, v]) => `${k}: ${fmtValor(v)}`) };
  }
}

// ---------------------------------------------------------------- Camada 2: MOCs
function link(f, alias) {
  return `- [[${f.replace(/\.md$/, '')}|${alias || path.basename(f, '.md')}]]`;
}
function escreverMOC(destino, frontmatter, corpo) {
  const eol = '\n';
  const fm = ['---', ...frontmatter, '---', ''].join(eol);
  const txt = fm + eol + corpo.join(eol) + eol;
  if (APPLY) {
    fs.mkdirSync(path.dirname(path.join(ROOT, destino)), { recursive: true });
    fs.writeFileSync(path.join(ROOT, destino), txt);
  }
  return destino;
}
const porPrefixo = (pref) => escopo.filter(f => f.startsWith(pref)).sort();

function gerarMOCs() {
  const criados = [];
  const AREAS = ['marca', 'mercado', 'operacao', 'iniciativas', 'areas', 'identidade'];

  // MOCs de área do cérebro
  for (const area of AREAS) {
    const pref = `sobre-a-empresa/Kolden/${area}/`;
    const notas = porPrefixo(pref);
    if (!notas.length) continue;
    criados.push(escreverMOC(`${pref}_MOC-${area}.md`,
      ['tipo: moc', `area: ${area}`, 'up: "[[sobre-a-empresa/_MOC-cerebro]]"'],
      [`# 🗺️ MOC — ${area}`, '', `> Mapa de conteúdo da área **${area}** (${notas.length} notas).`, '',
        ...notas.map(f => link(f))]));
  }
  // Ferramentas / Socios
  for (const [area, pref] of [['ferramentas', 'sobre-a-empresa/Ferramentas/'], ['socios', 'sobre-a-empresa/Socios/']]) {
    const notas = porPrefixo(pref);
    if (!notas.length) continue;
    criados.push(escreverMOC(`${pref}_MOC-${area}.md`,
      ['tipo: moc', `area: ${area}`, 'up: "[[sobre-a-empresa/_MOC-cerebro]]"'],
      [`# 🗺️ MOC — ${area}`, '', `> ${notas.length} notas.`, '', ...notas.map(f => link(f))]));
  }
  // _historico — índice LEVE, agrupado por subpasta
  {
    const pref = 'sobre-a-empresa/Kolden/_historico/';
    const notas = porPrefixo(pref);
    const grupos = {};
    for (const f of notas) { const sub = f.split('/')[3] || '(raiz)'; (grupos[sub] ||= []).push(f); }
    const corpo = ['# 🗄️ MOC — Histórico (arquivo)', '',
      `> ${notas.length} notas arquivadas, agrupadas por subpasta. Material histórico — fora da rede densa.`, ''];
    for (const sub of Object.keys(grupos).sort()) {
      corpo.push(`## ${sub} (${grupos[sub].length})`, ...grupos[sub].map(f => link(f)), '');
    }
    criados.push(escreverMOC(`${pref}_MOC-historico.md`,
      ['tipo: moc', 'area: historico', 'up: "[[sobre-a-empresa/_MOC-cerebro]]"'], corpo));
  }
  // Projetos — agrupado por cliente
  {
    const notas = porPrefixo('sobre-a-empresa/Projetos/');
    const grupos = {};
    for (const f of notas) {
      const segs = f.split('/'); const cliente = `${segs[2]}/${segs[3] || ''}`.replace(/\/$/, '');
      (grupos[cliente] ||= []).push(f);
    }
    const corpo = ['# 🗺️ MOC — Projetos', '', `> Dossiês de cliente (${notas.length} notas).`, ''];
    for (const c of Object.keys(grupos).sort()) {
      corpo.push(`## ${c} (${grupos[c].length})`, ...grupos[c].map(f => link(f)), '');
    }
    criados.push(escreverMOC('sobre-a-empresa/Projetos/_MOC-projetos.md',
      ['tipo: moc', 'area: projetos', 'up: "[[sobre-a-empresa/_MOC-cerebro]]"'], corpo));
  }
  // Hub do cérebro
  criados.push(escreverMOC('sobre-a-empresa/_MOC-cerebro.md',
    ['tipo: moc', 'area: cerebro', 'up: "[[_MOC]]"'],
    ['# 🧠 MOC — Cérebro da Kolden', '', '> Hub das áreas de conhecimento da empresa.', '',
      ...AREAS.map(a => `- [[sobre-a-empresa/Kolden/${a}/_MOC-${a}|${a}]]`),
      '- [[sobre-a-empresa/Ferramentas/_MOC-ferramentas|ferramentas]]',
      '- [[sobre-a-empresa/Socios/_MOC-socios|socios]]',
      '- [[sobre-a-empresa/Projetos/_MOC-projetos|projetos]]',
      '- [[sobre-a-empresa/Kolden/_historico/_MOC-historico|histórico (arquivo)]]']));

  // Frota — agrupada por squad
  {
    const ag = escopo.filter(f => /(^|\/)agents\/[^/]+\.md$/.test(f));
    const grupos = {};
    for (const f of ag) { const s = f.split('/')[0] === '.claude' ? 'kolden-os' : f.split('/')[0]; (grupos[s] ||= []).push(f); }
    const corpo = ['# 🤖 MOC — Frota de agentes', '', `> ${ag.length} agentes por squad. Índice de leitura canônico: [[AGENTS]].`, ''];
    for (const s of Object.keys(grupos).sort()) {
      corpo.push(`## ${s} (${grupos[s].length})`, ...grupos[s].sort().map(f => link(f)), '');
    }
    criados.push(escreverMOC('_MOC-frota.md', ['tipo: moc', 'up: "[[_MOC]]"'], corpo));
  }
  // Memórias — agrupadas por squad
  {
    const mem = escopo.filter(f => path.basename(f) === 'MEMORY.md' || /(^|\/)agent-memory\/[^/]+\.md$/.test(f));
    const grupos = {};
    for (const f of mem) { const s = f.split('/')[0] === '.claude' ? 'kolden-os' : (f.split('/').length > 1 ? f.split('/')[0] : 'raiz'); (grupos[s] ||= []).push(f); }
    const corpo = ['# 🧵 MOC — Memórias de agente', '', `> ${mem.length} arquivos de memória.`, ''];
    for (const s of Object.keys(grupos).sort()) {
      corpo.push(`## ${s} (${grupos[s].length})`, ...grupos[s].sort().map(f => link(f)), '');
    }
    criados.push(escreverMOC('_MOC-memorias.md', ['tipo: moc', 'up: "[[_MOC]]"'], corpo));
  }
  // Mestre
  criados.push(escreverMOC('_MOC.md', ['tipo: moc'],
    ['# 🗺️ Kolden — Mapa Mestre', '', '> Ponto de entrada do vault. Comece por aqui (Ctrl+O → `_MOC`).', '',
      '## Domínios', '- [[sobre-a-empresa/_MOC-cerebro|🧠 Cérebro da empresa]]',
      '- [[_MOC-frota|🤖 Frota de agentes]]', '- [[_MOC-memorias|🧵 Memórias de agente]]', '',
      '## Índices canônicos', '- [[AGENTS|AGENTS.md — índice do plano de agentes]]']));

  return criados;
}

// ---------------------------------------------------------------- run
const DEBUG = process.argv.includes('--debug');
const stats = { criado: 0, merge: 0, 'ja-completo': 0, 'fm-nao-fechado': 0, 'sem-regra': 0 };
const amostra = [];
const semRegra = [];
const tocados = [];
for (const f of escopo) {
  const props = inferir(f);
  if (!props) { stats['sem-regra']++; semRegra.push(f); continue; }
  const r = aplicarFrontmatter(f, props);
  stats[r.status] = (stats[r.status] || 0) + 1;
  if (r.status === 'criado' || r.status === 'merge') tocados.push(f);
  if (amostra.length < 6 && (r.status === 'criado' || r.status === 'merge')) {
    amostra.push({ f, status: r.status, add: r.add });
  }
}
if (DEBUG) {
  console.log('\n### SEM-REGRA (' + semRegra.length + ') — primeiros 30:');
  semRegra.slice(0, 30).forEach(f => console.log('   ' + f));
  // preview de merge real em agentes com frontmatter aninhado
  const alvos = escopo.filter(f => /(^|\/)agents\/[^/]+\.md$/.test(f))
    .filter(f => { const o = fs.readFileSync(f, 'utf8'); return o.startsWith('---') && /\n\s{2,}\S/.test(o.slice(0, 400)); })
    .slice(0, 2);
  for (const f of alvos) {
    const orig = fs.readFileSync(f, 'utf8');
    const firstEol = orig.indexOf('\n');
    const cm = orig.slice(firstEol).match(/\r?\n---[ \t]*(?=\r?\n|$)/);
    const closeAt = firstEol + cm.index;
    const props = inferir(f);
    const bloco = orig.slice(firstEol + 1, closeAt);
    const add = ORDEM.filter(k => props[k] != null && !jaTemChave(bloco, k)).map(k => `${k}: ${fmtValor(props[k])}`);
    const novoFM = orig.slice(0, closeAt) + '\n' + add.join('\n') + orig.slice(closeAt);
    console.log('\n### MERGE PREVIEW — ' + f);
    console.log('--- frontmatter DEPOIS ---');
    console.log(novoFM.slice(0, novoFM.indexOf('\n---', 3) + 4));
  }
}
const mocs = gerarMOCs();

if (APPLY) {
  const manifesto = ['# arquivos com frontmatter tocado:', ...tocados,
    '# MOCs criados:', ...mocs].join('\n') + '\n';
  fs.writeFileSync(path.join(ROOT, '.claude/scripts/_interligar-manifest.txt'), manifesto);
}

console.log(`\n=== ${APPLY ? 'APLICADO' : 'DRY-RUN (nada escrito)'} ===`);
console.log(`escopo: ${escopo.length} notas`);
console.log('frontmatter:', JSON.stringify(stats));
console.log(`MOCs gerados: ${mocs.length}`);
console.log('\n--- amostra de frontmatter ---');
for (const a of amostra) {
  console.log(`\n[${a.status}] ${a.f}`);
  a.add.forEach(l => console.log('   + ' + l));
}
console.log('\n--- MOCs ---');
mocs.forEach(m => console.log('   ' + m));

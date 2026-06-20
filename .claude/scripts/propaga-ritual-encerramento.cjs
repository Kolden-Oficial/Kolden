#!/usr/bin/env node
/*
 * Propaga o bloco "Ritual de Encerramento" (auto-aprendizado obrigatório) para:
 *   1) todos os arquivos de agente (pasta pai = agents/ ou especialistas/);
 *   2) o doc central (README.md ou CLAUDE.md) de cada squad top-level.
 * Idempotente: usa marcadores e nunca duplica. Rode com --apply para gravar
 * (sem flag = simulação/dry-run).
 *
 * Uso:  node propaga-ritual-encerramento.cjs [--apply]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = 'C:\\Kolden';
const APPLY = process.argv.includes('--apply');

const MARK_AGENT = '<!-- ritual-de-encerramento -->';
const MARK_CENTRAL = '<!-- ritual-de-encerramento-central -->';

// Pastas top-level ignoradas na varredura (não contêm agentes a marcar aqui)
const SKIP_TOP = new Set(['.claude', '.git', 'node_modules', 'sobre-a-empresa', 'Ferramentas', '_staging']);
// Squads/projetos cujo doc central já foi editado à mão (não re-tocar)
const SKIP_CENTRAL = new Set(['Caos', 'Prometeu']);
// Nomes de arquivo dentro de agents/ que NÃO são agentes
const NOT_AGENT = new Set(['MEMORY.md', 'README.md', 'readme.md', 'catalogo.md', 'contexto.md', 'index.md', 'INDEX.md', '_index.md']);

function walk(dir, out) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walk(full, out);
    } else if (e.isFile() && e.name.endsWith('.md')) {
      out.push(full);
    }
  }
}

function isAgentFile(file) {
  const parent = path.basename(path.dirname(file));
  if (parent !== 'agents' && parent !== 'especialistas') return false;
  if (NOT_AGENT.has(path.basename(file))) return false;
  return true;
}

function agentId(file, content) {
  // tenta id: do frontmatter, depois name:, senão o nome do arquivo
  const mId = content.match(/^\s*id:\s*["']?([A-Za-z0-9._-]+)["']?\s*$/m);
  if (mId) return mId[1];
  const mName = content.match(/^\s*name:\s*["']?([^"'\n]+)["']?\s*$/m);
  if (mName) return mName[1].trim();
  return path.basename(file, '.md');
}

function agentBlock(id) {
  return `\n${MARK_AGENT}\n## Ritual de Encerramento (auto-aprendizado obrigatório)\n` +
    `Ao final de toda sessão em que você (\`${id}\`) atuou, antes de encerrar: acione a habilidade\n` +
    `\`ritual-de-encerramento\`. Reflita sobre a sessão, extraia as lições verificadas e grave-as na sua\n` +
    `memória própria (\`MEMORY.md\` — veja a regra de resolução na habilidade). Nunca encerre sem ter\n` +
    `aprendido e salvo algo.\n`;
}

const CENTRAL_BLOCK =
  `\n${MARK_CENTRAL}\n## Ritual de Encerramento (auto-aprendizado obrigatório)\n` +
  `Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de\n` +
  `encerrar uma sessão com trabalho, acione a habilidade \`ritual-de-encerramento\` — reflita, extraia\n` +
  `lições verificadas e grave-as na memória própria do agente (\`<projeto>/agent-memory/<agent-id>.md\`).\n` +
  `Fonte única: \`C:\\Kolden\\.claude\\skills\\ritual-de-encerramento\\SKILL.md\`. O reflexo \`Stop\` dispara\n` +
  `isso automaticamente quando a sessão roda a partir da raiz do workspace.\n`;

function appendIfMissing(file, mark, block) {
  let content;
  try { content = fs.readFileSync(file, 'utf8'); } catch { return 'erro'; }
  if (content.includes(mark)) return 'ja-tem';
  const sep = content.endsWith('\n') ? '' : '\n';
  if (APPLY) fs.writeFileSync(file, content + sep + block, 'utf8');
  return 'add';
}

// 1) Agentes
const all = [];
walk(ROOT, all);
const agentFiles = all.filter(isAgentFile);
let added = 0, skipped = 0, errs = 0;
const samples = [];
for (const f of agentFiles) {
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch { errs++; continue; }
  if (content.includes(MARK_AGENT)) { skipped++; continue; }
  const id = agentId(f, content);
  const sep = content.endsWith('\n') ? '' : '\n';
  if (APPLY) fs.writeFileSync(f, content + sep + agentBlock(id), 'utf8');
  added++;
  if (samples.length < 8) samples.push(`${path.relative(ROOT, f)}  (id=${id})`);
}

// 2) Doc central de cada squad top-level
let centralAdded = 0, centralSkip = 0;
let tops;
try { tops = fs.readdirSync(ROOT, { withFileTypes: true }); } catch { tops = []; }
for (const t of tops) {
  if (!t.isDirectory() || t.name.startsWith('.') || SKIP_TOP.has(t.name) || SKIP_CENTRAL.has(t.name)) continue;
  const dir = path.join(ROOT, t.name);
  const central = ['README.md', 'CLAUDE.md', 'orquestrador.md'].map(n => path.join(dir, n)).find(p => fs.existsSync(p));
  if (!central) continue;
  const r = appendIfMissing(central, MARK_CENTRAL, CENTRAL_BLOCK);
  if (r === 'add') centralAdded++; else if (r === 'ja-tem') centralSkip++;
}

console.log(`MODO: ${APPLY ? 'APLICAR' : 'SIMULACAO (dry-run)'}`);
console.log(`Agentes encontrados: ${agentFiles.length}`);
console.log(`  + bloco adicionado: ${added}`);
console.log(`  já tinham marcador: ${skipped}`);
console.log(`  erros de leitura:   ${errs}`);
console.log(`Docs centrais de squad — adicionados: ${centralAdded}, já tinham: ${centralSkip}`);
console.log(`Amostra de agentes marcados:`);
for (const s of samples) console.log(`  - ${s}`);

#!/usr/bin/env node
/**
 * aplicar-whatsapp-solomon.cjs — instala o script de atribuição de WhatsApp da Solomon no tema Recife.
 *
 * Mexe só na cópia local (`_tema-recife/codigo/`); nada vai para a loja até rodar `diff` + `push`.
 *   1. copia rosie-whatsapp-solomon.tpl para codigo/snipplets/
 *   2. guarda layouts/layout.tpl original em _tema-recife/_backup/ (só na primeira vez)
 *   3. insere o include do snippet na linha anterior ao </body> do layout
 *
 * Idempotente: rodar de novo só atualiza o snippet. Aborta se o layout tiver 0 ou 2+ </body>.
 *
 * Uso (da raiz do repositório, depois de um `pull`):
 *   node sobre-a-empresa/Projetos/Ativos/rosie/customizacoes-tema/aplicar-whatsapp-solomon.cjs
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SNIPPET = 'rosie-whatsapp-solomon.tpl';
const INCLUDE = `{% include 'snipplets/${SNIPPET}' %}`;
const TEMA = path.resolve(__dirname, '..', '_tema-recife');
const CODIGO = path.join(TEMA, 'codigo');
const LAYOUT = path.join(CODIGO, 'layouts', 'layout.tpl');
const BACKUP = path.join(TEMA, '_backup', 'layout.tpl.antes-whatsapp-solomon');

function falhar(msg) {
  console.error(`[aplicar-whatsapp-solomon] ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(LAYOUT)) falhar(`não achei ${LAYOUT}. Rode o pull do tema antes.`);

// 1. snippet
const destinoSnippet = path.join(CODIGO, 'snipplets', SNIPPET);
fs.copyFileSync(path.join(__dirname, SNIPPET), destinoSnippet);
console.log(`snippet copiado: snipplets/${SNIPPET}`);

// 2 e 3. layout
const layout = fs.readFileSync(LAYOUT, 'utf8');
if (layout.includes(INCLUDE)) {
  console.log('layout.tpl já tem o include — nada a mudar.');
  process.exit(0);
}

const ocorrencias = layout.match(/<\/body>/gi) || [];
if (ocorrencias.length !== 1) {
  falhar(`layout.tpl tem ${ocorrencias.length} ocorrências de </body> (esperado: 1). Edite à mão.`);
}

if (!fs.existsSync(BACKUP)) {
  fs.mkdirSync(path.dirname(BACKUP), { recursive: true });
  fs.writeFileSync(BACKUP, layout);
  console.log(`backup do layout: ${path.relative(process.cwd(), BACKUP)}`);
}

const eol = layout.includes('\r\n') ? '\r\n' : '\n';
const novo = layout.replace(/^([ \t]*)<\/body>/im, (_, recuo) => `${recuo}${INCLUDE}${eol}${recuo}</body>`);
if (novo === layout) falhar('</body> não está no início de uma linha. Edite à mão.');
fs.writeFileSync(LAYOUT, novo);
console.log('include inserido antes do </body> em layouts/layout.tpl');
console.log('\nPróximo passo: rodar o diff e conferir que só aparecem layout.tpl (modificado) e o snippet (novo).');

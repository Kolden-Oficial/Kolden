#!/usr/bin/env node
/**
 * aplicar-popup-fora-do-produto.cjs — tira o pop-up "10% pra tua primeira" (RD Station) da página de produto.
 *
 * Pedido do Bruno (e-mail de 13/10/2026): a tela do cupom na PDP gera atrito. O pop-up continua
 * nas demais páginas (home, categorias…) captando e-mail para a RD Station; a newsletter do
 * rodapé não é tocada.
 *
 * Mexe só na cópia local (`_tema-recife/codigo/`); nada vai para a loja até rodar `diff` + `push`.
 *   1. acha o arquivo .tpl que faz o include de snipplets/rosie-popup-primeira.tpl (espera 1 ocorrência)
 *   2. guarda o original em _tema-recife/_backup/<arquivo>.antes-popup-fora-do-produto (só na primeira vez)
 *   3. envolve o include em {% if template != 'product' %} … {% endif %}
 *
 * Idempotente: se o include já estiver envolvido, não muda nada. Aborta se achar 0 ou 2+ includes.
 *
 * Uso (da raiz do repositório, depois de um `pull`):
 *   node sobre-a-empresa/Projetos/Ativos/rosie/customizacoes-tema/aplicar-popup-fora-do-produto.cjs
 */
'use strict';
const fs = require('fs');
const path = require('path');

const MARCA = "{# kolden: pop-up de 10% fora da página de produto (pedido Bruno 2026-10-13) #}";
const TEMA = path.resolve(__dirname, '..', '_tema-recife');
const CODIGO = path.join(TEMA, 'codigo');
const INCLUDE_RE = /([ \t]*)(\{%-?\s*include\s+["']snipplets\/rosie-popup-primeira\.tpl["'][^%]*-?%\})/g;

function falhar(msg) {
  console.error(`[aplicar-popup-fora-do-produto] ${msg}`);
  process.exit(1);
}

function listarTpl(dir) {
  const saida = [];
  for (const nome of fs.readdirSync(dir, { withFileTypes: true })) {
    if (nome.name.startsWith('.') || nome.name === '_backup') continue;
    const caminho = path.join(dir, nome.name);
    if (nome.isDirectory()) saida.push(...listarTpl(caminho));
    else if (nome.name.endsWith('.tpl')) saida.push(caminho);
  }
  return saida;
}

if (!fs.existsSync(CODIGO)) falhar(`não achei ${CODIGO}. Rode o pull do tema antes.`);

const ocorrencias = [];
for (const arquivo of listarTpl(CODIGO)) {
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  const achados = conteudo.match(INCLUDE_RE) || [];
  if (achados.length) ocorrencias.push({ arquivo, conteudo, total: achados.length });
}

const total = ocorrencias.reduce((s, o) => s + o.total, 0);
if (total !== 1) {
  const onde = ocorrencias.map(o => `${path.relative(CODIGO, o.arquivo)} (${o.total})`).join(', ') || 'nenhum arquivo';
  falhar(`esperava 1 include de rosie-popup-primeira.tpl, achei ${total}: ${onde}. Edite à mão ou me mande o arquivo.`);
}

const { arquivo, conteudo } = ocorrencias[0];
const relativo = path.relative(CODIGO, arquivo);

if (conteudo.includes(MARCA)) {
  console.log(`${relativo} já tem o pop-up condicionado — nada a mudar.`);
  process.exit(0);
}

const backup = path.join(TEMA, '_backup', `${path.basename(arquivo)}.antes-popup-fora-do-produto`);
if (!fs.existsSync(backup)) {
  fs.mkdirSync(path.dirname(backup), { recursive: true });
  fs.writeFileSync(backup, conteudo);
  console.log(`backup: ${path.relative(process.cwd(), backup)}`);
}

const eol = conteudo.includes('\r\n') ? '\r\n' : '\n';
const novo = conteudo.replace(INCLUDE_RE, (_, recuo, include) =>
  `${recuo}${MARCA}${eol}${recuo}{% if template != 'product' %}${eol}${recuo}    ${include}${eol}${recuo}{% endif %}`);
fs.writeFileSync(arquivo, novo);

console.log(`pop-up condicionado em ${relativo}: não aparece mais na página de produto.`);
console.log('\nPróximo passo: rodar o diff e conferir que só aparece esse arquivo como modificado.');

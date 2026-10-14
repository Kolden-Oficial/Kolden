#!/usr/bin/env node
/**
 * aplicar-botao-adicionar-carrinho.cjs — troca o texto dos botões pretos "Comprar" por "Adicionar ao carrinho".
 *
 * Os botões (PDP, compra rápida dos cards e o texto que o JS reescreve depois de adicionar ao
 * carrinho) usam a chave de tradução do tema `{{ 'Comprar' | translate }}` e a entrada `'cart': "Comprar"`
 * do dicionário de textos do botão (`{% set texts = {...} %}` em snipplets/grid/item.tpl). O script troca
 * só essas duas formas — não mexe em "Comprar em Loja Rosie" (título SEO da plataforma) nem em outros textos.
 *
 * O value="..." dos botões pretos (PDP e cards) usa `{{ texts[state] | translate }}` com a chave em espanhol
 * "Agregar al carrito"; o texto em português vem do bloco dessa chave em config/translations.txt
 * (`pt "Comprar"`). O script troca só a linha `pt` desse bloco.
 *
 * Mexe só na cópia local (`_tema-recife/codigo/`); nada vai para a loja até rodar `diff` + `push`.
 *   - sem argumentos: só lista o que mudaria (simulação), não altera nada
 *   - --aplicar: faz a troca, com backup de cada arquivo em _tema-recife/_backup/ (só na primeira vez)
 *
 * Idempotente: rodar de novo não acha mais nada para trocar.
 *
 * Uso (da raiz do repositório, depois de um `pull`):
 *   node sobre-a-empresa/Projetos/Ativos/rosie/customizacoes-tema/aplicar-botao-adicionar-carrinho.cjs
 *   node sobre-a-empresa/Projetos/Ativos/rosie/customizacoes-tema/aplicar-botao-adicionar-carrinho.cjs --aplicar
 */
'use strict';
const fs = require('fs');
const path = require('path');

const NOVO = 'Adicionar ao carrinho';
const TEMA = path.resolve(__dirname, '..', '_tema-recife');
const CODIGO = path.join(TEMA, 'codigo');
const APLICAR = process.argv.includes('--aplicar');
// {{ 'Comprar' | translate }}, {{"Comprar"|translate}}, com ou sem espaços
const CHAVE_RE = /(["'])Comprar\1(\s*\|\s*translate)/g;
// {% set texts = {'cart': "Comprar", ...} %} — texto do value="..." dos botões pretos
const CART_RE = /(["']cart["']\s*:\s*)(["'])Comprar\2/g;
// "Comprar" solto (sem translate) — só listado para revisão, nunca trocado
const SOLTO_RE = /(["'>])Comprar(["'<])/g;

// Bloco de config/translations.txt: es "Agregar al carrito" … pt "Comprar" (até a linha em branco)
const TRAD_RE = /(^es "Agregar al carrito"\s*$(?:\r?\n(?!\s*\r?$).*)*?\r?\n)pt "Comprar"(\s*)$/m;

function falhar(msg) {
  console.error(`[aplicar-botao-adicionar-carrinho] ${msg}`);
  process.exit(1);
}

function listarArquivos(dir) {
  const saida = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.name.startsWith('.') || item.name === '_backup') continue;
    const caminho = path.join(dir, item.name);
    if (item.isDirectory()) saida.push(...listarArquivos(caminho));
    else if (/\.(tpl|js|txt)$/.test(item.name)) saida.push(caminho);
  }
  return saida;
}

if (!fs.existsSync(CODIGO)) falhar(`não achei ${CODIGO}. Rode o pull do tema antes.`);

let totalTrocas = 0;
const soltos = [];
for (const arquivo of listarArquivos(CODIGO)) {
  const conteudo = fs.readFileSync(arquivo, 'utf8');
  const relativo = path.relative(CODIGO, arquivo);

  conteudo.split(/\r?\n/).forEach((linha, i) => {
    const alvo = CHAVE_RE.test(linha) || CART_RE.test(linha);
    CHAVE_RE.lastIndex = 0;
    CART_RE.lastIndex = 0;
    if (alvo) console.log(`  trocar  ${relativo}:${i + 1}  ${linha.trim().slice(0, 140)}`);
    else if (!/translations\.txt$/.test(relativo) && SOLTO_RE.test(linha)) soltos.push(`${relativo}:${i + 1}  ${linha.trim().slice(0, 140)}`);
    SOLTO_RE.lastIndex = 0;
  });

  const tradAlvo = relativo.replace(/\\/g, '/') === 'config/translations.txt' && TRAD_RE.test(conteudo);
  if (tradAlvo) console.log(`  trocar  ${relativo}  bloco "Agregar al carrito": pt "Comprar" → pt "${NOVO}"`);
  const trocas = (conteudo.match(CHAVE_RE) || []).length + (conteudo.match(CART_RE) || []).length + (tradAlvo ? 1 : 0);
  if (!trocas) continue;
  totalTrocas += trocas;

  if (APLICAR) {
    const nomeBackup = relativo.replace(/[\\/]/g, '__') + '.antes-botao-carrinho';
    const backup = path.join(TEMA, '_backup', nomeBackup);
    if (!fs.existsSync(backup)) {
      fs.mkdirSync(path.dirname(backup), { recursive: true });
      fs.writeFileSync(backup, conteudo);
    }
    let novo = conteudo.replace(CHAVE_RE, `$1${NOVO}$1$2`).replace(CART_RE, `$1$2${NOVO}$2`);
    if (tradAlvo) novo = novo.replace(TRAD_RE, `$1pt "${NOVO}"$2`);
    fs.writeFileSync(arquivo, novo);
  }
}

if (soltos.length) {
  console.log('\n"Comprar" sem translate (NÃO trocado — me mande se algum for botão):');
  soltos.forEach(s => console.log(`  ${s}`));
}

if (!totalTrocas) {
  console.log('\nNada para trocar — os botões já estão como "Adicionar ao carrinho" (ou o tema usa outro formato).');
} else if (APLICAR) {
  console.log(`\n${totalTrocas} troca(s) aplicada(s). Backups em _tema-recife/_backup/*.antes-botao-carrinho`);
  console.log('Próximo passo: rodar o diff e conferir que só aparecem os arquivos listados acima.');
} else {
  console.log(`\nSimulação: ${totalTrocas} troca(s) encontrada(s). Nada foi alterado. Para aplicar, rode de novo com --aplicar`);
}

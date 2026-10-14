#!/usr/bin/env node
/**
 * aplicar-botao-adicionar-carrinho.cjs — troca o texto dos botões pretos "Comprar" por "Adicionar ao carrinho".
 *
 * Os botões (PDP, compra rápida dos cards e o texto que o JS reescreve depois de adicionar ao
 * carrinho) usam a chave de tradução do tema `{{ 'Comprar' | translate }}`. O script troca só
 * essas chaves — não mexe em "Comprar em Loja Rosie" (título SEO da plataforma) nem em outros textos.
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
// "Comprar" solto (sem translate) — só listado para revisão, nunca trocado
const SOLTO_RE = /(["'>])Comprar(["'<])/g;

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
    if (CHAVE_RE.test(linha)) console.log(`  trocar  ${relativo}:${i + 1}  ${linha.trim().slice(0, 140)}`);
    CHAVE_RE.lastIndex = 0;
    if (!CHAVE_RE.test(linha) && SOLTO_RE.test(linha)) soltos.push(`${relativo}:${i + 1}  ${linha.trim().slice(0, 140)}`);
    CHAVE_RE.lastIndex = 0;
    SOLTO_RE.lastIndex = 0;
  });

  const trocas = (conteudo.match(CHAVE_RE) || []).length;
  if (!trocas) continue;
  totalTrocas += trocas;

  if (APLICAR) {
    const nomeBackup = relativo.replace(/[\\/]/g, '__') + '.antes-botao-carrinho';
    const backup = path.join(TEMA, '_backup', nomeBackup);
    if (!fs.existsSync(backup)) {
      fs.mkdirSync(path.dirname(backup), { recursive: true });
      fs.writeFileSync(backup, conteudo);
    }
    fs.writeFileSync(arquivo, conteudo.replace(CHAVE_RE, `$1${NOVO}$1$2`));
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

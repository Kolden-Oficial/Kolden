#!/usr/bin/env node
// Converte um .md em HTML MINIMAL para createDocFromHTML.
// Só tags semânticas (h1-h4, p, ul/ol, table, strong, em, code, blockquote).
// Sem CSS pesado — Google Doc aplica estilos nativos.
// Uso: node md-to-html-gdoc.js <input.md>  (imprime HTML para stdout)

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const [, , inputPath] = process.argv;
if (!inputPath) {
  console.error('Uso: node md-to-html-gdoc.js <input.md>');
  process.exit(1);
}

let md = fs.readFileSync(inputPath, 'utf8');
md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
md = md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, alias) => alias || target.split('/').pop().replace(/\.md$/, ''));

const internalMarker = /(Squad|Skill|Insumos|Fonte-base|Autoria|Autor:|orquestradora|squad de|Aletheia|Argos|Hermes|Caliope|Pheme|Kolden Chief|Kolden Squad|Contrato\s+`m-|Firecrawl|Apify|coleta-bruta|output-quality|ARGOS-CL-|assinado por|Assinado por|Postura:|Duração:|Método:|Regra-âncora)/;
const rawLines = md.split(/\r?\n/);
const outLines = [];
let i = 0;
while (i < rawLines.length) {
  if (/^\s*>/.test(rawLines[i])) {
    let j = i;
    while (j < rawLines.length && /^\s*>/.test(rawLines[j])) j++;
    const block = rawLines.slice(i, j).join('\n');
    if (internalMarker.test(block)) {
      if (j < rawLines.length && /^\s*$/.test(rawLines[j])) j++;
      i = j;
      continue;
    }
    for (let k = i; k < j; k++) outLines.push(rawLines[k]);
    i = j;
    continue;
  }
  outLines.push(rawLines[i]);
  i++;
}
md = outLines.join('\n').replace(/\n{3,}/g, '\n\n');

const termSubs = [
  [/\bAletheia( Chief| chief)?\b/g, 'time de discovery Kolden'],
  [/\bArgos( Chief| chief)?\b/g, 'time de pesquisa Kolden'],
  [/\bHermes\b/g, 'runtime Kolden'],
  [/\bCaliope\b/g, 'time de copy Kolden'],
  [/\bPheme\b/g, 'time de social Kolden'],
  [/\bPrometeu\b/g, 'time de produto Kolden'],
  [/\bAriadne\b/g, 'time de web Kolden'],
  [/\bMetis\b/g, 'time de analytics Kolden'],
  [/\bAnanke\b/g, 'time de ops Kolden'],
  [/\bAglaia\b/g, 'time de branding Kolden'],
  [/\bDike\b/g, 'verificação Kolden'],
  [/\bPeitho\b/g, 'time de vendas Kolden'],
  [/\bThemis\b/g, 'governança Kolden'],
  [/\bNyx\b/g, 'time de estratégia Kolden'],
  [/\bHarmonia\b/g, 'time de design systems Kolden'],
  [/\bMoira\b/g, 'time Kolden'],
  [/\bIris\b/g, 'time Kolden'],
  [/\bNike\b/g, 'time Kolden'],
  [/\bAthena\b/g, 'time Kolden'],
  [/\bAeolus\b/g, 'time Kolden'],
  [/\bFirecrawl\b/g, 'web search'],
  [/\bApify\b/g, 'scraping'],
  [/\bMCP\s+`?google-drive`?/g, 'integração Drive'],
  [/orquestradora do squad de \w+( & \w+)?( da Kolden)?/gi, 'da Kolden'],
  [/orquestradora do squad/gi, 'da Kolden'],
  [/coleta-bruta/g, 'coleta bruta'],
  [/Contrato\s+`m-\d+-[^`]+`/g, 'contrato de trabalho'],
];
for (const [re, sub] of termSubs) md = md.replace(re, sub);

marked.setOptions({ gfm: true, breaks: false });
const html = marked.parse(md);

process.stdout.write(`<html><body>${html}</body></html>`);

#!/usr/bin/env node
// Converte um .md em HTML com CSS BRW.
// Uso: node md-to-html.js <input.md> <output.html> "<Título>"

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const [, , inputPath, outputPath, titleArg] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Uso: node md-to-html.js <input.md> <output.html> "<Título>"');
  process.exit(1);
}

let md = fs.readFileSync(inputPath, 'utf8');

// Strip YAML frontmatter
md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

// Resolver [[wikilinks]] para texto simples (pega só o alias após |, ou o alvo)
md = md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, alias) => {
  const label = alias || target.split('/').pop().replace(/\.md$/, '');
  return label;
});

// Remover blockquotes de metadata interna.
// Estratégia: identifica cada bloco contíguo de linhas `> ...`; se o bloco inteiro
// contém pistas de cozinha interna (Squad/Skill/agente/Kolden Chief/orquestradora/etc), descarta.
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
      // pula o bloco + até 1 linha em branco seguinte
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

// Sanitização de termos internos remanescentes (menções inline em texto corrido)
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
const bodyHtml = marked.parse(md);

const title = titleArg || path.basename(inputPath, '.md');

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${title.replace(/</g, '&lt;')}</title>
<style>
  @page { size: A4; margin: 22mm 20mm 22mm 20mm; }
  :root {
    --marinho:#1A3D7E; --marinho-esc:#122C5C;
    --ocre:#C1741D; --borgonha:#7B1B1A;
    --tinta:#17181C; --chumbo:#5A5E63;
    --papel:#FBFAF6; --offwhite:#F5F3EC;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Century Gothic','Futura','Trebuchet MS',system-ui,-apple-system,sans-serif;
    color: var(--tinta);
    background: var(--papel);
    line-height: 1.55;
    font-size: 11pt;
    max-width: 170mm;
    margin: 0 auto;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 {
    font-family: 'Century Gothic','Futura',system-ui,sans-serif;
    color: var(--marinho);
    line-height: 1.25;
    page-break-after: avoid;
  }
  h1 {
    font-size: 26pt;
    letter-spacing: -0.5px;
    border-bottom: 3px solid var(--ocre);
    padding-bottom: 8pt;
    margin: 0 0 20pt 0;
  }
  h2 {
    font-size: 18pt;
    color: var(--marinho-esc);
    margin: 24pt 0 10pt 0;
    border-bottom: 1px solid #d8d3c4;
    padding-bottom: 4pt;
  }
  h3 { font-size: 14pt; color: var(--borgonha); margin: 18pt 0 6pt; }
  h4 { font-size: 12pt; color: var(--chumbo); margin: 14pt 0 4pt; text-transform: uppercase; letter-spacing: 0.4px; }
  p { margin: 0 0 10pt 0; }
  strong { color: var(--marinho-esc); }
  em { color: var(--borgonha); }
  a { color: var(--marinho); text-decoration: underline; }
  ul, ol { margin: 6pt 0 14pt 22pt; padding: 0; }
  li { margin: 3pt 0; }
  li > ul, li > ol { margin: 3pt 0 3pt 18pt; }
  blockquote {
    margin: 12pt 0;
    padding: 8pt 14pt;
    border-left: 3px solid var(--ocre);
    background: var(--offwhite);
    color: var(--chumbo);
    font-style: italic;
    page-break-inside: avoid;
  }
  code {
    font-family: 'Consolas','Menlo',monospace;
    font-size: 10pt;
    background: #eeeae0;
    padding: 1px 5px;
    border-radius: 3px;
    color: var(--marinho-esc);
  }
  pre {
    background: #f0ecdd;
    padding: 10pt 12pt;
    border-radius: 4px;
    border-left: 3px solid var(--marinho);
    overflow-x: auto;
    page-break-inside: avoid;
  }
  pre code { background: transparent; padding: 0; }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0;
    font-size: 10pt;
    page-break-inside: avoid;
  }
  th, td {
    border: 1px solid #d8d3c4;
    padding: 6pt 8pt;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: var(--marinho);
    color: var(--papel);
    font-weight: bold;
  }
  tr:nth-child(even) td { background: var(--offwhite); }
  hr { border: none; border-top: 1px solid #d8d3c4; margin: 20pt 0; }
  img { max-width: 100%; height: auto; }
  .header-brand {
    color: var(--ocre);
    font-size: 9pt;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: right;
    margin-bottom: 20pt;
    border-bottom: 1px solid #e0dcc9;
    padding-bottom: 6pt;
  }
</style>
</head>
<body>
<div class="header-brand">BRW Movelaria · Kolden</div>
${bodyHtml}
</body>
</html>`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log(`OK: ${path.basename(outputPath)}`);

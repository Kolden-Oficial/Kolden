#!/usr/bin/env node
// Converte <gdoc.html> em .docx (Office Open XML). O Drive converte DOCX → Google Doc na subida.
// Uso: node html-to-docx.js <input.gdoc.html> <output.docx>

const fs = require('fs');
const HTMLtoDOCX = require('html-to-docx');

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Uso: node html-to-docx.js <input.html> <output.docx>');
  process.exit(1);
}

(async () => {
  const html = fs.readFileSync(inputPath, 'utf8');
  const buffer = await HTMLtoDOCX(html, null, {
    table: { row: { cantSplit: true } },
    footer: false,
    pageNumber: false,
    font: 'Calibri',
    fontSize: 22, // half-points = 11pt
    orientation: 'portrait',
    margins: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 polegada
  });
  fs.writeFileSync(outputPath, buffer);
  console.log(`OK: ${outputPath}`);
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
